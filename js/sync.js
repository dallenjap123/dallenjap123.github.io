// Optional cloud sync for cross-device progress, backed by Cloud Firestore.
// This entire file is a no-op — the app works exactly as it does locally —
// unless BOTH of these are true: (1) the Firebase SDK loaded, and (2)
// js/firebase-config.js has real project keys instead of the placeholder.
// See README.md → "Optional: sync progress across devices" for setup.
//
// Only your vocab right/wrong stats (the same data behind the Word List
// and weak-word highlighting) are synced. Grammar/conjugation practice
// stay session-only, same as before.
//
// Two things happen here, both in real time (no polling, no fixed delay):
// - Every local change pushes to Firestore immediately.
// - A live listener (onSnapshot) stays open the whole time you're signed
//   in, so a change made on another device — or another tab on this one —
//   shows up here within about a second, no reload or re-sign-in needed.
(function () {
  const config = window.FIREBASE_CONFIG;
  const isConfigured = !!(config && config.apiKey && config.apiKey !== "YOUR_API_KEY_HERE");
  const sdkAvailable = typeof firebase !== "undefined";

  const syncStatusEl = document.getElementById("sync-status");
  const syncOpenBtn = document.getElementById("sync-open-btn");
  const syncActiveStatus = document.getElementById("sync-active-status");
  const syncActiveEmail = document.getElementById("sync-active-email");
  const syncSignoutBtn = document.getElementById("sync-signout-btn");
  const syncSaveNowBtn = document.getElementById("sync-save-now-btn");
  const syncModal = document.getElementById("sync-modal");
  const syncGoogleBtn = document.getElementById("sync-google-btn");
  const syncCloseX = document.getElementById("sync-close-x");
  const syncErrorEl = document.getElementById("sync-error");

  if (!isConfigured || !sdkAvailable) {
    if (syncStatusEl && syncOpenBtn) {
      syncStatusEl.hidden = false;
      syncOpenBtn.hidden = false;
      syncOpenBtn.textContent = "⚙️ Set up sync";
      syncOpenBtn.addEventListener("click", () => {
        if (syncErrorEl) {
          syncErrorEl.textContent = "Firebase sync is not configured yet. Add your Firebase web config to enable Google sign-in.";
          syncErrorEl.hidden = false;
        }
        if (syncModal) syncModal.hidden = false;
      });
    }
    return;
  }

  const t = (window.JPStudyProgress && window.JPStudyProgress.t) || ((key) => key);

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
    // setup problem (e.g. Google sign-in not enabled, or Firestore rules
    // rejecting the request) is visible instead of silently doing nothing.
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

  // Merge the full sync payload (vocab, grammar, and streak) so updates
  // from any device are preserved without losing newer progress data.
  function mergeProgressMaps(localMap, remoteMap) {
    const merged = Object.assign({}, localMap || {});
    Object.keys(remoteMap || {}).forEach((id) => {
      const r = remoteMap[id];
      const l = merged[id];
      if (r && (!l || (r.lastSeen && (!l.lastSeen || r.lastSeen > l.lastSeen)))) {
        merged[id] = r;
      } else if (r && l && typeof r === "object" && typeof l === "object" && !r.lastSeen && !l.lastSeen) {
        merged[id] = Object.assign({}, l, r);
      }
    });
    return merged;
  }

  function normalizeSyncState(state) {
    if (!state || typeof state !== "object") {
      return { vocab: {}, grammar: {}, streak: {} };
    }
    if (!("vocab" in state) && !("grammar" in state) && !("streak" in state)) {
      return { vocab: state, grammar: {}, streak: {} };
    }
    return {
      vocab: state.vocab && typeof state.vocab === "object" ? state.vocab : {},
      grammar: state.grammar && typeof state.grammar === "object" ? state.grammar : {},
      streak: state.streak && typeof state.streak === "object" ? state.streak : {},
    };
  }

  function mergeSyncState(localState, remoteState) {
    const local = normalizeSyncState(localState);
    const remote = normalizeSyncState(remoteState);
    const merged = {
      vocab: mergeProgressMaps(local.vocab, remote.vocab),
      grammar: mergeProgressMaps(local.grammar, remote.grammar),
    };

    if (remote.streak && (!local.streak || (remote.streak.lastDate && (!local.streak.lastDate || remote.streak.lastDate > local.streak.lastDate)))) {
      merged.streak = remote.streak;
    } else {
      merged.streak = local.streak || {};
    }

    return merged;
  }

  function docRef(uid) {
    return db.collection("users").doc(uid);
  }

  // No debounce — every local change pushes right away. (An earlier version
  // batched changes over ~1.5s to cut down on writes; removed since the
  // free-tier write quota isn't remotely a concern for one person's study
  // data, and immediate is simpler to reason about than "eventually".)
  function doPush(data) {
    const user = auth.currentUser;
    if (!user) return Promise.reject(new Error("not signed in"));
    return docRef(user.uid).set({ state: normalizeSyncState(data), updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
  }
  function pushToCloud(data) {
    if (!auth.currentUser) return;
    doPush(data).catch((e) => console.warn("Cloud sync push failed:", e));
  }

  if (window.JPStudyProgress) {
    window.JPStudyProgress.onLocalChange = pushToCloud;
  }

  // Manual "save now" — same push, just with visible loading/confirmation
  // feedback instead of trusting an invisible background call. Also useful
  // as a diagnostic: a permission error here means Firestore rules, not a
  // code problem.
  syncSaveNowBtn.addEventListener("click", () => {
    if (!window.JPStudyProgress || !auth.currentUser) return;
    const originalText = syncSaveNowBtn.textContent;
    syncSaveNowBtn.disabled = true;
    syncSaveNowBtn.textContent = "…";
    doPush(window.JPStudyProgress.getSyncSnapshot())
      .then(() => {
        syncSaveNowBtn.textContent = t("savedConfirm");
      })
      .catch((e) => {
        console.error("Manual save failed:", e);
        syncSaveNowBtn.textContent = originalText;
        showError(friendlyError(e));
      })
      .finally(() => {
        syncSaveNowBtn.disabled = false;
        setTimeout(() => {
          syncSaveNowBtn.textContent = originalText;
        }, 1800);
      });
  });

  // Live listener: stays subscribed the whole time you're signed in. Fires
  // once immediately with the current cloud state (handles the initial
  // sign-in sync), then again automatically whenever the document changes
  // — including from a different device or a different tab on this one.
  // hasPendingWrites filters out the echo of OUR OWN not-yet-confirmed
  // writes, so this only reacts to genuinely external changes.
  let unsubscribeSnapshot = null;
  function startListening(uid) {
    stopListening();
    unsubscribeSnapshot = docRef(uid).onSnapshot(
      (docSnap) => {
        if (docSnap.metadata.hasPendingWrites) return;
        const remote = docSnap.exists && docSnap.data().state ? docSnap.data().state : {};
        const local = window.JPStudyProgress ? window.JPStudyProgress.getSyncSnapshot() : {};
        const merged = mergeSyncState(local, remote);
        if (window.JPStudyProgress) window.JPStudyProgress.set(merged);
        // If local had something the cloud didn't yet (e.g. studied on this
        // device before ever signing in), push the merge back — but only
        // when it actually adds something, to avoid an echo loop of
        // pointless identical writes on every snapshot.
        if (JSON.stringify(merged) !== JSON.stringify(normalizeSyncState(remote))) {
          pushToCloud(merged);
        }
      },
      (e) => console.warn("Cloud sync listener error:", e)
    );
  }
  function stopListening() {
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
      unsubscribeSnapshot = null;
    }
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      syncOpenBtn.hidden = true;
      syncActiveStatus.hidden = false;
      syncActiveEmail.textContent = user.email;
      startListening(user.uid);
    } else {
      stopListening();
      syncOpenBtn.hidden = false;
      syncActiveStatus.hidden = true;
    }
  });
})();
