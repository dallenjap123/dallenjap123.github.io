// Grammar reference data, grouped by JLPT level.
// Each entry has: pattern, lesson, meaning (a general explanation of the
// core idea), uses (an array of { label, explanation, examples: [{jp, en}] }
// covering every distinct use/nuance of the pattern), and commonMistakes
// (an array of { wrong, explanation } — realistic learner errors and why
// they are wrong).

window.GRAMMAR_DATA = {
  N5: [
  ],
  N4: [
    // 1課
    {
      pattern: "〜より…／〜ほど…ません",
      lesson: 1,
      meaning:
        "This entry covers how Japanese expresses comparisons between two things. The particle より marks the thing being compared against (the 'less than' side), while ほど is used together with a negative predicate to say something does not reach the degree of something else. Together these two constructions let you express both 'more than' and 'not as much as' relationships, as well as superlatives when より is combined with a question word.",
      uses: [
        {
          label: "Comparing two things directly with より",
          explanation:
            "より attaches to the noun representing the standard of comparison — the thing that is being outranked. The item that has 'more' of the quality goes at the front of the sentence as the topic/subject, and the adjective or verb describing the compared quality comes at the end. Word order matters: the noun marked with より is always the one with the lesser degree, so it is easy to accidentally reverse the meaning if you swap the two nouns.",
          examples: [
            { jp: "このアパートは前のアパートより便利です。", en: "This apartment is more convenient than the previous one." },
            { jp: "わたしはいつも両親より早く起きます。", en: "I always get up earlier than my parents." },
            { jp: "今日はきのうより暑いですね。", en: "It's hotter today than it was yesterday, isn't it." },
          ],
        },
        {
          label: "Superlatives with 疑問詞＋より",
          explanation:
            "When より is attached to a question word such as 何 (なに/なん), だれ, or どこ, the sentence takes on a superlative meaning — 'more than anything/anyone/anywhere,' i.e. 'the most.' This is a natural way to express a superlative in Japanese without needing a separate 'most' word, and it is very common with 何より to mean 'more than anything else.'",
          examples: [
            { jp: "わたしは何より音楽が好きです。", en: "I like music more than anything else." },
            { jp: "この店のラーメンはどこよりおいしいと思います。", en: "I think this shop's ramen is the most delicious anywhere." },
            { jp: "けんはクラスのだれよりも足が速いです。", en: "Ken is faster on his feet than anyone else in the class." },
          ],
        },
        {
          label: "Negative comparisons with 〜ほど…ません",
          explanation:
            "To say that one thing does not reach the degree of another, use noun ＋ ほど followed by a negative predicate: 'AはBほど〜ません' means 'A is not as ~ as B.' The noun marked by ほど represents the standard being fallen short of. This is essentially the negative counterpart of the より comparison, and the negative predicate is required — ほど cannot be used this way with an affirmative ending.",
          examples: [
            { jp: "A「この町は今はにぎやかですが、むかしはどうでしたか。」B「むかしは今ほどにぎやかではありませんでしたよ。」", en: "A: \"This town is lively now, but what was it like in the past?\" B: \"It wasn't as lively back then as it is now.\"" },
            { jp: "わたしは兄ほど背が高くありません。", en: "I'm not as tall as my older brother." },
            { jp: "今年の冬はきょ年ほど寒くないですね。", en: "This winter isn't as cold as last year's, is it." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "私は兄より背が高いです。 (said while intending to mean the brother is taller)",
          explanation:
            "より always marks the noun with the lesser degree, and the subject before the copula/adjective is the one with more of the quality. If you want to say your brother is taller than you, the sentence must be 兄は私より背が高いです, not the reverse — swapping the two nouns flips the meaning entirely.",
        },
        {
          wrong: "兄は私ほど背が高いです。",
          explanation:
            "ほど…ません is a negative construction; it cannot be paired with an affirmative predicate to mean 'as tall as.' To make a positive equal comparison, use a different pattern such as 〜くらい (兄は私と同じくらい背が高いです), and reserve ほど for negative sentences like 兄は私ほど背が高くありません.",
        },
        {
          wrong: "がっこうより早く帰ります。 (using より to mean 'from')",
          explanation:
            "より here is being confused with the particle から, which marks a starting point in time or place. より in this grammar point is strictly a comparison marker ('more than X'), not a 'from' marker — use から for 'from school.'",
        },
      ],
    },
    {
      pattern: "〜より〜のほう",
      lesson: 1,
      meaning:
        "This pattern is used to state a preference or to compare two things by pointing out which one wins out. Rather than simply describing a difference in degree, のほう singles out one of the two items as 'the one that is more ~,' making it a natural way to answer questions about preference.",
      uses: [
        {
          label: "Stating which of two things is preferred or greater",
          explanation:
            "The structure is 「NounAより NounBのほうが〜」, meaning 'NounB is more ~ than NounA.' のほう literally means 'the direction/side of,' so the sentence is picking out noun B's 'side' as having more of the quality in question. This pattern is commonly used to express personal preference (which of two options someone likes better) and is rarely used in negative form — if you want a negative comparison, 〜ほど…ません is used instead.",
          examples: [
            { jp: "わたしより弟のほうが背が高いです。", en: "My younger brother is taller than me." },
            { jp: "前のテキストのほうがこのテキストよりよかったです。", en: "The previous textbook was better than this one." },
            { jp: "わたしはご飯よりパンのほうをよく食べます。", en: "I eat bread more often than rice." },
            { jp: "電車よりバスのほうが便利です。", en: "The bus is more convenient than the train." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "弟のほうより、わたしは背が高いです。",
          explanation:
            "のほう attaches to the noun being praised/preferred, and より attaches to the noun being compared against — mixing up which particle goes with which noun garbles the sentence. The correct pattern is NounAより NounBのほうが〜, e.g. わたしより弟のほうが背が高いです.",
        },
        {
          wrong: "コーヒーのほうが紅茶よりおいしくないです。",
          explanation:
            "〜のほう is rarely used in negative sentences to make a comparison, because it awkwardly implies 'not more' rather than clearly stating which one is better. To express a negative comparison naturally, use 〜ほど…ません instead: 紅茶はコーヒーほどおいしくないです.",
        },
      ],
    },
    {
      pattern: "〜と〜とどちら",
      lesson: 1,
      meaning:
        "This is the standard way to ask someone to choose between two options — the equivalent of 'which one, A or B?' in English. It sets up two items with と and then asks which one wins using どちら (or the more casual どっち), and the expected answer usually uses 〜のほう or どちらも ('both').",
      uses: [
        {
          label: "Asking someone to choose between two options",
          explanation:
            "The structure is 「NounAとNounBとどちらが〜ですか」, literally 'As for A and B, which is ~?' どちら can be replaced by どっち in casual speech. The item being asked about (that which is preferred, cheaper, more interesting, etc.) is marked with が in the question, and answers typically use 〜のほうが〜 to name the winner, or どちらも to say both apply equally.",
          examples: [
            { jp: "コーヒーと紅茶とどちらがいいですか。", en: "Which would you prefer, coffee or tea?" },
            { jp: "A「東駅までバスと電車とどちらが安いですか。」B「バスのほうが10円安いです。」", en: "A: \"Which is cheaper to Higashi Station, the bus or the train?\" B: \"The bus is 10 yen cheaper.\"" },
            { jp: "A「テレビでアニメとニュースとどちらをよく見ますか。」B「どちらもあまり見ませんが……。」", en: "A: \"Which do you watch more on TV, anime or the news?\" B: \"I don't watch either much, honestly...\"" },
            { jp: "夏と冬とどちらが好きですか。", en: "Which do you like better, summer or winter?" },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "コーヒーや紅茶とどちらがいいですか。",
          explanation:
            "The two items being compared must both be marked with と (AとBとどちら), not や, which is used for listing examples from an open-ended set. Mixing や into this pattern breaks the 'choose between exactly these two' meaning.",
        },
        {
          wrong: "Answering with バスは安いです when asked どちらが安いですか",
          explanation:
            "A どちら question expects an answer that names the winner, typically with 〜のほうが〜, e.g. バスのほうが安いです. Just restating a fact about one item without のほう sounds incomplete as an answer to a 'which one' question.",
        },
      ],
    },

    // 2課
    {
      pattern: "〜ながら…",
      lesson: 2,
      meaning:
        "〜ながら links two actions performed by the same person at the same time, presenting one as the main action and the other as an accompanying background action. It corresponds to English 'while ~ing,' and is one of the most common ways in Japanese to describe doing two things simultaneously, like listening to music while cooking.",
      uses: [
        {
          label: "Describing two simultaneous actions by the same subject",
          explanation:
            "ながら attaches to the ます-stem of a verb describing a continuous action (e.g. 見ながら, 聞きながら, 歩きながら). The verb before ながら is the secondary, background action, while the main verb of the sentence — the one that carries the tense and is the real point of the sentence — comes after. Both actions must be performed by the same subject; ながら cannot be used when two different people are doing two different things at the same time.",
          examples: [
            { jp: "きれいな海を見ながらさんぽしました。", en: "I took a walk while looking at the beautiful sea." },
            { jp: "母は音楽を聞きながら料理を作ります。", en: "My mother cooks while listening to music." },
            { jp: "アルバイトをしながら大学に通いました。", en: "I attended university while working a part-time job." },
            { jp: "テレビを見ながらご飯を食べないでください。", en: "Please don't eat while watching TV." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "わたしはテレビを見ながら、弟は勉強しました。",
          explanation:
            "ながら requires that both actions share the same subject. Here the subject of 'watching TV' (わたし) is different from the subject of 'studying' (弟), so ながら cannot be used; instead you would need two separate clauses connected differently, such as わたしがテレビを見ている間、弟は勉強しました.",
        },
        {
          wrong: "食べながら終わりました。 (using ながら on a completed, non-continuous action)",
          explanation:
            "ながら needs a verb describing an ongoing, continuous action in the background — it doesn't attach naturally to verbs describing a one-time completed event. Choose a verb that can plausibly continue over time, like 食べながら話しました rather than trying to pair it with 終わる.",
        },
      ],
    },
    {
      pattern: "〜ところです",
      lesson: 2,
      meaning:
        "ところです marks a specific point in the timeline of an action — right before it starts, right in the middle of it, or right after it finishes. The verb form used right before ところ changes depending on which of these three points you mean, so ところ works almost like a lens that lets you zoom in on one moment relative to an action.",
      uses: [
        {
          label: "Dictionary form ＋ ところです — about to start",
          explanation:
            "Attaching ところです to the plain dictionary form of a verb (e.g. 始まるところです, 行くところです) expresses that the action is just about to begin, but hasn't started yet. This is often used to reassure someone that something is imminent, such as a train about to depart or a meeting about to begin.",
          examples: [
            { jp: "あ、試合が始まるところですよ。早く、早く。", en: "Oh, the match is just about to start. Hurry, hurry." },
            { jp: "今から出かけるところです。", en: "I'm just about to head out now." },
            { jp: "これから晩ご飯を作るところです。", en: "I'm just about to make dinner now." },
          ],
        },
        {
          label: "〜ている ＋ ところです — in the middle of doing something",
          explanation:
            "Attaching ところです to the 〜ている form of a verb (e.g. しらべているところです) expresses that the action is currently underway — you are right in the middle of doing it. This is useful for describing your current progress when someone asks what you're up to.",
          examples: [
            { jp: "今、インターネットで店の場所をしらべているところです。", en: "I'm just now looking up the shop's location online." },
            { jp: "今、レポートを書いているところです。", en: "I'm right in the middle of writing the report now." },
            { jp: "A「もう晩ご飯を食べましたか。」B「いえ、今食べているところです。」", en: "A: \"Have you eaten dinner yet?\" B: \"No, I'm eating it right now.\"" },
          ],
        },
        {
          label: "た form ＋ ところです — just finished",
          explanation:
            "Attaching ところです to the plain past (た) form of a verb (e.g. 着いたところです) expresses that the action has just finished — it happened only a moment ago. This emphasizes how recently the action was completed, more so than simply using the past tense alone.",
          examples: [
            { jp: "サラ「もしもし、今どこ？もう駅にいるの？」トム「うん、ちょうど今駅に着いたところだよ。」", en: "Sara: \"Hello, where are you? Are you at the station already?\" Tom: \"Yeah, I just got to the station right now.\"" },
            { jp: "今、家に帰ったところです。", en: "I just got home this very moment." },
            { jp: "この本はさっき読み終わったところです。", en: "I just finished reading this book a moment ago." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "きのう、駅に着いたところです。 (using ところ with a time far in the past)",
          explanation:
            "ところです emphasizes that something just happened, is just happening, or is just about to happen — it strongly implies 'right now,' so it clashes with time expressions like きのう (yesterday) that place the event well in the past. For distant past events, just use the plain past tense without ところ.",
        },
        {
          wrong: "食べるところでした、を使って「もう食べました」を表す",
          explanation:
            "Using dictionary form ＋ ところです (about to start) when you actually mean the action is finished mixes up the three forms. Remember: dictionary form = about to start, ている form = in progress, た form = just finished — each requires its own distinct verb form before ところ.",
        },
      ],
    },
    {
      pattern: "〜まで…・〜までに…",
      lesson: 2,
      meaning:
        "Both まで and までに set a time limit, but they answer different questions. まで describes something that continues up until a certain point, answering 'how long,' while までに describes a deadline by which a one-time action must be completed, answering 'by when.' Mixing the two up is one of the most common mistakes learners make with time expressions.",
      uses: [
        {
          label: "〜まで — a continuous state or action lasting until a point in time",
          explanation:
            "まで is followed by a verb or state that continues without interruption up to the point mentioned — such as waiting, staying somewhere, or not going home. The emphasis is on the ongoing duration, so the verb after まで should describe something that keeps happening continuously until that time is reached.",
          examples: [
            { jp: "ひこうきの出発時間まで、ここで待っています。", en: "I'll wait here until the plane's departure time." },
            { jp: "この仕事が終わるまで帰らないでください。", en: "Please don't go home until this work is finished." },
            { jp: "夜おそくまで勉強しました。", en: "I studied until late at night." },
          ],
        },
        {
          label: "〜までに — a deadline by which a one-time action must occur",
          explanation:
            "までに is followed by a verb describing a single, short-duration action that must be completed at some point no later than the time mentioned — the action itself doesn't continue up to that moment, it merely has to happen by then. This makes までに the natural choice for deadlines like 'pay by the 20th' or 'clean up before the guests arrive.'",
          examples: [
            { jp: "二十日までに旅行のお金をはらいます。", en: "I'll pay for the trip by the 20th." },
            { jp: "おきゃくさんが来るまでにへやをかたづけてね。", en: "Tidy up the room before the guests arrive." },
            { jp: "レポートは金曜日までに出してください。", en: "Please submit the report by Friday." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "二十日まで旅行のお金をはらいます。 (using まで for a one-time deadline)",
          explanation:
            "はらう ('to pay') is a one-time action, not a continuous state, so it needs までに, not まで. まで here would incorrectly suggest you keep paying continuously up until the 20th, rather than paying once by that date.",
        },
        {
          wrong: "この仕事が終わるまでに帰らないでください。 (using までに for a continuous state)",
          explanation:
            "「帰らないでください」describes a continuous state (not going home) that lasts until the work is done, so it should use まで, not までに. までに would incorrectly frame 'not going home' as a one-time action with a deadline rather than an ongoing situation.",
        },
      ],
    },

    // 3課
    {
      pattern: "〜ませんか",
      lesson: 3,
      meaning:
        "〜ませんか is a polite way to invite someone to do something together, or to suggest that the listener do something. By phrasing the invitation as a negative question ('won't you ~?'), Japanese softens the suggestion and leaves room for the other person to decline gracefully, which makes it feel more polite than a direct command or straightforward request.",
      uses: [
        {
          label: "Inviting someone to do something together or suggesting an action",
          explanation:
            "〜ませんか attaches to the ます-stem of a verb (e.g. 食べませんか, 来ませんか) and can be used either for an activity the speaker wants to do jointly with the listener, or for something only the listener would do. In casual speech among friends, the plain negative form (〜ない?) is often used instead of the polite 〜ませんか, keeping the same soft, inviting nuance.",
          examples: [
            { jp: "A「ひさしぶりにテニスをしませんか。」B「あ、いいですね。」", en: "A: \"Would you like to play tennis together again, it's been a while?\" B: \"Oh, sounds good.\"" },
            { jp: "A「あした、うちに来ませんか。」B「あの、あしたはちょっと……。」", en: "A: \"Would you like to come to my place tomorrow?\" B: \"Um, tomorrow's a bit...\"" },
            { jp: "トム「これ、食べない？おいしいよ。」サラ「じゃ、一つもらうね。」", en: "Tom: \"Won't you try this? It's good.\" Sara: \"Okay, I'll have one.\"" },
            { jp: "いっしょに映画を見に行きませんか。", en: "Won't you go see a movie with me?" },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "いっしょに行くませんか。",
          explanation:
            "〜ませんか must attach to the ます-stem of the verb, not the dictionary form — the correct conjugation is 行きませんか (from 行きます), not 行くませんか.",
        },
        {
          wrong: "Treating 〜ませんか as a simple yes/no question about ability or fact",
          explanation:
            "〜ませんか is specifically an invitation/suggestion form, not a neutral question about whether something happens. Asking '食べませんか' means 'won't you eat (this)?' as an invitation, not 'do you not eat?' — for a literal fact question use plain negative question forms with appropriate context instead.",
        },
      ],
    },
    {
      pattern: "〜ましょう(か)",
      lesson: 3,
      meaning:
        "〜ましょう and 〜ましょうか both build on a spirit of cooperation, but they point in different directions: 〜ましょう proposes doing something together, while 〜ましょうか typically offers to do something for the other person, or asks for their go-ahead before acting. Both are more direct and assume more agreement than 〜ませんか, which merely floats an invitation.",
      uses: [
        {
          label: "〜ましょう — proposing a joint action",
          explanation:
            "〜ましょう attaches to the ます-stem of a verb and proposes that speaker and listener do something together, with the expectation that the listener will agree. It's commonly used once an invitation has already been accepted, to move things forward — e.g. after agreeing to eat together, 行きましょう ('let's go') wraps up the plan. In casual speech, the volitional form (よう/う, e.g. 行こう) replaces 〜ましょう among close friends.",
          examples: [
            { jp: "A「もう5時ですね。」B「じゃ、帰りましょうか。」", en: "A: \"It's already 5.\" B: \"Well then, shall we head home?\"" },
            { jp: "A「いっしょに食事をしませんか。」B「いいですね。何を食べましょうか。」A「すしを食べませんか。」B「そうですね。じゃ、行きましょう。」", en: "A: \"Would you like to eat together?\" B: \"Sure, what shall we eat?\" A: \"How about sushi?\" B: \"Sounds good, let's go.\"" },
            { jp: "疲れたから、少し休みましょう。", en: "I'm tired, so let's rest a little." },
          ],
        },
        {
          label: "〜ましょうか — offering to do something for the listener",
          explanation:
            "When 〜ましょうか is used with an action that only the speaker would perform (not a shared activity), it functions as an offer — 'shall I ~ (for you)?' — seeking the listener's consent before acting on their behalf. This is a very polite, considerate way to volunteer help, such as offering to turn on the light or carry someone's bag.",
          examples: [
            { jp: "A「電気、つけましょうか。」B「ええ、おねがいします。」", en: "A: \"Shall I turn on the light?\" B: \"Yes, please.\"" },
            { jp: "トム「そのにもつ、持とうか。」サラ「あ、ありがとう。」", en: "Tom: \"Shall I carry that for you?\" Sara: \"Oh, thanks.\"" },
            { jp: "写真をとりましょうか。", en: "Shall I take a photo (for you)?" },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "Using 〜ましょう when only the listener will act (a suggestion, not a joint plan)",
          explanation:
            "〜ましょう implies the speaker is joining in the action too. If only the listener is expected to do something (e.g. suggesting they see a doctor), 〜ましょう sounds like the speaker is also going, which can be confusing — a suggestion aimed only at the listener is often better phrased with 〜たほうがいいですよ or 〜てください.",
        },
        {
          wrong: "食べましょうか to mean 'shall I eat (this) for you'",
          explanation:
            "Whether 〜ましょうか reads as 'let's ~' or 'shall I ~ for you' depends on context and whether the action is naturally shared or solo. With an action like 食べる that is normally done by the speaker themself, 食べましょうか usually just proposes eating together ('shall we eat?'), not an offer to eat on someone else's behalf — for a true offer, choose a verb that clearly benefits the listener, such as 持ちましょうか ('shall I carry it?').",
        },
      ],
    },

    // 4課
    {
      pattern: "〜(られ)ます",
      lesson: 4,
      meaning:
        "This is the potential form, used to express that someone is capable of doing something, or that a situation makes something possible. It's formed by conjugating the verb itself (rather than adding a separate helper phrase), and once a verb is in its potential form, it behaves grammatically like an ordinary intransitive verb — most notably, the direct object particle を is usually replaced by が.",
      uses: [
        {
          label: "Expressing ability or possibility by conjugating the verb itself",
          explanation:
            "For る-verbs, the potential form replaces る with られる (e.g. 食べる → 食べられる); for う-verbs, the final u-sound changes to an e-sound plus る (e.g. 話す → 話せる, 飲む → 飲める); irregular verbs become 来られる and できる. This form is used with verbs describing intentional human actions to express either personal capability (e.g. being able to speak a language) or a possibility inherent to the situation (e.g. a museum where famous paintings can be viewed). Because the potential verb describes a state of 'being possible' rather than an active deed, the object particle を commonly shifts to が.",
          examples: [
            { jp: "ジョーさんは英語と日本語と中国語が話せます。", en: "Joe can speak English, Japanese, and Chinese." },
            { jp: "はなちゃんはまだ一人で服が着られません。", en: "Hana-chan still can't get dressed by herself." },
            { jp: "このびじゅつかんでは有名なえが見られます。", en: "At this museum you can see famous paintings." },
            { jp: "この水は飲めません。", en: "This water isn't drinkable." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "英語を話せます。",
          explanation:
            "Once a verb is in its potential form, the direct object particle を is normally replaced with が, since the sentence is now describing a state of possibility rather than a direct action — 英語が話せます is the more natural, standard form, though を is sometimes tolerated informally.",
        },
        {
          wrong: "見えられます / 聞こえられます (double-marking potential on already-potential verbs)",
          explanation:
            "見える and 聞こえる are inherently potential verbs already meaning 'can be seen/heard' — they must not be conjugated again with られる. Use them as-is (見えます, 聞こえます) rather than treating them like ordinary verbs that still need a potential ending added.",
        },
        {
          wrong: "食べれます (as the only form taught, without recognizing ら-nuki as casual)",
          explanation:
            "The fully grammatical potential form of a る-verb keeps ら: 食べられます. Dropping ら to get 食べれます (ら抜き言葉) is common in casual speech but is considered non-standard in formal writing and polite/formal contexts, so learners should default to the ら-form in most study and test contexts.",
        },
      ],
    },
    {
      pattern: "〜ができます・〜ことができます",
      lesson: 4,
      meaning:
        "This pattern is another way to express ability, permission, or the general existence of a possibility, but instead of conjugating the verb itself, it adds a separate phrase — ができます after a noun, or ことができます after a verb. It tends to sound a little more formal or explanatory than the direct potential form (〜られます), which makes it common in written explanations, rules, and announcements.",
      uses: [
        {
          label: "Expressing capability or permission with 〜ができます／ことができます",
          explanation:
            "For nouns describing an activity, ができます attaches directly (e.g. 買い物ができます, 'shopping is possible/can be done'). For verbs, the dictionary form is followed by ことができます (e.g. 入ることができます, 'is able to enter'). This construction covers the same range of meanings as the potential form — inherent capability, situational possibility, and granted permission — but reads as slightly more formal and is often preferred in written or explanatory contexts, such as describing store hours or rules.",
          examples: [
            { jp: "このコンビニは24時間買い物ができます。", en: "This convenience store lets you shop 24 hours a day." },
            { jp: "今、この建物の中には入ることができません。", en: "Right now you can't enter this building." },
            { jp: "わたしは日本の県の名前をぜんぶ言うことができます。", en: "I can name all of Japan's prefectures." },
            { jp: "この図書館では本を10冊まで借りることができます。", en: "At this library you can borrow up to 10 books." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "話すができます。",
          explanation:
            "ができます attaches directly to a noun, not a verb — for verbs, you need to nominalize them with こと first: 話すことができます, not 話すができます.",
        },
        {
          wrong: "日本語を勉強するがことできます。",
          explanation:
            "The correct order is verb (dictionary form) + ことができます, with こと coming immediately after the verb and before が: 日本語を勉強することができます. Reordering こと and が breaks the phrase.",
        },
      ],
    },
    {
      pattern: "見えます・聞こえます",
      lesson: 4,
      meaning:
        "見えます and 聞こえます describe something being naturally visible or audible — you didn't have to make an effort to look or listen, it simply reaches your eyes or ears on its own (or fails to, if conditions are poor). This is different from 見る/聞く, which describe the deliberate act of looking at or listening to something.",
      uses: [
        {
          label: "Describing something as naturally perceptible (or not)",
          explanation:
            "見えます is used for things that come into view on their own — such as scenery visible from a window — while 聞こえます is used for sounds that reach the ear naturally, such as the sound of wind. Neither verb requires deliberate effort on the part of the observer; they describe passive, automatic perception. Both can be negated to describe poor visibility or inaudibility, such as not being able to see well without glasses.",
          examples: [
            { jp: "いいへやですね。まどから海が見えます。", en: "Nice room. You can see the sea from the window." },
            { jp: "めがねがありませんから、よく見えません。", en: "I don't have my glasses, so I can't see well." },
            { jp: "風の音が聞こえるね。", en: "You can hear the sound of the wind, can't you." },
            { jp: "となりのへやから音楽が聞こえます。", en: "Music can be heard from the room next door." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "まどから海を見えます。",
          explanation:
            "見える and 聞こえる are intransitive/potential-type verbs, so the thing being seen or heard is marked with が, not を: まどから海が見えます, not 海を見えます.",
        },
        {
          wrong: "Using 見えます when talking about deliberately watching something, e.g. 映画が見えます to mean 'I watched a movie'",
          explanation:
            "見えます describes something that naturally comes into view, not the deliberate act of watching. To describe intentionally watching a movie, use 見ます (映画を見ます), reserving 見えます for things like scenery or objects that are simply visible without effort.",
        },
      ],
    },

    // 5課
    {
      pattern: "〜たことがあります",
      lesson: 5,
      meaning:
        "〜たことがあります describes a past experience — something you have done at least once at some point in your life, without specifying exactly when. It shifts the focus from 'what happened' to the fact that the experience exists in your personal history, which is why it's often paired with frequency words like 一度 ('once') or 何度も ('many times').",
      uses: [
        {
          label: "Describing a past experience at an unspecified point in time",
          explanation:
            "〜たことがあります attaches to the plain past (た) form of a verb. It is used for experiences, not for recent or specific one-time events — asking 昨日行ったことがありますか about something from yesterday would sound strange, since the whole point of the pattern is a general life experience rather than a specific recent occurrence. It pairs naturally with frequency expressions like 一度, 一度も (with negative), or 何度も, but not with habitual-frequency words like いつも or たいてい, which describe regular routines rather than one-off experiences.",
          examples: [
            { jp: "前に一度テレビドラマに出たことがあります。", en: "I've appeared in a TV drama once before." },
            { jp: "A「入院したことがありますか。」B「いえ、一度もありません。」", en: "A: \"Have you ever been hospitalized?\" B: \"No, never.\"" },
            { jp: "わたしは今まで学校を休んだことがない。", en: "I've never missed school before." },
            { jp: "子どものころ、友だちとけんかしたことが何度もあります。", en: "As a child, I got into fights with friends many times." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "きのう富士山に登ったことがあります。",
          explanation:
            "〜たことがあります is for general life experience, not events tied to a specific, recent time — pairing it with きのう ('yesterday') sounds unnatural. For a specific recent event, simply use the plain past tense: きのう富士山に登りました.",
        },
        {
          wrong: "わたしはいつも海外旅行をしたことがあります。",
          explanation:
            "〜たことがあります describes whether an experience has occurred at all, not how often it happens as a routine — habitual frequency words like いつも or たいてい clash with it. Use plain habitual sentences for routines (いつも海外旅行をします) and reserve 〜たことがあります for phrasing like 何度も海外旅行をしたことがあります ('I've traveled abroad many times').",
        },
        {
          wrong: "富士山に登ることがあります。 (dropping た to mean past experience)",
          explanation:
            "Dropping the past tense and attaching ことがあります to the dictionary form changes the meaning entirely, turning it into 'sometimes ~ happens' (a different grammar point) rather than 'have done ~ before.' The past-experience meaning requires the た form: 富士山に登ったことがあります.",
        },
      ],
    },
    {
      pattern: "〜ことがあります",
      lesson: 5,
      meaning:
        "〜ことがあります describes something that happens occasionally but not regularly — an unusual or irregular occurrence rather than a routine habit. It's a way of softening a statement to show that something isn't the norm, just something that occasionally comes up.",
      uses: [
        {
          label: "Describing an occasional, non-routine occurrence",
          explanation:
            "〜ことがあります attaches to the dictionary form of a verb (or the negative plain form) and describes something that happens from time to time, but not so often that it counts as a regular habit. It's often paired with words like このごろ ('these days') or ときどき ('sometimes') to reinforce the occasional nature of the event. The variant 〜こともあります is used interchangeably, often to add 'also' nuance — e.g. after describing the usual routine, adding that an exception also sometimes happens.",
          examples: [
            { jp: "母はこのごろ人の名前を忘れることがあります。", en: "My mother sometimes forgets people's names these days." },
            { jp: "雪の日は道ですべることがありますから、注意してください。", en: "On snowy days you can sometimes slip on the road, so please be careful." },
            { jp: "サラはときどきぼくの話を聞いていないことがある。", en: "Sara sometimes isn't listening to what I say." },
            { jp: "A「毎朝何時ごろ朝ご飯を食べますか。」B「いつもは7時に食べますが、時間がないときは食べないこともあります。」", en: "A: \"About what time do you eat breakfast each morning?\" B: \"Usually at 7, but when I don't have time I sometimes don't eat at all.\"" },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "毎日勉強することがあります。 (to describe a daily habit)",
          explanation:
            "〜ことがあります specifically implies something is not a regular routine — using it with 毎日 ('every day') contradicts that meaning. For daily habits, simply state the habitual action plainly (毎日勉強します) without ことがあります.",
        },
        {
          wrong: "Confusing 〜ことがあります with 〜たことがあります",
          explanation:
            "〜ことがあります (dictionary form) means 'sometimes ~ happens' (an occasional occurrence in general), while 〜たことがあります (past form) means 'have done ~ before' (a past experience). Dropping or adding た changes the meaning completely, so be careful to match the intended nuance to the correct verb form.",
        },
      ],
    },

    // 6課
    {
      pattern: "〜てもいいです／〜てはいけません",
      lesson: 6,
      meaning:
        "These two forms sit at opposite ends of granting and restricting permission. 〜てもいいです says an action is allowed (or acceptable even if not ideal), while 〜てはいけません says an action is forbidden. Together they form the basic vocabulary for talking about rules, permission, and prohibition in Japanese.",
      uses: [
        {
          label: "〜てもいいです — granting permission or expressing acceptability",
          explanation:
            "〜てもいいです attaches to the て form of a verb (or adjective/noun + でも) and expresses that an action is permitted, or that a certain condition is acceptable even if not preferred — often used to describe what's fine to compromise on, such as accepting a small room. As a question, 〜てもいいですか is how you politely ask for permission to do something yourself.",
          examples: [
            { jp: "トム「ここにすわってもいいですか。」女の人「ええ、どうぞ。」", en: "Tom: \"May I sit here?\" Woman: \"Yes, go ahead.\"" },
            { jp: "安いへやをさがしています。せまくてもいいです。", en: "I'm looking for a cheap room. It's fine if it's small." },
            { jp: "ここで写真をとってもいいですか。", en: "Is it okay to take photos here?" },
          ],
        },
        {
          label: "〜てはいけません — expressing prohibition",
          explanation:
            "〜てはいけません attaches to the て form of a verb and expresses that an action is forbidden — a fairly strong, direct way of saying 'must not.' It's often used by someone in a position of authority (a parent, teacher, or rule-setter) speaking to someone they're warning or instructing, and can sound quite firm, so it's usually softened in more formal or distant relationships.",
          examples: [
            { jp: "はなちゃん、一人で川に行ってはいけないよ。", en: "Hana-chan, you mustn't go to the river alone." },
            { jp: "入社試験のときの服は、Tシャツではいけません。", en: "You can't wear a T-shirt for the job entrance exam." },
            { jp: "としょかんの中で大きい声で話してはいけません。", en: "You mustn't talk loudly inside the library." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "すわてもいいですか。",
          explanation:
            "〜てもいいです attaches to the て form of the verb, which requires correct te-form conjugation — すわる becomes すわって, so the correct phrase is すわってもいいですか, not すわてもいいですか.",
        },
        {
          wrong: "Using 〜てはいけません to a superior or in a very polite context, e.g. telling your boss 帰ってはいけません",
          explanation:
            "〜てはいけません is a direct, somewhat strong prohibition typically used top-down (parent to child, teacher to student, or in official rules). Using it toward someone of higher status can sound rude or presumptuous; softer alternatives like 〜ないほうがいいと思います are more appropriate in those contexts.",
        },
        {
          wrong: "Confusing てもいい (permission) with たらいい (advice/suggestion)",
          explanation:
            "〜てもいいです grants permission for an action ('you may do X'), while a form like 〜たらいいです gives advice or a suggestion ('it would be good if you did X'). These serve different communicative purposes and shouldn't be used interchangeably even though both contain いい.",
        },
      ],
    },
    {
      pattern: "〜なくてもいいです／〜なければなりません",
      lesson: 6,
      meaning:
        "These two forms describe necessity from opposite directions. 〜なくてもいいです says something doesn't need to be done — there's no obligation — while 〜なければなりません says something absolutely must be done. Between them, they cover the full range of talking about what's required versus optional.",
      uses: [
        {
          label: "〜なくてもいいです — expressing absence of necessity",
          explanation:
            "〜なくてもいいです attaches to the negative (nai) stem of a verb, or to an adjective/noun in negative form, and expresses that there's no need to do something, or that a condition doesn't have to be met. It's often used to reassure someone that a requirement they might be worried about doesn't actually apply, such as a doctor telling a patient medication is no longer needed.",
          examples: [
            { jp: "医者「もう薬を飲まなくてもいいですよ。」病気の人「そうですか。ああ、よかった。」", en: "Doctor: \"You don't need to take the medicine anymore.\" Patient: \"Really? Oh, what a relief.\"" },
            { jp: "いいホテルはありませんか。駅に近くなくてもいいです。", en: "Are there any good hotels? It doesn't have to be near the station." },
            { jp: "お母さん、はこ、ない？じょうぶでなくてもいいよ。", en: "Mom, do you have a box? It doesn't have to be sturdy." },
          ],
        },
        {
          label: "〜なければなりません — expressing necessity or obligation",
          explanation:
            "〜なければなりません also attaches to the negative (nai) stem of a verb, or to an adjective/noun in negative form, but expresses the opposite: that something absolutely must be done or must be the case, regardless of preference. It's a common, fairly neutral way to state obligations, rules, or requirements, such as needing to reply to an email or a signature needing to match.",
          examples: [
            { jp: "Eメールのへんじを書かなければなりません。", en: "I have to write a reply to the email." },
            { jp: "ここのサインはあなたのでなければなりません。", en: "The signature here has to be yours." },
            { jp: "あしたは朝早く起きなければなりません。", en: "I have to get up early tomorrow morning." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "飲まなければもいいです。 (blending the two forms)",
          explanation:
            "〜なくてもいいです and 〜なければなりません are two separate, complete constructions, not interchangeable pieces — combining なければ with もいいです produces an ungrammatical hybrid. Use 飲まなくてもいいです for 'don't have to drink' or 飲まなければなりません for 'must drink.'",
        },
        {
          wrong: "行かないてもいいです。",
          explanation:
            "The negative stem must connect with なくても, not ないて — the correct form drops the い of ない and adds くても: 行かなくてもいいです, not 行かないてもいいです.",
        },
      ],
    },

    // 7課
    {
      pattern: "〜がほしいです・〜たいです",
      lesson: 7,
      meaning:
        "This entry covers how to express desire in Japanese — wanting a thing versus wanting to do something — as well as how those expressions change when talking about someone else's wants rather than your own. Japanese distinguishes desire expressions quite strictly by whether the subject is the speaker or a third party, which is different from English, where 'want' works the same regardless of subject.",
      uses: [
        {
          label: "〜がほしいです — wanting a thing (the speaker's own desire)",
          explanation:
            "ほしいです is an い-adjective meaning 'wanted/desired,' used with a noun marked by が to say the speaker wants that thing. It's used only for the speaker's own desires (or in questions, the listener's), since it directly expresses an internal feeling that can't normally be known for certain about a third party.",
          examples: [
            { jp: "わたしは自分のへやがほしいです。", en: "I want my own room." },
            { jp: "おもちゃがいっぱいあるね。けんがほしいのはどれ？", en: "There are so many toys. Which one does Ken want?" },
            { jp: "新しいくつがほしいです。", en: "I want new shoes." },
          ],
        },
        {
          label: "〜たいです — wanting to do something (the speaker's own desire)",
          explanation:
            "たい attaches to the ます-stem of a verb (e.g. 読みたい, 飲みたい) and conjugates like an い-adjective (たかった for past, たくない for negative). Like がほしいです, it's used for the speaker's own wishes to perform an action (or the listener's, in questions), and the object particle を is often replaced by が, similar to potential verbs.",
          examples: [
            { jp: "ああ、ゆっくり本が読みたいなあ。", en: "Ahh, I want to read a book slowly and leisurely." },
            { jp: "ぼく、この薬、飲みたくないよ。", en: "I don't want to take this medicine." },
            { jp: "7時の新幹線に乗りたかったのですが、間に合いませんでした。", en: "I wanted to catch the 7 o'clock shinkansen, but I didn't make it in time." },
          ],
        },
        {
          label: "〜がります・〜たがります — describing a third party's wants",
          explanation:
            "Because directly stating what someone else wants (using ほしいです or たいです as-is) would presume to know their inner feelings, Japanese instead uses 〜がります (from ほしい → ほしがる) or 〜たがります (from たい → たがる) to describe a third party's desire as something observed from the outside — based on their words or behavior. This form is typically used for people or animals other than the speaker.",
          examples: [
            { jp: "うちの犬はいつもわたしが食べている物をほしがります。", en: "Our dog always wants whatever I'm eating." },
            { jp: "あんな寒い所にはだれも行きたがりませんよ。", en: "Nobody wants to go to a place that cold." },
            { jp: "弟は新しいゲームをほしがっています。", en: "My little brother wants a new video game." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "弟はこのゲームがほしいです。 (using ほしいです directly for a third party)",
          explanation:
            "ほしいです and たいです describe the speaker's own internal desire and are not normally used to state a third party's want as flat fact. To talk about someone else's desire, switch to the observational form: 弟はこのゲームをほしがっています.",
        },
        {
          wrong: "水を飲みたいです。 (worrying を is wrong here)",
          explanation:
            "With 〜たいです, the object particle を is often naturally replaced with が (水が飲みたいです), but keeping を is also commonly accepted, especially when there's distance between the object and たい, or in casual speech — this is a case where either can work, unlike stricter potential-form rules, so it's not really an 'error,' but learners should recognize が as the more typical textbook form.",
        },
        {
          wrong: "犬がほしいがっています。",
          explanation:
            "When converting ほしい to the third-party form, you drop い and add がる/がっている directly onto the stem: ほしがっています, not ほしいがっています — don't keep the original い before attaching がる.",
        },
      ],
    },
    {
      pattern: "〜といいです",
      lesson: 7,
      meaning:
        "〜といいです is used to express a hope about something outside the speaker's control — a wish that a certain situation will come about, often something the speaker cannot directly influence, like the weather or someone else's circumstances. It's frequently softened at the end with ね, けど, or なあ, giving it a warm, hopeful tone.",
      uses: [
        {
          label: "Expressing a hope about an uncontrollable future situation",
          explanation:
            "〜といいです attaches after a plain-form verb, adjective, or noun+だ, and describes something the speaker hopes will happen or be true. Because it expresses a wish rather than an intention, it's used with non-volitional situations — things the speaker can't directly cause to happen, such as the weather, someone else finding a job, or an illness turning out not to be serious. It is not used to state the speaker's own intended actions.",
          examples: [
            { jp: "いい仕事が見つかるといいですね。", en: "I hope you find a good job." },
            { jp: "運動会の日、雨がふらないといいですけど……。", en: "I hope it doesn't rain on sports day..." },
            { jp: "のどがいたいの？悪いかぜでないといいけど。", en: "Does your throat hurt? I hope it's not a bad cold." },
            { jp: "へやがもっと広いといいけどなあ。", en: "I wish the room were bigger." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "わたしはあした早く起きるといいです。 (using といいです for the speaker's own planned action)",
          explanation:
            "といいです expresses a hope about something outside the speaker's control, not the speaker's own intention to act — for stating your own plan to get up early, just use a plain statement of intention (あした早く起きようと思います), reserving 〜といいです for wishes like 「あした早く起きられるといいですね」('I hope I'm able to get up early tomorrow').",
        },
        {
          wrong: "雨がふるといいですね。 (forgetting the negative when hoping something doesn't happen)",
          explanation:
            "To hope something will NOT happen, the verb before と must be negative: 雨がふらないといいですね means 'I hope it doesn't rain,' while 雨がふるといいですね would actually mean 'I hope it rains' — the polarity of the verb before と directly controls the meaning of the wish.",
        },
      ],
    },

    // 8課
    {
      pattern: "〜そうです（様態）",
      lesson: 8,
      meaning:
        "This そうです (not to be confused with the hearsay そうです, which reports what you heard from someone else) expresses an impression or inference based on what you can currently see or sense — that something looks, seems, or appears to be a certain way, or seems likely to happen, based on visual cues or circumstances in front of you.",
      uses: [
        {
          label: "Expressing an appearance-based impression or inference",
          explanation:
            "For い-adjectives, そうです attaches to the stem (おいしい → おいしそう; note the irregular いい → よさそう). For な-adjectives, it attaches directly to the stem (しんぱい → しんぱいそう). For verbs, it attaches to the ます-stem (おちる → おちそう, 帰れる → 帰れそう) to express that something looks like it's about to happen or seems likely based on current signs. The negative form for verbs is 〜そうもありません／〜そうにありません, meaning something doesn't look likely to happen at all.",
          examples: [
            { jp: "あ、テーブルの上のコップがおちそうですよ。", en: "Oh, the cup on the table looks like it's about to fall." },
            { jp: "わあ、おいしそうなケーキですね。", en: "Wow, that cake looks delicious." },
            { jp: "ジョンさんはしんぱいそうに電話で話しています。", en: "John is talking on the phone, looking worried." },
            { jp: "夏休みには国へ帰れそうです。", en: "It looks like I'll be able to go home during summer break." },
            { jp: "とてもいい天気です。雨はふりそうもありませんね。", en: "It's very fine weather. It doesn't look like it's going to rain at all." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "いいそうなケーキですね。",
          explanation:
            "いい is irregular when forming appearance そう — it changes to よ before attaching そう: よさそう, not いいそう. So 'looks good' is よさそうですね, and 'looks delicious' keeps its regular form, おいしそうですね.",
        },
        {
          wrong: "きのう雨がふりそうでした、と言いたいのに聞いた話として伝える (confusing appearance そう with hearsay そう)",
          explanation:
            "There are two different そうです constructions that look identical in name but attach differently: appearance そう attaches to adjective stems/verb stems (雨がふりそうです, 'looks like it'll rain,' based on what you currently observe), while hearsay そう attaches to the plain form of the whole sentence (雨がふるそうです, 'I heard it will rain,' based on something you were told). Mixing up which conjugation goes with which meaning is a very common error.",
        },
        {
          wrong: "この本はおもしろいそうな話です (using appearance そう where the connector should be な, forgetting adjective attaches without な when modifying differently)",
          explanation:
            "When appearance そう modifies a following noun, it needs な between them, like an な-adjective: おもしろそうな話 ('a story that seems interesting'), not おもしろいそうな話 — remember to drop the い of the original い-adjective before adding そう in the first place.",
        },
      ],
    },
    {
      pattern: "〜がっています・〜がります",
      lesson: 8,
      meaning:
        "This pattern is used to describe a third party's emotions or wishes from the outside — since you can't directly know what someone else feels, Japanese marks such statements with がる/がっている rather than stating the feeling as flat fact. It's typically used for people close to the speaker (family members, children) or people of lower status, and less often for someone the speaker should show more distance/respect toward.",
      uses: [
        {
          label: "〜がっています — describing a third party's current emotional state",
          explanation:
            "がっています attaches to the stem of an emotion-expressing い-adjective (さびしい → さびしがっています) or na-adjective/verb stem expressing feeling, and describes what a third party appears to be feeling right now, based on observable behavior — such as a mother showing signs of loneliness after a pet's death. This is the 'in the moment' version of the pattern.",
          examples: [
            { jp: "犬が死にました。母はさびしがっています。", en: "The dog died. My mother is showing signs of loneliness." },
            { jp: "子どもたちはおもしろがってゲームであそんでいます。", en: "The children are playing the game, finding it fun." },
            { jp: "妹はさっきから何かをこわがっています。", en: "My little sister has been looking scared of something since a while ago." },
          ],
        },
        {
          label: "〜がります — describing a general trend or tendency, not just the current moment",
          explanation:
            "がります (without ている) is used instead when describing a general, ongoing tendency or trait of a third party — a pattern of behavior rather than a one-time observed state. For example, saying a younger brother 'dislikes scary stories' as a general trait uses がります, rather than がっています, which would instead describe him showing dislike at this very moment.",
          examples: [
            { jp: "弟はこわい話をいやがります。", en: "My younger brother dislikes scary stories." },
            { jp: "うちの子はにがい野菜を食べるのをいやがります。", en: "My child dislikes eating bitter vegetables." },
            { jp: "父はあたらしいことをこわがります。", en: "My father tends to be fearful of new things." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "わたしはこわがっています。 (using がる for one's own feelings)",
          explanation:
            "がる/がっている is reserved for describing someone else's feelings observed from the outside — it's not used for the speaker's own emotions. For your own feelings, just state the plain adjective directly: わたしはこわいです, not わたしはこわがっています.",
        },
        {
          wrong: "Using がっています for a lasting personality trait, e.g. 弟はいつもこわがっています to mean 'my brother is generally a fearful person'",
          explanation:
            "がっています describes a currently observed state, while がります (without ている) better fits a general, ongoing tendency or personality trait. To describe a lasting character trait, 弟はこわがります reads more naturally as a general statement than がっています, which suggests he's showing fear right now.",
        },
      ],
    },
    {
      pattern: "〜まま…",
      lesson: 8,
      meaning:
        "〜まま describes a state that continues unchanged — something is left as it was, without the change you might expect to happen. It's frequently used with a slightly negative or regretful nuance, implying that something should have changed but didn't, such as falling asleep with the window left open.",
      uses: [
        {
          label: "Describing an unchanged, continuing state",
          explanation:
            "まま attaches after a plain past-tense verb (開けたまま), an い-adjective (きたないまま), or a な-adjective/noun + の (先月のまま), and describes a state persisting without alteration while another action or situation occurs. The nuance is often that the lack of change is undesirable or unexpected — the speaker frequently uses まま to point out that something was left in a state it shouldn't have stayed in.",
          examples: [
            { jp: "きのう、まどを開けたままねました。", en: "Yesterday I fell asleep leaving the window open." },
            { jp: "手がきたないままではいけないよ。早くあらって。", en: "You can't leave your hands dirty like that. Go wash them quickly." },
            { jp: "今日は4月1日ですが、カレンダーが先月のままですよ。", en: "Today is April 1st, but the calendar is still showing last month." },
            { jp: "くつをはいたまま部屋に入らないでください。", en: "Please don't enter the room while still wearing your shoes." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "開けるままねました。 (using dictionary form instead of past form)",
          explanation:
            "まま normally follows the plain past (た) form of a verb when describing a completed action whose resulting state continues (開けたまま, 'left open'), not the dictionary form. 開けるまま is not the correct way to express 'leaving it open' in this pattern.",
        },
        {
          wrong: "きたないのままではいけないよ。",
          explanation:
            "い-adjectives attach directly to まま without の (きたないまま), while な-adjectives and nouns need の before まま (先月のまま). Learners often add an unnecessary の after an い-adjective; remember い-adjectives connect directly to まま.",
        },
      ],
    },

    // 9課
    {
      pattern: "〜から…・〜からです",
      lesson: 9,
      meaning:
        "から is one of the most basic and direct ways to state a cause or reason in Japanese, roughly corresponding to 'because.' It can appear in the middle of a sentence to connect a reason to its result, or stand at the end of a sentence as からです, directly answering a 'why' question.",
      uses: [
        {
          label: "Stating a cause or reason, sometimes fairly emphatically",
          explanation:
            "から attaches to the plain form of a verb, adjective, or noun+だ (だ often becomes plain だから or is dropped in casual contexts), and links a reason clause to the resulting clause that follows. When used at the very end of a sentence as からです, it directly explains the reason for something already stated, often in answer to a why-question. Compared to ので, から can carry a slightly more assertive, personal tone, since it directly asserts the speaker's own reasoning.",
          examples: [
            { jp: "ちょっと用事がありますから、今日は先に帰ります。", en: "I have a little errand, so I'll head home first today." },
            { jp: "あぶないから、さわらないで！", en: "It's dangerous, so don't touch it!" },
            { jp: "スピーチが上手にできませんでした。れんしゅうが足りなかったからです。", en: "I couldn't give the speech well. It's because I didn't practice enough." },
            { jp: "頭がいたいから、今日は早くねます。", en: "I have a headache, so I'm going to bed early today." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "なぜ休みましたか。「あたまがいたいですから」だけで答える (fine, but be careful with tone)",
          explanation:
            "This isn't wrong grammatically, but から can sound blunt or assertive as a direct answer, especially to someone of higher status — in more formal contexts, softening with 〜のでです or adding more context (体調が悪かったからです, with an explanation before it) tends to sound politer than a bare からです reply.",
        },
        {
          wrong: "静かからです、を「静かだからです」の代わりに使う (dropping だ before から with a na-adjective/noun)",
          explanation:
            "な-adjectives and nouns need だ before から (静かだから, 学生だから) — dropping だ, as in 静かから, is ungrammatical. Only in casual speech is だ sometimes omitted before other connectors, but から generally still needs it.",
        },
      ],
    },
    {
      pattern: "〜ので…",
      lesson: 9,
      meaning:
        "ので also expresses cause and reason, similar to から, but with a softer, more polite, matter-of-fact tone. It presents the reason as an objective circumstance rather than the speaker's personal justification, which makes it well suited to polite requests, apologies, and formal explanations.",
      uses: [
        {
          label: "Stating a reason politely and objectively",
          explanation:
            "ので attaches to the plain form of a verb or adjective, and to na-adjectives/nouns with な (な instead of だ, e.g. 静かなので). Because of its softer, more objective tone, ので is commonly used in polite requests and apologies (asking to take the day off, explaining why you're leaving early), but it is not used directly before imperative commands (よめ, こい) or before fixed polite formulas like すみません and ありがとう, where から or a plain reason clause is more natural.",
          examples: [
            { jp: "すみません、頭がいたいので、今日は休みます。", en: "Excuse me, I have a headache, so I'll take today off." },
            { jp: "この子はまだ5さいなので、バス代はかかりません。", en: "This child is still 5, so there's no bus fare." },
            { jp: "雨がふっていたので、今日はさんぽに行かなかった。", en: "Since it was raining, I didn't go for a walk today." },
            { jp: "電車がおくれたので、会議に間に合いませんでした。", en: "The train was delayed, so I didn't make it to the meeting in time." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "静かのなので (attaching ので directly to a na-adjective without な)",
          explanation:
            "Na-adjectives and nouns require な before ので, not だ and not nothing: 静かなので, 学生なので — using だ (静かだので) or omitting the connector entirely is incorrect with ので, unlike から, which does take だ.",
        },
        {
          wrong: "静かにしてくださいので (using ので right before an imperative)",
          explanation:
            "ので is not used directly before imperative-style commands like よめ (read!) or こい (come!) — such contexts favor から instead. Also, ので tends to sound odd immediately preceding set polite phrases like すみません or ありがとう as the very next clause; から or simply stating the reason plainly fits better there.",
        },
      ],
    },
    {
      pattern: "〜て…・〜くて…・〜で…",
      lesson: 9,
      meaning:
        "This is a lighter, more implicit way of connecting a cause to an emotional or perceptual reaction, using the same connective forms that link two clauses together generally (て for verbs, くて for い-adjectives, で for な-adjectives/nouns). It's especially common for expressing why you feel a certain way, and carries a softer, more natural feel than explicitly stating a reason with から or ので.",
      uses: [
        {
          label: "Connecting a cause to an emotional or perceptual result",
          explanation:
            "Verbs use the て form (あって, おくれて), い-adjectives use くて (さびしくて, formed by dropping the final い and adding くて), and な-adjectives/nouns use で (しんぱいで). This construction is used especially often with words describing feelings and sensations (lonely, worried, glad) and cannot be followed by a clause expressing the speaker's own hope, intention, or request — for those, から or ので are needed instead, since 〜て cannot introduce a volitional statement.",
          examples: [
            { jp: "きのうはたくさん仕事があって、たいへんでした。", en: "Yesterday I had a lot of work, and it was tough." },
            { jp: "友だちがいなくて、さびしい。", en: "I don't have any friends, and I'm lonely." },
            { jp: "しんぱいで、よくねむれませんでした。", en: "I was worried, and couldn't sleep well." },
            { jp: "教えてくれて、ありがとう。", en: "Thanks for telling me." },
            { jp: "おくれて、すみませんでした。", en: "Sorry for being late." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "さびしいて、うちに帰りたいです。 (keeping い before くて)",
          explanation:
            "い-adjectives must drop the final い before attaching くて — さびしい becomes さびしくて, not さびしいて. This is a simple but common conjugation slip.",
        },
        {
          wrong: "頭がいたくて、今日休みたいです。 (using て-cause before a volitional/request clause)",
          explanation:
            "This て-cause construction cannot be followed by a clause expressing the speaker's own hope, intention, or request — such combinations sound unnatural. For a reason leading into a request or intention like 'wanting to take the day off,' use ので or から instead: 頭がいたいので、今日は休みたいです.",
        },
        {
          wrong: "しんぱいだで、よくねむれませんでした。",
          explanation:
            "Na-adjectives connect to this causal で directly, without an extra だ in front — しんぱいで is correct, while しんぱいだで incorrectly keeps the copula だ before で.",
        },
      ],
    },

    // 10課
    {
      pattern: "〜に…",
      lesson: 10,
      meaning:
        "This に expresses the purpose behind a movement — going somewhere, coming somewhere, or returning somewhere in order to do something. It's a compact way to fold 'in order to ~' into a sentence about physical movement, without needing a separate purpose clause.",
      uses: [
        {
          label: "Expressing the purpose of a movement verb",
          explanation:
            "に attaches to the ます-stem of a verb describing an intentional action (さんぽに, とりに, むかえに) or directly to a noun describing an activity (かいものに), and is followed by one of a limited set of motion verbs — chiefly 行きます, 来ます, 帰ります, もどります. This construction is more compact than a full purpose clause and is specifically restricted to movement verbs; it can't be used before verbs unrelated to physically going, coming, or returning somewhere.",
          examples: [
            { jp: "父はこうえんへさんぽに行きました。", en: "My father went to the park to take a walk." },
            { jp: "うちにさいふをわすれたので、とりに帰ります。", en: "I left my wallet at home, so I'm going back to get it." },
            { jp: "あした、8時に友だちがうちにむかえに来る。", en: "Tomorrow at 8, a friend is coming to my place to pick me up." },
            { jp: "デパートへくつを買いに行きます。", en: "I'm going to the department store to buy shoes." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "本を読みに勉強しました。 (using に before a non-movement verb)",
          explanation:
            "This purpose に can only be followed by verbs of movement such as 行きます, 来ます, 帰ります, もどります — it cannot be used before an unrelated verb like 勉強しました. For purposes attached to non-movement verbs, a different construction such as ために is needed instead.",
        },
        {
          wrong: "さんぽをに行きました。",
          explanation:
            "When a noun describing an activity is used with this に, it attaches directly to the noun without an extra を: さんぽに行きました, not さんぽをに行きました.",
        },
      ],
    },
    {
      pattern: "〜ため(に)…",
      lesson: 10,
      meaning:
        "〜ため(に) expresses the purpose behind an action — doing one thing for the sake of accomplishing another. Unlike the movement-only に purpose pattern, ため(に) can be used with a much wider range of actions, not just physical movement, as long as the same person is responsible for both the purpose and the resulting action.",
      uses: [
        {
          label: "Expressing the purpose of an intentional action",
          explanation:
            "ため(に) attaches after a noun + の (けっこんしきのために) or after a verb in dictionary form (しゅっせきするため), and states the goal behind an intentional action. The subject performing the purpose-action and the subject performing the main action must be the same person. ため can also be used without に directly before a noun to modify it, describing what something is 'for' (漢字をれんしゅうするための本, 'a book for practicing kanji').",
          examples: [
            { jp: "けっこんしきのために、いろいろじゅんびをしています。", en: "I'm making various preparations for the wedding." },
            { jp: "アニメの勉強のために、日本にりゅうがくします。", en: "I'm studying abroad in Japan in order to study anime." },
            { jp: "社長は会議にしゅっせきするため、アメリカへ行きました。", en: "The president went to America in order to attend a meeting." },
            { jp: "これは漢字をれんしゅうするための本です。", en: "This is a book for practicing kanji." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "母が晩ご飯を作るために、わたしは買い物に行きました。 (different subjects before and after ため)",
          explanation:
            "ため(に) requires that the same person be responsible for both the purpose and the resulting action. If the subjects differ (mother cooking, but the speaker shopping), ため(に) doesn't fit naturally — a different construction expressing benefit, such as 母のために ('for my mother's sake'), would be needed instead.",
        },
        {
          wrong: "日本に行くために、日本語が上手になりたいです。 (using ため with a non-volitional result)",
          explanation:
            "ため(に) is for purposes behind intentional actions, and the clause that follows should also describe something the subject is actively doing on purpose. A wish or non-volitional change like 上手になりたい doesn't pair naturally as the 'main action' here; ため(に) fits better with a clearly deliberate action such as 日本語を勉強します.",
        },
      ],
    },
    {
      pattern: "〜ように…",
      lesson: 10,
      meaning:
        "〜ように expresses a hope or wish that something will come about, similar in spirit to purpose expressions, but used specifically with things the speaker cannot directly will into happening themselves — like being able to hear well, or a third party's actions. It's often translated as 'so that ~.'",
      uses: [
        {
          label: "Expressing a wish that a non-volitional situation will occur",
          explanation:
            "ように attaches to the dictionary or negative plain form of a verb that does not represent the speaker's own direct, willful action — this includes potential verbs, verbs describing states, and verbs whose subject is a third person. The clause with ように states the hoped-for outcome, and the following clause states what the speaker will do to help bring that outcome about (e.g. sitting near the front so as to hear well, leaving early so as not to be late).",
          examples: [
            { jp: "話がよく聞こえるように、前のほうにすわりましょう。", en: "Let's sit near the front so we can hear the talk well." },
            { jp: "いい風が入るように、まどを大きく開けた。", en: "I opened the window wide so that a nice breeze would come in." },
            { jp: "ゆきの日、学校におくれないように、早く家を出ました。", en: "On the snowy day, I left home early so as not to be late for school." },
            { jp: "けがをしないように、気をつけてね。", en: "Be careful not to get hurt." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "宿題をするように、勉強しました。 (using ように with the speaker's own direct volitional action)",
          explanation:
            "ように is reserved for outcomes that are not the speaker's own direct, willful action — potential verbs, states, or third-party actions. Since するように describes an ordinary volitional action by the speaker themselves, this pattern doesn't fit; for purposes involving the speaker's own deliberate action, ため(に) is the correct choice instead.",
        },
        {
          wrong: "先生が来るために、部屋をきれいにしました。 (using ため for someone else's uncontrolled action as the goal)",
          explanation:
            "When the 'goal' clause describes a third party's action or something outside the speaker's control (the teacher arriving), ように fits better than ため(に), which assumes the same subject performs both the goal-action and the main action. The more natural phrasing here uses ように for an outcome the speaker hopes to help bring about but cannot directly control: 先生が来るときまでに部屋がきれいになっているように、そうじをしました.",
        },
      ],
    },

    // 11課
    {
      pattern: "(〜も)〜し、(〜も)…",
      lesson: 11,
      meaning:
        "This pattern is used to line up two or more reasons, facts, or qualities that together support a conclusion, decision, or overall impression. Each clause ends in the plain form of a verb, adjective, or noun/na-adjective (with だ) followed by し, giving the sentence a cumulative, additive feel of 'not only X, but Y as well.' Because し signals that the speaker is compiling supporting evidence rather than stating a single tight cause, it reads as looser and more conversational than から or ので. When し is used only once at the end of a stated reason, it often implies that other unspoken reasons exist too, leaving the sentence feeling open-ended.",
      uses: [
        {
          label: "Listing cumulative reasons or qualities",
          explanation:
            "し attaches to the plain form of the predicate in each clause — i-adjectives and verbs attach directly (安いし, 降っているし), while na-adjectives and nouns require だ before し (親切だし, 学生だし). The particle も is frequently added to the topic of each clause (にもつも〜, 雨も〜) to emphasize that this is one of several supporting points. The final clause typically states the resulting decision, action, or feeling that the listed reasons justify.",
          examples: [
            { jp: "にもつも多いし、雨もふっているし、タクシーで行きましょう。", en: "There's a lot of luggage, and it's raining too, so let's go by taxi." },
            { jp: "ねだんもちょうどいいし、このベッドを買います。", en: "The price is just right too, so I'll buy this bed." },
            { jp: "今日は早く帰りたい。ちょっと頭がいたいし……。", en: "I want to go home early today. My head hurts a bit too..." },
            { jp: "この店のパンはおいしいし、安いです。", en: "This shop's bread is tasty, and cheap." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "月曜日は忙しいだし、火曜日も忙しいだ。", explanation: "だ only attaches before し after nouns and na-adjectives, never after i-adjectives. い-adjectives attach directly in the plain form: 忙しいし, not 忙しいだし." },
        { wrong: "先生親切し、やさしいし、人気があります。", explanation: "Nouns and na-adjectives need だ before し (親切だし), unlike i-adjectives, which connect directly. Dropping だ here is a very common oversight." },
      ],
    },
    {
      pattern: "〜たり〜たりします",
      lesson: 11,
      meaning:
        "This pattern lists a few representative actions or states as examples, with no concern for the order in which they happen. It's used for describing a typical range of activities on a day off, a series of things done for some occasion, or a state that keeps alternating back and forth (like weather stopping and starting, or a door being opened and closed repeatedly). The listed actions are meant to be illustrative rather than exhaustive — there could be other things happening too.",
      uses: [
        {
          label: "Listing representative or alternating actions",
          explanation:
            "Each verb takes its plain past (た) form before attaching り, and the pattern is usually repeated at least twice, with the final する conjugated for the appropriate tense (します, しました, していました). Beyond simply listing a variety of activities, this pattern is also the natural way to describe something that repeatedly alternates between two states, such as rain starting and stopping, or someone opening and closing a door over and over.",
          examples: [
            { jp: "休みの日はプールでおよいだりテニスをしたりします。", en: "On my days off I do things like swim in the pool and play tennis." },
            { jp: "パーティーのために料理を作ったり飲み物を買ったりした。", en: "For the party I did things like cook food and buy drinks." },
            { jp: "きのうは一日中雨がふったりやんだりしていました。", en: "Yesterday it rained on and off all day." },
            { jp: "はなちゃん、ドアを開けたりしめたりしないで。", en: "Hana-chan, stop opening and closing the door." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "雨がふるたりやむたりしていました。", explanation: "たり attaches to the plain past (た) form of the verb, not the dictionary form — it should be ふったりやんだり, matching the た-form conjugation pattern (降る→降った→降ったり)." },
        { wrong: "テニスをしたり。", explanation: "The pattern needs a concluding conjugated する (します/しました/していました) to close the sentence and show tense; たり alone lists actions but can't end a sentence grammatically." },
      ],
    },

    // 12課
    {
      pattern: "〜かもしれません",
      lesson: 12,
      meaning:
        "This pattern expresses a weak, uncertain possibility — something the speaker thinks could be true or could happen, but isn't confident about. It's roughly equivalent to English 'might' or 'maybe,' and sits at the lower end of the certainty scale compared to はずです (confident expectation) and でしょう (probable inference). It can attach to almost any predicate and is used for both present and past guesses.",
      uses: [
        {
          label: "Expressing an uncertain possibility",
          explanation:
            "Verbs and i-adjectives attach in their plain form directly (ふるかもしれません, 正しくなかったかもしれません), while na-adjectives and nouns drop だ before かもしれません (サラさんのかもしれない, たいへんかもしれない). Because it signals genuine uncertainty rather than a reasoned conclusion, it's often used for casual speculation about weather, ownership, or how things might turn out.",
          examples: [
            { jp: "あしたはゆきがふるかもしれませんね。", en: "It might snow tomorrow." },
            { jp: "このノートはサラさんのかもしれないよ。", en: "This notebook might be Sara's." },
            { jp: "あのときの言い方は正しくなかったかもしれないなあ。", en: "The way I said it back then might not have been right." },
            { jp: "今度の仕事はたいへんかもしれないけど、がんばってね。", en: "This next job might be tough, but do your best." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "あしたはいい天気だかもしれません。", explanation: "だ is dropped before かもしれません for na-adjectives and nouns in the present affirmative — it should be 天気かもしれません, not 天気だかもしれません." },
        { wrong: "彼はもう家に着いたかもしれません（実は正確な時刻表を知っているのに）。", explanation: "かもしれません signals weak, genuinely uncertain possibility. If you actually have solid evidence or reasoning to support a confident conclusion, はずです is the correct choice instead — don't downgrade a well-grounded expectation to かもしれません." },
      ],
    },
    {
      pattern: "〜はずです",
      lesson: 12,
      meaning:
        "This pattern is used to state something the speaker is confident about because it follows logically from known facts — not a guess, but a reasoned expectation. It conveys 'it should be the case that ~' or 'it's supposed to be ~,' based on objective grounds like schedules, prior knowledge, or common sense, rather than a subjective impression.",
      uses: [
        {
          label: "Stating a confident, evidence-based expectation",
          explanation:
            "It attaches to the plain form of verbs, i-adjectives, and (with な/だった/の for nouns and na-adjectives) predicates. It's often used when the speaker has a specific piece of background information (an age, a schedule, a known fact) that logically leads to the conclusion, and it's frequently paired with a because-clause (から) that supplies that grounding.",
          examples: [
            { jp: "この犬は2さいのときうちに来たのです。今年12さいのはずです。", en: "This dog came to us when it was 2. It should be 12 this year." },
            { jp: "食べてみて。しんせんな魚だから、おいしいはずだよ。", en: "Try it. It's fresh fish, so it should be delicious." },
            { jp: "あしたの会には山川先生もしゅっせきするはずです。", en: "Professor Yamakawa should also be attending tomorrow's meeting." },
            { jp: "3時のひこうきですから、母はもうひこうきに乗ったはずです。", en: "It's the 3 o'clock flight, so my mother should have already boarded." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "もっと勉強するはずです。（「すべきだ」の意味で）", explanation: "はずです expresses a logical expectation ('it should turn out to be the case'), not moral obligation or advice. For 'you should do X' as a recommendation, use べきです or ほうがいいです instead." },
        { wrong: "この犬は2さいのはずでした。（単に過去の事実を確認するつもりで）", explanation: "〜はずでした often implies the expected thing did NOT actually happen, contrasting an expectation with a different reality. Be careful using it to simply restate a past expectation that turned out to be true — that reads as if something went wrong." },
      ],
    },
    {
      pattern: "〜ようです・〜みたいです",
      lesson: 12,
      meaning:
        "This pattern is used to state an impression or surmise based on what the speaker has directly seen, smelled, heard, or otherwise sensed — it's more grounded than a pure guess but still presented as a personal impression rather than a hard fact. 〜みたいです carries exactly the same meaning as 〜ようです but is a casual, colloquial equivalent, so it should be avoided in formal writing or polite conversation.",
      uses: [
        {
          label: "Stating a sensory-based impression or surmise",
          explanation:
            "For ようです: nouns take の (雨のようです), na-adjectives take な (好きなようです), and i-adjectives/verbs attach directly in the plain form (古いようです, 読んでいるようです). For みたいです, the connection is simpler — it attaches directly to nouns and na-adjective stems without の or な (これみたいです, 好きみたいです), and directly to i-adjectives/verbs just like よう. Both are typically used when something in the immediate situation (a smell, a sound, someone's behavior) leads the speaker to a tentative conclusion.",
          examples: [
            { jp: "この肉は少し古いようです。へんなにおいがします。", en: "This meat seems a bit old. It smells strange." },
            { jp: "けん君は本が好きなようですね。いつも何か読んでいます。", en: "Ken seems to like books. He's always reading something." },
            { jp: "はなちゃんはこのおかしがほしいみたいだね。こちらを見ているよ。", en: "Hana-chan seems to want this snack. She's looking this way." },
            { jp: "お母さん、げんかんにだれか来たみたいだよ。トントンと音がしたよ。", en: "Mom, it seems like someone's at the front door. I heard a knocking sound." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "静かようです。", explanation: "Na-adjectives require な before ようです (静かなようです), not だ or nothing at all — this is a very frequent conjugation slip." },
        { wrong: "先生、この資料はまちがっているみたいです。（フォーマルな場で）", explanation: "みたいです is casual and should be avoided when speaking formally or to a superior — ようです is the appropriate, more polite equivalent in the same situation." },
      ],
    },

    // 13課
    {
      pattern: "〜なさい",
      lesson: 13,
      meaning:
        "This pattern forms a direct instruction or mild command, softer than a bare imperative but still firmly directive. It's used by people in a position of authority speaking to those under their care or instruction — teachers to students, parents to children — and also appears in written instructions on tests and worksheets. It is not appropriate between equals or toward someone of higher status.",
      uses: [
        {
          label: "Giving an instruction or command to a child or student",
          explanation:
            "なさい attaches to the ます-stem of the verb (ね+なさい, 出し+なさい, 書き+なさい), not the dictionary form. Because it presumes a clear power relationship between speaker and listener, it sounds natural from a teacher to a class or a parent to a child, but would sound presumptuous or rude used toward a colleague, stranger, or superior.",
          examples: [
            { jp: "子どもは早くねなさい。", en: "Children, go to bed early." },
            { jp: "しゅくだいを出しなさい。", en: "Turn in your homework." },
            { jp: "つぎの言葉を漢字で書きなさい。", en: "Write the following words in kanji." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "部長、資料を送りなさい。", explanation: "なさい implies authority over the listener (teacher over student, parent over child). Using it toward a superior or colleague sounds inappropriately bossy — use a request form like 送ってください instead." },
        { wrong: "ねるなさい。", explanation: "なさい attaches to the ます-stem of the verb, not the dictionary form — it should be ねなさい (from ねます), not ねるなさい." },
      ],
    },
    {
      pattern: "〜ほうがいいです",
      lesson: 13,
      meaning:
        "This pattern is used to give advice or a mild warning, often implying that something undesirable will happen if the suggested action isn't taken. It softens the directness of a command into a recommendation, roughly meaning 'it would be better to ~' or, in the negative, 'you'd better not ~.'",
      uses: [
        {
          label: "Giving advice or a soft warning",
          explanation:
            "For affirmative advice, ほうがいい attaches to the plain past (た) form of the verb even though the advice concerns a future action (行ったほうがいい, 着たほうがいい). For negative advice, it attaches to the plain nonpast negative (ない) form, never the past negative (出かけないほうがいい, not 出かけなかったほうがいい). It's commonly used when there's a real risk of a bad outcome if the advice is ignored.",
          examples: [
            { jp: "会場に行く前に地図で場所をしらべたほうがいいですね。", en: "It's better to check the location on a map before heading to the venue." },
            { jp: "寒いから、コートを着たほうがいいよ。", en: "It's cold, so you'd better wear a coat." },
            { jp: "ねつがあるの？じゃ、出かけないほうがいいよ。", en: "Do you have a fever? Then you'd better not go out." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "会場に行くほうがいいですね。", explanation: "For affirmative advice, ほうがいい normally attaches to the plain past (た) form even when referring to a future action — it should be 行ったほうがいい, not the dictionary form 行くほうがいい." },
        { wrong: "出かけなかったほうがいいよ。", explanation: "Negative advice uses the plain nonpast negative form (出かけない) before ほうがいい, not the past negative (なかった) — 出かけないほうがいい is correct." },
      ],
    },
    {
      pattern: "〜ないと",
      lesson: 13,
      meaning:
        "This is a colloquial, spoken contraction of longer obligation patterns like 〜なければなりません or 〜なくてはいけません. It's used to prompt oneself or someone else into action when the speaker feels something bad will happen unless it's done, and the いけない/ならない part that would normally follow is simply dropped in casual conversation, letting the sentence trail off.",
      uses: [
        {
          label: "Expressing a casual sense of obligation",
          explanation:
            "It attaches to the plain negative (ない) form of a verb (あらわないと, しないと, 急がないと) and is left hanging, without spelling out いけない or ならない, because the necessity is understood from context and tone. It's common in everyday speech among family and friends but too informal for writing or polite conversation.",
          examples: [
            { jp: "けん、ご飯の前には手をあらわないと。", en: "Ken, you have to wash your hands before eating." },
            { jp: "あ、わすれていた。電話しないと。", en: "Oh, I forgot. I need to make a call." },
            { jp: "早く起きて。ほら、急がないと。間に合わないよ。", en: "Get up quickly. Come on, you have to hurry. You won't make it in time." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "お客様、書類をご提出しないと。（ビジネスメールで）", explanation: "ないと is a colloquial, spoken contraction; it's too casual for formal writing or business correspondence, where 〜なければなりません should be spelled out in full." },
        { wrong: "手をあらうと。（「あらわないと」のつもりで）", explanation: "Dropping the negative ない changes the meaning entirely — 洗うと is a plain conditional ('if you wash'), not an obligation. You must keep the negative before と (洗わないと) to convey 'if you don't ~, it's bad' → 'have to ~.'" },
      ],
    },

    // 14課
    {
      pattern: "〜たら…（１４課）",
      lesson: 14,
      meaning:
        "This pattern expresses a hypothetical condition: 'if ~ were to happen, then ...' The condition in the たら-clause is presented as an assumption rather than a certainty, and is often reinforced with もし ('if, hypothetically') at the start of the sentence. Unlike some other conditional forms, the main clause can freely contain commands, suggestions, questions, or statements of intention.",
      uses: [
        {
          label: "Expressing a hypothetical assumption",
          explanation:
            "たら attaches to the plain past (た) form of the verb or adjective, regardless of whether the overall sentence is about the present or future (なかったら, 起きたら, よかったら). Because the main clause isn't restricted the way it is with ば or と, たら is the go-to form when the result you want to state is a command, an invitation, or a question tied to the hypothetical condition.",
          examples: [
            { jp: "もし水がなかったら、わたしたちは生きられません。", en: "If there were no water, we couldn't live." },
            { jp: "もし大きいじしんが起きたら、すぐつくえの下に入ってください。", en: "If a big earthquake happens, please get under the desk right away." },
            { jp: "あした天気がよかったら、どこかへ行きませんか。", en: "If the weather's nice tomorrow, shall we go somewhere?" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "早く起きると、遅れませんよ。", explanation: "と cannot be followed by a suggestion or reassurance in the main clause. When the main clause contains advice, an invitation, or a command tied to the condition, たら is the correct choice: 早く起きたら、遅れませんよ。" },
        { wrong: "水がなかったら、生きられませんでした。（一般的な仮定のつもりで）", explanation: "For a hypothetical that's still generally true, keep the main clause in the nonpast form (生きられません). Using the past tense here shifts the meaning to a counterfactual about a specific past situation ('if it had been the case back then'), not a general truth." },
      ],
    },
    {
      pattern: "〜ば…・〜なら…",
      lesson: 14,
      meaning:
        "This entry covers two related conditional forms. 〜ば expresses a general or hypothetical condition using the verb/adjective's conditional (仮定形) form: 'if ~, then ...' 〜なら, by contrast, attaches directly to nouns and na-adjectives (and sometimes plain forms) to branch between categories or hypothetical cases, as in 'if it's a boy, ~; if it's a girl, ~.' Both describe a condition leading to a result, but they differ in what they attach to and in how freely the main clause can behave.",
      uses: [
        {
          label: "Hypothetical/general conditional with 〜ば",
          explanation:
            "Verbs form ば from their え-row stem (乗る→乗れば), i-adjectives drop い and add ければ (暑い→暑ければ), and negative forms use なければ (使わなければ). When the ~ば clause describes an action the subject can deliberately choose to do, the main clause cannot be a command, invitation, or statement of the speaker's own intention — たら or なら is used instead in that case.",
          examples: [
            { jp: "バスに乗れば、駅まで10分です。", en: "If you take the bus, it's 10 minutes to the station." },
            { jp: "じしょを使わなければ、この本は読めません。", en: "If you don't use a dictionary, you can't read this book." },
            { jp: "もし暑ければ、クーラーをつけましょうか。", en: "If it's hot, shall I turn on the AC?" },
          ],
        },
        {
          label: "Categorical conditional with 〜なら (branching between cases)",
          explanation:
            "なら attaches directly to a noun or na-adjective stem (男の子なら, 好きなら) without any copula, laying out what follows for each of two or more possible categories or hypothetical cases. This is distinct from the topic-responding 〜なら taught in 15課 (which reacts to something someone else just said) — here it's simply enumerating branches of a hypothetical, without necessarily replying to a prior statement.",
          examples: [
            { jp: "子どもの名前は、男の子なら「こうた」、女の子なら「みちる」がいいです。", en: "For the baby's name, 'Kouta' is good if it's a boy, and 'Michiru' if it's a girl." },
            { jp: "肉が食べられないなら、魚のりょうりにしましょう。", en: "If you can't eat meat, let's go with a fish dish." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "食べればなら、体にいいです。", explanation: "ば and なら are two separate conditional forms and shouldn't be stacked onto the same verb — use one or the other: 食べれば or 食べるなら, not 食べればなら." },
        { wrong: "テストに合格すれば、遊びに行きましょう。", explanation: "When the ~ば clause describes a controllable action the subject can choose to do, the main clause can't be an invitation or suggestion. Use たら or なら instead: 合格したら、遊びに行きましょう。" },
        { wrong: "山田さんが行くなら、わたしも行きます。（誰も何も言っていないのに、いきなりこの言い方をする）", explanation: "This なら reacts naturally to a topic someone just raised ('since you say you're going...'). Using it out of nowhere, with no prior statement to respond to, feels unnatural — that's the topic-based なら from 15課, distinct from the branching/categorical なら used here in 14課." },
      ],
    },
    {
      pattern: "〜と…（１４課）",
      lesson: 14,
      meaning:
        "This pattern expresses that whenever ~ happens, ... automatically or inevitably follows — a mechanical, habitual, or natural-law type of result, closer to 'whenever' than to a genuine hypothetical 'if.' Because the result is framed as an automatic consequence, the main clause cannot contain a command, invitation, or statement of the speaker's own intention.",
      uses: [
        {
          label: "Expressing an automatic or inevitable result",
          explanation:
            "と attaches to the plain nonpast form of verbs and i-adjectives directly (おすと, ねむいと), while nouns and na-adjectives require だ before と (Mサイズだと). It's typically used for machine operations, natural consequences, and directions, where the outcome reliably follows from the condition every time.",
          examples: [
            { jp: "お金を入れてボタンをおすと、きっぷが出ます。", en: "When you insert money and press the button, a ticket comes out." },
            { jp: "ねむいと、頭が働きません。", en: "When I'm sleepy, my head doesn't work." },
            { jp: "Mサイズだと、小さいです。Lサイズをください。", en: "If it's a size M, it's too small. Please give me a size L." },
            { jp: "あのかどを左にまがると、駅が見えます。", en: "If you turn left at that corner, you can see the station." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "駅に着くと、電話してください。", explanation: "と cannot be followed by a command, invitation, or statement of intention in the main clause. Use たら instead: 駅に着いたら、電話してください。" },
        { wrong: "Mサイズと、小さいです。", explanation: "Nouns need だ before と in the present affirmative (Mサイズだと); i-adjectives, by contrast, attach directly without だ (ねむいと, not ねむいだと) — mixing up these two rules is a common slip." },
      ],
    },

    // 15課
    {
      pattern: "〜たら…（１５課）",
      lesson: 15,
      meaning:
        "This pattern shares the same たら form taught in 14課, but here it's used for something the speaker already knows will happen — a scheduled time, an expected milestone, or a predictable event — rather than a genuine hypothetical. It's best translated as 'when ~' rather than 'if ~,' since there's no real doubt about whether the condition will occur.",
      uses: [
        {
          label: "Expressing a known or scheduled future event as 'when'",
          explanation:
            "The form is identical to 14課's hypothetical たら (plain past + ら), but the interpretation shifts because the ~ clause describes something certain: a clock striking a set time, graduating from school, water coming to a boil. Context — not the grammar — signals that this is a 'when,' not an 'if.'",
          examples: [
            { jp: "3時になったら、休みましょう。", en: "When it's 3 o'clock, let's take a break." },
            { jp: "この学校をそつぎょうしたら、何をしますか。", en: "What will you do once you graduate from this school?" },
            { jp: "おゆがわいたら、火を止めてください。", en: "When the water boils, please turn off the heat." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "そつぎょうするとき、何をしますか。（「卒業した後」の意味で）", explanation: "とき can be ambiguous about whether an action happens before, during, or after the main clause's timeframe. たら more clearly signals 'once this is complete, then...' — そつぎょうしたら、何をしますか more precisely asks what you'll do after graduating." },
        { wrong: "予定が決まっている出来事にたらを使うのをためらう（「不確実さを含む」と誤解して）。", explanation: "The form たら is identical whether it expresses a genuine hypothetical 'if' or a known future 'when' — context determines the reading. Using it for scheduled events like 3時になったら or おゆがわいたら is completely natural and implies no doubt at all." },
      ],
    },
    {
      pattern: "〜なら…（１５課）",
      lesson: 15,
      meaning:
        "This pattern expresses the speaker's judgment, suggestion, or intention that follows naturally from a topic just raised — by something another person said, or by an obvious situational cue. It carries the nuance of 'if that's the case, then...' or 'speaking of ~,' directly responding to information already on the table rather than introducing a fresh hypothetical out of nowhere.",
      uses: [
        {
          label: "Responding to a raised topic with judgment or a suggestion",
          explanation:
            "なら attaches directly to nouns (ケーキなら) and to the plain form of verbs and adjectives (行くなら, 見ていないなら) without any copula. It's most natural when reacting to something just mentioned — a question, a stated plan, or an observed situation — making it feel more conversational and responsive than the hypothetical/categorical なら taught in 14課.",
          examples: [
            { jp: "サラ「ケーキがおいしい店を知りませんか。」山田「ケーキなら、駅前のセボンがおいしいですよ。」", en: "Sara: \"Do you know a shop with good cake?\" Yamada: \"For cake, Sebon in front of the station is good.\"" },
            { jp: "トム「春休みに京都に行きたいです。」先生「京都に行くなら、ガイドブックを貸しましょうか。」", en: "Tom: \"I want to go to Kyoto during spring break.\" Teacher: \"If you're going to Kyoto, shall I lend you a guidebook?\"" },
            { jp: "【テレビがついているが、子どもは見ていない】母「見ていないなら、テレビはもう消すよ。」", en: "[The TV is on but the child isn't watching] Mother: \"If you're not watching it, I'm turning the TV off now.\"" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "あした雨がふるなら、かさを持っていきます。（誰も天気の話をしていないのに、いきなり）", explanation: "This なら works best as a response to a topic someone already raised. An isolated guess about tomorrow's weather that nobody mentioned sounds more natural with たら or ば, since なら carries a 'given what you just said' nuance." },
        { wrong: "ケーキだなら、駅前のセボンがおいしいですよ。", explanation: "なら attaches directly after nouns and na-adjective stems without inserting だ — it should be ケーキなら, not ケーキだなら." },
      ],
    },

    // 16課
    {
      pattern: "〜ても…",
      lesson: 16,
      meaning:
        "This pattern expresses a concession: 'even if ~' or 'even though ~,' where the result in the main clause defies what you'd normally expect given the condition. The ~ clause can be either a hypothetical assumption or an established fact, and the pattern is often intensified with もし, どんなに ('no matter how'), いくら ('however much'), or an interrogative word plus でも.",
      uses: [
        {
          label: "Expressing a concessive 'even if / even though'",
          explanation:
            "Verbs and adjectives take their て-form before adding も (ふっても, あつくても), while nouns attach でも directly (子どもでも). It's commonly paired with intensifiers like どんなに or いくら to emphasize that no degree of the condition changes the outcome, and can attach to question words (だれでも, いくらでも) to mean 'no matter who/how much.'",
          examples: [
            { jp: "こうはい「あしたゆきがふったら、れんしゅうは休みですか。」せんぱい「いや、ゆきがふっても、休みじゃないよ。」", en: "Junior: \"If it snows tomorrow, is practice cancelled?\" Senior: \"No, even if it snows, it's not cancelled.\"" },
            { jp: "もし暑くても、仕事にはスーツを着ていきます。", en: "Even if it's hot, I go to work in a suit." },
            { jp: "この料理はかんたんです。はじめて作る人でもできます。", en: "This dish is easy. Even someone making it for the first time can do it." },
            { jp: "山田「ケーキが好きなんでしょう？これ、ぜんぶどうぞ。」トム「え、いくら好きでも、こんなにたくさんは食べませんよ。」", en: "Yamada: \"You like cake, right? Here, have all of it.\" Tom: \"What, even though I like it, I can't eat this much.\"" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "雪がふるでも、練習は休みじゃない。", explanation: "For verbs and adjectives, the て-form + も is required (ふっても, あつくても); でも attaches directly to nouns only (子どもでも), not to verbs in their dictionary form." },
        { wrong: "しゅくだいをやっても、持ってきませんでした。（過去に実際起きたことについての不満のつもりで）", explanation: "ても sets up a hypothetical or general concession ('even if X, Y'). For something that actually happened contrary to expectation, with a nuance of surprise or complaint, のに is the correct choice: しゅくだいをやったのに、持ってきませんでした。" },
      ],
    },
    {
      pattern: "〜のに…",
      lesson: 16,
      meaning:
        "This pattern expresses that something actually happened or is true despite what would normally be expected — closest to English 'even though' or 'and yet.' It carries an emotional undertone of surprise, disappointment, dissatisfaction, or mild reproach, and unlike similar patterns, it can also stand alone at the end of a sentence to let a complaint trail off.",
      uses: [
        {
          label: "Expressing a factual contradiction with surprise or complaint",
          explanation:
            "のに attaches to the plain form of verbs and i-adjectives directly (やったのに, 新しいのに), while na-adjectives and nouns require な before it (3さいなのに, 運動会なのに). Because it expresses the speaker's emotional reaction to an actual state of affairs, it cannot be followed by a command, invitation, or statement of the speaker's own intention in the main clause — for those, から or ので should be used instead.",
          examples: [
            { jp: "きのうしゅくだいをやったのに、持ってきませんでした。", en: "I did the homework yesterday, but I didn't bring it." },
            { jp: "雨がふっていないのに、あの人はかさをさしています。", en: "It's not raining, yet that person has their umbrella up." },
            { jp: "はなちゃんはまだ3さいなのに、漢字がわかる。", en: "Hana-chan is only 3, yet she understands kanji." },
            { jp: "はな「お兄ちゃん、雨がふっているよ。」けん「ほんとう？あーあ、今日は運動会なのに。」", en: "Hana: \"Big brother, it's raining.\" Ken: \"Really? Ugh, and today's sports day...\"" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "熱があるのに、薬を飲んでください。", explanation: "のに, like と, cannot be followed by a command or request in the main clause. If you need to issue a command based on the situation, use から or ので instead: 熱があるから、薬を飲んでください。" },
        { wrong: "静かのに、へやはきたないです。", explanation: "Na-adjectives and nouns require な before のに (静かなのに, 運動会なのに), unlike i-adjectives and verbs, which attach directly." },
      ],
    },

    // 17課
    {
      pattern: "〜と…（１７課）",
      lesson: 17,
      meaning:
        "This と marks the content of something quoted, named, thought, or written — it's the particle that introduces direct speech, labels, opinions, and beliefs before verbs like 言う, 呼ぶ, 思う, 書く, and 答える. It covers two closely related jobs: quoting exact words or names, and reporting a thought or opinion.",
      uses: [
        {
          label: "Quoting speech or naming something with 〜と言う",
          explanation:
            "と attaches directly after a quoted phrase, word, or name, with no extra particle in between, before verbs like 言う or 呼ぶ. It's used both for reporting someone's exact words and for stating what something is called.",
          examples: [
            { jp: "はじめて会った人には「はじめまして」と言います。", en: "You say \"nice to meet you\" to someone you're meeting for the first time." },
            { jp: "サラ「この花は日本語で何と言いますか。」山田「すいせんと言います。」", en: "Sara: \"What is this flower called in Japanese?\" Yamada: \"It's called a daffodil.\"" },
            { jp: "わたしは「手伝いましょうか」と聞きました。", en: "I asked, \"Shall I help?\"" },
          ],
        },
        {
          label: "Reporting a thought or opinion with 〜と思う・書く・答える",
          explanation:
            "と also marks the content of a thought, opinion, or belief before verbs like 思う, 書く, and 答える, attaching to the plain form (with だ for nouns/na-adjectives: とくいだと書きました, 春だと答えました). When describing a third person's ongoing belief rather than the speaker's own present opinion, 〜と思っています is preferred over 〜と思います, which is normally reserved for the speaker's own immediate judgment.",
          examples: [
            { jp: "先生「ジョーさんのはっぴょうをどう思いますか。」トム「とてもよかったと思います。」", en: "Teacher: \"What do you think of Joe's presentation?\" Tom: \"I think it was very good.\"" },
            { jp: "両親はわたしが国へ帰らないと思っています。", en: "My parents think that I won't return to my home country." },
            { jp: "じこしょうかいの作文にわたしは歌がとくいだと書きました。", en: "In my self-introduction essay, I wrote that I'm good at singing." },
            { jp: "日本人の40％が、好きな季節は春だと答えました。", en: "40% of Japanese people answered that their favorite season is spring." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "両親はわたしが国へ帰らないと思います。", explanation: "〜と思います implies the speaker's own present opinion. When describing what a third person (like one's parents) thinks or believes, 〜と思っています is required instead." },
        { wrong: "この花は日本語ですいせんです、と言います。", explanation: "When と marks a quoted word or name, no extra copula is inserted before it — it should be すいせんと言います, not すいせんですと言います。" },
        { wrong: "歌がとくいと書きました。", explanation: "Nouns and na-adjectives need だ before と when reporting a thought or statement in the present affirmative — とくいだと書きました, not とくいと書きました; i-adjectives and verbs attach directly without だ." },
      ],
    },
    {
      pattern: "〜か…・〜かどうか…",
      lesson: 17,
      meaning:
        "This pattern is used when a question is embedded inside a larger sentence, as the object of verbs like 教える, おぼえる, 知る, しらべる, or わかる. Which form to use depends on whether the embedded question already contains an interrogative word (who, what, when, where, how) or is simply a yes/no question.",
      uses: [
        {
          label: "Embedded question containing an interrogative word + か",
          explanation:
            "When the embedded question already includes an interrogative such as だれ, 何, いつ, どこ, or どうやって, it's simply closed off with か — no どうか is added. The clause before か is in the plain form.",
          examples: [
            { jp: "パーティーにだれが来るか教えてください。", en: "Please tell me who's coming to the party." },
            { jp: "きのうどうやって帰ったかおぼえていません。", en: "I don't remember how I got home yesterday." },
            { jp: "サラさんの誕生日はいつか知っていますか。", en: "Do you know when Sara's birthday is?" },
          ],
        },
        {
          label: "Embedded yes/no question with 〜かどうか",
          explanation:
            "When the embedded question has no interrogative word and is a simple yes/no question, かどうか ('whether or not') is used instead of か alone. It attaches to the plain form of verbs and i-adjectives, and to na-adjectives/nouns without だ.",
          examples: [
            { jp: "旅行に行けるかどうかまだわかりません。", en: "I still don't know whether I can go on the trip." },
            { jp: "ぶんぽうが正しいかどうかチェックしてください。", en: "Please check whether the grammar is correct." },
            { jp: "その国に行くときビザがひつようかどうかしらべます。", en: "I'll look up whether a visa is needed for going to that country." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "旅行に行けるか、まだわかりません。", explanation: "Without an interrogative word like だれ/何/いつ, か alone sounds incomplete for a yes/no question — かどうか is needed to mean 'whether or not.'" },
        { wrong: "ビザがひつようだかどうか調べます。", explanation: "だ is dropped before かどうか (and before か) for na-adjectives and nouns in the present affirmative — it should be ひつようかどうか, not ひつようだかどうか。" },
        { wrong: "だれが来るかどうか教えてください。", explanation: "かどうか is only for yes/no questions. When an interrogative word like だれ is already present, か alone is correct, and adding どうか is redundant and wrong." },
      ],
    },

    // 18課
    {
      pattern: "〜(よ)うと思います",
      lesson: 18,
      meaning:
        "This pattern expresses the speaker's own intention — 'I'm thinking of ~ing' or 'I intend to ~.' It typically conveys a fairly recent or spontaneous decision, and is almost always about the speaker's own plans rather than someone else's. When the intention has been held for a while rather than just decided, 〜(よ)うと思っています is used instead of the plain 〜と思います.",
      uses: [
        {
          label: "Stating the speaker's own intention",
          explanation:
            "It attaches to the volitional (意向形) form of the verb, followed by と思います/思っています (出かけよう+と思う, 買おう+と思っている). Because it centers on the speaker's own inner decision-making, it's rarely used to describe another person's intentions directly.",
          examples: [
            { jp: "いい天気だから、出かけようと思います。", en: "The weather's nice, so I'm thinking of going out." },
            { jp: "旅行に行くので、かばんを買おうと思っています。", en: "I'm going on a trip, so I'm planning to buy a bag." },
            { jp: "今日は帰るとき、図書館によろうと思っています。", en: "I'm planning to stop by the library on my way home today." },
            { jp: "わたしは一人でカラオケに行こうとは思いません。", en: "I don't intend to go to karaoke alone." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "友だちはパーティーに行こうと思います。", explanation: "〜(よ)うと思います directly expresses the speaker's own intention and isn't normally used for a third person's plans — describe someone else's intention with 〜(よ)うと思っている、〜つもりらしい, or similar hedged forms instead." },
        { wrong: "食べように思います。", explanation: "と is required between the volitional form and 思う/思っている — it should be 食べようと思います, never omitting と." },
      ],
    },
    {
      pattern: "〜つもりです",
      lesson: 18,
      meaning:
        "This pattern expresses intention slightly more firmly and definitively than 〜(よ)うと思っています — it presents a plan that was already decided beforehand, being restated now, rather than a decision being made on the spot. Like 〜(よ)うと思います, the subject is normally the first person; describing a third person's plan requires adding a hearsay or inference marker such as そうです or らしいです.",
      uses: [
        {
          label: "Stating a previously settled plan or intention",
          explanation:
            "It attaches to the plain nonpast form of the verb (帰るつもりです, 買わないつもりです) and works for both affirmative and negative plans. Because it implies the decision was made in advance rather than in the moment, it sounds odd when used to announce a choice you're making right as you speak.",
          examples: [
            { jp: "先生「夏休みに何をしますか。」トム「国へ帰るつもりです。」", en: "Teacher: \"What will you do during summer break?\" Tom: \"I plan to go back to my country.\"" },
            { jp: "日曜日は大そうじをするつもりだ。", en: "I plan to do a big cleaning on Sunday." },
            { jp: "今日は品物を見るだけで、何も買わないつもりです。", en: "Today I'm just going to look at the goods, without buying anything." },
            { jp: "わたしは自分の意見をかえるつもりはありません。", en: "I have no intention of changing my own opinion." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "（飲み物を勧められて、その場で）あ、コーヒーを飲むつもりです。", explanation: "つもりです implies a plan decided beforehand, not a spur-of-the-moment choice. For an immediate decision made on the spot, use 〜ます or 〜(よ)うと思います instead (コーヒーにします)。" },
        { wrong: "妹はけっこんしきにこの服を着ていくつもりです。", explanation: "つもりです is normally reserved for the speaker's own plans. When talking about a third person's intention, add a hearsay or inference ending, such as つもりらしいです or つもりだそうです, since you can't state someone else's inner intention as directly known fact." },
      ],
    },

    // 19課
    {
      pattern: "〜と言っていました",
      lesson: 19,
      meaning:
        "This pattern is used to relay or restate something another person said earlier — an indirect quotation in the past. The reported content keeps whatever tense or form it had in the original statement, placed before と言っていました, and the question form asks 何と言っていましたか ('what did they say?').",
      uses: [
        {
          label: "Relaying someone else's earlier statement",
          explanation:
            "The quoted content (in plain form, with だ for nouns/na-adjectives where needed) comes directly before と言っていました, which uses the て-form + いました rather than a bare past tense. This softer construction is especially natural when passing along something you heard to a third party, giving it more of an 'I heard that...' feel than the blunter 言いました.",
          examples: [
            { jp: "トムさんは今日休むと言っていました。", en: "Tom said he'd be off today." },
            { jp: "サラさんはさいきんいそがしいと言っていましたよ。", en: "Sara said she's been busy lately." },
            { jp: "山田「お父さんから電話？何と言っていた？」", en: "Yamada: \"A call from Dad? What did he say?\"" },
            { jp: "トム「今日はばんご飯はいらないと言っていましたよ。」", en: "Tom: \"He said he doesn't need dinner today.\"" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "トムさんは今日休むと言いました。（人から聞いたことを間接的に伝えるとき）", explanation: "〜と言っていました is preferred for relaying something someone said, especially when passing it along secondhand — it carries a softer 'I heard that...' nuance compared with the blunter bare 言いました。" },
        { wrong: "お父さんから電話？どうと言っていた？", explanation: "The question form specifically uses 何と (なんと), not どう, to ask 'what did they say?' — どう asks 'how,' which doesn't fit here." },
      ],
    },
    {
      pattern: "〜そうです（伝聞）",
      lesson: 19,
      meaning:
        "This pattern reports information the speaker heard or read from an outside source, rather than something observed firsthand — closest to 'I heard that ~' or 'apparently ~.' It's frequently paired with a phrase citing the source, such as 〜によると ('according to'), 〜では, or 〜で読みましたが ('I read that...').",
      uses: [
        {
          label: "Reporting hearsay from an external source",
          explanation:
            "Hearsay そうです attaches to the full plain form of the predicate — verbs and i-adjectives directly (ふるそうです, 寒いそうです), and na-adjectives/nouns with だ retained (元気だそうです, むずかしくないそうです). This is easy to confuse with the visual/appearance そうです (which drops the ending and attaches to the stem, e.g. 寒そうです 'looks cold'), so the full plain form is the key marker that this is the hearsay meaning.",
          examples: [
            { jp: "天気よほうによると、あしたは寒いそうです。", en: "According to the weather forecast, it'll apparently be cold tomorrow." },
            { jp: "せんぱいの話では、この試験はあまりむずかしくないそうだよ。", en: "According to a senior, this exam apparently isn't very difficult." },
            { jp: "新聞で読みましたが、駅前で火事があったそうですね。", en: "I read in the paper that there was apparently a fire in front of the station." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "あしたは寒そうです。（人から聞いた話を伝えるつもりで）", explanation: "Hearsay そうです attaches to the full plain form (寒いそうです), while dropping the い and attaching directly to the stem (寒そうです) instead gives the different 'looks like/appears' meaning based on visual impression — mixing these up is a very common error." },
        { wrong: "せんぱいは元気そうです。（「元気だと聞いた」の意味で）", explanation: "For hearsay, keep だ before そうです with nouns/na-adjectives — 元気だそうです means 'I heard she's fine,' while 元気そうです without だ instead means 'she looks fine' (the appearance meaning)。" },
      ],
    },
    {
      pattern: "〜らしいです",
      lesson: 19,
      meaning:
        "This pattern reports information that came from an indirect or less certain source — rumor, secondhand hearsay, or a judgment based on visible circumstantial evidence. It carries a weaker, more hedged commitment to the information than 〜そうです（伝聞）, which usually implies a clearer or more directly cited source.",
      uses: [
        {
          label: "Reporting rumor, hearsay, or situational inference",
          explanation:
            "らしいです attaches directly to nouns and na-adjective stems without だ (有名らしい, 病気らしい), and to the plain form of verbs and i-adjectives (いるらしい, よくないらしい). It fits naturally when the speaker is passing along a rumor, something vaguely heard, or a conclusion drawn from visible clues (like police cars at a scene) rather than something told to them directly and clearly.",
          examples: [
            { jp: "聞いた話では、あの山にはさるがいるらしいです。", en: "From what I've heard, apparently there are monkeys on that mountain." },
            { jp: "うわさによると、あのホテルはあまりよくないらしいよ。", en: "According to rumor, that hotel apparently isn't very good." },
            { jp: "じこがあったらしいですよ。けいさつの車が止まっていました。", en: "There seems to have been an accident. Police cars were stopped there." },
            { jp: "この店は有名らしいね。よく名前を聞くよ。", en: "This shop seems to be famous. I hear its name a lot." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "わたしは病気らしいです。（医者に直接、自分の病状を告げられた場合）", explanation: "らしいです signals indirect, secondhand, or inferential information. For something the speaker knows directly and with certainty — like their own diagnosed condition — a direct statement (病気です) fits better." },
        { wrong: "この店は有名だらしいね。", explanation: "らしいです attaches directly to nouns and na-adjective stems without だ (有名らしい), unlike そうです（伝聞）, which requires だ in the same slot (有名だそうです) — confusing these two hearsay patterns is common." },
      ],
    },

    // 20課
    {
      pattern: "〜くします・〜にします",
      lesson: 20,
      meaning:
        "This pattern is used when someone deliberately brings about a change in a thing or situation — making something a certain way on purpose, rather than the change happening on its own. Which form to use depends on whether the target quality is expressed with an i-adjective or with a na-adjective/noun.",
      uses: [
        {
          label: "Deliberately changing a quality — い-adjective stem + くします",
          explanation:
            "The i-adjective drops its final い and adds く before します, expressing that the subject intentionally causes that quality in something, such as making a sound louder or pants shorter.",
          examples: [
            { jp: "テレビの音を大きくしました。", en: "I turned up the volume on the TV." },
            { jp: "このズボンを少し短くしてください。", en: "Please shorten these pants a bit." },
          ],
        },
        {
          label: "Deliberately changing a state or category — な-adjective/noun + にします",
          explanation:
            "な-adjective stems and nouns attach directly to にします, expressing a deliberate change into that state, category, or amount — cleaning a desk into a 'clean' state, halving a portion, or choosing to dye hair a certain color.",
          examples: [
            { jp: "つくえの上をきれいにしましょう。", en: "Let's make the top of the desk clean." },
            { jp: "ご飯のりょうを半分にしてください。", en: "Please make the amount of rice half." },
            { jp: "かみのけの色を茶色にしたいです。", en: "I want to dye my hair brown." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "つくえの上をきれいくしました。", explanation: "きれい is a na-adjective, so it takes にします (きれいにします), not くします, which is reserved for i-adjectives." },
        { wrong: "音を大きにしました。", explanation: "i-adjectives must be converted to their adverbial く form before します — 大きく, not 大きに; に directly follows na-adjectives and nouns only." },
      ],
    },
    {
      pattern: "〜くなります・〜になります・〜ようになります",
      lesson: 20,
      meaning:
        "This pattern expresses a change in a thing or situation that happens naturally, gradually, or on its own — as opposed to 〜くします/〜にします, where someone deliberately causes the change. There are three forms depending on what's changing: an i-adjective quality, a na-adjective/noun state or category, or a verb-based ability, habit, or ongoing situation.",
      uses: [
        {
          label: "Natural change in quality — い-adjective stem + くなります",
          explanation:
            "The i-adjective drops い and adds く before なります, describing a spontaneous change such as growing bigger, days getting shorter, or a headache improving — none of these are being deliberately engineered by the speaker.",
          examples: [
            { jp: "子犬はすぐ大きくなります。", en: "Puppies grow big quickly." },
            { jp: "秋になると、日がみじかくなります。", en: "When it becomes autumn, the days grow shorter." },
            { jp: "薬を飲んだら、頭のいたみがよくなりました。", en: "After taking the medicine, my headache got better." },
          ],
        },
        {
          label: "Natural change in state or category — な-adjective/noun + になります",
          explanation:
            "な-adjective stems and nouns attach directly to になります, describing a change of state or category — a room becoming cleaner (as a result of cleaning), customer numbers dropping to half, or someone moving into a new role.",
          examples: [
            { jp: "ていねいにそうじすれば、へやがもっときれいになります。", en: "If you clean carefully, the room will become cleaner." },
            { jp: "さいきん、この店ではおきゃくさんのかずが半分になりました。", en: "Recently, the number of customers at this shop has dropped to half." },
            { jp: "来月から課長になります。", en: "Starting next month, I'll become section chief." },
          ],
        },
        {
          label: "Change in ability, habit, or ongoing situation — verb + ようになります",
          explanation:
            "A verb (often in its potential form, sometimes negative) attaches to ようになります to describe a gradual change in ability, habit, or a recurring situation over time — something that became possible, started happening, or stopped happening that wasn't the case before.",
          examples: [
            { jp: "日本語が上手に話せるようになりたいです。", en: "I want to become able to speak Japanese well." },
            { jp: "うちのにわに鳥が来るようになりました。", en: "Birds have started coming to our garden." },
            { jp: "このごろ、前ほど本を読まなくなった。", en: "These days, I've stopped reading books as much as before." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "母はふとりになりました。", explanation: "Verbs that already express change in themselves (ふとる, やせる, かわる, ふえる, へる, etc.) aren't combined with くなります/になります/ようになります — just use the verb's own conjugated form: 母はふとりました。" },
        { wrong: "きれいくなります。", explanation: "きれい is a na-adjective, so its 'become' form is きれいになります, not きれいくなります — the same trap as with くします/にします。" },
        { wrong: "泳ぐになりました。（「泳げるようになった」の意味で）", explanation: "To express a change in ability or habitual behavior, a verb (often in its potential form) + ようになります is needed — 泳げるようになりました; になります alone follows nouns and na-adjectives, not verbs." },
      ],
    },

    // 21課
    {
      pattern: "〜にします・〜ことにします",
      lesson: 21,
      meaning:
        "This pattern expresses a decision the speaker has actively made through their own free will. It covers everything from small everyday choices, like what to order at a restaurant, to bigger personal resolutions. Because the decision reflects the speaker's own volition, it carries a proactive, positive nuance — the speaker is choosing something, not just reporting how things turned out.",
      uses: [
        {
          label: "Deciding on a noun with 〜にします",
          explanation:
            "When the decision is simply choosing one option among several nouns — a dish on a menu, a date, a name — にします attaches directly after the noun with the particle に. This is the everyday 'I'll have/take X' pattern used constantly when ordering food, fixing on a date, or picking between alternatives.",
          examples: [
            { jp: "ばんご飯はカレーにします。", en: "I'll have curry for dinner." },
            { jp: "このケーキ、おいしそうですね。これにします。", en: "This cake looks tasty. I'll go with this one." },
            { jp: "つぎのれんしゅうの日は金曜日にしませんか。", en: "Shall we make the next practice day Friday?" },
          ],
        },
        {
          label: "Deciding to do something with 〜ことにします",
          explanation:
            "When the decision concerns an action rather than a simple noun, the dictionary form or ない-form of a verb is nominalized with こと and followed by にします, giving 'I've decided to do ~' or 'I've decided not to do ~.' This is used for personal resolutions and decisions about future behavior, and often implies the choice was reached after some thought.",
          examples: [
            { jp: "今日からたばこをやめることにします。", en: "I've decided to quit smoking from today." },
            { jp: "夏休みは国へは帰らないことにしました。", en: "I've decided not to go back to my country during summer break." },
            { jp: "毎日、運動することにしました。", en: "I've decided to exercise every day." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "毎日運動するにします。",
          explanation:
            "にします attaches to a noun, not directly to a verb in dictionary form. To express a decision to do an action, the verb must first be nominalized with こと: 毎日運動することにします。",
        },
        {
          wrong: "来年、けっこんすることにしました。(announcing a marriage decided jointly by two families, not solely by the speaker)",
          explanation:
            "にする frames a decision as the speaker's own personal choice. When a decision comes about through circumstances or other people rather than the speaker's own will alone, になる is used instead: 来年、けっこんすることになりました。",
        },
      ],
    },
    {
      pattern: "〜になります・〜ことになります",
      lesson: 21,
      meaning:
        "This pattern describes a decision or change of state that comes about apart from the speaker's own will — through circumstances, other people's decisions, or natural developments. It's also used, somewhat indirectly, even when the speaker was involved in making the decision but prefers not to present it as a personal choice, which sounds more modest and less self-assertive in Japanese.",
      uses: [
        {
          label: "A noun changes to a new state with 〜になります",
          explanation:
            "When something itself changes into a new form, name, or value — rather than an action someone decided on — the noun is followed directly by になります. This describes a resulting state, such as a date being set or a name being decided, without directly crediting anyone with the decision.",
          examples: [
            { jp: "さよならパーティーは3月15日になりました。", en: "The farewell party has been set for March 15th." },
            { jp: "チームの名前は「さむらい」になりました。", en: "The team's name became \"Samurai\"." },
          ],
        },
        {
          label: "An outcome or arrangement is settled with 〜ことになります",
          explanation:
            "When the 'decision' concerns an action or event rather than a simple noun, the verb is nominalized with こと and followed by になります. This is extremely common in workplace and formal announcements ('it has been decided that...') because it frames the outcome as arising from circumstances or another party's decision, even when the speaker was involved — using ことになる instead of ことにする sounds humble and less self-assertive.",
          examples: [
            { jp: "駅前に高いビルが建つことになりました。", en: "It's been decided that a tall building will be built in front of the station." },
            { jp: "来年、けっこんすることになりました。", en: "It's been decided that we'll get married next year." },
            { jp: "雨で試合はしないことになりました。", en: "Due to rain, it's been decided the match won't be held." },
            { jp: "社長は来月、アメリカに行くことになるだろう。", en: "It'll probably turn out that the president goes to America next month." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "パーティーは3月15日にしました。(when the date was fixed by a committee, not by the speaker personally)",
          explanation:
            "にする asserts that the speaker made the decision themselves. When a date or outcome is simply the result of circumstances or someone else's decision, になる is more natural: パーティーは3月15日になりました。",
        },
      ],
    },

    // 22課
    {
      pattern: "〜てみます",
      lesson: 22,
      meaning:
        "This pattern attaches the auxiliary verb みる (literally 'to see') to the te-form of a verb to mean 'try doing ~ and see what happens.' It captures the nuance of testing something out — trying on shoes, tasting a dish, attempting an unfamiliar activity — in order to find out whether it's good, whether it works, or what it's like. Its function is closer to 'give it a try' than a statement about full completion.",
      uses: [
        {
          label: "Trying an action to find out its result",
          explanation:
            "〜てみます attaches to the te-form of a verb and expresses an attempt made in order to discover something — whether food tastes good, whether shoes fit, or what an experience is like. It's also used to express a mild desire to try something new (一度行ってみたい, 'I'd like to try going once'), and in casual invitation form (〜てみない？) it becomes a soft suggestion encouraging someone else to give something a try.",
          examples: [
            { jp: "くつを買う前に、はいてみます。", en: "Before buying shoes, I try them on." },
            { jp: "一度京都へ行ってみたい。", en: "I want to try going to Kyoto once." },
            { jp: "この料理を食べてみてください。", en: "Please try eating this dish." },
            { jp: "このゲームはおもしろいよ。トムもやってみない？", en: "This game is fun. Won't you try it too, Tom?" },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "この料理はおいしくてみます。",
          explanation:
            "〜てみます only attaches to the te-form of verbs, not to adjectives. To say you'll 'try' a food to see if it tastes good, attach it to the verb 食べる instead: この料理を食べてみます。",
        },
      ],
    },
    {
      pattern: "〜ておきます",
      lesson: 22,
      meaning:
        "〜ておきます attaches to the te-form of a verb and generally frames an action as being done in advance, in preparation for something expected later, or as maintaining a resulting state. It reflects a forward-looking, practical mindset — doing something now so that things go smoothly later, or so that a desirable state continues undisturbed.",
      uses: [
        {
          label: "Doing something in advance / preemptively",
          explanation:
            "The most common use of 〜ておきます is to describe an action taken ahead of time to prepare for something or to avoid future trouble — packing a bag before a trip, telling someone news before they hear it elsewhere, or putting the trash out the night before collection. It often carries a nuance of being sensible or considerate about what's coming.",
          examples: [
            { jp: "にもつをかばんに入れておきます。", en: "I'll put the luggage in the bag ahead of time." },
            { jp: "ごみを外に出しておきましょう。", en: "Let's put the trash out in advance." },
            { jp: "旅行の話はサラに伝えておいたよ。", en: "I already told Sara about the trip." },
          ],
        },
        {
          label: "Leaving something in a resulting state",
          explanation:
            "〜ておきます can also describe deliberately leaving something in its current or chosen state and not changing it — for example, leaving a window open or leaving papers where they are — because that state is convenient or was requested. Here the emphasis is on maintaining a condition rather than preparing for a future event.",
          examples: [
            { jp: "まどはそのまま開けておいてください。", en: "Please leave the window open as it is." },
            { jp: "つくえの上はそのままにしておいてください。", en: "Please leave the top of the desk as it is." },
            { jp: "ドアはかぎをかけないで、開けておいてください。", en: "Please leave the door unlocked and open." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "テストの前に本を読んでしまいます。(intending 'I'll read the book in advance to prepare')",
          explanation:
            "This confuses ておきます (preparatory action) with てしまいます (completion/regret). To describe preparing ahead of time, use ておきます: テストの前に本を読んでおきます。",
        },
      ],
    },
    {
      pattern: "〜てしまいます",
      lesson: 22,
      meaning:
        "〜てしまいます attaches to the te-form of a verb to emphasize that an action is carried out to full completion, often faster or more thoroughly than expected. In casual speech it also very commonly expresses the speaker's regret, surprise, or dismay at something happening that can't be undone — a mistake, an accidental loss, or a slip of memory.",
      uses: [
        {
          label: "Emphasizing complete or rapid completion",
          explanation:
            "When used to stress that an action is, or will be, finished entirely, 〜てしまいます highlights totality — 'finish reading completely,' 'get it all submitted' — often implying the action is done sooner or more thoroughly than one might expect. In casual spoken Japanese, てしまいます is frequently contracted to ちゃいます (or じゃいます after ん/ぶ/む-stem verbs).",
          examples: [
            { jp: "レポートはあした出してしまいます。", en: "I'll get the report submitted by tomorrow." },
            { jp: "今日買った本はもう読んでしまった。", en: "I already finished reading the book I bought today." },
          ],
        },
        {
          label: "Expressing regret over an unintended or irreversible action",
          explanation:
            "〜てしまいます is extremely common for describing mistakes, losses, or unwanted outcomes the speaker feels bad about — forgetting something important, ruining something, or letting something happen that can't be reversed. This nuance of regret is one of the most frequent everyday uses of the pattern, and is what distinguishes it from a neutral statement of completion.",
          examples: [
            { jp: "あの人の名前をわすれてしまいました。", en: "I've completely forgotten that person's name." },
            { jp: "あ、白い服がよごれてしまいますよ。", en: "Oh, your white clothes are going to get dirty!" },
            { jp: "さいふをどこかに忘れてしまいました。", en: "I've gone and left my wallet somewhere." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "でかける前に、まどを閉めてしまいます。(intending 'I'll close the window in advance/preparation')",
          explanation:
            "てしまいます emphasizes completion or regret, not doing something ahead of time. To express advance preparation, ておきます should be used instead: でかける前に、まどを閉めておきます。",
        },
      ],
    },

    // 23課
    {
      pattern: "あげます・〜てあげます",
      lesson: 23,
      meaning:
        "This group of verbs (あげる／くれる／もらう) describes the direction in which something — an object, or an action performed as a favor — moves between people. あげます specifically is used when the giver is the speaker or someone close to the speaker, and the receiver is someone else; it frames the act of giving from the giver's own point of view.",
      uses: [
        {
          label: "Giving to someone else (the speaker's or an insider's perspective)",
          explanation:
            "あげます is used when the subject — the giver — is the speaker or someone in the speaker's in-group, and the object or action goes to another person. Attached to a noun it simply means 'give,' and attached to the te-form of a verb (〜てあげます) it means 'do a favor for someone.' When the receiver outranks the giver in status and is outside the family, さしあげます is used instead as the polite/humble equivalent; however, offering to do something for a social superior with 〜てさしあげます can sound presumptuous in Japanese, so speakers often avoid commenting on the favor at all in that situation.",
          examples: [
            { jp: "妹はサラさんに花をあげました。", en: "My younger sister gave Sara flowers." },
            { jp: "先生にカップをさしあげました。", en: "I gave the teacher a cup." },
            { jp: "サッカー場に行くの？地図をかいてあげるよ。", en: "Are you going to the soccer field? I'll draw you a map." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "先生に本を読んであげます。(offering directly to a teacher using てあげます)",
          explanation:
            "Even with さしあげます as the polite form, describing a favor done for a social superior with 〜て(さし)あげます can sound presumptuous, as if the speaker is granting a kindness from a position of equality. It's more natural to simply perform the action without stating it this way.",
        },
      ],
    },
    {
      pattern: "くれます・〜てくれます",
      lesson: 23,
      meaning:
        "くれます describes something being given, or an action being done, in the direction of the speaker or the speaker's in-group, by another person. It's the mirror image of あげます: while あげる's viewpoint is the giver, くれる's viewpoint is the receiver, so the subject of the sentence is the person doing the giving, and the (often unstated) recipient is 'me' or someone close to me.",
      uses: [
        {
          label: "Someone else gives to the speaker or the speaker's in-group",
          explanation:
            "くれます attaches after a noun to mean '(someone) gives (something) to me,' and attached to the te-form of a verb (〜てくれます) means 'someone does an action for my benefit.' The recipient — usually わたし or someone emotionally close to the speaker, like a family member — is frequently left unstated because it's understood from context. When the giver outranks the speaker in status, くださいます is used as the respectful equivalent.",
          examples: [
            { jp: "山田さんはわたしに時計をくれました。", en: "Yamada gave me a watch." },
            { jp: "先生が妹に本をくださいました。", en: "The teacher gave my younger sister a book." },
            { jp: "友だちが店の場所を教えてくれました。", en: "A friend told me where the shop was." },
            { jp: "サラさんはいっしょに病院へ行ってくれた。", en: "Sara went to the hospital together with me." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "わたしは山田さんに時計をくれました。",
          explanation:
            "くれます always has someone else as the giver and the speaker (or the speaker's in-group) as the receiver. If the speaker is the one giving, あげます must be used instead: わたしは山田さんに時計をあげました。",
        },
      ],
    },
    {
      pattern: "もらいます・〜てもらいます",
      lesson: 23,
      meaning:
        "もらいます expresses receiving something, or having someone do something for you, from the receiver's point of view. The grammatical subject is the person who receives the benefit — the speaker or someone close to them — and the giver is marked with に or から.",
      uses: [
        {
          label: "Receiving an object or a favor from someone",
          explanation:
            "Attached to a noun, もらいます means 'receive (something) from (someone)'; attached to the te-form of a verb (〜てもらいます), it means 'have/get someone to do something for me,' emphasizing that the benefit was received thanks to the other person's action, often because the speaker asked for it or appreciated it. When the giver outranks the speaker in status, いただきます is used as the humble equivalent.",
          examples: [
            { jp: "山田さんに／から時計をもらいました。", en: "I received a watch from Yamada." },
            { jp: "妹は先生に／から本をいただきました。", en: "My younger sister received a book from the teacher." },
            { jp: "サラさんにいっしょに病院へ行ってもらった。", en: "I had Sara go to the hospital together with me." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "山田さんをわたしに時計をもらいました。",
          explanation:
            "The person something is received from is marked with に or から, not を: 山田さんに／から時計をもらいました。",
        },
      ],
    },

    // 24課
    {
      pattern: "〜(られ)ます（受身１）",
      lesson: 24,
      meaning:
        "This is the basic, 'direct' passive: the grammatical subject — the speaker or someone close to them — is on the receiving end of another person's action. It's built by conjugating the verb into its passive form (the られる／れる ending) and is used simply to describe being the target of someone else's action, without necessarily implying any negative feeling.",
      uses: [
        {
          label: "Being the direct target of another person's action",
          explanation:
            "In this pattern, the person affected by an action is placed as the topic/subject of the sentence, and the person performing the action is marked with に. The verb takes its passive form (e.g. ほめる → ほめられる, 起こす → 起こされる). Because the affected person is often the speaker (わたし), わたし is frequently omitted when it's obvious from context. This passive is used neutrally to shift focus onto the person affected rather than onto the person acting.",
          examples: [
            { jp: "今日は先生にほめられました。", en: "Today I was praised by the teacher." },
            { jp: "朝、サッカーのれんしゅうがあるから、いつも6時に起こされる。", en: "I have soccer practice in the morning, so I'm always woken up at 6." },
            { jp: "女の人に道を聞かれました。", en: "I was asked for directions by a woman." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "先生はわたしをほめられました。",
          explanation:
            "In the direct passive, the person affected becomes the subject/topic of the sentence, and the doer of the action is marked with に: わたしは先生にほめられました, not an active-sentence word order with を.",
        },
      ],
    },
    {
      pattern: "〜(られ)ます（受身２）",
      lesson: 24,
      meaning:
        "This 'adversity' or 'suffering' passive describes being negatively affected by someone else's action or by an event, even indirectly — such as someone stepping on your foot, or a burglar breaking into your house. It conveys the speaker's sense of annoyance, inconvenience, or trouble, which is why it's sometimes called the 'meiwaku (nuisance) passive.'",
      uses: [
        {
          label: "Being inconvenienced by someone's action or an event",
          explanation:
            "This passive uses the same られる／れる conjugation as the direct passive, but the meaning shifts to emphasize that the subject was troubled or negatively affected — sometimes by an action performed directly to them (足をふまれました, 'my foot got stepped on'), and sometimes by something merely happening near them that causes annoyance, even with an intransitive verb (どろぼうに入られた, 'I had a burglar break in'). If the action was actually something to be thankful for, 〜てくれる or 〜てもらう is used instead, since the passive here specifically conveys a negative feeling.",
          examples: [
            { jp: "(わたしは)電車の中で足をふまれました。", en: "My foot got stepped on on the train." },
            { jp: "弟にケーキを食べられてしまいました。", en: "My younger brother ate my cake, to my annoyance." },
            { jp: "うちの前にごみをすてられて、こまっています。", en: "Someone dumped trash in front of my house, and I'm troubled by it." },
            { jp: "きのう、どろぼうに入られた。", en: "Yesterday I had a burglar break in." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "友だちが宿題を手伝われました。(trying to say 'my friend helped me with homework')",
          explanation:
            "Since being helped with homework is a good thing rather than an annoyance, this should use 〜てくれる or 〜てもらう instead of the adversity passive: 友だちが宿題を手伝ってくれました, or 友だちに宿題を手伝ってもらいました。Using 受身 here would incorrectly imply the speaker felt bothered by the help.",
        },
      ],
    },
    {
      pattern: "〜(られ)ます（受身３）",
      lesson: 24,
      meaning:
        "This 'objective fact' passive is used to state impersonal facts, historical events, or widely known information — such as when a book was written, when an event is held, or how well known something is — without any reference to the speaker's own feelings. It's especially common in writing, news, and explanations of general facts.",
      uses: [
        {
          label: "Stating facts and events objectively",
          explanation:
            "Here, an object or event is placed as the topic of the sentence, and the passive verb describes what happens or happened to it, with no implication of the speaker's own emotional involvement. This use is common for describing when things are built, held, published, or created, and for describing something's general reputation, such as being read or known worldwide (世界中で読まれている).",
          examples: [
            { jp: "来年、夏のオリンピックが開かれます。", en: "Next year, the summer Olympics will be held." },
            { jp: "この本は世界中で読まれている。", en: "This book is read all over the world." },
            { jp: "この絵は1800年にかかれたそうです。", en: "This painting was apparently painted in 1800." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "来年、夏のオリンピックを開きます。(describing a general event with no specific stated agent, as in a news report)",
          explanation:
            "When describing a general event without a specific stated agent, as is typical in news and factual reports, the passive is more natural than the active voice: 夏のオリンピックが開かれます, rather than an active sentence that would require specifying who is holding it.",
        },
      ],
    },

    // 25課
    {
      pattern: "〜(さ)せます",
      lesson: 25,
      meaning:
        "The causative form (〜(さ)せる) describes one person causing another person to perform an action — whether by ordering or forcing them, by allowing or permitting them, or simply by being the reason an emotion arises in them. The same grammatical form covers all three of these situations, and only context tells you which meaning is intended. The particle marking the person made to act is usually を for intransitive verbs and に for transitive verbs.",
      uses: [
        {
          label: "Making/ordering someone to do something",
          explanation:
            "When a person in a position of authority — a boss, parent, or teacher — has someone under their authority perform an action, the causative expresses 'make/have (someone) do.' The person made to act is generally marked with を when the verb is intransitive (犬をあそばせる) and に when the verb is transitive with its own object (弟にそうじをさせる).",
          examples: [
            { jp: "店長「今日、店員を一人やめさせたよ。ちこくが多いのでね。」", en: "Manager: \"I had one employee quit today — they were late too often.\"" },
            { jp: "兄「弟にへやのそうじをさせました。」", en: "Older brother: \"I made my younger brother clean the room.\"" },
          ],
        },
        {
          label: "Allowing/letting someone do something",
          explanation:
            "The same causative form is also used when someone in authority grants permission for another person to do something they want to do, translating as 'let (someone) do.' This is very common in the pattern 〜させてください／〜させてくれませんか, used to politely ask for permission to do something oneself.",
          examples: [
            { jp: "けんは犬をじゆうにあそばせます。", en: "Ken lets the dog play freely." },
            { jp: "このノート、コピーさせてくれませんか。", en: "Would you let me make a copy of this notebook?" },
          ],
        },
        {
          label: "Causing an emotion in someone",
          explanation:
            "The causative can also describe causing another person to feel an emotion, using emotion verbs such as おこる (get angry), なく (cry), or おどろく (be surprised) in causative form — 'make someone feel X.' This is common when describing the (often unintended) emotional effect of one's own words or actions on someone else.",
          examples: [
            { jp: "うそをついて、父をおこらせてしまいました。", en: "I told a lie and ended up making my father angry." },
            { jp: "妹をなかせてはいけないよ。", en: "You mustn't make your little sister cry." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "先生は学生を漢字を書かせました。",
          explanation:
            "With a transitive verb, the object of the verb keeps を, but the person being made to act takes に instead, to avoid two を's in one sentence: 先生は学生に漢字を書かせました。",
        },
      ],
    },
    {
      pattern: "〜さ(せら)れます",
      lesson: 25,
      meaning:
        "The causative-passive combines the causative and passive forms to describe the speaker being forced by someone else to do something they didn't want to do, or being made to feel an emotion because of someone else's action or behavior. It's essentially the causative viewed from the perspective of the person forced to act, and always carries a reluctant, put-upon nuance.",
      uses: [
        {
          label: "Being forced to do something against one's will",
          explanation:
            "This use describes the speaker reluctantly performing an action because somebody else made them, expressed by conjugating the verb into the causative and then the passive (やめる→やめさせる→やめさせられる). The subject is the person forced to act, and the person forcing them is marked with に. For godan verbs ending in す, the contracted -される form isn't used (させられる stays in full), while most other godan verbs commonly contract 〜(さ)せられる to 〜(さ)される in casual speech (待たせられる→待たされる).",
          examples: [
            { jp: "店員「今日、アルバイトをやめさせられました。」", en: "Employee: \"Today I was made to quit my part-time job.\"" },
            { jp: "弟「兄にへやのそうじをさせられました。」", en: "Younger brother: \"I was made to clean the room by my older brother.\"" },
          ],
        },
        {
          label: "Being made to feel an emotion because of someone else",
          explanation:
            "The causative-passive is equally common with emotion verbs to describe being made to feel a certain way because of another person's words or behavior — again with a nuance that the emotion is somewhat unwelcome or outside the speaker's control.",
          examples: [
            { jp: "けんにはよくびっくりさせられます。", en: "I'm often made to be surprised by Ken." },
            { jp: "子どもがおそくまで帰ってこなくて、しんぱいさせられました。", en: "My child didn't come home until late, and I was made to worry." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "先生に漢字を書かせました。(intending to say 'I was made to write kanji by the teacher')",
          explanation:
            "As written, this sentence is the plain causative, meaning 'I made the teacher write kanji.' To express being made to do something oneself, the causative-passive is needed instead: 先生に漢字を書かせられました／書かされました。",
        },
      ],
    },

    // 26課 で・に
    {
      pattern: "で・に",
      lesson: 26,
      meaning:
        "で and に are both used to mark locations, but they describe fundamentally different relationships to place: で marks where an action takes place, while に marks a fixed point — where something exists, or the target/goal of a movement. に also extends beyond location to mark specific points in time and the target of an action directed at someone, while で extends to marking the means, tool, material, or cause behind something.",
      uses: [
        {
          label: "で — the setting of an action, means, cause, or material",
          explanation:
            "で marks the location where an action or event takes place (図書館で勉強します — 'I study at the library'), as opposed to に, which marks where something simply exists. で also marks the means or tool used to carry out an action (バスで行きます, ペンで書きます), the material something is made of (木で作った机), and the cause or reason behind a state, especially before an adjective or state verb (風邪で学校を休みました — 'I was absent due to a cold').",
          examples: [
            { jp: "公園で子供たちが遊んでいます。", en: "Children are playing in the park." },
            { jp: "電車で会社に行きます。", en: "I go to work by train." },
            { jp: "風邪で学校を休みました。", en: "I was absent from school because of a cold." },
            { jp: "この机は木で作られています。", en: "This desk is made of wood." },
          ],
        },
        {
          label: "に — existence, time, and the target of movement or action",
          explanation:
            "に marks a fixed point rather than an action: the location where something or someone exists with いる／ある (公園に子供たちがいます), a specific point in time when something happens (7時に起きます), and the destination or target of a movement or action — where you're going, or who/what an action is directed toward (学校に行きます, 友達に手紙を書きます, 先生に聞きます).",
          examples: [
            { jp: "公園に子供たちがいます。", en: "There are children in the park." },
            { jp: "毎朝7時に起きます。", en: "I get up at 7 every morning." },
            { jp: "友達に手紙を書きました。", en: "I wrote a letter to my friend." },
            { jp: "先生に質問を聞きました。", en: "I asked the teacher a question." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "図書館に勉強します。",
          explanation:
            "Since studying is an action taking place at the library rather than something simply existing there, で must be used: 図書館で勉強します, not に。",
        },
        {
          wrong: "公園で子供たちがいます。",
          explanation:
            "Existence (いる／ある) is marked with に, not で, because it describes a fixed state rather than an action taking place: 公園に子供たちがいます。",
        },
      ],
    },

    // 27課 を・と
    {
      pattern: "を・と",
      lesson: 27,
      meaning:
        "を and と serve very different grammatical roles that happen to both be common sources of confusion for learners: を marks the direct object of a transitive verb or, with certain motion verbs, the space being passed through or left, while と marks the exact content of a quotation/thought or a partner for actions that are inherently mutual between two people.",
      uses: [
        {
          label: "を — direct object, or a space passed through/left",
          explanation:
            "Most often, を marks the direct object of a transitive verb — the thing being acted upon (パンを食べます). Separately, with certain intransitive motion verbs, を marks the space, route, or point being traversed or exited — a road being walked along, a park being strolled through, or a vehicle being disembarked from (道を渡る, 公園を散歩する, 電車を降りる). This second use surprises many learners since these aren't usually thought of as 'objects,' but the space marked by を is understood as the path of the movement, not its destination.",
          examples: [
            { jp: "毎朝、公園を散歩します。", en: "I take a walk through the park every morning." },
            { jp: "次の駅で電車を降ります。", en: "I'll get off the train at the next station." },
            { jp: "道を渡るときは、気をつけてください。", en: "Please be careful when crossing the road." },
          ],
        },
        {
          label: "と — the content of a quotation, or a mutual partner",
          explanation:
            "と marks the exact words or thoughts being quoted before verbs like 言う, 思う, and 書く, functioning like quotation marks in English (「行きます」と言いました). と is also used to mark a companion for actions that, by their nature, involve two people acting together or on each other — reciprocal verbs such as 会う, 話す, 相談する, and 結婚する. With these reciprocal verbs, using に instead of と would be a mistake, since it would wrongly suggest a one-directional action rather than something done mutually with someone.",
          examples: [
            { jp: "「明日は休みます」と部長に言いました。", en: "I told the manager, \"I'll be off tomorrow.\"" },
            { jp: "週末、友達と映画を見に行きます。", en: "I'm going to see a movie with a friend this weekend." },
            { jp: "田中さんと結婚することにしました。", en: "I decided to marry Tanaka." },
            { jp: "明日、先生と相談するつもりです。", en: "I plan to consult with the teacher tomorrow." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "田中さんに結婚しました。",
          explanation:
            "結婚する is a reciprocal verb — marriage is something two people do together, not something done one-directionally to someone — so the partner must be marked with と, not に: 田中さんと結婚しました。",
        },
        {
          wrong: "電車に降ります。",
          explanation:
            "The point being left or exited from with verbs like 降りる is marked with を, not に: 電車を降ります。に would incorrectly suggest the train as a destination rather than a point being left.",
        },
      ],
    },

    // 28課 も・しか
    {
      pattern: "も・しか",
      lesson: 28,
      meaning:
        "も and しか are both used after quantities or nouns to emphasize how large or small an amount feels to the speaker, but they push the evaluation in opposite directions: も makes an amount sound impressively large or surprising, while しか makes an amount sound insufficient or disappointingly small — and しか always demands a negative verb at the end of the sentence.",
      uses: [
        {
          label: "も — emphasizing a large or surprising amount",
          explanation:
            "When も follows a number, quantity, or even a single noun, it emphasizes that the amount is large, long, or surprising from the speaker's perspective — 'as much/many as ~' or 'even ~.' It can replace が, を, or は after a noun (though it never appears together with them), and the verb at the end of the sentence is usually affirmative, since the emphasis is on abundance rather than lack.",
          examples: [
            { jp: "宿題がまだ半分もできていません。", en: "I haven't even finished half of my homework yet." },
            { jp: "このケーキ、一つ食べてもいいですか。", en: "May I eat one of these cakes, too?" },
            { jp: "三時間も待ちました。", en: "I waited as long as three hours." },
          ],
        },
        {
          label: "しか — emphasizing a small or insufficient amount (with a negative verb)",
          explanation:
            "しか always pairs with a negative verb at the end of the sentence, and stresses that an amount is small, limited, or not enough — 'only ~.' Like も, it replaces が／を／は after a noun and never appears alongside them. A frequent mistake is forgetting the required negative verb, or reaching for しか when the intended nuance was actually 'surprisingly a lot,' which calls for も instead.",
          examples: [
            { jp: "財布に千円しかありません。", en: "I only have 1000 yen in my wallet." },
            { jp: "この問題が分かる人はクラスに一人しかいません。", en: "There's only one person in the class who understands this problem." },
            { jp: "三日間しか休みがありませんでした。", en: "I only had three days off." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "財布に千円しかあります。",
          explanation:
            "しか must always be followed by a negative predicate — 財布に千円しかありません, not あります — since しか's meaning of 'only' is expressed jointly with the negative verb.",
        },
        {
          wrong: "三時間しか待ちました。(intending to emphasize that three hours felt like a long wait)",
          explanation:
            "To emphasize that an amount felt surprisingly large, use も with an affirmative verb: 三時間も待ちました。しか would instead suggest three hours felt like too little time, and it requires a negative verb.",
        },
      ],
    },

    // 29課 だけ・でも
    {
      pattern: "だけ・でも",
      lesson: 29,
      meaning:
        "だけ and でも both narrow down or soften a statement, but in different ways: だけ states a plain, factual limit — 'only this and nothing more' — with no emotional coloring, while でも is used to make a soft, non-committal suggestion (offering one example among several possibilities) or to point to an extreme example meaning 'even.'",
      uses: [
        {
          label: "だけ — a plain, factual limitation",
          explanation:
            "だけ attaches to nouns, quantities, or even whole clauses to mean 'only/just,' stating a limit as a neutral fact. Unlike しか, だけ does NOT require a negative verb, so it can be used freely in both affirmative and negative sentences without changing the sentence's polarity — 三日だけ休みました is a simple, matter-of-fact statement that no more than three days were taken.",
          examples: [
            { jp: "会議には田中さんだけ来ませんでした。", en: "Only Tanaka didn't come to the meeting." },
            { jp: "少しだけ休ませてください。", en: "Please let me rest just a little." },
            { jp: "今日は水だけ飲みました。", en: "Today I only drank water." },
          ],
        },
        {
          label: "でも — a soft suggestion or an extreme example",
          explanation:
            "でも has two related but distinct everyday uses. Attached to a noun representing one option among several, it softens a suggestion or invitation by presenting that noun as just one casual example rather than an insistent request (お茶でも飲みませんか — 'Would you like tea or something?'). Attached to a noun representing an extreme case, it means 'even,' emphasizing that if this extreme case applies, then anything less extreme certainly applies too (子供でもできます — 'Even a child can do this'). Because だけ is neutral and factual while でも(suggestion) is deliberately vague and non-committal, mixing them up can noticeably shift the tone of a sentence from a plain statement to a casual offer, or vice versa.",
          examples: [
            { jp: "疲れたでしょう。コーヒーでも飲みませんか。", en: "You must be tired. Won't you have some coffee or something?" },
            { jp: "この漢字は簡単なので、子供でも読めます。", en: "This kanji is easy, so even a child can read it." },
            { jp: "分からないことがあったら、いつでも聞いてください。", en: "If there's something you don't understand, please ask anytime." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "疲れたでしょう。コーヒーだけ飲みませんか。(intending a casual, soft suggestion)",
          explanation:
            "だけ states a plain factual limit and doesn't carry the soft, inviting nuance of でも; to casually suggest an option among others, でも should be used instead: コーヒーでも飲みませんか。",
        },
        {
          wrong: "三日でも休みました。(intending a plain factual statement that only three days were taken)",
          explanation:
            "でも here would incorrectly suggest an extreme example ('even three days') or a vague suggestion, rather than simply stating a fact. For a neutral factual limit, だけ is correct: 三日だけ休みました。",
        },
      ],
    },

    // 30課 は・が
    {
      pattern: "は・が",
      lesson: 30,
      meaning:
        "は and が can both mark what a Japanese sentence 'is about,' but they do fundamentally different jobs: は marks the topic — what the rest of the sentence comments on, often already known information or a point of contrast — while が marks the grammatical subject, typically used to introduce new information, to put emphasis on the subject itself, or because a particular verb or adjective grammatically requires it.",
      uses: [
        {
          label: "は — the topic, known information, and contrast",
          explanation:
            "は introduces what the sentence is about, usually something already known or established between speaker and listener, and directs the listener's attention to what will be said about it (わたしは学生です — 'As for me, I'm a student'). は is also used to set up an explicit or implicit contrast between two things, as in the classic construction 象は鼻が長いです ('As for elephants, their trunks are long'), where は marks the overall topic (elephants) and が marks the grammatical subject within that topic (trunks).",
          examples: [
            { jp: "わたしは学生です。", en: "As for me, I'm a student." },
            { jp: "象は鼻が長いです。", en: "Elephants have long trunks." },
            { jp: "今日は天気がいいですね。", en: "The weather's nice today, isn't it." },
          ],
        },
        {
          label: "が — new information, emphasis, and required subjects",
          explanation:
            "が marks the grammatical subject and is used especially when introducing new information for the first time — most clearly in the answer to a 'who/what' question, where the answer must take が because it's the new, emphasized piece of information (だれが来ましたか。田中さんが来ました。). が is also grammatically required with certain adjectives and verbs describing feelings, ability, and existence — such as 好き, ほしい, 分かる, できる, and ある／いる — where the thing felt, understood, or existing is marked with が even when the sentence's overall topic (often わたし) is separately marked with は.",
          examples: [
            { jp: "だれが窓を割りましたか。ケンさんが割りました。", en: "\"Who broke the window?\" \"Ken did.\"" },
            { jp: "わたしは日本語が分かります。", en: "I understand Japanese." },
            { jp: "部屋に猫がいます。", en: "There's a cat in the room." },
          ],
        },
      ],
      commonMistakes: [
        {
          wrong: "だれは来ましたか。田中さんは来ました。",
          explanation:
            "Because 'who came' is asking for new information, both the question word だれ and its answer must be marked with が, not は: だれが来ましたか。田中さんが来ました。",
        },
        {
          wrong: "わたしはコーヒーを好きです。",
          explanation:
            "好き is a な-adjective describing a feeling, and grammatically requires が to mark what's liked, not を: わたしはコーヒーが好きです。",
        },
      ],
    },

    // 31課 の・こと
    {
      pattern: "の・こと",
      meaning:
        "の and こと are both ways to turn a plain-form verb, adjective, or clause into a noun phrase, so it can act as the subject or object of a bigger sentence. They often seem interchangeable, but each has situations where it's clearly preferred or, in some cases, required. As a rule of thumb, の works well for something concretely witnessed with the senses in the moment, while こと fits abstract, reported, or general statements. The verb that follows the nominalized clause is usually the biggest clue for which one to pick.",
      lesson: 31,
      uses: [
        {
          label: "の — nominalizing what is directly seen or heard",
          explanation:
            "の is the natural choice when the nominalized clause is the direct object of a perception verb like 見る, 聞く, 手伝う, or 待つ — that is, when someone is directly seeing, hearing, or otherwise sensing the event as it unfolds. It essentially freezes a scene so it can be treated as a single object of perception. Because the focus is on witnessing something happen in real time, の cannot usually be swapped for こと in this use without sounding unnatural.",
          examples: [
            { jp: "電車が来るのを待っています。", en: "I'm waiting for the train to come." },
            { jp: "子供が公園で遊んでいるのを見ました。", en: "I saw the children playing in the park." },
            { jp: "となりの部屋で誰かが歌っているのが聞こえます。", en: "I can hear someone singing in the next room." },
          ],
        },
        {
          label: "こと — nominalizing thoughts, speech, facts, ability, and general statements",
          explanation:
            "こと is preferred when the nominalized clause is the object of a verb of speech, thought, or communication — 言う, 思う, 伝える, 説明する, 知る — since these describe reporting or processing information rather than directly perceiving an event. こと is also required, not just preferred, before ができる when expressing general ability, and it's the natural choice for stating a fact, giving general advice, or naming something as a hobby or job, since these are abstract characterizations rather than concrete, witnessed moments.",
          examples: [
            { jp: "彼が引っ越したことを知りませんでした。", en: "I didn't know that he had moved." },
            { jp: "わたしの趣味は写真をとることです。", en: "My hobby is taking photos." },
            { jp: "漢字を読むことができますか。", en: "Can you read kanji?" },
            { jp: "毎日運動することは体にいいです。", en: "Exercising every day is good for your health." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "漢字を読むのができますか。", explanation: "Before できる expressing general ability, こと is required, not の — the correct form is 漢字を読むことができますか。" },
        { wrong: "子供が公園で遊んでいることを見ました。", explanation: "When directly witnessing an event with your own eyes or ears, の is the natural choice, not こと — say 子供が公園で遊んでいるのを見ました。" },
      ],
    },

    // 32課 て…・ないで…
    {
      pattern: "〜て…・〜ないで…",
      meaning:
        "The て form and the ないで form both link two actions into a single sentence, but they describe opposite relationships between those actions. 〜て… shows that both actions happen — either one after another, or one forming the manner/backdrop of the other — while 〜ないで… shows that the second action happens in the absence of the first. Both attach directly to a verb (て to the te-form, ないで to the nai-stem) and are common ways to add nuance about how or under what circumstances something was done.",
      lesson: 32,
      uses: [
        {
          label: "〜て… — sequential action or accompanying manner",
          explanation:
            "The て form connects two actions that both occur, either in sequence (do A, then do B) or with the first action forming the ongoing backdrop or manner in which the second happens. Which reading applies is usually clear from context and the kind of verbs involved — a punctual verb like 起きる suggests sequence, while a durative state like 電気をつけて suggests manner.",
          examples: [
            { jp: "朝起きて、顔を洗います。", en: "I get up, and then wash my face." },
            { jp: "朝、シャワーを浴びて、会社に行きます。", en: "In the morning, I take a shower and then go to work." },
            { jp: "電気をつけて勉強します。", en: "I study with the light on." },
          ],
        },
        {
          label: "〜ないで… — without doing / instead of doing",
          explanation:
            "〜ないで attaches to a verb's nai-stem and shows that the second action happens without the first one occurring at all — either 'without doing A, did B' or, when A and B are mutually exclusive alternatives, 'did B instead of A'. This is different from 〜なくて, which gives a reason or cause for the second clause rather than describing the circumstances under which it was carried out; 〜ないで never explains a cause.",
          examples: [
            { jp: "傘をささないで、雨の中を歩きました。", en: "I walked in the rain without opening an umbrella." },
            { jp: "昨日は疲れていたので、晩ご飯を食べないで寝てしまいました。", en: "I was tired yesterday, so I went to sleep without eating dinner." },
            { jp: "朝ごはんを食べないで、学校に行きました。", en: "I went to school without eating breakfast (instead of eating breakfast)." },
            { jp: "砂糖を入れないで、コーヒーを飲みます。", en: "I drink my coffee without sugar." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "疲れていたないで、早く寝ました。", explanation: "〜ないで cannot be used to give a reason for the second clause — use 〜なくて or a separate causal connector: 疲れていたので、早く寝ました。" },
        { wrong: "電気をつけないで勉強しますので、目が悪くなります。", explanation: "Using 〜ないで where a cause is intended (rather than a manner/absence) sounds unnatural; if the meaning is 'because I don't turn on the light,' use 〜なくて: 電気をつけなくて、目が悪くなります。" },
      ],
    },

    // 33課 他動詞・自動詞
    {
      pattern: "他動詞・自動詞",
      meaning:
        "他動詞 (transitive verbs) and 自動詞 (intransitive verbs) are two verb types that often come in matched pairs describing the same event from different angles. Transitive verbs take a direct object marked by を and put the focus on an agent's deliberate action, while intransitive verbs have no direct object — the thing affected is marked by が instead — and focus only on the resulting state or a change that seems to happen on its own. Learning these pairs together, and being careful about which one implies an agent, is essential for describing cause-and-effect naturally in Japanese.",
      lesson: 33,
      uses: [
        {
          label: "他動詞 (transitive) — an agent deliberately acts on an object",
          explanation:
            "The pattern is [agent]は／が＋[object]を＋[transitive verb], and it puts the spotlight on who did the action and what they did it to. Transitive verbs are used whenever you want to name or imply the person responsible for causing a change, such as opening a window, putting out a fire, or fixing something.",
          examples: [
            { jp: "暑いので、まどを開けます。", en: "It's hot, so I'll open the window." },
            { jp: "わたしは火をけしました。", en: "I put out the fire." },
            { jp: "へやにいた虫を外に出しました。", en: "I put the bug that was in the room outside." },
            { jp: "自転車をなおしました。", en: "I repaired the bicycle." },
          ],
        },
        {
          label: "自動詞 (intransitive) — a change happens to something, with no agent mentioned",
          explanation:
            "The pattern is [thing]が＋[intransitive verb], and it focuses purely on the change happening to the thing itself, without naming or implying who, if anyone, caused it. This is the natural choice when the cause is unknown, irrelevant, or when the change simply seems to happen on its own, like a door opening by itself or a fire going out.",
          examples: [
            { jp: "車のドアが急に開きました。", en: "The car door suddenly opened." },
            { jp: "火がきえました。", en: "The fire went out." },
            { jp: "学生は後ろのドアから出ます。", en: "Students go out through the back door." },
            { jp: "自転車がなおりました。", en: "The bicycle got fixed." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "わたしが車のドアが開けました。", explanation: "Mixing particles between the two patterns is a common slip — the transitive pattern needs を on the object: わたしが車のドアを開けました。" },
        { wrong: "風でまどが開けました。", explanation: "Using the transitive verb 開ける for a change that happens on its own (with no clear agent) implies someone deliberately did it; for a spontaneous change like the wind blowing a window open, use the intransitive form: 風でまどが開きました。" },
      ],
    },

    // 34課 ています・てあります
    {
      pattern: "〜ています・〜てあります",
      meaning:
        "〜ている and 〜てある both describe a state that resulted from some earlier action, but they differ in whether an agent's intention is implied. 〜ている, attached to an intransitive verb, simply reports the state as an observed fact, with no interest in who, if anyone, caused it. 〜てある, attached to a transitive verb, describes a state that was created on purpose by someone for some purpose, and it keeps that sense of deliberate preparation even though the agent isn't explicitly named.",
      lesson: 34,
      uses: [
        {
          label: "自動詞＋ている — a resulting state, agent unspecified",
          explanation:
            "When an intransitive verb is followed by ている, it describes the state a thing is currently in as a result of a change, without mentioning or caring who caused it. The thing in that state is marked by が, and the sentence reads simply as an observation of how things currently are.",
          examples: [
            { jp: "まどが開いています。", en: "The window is open." },
            { jp: "かべにきれいな絵がかかっています。", en: "There's a beautiful picture hanging on the wall." },
            { jp: "電気が消えています。", en: "The light is off." },
          ],
        },
        {
          label: "他動詞＋てある — a state deliberately created for a purpose",
          explanation:
            "When a transitive verb is followed by てある, it describes a state that was created on purpose by somebody, usually for some later purpose, and the affected thing is still marked with が (occasionally は) rather than を. 〜てある is frequently used to describe things set up in advance — table settings, decorations, prepared documents — because it always carries that sense of deliberate preparation, even without stating who did it.",
          examples: [
            { jp: "暑いので、まどが開けてあります。", en: "It's hot, so the window has been left open on purpose." },
            { jp: "パーティーのために、かべに絵がかけてあります。", en: "A picture has been hung on the wall for the party." },
            { jp: "会議室にお茶が用意してあります。", en: "Tea has been prepared in the meeting room." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "まどを開けてあります。", explanation: "てある keeps the affected thing marked with が (or は), not を, even though the base verb is transitive — the correct form is まどが開けてあります。" },
        { wrong: "まどが開けています。", explanation: "Mixing the two patterns — pairing an intransitive-style が with the transitive verb 開ける and plain ている instead of てある — sounds like a mistake; use either まどが開いています (intransitive) or まどが開けてあります (deliberate)。" },
      ],
    },

    // 35課 てきます・ていきます
    {
      pattern: "〜てきます・〜ていきます",
      meaning:
        "〜てきます and 〜ていきます both attach to a verb to add a sense of direction, either literally in space or metaphorically in time. 〜てきます frames an action or change as moving toward the present moment or toward the speaker's own location/viewpoint, while 〜ていきます frames it as moving away from here-and-now, off into the future or into the distance. A handy shortcut: 来る means 'come,' so てくる pulls things toward here/now; 行く means 'go,' so ていく pushes things away toward there/later.",
      lesson: 35,
      uses: [
        {
          label: "〜てきます — motion or change toward the speaker/present",
          explanation:
            "With a motion verb, てきます describes going somewhere and then returning to the speaker's base — 行ってきます means 'I'll go, and I'll be back.' With a verb describing gradual change, てきます frames that change as having been building up to right now, from the past leading up to the present moment.",
          examples: [
            { jp: "ちょっとコンビニに行ってきます。", en: "I'm just going to the convenience store, and I'll be back." },
            { jp: "財布を忘れたので、家に取りに帰ってきます。", en: "I forgot my wallet, so I'll go home to get it and come back." },
            { jp: "雨がだんだん強くなってきました。", en: "The rain has been gradually getting stronger." },
            { jp: "空が明るくなってきました。", en: "The sky has been getting brighter." },
          ],
        },
        {
          label: "〜ていきます — motion or change away from the speaker/into the future",
          explanation:
            "With a motion verb, ていきます describes leaving and moving away from the reference point, without implying a return — 出ていきます means someone leaves and doesn't come back to that spot. With a verb describing gradual change, ていきます frames the change as continuing onward from this moment into the future.",
          examples: [
            { jp: "これから日本語をもっと勉強していきたいです。", en: "From now on, I want to keep studying Japanese more." },
            { jp: "子どもたちは元気に育っていくでしょう。", en: "The children will likely keep growing up healthy." },
            { jp: "これから寒くなっていくでしょう。", en: "From now on, it will likely keep getting colder." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "だんだん寒くなってきます、meant as a forecast about the future", explanation: "てくる frames a change as building up to now, not continuing onward; for a forecast about what will keep happening from here on, use ていく instead: だんだん寒くなっていくでしょう。" },
        { wrong: "出ていきました、meant as 'went out but will be right back'", explanation: "ていく does not imply a return the way てくる does — 出ていきました suggests the person left and moved away from the reference point; if a return is implied, use 出てきました or 行ってきました instead。" },
      ],
    },

    // 36課 こ・そ・あ
    {
      pattern: "こ・そ・あ",
      meaning:
        "This is the family of demonstrative words built on こ／そ／あ／ど, which change shape depending on the part of speech needed — a standalone pronoun, a noun-modifier, a place word, a direction word, or a manner word. Which of こ／そ／あ to use depends on physical or psychological distance from the speaker and listener: こ〜 is near the speaker, そ〜 is near the listener or something just mentioned, and あ〜 is far from both, or something both speakers already share knowledge of.",
      lesson: 36,
      uses: [
        {
          label: "こ〜 — near the speaker",
          explanation:
            "こ〜 words are used for something physically close to the speaker, such as an object the speaker is holding or standing next to. Depending on part of speech, this appears as これ (this, a thing), この＋noun (this ~), ここ (here), こちら (this way/here, more polite), or こう (like this, describing a manner)。",
          examples: [
            { jp: "これはわたしのかさです。", en: "This is my umbrella." },
            { jp: "ここでしばらく待っていてください。", en: "Please wait here for a while." },
            { jp: "こうすれば簡単にできますよ。", en: "If you do it this way, it's easy." },
          ],
        },
        {
          label: "そ〜 — near the listener, or something already mentioned",
          explanation:
            "そ〜 words are used for something physically close to the listener rather than the speaker, or — very commonly in conversation — to refer back to something the listener just said that the speaker doesn't have direct firsthand knowledge of. This makes そ〜 the default way to react to or ask about new information the other person has just introduced.",
          examples: [
            { jp: "そのシャツ、どこで買いましたか。", en: "Where did you buy that shirt you're wearing?" },
            { jp: "A「新しいレストランができたんですよ。」B「そうですか。今度行ってみましょう。」", en: "A: \"A new restaurant opened.\" B: \"Is that so? Let's try going sometime.\"" },
            { jp: "そちらの天気はどうですか。", en: "How's the weather over there where you are?" },
          ],
        },
        {
          label: "あ〜 — far from both speaker and listener, or something both already know",
          explanation:
            "あ〜 words are used for something physically distant from both the speaker and listener, and also — importantly — for something both people already know about or remember from shared experience, even if it isn't physically present at all. This second use is why あ〜 often comes up in nostalgic or reminiscing conversation, referring to a shared memory rather than a location.",
          examples: [
            { jp: "あそこに大きい木がありますね。", en: "There's a big tree over there, isn't there." },
            { jp: "あの映画、二人で見に行ったの覚えてる？", en: "Do you remember that movie we went to see together?" },
            { jp: "あの人、前に会ったことがありますよね。", en: "That person — we've met before, right?" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "あのシャツ、どこで買いましたか。 (asked about something the listener is wearing, unknown to the speaker beforehand)", explanation: "Since the speaker has no prior shared knowledge of the item and it belongs to the listener's sphere, そ〜 is correct, not あ〜: そのシャツ、どこで買いましたか。" },
        { wrong: "using そ〜 for a memory only the speaker has, not yet shared with the listener", explanation: "そ〜 is for something the listener just mentioned or something in the listener's sphere; a fact or memory known only to the speaker should be introduced directly (e.g. with これ), not with そ〜, until it becomes shared knowledge。" },
      ],
    },

    // 37課 接続の言葉
    {
      pattern: "ですから・だから",
      meaning:
        "ですから and だから both introduce a conclusion — a fact, judgment, or piece of advice — that follows logically from what was just said, functioning like 'so' or 'therefore' in English. They represent a single connective at two politeness levels rather than two different meanings, so the choice between them is purely about register: ですから for polite or formal speech, だから for casual conversation.",
      lesson: 37,
      uses: [
        {
          label: "Introducing a logical conclusion, judgment, or call to action",
          explanation:
            "ですから／だから connects a preceding statement to a conclusion that follows naturally from it — a plain fact, a personal judgment, or advice/instruction directed at the listener. ですから is used in polite or formal registers, matching です／ます style, while だから is the casual equivalent used with plain-form speech among friends or family.",
          examples: [
            { jp: "これは一つ100円です。ですから、三つで300円です。", en: "This is 100 yen each. So three of them is 300 yen." },
            { jp: "もう夜8時だ。だから、教室にはだれもいないと思う。", en: "It's already 8pm. So I think no one's in the classroom." },
            { jp: "ここは人がよく通るんだ。だから、ここに物をおかないで。", en: "People often pass through here. So don't leave things here." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using だから when speaking politely to a teacher or in business", explanation: "だから is casual and can sound too blunt in a formal or polite context — switch to ですから when speaking politely。" },
      ],
    },
    {
      pattern: "それで",
      meaning:
        "それで connects a factual circumstance to its natural consequence, similar in feel to ですから／だから but narrower in scope — it reports 'because of that fact, this happened' rather than delivering a judgment, request, or invitation. It's mainly used to narrate a sequence of cause and effect in a story or explanation.",
      lesson: 37,
      uses: [
        {
          label: "Linking a fact to its natural consequence",
          explanation:
            "それで is used when the second statement is a factual outcome that naturally followed from the first — it works well for narrating what happened next, but unlike ですから／だから, it isn't used to issue a request, suggestion, or command to the listener.",
          examples: [
            { jp: "小さい字が見えなくなりました。それで、新しいめがねを買いました。", en: "I could no longer see small print. So I bought new glasses." },
            { jp: "会社が遠い。それで、毎朝早く家を出る。", en: "The office is far. So I leave home early every morning." },
            { jp: "電車が止まってしまいました。それで、会議に遅れました。", en: "The train stopped running. So I was late for the meeting." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "疲れていますね。それで、早く帰ってください。", explanation: "それで doesn't introduce a request or suggestion the way ですから can — use ですから／だから instead: 疲れていますね。ですから、早く帰ってください。" },
      ],
    },
    {
      pattern: "けれど(も)",
      meaning:
        "けれど(も) introduces a statement that contrasts with or goes against what was just said, functioning like 'but' or 'although.' It works much like でも／しかし but is especially common for linking clauses smoothly within a single sentence in conversation, not just between separate sentences.",
      lesson: 37,
      uses: [
        {
          label: "Introducing a contrast or unexpected result",
          explanation:
            "けれど(も) connects two statements where the second goes against what the first would lead you to expect — used both to join two clauses in one sentence and to start a new sentence. けれども is slightly more formal-sounding than the shorter けれど, though both are common in speech.",
          examples: [
            { jp: "とてもがんばりました。けれども、いいてんはとれませんでした。", en: "I tried very hard. But I couldn't get a good grade." },
            { jp: "このカメラはいい。けれど、少し重い。", en: "This camera is good. But it's a little heavy." },
            { jp: "行きたいけれど、時間がありません。", en: "I want to go, but I don't have time." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using けれど to add supporting information rather than a contrast", explanation: "けれど signals contrast/opposition, not simple addition — if the second point reinforces the first rather than opposing it, use それに instead。" },
      ],
    },
    {
      pattern: "それに",
      meaning:
        "それに adds another point on top of what was just said, where the new information reinforces or supports the same overall point, rather than opposing it. It works like 'moreover' or 'on top of that' in English, and is often paired with し in casual speech for a similar cumulative effect.",
      lesson: 37,
      uses: [
        {
          label: "Adding a reinforcing point",
          explanation:
            "それに introduces additional information that strengthens or piles onto the same conclusion as the first statement — unlike けれど, which introduces a contrast, それに always adds something compatible with, and supportive of, what came before.",
          examples: [
            { jp: "バナナはおいしいです。それに、安いです。", en: "Bananas are tasty. What's more, they're cheap." },
            { jp: "雨がふっているし、それに、風もある。", en: "It's raining, and on top of that, it's windy too." },
            { jp: "この部屋は広いです。それに、日当たりもいいです。", en: "This room is spacious. On top of that, it gets good sunlight." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using それに to introduce a contrasting or negative point", explanation: "それに only piles on reinforcing information — a contrast should use けれど／でも instead, e.g. このカメラはいい。けれど、少し重い。not それに。" },
      ],
    },
    {
      pattern: "たとえば",
      meaning:
        "たとえば introduces a concrete example that illustrates a word, category, or claim just mentioned, equivalent to 'for example' in English. It's one of the simplest and most common ways to make a general statement more specific and easier to picture.",
      lesson: 37,
      uses: [
        {
          label: "Introducing a specific example",
          explanation:
            "たとえば is placed at the start of a clause to signal that a specific instance is about to be given in support of, or as an illustration of, the preceding statement.",
          examples: [
            { jp: "日本のスポーツ、たとえば、じゅうどうをやってみたいです。", en: "I'd like to try a Japanese sport — judo, for example." },
            { jp: "山田さんはいつもおそく帰る。たとえば、きのうは11時に帰った。", en: "Yamada always comes home late. For example, yesterday he came home at 11." },
            { jp: "この店には安い物がたくさんある。たとえば、このかさは300円だ。", en: "This shop has a lot of cheap things. For example, this umbrella is 300 yen." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using たとえば with no preceding general statement for it to illustrate", explanation: "たとえば needs something general or categorical stated just before it that the example can support — jumping straight into たとえば without setting up the general claim first sounds disconnected。" },
      ],
    },
    {
      pattern: "(それ)では・じゃ",
      meaning:
        "それでは (and its casual contraction じゃ) reacts to what was just said by moving the conversation or situation forward, roughly equivalent to 'well then' or 'in that case' in English. The reaction can take the form of drawing an inference, prompting an action, or announcing the speaker's own next intention.",
      lesson: 37,
      uses: [
        {
          label: "Reacting to information by moving things forward",
          explanation:
            "それでは／じゃ picks up the immediately preceding statement and responds to it with an inference, an instruction to begin something, or a decision about what to do next. じゃ is the everyday spoken contraction of それでは and is far more common in casual conversation.",
          examples: [
            { jp: "トム「ぼくは兄がいます。」先生「じゃ、二人兄弟ですね。」", en: "Tom: \"I have an older brother.\" Teacher: \"Well then, there are two of you siblings.\"" },
            { jp: "じゅんびはできましたか。それでは、始めましょう。", en: "Are you ready? Well then, let's begin." },
            { jp: "えっ？サラはパーティーに来ない？じゃ、ぼくもやめようかな。", en: "Huh? Sara's not coming to the party? Well then, maybe I'll skip it too." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using それでは to open a new, unrelated topic with nothing preceding to react to", explanation: "それでは／じゃ needs something just said (by either speaker) to react to — it isn't used to simply begin a fresh topic out of nowhere。" },
      ],
    },

    // 38課 副詞
    {
      pattern: "まだ・もう",
      meaning:
        "まだ and もう describe whether a state or process has been reached yet, viewed from opposite directions. まだ says something hasn't happened yet, or that a state persists unchanged, while もう says something has already happened or a state has already been reached. Both are extremely common in yes/no exchanges about whether something is done.",
      lesson: 38,
      uses: [
        {
          label: "まだ — still / not yet",
          explanation:
            "まだ indicates that an expected state has not yet been reached, or a process is not yet complete — used both for 'not yet' with a negative verb, and for 'still' with an ongoing affirmative state.",
          examples: [
            { jp: "トム「昼ご飯はもう食べた？」サラ「ううん、まだ食べていない。」", en: "Tom: \"Have you already eaten lunch?\" Sara: \"No, not yet.\"" },
            { jp: "トム「銀行はまだ開いていますか。」", en: "Tom: \"Is the bank still open?\"" },
            { jp: "まだ雨がふっています。", en: "It's still raining." },
          ],
        },
        {
          label: "もう — already / one more",
          explanation:
            "もう indicates that a state has been reached or a process has already been completed, often used to confirm something is finished. もう also has a second, related use: paired with '1 + counter' or もう少し, it means 'one more' or 'a little more,' adding a further amount on top of what's already there.",
          examples: [
            { jp: "山田「4時だから、もうしまっていますよ。」", en: "Yamada: \"It's 4 o'clock, so it's already closed.\"" },
            { jp: "これ、おいしい。もう一つ食べてもいい？", en: "This is delicious. Can I have one more?" },
            { jp: "スープにもう少ししおを入れてください。", en: "Please add a little more salt to the soup." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "もう食べていない (intending 'not yet eaten')", explanation: "'Not yet' uses まだ, not もう, with a negative verb — the correct form is まだ食べていない。もう pairs with an affirmative verb to mean 'already.'" },
        { wrong: "まだ一つ食べてもいい？ (intending 'one more')", explanation: "'One more' uses もう, not まだ — もう一つ食べてもいいですか。まだ describes an unchanged ongoing state, not an additional amount。" },
      ],
    },
    {
      pattern: "なかなか・やっと・とうとう",
      meaning:
        "These three adverbs all relate to how long or how hard it was for something to happen, but they differ in outcome and nuance. なかなか, paired with a negative verb, describes ongoing difficulty in making something happen. やっと describes something finally being achieved after a hard struggle, with a positive sense of relief. とうとう describes something finally happening — or finally failing to happen — after a long time, with a more neutral, narrative tone that can go either way.",
      lesson: 38,
      uses: [
        {
          label: "なかなか〜ない — not easily, stubbornly resistant",
          explanation:
            "なかなか paired with a negative form describes something that resists happening despite expectation or effort — it emphasizes ongoing difficulty rather than a final outcome.",
          examples: [
            { jp: "バスがなかなか来ません。", en: "The bus just won't come." },
            { jp: "この問題はなかなか分かりません。", en: "I just can't seem to understand this problem." },
          ],
        },
        {
          label: "やっと — finally, at last (after difficulty, with relief)",
          explanation:
            "やっと〜た describes something being completed only after a long time and real difficulty, carrying a sense of relief that the struggle is over — equivalent to 'at last' in English.",
          examples: [
            { jp: "やっと仕事が終わりました。", en: "I finally finished the work, after a struggle." },
            { jp: "三時間並んで、やっとチケットが買えました。", en: "After waiting in line for three hours, I was finally able to buy the ticket." },
          ],
        },
        {
          label: "とうとう — finally, in the end (after a long wait, positive or negative)",
          explanation:
            "とうとう〜た／なかった describes something finally happening, or finally failing to happen, after a long period of waiting or anticipation — unlike やっと, it doesn't necessarily carry a sense of relief, and it can just as easily describe a disappointing or unwanted outcome.",
          examples: [
            { jp: "テレビがとうとうこわれてしまった。", en: "The TV finally broke down, after a long time." },
            { jp: "とうとう桜がさきました。", en: "The cherry blossoms have finally bloomed." },
            { jp: "待っていましたが、とうとう彼は来ませんでした。", en: "I waited, but in the end he never came." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "やっと彼は来ませんでした。", explanation: "やっと carries a sense of relief at overcoming difficulty, so it sounds odd for a bad or unwanted outcome — for something finally not happening, use とうとう instead: とうとう彼は来ませんでした。" },
        { wrong: "なかなか来ました (affirmative)", explanation: "なかなか meaning 'not easily' requires a negative verb — なかなか来ません, not なかなか来ました。" },
      ],
    },
    {
      pattern: "かならず・きっと・ぜひ",
      meaning:
        "かならず, きっと, and ぜひ are all adverbs that intensify a statement, but they intensify different things. かならず expresses certainty or an unbreakable obligation — 'without exception.' きっと expresses a confident prediction or intention, with a bit less absolute force than かならず. ぜひ expresses a strong personal wish or hope, most often used when making or responding to an invitation or request.",
      lesson: 38,
      uses: [
        {
          label: "かならず — without exception, definitely",
          explanation:
            "かならず describes something done without exception, or a strong determination/requirement, often used for habits, promises, or firm instructions to the listener.",
          examples: [
            { jp: "わたしはご飯の後で、かならずはをみがいている。", en: "I always brush my teeth without fail after meals." },
            { jp: "あしたの試合はかならずかつぞ！", en: "We will definitely win tomorrow's match!" },
          ],
        },
        {
          label: "きっと — surely, probably (a confident prediction or intention)",
          explanation:
            "きっと expresses somewhat less absolute conviction than かならず, and is used for the speaker's own strong intention, or a confident prediction/encouraging remark directed at the listener.",
          examples: [
            { jp: "今度のテストではきっといいてんがとれるでしょう。", en: "You'll surely get a good grade on the next test." },
            { jp: "きっとうまくいくよ。", en: "I'm sure it'll go well." },
          ],
        },
        {
          label: "ぜひ — by all means, please (a strong wish or request)",
          explanation:
            "ぜひ expresses a strong personal wish or hope, and shows up most often when inviting someone enthusiastically or requesting something with real eagerness — it pairs naturally with てください or たいです。",
          examples: [
            { jp: "トム「ぜひわたしの国へあそびに来てください。」", en: "Tom: \"Please, by all means, come visit my country.\"" },
            { jp: "山田「ええ、ぜひ行きたいです。」", en: "Yamada: \"Yes, I'd love to go.\"" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "ぜひ雨がふるでしょう。", explanation: "ぜひ expresses a wish, not a prediction — use きっと for a confident forecast: きっと雨がふるでしょう。" },
        { wrong: "かならず来てください (as a casual, low-pressure invitation)", explanation: "かならず carries a strong sense of obligation, which can feel demanding for a casual invitation — ぜひ来てください is warmer and more natural when simply encouraging someone to come。" },
      ],
    },

    // 39課 すぎます・にくいです・やすいです
    {
      pattern: "〜すぎます・〜にくいです・〜やすいです",
      meaning:
        "These three all attach to a verb's ます-stem to describe a quality of how an action goes, rather than describing the action itself. すぎる says the action/state goes beyond a comfortable or appropriate degree. にくい says the action is inherently hard or awkward to carry out. やすい says the action is inherently easy or comfortable to carry out. All three describe a property of the thing or action itself, not any one person's ability, which sets them apart from can/can't (できる) statements.",
      lesson: 39,
      uses: [
        {
          label: "〜すぎる — too much, excessive",
          explanation:
            "〜すぎる attaches to the ます-stem of a verb (or the stem of an adjective) and means the action or state exceeds an appropriate or comfortable degree. It conjugates like a regular る-verb, so the past tense is 〜すぎました。",
          examples: [
            { jp: "昨日の夜、食べすぎて、おなかが痛いです。", en: "I ate too much last night, and my stomach hurts." },
            { jp: "話しすぎて、のどが痛くなりました。", en: "I talked too much, and my throat started to hurt." },
            { jp: "このかばんは高すぎます。", en: "This bag is too expensive." },
          ],
        },
        {
          label: "〜にくい — hard to do",
          explanation:
            "〜にくい attaches to the ます-stem of a verb and means the action is physically or practically hard or awkward to perform. It conjugates as an i-adjective (にくいです、にくくない、etc.), describing an inherent difficulty in the thing itself rather than one person's skill level.",
          examples: [
            { jp: "この漢字は画数が多くて、覚えにくいです。", en: "This kanji has a lot of strokes, so it's hard to remember." },
            { jp: "この道は暗くて、夜は歩きにくいです。", en: "This road is dark, so it's hard to walk at night." },
            { jp: "字が小さくて、読みにくいです。", en: "The letters are small, so it's hard to read." },
          ],
        },
        {
          label: "〜やすい — easy to do",
          explanation:
            "〜やすい attaches to the ます-stem of a verb and means the opposite of にくい — the action is easy or comfortable to perform. It also conjugates as an i-adjective, and like にくい, it describes an inherent property of the thing or action rather than the ability of any one person.",
          examples: [
            { jp: "この靴は軽くて、歩きやすいです。", en: "These shoes are light and easy to walk in." },
            { jp: "先生の説明はいつも分かりやすいです。", en: "The teacher's explanations are always easy to understand." },
            { jp: "このペンは書きやすいです。", en: "This pen is easy to write with." },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "この本は読みやすいことができます。", explanation: "やすい／にくい already describe an inherent quality of the thing itself, not a particular person's ability — できる shouldn't be combined with them; just say この本は読みやすいです。" },
        { wrong: "食べすぎでした (as past tense of すぎる)", explanation: "〜すぎる conjugates as a regular verb, not a noun/na-adjective — the past tense is 食べすぎました, not 食べすぎでした。" },
      ],
    },

    // 40課 品詞
    {
      pattern: "名詞⇔動詞",
      meaning:
        "This entry describes how a small, fixed set of verbs can be repurposed as nouns by dropping their conjugated ending, letting them take particles like の instead of に or を. It's not a productive rule you can apply to any verb — only a habitually limited set of verbs works this way — so each noun-ified verb form needs to be learned individually. This overlaps conceptually with suru-verbs like 料理する／そうじする, whose noun core (料理, そうじ) already exists independently of する.",
      lesson: 40,
      uses: [
        {
          label: "Verb → noun by dropping the conjugated ending",
          explanation:
            "A small number of verbs can drop their conjugated ending and function as a noun, typically taking の in place of the particle the verb would have taken (に or を). This works only for a limited, memorized set of verbs, not as a general rule — for example 山にのぼります becomes the noun 山のぼり, but most other verbs have no equivalent noun form built this way. Separately, suru-verbs like 料理する／そうじする are already built on a noun (料理, そうじ), with する simply turning that noun into a verb — so in effect they already have a 'built-in' noun form, obtainable just by dropping する。",
          examples: [
            { jp: "料理は好きですが、そうじは好きではありません。", en: "I like cooking, but I don't like cleaning. (⇔料理します、そうじします)" },
            { jp: "帰りのきっぷはもう買いました。", en: "I've already bought the return ticket. (⇔帰ります)" },
            { jp: "山のぼりは楽しいですよ。", en: "Mountain climbing is fun. (⇔山にのぼります)" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using の to freely turn any verb into a noun, e.g. 読むの本 for 'reading'", explanation: "This noun-ification only works for a small, fixed set of verbs that already have an established noun form (like 山のぼり) — it isn't a rule you can apply freely to any verb; for most verbs, use の or こと to nominalize instead (本を読むこと)。" },
      ],
    },
    {
      pattern: "名詞⇔形容詞",
      meaning:
        "This entry describes how attaching さ to an adjective's stem turns a quality into a measurable noun — turning 'tall' into 'tallness/height,' for instance. This works the same way for both い-adjectives and な-adjectives, giving a simple, productive way to talk about the degree of a quality rather than just describing something as having that quality.",
      lesson: 40,
      uses: [
        {
          label: "Adjective stem + さ → a noun expressing degree",
          explanation:
            "For an い-adjective, dropping the final い and adding さ creates a noun representing the measurable degree of that quality, as in 高い→高さ (height/tallness) — the one common exception is いい, which becomes よさ rather than いさ. For a な-adjective, さ attaches directly to the stem the same way, as in べんりな→べんりさ (convenience). This construction is especially useful for asking about or measuring quantities like height, length, or depth.",
          examples: [
            { jp: "東京スカイツリーの高さは634メートルです。", en: "The height of the Tokyo Skytree is 634 meters. (⇔高い)" },
            { jp: "場所のべんりさを考えて、ホテルをえらびます。", en: "I'll choose the hotel considering the convenience of the location. (⇔べんりな)" },
            { jp: "このプールの深さはどのぐらいですか。", en: "About how deep is this pool? (⇔深い)" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "いいさ (for いい meaning 'good')", explanation: "いい is an irregular case — its さ-form is よさ, not いいさ: よさが分かる (to understand/appreciate its goodness), not いいさが分かる。" },
      ],
    },
    {
      pattern: "副詞⇔形容詞",
      meaning:
        "This entry describes how adjectives are converted into adverbs to describe the manner in which a verb is carried out. い-adjectives and な-adjectives each have their own regular ending for this conversion, and both are extremely common in everyday speech for describing how something is done.",
      lesson: 40,
      uses: [
        {
          label: "Adjective → adverb describing how a verb is done",
          explanation:
            "For an い-adjective, dropping the final い and adding く turns it into an adverb — 楽しい→楽しく (in a fun/enjoyable way) — with the same irregular exception いい→よく (not いく). For a な-adjective, replacing な with に does the equivalent job — きれいな→きれいに (in a neat/thorough way). Either form is placed directly before the verb it modifies.",
          examples: [
            { jp: "みんなで楽しく話しましょう。", en: "Let's all chat happily together. (⇔楽しい)" },
            { jp: "手をきれいにあらってください。", en: "Please wash your hands thoroughly. (⇔きれいな)" },
            { jp: "もっとよく考えてください。", en: "Please think about it more carefully. (⇔いい)" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "いく考えてください (for いい meaning 'well/carefully')", explanation: "いい is irregular here too — its adverb form is よく, not いく: よく考えてください, not いく考えてください。" },
      ],
    },
    {
      pattern: "名詞⇔文",
      meaning:
        "This entry describes how a whole plain-form sentence can be turned into a noun phrase using の or こと, so that an entire clause — not just a single word — can serve as the subject or object of a bigger sentence. This is the same の／こと nominalization introduced back in lesson 31, viewed here from the 'parts of speech' angle: a full sentence becomes, grammatically, just a noun.",
      lesson: 40,
      uses: [
        {
          label: "Plain-form sentence + の／こと → a noun phrase",
          explanation:
            "Any plain-form (普通形) statement can be followed by の or こと to become a noun phrase capable of filling the subject or object slot of a larger sentence — see 31課（の・こと）for the detailed guidance on when each of the two is preferred (の for something directly perceived, こと for something abstract, reported, or a general statement/ability)。",
          examples: [
            { jp: "友だちと話すことは楽しいです。", en: "Talking with friends is fun. (⇔友だちと話す)" },
            { jp: "トムさんと会うやくそくをしたことをわすれていました。", en: "I had forgotten that I'd made a promise to meet Tom. (⇔会うやくそくをした)" },
            { jp: "子供が笑っているのを見て、うれしくなりました。", en: "Seeing the child laughing made me happy. (⇔子供が笑っている)" },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "using の in a case that requires こと, e.g. before ができる", explanation: "As with the base の・こと pattern, こと is required (not の) before ができる for ability, and preferred for abstract/reported statements — see 31課 for the full breakdown。" },
      ],
    },
  ],
  N3: [
  ],
  N2: [
  ],
  N1: [
  ],
};
