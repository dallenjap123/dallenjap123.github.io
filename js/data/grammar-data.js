// Grammar reference data, grouped by JLPT level.
// Add or edit entries here — each entry needs: pattern, meaning, usage,
// and an optional list of examples ({ jp, en }).

window.GRAMMAR_DATA = {
  N5: [
    {
      pattern: "〜てください",
      meaning: "please do ~",
      usage: "Attach to the te-form of a verb to make a polite request or instruction.",
      examples: [{ jp: "ここに名前を書いてください。", en: "Please write your name here." }],
    },
    {
      pattern: "〜ないでください",
      meaning: "please don't do ~",
      usage: "Attach to the nai-form (negative plain form) of a verb to politely ask someone not to do something.",
      examples: [{ jp: "写真を撮らないでください。", en: "Please don't take photos." }],
    },
    {
      pattern: "〜たいです",
      meaning: "want to do ~",
      usage: "Attach to the stem of a verb (masu-form minus ます) to express the speaker's own desire to do something.",
      examples: [{ jp: "日本へ行きたいです。", en: "I want to go to Japan." }],
    },
    {
      pattern: "〜ましょう",
      meaning: "let's do ~",
      usage: "Attach to the verb stem to propose doing something together, or to make a soft suggestion.",
      examples: [{ jp: "一緒に勉強しましょう。", en: "Let's study together." }],
    },
  ],
  N4: [
    // 1課
    {
      pattern: "〜より…／〜ほど…ません",
      meaning: "more ~ than ~ / not as ~ as ~",
      usage:
        "Expresses the extent of something by comparing it to something else, forming a topic of comparison. The superlative can be expressed with '疑問詞＋より'. Negative comparisons use 〜ほど…ません.",
      lesson: 1,
      examples: [
        { jp: "このアパートは前のアパートより便利です。", en: "This apartment is more convenient than the previous one." },
        { jp: "わたしはいつも両親より早く起きます。", en: "I always get up earlier than my parents." },
        { jp: "わたしは何より音楽が好きです。", en: "I like music more than anything else." },
        { jp: "A「この町は今はにぎやかですが、むかしはどうでしたか。」B「むかしは今ほどにぎやかではありませんでしたよ。」", en: "A: \"This town is lively now, but what was it like in the past?\" B: \"It wasn't as lively back then as it is now.\"" },
      ],
    },
    {
      pattern: "〜より〜のほう",
      meaning: "~ rather than ~ / ~ more than ~",
      usage:
        "A way of expressing a preference, or comparing the extent of two things (noun2 > noun1). Not usually used in negative statements.",
      lesson: 1,
      examples: [
        { jp: "わたしより弟のほうが背が高いです。", en: "My younger brother is taller than me." },
        { jp: "前のテキストのほうがこのテキストよりよかったです。", en: "The previous textbook was better than this one." },
        { jp: "わたしはご飯よりパンのほうをよく食べます。", en: "I eat bread more often than rice." },
      ],
    },
    {
      pattern: "〜と〜とどちら",
      meaning: "which one, ~ or ~",
      usage:
        "A way of asking somebody to express a preference, or a comparison of the extent of two things. The answer usually takes the 〜のほう or どちらも form.",
      lesson: 1,
      examples: [
        { jp: "コーヒーと紅茶とどちらがいいですか。", en: "Which would you prefer, coffee or tea?" },
        { jp: "A「東駅までバスと電車とどちらが安いですか。」B「バスのほうが10円安いです。」", en: "A: \"Which is cheaper to Higashi Station, the bus or the train?\" B: \"The bus is 10 yen cheaper.\"" },
        { jp: "A「テレビでアニメとニュースとどちらをよく見ますか。」B「どちらもあまり見ませんが……。」", en: "A: \"Which do you watch more on TV, anime or the news?\" B: \"I don't watch either much, honestly...\"" },
      ],
    },

    // 2課
    {
      pattern: "〜ながら…",
      meaning: "while ~ing",
      usage:
        "Used when a main action or behavior is accompanied by a separate, simultaneous action. Added to a verb expressing a continuous action.",
      lesson: 2,
      examples: [
        { jp: "きれいな海を見ながらさんぽしました。", en: "I took a walk while looking at the beautiful sea." },
        { jp: "母は音楽を聞きながら料理を作ります。", en: "My mother cooks while listening to music." },
        { jp: "アルバイトをしながら大学に通いました。", en: "I attended university while working a part-time job." },
      ],
    },
    {
      pattern: "〜ところです",
      meaning: "just about to ~ / in the middle of ~ / just finished ~",
      usage:
        "Expresses a time point within an action or change. Dictionary form + ところ indicates a point right before the action starts; 〜ている + ところ indicates a point during a continuous action; た form + ところ indicates a point right after the action finished.",
      lesson: 2,
      examples: [
        { jp: "あ、試合が始まるところですよ。早く、早く。", en: "Oh, the match is just about to start. Hurry, hurry." },
        { jp: "今、インターネットで店の場所をしらべているところです。", en: "I'm just now looking up the shop's location online." },
        { jp: "サラ「もしもし、今どこ？もう駅にいるの？」トム「うん、ちょうど今駅に着いたところだよ。」", en: "Sara: \"Hello, where are you? Are you at the station already?\" Tom: \"Yeah, I just got to the station right now.\"" },
      ],
    },
    {
      pattern: "〜まで…・〜までに…",
      meaning: "until ~ / by ~",
      usage:
        "Expresses a time limitation. A phrase expressing a continuous action or state follows 〜まで, while 〜までに is followed by a phrase expressing an action of short duration.",
      lesson: 2,
      examples: [
        { jp: "ひこうきの出発時間まで、ここで待っています。", en: "I'll wait here until the plane's departure time." },
        { jp: "この仕事が終わるまで帰らないでください。", en: "Please don't go home until this work is finished." },
        { jp: "二十日までに旅行のお金をはらいます。", en: "I'll pay for the trip by the 20th." },
        { jp: "おきゃくさんが来るまでにへやをかたづけてね。", en: "Tidy up the room before the guests arrive." },
      ],
    },

    // 3課
    {
      pattern: "〜ませんか",
      meaning: "won't you ~? / would you like to ~?",
      usage:
        "Used when making a proposal or invitation. Can be used for a joint activity between speaker and listener, or when only the other person is involved.",
      lesson: 3,
      examples: [
        { jp: "A「ひさしぶりにテニスをしませんか。」B「あ、いいですね。」", en: "A: \"Would you like to play tennis together again, it's been a while?\" B: \"Oh, sounds good.\"" },
        { jp: "A「あした、うちに来ませんか。」B「あの、あしたはちょっと……。」", en: "A: \"Would you like to come to my place tomorrow?\" B: \"Um, tomorrow's a bit...\"" },
        { jp: "トム「これ、食べない？おいしいよ。」サラ「じゃ、一つもらうね。」", en: "Tom: \"Won't you try this? It's good.\" Sara: \"Okay, I'll have one.\"" },
      ],
    },
    {
      pattern: "〜ましょう(か)",
      meaning: "let's ~ / shall I ~?",
      usage:
        "Used to propose that an action be performed together with a partner's consent, or when seeking consent to do something yourself. In conversation with intimates, the volitional (う/よう) form is used instead.",
      lesson: 3,
      examples: [
        { jp: "A「もう5時ですね。」B「じゃ、帰りましょうか。」", en: "A: \"It's already 5.\" B: \"Well then, shall we head home?\"" },
        { jp: "A「いっしょに食事をしませんか。」B「いいですね。何を食べましょうか。」A「すしを食べませんか。」B「そうですね。じゃ、行きましょう。」", en: "A: \"Would you like to eat together?\" B: \"Sure, what shall we eat?\" A: \"How about sushi?\" B: \"Sounds good, let's go.\"" },
        { jp: "A「電気、つけましょうか。」B「ええ、おねがいします。」", en: "A: \"Shall I turn on the light?\" B: \"Yes, please.\"" },
        { jp: "トム「そのにもつ、持とうか。」サラ「あ、ありがとう。」", en: "Tom: \"Shall I carry that for you?\" Sara: \"Oh, thanks.\"" },
      ],
    },

    // 4課
    {
      pattern: "〜(られ)ます",
      meaning: "can ~ (potential)",
      usage:
        "Expresses capability or the potentiality of a situation. Used with verbs expressing intentional human behavior; the object particle を often changes to が.",
      lesson: 4,
      examples: [
        { jp: "ジョーさんは英語と日本語と中国語が話せます。", en: "Joe can speak English, Japanese, and Chinese." },
        { jp: "はなちゃんはまだ一人で服が着られません。", en: "Hana-chan still can't get dressed by herself." },
        { jp: "このびじゅつかんでは有名なえが見られます。", en: "At this museum you can see famous paintings." },
        { jp: "この水は飲めません。", en: "This water isn't drinkable." },
      ],
    },
    {
      pattern: "〜ができます・〜ことができます",
      meaning: "can do ~ / is able to ~",
      usage:
        "Expresses a situation of enablement or receipt of permission, and the existence of capability. Used with verbs expressing intentional human behavior — a slightly more formal pattern than 〜(られ)ます.",
      lesson: 4,
      examples: [
        { jp: "このコンビニは24時間買い物ができます。", en: "This convenience store lets you shop 24 hours a day." },
        { jp: "今、この建物の中には入ることができません。", en: "Right now you can't enter this building." },
        { jp: "わたしは日本の県の名前をぜんぶ言うことができます。", en: "I can name all of Japan's prefectures." },
      ],
    },
    {
      pattern: "見えます・聞こえます",
      meaning: "can be seen / can be heard",
      usage: "Expresses the natural ability to see or hear something.",
      lesson: 4,
      examples: [
        { jp: "いいへやですね。まどから海が見えます。", en: "Nice room. You can see the sea from the window." },
        { jp: "めがねがありませんから、よく見えません。", en: "I don't have my glasses, so I can't see well." },
        { jp: "風の音が聞こえるね。", en: "You can hear the sound of the wind, can't you." },
      ],
    },

    // 5課
    {
      pattern: "〜たことがあります",
      meaning: "have done ~ before",
      usage:
        "Expresses past experience. Not used for things that happened in the recent past. Often used with words expressing frequency such as 一度・一度も・何度も, but not with terms expressing habitual frequency such as いつも or たいてい.",
      lesson: 5,
      examples: [
        { jp: "前に一度テレビドラマに出たことがあります。", en: "I've appeared in a TV drama once before." },
        { jp: "A「入院したことがありますか。」B「いえ、一度もありません。」", en: "A: \"Have you ever been hospitalized?\" B: \"No, never.\"" },
        { jp: "わたしは今まで学校を休んだことがない。", en: "I've never missed school before." },
        { jp: "子どものころ、友だちとけんかしたことが何度もあります。", en: "As a child, I got into fights with friends many times." },
      ],
    },
    {
      pattern: "〜ことがあります",
      meaning: "sometimes ~ happens",
      usage:
        "Used when you wish to say that something unusual may happen. Not used for things that happen very frequently. Also used in the form 〜こともあります.",
      lesson: 5,
      examples: [
        { jp: "母はこのごろ人の名前を忘れることがあります。", en: "My mother sometimes forgets people's names these days." },
        { jp: "雪の日は道ですべることがありますから、注意してください。", en: "On snowy days you can sometimes slip on the road, so please be careful." },
        { jp: "サラはときどきぼくの話を聞いていないことがある。", en: "Sara sometimes isn't listening to what I say." },
        { jp: "A「毎朝何時ごろ朝ご飯を食べますか。」B「いつもは7時に食べますが、時間がないときは食べないこともあります。」", en: "A: \"About what time do you eat breakfast each morning?\" B: \"Usually at 7, but when I don't have time I sometimes don't eat at all.\"" },
      ],
    },

    // 6課
    {
      pattern: "〜てもいいです／〜てはいけません",
      meaning: "may ~ / must not ~",
      usage: "〜てもいいです expresses permission or concession, while 〜てはいけません expresses prohibition.",
      lesson: 6,
      examples: [
        { jp: "トム「ここにすわってもいいですか。」女の人「ええ、どうぞ。」", en: "Tom: \"May I sit here?\" Woman: \"Yes, go ahead.\"" },
        { jp: "安いへやをさがしています。せまくてもいいです。", en: "I'm looking for a cheap room. It's fine if it's small." },
        { jp: "はなちゃん、一人で川に行ってはいけないよ。", en: "Hana-chan, you mustn't go to the river alone." },
        { jp: "入社試験のときの服は、Tシャツではいけません。", en: "You can't wear a T-shirt for the job entrance exam." },
      ],
    },
    {
      pattern: "〜なくてもいいです／〜なければなりません",
      meaning: "don't have to ~ / must ~",
      usage:
        "〜なくてもいいです expresses an absence of necessity, or a concession. 〜なければなりません expresses necessity or obligation.",
      lesson: 6,
      examples: [
        { jp: "医者「もう薬を飲まなくてもいいですよ。」病気の人「そうですか。ああ、よかった。」", en: "Doctor: \"You don't need to take the medicine anymore.\" Patient: \"Really? Oh, what a relief.\"" },
        { jp: "いいホテルはありませんか。駅に近くなくてもいいです。", en: "Are there any good hotels? It doesn't have to be near the station." },
        { jp: "お母さん、はこ、ない？じょうぶでなくてもいいよ。", en: "Mom, do you have a box? It doesn't have to be sturdy." },
        { jp: "Eメールのへんじを書かなければなりません。", en: "I have to write a reply to the email." },
        { jp: "ここのサインはあなたのでなければなりません。", en: "The signature here has to be yours." },
      ],
    },

    // 7課
    {
      pattern: "〜がほしいです・〜たいです",
      meaning: "want ~ / want to ~",
      usage:
        "Expresses the speaker's hopes and desires. The object particle を sometimes changes to が. When expressing a third party's hopes and desires, the form changes to 〜がります.",
      lesson: 7,
      examples: [
        { jp: "わたしは自分のへやがほしいです。", en: "I want my own room." },
        { jp: "おもちゃがいっぱいあるね。けんがほしいのはどれ？", en: "There are so many toys. Which one does Ken want?" },
        { jp: "ああ、ゆっくり本が読みたいなあ。", en: "Ahh, I want to read a book slowly and leisurely." },
        { jp: "ぼく、この薬、飲みたくないよ。", en: "I don't want to take this medicine." },
        { jp: "7時の新幹線に乗りたかったのですが、間に合いませんでした。", en: "I wanted to catch the 7 o'clock shinkansen, but I didn't make it in time." },
        { jp: "うちの犬はいつもわたしが食べている物をほしがります。", en: "Our dog always wants whatever I'm eating." },
        { jp: "あんな寒い所にはだれも行きたがりませんよ。", en: "Nobody wants to go to a place that cold." },
      ],
    },
    {
      pattern: "〜といいです",
      meaning: "I hope ~",
      usage:
        "Expresses a situation hoped for by the speaker. Attached to verbs that don't indicate the speaker's own intention (non-volitional verbs, potential-meaning verbs, third-person-subject verbs, etc.). Often followed by ね, けど, or なあ.",
      lesson: 7,
      examples: [
        { jp: "いい仕事が見つかるといいですね。", en: "I hope you find a good job." },
        { jp: "運動会の日、雨がふらないといいですけど……。", en: "I hope it doesn't rain on sports day..." },
        { jp: "のどがいたいの？悪いかぜでないといいけど。", en: "Does your throat hurt? I hope it's not a bad cold." },
        { jp: "へやがもっと広いといいけどなあ。", en: "I wish the room were bigger." },
        { jp: "ホームステイの家族がみんな親切だといいなあ。", en: "I hope the host family is all kind." },
      ],
    },

    // 8課
    {
      pattern: "〜そうです（様態）",
      meaning: "looks like ~ / seems ~ (appearance)",
      usage:
        "Used to express the sense that something will occur based on outside appearance or circumstances, as well as inferences based on state or quality, or judgments and presentiments.",
      lesson: 8,
      examples: [
        { jp: "あ、テーブルの上のコップがおちそうですよ。", en: "Oh, the cup on the table looks like it's about to fall." },
        { jp: "わあ、おいしそうなケーキですね。", en: "Wow, that cake looks delicious." },
        { jp: "ジョンさんはしんぱいそうに電話で話しています。", en: "John is talking on the phone, looking worried." },
        { jp: "夏休みには国へ帰れそうです。", en: "It looks like I'll be able to go home during summer break." },
        { jp: "とてもいい天気です。雨はふりそうもありませんね。", en: "It's very fine weather. It doesn't look like it's going to rain at all." },
      ],
    },
    {
      pattern: "〜がっています・〜がります",
      meaning: "shows signs of feeling ~ (about a third party)",
      usage:
        "Expresses the wishes or emotions of a third party (chiefly relatives, or people of lower status than the speaker). When describing a general trend rather than the situation at hand, 〜がります is used.",
      lesson: 8,
      examples: [
        { jp: "犬が死にました。母はさびしがっています。", en: "The dog died. My mother is showing signs of loneliness." },
        { jp: "子どもたちはおもしろがってゲームであそんでいます。", en: "The children are playing the game, finding it fun." },
        { jp: "弟はこわい話をいやがります。", en: "My younger brother dislikes scary stories." },
      ],
    },
    {
      pattern: "〜まま…",
      meaning: "leaving ~ as it is / while still ~",
      usage:
        "Expresses a state that is continuous and hasn't changed. Often used when the speaker feels the situation is undesirable because no change has occurred.",
      lesson: 8,
      examples: [
        { jp: "きのう、まどを開けたままねました。", en: "Yesterday I fell asleep leaving the window open." },
        { jp: "手がきたないままではいけないよ。早くあらって。", en: "You can't leave your hands dirty like that. Go wash them quickly." },
        { jp: "今日は4月1日ですが、カレンダーが先月のままですよ。", en: "Today is April 1st, but the calendar is still showing last month." },
      ],
    },

    // 9課
    {
      pattern: "〜から…・〜からです",
      meaning: "because ~",
      usage: "Used to explain cause, reason, or grounds, somewhat emphatically.",
      lesson: 9,
      examples: [
        { jp: "ちょっと用事がありますから、今日は先に帰ります。", en: "I have a little errand, so I'll head home first today." },
        { jp: "あぶないから、さわらないで！", en: "It's dangerous, so don't touch it!" },
        { jp: "スピーチが上手にできませんでした。れんしゅうが足りなかったからです。", en: "I couldn't give the speech well. It's because I didn't practice enough." },
      ],
    },
    {
      pattern: "〜ので…",
      meaning: "since ~ / because ~",
      usage:
        "Expresses cause and reason. A more polite form than 〜から, and can't be used before imperative phrases (よめ, こい, etc.) or polite everyday formulas such as すみません, ありがとう.",
      lesson: 9,
      examples: [
        { jp: "すみません、頭がいたいので、今日は休みます。", en: "Excuse me, I have a headache, so I'll take today off." },
        { jp: "この子はまだ5さいなので、バス代はかかりません。", en: "This child is still 5, so there's no bus fare." },
        { jp: "雨がふっていたので、今日はさんぽに行かなかった。", en: "Since it was raining, I didn't go for a walk today." },
      ],
    },
    {
      pattern: "〜て…・〜くて…・〜で…",
      meaning: "and so ~ (cause of a feeling)",
      usage:
        "Expresses cause and reason, often for emotions and perceptions, more so than 〜から and 〜ので. Can't be followed by statements expressing hope, intention, or a request on the part of the speaker.",
      lesson: 9,
      examples: [
        { jp: "きのうはたくさん仕事があって、たいへんでした。", en: "Yesterday I had a lot of work, and it was tough." },
        { jp: "友だちがいなくて、さびしい。", en: "I don't have any friends, and I'm lonely." },
        { jp: "しんぱいで、よくねむれませんでした。", en: "I was worried, and couldn't sleep well." },
        { jp: "教えてくれて、ありがとう。", en: "Thanks for telling me." },
        { jp: "おくれて、すみませんでした。", en: "Sorry for being late." },
      ],
    },

    // 10課
    {
      pattern: "〜に…",
      meaning: "in order to ~ (purpose of movement)",
      usage:
        "Expresses the purpose of movement. Before に comes a word expressing intentional action; after に comes a limited set of motion verbs like 行きます・来ます・かえります・もどります.",
      lesson: 10,
      examples: [
        { jp: "父はこうえんへさんぽに行きました。", en: "My father went to the park to take a walk." },
        { jp: "うちにさいふをわすれたので、とりに帰ります。", en: "I left my wallet at home, so I'm going back to get it." },
        { jp: "あした、8時に友だちがうちにむかえに来る。", en: "Tomorrow at 8, a friend is coming to my place to pick me up." },
      ],
    },
    {
      pattern: "〜ため(に)…",
      meaning: "in order to ~ / for the purpose of ~",
      usage:
        "Expresses the purpose of an action, and is attached to words expressing intentional actions. The subject is the same before and after ため(に).",
      lesson: 10,
      examples: [
        { jp: "けっこんしきのために、いろいろじゅんびをしています。", en: "I'm making various preparations for the wedding." },
        { jp: "アニメの勉強のために、日本にりゅうがくします。", en: "I'm studying abroad in Japan in order to study anime." },
        { jp: "社長は会議にしゅっせきするため、アメリカへ行きました。", en: "The president went to America in order to attend a meeting." },
        { jp: "これは漢字をれんしゅうするための本です。", en: "This is a book for practicing kanji." },
      ],
    },
    {
      pattern: "〜ように…",
      meaning: "so that ~",
      usage:
        "Expresses one's wish that something should occur. Added to verbs that don't include the speaker's own intention (non-volitional verbs, verbs expressing possibility, and verbs whose subject is a third person).",
      lesson: 10,
      examples: [
        { jp: "話がよく聞こえるように、前のほうにすわりましょう。", en: "Let's sit near the front so we can hear the talk well." },
        { jp: "いい風が入るように、まどを大きく開けた。", en: "I opened the window wide so that a nice breeze would come in." },
        { jp: "ゆきの日、学校におくれないように、早く家を出ました。", en: "On the snowy day, I left home early so as not to be late for school." },
        { jp: "けがをしないように、気をつけてね。", en: "Be careful not to get hurt." },
      ],
    },

    // 11課
    {
      pattern: "(〜も)〜し、(〜も)…",
      meaning: "both ~ and ~ / not only ~ but also ~",
      usage:
        "Used when listing multiple reasons for something. If 〜し is used only once, there's an implication that other unspoken reasons may also apply.",
      lesson: 11,
      examples: [
        { jp: "にもつも多いし、雨もふっているし、タクシーで行きましょう。", en: "There's a lot of luggage, and it's raining too, so let's go by taxi." },
        { jp: "ねだんもちょうどいいし、このベッドを買います。", en: "The price is just right too, so I'll buy this bed." },
        { jp: "今日は早く帰りたい。ちょっと頭がいたいし……。", en: "I want to go home early today. My head hurts a bit too..." },
        { jp: "この店のパンはおいしいし、安いです。", en: "This shop's bread is tasty, and cheap." },
        { jp: "母は仕事もよくするし、しゅみも多いです。", en: "My mother works hard, and also has lots of hobbies." },
        { jp: "ハワイではきれいな海でおよぎたいし、買い物もしたい。", en: "In Hawaii I want to swim in the beautiful ocean, and also go shopping." },
      ],
    },
    {
      pattern: "〜たり〜たりします",
      meaning: "do things like ~ and ~",
      usage: "Used to express a string of actions or behaviors, with no regard to sequence in time.",
      lesson: 11,
      examples: [
        { jp: "休みの日はプールでおよいだりテニスをしたりします。", en: "On my days off I do things like swim in the pool and play tennis." },
        { jp: "パーティーのために料理を作ったり飲み物を買ったりした。", en: "For the party I did things like cook food and buy drinks." },
        { jp: "病気がなおって、もう何でも食べたり飲んだりできます。", en: "My illness is cured, and now I can eat and drink anything again." },
        { jp: "きのうは一日中雨がふったりやんだりしていました。", en: "Yesterday it rained on and off all day." },
        { jp: "そばはたいいんした後、ねたり起きたりしています。", en: "Soba has been sleeping and waking up on and off since being discharged." },
        { jp: "はなちゃん、ドアを開けたりしめたりしないで。", en: "Hana-chan, stop opening and closing the door." },
      ],
    },

    // 12課
    {
      pattern: "〜かもしれません",
      meaning: "might ~ / maybe ~",
      usage: "Expresses possibility or potentiality.",
      lesson: 12,
      examples: [
        { jp: "あしたはゆきがふるかもしれませんね。", en: "It might snow tomorrow." },
        { jp: "このノートはサラさんのかもしれないよ。", en: "This notebook might be Sara's." },
        { jp: "あのときの言い方は正しくなかったかもしれないなあ。", en: "The way I said it back then might not have been right." },
        { jp: "今度の仕事はたいへんかもしれないけど、がんばってね。", en: "This next job might be tough, but do your best." },
      ],
    },
    {
      pattern: "〜はずです",
      meaning: "should be ~ / is supposed to be ~",
      usage: "Used to make an objectively grounded statement that you're confident of.",
      lesson: 12,
      examples: [
        { jp: "この犬は2さいのときうちに来たのです。今年12さいのはずです。", en: "This dog came to us when it was 2. It should be 12 this year." },
        { jp: "食べてみて。しんせんな魚だから、おいしいはずだよ。", en: "Try it. It's fresh fish, so it should be delicious." },
        { jp: "あしたの会には山川先生もしゅっせきするはずです。", en: "Professor Yamakawa should also be attending tomorrow's meeting." },
        { jp: "3時のひこうきですから、母はもうひこうきに乗ったはずです。", en: "It's the 3 o'clock flight, so my mother should have already boarded." },
      ],
    },
    {
      pattern: "〜ようです・〜みたいです",
      meaning: "seems like ~ / looks like ~",
      usage:
        "Used to make a statement based on the speaker's personal surmise or impression. 〜みたいです is best avoided in formal situations.",
      lesson: 12,
      examples: [
        { jp: "この肉は少し古いようです。へんなにおいがします。", en: "This meat seems a bit old. It smells strange." },
        { jp: "けん君は本が好きなようですね。いつも何か読んでいます。", en: "Ken seems to like books. He's always reading something." },
        { jp: "はなちゃんはこのおかしがほしいみたいだね。こちらを見ているよ。", en: "Hana-chan seems to want this snack. She's looking this way." },
        { jp: "お母さん、げんかんにだれか来たみたいだよ。トントンと音がしたよ。", en: "Mom, it seems like someone's at the front door. I heard a knocking sound." },
      ],
    },

    // 13課
    {
      pattern: "〜なさい",
      meaning: "do ~ (instruction/command)",
      usage:
        "Used by teachers giving instructions to students, and parents to children. Also used for instructions on examinations.",
      lesson: 13,
      examples: [
        { jp: "子どもは早くねなさい。", en: "Children, go to bed early." },
        { jp: "しゅくだいを出しなさい。", en: "Turn in your homework." },
        { jp: "つぎの言葉を漢字で書きなさい。", en: "Write the following words in kanji." },
      ],
    },
    {
      pattern: "〜ほうがいいです",
      meaning: "it's better to ~",
      usage:
        "Expresses a mild warning. Often used when you want to suggest an undesirable result will likely arise if something isn't done.",
      lesson: 13,
      examples: [
        { jp: "会場に行く前に地図で場所をしらべたほうがいいですね。", en: "It's better to check the location on a map before heading to the venue." },
        { jp: "寒いから、コートを着たほうがいいよ。", en: "It's cold, so you'd better wear a coat." },
        { jp: "ねつがあるの？じゃ、出かけないほうがいいよ。", en: "Do you have a fever? Then you'd better not go out." },
      ],
    },
    {
      pattern: "〜ないと",
      meaning: "have to ~ (colloquial)",
      usage:
        "Used to instigate one's own action, or another person's action, when you feel a situation will worsen unless something is done. A colloquial expression.",
      lesson: 13,
      examples: [
        { jp: "けん、ご飯の前には手をあらわないと。", en: "Ken, you have to wash your hands before eating." },
        { jp: "あ、わすれていた。電話しないと。", en: "Oh, I forgot. I need to make a call." },
        { jp: "早く起きて。ほら、急がないと。間に合わないよ。", en: "Get up quickly. Come on, you have to hurry. You won't make it in time." },
      ],
    },

    // 14課
    {
      pattern: "〜たら…（１４課）",
      meaning: "if / when ~",
      usage: "Expresses the idea that when ~ is assumed, ... will result. Often used together with もし.",
      lesson: 14,
      examples: [
        { jp: "もし水がなかったら、わたしたちは生きられません。", en: "If there were no water, we couldn't live." },
        { jp: "もし大きいじしんが起きたら、すぐつくえの下に入ってください。", en: "If a big earthquake happens, please get under the desk right away." },
        { jp: "あした天気がよかったら、どこかへ行きませんか。", en: "If the weather's nice tomorrow, shall we go somewhere?" },
      ],
    },
    {
      pattern: "〜ば…・〜なら…",
      meaning: "if ~",
      usage:
        "Expresses the idea that when condition ~ is met, ... will arise or result. When ~ is a verb expressing an action, ... can't be followed by statements expressing the speaker's intention or inducement.",
      lesson: 14,
      examples: [
        { jp: "バスに乗れば、駅まで10分です。", en: "If you take the bus, it's 10 minutes to the station." },
        { jp: "じしょを使わなければ、この本は読めません。", en: "If you don't use a dictionary, you can't read this book." },
        { jp: "もし暑ければ、クーラーをつけましょうか。", en: "If it's hot, shall I turn on the AC?" },
        { jp: "子どもの名前は、男の子なら「こうた」、女の子なら「みちる」がいいです。", en: "For the baby's name, 'Kouta' is good if it's a boy, and 'Michiru' if it's a girl." },
      ],
    },
    {
      pattern: "〜と…（１４課）",
      meaning: "when ~ / if ~ (automatic result)",
      usage:
        "Expresses the idea that when ~ arises or happens, it will definitely lead to .... ... can't be followed by statements expressing the speaker's intention or inducement.",
      lesson: 14,
      examples: [
        { jp: "お金を入れてボタンをおすと、きっぷが出ます。", en: "When you insert money and press the button, a ticket comes out." },
        { jp: "ねむいと、頭が働きません。", en: "When I'm sleepy, my head doesn't work." },
        { jp: "Mサイズだと、小さいです。Lサイズをください。", en: "If it's a size M, it's too small. Please give me a size L." },
        { jp: "あのかどを左にまがると、駅が見えます。", en: "If you turn left at that corner, you can see the station." },
      ],
    },

    // 15課
    {
      pattern: "〜たら…（１５課）",
      meaning: "when ~ (a known future event)",
      usage:
        "Expresses the idea that when ~ arises or happens, ... is or should be done. ~ is not an assumption, but something you know in advance will happen.",
      lesson: 15,
      examples: [
        { jp: "3時になったら、休みましょう。", en: "When it's 3 o'clock, let's take a break." },
        { jp: "この学校をそつぎょうしたら、何をしますか。", en: "What will you do once you graduate from this school?" },
        { jp: "おゆがわいたら、火を止めてください。", en: "When the water boils, please turn off the heat." },
      ],
    },
    {
      pattern: "〜なら…（１５課）",
      meaning: "if it's the case that ~ / speaking of ~",
      usage:
        "Expresses the speaker's judgment, volition, or inducement in light of ~ (some information). ~ is a topic raised by another person's words or state.",
      lesson: 15,
      examples: [
        { jp: "サラ「ケーキがおいしい店を知りませんか。」山田「ケーキなら、駅前のセボンがおいしいですよ。」", en: "Sara: \"Do you know a shop with good cake?\" Yamada: \"For cake, Sebon in front of the station is good.\"" },
        { jp: "トム「春休みに京都に行きたいです。」先生「京都に行くなら、ガイドブックを貸しましょうか。」", en: "Tom: \"I want to go to Kyoto during spring break.\" Teacher: \"If you're going to Kyoto, shall I lend you a guidebook?\"" },
        { jp: "【テレビがついているが、子どもは見ていない】母「見ていないなら、テレビはもう消すよ。」", en: "[The TV is on but the child isn't watching] Mother: \"If you're not watching it, I'm turning the TV off now.\"" },
      ],
    },

    // 16課
    {
      pattern: "〜ても…",
      meaning: "even if ~ / even though ~",
      usage:
        "Indicates that ... doesn't happen or arise as would be expected given ~. ~ is either an assumption or a fact. Sometimes used together with もし, どんなに, いくら, or an interrogative.",
      lesson: 16,
      examples: [
        { jp: "こうはい「あしたゆきがふったら、れんしゅうは休みですか。」せんぱい「いや、ゆきがふっても、休みじゃないよ。」", en: "Junior: \"If it snows tomorrow, is practice cancelled?\" Senior: \"No, even if it snows, it's not cancelled.\"" },
        { jp: "もし暑くても、仕事にはスーツを着ていきます。", en: "Even if it's hot, I go to work in a suit." },
        { jp: "この料理はかんたんです。はじめて作る人でもできます。", en: "This dish is easy. Even someone making it for the first time can do it." },
        { jp: "説明がむずかしくて、何回読んでも、意味がわかりません。", en: "The explanation is difficult, and no matter how many times I read it, I don't understand the meaning." },
        { jp: "山田「ケーキが好きなんでしょう？これ、ぜんぶどうぞ。」トム「え、いくら好きでも、こんなにたくさんは食べませんよ。」", en: "Yamada: \"You like cake, right? Here, have all of it.\" Tom: \"What, even though I like it, I can't eat this much.\"" },
      ],
    },
    {
      pattern: "〜のに…",
      meaning: "even though ~ / despite ~",
      usage:
        "Indicates that ... happens or arises despite what would be expected given ~ (although is the main English equivalent). Used to express the speaker's surprise, regret, dissatisfaction, or reproach. Can't be followed by statements of the speaker's intention or inducement, and can also come at the end of a sentence.",
      lesson: 16,
      examples: [
        { jp: "きのうしゅくだいをやったのに、持ってきませんでした。", en: "I did the homework yesterday, but I didn't bring it." },
        { jp: "雨がふっていないのに、あの人はかさをさしています。", en: "It's not raining, yet that person has their umbrella up." },
        { jp: "このかばんはまだ新しいのに、もうこわれました。", en: "This bag is still new, yet it's already broken." },
        { jp: "はなちゃんはまだ3さいなのに、漢字がわかる。", en: "Hana-chan is only 3, yet she understands kanji." },
        { jp: "はな「お兄ちゃん、雨がふっているよ。」けん「ほんとう？あーあ、今日は運動会なのに。」", en: "Hana: \"Big brother, it's raining.\" Ken: \"Really? Ugh, and today's sports day...\"" },
      ],
    },

    // 17課
    {
      pattern: "〜と…（１７課）",
      meaning: "quoting ~ / thinking that ~",
      usage:
        "Used before proper nouns and quoted speech, and to express thoughts and ideas. When the subject is a third person, 〜と思っています is used rather than 〜と思います.",
      lesson: 17,
      examples: [
        { jp: "はじめて会った人には「はじめまして」と言います。", en: "You say \"nice to meet you\" to someone you're meeting for the first time." },
        { jp: "サラ「この花は日本語で何と言いますか。」山田「すいせんと言います。」", en: "Sara: \"What is this flower called in Japanese?\" Yamada: \"It's called a daffodil.\"" },
        { jp: "わたしは「手伝いましょうか」と聞きました。", en: "I asked, \"Shall I help?\"" },
        { jp: "先生「ジョーさんのはっぴょうをどう思いますか。」トム「とてもよかったと思います。」", en: "Teacher: \"What do you think of Joe's presentation?\" Tom: \"I think it was very good.\"" },
        { jp: "両親はわたしが国へ帰らないと思っています。", en: "My parents think that I won't return to my home country." },
        { jp: "じこしょうかいの作文にわたしは歌がとくいだと書きました。", en: "In my self-introduction essay, I wrote that I'm good at singing." },
        { jp: "日本人の40％が、好きな季節は春だと答えました。", en: "40% of Japanese people answered that their favorite season is spring." },
      ],
    },
    {
      pattern: "〜か…・〜かどうか…",
      meaning: "whether ~ (embedded question)",
      usage:
        "Used when a question is embedded in a sentence. か is used when an interrogative is included in the question part; otherwise かどうか is used.",
      lesson: 17,
      examples: [
        { jp: "パーティーにだれが来るか教えてください。", en: "Please tell me who's coming to the party." },
        { jp: "きのうどうやって帰ったかおぼえていません。", en: "I don't remember how I got home yesterday." },
        { jp: "サラさんの誕生日はいつか知っていますか。", en: "Do you know when Sara's birthday is?" },
        { jp: "旅行に行けるかどうかまだわかりません。", en: "I still don't know whether I can go on the trip." },
        { jp: "ぶんぽうが正しいかどうかチェックしてください。", en: "Please check whether the grammar is correct." },
        { jp: "その国に行くときビザがひつようかどうかしらべます。", en: "I'll look up whether a visa is needed for going to that country." },
      ],
    },

    // 18課
    {
      pattern: "〜(よ)うと思います",
      meaning: "I intend to ~ / I'm thinking of ~ing",
      usage: "Expresses intent. The subject is the first person. 〜ようとおもっています is used when the intent dates back some time.",
      lesson: 18,
      examples: [
        { jp: "いい天気だから、出かけようと思います。", en: "The weather's nice, so I'm thinking of going out." },
        { jp: "旅行に行くので、かばんを買おうと思っています。", en: "I'm going on a trip, so I'm planning to buy a bag." },
        { jp: "今日は帰るとき、図書館によろうと思っています。", en: "I'm planning to stop by the library on my way home today." },
        { jp: "来年ヨーロッパを旅行しようと思っている。", en: "I'm planning to travel through Europe next year." },
        { jp: "わたしは一人でカラオケに行こうとは思いません。", en: "I don't intend to go to karaoke alone." },
      ],
    },
    {
      pattern: "〜つもりです",
      meaning: "intend to ~ / plan to ~",
      usage:
        "Expresses intent slightly more strongly than 〜ようとおもっています. Not used when a decision is being made on the spot, but when a previous intention is being affirmed. Subject is the first person; forms like 〜そうです or 〜らしいです are added when the subject is a third person.",
      lesson: 18,
      examples: [
        { jp: "先生「夏休みに何をしますか。」トム「国へ帰るつもりです。」", en: "Teacher: \"What will you do during summer break?\" Tom: \"I plan to go back to my country.\"" },
        { jp: "日曜日は大そうじをするつもりだ。", en: "I plan to do a big cleaning on Sunday." },
        { jp: "妹はけっこんしきにこの服を着ていくつもりらしいです。", en: "It seems my younger sister plans to wear this outfit to the wedding." },
        { jp: "今日は品物を見るだけで、何も買わないつもりです。", en: "Today I'm just going to look at the goods, without buying anything." },
        { jp: "つぎの日本語能力試験はうけないつもりです。", en: "I don't plan to take the next Japanese Language Proficiency Test." },
        { jp: "わたしは自分の意見をかえるつもりはありません。", en: "I have no intention of changing my own opinion." },
      ],
    },

    // 19課
    {
      pattern: "〜と言っていました",
      meaning: "said that ~",
      usage: "Used to restate or pass on something said previously by somebody else. The question part uses 何と.",
      lesson: 19,
      examples: [
        { jp: "トムさんは今日休むと言っていました。", en: "Tom said he'd be off today." },
        { jp: "サラさんはさいきんいそがしいと言っていましたよ。", en: "Sara said she's been busy lately." },
        { jp: "山田「お父さんから電話？何と言っていた？」", en: "Yamada: \"A call from Dad? What did he say?\"" },
        { jp: "トム「今日はばんご飯はいらないと言っていましたよ。」", en: "Tom: \"He said he doesn't need dinner today.\"" },
      ],
    },
    {
      pattern: "〜そうです（伝聞）",
      meaning: "I heard that ~ (hearsay)",
      usage:
        "Used to restate or pass on information you've heard or read. Often used together with 〜によると, 〜では, or 〜でよみましたが, which indicate the source of the information.",
      lesson: 19,
      examples: [
        { jp: "天気よほうによると、あしたは寒いそうです。", en: "According to the weather forecast, it'll apparently be cold tomorrow." },
        { jp: "せんぱいの話では、この試験はあまりむずかしくないそうだよ。", en: "According to a senior, this exam apparently isn't very difficult." },
        { jp: "新聞で読みましたが、駅前で火事があったそうですね。", en: "I read in the paper that there was apparently a fire in front of the station." },
      ],
    },
    {
      pattern: "〜らしいです",
      meaning: "it seems that ~ / apparently ~",
      usage:
        "An expression for passing on information obtained from somebody else, or judgments based on a situation. Used when the source or details of the information are less clear than with 〜そうです.",
      lesson: 19,
      examples: [
        { jp: "聞いた話では、あの山にはさるがいるらしいです。", en: "From what I've heard, apparently there are monkeys on that mountain." },
        { jp: "うわさによると、あのホテルはあまりよくないらしいよ。", en: "According to rumor, that hotel apparently isn't very good." },
        { jp: "じこがあったらしいですよ。けいさつの車が止まっていました。", en: "There seems to have been an accident. Police cars were stopped there." },
        { jp: "この店は有名らしいね。よく名前を聞くよ。", en: "This shop seems to be famous. I hear its name a lot." },
      ],
    },

    // 20課
    {
      pattern: "〜くします・〜にします",
      meaning: "make (something) ~ (deliberate change)",
      usage: "Used when somebody deliberately makes a change to a thing or situation.",
      lesson: 20,
      examples: [
        { jp: "テレビの音を大きくしました。", en: "I turned up the volume on the TV." },
        { jp: "このズボンを少し短くしてください。", en: "Please shorten these pants a bit." },
        { jp: "つくえの上をきれいにしましょう。", en: "Let's make the top of the desk clean." },
        { jp: "ご飯のりょうを半分にしてください。", en: "Please make the amount of rice half." },
        { jp: "かみのけの色を茶色にしたいです。", en: "I want to dye my hair brown." },
      ],
    },
    {
      pattern: "〜くなります・〜になります・〜ようになります",
      meaning: "become ~",
      usage:
        "Expresses change in a thing or situation. Not used with verbs that already express change themselves (かわる, ふとる, ふえる, etc.).",
      lesson: 20,
      examples: [
        { jp: "子犬はすぐ大きくなります。", en: "Puppies grow big quickly." },
        { jp: "ていねいにそうじすれば、へやがもっときれいになります。", en: "If you clean carefully, the room will become cleaner." },
        { jp: "さいきん、この店ではおきゃくさんのかずが半分になりました。", en: "Recently, the number of customers at this shop has dropped to half." },
        { jp: "日本語が上手に話せるようになりたいです。", en: "I want to become able to speak Japanese well." },
        { jp: "うちのにわに鳥が来るようになりました。", en: "Birds have started coming to our garden." },
        { jp: "このごろ、前ほど本を読まなくなった。", en: "These days, I've stopped reading books as much as before." },
      ],
    },

    // 21課
    {
      pattern: "〜にします・〜ことにします",
      meaning: "decide on ~ / decide to ~",
      usage:
        "Expresses a decision made in some matter, based on the speaker's personal volition. Implies a positive attitude.",
      lesson: 21,
      examples: [
        { jp: "ばんご飯はカレーにします。", en: "I'll have curry for dinner." },
        { jp: "つぎのれんしゅうの日は金曜日にしませんか。", en: "Shall we make the next practice day Friday?" },
        { jp: "このケーキ、おいしそうですね。これにします。", en: "This cake looks tasty. I'll go with this one." },
        { jp: "今日からたばこをやめることにします。", en: "I've decided to quit smoking from today." },
        { jp: "夏休みは国へは帰らないことにしました。", en: "I've decided not to go back to my country during summer break." },
      ],
    },
    {
      pattern: "〜になります・〜ことになります",
      meaning: "it has been decided that ~ / it turns out that ~",
      usage:
        "Expresses a decision made regardless of the speaker's personal volition. Also used when a decision is in fact based on the speaker's own volition, but the speaker doesn't want to state this directly.",
      lesson: 21,
      examples: [
        { jp: "さよならパーティーは3月15日になりました。", en: "The farewell party has been set for March 15th." },
        { jp: "チームの名前は「さむらい」になりました。", en: "The team's name became \"Samurai\"." },
        { jp: "駅前に高いビルが建つことになりました。", en: "It's been decided that a tall building will be built in front of the station." },
        { jp: "社長は来月、アメリカに行くことになるだろう。", en: "It'll probably turn out that the president goes to America next month." },
        { jp: "来年、けっこんすることになりました。", en: "It's been decided that we'll get married next year." },
        { jp: "雨で試合はしないことになりました。", en: "Due to rain, it's been decided the match won't be held." },
      ],
    },

    // 22課
    {
      pattern: "〜てみます",
      meaning: "try ~ing",
      usage:
        "Used when trying something out to see if it's good or appropriate, or when expressing an inclination to know about the nature of something. Also used when making a mild recommendation to someone else.",
      lesson: 22,
      examples: [
        { jp: "くつを買う前に、はいてみます。", en: "Before buying shoes, I try them on." },
        { jp: "一度京都へ行ってみたい。", en: "I want to try going to Kyoto once." },
        { jp: "この料理を食べてみてください。", en: "Please try eating this dish." },
        { jp: "このゲームはおもしろいよ。トムもやってみない？", en: "This game is fun. Won't you try it too, Tom?" },
      ],
    },
    {
      pattern: "〜ておきます",
      meaning: "do ~ in advance / leave (something) done",
      usage:
        "Added to verbs to suggest an action is taken to avoid possible future trouble, or pre-emptively. Also used to indicate that the action of the verb should continue, i.e. maintaining a state.",
      lesson: 22,
      examples: [
        { jp: "にもつをかばんに入れておきます。", en: "I'll put the luggage in the bag ahead of time." },
        { jp: "ごみを外に出しておきましょう。", en: "Let's put the trash out in advance." },
        { jp: "旅行の話はサラに伝えておいたよ。", en: "I already told Sara about the trip." },
        { jp: "まどはそのまま開けておいてください。", en: "Please leave the window open as it is." },
      ],
    },
    {
      pattern: "〜てしまいます",
      meaning: "end up ~ing / finish ~ing completely",
      usage:
        "Expresses rapid or early completion of an action or behavior, as well as regret at failing to do something or making an error that can't easily be undone.",
      lesson: 22,
      examples: [
        { jp: "レポートはあした出してしまいます。", en: "I'll get the report submitted by tomorrow." },
        { jp: "今日買った本はもう読んでしまった。", en: "I already finished reading the book I bought today." },
        { jp: "あの人の名前をわすれてしまいました。", en: "I've completely forgotten that person's name." },
        { jp: "あ、白い服がよごれてしまいますよ。", en: "Oh, your white clothes are going to get dirty!" },
      ],
    },

    // 23課
    {
      pattern: "あげます・〜てあげます",
      meaning: "give ~ / do ~ for (someone)",
      usage:
        "The subject is the speaker or somebody emotionally close to the speaker. The recipient is a person other than the speaker. さしあげます is used when the recipient is of higher status and outside the family.",
      lesson: 23,
      examples: [
        { jp: "妹はサラさんに花をあげました。", en: "My younger sister gave Sara flowers." },
        { jp: "先生にカップをさしあげました。", en: "I gave the teacher a cup." },
        { jp: "サッカー場に行くの？地図をかいてあげるよ。", en: "Are you going to the soccer field? I'll draw you a map." },
      ],
    },
    {
      pattern: "くれます・〜てくれます",
      meaning: "(someone) gives me ~ / does ~ for me",
      usage:
        "The subject is somebody other than the speaker. The recipient is the speaker, or somebody emotionally close to the speaker. くださいます is used when receiving from someone of higher status outside the family.",
      lesson: 23,
      examples: [
        { jp: "山田さんはわたしに時計をくれました。", en: "Yamada gave me a watch." },
        { jp: "先生が妹に本をくださいました。", en: "The teacher gave my younger sister a book." },
        { jp: "友だちが店の場所を教えてくれました。", en: "A friend told me where the shop was." },
        { jp: "サラさんはいっしょに病院へ行ってくれた。", en: "Sara went to the hospital together with me." },
      ],
    },
    {
      pattern: "もらいます・〜てもらいます",
      meaning: "receive ~ / have (someone) do ~ for me",
      usage:
        "The subject — the recipient — is the speaker, or somebody emotionally close to the speaker. いただきます is used when receiving from someone of higher status outside the family.",
      lesson: 23,
      examples: [
        { jp: "山田さんに／から時計をもらいました。", en: "I received a watch from Yamada." },
        { jp: "妹は先生に／から本をいただきました。", en: "My younger sister received a book from the teacher." },
        { jp: "サラさんにいっしょに病院へ行ってもらった。", en: "I had Sara go to the hospital together with me." },
      ],
    },

    // 24課
    {
      pattern: "〜(られ)ます（受身１）",
      meaning: "was ~ed (direct passive)",
      usage:
        "With the speaker, or somebody emotionally close to the speaker, as subject, this passive form expresses being subject to the actions or behavior of another person. When the subject is わたし, it's usually omitted.",
      lesson: 24,
      examples: [
        { jp: "今日は先生にほめられました。", en: "Today I was praised by the teacher." },
        { jp: "朝、サッカーのれんしゅうがあるから、いつも6時に起こされる。", en: "I have soccer practice in the morning, so I'm always woken up at 6." },
        { jp: "女の人に道を聞かれました。", en: "I was asked for directions by a woman." },
      ],
    },
    {
      pattern: "〜(られ)ます（受身２）",
      meaning: "had ~ done to me (to my detriment)",
      usage:
        "Used when your person or belongings are affected by the action or behavior of another person, or, not necessarily directly, by an event. In both cases, usually used when annoyance is felt. When the behavior or action is something to be grateful for, 〜てくれる or 〜てもらう is used instead.",
      lesson: 24,
      examples: [
        { jp: "(わたしは)電車の中で足をふまれました。", en: "My foot got stepped on on the train." },
        { jp: "弟にケーキを食べられてしまいました。", en: "My younger brother ate my cake, to my annoyance." },
        { jp: "うちの前にごみをすてられて、こまっています。", en: "Someone dumped trash in front of my house, and I'm troubled by it." },
        { jp: "きのう、どろぼうに入られた。", en: "Yesterday I had a burglar break in." },
      ],
    },
    {
      pattern: "〜(られ)ます（受身３）",
      meaning: "is ~ed (objective fact)",
      usage:
        "A passive sentence with an object or event as the topic. This form is used only with facts, without reference to the emotions of the speaker.",
      lesson: 24,
      examples: [
        { jp: "来年、夏のオリンピックが開かれます。", en: "Next year, the summer Olympics will be held." },
        { jp: "この本は世界中で読まれている。", en: "This book is read all over the world." },
        { jp: "この絵は1800年にかかれたそうです。", en: "This painting was apparently painted in 1800." },
      ],
    },

    // 25課
    {
      pattern: "〜(さ)せます",
      meaning: "make/let (someone) ~ (causative)",
      usage:
        "Used to mean making somebody behave in a certain way, giving permission or a favor, and to evoke an emotion. The particle for the agent of the action is usually を when the verb is intransitive, and に when the verb is transitive.",
      lesson: 25,
      examples: [
        { jp: "店長「今日、店員を一人やめさせたよ。ちこくが多いのでね。」", en: "Manager: \"I had one employee quit today — they were late too often.\"" },
        { jp: "兄「弟にへやのそうじをさせました。」", en: "Older brother: \"I made my younger brother clean the room.\"" },
        { jp: "けんは犬をじゆうにあそばせます。", en: "Ken lets the dog play freely." },
        { jp: "このノート、コピーさせてくれませんか。", en: "Would you let me make a copy of this notebook?" },
        { jp: "うそをついて、父をおこらせてしまいました。", en: "I told a lie and ended up making my father angry." },
        { jp: "妹をなかせてはいけないよ。", en: "You mustn't make your little sister cry." },
      ],
    },
    {
      pattern: "〜さ(せら)れます",
      meaning: "was made to ~ (against one's will)",
      usage:
        "Expresses the idea of reluctantly being forced to do something that has to be done, or of some person being the cause of an emotion. The subject is the speaker or somebody emotionally close to the speaker.",
      lesson: 25,
      examples: [
        { jp: "店員「今日、アルバイトをやめさせられました。」", en: "Employee: \"Today I was made to quit my part-time job.\"" },
        { jp: "弟「兄にへやのそうじをさせられました。」", en: "Younger brother: \"I was made to clean the room by my older brother.\"" },
        { jp: "けんにはよくびっくりさせられます。", en: "I'm often made to be surprised by Ken." },
        { jp: "子どもがおそくまで帰ってこなくて、しんぱいさせられました。", en: "My child didn't come home until late, and I was made to worry." },
      ],
    },
  ],
  N3: [
    {
      pattern: "〜なら",
      meaning: "if ~ / in the case of ~",
      usage: "Attach to the plain form of verbs/adjectives, or directly to nouns and na-adjectives, to give a conditional based on a topic or hypothesis already raised.",
      examples: [{ jp: "行くなら、一緒に行こう。", en: "If you're going, let's go together." }],
    },
    {
      pattern: "〜のに",
      meaning: "even though ~ / despite ~",
      usage: "Attach to the plain form of a clause to express contrast or surprise, often with a nuance of disappointment or dissatisfaction.",
      examples: [{ jp: "頑張ったのに、失敗した。", en: "Even though I tried hard, I failed." }],
    },
    {
      pattern: "〜ようになる",
      meaning: "to come to (do) ~ / to reach the point of ~",
      usage: "Attach to the plain (dictionary) form of a verb to describe a gradual change of state or ability over time.",
      examples: [{ jp: "漢字が読めるようになった。", en: "I've come to be able to read kanji." }],
    },
    {
      pattern: "〜はずだ",
      meaning: "should be ~ / it is expected that ~",
      usage: "Attach to the plain form to express a confident expectation based on reasoning or known facts, not a guess.",
      examples: [{ jp: "彼はもう着いているはずだ。", en: "He should have arrived already." }],
    },
  ],
  N2: [
    {
      pattern: "〜わけではない",
      meaning: "it's not that ~ / it doesn't mean that ~",
      usage: "Attach to the plain form to partially deny an assumption the listener might make, softening a generalization.",
      examples: [{ jp: "嫌いなわけではないが、あまり食べない。", en: "It's not that I dislike it, but I don't eat it much." }],
    },
    {
      pattern: "〜にもかかわらず",
      meaning: "despite ~ / in spite of ~",
      usage: "Attach to a noun or plain form clause to show a result that contrasts with what would normally be expected.",
      examples: [{ jp: "台風にもかかわらず、電車は動いていた。", en: "Despite the typhoon, the trains were running." }],
    },
    {
      pattern: "〜ものの",
      meaning: "although ~ / even though ~",
      usage: "Attach to the plain form to concede one fact before introducing a contrasting circumstance, similar to のに but more formal.",
      examples: [{ jp: "計画は立てたものの、実行できていない。", en: "Although I made a plan, I haven't been able to carry it out." }],
    },
    {
      pattern: "〜を通じて",
      meaning: "through ~ / via ~",
      usage: "Attach to a noun to indicate a means, channel, or period through which something happens.",
      examples: [{ jp: "友人を通じてその情報を知った。", en: "I learned that information through a friend." }],
    },
  ],
  N1: [
    {
      pattern: "〜ずにはいられない",
      meaning: "can't help but do ~",
      usage: "Attach to the negative stem of a verb to express an impulse too strong to resist, often emotional.",
      examples: [{ jp: "この曲を聞くと泣かずにはいられない。", en: "I can't help but cry when I hear this song." }],
    },
    {
      pattern: "〜までもない",
      meaning: "there's no need to even ~",
      usage: "Attach to the dictionary form of a verb to say an action is so obvious or minor that it isn't worth doing.",
      examples: [{ jp: "説明するまでもないと思う。", en: "I don't think there's even a need to explain." }],
    },
    {
      pattern: "〜ならでは",
      meaning: "uniquely possible because of ~ / only ~ could do this",
      usage: "Attach to a noun to praise something as distinctively possible only due to that person or thing.",
      examples: [{ jp: "これは彼ならではのアイデアだ。", en: "This is an idea only he could have come up with." }],
    },
    {
      pattern: "〜にひきかえ",
      meaning: "in contrast to ~ / unlike ~",
      usage: "Attach to a noun or clause to sharply contrast two situations, often implying one is favorable and the other isn't.",
      examples: [{ jp: "去年の成績にひきかえ、今年は好調だ。", en: "In contrast to last year's results, this year is going well." }],
    },
  ],
};
