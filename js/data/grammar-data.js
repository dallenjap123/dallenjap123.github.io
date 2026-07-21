// Grammar reference data, grouped by JLPT level.
// Add or edit entries here — each entry needs: pattern, meaning, usage,
// and an optional list of examples ({ jp, en }).

window.GRAMMAR_DATA = {
  N5: [
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

    // 26課 で・に
    {
      pattern: "で・に",
      meaning: "で: location of an action, means/cause; に: location of existence, target of movement/action",
      usage:
        "に marks a fixed point: where something exists (人がいます／本があります), the time something happens (7時に起きます), or the goal/direction of a movement or action (学校に行きます／友達に電話します／先生に聞きます). で marks the place where an action takes place (図書館で勉強します), the means or tool used to do something (バスで行きます／ペンで書きます), the material something is made from (木で作った机), or the cause/reason behind a state (病気で休みました). A useful test: if the sentence describes something 'happening at/using X,' use で; if it describes 'existing at X' or 'heading toward/receiving from X,' use に.",
      lesson: 26,
      examples: [
        { jp: "公園に子供たちがいます。", en: "There are children in the park." },
        { jp: "公園で子供たちが遊んでいます。", en: "Children are playing in the park." },
        { jp: "毎朝7時に起きます。", en: "I get up at 7 every morning." },
        { jp: "友達に手紙を書きました。", en: "I wrote a letter to my friend." },
        { jp: "電車で会社に行きます。", en: "I go to work by train." },
        { jp: "風邪で学校を休みました。", en: "I was absent from school because of a cold." },
      ],
    },

    // 27課 を・と
    {
      pattern: "を・と",
      meaning: "を: direct object / a place passed through or left; と: a quotation, 'together with', or a reciprocal partner",
      usage:
        "を most commonly marks the direct object of a transitive verb (パンを食べます). It's also used with certain intransitive motion verbs to mark the space or point being passed through or left (公園を散歩する、道を渡る、電車を降りる). と marks the content of a quotation or thought before verbs like 言う／思う／書く (「行きます」と言いました), and it also marks a companion for actions that inherently involve two people, i.e. reciprocal verbs such as 会う, 話す, 相談する, 結婚する (友達と話す、彼女と結婚する) — with these verbs, using に instead of と would be a mistake, since the action is mutual rather than one-directional.",
      lesson: 27,
      examples: [
        { jp: "毎朝、公園を散歩します。", en: "I take a walk through the park every morning." },
        { jp: "次の駅で電車を降ります。", en: "I'll get off the train at the next station." },
        { jp: "「明日は休みます」と部長に言いました。", en: "I told the manager, \"I'll be off tomorrow.\"" },
        { jp: "週末、友達と映画を見に行きます。", en: "I'm going to see a movie with a friend this weekend." },
        { jp: "田中さんと結婚することにしました。", en: "I decided to marry Tanaka." },
      ],
    },

    // 28課 も・しか
    {
      pattern: "も・しか",
      meaning: "も: also / even / as much as (emphasizes a large or surprising amount); しか〜ない: only ~ (emphasizes a small amount; requires a negative verb)",
      usage:
        "も after a number or quantity emphasizes that the amount is large or surprising (三時間も待ちました – I waited as long as three hours). しか always requires a negative verb at the end of the sentence, and stresses that the amount is small or insufficient (三時間しかありません – there are only three hours). Both can replace が／を／は after a noun, but neither ever appears together with を or が. A common mistake is forgetting the negative verb with しか, or reaching for しか when an emphatic large-quantity nuance (も) was actually intended.",
      lesson: 28,
      examples: [
        { jp: "このケーキ、一つ食べてもいいですか。", en: "May I eat one of these cakes, too?" },
        { jp: "宿題がまだ半分もできていません。", en: "I haven't even finished half of my homework yet." },
        { jp: "財布に千円しかありません。", en: "I only have 1000 yen in my wallet." },
        { jp: "この問題が分かる人はクラスに一人しかいません。", en: "There's only one person in the class who understands this problem." },
        { jp: "三日間しか休みがありませんでした。", en: "I only had three days off." },
      ],
    },

    // 29課 だけ・でも
    {
      pattern: "だけ・でも",
      meaning: "だけ: only, just (a plain, factual limitation); でも: even ~ / ~ or something (a soft suggestion or an extreme example)",
      usage:
        "だけ narrows something down to an exact, factual limit — 'nothing more than this' — and unlike しか it does NOT require a negative verb (三日だけ休みました – I only took three days off, stated as a neutral fact). でも has two common uses: attached to a noun to offer a mild example among other options, often to soften a suggestion (お茶でも飲みませんか – Would you like some tea or something?), and attached to an extreme example to mean 'even' (子供でもできます – Even a child can do this). Because だけ is neutral/factual while でも(example) is a soft, non-committal suggestion, swapping them can noticeably change the tone of a sentence.",
      lesson: 29,
      examples: [
        { jp: "会議には田中さんだけ来ませんでした。", en: "Only Tanaka didn't come to the meeting." },
        { jp: "少しだけ休ませてください。", en: "Please let me rest just a little." },
        { jp: "疲れたでしょう。コーヒーでも飲みませんか。", en: "You must be tired. Won't you have some coffee or something?" },
        { jp: "この漢字は簡単なので、子供でも読めます。", en: "This kanji is easy, so even a child can read it." },
        { jp: "分からないことがあったら、いつでも聞いてください。", en: "If there's something you don't understand, please ask anytime." },
      ],
    },

    // 30課 は・が
    {
      pattern: "は・が",
      meaning: "は: marks the topic of the sentence (what's being talked about); が: marks the grammatical subject (new/specific information, or with certain verbs/adjectives of state)",
      usage:
        "は introduces what the rest of the sentence is about, often something already known to speaker and listener, and is also used to set up a contrast (象は鼻が長いです – as for elephants, their trunks are long). が is used when introducing new information for the first time — especially in answer to a 'who/what' question — or when the subject itself is the focus of emphasis (だれが来ましたか。田中さんが来ました — 'Who came?' 'TANAKA came' — the answer must use が because 田中さん is the new, emphasized information). が is also required with certain adjectives and verbs of feeling, ability, and existence, such as 好き, ほしい, 分かる, できる, ある／いる (わたしはコーヒーが好きです). Word order can help decide: if the question asks 'what is X?', X gets は; if it asks 'what/who is doing the action?', the answer gets が.",
      lesson: 30,
      examples: [
        { jp: "わたしは学生です。", en: "As for me, I'm a student." },
        { jp: "だれが窓を割りましたか。ケンさんが割りました。", en: "\"Who broke the window?\" \"Ken did.\"" },
        { jp: "象は鼻が長いです。", en: "Elephants have long trunks." },
        { jp: "わたしは日本語が分かります。", en: "I understand Japanese." },
        { jp: "部屋に猫がいます。", en: "There's a cat in the room." },
        { jp: "今日は天気がいいですね。", en: "The weather's nice today, isn't it." },
      ],
    },

    // 31課 の・こと
    {
      pattern: "の・こと",
      meaning: "の / こと: turns a plain-form verb or clause into a noun phrase ('the act of ~ing' / 'the fact that ~')",
      usage:
        "Both の and こと can attach to a plain-form clause to make it function as a noun, but they aren't always interchangeable. の is preferred when the nominalized clause is the direct object of a perception verb — something seen or heard directly, like 見る, 聞く, 手伝う (子供が歌っているのを見ました – I watched the child singing). こと is preferred with verbs of speech, thought, and communication — 言う, 思う, 伝える, 説明する — and is required (の cannot be used) before ができる meaning ability, and when stating a fact or a general rule/piece of advice (毎日運動することは体にいいです reads naturally as a general rule). As a rough guideline: use の for something concretely observed with the senses in the moment; use こと for something abstract, reported secondhand, or a general ability/rule.",
      lesson: 31,
      examples: [
        { jp: "電車が来るのを待っています。", en: "I'm waiting for the train to come." },
        { jp: "子供が公園で遊んでいるのを見ました。", en: "I saw the children playing in the park." },
        { jp: "彼が引っ越したことを知りませんでした。", en: "I didn't know that he had moved." },
        { jp: "わたしの趣味は写真をとることです。", en: "My hobby is taking photos." },
        { jp: "漢字を読むことができますか。", en: "Can you read kanji?" },
        { jp: "毎日運動することは体にいいです。", en: "Exercising every day is good for your health." },
      ],
    },

    // 32課 て…・ないで…
    {
      pattern: "〜て…・〜ないで…",
      meaning: "〜て…: and then ~ / by ~ing (sequential action or accompanying manner); 〜ないで…: without ~ing / instead of ~ing",
      usage:
        "The て form links two actions that both happen — either one after another (朝起きて、顔を洗います – I get up, then wash my face), or simultaneously as the manner of the second action (電気をつけて勉強します – I study with the light on). 〜ないで attaches to a verb's nai-stem and means the second action happens in the ABSENCE of the first — either 'without doing A' (電気をつけないで勉強します – I study without turning on the light) or, with a pair of mutually exclusive actions, 'B instead of A' (朝ごはんを食べないで、学校に行きました – I went to school without eating breakfast / instead of eating breakfast). A common confusion is with 〜なくて, which gives a REASON for the second clause rather than describing how the second action was carried out — 〜ないで describes an accompanying manner or absence, while 〜なくて explains a cause.",
      lesson: 32,
      examples: [
        { jp: "朝、シャワーを浴びて、会社に行きます。", en: "In the morning, I take a shower and then go to work." },
        { jp: "傘をささないで、雨の中を歩きました。", en: "I walked in the rain without opening an umbrella." },
        { jp: "昨日は疲れていたので、晩ご飯を食べないで寝てしまいました。", en: "I was tired yesterday, so I went to sleep without eating dinner." },
        { jp: "砂糖を入れないで、コーヒーを飲みます。", en: "I drink my coffee without sugar." },
      ],
    },

    // 33課 他動詞・自動詞
    {
      pattern: "他動詞・自動詞",
      meaning: "他動詞 (transitive verbs) take a direct object marked by を and focus on an agent's deliberate action; 自動詞 (intransitive verbs) have no direct object (the thing affected is marked by が) and focus on the resulting state or a spontaneous occurrence",
      usage:
        "Many Japanese verbs come in transitive/intransitive pairs describing the same change of state from two different angles. The transitive pattern is [agent]は／が＋[object]を＋[transitive verb], and it focuses on who did the action to the object — 動作主の行為に注目する (わたしは火をけしました – I put out the fire). The intransitive pattern is [thing]が＋[intransitive verb], and it focuses only on the change happening to the thing itself, with no agent mentioned — 物の動きに注目する (火がきえました – the fire went out). Many common verb pairs follow this pattern: 電気をつける／電気がつく (turn on / come on), かぎをしめる／かぎがしまる (lock / be locked), ごみをおとす／ごみがおちる (drop / fall), いすをならべる／いすがならぶ (arrange / be arranged), 仕事を見つける／仕事が見つかる (find / be found), 話をつづける／話がつづく (continue / go on), ねだんを上げる／ねだんが上がる (raise / rise), ねだんを下げる／ねだんが下がる (lower / go down), えだをおる／えだがおれる (break / get broken), 家をこわす／家がこわれる (demolish / collapse), 子どもを起こす／子どもが起きる (wake someone / wake up), パンをやく／パンがやける (bake / get baked), 車を止める／車が止まる (stop a car / come to a stop), じゅぎょうを始める／じゅぎょうが始まる (start a class / begin), ねこを家に入れる／ねこが家に入る (let the cat in / the cat goes in), きっぷをなくす／きっぷがなくなる (lose a ticket / a ticket goes missing), 自転車をなおす／自転車がなおる (repair a bike / a bike gets fixed), 病気をなおす／病気がなおる (cure an illness / an illness gets cured), 名前をかえる／名前がかわる (change a name / a name changes), へやをあたたかくする／へやがあたたかくなる (make a room warm / a room becomes warm). Because the transitive verb always implies an agent's deliberate action while the intransitive verb describes a spontaneous or natural-seeming change, choosing the wrong one — 車のドアが開きました (the car door opened, by itself) vs わたしが車のドアを開けました (I opened the car door) — changes whether responsibility or intention is implied.",
      lesson: 33,
      examples: [
        { jp: "暑いので、まどを開けます。", en: "It's hot, so I'll open the window." },
        { jp: "車のドアが急に開きました。", en: "The car door suddenly opened." },
        { jp: "へやにいた虫を外に出しました。", en: "I put the bug that was in the room outside." },
        { jp: "学生は後ろのドアから出ます。", en: "Students go out through the back door." },
        { jp: "トムは古いおもちゃを集めています。", en: "Tom is collecting old toys." },
        { jp: "みんなが集まって、旅行のそうだんをします。", en: "Everyone gathers and discusses the trip." },
      ],
    },

    // 34課 ています・てあります
    {
      pattern: "〜ています・〜てあります",
      meaning: "自動詞＋ている: the resulting state of something, with no focus on who caused it; 他動詞＋てある: the resulting state of something someone deliberately did or prepared, with a purpose in mind",
      usage:
        "〜ている after an intransitive verb describes a state that resulted from a change, without mentioning or caring about an agent — まどが開いています simply reports 'the window is open' as an observed fact. 〜てある after a transitive verb describes a state that was created ON PURPOSE by somebody, for some purpose, and the affected thing is still marked with が (or sometimes は) rather than を — まどが開けてあります means 'the window has been opened [and left that way deliberately, e.g. for ventilation]', implying someone's intentional action and the resulting purposeful state. Because 〜てある always implies deliberate preparation, it's frequently used to describe things set up in advance, like table settings, decorations, or prepared documents (資料はもう準備してあります – The materials have already been prepared).",
      lesson: 34,
      examples: [
        { jp: "まどが開いています。", en: "The window is open." },
        { jp: "暑いので、まどが開けてあります。", en: "It's hot, so the window has been left open on purpose." },
        { jp: "かべにきれいな絵がかかっています。", en: "There's a beautiful picture hanging on the wall." },
        { jp: "パーティーのために、かべに絵がかけてあります。", en: "A picture has been hung on the wall for the party." },
        { jp: "電気が消えています。", en: "The light is off." },
        { jp: "会議室にお茶が用意してあります。", en: "Tea has been prepared in the meeting room." },
      ],
    },

    // 35課 てきます・ていきます
    {
      pattern: "〜てきます・〜ていきます",
      meaning: "〜てきます: an action/change moves toward the present moment or the speaker's location/viewpoint; 〜ていきます: an action/change moves away from the present moment or the speaker's location/viewpoint, into the future",
      usage:
        "Attached to a motion verb, 行ってきます／帰ってきます describe going somewhere and RETURNING to the speaker's base (行ってきます – I'll go, and come back), while 出ていきます describes leaving and moving away, without returning to that reference point. Attached to a verb describing gradual change, 〜てきます frames the change as having been approaching or building up to NOW, from the past up to the present (だんだん寒くなってきました – it's been gradually getting cold, and now it is), while 〜ていきます frames the change as continuing onward FROM now into the future (これから寒くなっていくでしょう – from now on, it will likely keep getting colder). A simple way to remember it: 来る＝come (toward here/now), 行く＝go (away from here/now) — てくる pulls the action toward the present/here, ていく pushes it away toward there/later.",
      lesson: 35,
      examples: [
        { jp: "ちょっとコンビニに行ってきます。", en: "I'm just going to the convenience store, and I'll be back." },
        { jp: "雨がだんだん強くなってきました。", en: "The rain has been gradually getting stronger." },
        { jp: "これから日本語をもっと勉強していきたいです。", en: "From now on, I want to keep studying Japanese more." },
        { jp: "子どもたちは元気に育っていくでしょう。", en: "The children will likely keep growing up healthy." },
        { jp: "財布を忘れたので、家に取りに帰ってきます。", en: "I forgot my wallet, so I'll go home to get it and come back." },
        { jp: "空が明るくなってきました。", en: "The sky has been getting brighter." },
      ],
    },

    // 36課 こ・そ・あ
    {
      pattern: "こ・そ・あ",
      meaning: "こ〜: near the speaker; そ〜: near the listener, or something already mentioned; あ〜: far from both speaker and listener, or something both already know about",
      usage:
        "The こ／そ／あ／ど series builds a full set of demonstrative words depending on the part of speech needed: これ／それ／あれ／どれ (this/that/that over there/which one — a noun, standing alone), この／その／あの／どの (this/that/that/which — modifying a noun directly, この本), ここ／そこ／あそこ／どこ (here/there/over there/where — places), こちら／そちら／あちら／どちら (this way/that way/that way/which way — a politer form for direction, place, or person), こう／そう／ああ／どう (like this/like that/like that/how — manner). こ〜 is used for something physically near the speaker, そ〜 for something near the listener OR something the listener just mentioned in conversation, and あ〜 for something far from both speakers, or — importantly — something BOTH speakers already know about or remember, even if it isn't physically present (あの映画、おもしろかったね – that movie [we both saw] was interesting, wasn't it). そ〜 is also the default choice for referring back to something the other person just said that you don't have direct knowledge of yourself.",
      lesson: 36,
      examples: [
        { jp: "これはわたしのかさです。", en: "This is my umbrella." },
        { jp: "そのシャツ、どこで買いましたか。", en: "Where did you buy that shirt you're wearing?" },
        { jp: "あそこに大きい木がありますね。", en: "There's a big tree over there, isn't there." },
        { jp: "A「新しいレストランができたんですよ。」B「そうですか。今度行ってみましょう。」", en: "A: \"A new restaurant opened.\" B: \"Is that so? Let's try going sometime.\"" },
        { jp: "あの映画、二人で見に行ったの覚えてる？", en: "Do you remember that movie we went to see together?" },
        { jp: "どちらのバッグにしますか。", en: "Which bag will you choose?" },
      ],
    },

    // 37課 接続の言葉
    {
      pattern: "ですから・だから",
      meaning: "so, therefore (draws a conclusion, judgment, or call to action from what was just said)",
      usage:
        "Introduces a conclusion — a fact, judgment, or piece of advice/inducement — that follows logically from the preceding statement. ですから is the more polite/formal form; だから is casual.",
      lesson: 37,
      examples: [
        { jp: "これは一つ100円です。ですから、三つで300円です。", en: "This is 100 yen each. So three of them is 300 yen." },
        { jp: "もう夜8時だ。だから、教室にはだれもいないと思う。", en: "It's already 8pm. So I think no one's in the classroom." },
        { jp: "ここは人がよく通るんだ。だから、ここに物をおかないで。", en: "People often pass through here. So don't leave things here." },
      ],
    },
    {
      pattern: "それで",
      meaning: "so, because of that (draws a conclusion specifically from a factual statement)",
      usage:
        "Similar to ですから／だから, but それで specifically connects a factual circumstance to its natural consequence, rather than a judgment or command — it isn't used to introduce a request or invitation.",
      lesson: 37,
      examples: [
        { jp: "小さい字が見えなくなりました。それで、新しいめがねを買いました。", en: "I could no longer see small print. So I bought new glasses." },
        { jp: "会社が遠い。それで、毎朝早く家を出る。", en: "The office is far. So I leave home early every morning." },
      ],
    },
    {
      pattern: "けれど(も)",
      meaning: "but, although (introduces something that contrasts with or opposes the preceding statement)",
      usage:
        "Used when the following statement contrasts with, or stands in opposition to, the preceding one — similar to でも／しかし, but commonly used to link within or between sentences in conversation. けれども is slightly more formal than けれど.",
      lesson: 37,
      examples: [
        { jp: "とてもがんばりました。けれども、いいてんはとれませんでした。", en: "I tried very hard. But I couldn't get a good grade." },
        { jp: "このカメラはいい。けれど、少し重い。", en: "This camera is good. But it's a little heavy." },
      ],
    },
    {
      pattern: "それに",
      meaning: "moreover, on top of that (adds another point that reinforces what was just said)",
      usage:
        "Expands on or adds to the content of the preceding statement — used when the added information supports or reinforces the same point, unlike けれど, which contrasts.",
      lesson: 37,
      examples: [
        { jp: "バナナはおいしいです。それに、安いです。", en: "Bananas are tasty. What's more, they're cheap." },
        { jp: "雨がふっているし、それに、風もある。", en: "It's raining, and on top of that, it's windy too." },
      ],
    },
    {
      pattern: "たとえば",
      meaning: "for example (introduces a specific example of something just mentioned)",
      usage: "Introduces a concrete example that illustrates the word or statement just made.",
      lesson: 37,
      examples: [
        { jp: "日本のスポーツ、たとえば、じゅうどうをやってみたいです。", en: "I'd like to try a Japanese sport — judo, for example." },
        { jp: "山田さんはいつもおそく帰る。たとえば、きのうは11時に帰った。", en: "Yamada always comes home late. For example, yesterday he came home at 11." },
      ],
    },
    {
      pattern: "(それ)では・じゃ",
      meaning: "well then, in that case (reacts to the preceding statement by moving things forward)",
      usage:
        "Introduces a reaction to what was just said — the English equivalent is roughly 'in that case' or 'well then' — and the reaction can be an inference, a call to action, or an intention on the part of the speaker. じゃ is the casual, spoken-language contraction of それでは.",
      lesson: 37,
      examples: [
        { jp: "トム「ぼくは兄がいます。」先生「じゃ、二人兄弟ですね。」", en: "Tom: \"I have an older brother.\" Teacher: \"Well then, there are two of you siblings.\"" },
        { jp: "じゅんびはできましたか。それでは、始めましょう。", en: "Are you ready? Well then, let's begin." },
        { jp: "えっ？サラはパーティーに来ない？じゃ、ぼくもやめようかな。", en: "Huh? Sara's not coming to the party? Well then, maybe I'll skip it too." },
      ],
    },

    // 38課 副詞
    {
      pattern: "まだ・もう",
      meaning: "まだ: still / not yet; もう: already",
      usage:
        "もう indicates that a state has been reached or a process has been completed. まだ indicates that a state has not yet been reached, or a process is not yet complete. もう is also used with '1 + counter suffix' or もう少し to mean 'a little more,' adding a further amount on top of what's already there.",
      lesson: 38,
      examples: [
        { jp: "トム「昼ご飯はもう食べた？」サラ「ううん、まだ食べていない。」", en: "Tom: \"Have you already eaten lunch?\" Sara: \"No, not yet.\"" },
        { jp: "トム「銀行はまだ開いていますか。」山田「4時だから、もうしまっていますよ。」", en: "Tom: \"Is the bank still open?\" Yamada: \"It's 4 o'clock, so it's already closed.\"" },
        { jp: "これ、おいしい。もう一つ食べてもいい？", en: "This is delicious. Can I have one more?" },
        { jp: "スープにもう少ししおを入れてください。", en: "Please add a little more salt to the soup." },
      ],
    },
    {
      pattern: "なかなか・やっと・とうとう",
      meaning: "なかなか〜ない: not easily, not readily; やっと: finally, at last (after difficulty); とうとう: finally, in the end (after a long time)",
      usage:
        "なかなか, paired with a negative verb, suggests that something is or was difficult to realize or achieve. やっと〜た suggests that something was completed only after a long time and with difficulty, equivalent to 'at last' in English. とうとう〜た／なかった, equivalent to 'in the end' in English, indicates that something finally happened, or finally failed to happen, after a long wait.",
      lesson: 38,
      examples: [
        { jp: "バスがなかなか来ません。", en: "The bus just won't come." },
        { jp: "やっと仕事が終わりました。", en: "I finally finished the work, after a struggle." },
        { jp: "テレビがとうとうこわれてしまった。", en: "The TV finally broke down, after a long time." },
      ],
    },
    {
      pattern: "かならず・きっと・ぜひ",
      meaning: "かならず: without exception, definitely; きっと: surely, probably; ぜひ: by all means, please (a strong wish or request)",
      usage:
        "かならず expresses that something is without exception — a strong determination, or something asked of the listener with strong conviction. きっと has slightly less conviction than かならず, and expresses the speaker's own intention or a fairly strong prediction/inducement toward the listener. ぜひ expresses a strong wish or hope, most often used when inviting someone or requesting something enthusiastically.",
      lesson: 38,
      examples: [
        { jp: "わたしはご飯の後で、かならずはをみがいている。", en: "I always brush my teeth without fail after meals." },
        { jp: "あしたの試合はかならずかつぞ！", en: "We will definitely win tomorrow's match!" },
        { jp: "今度のテストではきっといいてんがとれるでしょう。", en: "You'll surely get a good grade on the next test." },
        { jp: "トム「ぜひわたしの国へあそびに来てください。」山田「ええ、ぜひ行きたいです。」", en: "Tom: \"Please, by all means, come visit my country.\" Yamada: \"Yes, I'd love to go.\"" },
      ],
    },

    // 39課 すぎます・にくいです・やすいです
    {
      pattern: "〜すぎます・〜にくいです・〜やすいです",
      meaning: "〜すぎる: too much ~ (excessive); 〜にくい: hard to ~; 〜やすい: easy to ~",
      usage:
        "All three attach to a verb's ます-stem and describe qualities of an action. 〜すぎる means the action or state goes beyond an appropriate or comfortable degree — 食べすぎる (to eat too much), 高すぎる (too expensive) — and conjugates as a regular る-verb (食べすぎました). 〜にくい means the action is physically or practically hard/awkward to perform — 読みにくい字 (handwriting that's hard to read) — and conjugates as an i-adjective. 〜やすい is the opposite, meaning the action is easy or comfortable to perform — 分かりやすい説明 (an explanation that's easy to understand) — and also conjugates as an i-adjective. These describe an inherent property of the thing/action, distinct from できる (ability) — a book can be 読みやすい (easy to read) regardless of whether a particular person is currently able to read it.",
      lesson: 39,
      examples: [
        { jp: "昨日の夜、食べすぎて、おなかが痛いです。", en: "I ate too much last night, and my stomach hurts." },
        { jp: "この漢字は画数が多くて、覚えにくいです。", en: "This kanji has a lot of strokes, so it's hard to remember." },
        { jp: "この靴は軽くて、歩きやすいです。", en: "These shoes are light and easy to walk in." },
        { jp: "話しすぎて、のどが痛くなりました。", en: "I talked too much, and my throat started to hurt." },
        { jp: "先生の説明はいつも分かりやすいです。", en: "The teacher's explanations are always easy to understand." },
        { jp: "この道は暗くて、夜は歩きにくいです。", en: "This road is dark, so it's hard to walk at night." },
      ],
    },

    // 40課 品詞
    {
      pattern: "名詞⇔動詞",
      meaning: "verbs can be treated as nouns in a limited range of cases, dropping the conjugated ending and taking particles like の instead",
      usage:
        "Verbs (動詞) are sometimes used as nouns (名詞), but only in a habitually limited set of cases — 習慣的に限られた動詞だけ. For example, 山にのぼります (to climb a mountain) can become 山のぼり (mountain-climbing) as a noun, dropping the conjugated ending and taking の instead of に. Suru-verbs like 料理する／そうじする are already nouns at their core (料理, そうじ) — 料理 itself is a noun, and する simply verb-ifies it.",
      lesson: 40,
      examples: [
        { jp: "料理は好きですが、そうじは好きではありません。", en: "I like cooking, but I don't like cleaning. (⇔料理します、そうじします)" },
        { jp: "帰りのきっぷはもう買いました。", en: "I've already bought the return ticket. (⇔帰ります)" },
        { jp: "山のぼりは楽しいですよ。", en: "Mountain climbing is fun. (⇔山にのぼります)" },
      ],
    },
    {
      pattern: "名詞⇔形容詞",
      meaning: "adding さ to an i-adjective or na-adjective stem turns it into a noun expressing the degree of that quality",
      usage:
        "Adding さ to an い-adjective (dropping the final い) turns it into a noun representing the measurable degree of that quality — 高い→高さ (height/tallness), with the exception いい→よさ. Adding さ to a な-adjective stem works the same way — べんりな→べんりさ (convenience).",
      lesson: 40,
      examples: [
        { jp: "東京スカイツリーの高さは634メートルです。", en: "The height of the Tokyo Skytree is 634 meters. (⇔高い)" },
        { jp: "場所のべんりさを考えて、ホテルをえらびます。", en: "I'll choose the hotel considering the convenience of the location. (⇔べんりな)" },
      ],
    },
    {
      pattern: "副詞⇔形容詞",
      meaning: "adding く to an i-adjective stem, or に to a na-adjective, turns it into an adverb",
      usage:
        "Adding く to an い-adjective (dropping the final い) turns it into an adverb describing how a verb is done — 楽しい→楽しく (in a fun/enjoyable way), with the exception いい→よく. Adding に to a な-adjective does the same job — きれいな→きれいに (in a neat/tidy way).",
      lesson: 40,
      examples: [
        { jp: "みんなで楽しく話しましょう。", en: "Let's all chat happily together. (⇔楽しい)" },
        { jp: "手をきれいにあらってください。", en: "Please wash your hands thoroughly. (⇔きれいな)" },
      ],
    },
    {
      pattern: "名詞⇔文",
      meaning: "adding の or こと to a plain-form statement turns the whole clause into a noun phrase",
      usage:
        "A plain-form statement (普通形) followed by の or こと becomes a noun phrase that can be used as the subject or object of a larger sentence — see 31課（の・こと）for when each of the two is preferred.",
      lesson: 40,
      examples: [
        { jp: "友だちと話すの/ことは楽しいです。", en: "Talking with friends is fun. (⇔友だちと話す)" },
        { jp: "トムさんと会うやくそくをしたの/ことをわすれていました。", en: "I had forgotten that I'd made a promise to meet Tom. (⇔会うやくそくをした)" },
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
