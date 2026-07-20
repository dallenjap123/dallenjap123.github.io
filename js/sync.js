// Optional cloud sync for cross-device progress. This entire file is a
// no-op — the app works exactly as it does locally — unless BOTH of these
// are true: (1) the Firebase SDK loaded, and (2) js/firebase-config.js has
// real project keys instead of the placeholder. See README.md → "Optional:
// sync progress across devices" for setup.
//
// Only your vocab right/wrong stats (the same data behind the Word List
// and weak-word highlighting) are synced. Grammar/conjugation practice
// stay session-only, same as before.
(function () {
  const config = window.FIREBASE_CONFIG;
  const isConfigured = !!(config && config.apiKey && config.apiKey !== "YOUR_API_KEY_HERE");
  const sdkAvailable = typeof firebase !== "undefined";

  const syncStatusEl = document.getElementById("sync-status");
  if (!isConfigured || !sdkAvailable) {
    return; // sync-status stays hidden (its default state in the HTML)
  }

  const t = (window.JPStudyProgress && window.JPStudyProgress.t) || ((key) => key);

  const syncOpenBtn = document.getElementById("sync-open-btn");
  const syncActiveStatus = document.getElementById("sync-active-status");
  const syncActiveEmail = document.getElementById("sync-active-email");
  const syncSignoutBtn = document.getElementById("sync-signout-btn");
  const syncModal = document.getElementById("sync-modal");
  const syncGoogleBtn = document.getElementById("sync-google-btn");
  const syncCloseX = document.getElementById("sync-close-x");
  const syncErrorEl = document.getElementById("sync-error");

  let auth, db;
  try {
    firebase.initializeApp(config);
    auth = firebase.auth();
    db = firebase.firestore();
  } catch (e) {
    console.warn("Firebase init failed — cloud sync disabled, app continues local-only.", e);
    return;
  }

  syncStatusEl.hidden = false;

  function openModal() {
    clearError();
    syncModal.hidden = false;
  }
  function closeModal() {
    syncModal.hidden = true;
  }
  function showError(msg) {
    syncErrorEl.textContent = msg;
    syncErrorEl.hidden = false;
  }
  function clearError() {
    syncErrorEl.hidden = true;
    syncErrorEl.textContent = "";
  }
  // These two just mean the user closed the Google popup or opened a
  // second one — not real errors, so no need to alarm them with red text.
  const SILENT_CODES = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];
  function friendlyError(err) {
    const map = {
      "auth/popup-blocked": "syncErrPopupBlocked",
      "auth/unauthorized-domain": "syncErrUnauthorizedDomain",
    };
    const key = map[err && err.code];
    if (key) return t(key);
    // Unmapped error: show the raw code/message rather than nothing, so a
    // setup problem (e.g. Google sign-in not enabled in the Firebase
    // console) is visible instead of silently doing nothing.
    return (err && (err.code ? `${err.code}: ${err.message}` : err.message)) || String(err);
  }

  // Shows a loading state on the button so "did anything happen?" always
  // has a visible answer, catches BOTH thrown errors and promise
  // rejections (a bad Firebase setup can do either), and always restores
  // the button whether it succeeds, fails, or the user just closes the
  // Google popup without finishing.
  function handleGoogleSignIn() {
    clearError();
    const originalText = syncGoogleBtn.textContent;
    syncGoogleBtn.disabled = true;
    syncGoogleBtn.textContent = "…";
    const provider = new firebase.auth.GoogleAuthProvider();
    Promise.resolve()
      .then(() => auth.signInWithPopup(provider))
      .then(() => {
        closeModal();
      })
      .catch((e) => {
        if (!SILENT_CODES.includes(e && e.code)) {
          console.error("jp-study cloud sync error:", e);
          showError(friendlyError(e));
        }
      })
      .finally(() => {
        syncGoogleBtn.disabled = false;
        syncGoogleBtn.textContent = originalText;
      });
  }

  syncOpenBtn.addEventListener("click", openModal);
  syncCloseX.addEventListener("click", closeModal);
  syncModal.addEventListener("click", (e) => {
    if (e.target === syncModal) closeModal(); // click outside the box closes it
  });

  syncGoogleBtn.addEventListener("click", handleGoogleSignIn);

  syncSignoutBtn.addEventListener("click", () => auth.signOut());

  // Per-word merge: newer lastSeen wins. Words only on one side are kept.
  // This is intentionally simple (no true conflict resolution) — good
  // enough for "I studied on my phone, then my laptop" style usage.
  function mergeProgress(local, remote) {
    const merged = Object.assign({}, local || {});
    Object.keys(remote || {}).forEach((id) => {
      const r = remote[id];
      const l = merged[id];
      if (r && (!l || (r.lastSeen && (!l.lastSeen || r.lastSeen > l.lastSeen)))) {
        merged[id] = r;
      }
    });
    return merged;
  }

  let pushTimer = null;
  function pushToCloud(data) {
    const user = auth.currentUser;
    if (!user) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      db.collection("users")
        .doc(user.uid)
        .set({ progress: data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
        .catch((e) => console.warn("Cloud sync push failed:", e));
    }, 1500); // small debounce so rapid grading doesn't spam writes
  }

  if (window.JPStudyProgress) {
    window.JPStudyProgress.onLocalChange = pushToCloud;
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      syncOpenBtn.hidden = true;
      syncActiveStatus.hidden = false;
      syncActiveEmail.textContent = user.email;
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((docSnap) => {
          const remote = docSnap.exists && docSnap.data().progress ? docSnap.data().progress : {};
          const local = window.JPStudyProgress ? window.JPStudyProgress.get() : {};
          const merged = mergeProgress(local, remote);
          if (window.JPStudyProgress) window.JPStudyProgress.set(merged);
          pushToCloud(merged); // make sure the cloud copy reflects the merge too
        })
        .catch((e) => console.warn("Cloud sync pull failed:", e));
    } else {
      syncOpenBtn.hidden = false;
      syncActiveStatus.hidden = true;
    }
  });
})();
