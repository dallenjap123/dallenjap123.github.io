// Practice questions for Grammar tab (fill-in-the-blank + multiple choice),
// keyed by the exact pattern string used in grammar-data.js. This is a
// first pass (~6 questions per pattern) covering all 25 lessons — every
// pattern has at least some practice content. Deepen any pattern by adding
// more entries to its array; no other file needs to change.
window.GRAMMAR_PRACTICE = {
  "〜より…／〜ほど…ません": [
    { type: "fill", jp: "このコーヒーはあのコーヒー＿＿にがいです。", en: "This coffee is more bitter than that coffee.", answer: "より" },
    { type: "fill", jp: "この問題は思った＿＿むずかしくなかったです。", en: "This problem wasn't as hard as I thought.", answer: "ほど" },
    { type: "choice", jp: "今日は昨日＿＿寒いです。", en: "Today is colder than yesterday.", options: ["ほど", "より", "ぐらい", "など"], correct: 1 },
    { type: "choice", jp: "新しいパソコンは古いの＿＿速いです。", en: "The new computer is faster than the old one.", options: ["より", "ほど", "でも", "には"], correct: 0 },
    { type: "fill", jp: "兄は弟＿＿頭がいいです。", en: "The older brother is smarter than the younger one.", answer: "より" },
    { type: "choice", jp: "あの映画は聞いていた＿＿おもしろくなかったです。", en: "That movie wasn't as interesting as I'd heard.", options: ["ほど", "より", "ぐらい", "まで"], correct: 0 },
  ],
  "〜より〜のほう": [
    { type: "fill", jp: "電車よりバス＿＿＿が便利です。", en: "The bus is more convenient than the train.", answer: "のほう" },
    { type: "choice", jp: "山より海＿＿好きです。", en: "I like the sea more than the mountains.", options: ["のほう", "より", "ほど", "など"], correct: 0 },
    { type: "fill", jp: "妹よりわたし＿＿＿が料理が上手です。", en: "I'm better at cooking than my younger sister.", answer: "のほう" },
    { type: "choice", jp: "犬より猫＿＿飼いやすいと思います。", en: "I think cats are easier to keep than dogs.", options: ["のほうが", "のほど", "のより", "のなら"], correct: 0 },
    { type: "fill", jp: "冬より夏＿＿＿が好きです。", en: "I like summer more than winter.", answer: "のほう" },
    { type: "choice", jp: "新しい本より古い本＿＿好きだ。", en: "I like old books more than new ones.", options: ["のほうが", "がほど", "よりが", "とほう"], correct: 0 },
  ],
  "〜と〜とどちら": [
    { type: "fill", jp: "すしとてんぷら＿＿好きですか。", en: "Which do you like, sushi or tempura?", answer: "どちら" },
    { type: "choice", jp: "京都と大阪＿＿近いですか。", en: "Which is closer, Kyoto or Osaka?", options: ["どちら", "どれ", "どの", "どこ"], correct: 0 },
    { type: "fill", jp: "兄と弟＿＿背が高いですか。", en: "Which is taller, the older or younger brother?", answer: "どちら" },
    { type: "choice", jp: "バスと電車と＿＿が安いですか。", en: "Which is cheaper, the bus or the train?", options: ["どちら", "どこ", "どれ", "いつ"], correct: 0 },
    { type: "fill", jp: "赤いのと青いのと＿＿がいいですか。", en: "Which is better, the red one or the blue one?", answer: "どちら" },
    { type: "choice", jp: "肉と魚とどちらが＿＿ですか。", en: "Which do you like more, meat or fish?", options: ["好き", "好きな", "好きだ", "好んで"], correct: 0 },
  ],
  "〜ながら…": [
    { type: "fill", jp: "テレビを見＿＿ご飯を食べます。", en: "I eat while watching TV.", answer: "ながら" },
    { type: "choice", jp: "音楽を聞き＿＿べんきょうします。", en: "I study while listening to music.", options: ["ながら", "ないで", "てから", "ても"], correct: 0 },
    { type: "fill", jp: "歩き＿＿電話で話すのはあぶないです。", en: "Talking on the phone while walking is dangerous.", answer: "ながら" },
    { type: "choice", jp: "コーヒーを飲み＿＿新聞を読みます。", en: "I read the newspaper while drinking coffee.", options: ["ながら", "たり", "てから", "のに"], correct: 0 },
    { type: "fill", jp: "母は歌い＿＿料理を作ります。", en: "My mother cooks while singing.", answer: "ながら" },
    { type: "choice", jp: "子どもは泣き＿＿走ってきました。", en: "The child came running while crying.", options: ["ながら", "ても", "ずに", "のに"], correct: 0 },
  ],
  "〜ところです": [
    { type: "fill", jp: "今、ちょうど家を出る＿＿＿です。", en: "I'm just about to leave the house right now.", answer: "ところ" },
    { type: "choice", jp: "今、レポートを書いている＿＿です。", en: "I'm in the middle of writing the report right now.", options: ["ところ", "とき", "あいだ", "まえ"], correct: 0 },
    { type: "fill", jp: "たった今、駅に着いた＿＿＿です。", en: "I just arrived at the station right now.", answer: "ところ" },
    { type: "choice", jp: "これから晩ご飯を食べる＿＿です。", en: "I'm just about to eat dinner now.", options: ["ところ", "ばかり", "まま", "うち"], correct: 0 },
    { type: "fill", jp: "会議はもうすぐ始まる＿＿＿です。", en: "The meeting is just about to start.", answer: "ところ" },
    { type: "choice", jp: "授業が終わった＿＿です。", en: "Class has just ended.", options: ["ところ", "ため", "のに", "まで"], correct: 0 },
  ],
  "〜まで…・〜までに…": [
    { type: "fill", jp: "夜の10時＿＿＿仕事をしました。", en: "I worked until 10 pm.", answer: "まで" },
    { type: "fill", jp: "明日＿＿＿レポートを出してください。", en: "Please submit the report by tomorrow.", answer: "までに" },
    { type: "choice", jp: "雨がやむ＿＿ここで待ちましょう。", en: "Let's wait here until the rain stops.", options: ["まで", "までに", "あいだ", "うちに"], correct: 0 },
    { type: "choice", jp: "来週＿＿この本を返してください。", en: "Please return this book by next week.", options: ["まで", "までに", "ころ", "ながら"], correct: 1 },
    { type: "fill", jp: "駅に着く＿＿＿電話してください。", en: "Please call before you arrive at the station.", answer: "までに" },
    { type: "choice", jp: "夏休みが終わる＿＿国に帰りません。", en: "I won't go back to my country until summer break ends.", options: ["まで", "までに", "ころ", "さい"], correct: 0 },
  ],
  "〜ませんか": [
    { type: "fill", jp: "明日、うちに来＿＿＿か。", en: "Won't you come to my place tomorrow?", answer: "ません" },
    { type: "fill", jp: "いっしょにお茶を飲み＿＿＿か。", en: "Won't you have tea together?", answer: "ませんか" },
    { type: "choice", jp: "今度いっしょに映画を見に＿＿。", en: "Won't you go watch a movie together sometime?", options: ["行きませんか", "行きます", "行きました", "行っています"], correct: 0 },
    { type: "fill", jp: "この本、読んでみ＿＿＿か。", en: "Won't you try reading this book?", answer: "ませんか" },
    { type: "choice", jp: "週末、山に登り＿＿。", en: "Won't you climb the mountain this weekend?", options: ["ませんか", "ますか", "でしょうか", "ましたか"], correct: 0 },
    { type: "fill", jp: "あとで手伝ってくれ＿＿＿か。", en: "Won't you help me later?", answer: "ませんか" },
  ],
  "〜ましょう(か)": [
    { type: "fill", jp: "もう遅いから、帰り＿＿＿。", en: "It's already late, so let's go home.", answer: "ましょう" },
    { type: "fill", jp: "荷物、持ち＿＿＿か。", en: "Shall I carry your luggage?", answer: "ましょう" },
    { type: "choice", jp: "窓を開け＿＿か。", en: "Shall I open the window?", options: ["ましょう", "ませんか", "ました", "ません"], correct: 0 },
    { type: "fill", jp: "いっしょに歌い＿＿＿。", en: "Let's sing together.", answer: "ましょう" },
    { type: "choice", jp: "そろそろ始め＿＿か。", en: "Shall we start soon?", options: ["ましょう", "ますか", "ました", "ませんでした"], correct: 0 },
    { type: "fill", jp: "少し休み＿＿＿か。", en: "Shall we rest a bit?", answer: "ましょう" },
  ],
  "〜(られ)ます": [
    { type: "fill", jp: "田中さんはギターが＿＿＿。（弾く）", en: "Tanaka can play the guitar.", answer: "弾けます" },
    { type: "fill", jp: "この漢字は難しくて＿＿＿。（読む・否定）", en: "This kanji is difficult, and I can't read it.", answer: "読めません" },
    { type: "choice", jp: "子どもですから、まだ一人で服が＿＿＿。", en: "Since he's a child, he still can't get dressed alone.", options: ["着られません", "着ません", "着せません", "着させません"], correct: 0 },
    { type: "fill", jp: "富士山の上から海が＿＿＿。（見る）", en: "You can see the sea from the top of Mt. Fuji.", answer: "見られます" },
    { type: "choice", jp: "わたしは辛い食べ物にとても弱いので＿＿＿。", en: "I'm very weak with spicy food, so I can't eat it.", options: ["食べられません", "食べません", "食べさせません", "食べられます"], correct: 0 },
    { type: "fill", jp: "彼女は英語とフランス語が＿＿＿。（話す）", en: "She can speak English and French.", answer: "話せます" },
  ],
  "〜ができます・〜ことができます": [
    { type: "fill", jp: "このジムは24時間利用する＿＿＿できます。", en: "You can use this gym 24 hours a day.", answer: "ことが" },
    { type: "choice", jp: "この図書館では本を10冊まで借りる＿＿できます。", en: "At this library you can borrow up to 10 books.", options: ["ことが", "ものが", "ことに", "ことを"], correct: 0 },
    { type: "fill", jp: "彼はピアノ＿＿できます。", en: "He can play the piano.", answer: "が" },
    { type: "choice", jp: "この道具を使えば、簡単に木を切る＿＿できます。", en: "If you use this tool, you can cut wood easily.", options: ["ことが", "ものを", "ことは", "ことで"], correct: 0 },
    { type: "fill", jp: "ここでは無料でWi-Fiを使う＿＿＿できます。", en: "You can use Wi-Fi for free here.", answer: "ことが" },
  ],
  "見えます・聞こえます": [
    { type: "fill", jp: "ここから東京タワーが＿＿＿。（見る）", en: "You can see Tokyo Tower from here.", answer: "見えます" },
    { type: "fill", jp: "となりの部屋から音楽が＿＿＿。（聞く）", en: "Music can be heard from the next room.", answer: "聞こえます" },
    { type: "choice", jp: "めがねをかけないと、黒板の字がよく＿＿＿。", en: "If I don't wear glasses, I can't see the blackboard writing well.", options: ["見えません", "見ません", "見られません", "見せません"], correct: 0 },
    { type: "fill", jp: "遠くから電車の音が＿＿＿。（聞く）", en: "The sound of a train can be heard from far away.", answer: "聞こえます" },
    { type: "choice", jp: "この部屋の窓からは山が＿＿＿。", en: "You can see mountains from this room's window.", options: ["見えます", "見ます", "見られます", "見せます"], correct: 0 },
  ],
  "〜たことがあります": [
    { type: "fill", jp: "北海道へ一度＿＿＿ことがあります。（行く）", en: "I've been to Hokkaido once.", answer: "行った" },
    { type: "choice", jp: "納豆を＿＿ことがありますか。", en: "Have you ever eaten natto?", options: ["食べた", "食べる", "食べて", "食べない"], correct: 0 },
    { type: "fill", jp: "わたしは富士山に登った＿＿＿がありません。", en: "I've never climbed Mt. Fuji.", answer: "こと" },
    { type: "choice", jp: "外国で道に＿＿ことが何度もあります。", en: "I've gotten lost abroad many times.", options: ["迷った", "迷う", "迷って", "迷わない"], correct: 0 },
    { type: "fill", jp: "彼女とは前に一度会った＿＿＿があります。", en: "I've met her once before.", answer: "こと" },
  ],
  "〜ことがあります": [
    { type: "fill", jp: "休みの日は一日中寝ている＿＿＿があります。", en: "On days off I sometimes sleep all day.", answer: "こと" },
    { type: "choice", jp: "たまに漢字を忘れる＿＿あります。", en: "I sometimes forget kanji.", options: ["ことが", "ものが", "ことは", "ことを"], correct: 0 },
    { type: "fill", jp: "疲れているとき、朝ご飯を食べない＿＿＿もあります。", en: "When I'm tired, I sometimes don't eat breakfast.", answer: "こと" },
    { type: "choice", jp: "彼はときどき約束を忘れる＿＿があります。", en: "He sometimes forgets promises.", options: ["ことが", "のこと", "ものが", "ことを"], correct: 0 },
    { type: "fill", jp: "この道はときどき込む＿＿＿がありますから、注意してください。", en: "This road sometimes gets crowded, so please be careful.", answer: "こと" },
  ],
  "〜てもいいです／〜てはいけません": [
    { type: "fill", jp: "ここで写真をとって＿＿＿ですか。", en: "May I take photos here?", answer: "もいい" },
    { type: "choice", jp: "図書館の中で大きい声で話して＿＿。", en: "You mustn't talk loudly in the library.", options: ["はいけません", "もいいです", "はいいです", "もいけません"], correct: 0 },
    { type: "fill", jp: "疲れたら、少し休んで＿＿＿ですよ。", en: "If you're tired, it's fine to rest a little.", answer: "もいい" },
    { type: "choice", jp: "この川で泳いで＿＿。あぶないですから。", en: "You mustn't swim in this river. It's dangerous.", options: ["はいけません", "もいいです", "はいいです", "もかまいません"], correct: 0 },
    { type: "fill", jp: "ここに車を止めて＿＿＿か。", en: "Is it okay to park my car here?", answer: "もいいです" },
  ],
  "〜なくてもいいです／〜なければなりません": [
    { type: "fill", jp: "今日は仕事に行か＿＿＿です。（休みだから）", en: "I don't have to go to work today.", answer: "なくてもいい" },
    { type: "choice", jp: "パスポートを持って行か＿＿。", en: "You must bring your passport.", options: ["なければなりません", "なくてもいいです", "てもいいです", "てはいけません"], correct: 0 },
    { type: "fill", jp: "急がなくても＿＿＿です。時間はまだあります。", en: "You don't have to hurry. There's still time.", answer: "いい" },
    { type: "choice", jp: "薬は食後に飲ま＿＿。", en: "You must take the medicine after meals.", options: ["なければなりません", "なくてもいいです", "てもいいです", "ないでください"], correct: 0 },
    { type: "fill", jp: "この書類は今日中に出さ＿＿＿。", en: "This document must be submitted by the end of today.", answer: "なければなりません" },
  ],
  "〜がほしいです・〜たいです": [
    { type: "fill", jp: "新しいくつ＿＿ほしいです。", en: "I want new shoes.", answer: "が" },
    { type: "fill", jp: "いつか海外で働き＿＿＿です。", en: "I want to work abroad someday.", answer: "たい" },
    { type: "choice", jp: "弟はずっと自分の部屋を＿＿。", en: "My younger brother has always wanted his own room.", options: ["ほしがっています", "ほしいです", "ほしがります", "ほしくないです"], correct: 0 },
    { type: "fill", jp: "疲れたので、少し休み＿＿＿です。", en: "I'm tired, so I want to rest a bit.", answer: "たい" },
    { type: "choice", jp: "子どもはあの犬のおもちゃを＿＿＿。", en: "The child wants that dog toy.", options: ["ほしがっています", "ほしいです", "ほしくありません", "ほしそうに"], correct: 0 },
    { type: "fill", jp: "今は何も食べ＿＿＿ないです。", en: "Right now I don't want to eat anything.", answer: "たく" },
  ],
  "〜といいです": [
    { type: "fill", jp: "あしたの試験がうまくいく＿＿＿ですね。", en: "I hope tomorrow's exam goes well.", answer: "といい" },
    { type: "choice", jp: "早く元気になる＿＿ですね。", en: "I hope you get well soon.", options: ["といい", "たら", "ので", "から"], correct: 0 },
    { type: "fill", jp: "旅行のあいだ、天気がいい＿＿＿けど。", en: "I hope the weather's good during the trip.", answer: "といい" },
    { type: "choice", jp: "新しい仕事が楽しい＿＿なあ。", en: "I hope the new job is fun.", options: ["といい", "ために", "のに", "ては"], correct: 0 },
  ],
  "〜そうです（様態）": [
    { type: "fill", jp: "この本はおもしろ＿＿＿です。", en: "This book looks interesting.", answer: "そう" },
    { type: "choice", jp: "空が暗いですね。雨が＿＿。", en: "The sky is dark. It looks like it's going to rain.", options: ["ふりそうです", "ふるそうです", "ふったそうです", "ふりそうもないです"], correct: 0 },
    { type: "fill", jp: "この荷物は重＿＿＿ですね。", en: "This luggage looks heavy.", answer: "そう" },
    { type: "choice", jp: "彼はうれし＿＿に笑っていました。", en: "He was laughing, looking happy.", options: ["そう", "らしい", "みたい", "よう"], correct: 0 },
    { type: "fill", jp: "今にもコップが＿＿＿そうです。（おちる）", en: "The cup looks like it's about to fall right now.", answer: "おち" },
  ],
  "〜がっています・〜がります": [
    { type: "fill", jp: "妹は新しいゲームをほし＿＿＿います。", en: "My younger sister shows signs of wanting a new game.", answer: "がって" },
    { type: "choice", jp: "弟は注射をこわ＿＿。", en: "My younger brother is scared of injections.", options: ["がります", "そうです", "みたいです", "らしいです"], correct: 0 },
    { type: "fill", jp: "子どもたちはそのニュースを面白＿＿＿いました。", en: "The children found that news interesting.", answer: "がって" },
    { type: "choice", jp: "彼女はさびし＿＿ようすでした。", en: "She had a lonely-looking demeanor.", options: ["がる", "そうな", "らしい", "みたいな"], correct: 1 },
  ],
  "〜まま…": [
    { type: "fill", jp: "くつをはいた＿＿＿部屋に入らないでください。", en: "Please don't enter the room with your shoes still on.", answer: "まま" },
    { type: "choice", jp: "電気をつけた＿＿寝てしまいました。", en: "I fell asleep leaving the light on.", options: ["まま", "うちに", "あいだ", "ながら"], correct: 0 },
    { type: "fill", jp: "この店は昔の＿＿＿の姿を残しています。", en: "This shop retains its appearance from the old days.", answer: "まま" },
    { type: "choice", jp: "ドアを開けた＿＿出かけてしまった。", en: "I went out leaving the door open.", options: ["まま", "ように", "ために", "ところ"], correct: 0 },
  ],
  "〜から…・〜からです": [
    { type: "fill", jp: "頭が痛い＿＿＿、今日は早く寝ます。", en: "I have a headache, so I'll sleep early today.", answer: "から" },
    { type: "choice", jp: "遅刻したのは電車が止まった＿＿です。", en: "The reason I was late is because the train stopped.", options: ["から", "ので", "のに", "まで"], correct: 0 },
    { type: "fill", jp: "危ない＿＿＿、そこに立たないでください。", en: "It's dangerous, so please don't stand there.", answer: "から" },
    { type: "choice", jp: "試験に落ちたのは勉強しなかった＿＿です。", en: "The reason I failed the exam is because I didn't study.", options: ["から", "ため", "のに", "けど"], correct: 0 },
  ],
  "〜ので…": [
    { type: "fill", jp: "熱がある＿＿＿、今日は学校を休みます。", en: "I have a fever, so I'll be off school today.", answer: "ので" },
    { type: "choice", jp: "この道は狭い＿＿、車で通れません。", en: "This road is narrow, so you can't pass through by car.", options: ["ので", "から", "のに", "でも"], correct: 0 },
    { type: "fill", jp: "子どもがまだ小さい＿＿＿、あまり外出できません。", en: "Since my child is still small, I can't go out much.", answer: "ので" },
    { type: "choice", jp: "電車が遅れた＿＿、会議に間に合いませんでした。", en: "Since the train was delayed, I didn't make it to the meeting in time.", options: ["ので", "のに", "ても", "なら"], correct: 0 },
  ],
  "〜て…・〜くて…・〜で…": [
    { type: "fill", jp: "友だちに会え＿＿＿、うれしかったです。", en: "I was happy that I got to see my friend.", answer: "て" },
    { type: "choice", jp: "この問題は難し＿＿、全然わかりません。", en: "This problem is difficult, and I don't understand it at all.", options: ["くて", "て", "ので", "から"], correct: 0 },
    { type: "fill", jp: "道が渋滞＿＿＿、遅くなってしまいました。", en: "There was traffic, and I ended up being late.", answer: "で" },
    { type: "choice", jp: "テストの結果が心配＿＿、よく眠れませんでした。", en: "I was worried about the test results, and couldn't sleep well.", options: ["で", "て", "だから", "ので"], correct: 0 },
  ],
  "〜に…": [
    { type: "fill", jp: "友だちの家へ遊び＿＿＿行きました。", en: "I went to my friend's house to hang out.", answer: "に" },
    { type: "choice", jp: "図書館へ本を返し＿＿行きます。", en: "I'm going to the library to return a book.", options: ["に", "ため", "ように", "ので"], correct: 0 },
    { type: "fill", jp: "駅まで彼女を迎え＿＿＿行きました。", en: "I went to the station to pick her up.", answer: "に" },
    { type: "choice", jp: "コンビニへ牛乳を買い＿＿帰ります。", en: "I'll go to the convenience store to buy milk on my way home.", options: ["に", "ために", "ように", "ながら"], correct: 0 },
  ],
  "〜ため(に)…": [
    { type: "fill", jp: "健康の＿＿＿、毎朝走っています。", en: "I run every morning for the sake of my health.", answer: "ために" },
    { type: "choice", jp: "試験に合格する＿＿、毎日勉強しています。", en: "I study every day in order to pass the exam.", options: ["ために", "ように", "から", "ので"], correct: 0 },
    { type: "fill", jp: "これは子どもが読む＿＿＿の本です。", en: "This is a book for children to read.", answer: "ため" },
    { type: "choice", jp: "家族の＿＿、一生懸命働いています。", en: "I work hard for the sake of my family.", options: ["ために", "ようで", "のに", "からに"], correct: 0 },
  ],
  "〜ように…": [
    { type: "fill", jp: "みんなに聞こえる＿＿＿、大きい声で話しました。", en: "I spoke loudly so that everyone could hear.", answer: "ように" },
    { type: "choice", jp: "忘れない＿＿、メモしておきます。", en: "I'll write it down so I don't forget.", options: ["ように", "ために", "から", "ので"], correct: 0 },
    { type: "fill", jp: "早く病気が治る＿＿＿、祈っています。", en: "I'm praying that the illness gets better soon.", answer: "ように" },
    { type: "choice", jp: "子どもでも読める＿＿、やさしい言葉で書きました。", en: "I wrote it in easy words so that even children can read it.", options: ["ように", "ために", "のに", "ては"], correct: 0 },
  ],
  "(〜も)〜し、(〜も)…": [
    { type: "fill", jp: "この店は安い＿＿、おいしいです。", en: "This shop is cheap, and tasty too.", answer: "し" },
    { type: "choice", jp: "今日は天気もいい＿＿、時間もあるし、散歩に行きましょう。", en: "The weather's nice today, and I have time too, so let's go for a walk.", options: ["し", "て", "のに", "から"], correct: 0 },
    { type: "fill", jp: "頭も痛い＿＿、熱もある＿＿、今日は休みます。", en: "My head hurts, and I have a fever too, so I'll rest today.", answer: "し" },
    { type: "choice", jp: "このアパートは駅から近い＿＿、家賃も安いです。", en: "This apartment is close to the station, and the rent is cheap too.", options: ["し", "が", "のに", "けど"], correct: 0 },
  ],
  "〜たり〜たりします": [
    { type: "fill", jp: "週末は本を読ん＿＿映画を見＿＿します。", en: "On weekends I do things like read books and watch movies.", answer: "だり／たり" },
    { type: "choice", jp: "公園で子どもたちが走っ＿＿笑っ＿＿しています。", en: "The children are running and laughing (and doing similar things) in the park.", options: ["たり／たり", "て／て", "ながら／ながら", "とも／とも"], correct: 0 },
    { type: "fill", jp: "休みの日は掃除をし＿＿洗濯をし＿＿します。", en: "On days off I do things like clean and do laundry.", answer: "たり／たり" },
    { type: "choice", jp: "天気が悪くて、一日中雨が降っ＿＿やん＿＿していました。", en: "The weather was bad, and it rained on and off all day.", options: ["たり／だり", "て／で", "ながら／ながら", "し／し"], correct: 0 },
  ],
  "〜かもしれません": [
    { type: "fill", jp: "あしたは雪が降る＿＿＿＿＿。", en: "It might snow tomorrow.", answer: "かもしれません" },
    { type: "choice", jp: "彼は今日、会社を休む＿＿。", en: "He might be off work today.", options: ["かもしれません", "はずです", "そうです", "ようです"], correct: 0 },
    { type: "fill", jp: "この話はうそ＿＿＿＿＿。", en: "This story might be a lie.", answer: "かもしれません" },
    { type: "choice", jp: "道が混んでいるので、遅れる＿＿。", en: "The roads are crowded, so I might be late.", options: ["かもしれません", "はずがありません", "ところです", "つもりです"], correct: 0 },
  ],
  "〜はずです": [
    { type: "fill", jp: "彼はもう出発した＿＿＿です。時間ですから。", en: "He should have already departed. It's time.", answer: "はず" },
    { type: "choice", jp: "田中さんは日本人ですから、日本語が上手な＿＿。", en: "Tanaka is Japanese, so she should be good at Japanese.", options: ["はずです", "かもしれません", "ようです", "そうです"], correct: 0 },
    { type: "fill", jp: "会議は3時に始まる＿＿＿です。", en: "The meeting is supposed to start at 3.", answer: "はず" },
    { type: "choice", jp: "彼女は昨日休みでしたから、うちにいる＿＿です。", en: "She was off yesterday, so she should be at home.", options: ["はず", "かもしれない", "ところ", "つもり"], correct: 0 },
  ],
  "〜ようです・〜みたいです": [
    { type: "fill", jp: "外は雨が降っている＿＿＿です。傘を持って行きましょう。", en: "It seems to be raining outside. Let's bring an umbrella.", answer: "よう" },
    { type: "choice", jp: "この店のケーキはおいしい＿＿だね。人気があるよ。", en: "This shop's cake seems delicious. It's popular.", options: ["みたい", "はず", "そう(伝聞)", "つもり"], correct: 0 },
    { type: "fill", jp: "隣の部屋にだれかいる＿＿＿だ。物音がする。", en: "It seems like someone's in the next room. I hear a noise.", answer: "よう" },
    { type: "choice", jp: "彼は最近忙しい＿＿ですね。あまり見かけません。", en: "He seems busy lately. I don't see him much.", options: ["よう", "はず", "つもり", "こと"], correct: 0 },
  ],
  "〜なさい": [
    { type: "fill", jp: "早く宿題をし＿＿＿。", en: "Do your homework quickly.", answer: "なさい" },
    { type: "choice", jp: "部屋をきれいに片づけ＿＿。", en: "Tidy up your room.", options: ["なさい", "ください", "ましょう", "ませんか"], correct: 0 },
    { type: "fill", jp: "答えを漢字で書き＿＿＿。", en: "Write the answer in kanji.", answer: "なさい" },
  ],
  "〜ほうがいいです": [
    { type: "fill", jp: "熱があるなら、病院へ行った＿＿＿ですよ。", en: "If you have a fever, you'd better go to the hospital.", answer: "ほうがいい" },
    { type: "choice", jp: "夜遅くまでゲームをしない＿＿ですよ。", en: "You'd better not play games until late at night.", options: ["ほうがいい", "ことがいい", "ものがいい", "ようがいい"], correct: 0 },
    { type: "fill", jp: "傘を持って行った＿＿＿と思います。", en: "I think it'd be better to bring an umbrella.", answer: "ほうがいい" },
    { type: "choice", jp: "その仕事はもう少し考えた＿＿と思います。", en: "I think it'd be better to think about that job a bit more.", options: ["ほうがいい", "ものがいい", "ことになる", "つもりだ"], correct: 0 },
  ],
  "〜ないと": [
    { type: "fill", jp: "もう7時だ。早く行か＿＿＿。", en: "It's already 7. I've got to go quickly.", answer: "ないと" },
    { type: "choice", jp: "あ、薬を飲むのを忘れてた。飲ま＿＿。", en: "Oh, I forgot to take my medicine. I need to take it.", options: ["ないと", "なくてもいい", "てもいい", "てはいけない"], correct: 0 },
    { type: "fill", jp: "宿題、まだ終わってない。急が＿＿＿。", en: "I still haven't finished my homework. I need to hurry.", answer: "ないと" },
  ],
  "〜たら…（１４課）": [
    { type: "fill", jp: "もし宝くじが当たっ＿＿＿、世界旅行をしたいです。", en: "If I won the lottery, I'd want to travel the world.", answer: "たら" },
    { type: "choice", jp: "雨が降っ＿＿、試合は中止です。", en: "If it rains, the match is cancelled.", options: ["たら", "ては", "ながら", "のに"], correct: 0 },
    { type: "fill", jp: "疲れ＿＿＿、休んでください。", en: "If you're tired, please rest.", answer: "たら" },
    { type: "choice", jp: "時間があっ＿＿、映画を見に行きたいです。", en: "If I had time, I'd want to go see a movie.", options: ["たら", "ながら", "ので", "けど"], correct: 0 },
  ],
  "〜ば…・〜なら…": [
    { type: "fill", jp: "早く出れ＿＿＿、間に合いますよ。", en: "If you leave early, you'll make it in time.", answer: "ば" },
    { type: "choice", jp: "安けれ＿＿、買います。", en: "If it's cheap, I'll buy it.", options: ["ば", "たら", "と", "のに"], correct: 0 },
    { type: "fill", jp: "薬を飲ま＿＿＿、なかなか治りませんよ。", en: "If you don't take the medicine, it won't get better easily.", answer: "なければ" },
    { type: "choice", jp: "旅行に行く＿＿、パスポートが必要です。", en: "If you're going to travel, you need a passport.", options: ["なら", "ば", "と", "たら"], correct: 0 },
  ],
  "〜と…（１４課）": [
    { type: "fill", jp: "このボタンを押す＿＿＿、電気がつきます。", en: "When you press this button, the light turns on.", answer: "と" },
    { type: "choice", jp: "春になる＿＿、桜が咲きます。", en: "When spring comes, the cherry blossoms bloom.", options: ["と", "ば", "たら", "のに"], correct: 0 },
    { type: "fill", jp: "右に曲がる＿＿＿、コンビニがあります。", en: "If you turn right, there's a convenience store.", answer: "と" },
  ],
  "〜たら…（１５課）": [
    { type: "fill", jp: "駅に着い＿＿＿、電話してください。", en: "When you arrive at the station, please call me.", answer: "たら" },
    { type: "choice", jp: "仕事が終わっ＿＿、飲みに行きませんか。", en: "When work's finished, won't you go for a drink?", options: ["たら", "ながら", "ように", "けど"], correct: 0 },
    { type: "fill", jp: "50歳になっ＿＿＿、田舎に住みたいです。", en: "When I turn 50, I want to live in the countryside.", answer: "たら" },
  ],
  "〜なら…（１５課）": [
    { type: "fill", jp: "京都に行く＿＿＿、いい旅館を知っていますよ。", en: "If you're going to Kyoto, I know a good inn.", answer: "なら" },
    { type: "choice", jp: "時間がない＿＿、タクシーで行きましょう。", en: "If you don't have time, let's go by taxi.", options: ["なら", "たら", "と", "ので"], correct: 0 },
    { type: "fill", jp: "ラーメン＿＿＿、あの店がおいしいですよ。", en: "If it's ramen you want, that shop is delicious.", answer: "なら" },
  ],
  "〜ても…": [
    { type: "fill", jp: "何度説明し＿＿＿、彼はわかってくれません。", en: "No matter how many times I explain, he doesn't understand.", answer: "ても" },
    { type: "choice", jp: "雨が降っ＿＿、試合は行われます。", en: "Even if it rains, the match will be held.", options: ["ても", "たら", "ながら", "ので"], correct: 0 },
    { type: "fill", jp: "高く＿＿＿、質のいい物を買いたいです。", en: "Even if it's expensive, I want to buy a good-quality item.", answer: "ても" },
    { type: "choice", jp: "いくら急い＿＿、もう間に合いません。", en: "No matter how much I hurry, I won't make it in time now.", options: ["でも", "ても", "だら", "なら"], correct: 0 },
  ],
  "〜のに…": [
    { type: "fill", jp: "薬を飲んだ＿＿＿、まだ熱があります。", en: "Even though I took the medicine, I still have a fever.", answer: "のに" },
    { type: "choice", jp: "一生懸命練習した＿＿、試合に負けてしまいました。", en: "Even though I practiced hard, I ended up losing the match.", options: ["のに", "ので", "から", "ため"], correct: 0 },
    { type: "fill", jp: "まだ子どもな＿＿＿、もう自転車に乗れます。", en: "Even though she's still a child, she can already ride a bicycle.", answer: "のに" },
    { type: "choice", jp: "彼はお金がある＿＿、全然使いません。", en: "He has money, yet he doesn't spend it at all.", options: ["のに", "ので", "から", "ために"], correct: 0 },
  ],
  "〜と…（１７課）": [
    { type: "fill", jp: "日本語で「ありがとう」＿＿言います。", en: "You say \"arigatou\" in Japanese.", answer: "と" },
    { type: "choice", jp: "先生は明日テストがある＿＿言いました。", en: "The teacher said there'd be a test tomorrow.", options: ["と", "を", "に", "が"], correct: 0 },
    { type: "fill", jp: "彼女はもうすぐ来る＿＿＿思います。", en: "I think she'll come soon.", answer: "と" },
  ],
  "〜か…・〜かどうか…": [
    { type: "fill", jp: "彼がいつ来る＿＿知っていますか。", en: "Do you know when he's coming?", answer: "か" },
    { type: "choice", jp: "この答えが正しい＿＿確認してください。", en: "Please check whether this answer is correct.", options: ["かどうか", "か", "ので", "のに"], correct: 0 },
    { type: "fill", jp: "だれがこの本を書いた＿＿知っていますか。", en: "Do you know who wrote this book?", answer: "か" },
    { type: "choice", jp: "あした雨が降る＿＿わかりません。", en: "I don't know whether it'll rain tomorrow.", options: ["かどうか", "か", "ように", "ため"], correct: 0 },
  ],
  "〜(よ)うと思います": [
    { type: "fill", jp: "来年、日本語を勉強し＿＿＿と思います。", en: "I'm thinking of studying Japanese next year.", answer: "よう" },
    { type: "choice", jp: "週末は家でゆっくり休も＿＿思います。", en: "I'm thinking of resting at home this weekend.", options: ["うと", "ようと", "のと", "たいと"], correct: 0 },
    { type: "fill", jp: "今度の休みに温泉へ行こ＿＿＿思っています。", en: "I'm planning to go to a hot spring on my next holiday.", answer: "うと" },
  ],
  "〜つもりです": [
    { type: "fill", jp: "来月、引っ越しをする＿＿＿です。", en: "I plan to move next month.", answer: "つもり" },
    { type: "choice", jp: "今年はもう旅行に行かない＿＿です。", en: "I don't plan to travel anymore this year.", options: ["つもり", "はず", "ため", "こと"], correct: 0 },
    { type: "fill", jp: "夏休みは国へ帰る＿＿＿です。", en: "I plan to go back to my country during summer break.", answer: "つもり" },
  ],
  "〜と言っていました": [
    { type: "fill", jp: "山田さんはあした休む＿＿言っていました。", en: "Yamada said they'd be off tomorrow.", answer: "と" },
    { type: "choice", jp: "彼は来月結婚する＿＿言っていましたよ。", en: "He said he's getting married next month.", options: ["と", "は", "に", "を"], correct: 0 },
    { type: "fill", jp: "先生は宿題を出す＿＿＿言っていました。", en: "The teacher said they'd give homework.", answer: "と" },
  ],
  "〜そうです（伝聞）": [
    { type: "fill", jp: "天気予報によると、あしたは晴れる＿＿＿です。", en: "According to the weather forecast, it'll apparently be sunny tomorrow.", answer: "そう" },
    { type: "choice", jp: "ニュースで見ましたが、あの店は来月閉店する＿＿ですよ。", en: "I saw on the news that that shop is apparently closing next month.", options: ["そうです", "ようです", "みたいです", "はずです"], correct: 0 },
    { type: "fill", jp: "うわさでは、あの二人は付き合っている＿＿＿です。", en: "According to rumor, those two are apparently dating.", answer: "そう" },
  ],
  "〜らしいです": [
    { type: "fill", jp: "聞いた話では、彼は会社を辞める＿＿＿です。", en: "From what I've heard, he's apparently quitting the company.", answer: "らしい" },
    { type: "choice", jp: "新聞によると、今年は雪が多い＿＿ですよ。", en: "According to the paper, apparently there's a lot of snow this year.", options: ["らしい", "そうな", "ような", "つもりの"], correct: 0 },
    { type: "fill", jp: "この辺りでくまが出た＿＿＿ですよ。気をつけてください。", en: "A bear apparently appeared around here. Please be careful.", answer: "らしい" },
  ],
  "〜くします・〜にします": [
    { type: "fill", jp: "部屋をもっと暖か＿＿＿しました。", en: "I made the room warmer.", answer: "く" },
    { type: "choice", jp: "髪の毛を短＿＿してもらいました。", en: "I had my hair cut short.", options: ["く", "に", "を", "が"], correct: 0 },
    { type: "fill", jp: "テーブルの上をきれい＿＿＿しましょう。", en: "Let's make the top of the table clean.", answer: "に" },
    { type: "choice", jp: "ケーキを半分＿＿してください。", en: "Please cut the cake in half.", options: ["に", "く", "が", "へ"], correct: 0 },
  ],
  "〜くなります・〜になります・〜ようになります": [
    { type: "fill", jp: "この頃、日が長＿＿＿なりました。", en: "The days have become longer lately.", answer: "く" },
    { type: "choice", jp: "掃除したら、部屋がきれい＿＿なりました。", en: "After cleaning, the room became clean.", options: ["に", "く", "が", "へ"], correct: 0 },
    { type: "fill", jp: "毎日練習して、上手に泳げる＿＿＿なりました。", en: "By practicing every day, I became able to swim well.", answer: "よう" },
    { type: "choice", jp: "子どもは大きく＿＿ましたね。", en: "The child has grown big, hasn't he.", options: ["なり", "し", "です", "でした"], correct: 0 },
  ],
  "〜にします・〜ことにします": [
    { type: "fill", jp: "飲み物はコーヒー＿＿＿します。", en: "I'll have coffee for my drink.", answer: "に" },
    { type: "choice", jp: "今日から毎日運動する＿＿しました。", en: "I've decided to exercise every day from today.", options: ["ことに", "ように", "ために", "ものに"], correct: 0 },
    { type: "fill", jp: "来年、大学院に進む＿＿＿しました。", en: "I've decided to go to graduate school next year.", answer: "ことに" },
  ],
  "〜になります・〜ことになります": [
    { type: "fill", jp: "会議は来週の月曜日＿＿＿なりました。", en: "The meeting has been set for next Monday.", answer: "に" },
    { type: "choice", jp: "来月から新しい部署で働く＿＿なりました。", en: "It's been decided that I'll work in a new department starting next month.", options: ["ことに", "ように", "ために", "ものに"], correct: 0 },
    { type: "fill", jp: "台風のため、イベントは中止する＿＿＿なりました。", en: "Due to the typhoon, it's been decided the event will be cancelled.", answer: "ことに" },
  ],
  "〜てみます": [
    { type: "fill", jp: "新しいレストランに行っ＿＿＿と思います。", en: "I want to try going to the new restaurant.", answer: "てみたい" },
    { type: "choice", jp: "この服、着＿＿もいいですか。", en: "May I try on this piece of clothing?", options: ["て", "た", "る", "ない"], correct: 0 },
    { type: "fill", jp: "わからないことは先生に聞い＿＿＿ください。", en: "Please try asking the teacher about things you don't understand.", answer: "てみて" },
  ],
  "〜ておきます": [
    { type: "fill", jp: "パーティーの前に部屋を掃除し＿＿＿。", en: "I'll clean the room in advance before the party.", answer: "ておきます" },
    { type: "choice", jp: "旅行の前に、切符を買っ＿＿ましょう。", en: "Let's buy the tickets in advance before the trip.", options: ["ておき", "てみ", "てあげ", "てしまい"], correct: 0 },
    { type: "fill", jp: "大切な書類はここに置い＿＿＿ください。", en: "Please leave the important documents here.", answer: "ておいて" },
  ],
  "〜てしまいます": [
    { type: "fill", jp: "宿題は今日中にやっ＿＿＿つもりです。", en: "I intend to get the homework finished today.", answer: "てしまう" },
    { type: "choice", jp: "電車の中でかさを忘れ＿＿ました。", en: "I ended up forgetting my umbrella on the train.", options: ["てしまい", "ておき", "てみ", "てあげ"], correct: 0 },
    { type: "fill", jp: "アイスクリームが溶け＿＿＿よ。早く食べて。", en: "The ice cream's going to melt. Eat it quick.", answer: "てしまう" },
  ],
  "あげます・〜てあげます": [
    { type: "fill", jp: "友だちに誕生日プレゼントを＿＿＿。（あげる）", en: "I gave my friend a birthday present.", answer: "あげました" },
    { type: "choice", jp: "妹に日本語を教えて＿＿＿。", en: "I taught my younger sister Japanese (as a favor).", options: ["あげました", "くれました", "もらいました", "いただきました"], correct: 0 },
    { type: "fill", jp: "先生に花を＿＿＿＿＿。（さしあげる）", en: "I gave the teacher flowers.", answer: "さしあげました" },
  ],
  "くれます・〜てくれます": [
    { type: "fill", jp: "友だちがわたしに本を＿＿＿。（くれる）", en: "My friend gave me a book.", answer: "くれました" },
    { type: "choice", jp: "山田さんが道を教えて＿＿＿。", en: "Yamada told me the way (for my sake).", options: ["くれました", "あげました", "もらいました", "さしあげました"], correct: 0 },
    { type: "fill", jp: "先生がわたしの息子に本を＿＿＿＿＿。（くださる）", en: "The teacher gave my son a book.", answer: "くださいました" },
  ],
  "もらいます・〜てもらいます": [
    { type: "fill", jp: "友だちに時計を＿＿＿＿＿。（もらう）", en: "I received a watch from my friend.", answer: "もらいました" },
    { type: "choice", jp: "山田さんに駅まで送って＿＿＿。", en: "I had Yamada drive me to the station.", options: ["もらいました", "くれました", "あげました", "くださいました"], correct: 0 },
    { type: "fill", jp: "先生に作文を直して＿＿＿＿＿。（いただく）", en: "I had the teacher correct my composition.", answer: "いただきました" },
  ],
  "〜(られ)ます（受身１）": [
    { type: "fill", jp: "きのう、先生に＿＿＿＿＿。（ほめる）", en: "I was praised by the teacher yesterday.", answer: "ほめられました" },
    { type: "choice", jp: "電車の中で知らない人に足を＿＿＿。", en: "My foot was stepped on by a stranger on the train.", options: ["ふまれました", "ふみました", "ふませました", "ふまれています"], correct: 0 },
    { type: "fill", jp: "きのう、警察に道を＿＿＿＿＿。（聞く）", en: "I was asked for directions by the police yesterday.", answer: "聞かれました" },
  ],
  "〜(られ)ます（受身２）": [
    { type: "fill", jp: "電車の中で子どもに＿＿＿＿＿。（泣く）", en: "A child cried on me on the train (to my annoyance).", answer: "泣かれました" },
    { type: "choice", jp: "弟にケーキを＿＿＿しまいました。", en: "My cake got eaten by my younger brother, to my annoyance.", options: ["食べられて", "食べさせて", "食べて", "食べさせられて"], correct: 0 },
    { type: "fill", jp: "きのう、どろぼうに＿＿＿＿＿。（入る）", en: "I had a burglar break in yesterday.", answer: "入られました" },
  ],
  "〜(られ)ます（受身３）": [
    { type: "fill", jp: "このお寺は500年前に＿＿＿＿＿。（建てる）", en: "This temple was built 500 years ago.", answer: "建てられました" },
    { type: "choice", jp: "この歌は世界中で＿＿＿います。", en: "This song is sung all over the world.", options: ["歌われて", "歌わせて", "歌って", "歌わせられて"], correct: 0 },
    { type: "fill", jp: "来月、新しい市長が＿＿＿＿＿。（選ぶ）", en: "A new mayor will be chosen next month.", answer: "選ばれます" },
  ],
  "〜(さ)せます": [
    { type: "fill", jp: "先生は学生に本を＿＿＿＿＿。（読む）", en: "The teacher makes the students read books.", answer: "読ませます" },
    { type: "choice", jp: "母は妹に部屋を＿＿＿ました。", en: "Mother made my younger sister clean the room.", options: ["掃除させ", "掃除され", "掃除して", "掃除できさせ"], correct: 0 },
    { type: "fill", jp: "先生はわたしをみんなの前で＿＿＿＿＿。（話す）", en: "The teacher had me speak in front of everyone.", answer: "話させました" },
    { type: "choice", jp: "その知らせは彼を＿＿＿。", en: "That news made him worry.", options: ["心配させました", "心配されました", "心配しました", "心配できました"], correct: 0 },
  ],
  "〜さ(せら)れます": [
    { type: "fill", jp: "子どものとき、よく親に部屋を＿＿＿＿＿＿＿。（掃除する）", en: "As a child, I was often made to clean my room by my parents.", answer: "掃除させられました" },
    { type: "choice", jp: "先輩に無理やりお酒を＿＿＿。", en: "I was forced by a senior to drink alcohol.", options: ["飲まされました", "飲みました", "飲ませました", "飲まれました"], correct: 0 },
    { type: "fill", jp: "上司に残業を＿＿＿＿＿＿＿。（する）", en: "I was made to work overtime by my boss.", answer: "させられました" },
  ],

  // ---------- 26課 で・に ----------
  "で・に": [
    { type: "fill", jp: "公園[こうえん]＿＿子供[こども]たちがいます。", en: "There are children in the park.", answer: "に" },
    { type: "fill", jp: "公園[こうえん]＿＿子供[こども]たちが遊[あそ]んでいます。", en: "Children are playing in the park.", answer: "で" },
    { type: "choice", jp: "毎朝[まいあさ]7時[じ]＿＿起[お]きます。", en: "I get up at 7 every morning.", options: ["に", "で", "を", "が"], correct: 0 },
    { type: "fill", jp: "友達[ともだち]＿＿手紙[てがみ]を書[か]きました。", en: "I wrote a letter to my friend.", answer: "に" },
    { type: "choice", jp: "電車[でんしゃ]＿＿会社[かいしゃ]に行[い]きます。", en: "I go to work by train.", options: ["で", "に", "を", "が"], correct: 0 },
    { type: "fill", jp: "風邪[かぜ]＿＿学校[がっこう]を休[やす]みました。", en: "I was absent from school because of a cold.", answer: "で" },
  ],

  // ---------- 27課 を・と ----------
  "を・と": [
    { type: "fill", jp: "毎朝[まいあさ]、公園[こうえん]＿＿散歩[さんぽ]します。", en: "I take a walk through the park every morning.", answer: "を" },
    { type: "choice", jp: "次[つぎ]の駅[えき]で電車[でんしゃ]＿＿降[お]ります。", en: "I'll get off the train at the next station.", options: ["を", "に", "で", "が"], correct: 0 },
    { type: "fill", jp: "「明日[あした]は休[やす]みます」＿＿部長[ぶちょう]に言[い]いました。", en: "I told the manager, \"I'll be off tomorrow.\"", answer: "と" },
    { type: "choice", jp: "週末[しゅうまつ]、友達[ともだち]＿＿映画[えいが]を見[み]に行[い]きます。", en: "I'm going to see a movie with a friend this weekend.", options: ["と", "に", "を", "が"], correct: 0 },
    { type: "fill", jp: "田中[たなか]さん＿＿結婚[けっこん]することにしました。", en: "I decided to marry Tanaka.", answer: "と" },
    { type: "choice", jp: "道[みち]＿＿渡[わた]るときは、気[き]をつけてください。", en: "Please be careful when crossing the street.", options: ["を", "に", "で", "が"], correct: 0 },
  ],

  // ---------- 28課 も・しか ----------
  "も・しか": [
    { type: "fill", jp: "財布[さいふ]に千円[せんえん]＿＿ありません。", en: "I only have 1000 yen in my wallet.", answer: "しか" },
    { type: "choice", jp: "宿題[しゅくだい]がまだ半分[はんぶん]＿＿できていません。", en: "I haven't even finished half of my homework yet.", options: ["も", "しか", "だけ", "ばかり"], correct: 0 },
    { type: "fill", jp: "この問題[もんだい]が分[わ]かる人[ひと]はクラスに一人[ひとり]＿＿いません。", en: "There's only one person in the class who understands this problem.", answer: "しか" },
    { type: "choice", jp: "このケーキ、一[ひと]つ食[た]べて＿＿いいですか。", en: "May I eat one of these cakes, too?", options: ["も", "しか", "だけ", "でも"], correct: 0 },
    { type: "fill", jp: "三日間[みっかかん]＿＿休[やす]みがありませんでした。", en: "I only had three days off.", answer: "しか" },
    { type: "choice", jp: "三時間[さんじかん]＿＿待[ま]ちました。大変[たいへん]でした。", en: "I waited as long as three hours. It was rough.", options: ["も", "しか", "だけ", "ばかり"], correct: 0 },
  ],

  // ---------- 29課 だけ・でも ----------
  "だけ・でも": [
    { type: "fill", jp: "会議[かいぎ]には田中[たなか]さん＿＿来[き]ませんでした。", en: "Only Tanaka didn't come to the meeting.", answer: "だけ" },
    { type: "choice", jp: "疲[つか]れたでしょう。コーヒー＿＿飲[の]みませんか。", en: "You must be tired. Won't you have some coffee or something?", options: ["でも", "だけ", "しか", "も"], correct: 0 },
    { type: "fill", jp: "少[すこ]し＿＿休[やす]ませてください。", en: "Please let me rest just a little.", answer: "だけ" },
    { type: "choice", jp: "この漢字[かんじ]は簡単[かんたん]なので、子供[こども]＿＿読[よ]めます。", en: "This kanji is easy, so even a child can read it.", options: ["でも", "だけ", "しか", "を"], correct: 0 },
    { type: "fill", jp: "分[わ]からないことがあったら、いつ＿＿聞[き]いてください。", en: "If there's something you don't understand, please ask anytime.", answer: "でも" },
    { type: "choice", jp: "彼[かれ]は忙[いそが]しいので、五分[ごふん]＿＿会[あ]えませんでした。", en: "He was busy, so I could only meet him for five minutes.", options: ["だけ", "でも", "も", "しか"], correct: 0 },
  ],

  // ---------- 30課 は・が ----------
  "は・が": [
    { type: "fill", jp: "わたし＿＿学生[がくせい]です。", en: "As for me, I'm a student.", answer: "は" },
    { type: "choice", jp: "だれ＿＿窓[まど]を割[わ]りましたか。ケンさんが割[わ]りました。", en: "\"Who broke the window?\" \"Ken did.\"", options: ["が", "は", "を", "に"], correct: 0 },
    { type: "fill", jp: "象[ぞう]＿＿鼻[はな]が長[なが]いです。", en: "Elephants have long trunks.", answer: "は" },
    { type: "choice", jp: "わたしは日本語[にほんご]＿＿分[わ]かります。", en: "I understand Japanese.", options: ["が", "を", "は", "に"], correct: 0 },
    { type: "fill", jp: "部屋[へや]に猫[ねこ]＿＿います。", en: "There's a cat in the room.", answer: "が" },
    { type: "choice", jp: "今日[きょう]＿＿天気[てんき]がいいですね。", en: "The weather's nice today, isn't it.", options: ["は", "が", "を", "に"], correct: 0 },
  ],

  // ---------- 31課 の・こと ----------
  "の・こと": [
    { type: "fill", jp: "電車[でんしゃ]が来[く]る＿＿を待[ま]っています。", en: "I'm waiting for the train to come.", answer: "の" },
    { type: "choice", jp: "彼[かれ]が引[ひ]っ越[こ]した＿＿を知[し]りませんでした。", en: "I didn't know that he had moved.", options: ["こと", "の", "とき", "ところ"], correct: 0 },
    { type: "fill", jp: "わたしの趣味[しゅみ]は写真[しゃしん]をとる＿＿です。", en: "My hobby is taking photos.", answer: "こと" },
    { type: "choice", jp: "子供[こども]が公園[こうえん]で遊[あそ]んでいる＿＿を見[み]ました。", en: "I saw the children playing in the park.", options: ["の", "こと", "とき", "もの"], correct: 0 },
    { type: "fill", jp: "漢字[かんじ]を読[よ]む＿＿ができますか。", en: "Can you read kanji?", answer: "こと" },
    { type: "choice", jp: "毎日[まいにち]運動[うんどう]する＿＿は体[からだ]にいいです。", en: "Exercising every day is good for your health.", options: ["こと", "の", "とき", "ため"], correct: 0 },
  ],

  // ---------- 32課 〜て…・〜ないで… ----------
  "〜て…・〜ないで…": [
    { type: "fill", jp: "朝[あさ]、シャワーを浴[あ]び＿＿会社[かいしゃ]に行[い]きます。", en: "In the morning, I take a shower and then go to work.", answer: "て" },
    { type: "fill", jp: "傘[かさ]を＿＿＿＿＿、雨[あめ]の中[なか]を歩[ある]きました。（さす）", en: "I walked in the rain without opening an umbrella.", answer: "ささないで" },
    { type: "choice", jp: "昨日[きのう]は疲[つか]れていたので、晩[ばん]ご飯[はん]を＿＿寝[ね]てしまいました。", en: "I was tired yesterday, so I went to sleep without eating dinner.", options: ["食べないで", "食べて", "食べなくて", "食べたいで"], correct: 0 },
    { type: "fill", jp: "砂糖[さとう]を＿＿＿＿＿、コーヒーを飲[の]みます。（入[い]れる）", en: "I drink my coffee without sugar.", answer: "入れないで" },
    { type: "choice", jp: "朝[あさ]起[お]き＿＿、顔[かお]を洗[あら]います。", en: "I get up, then wash my face.", options: ["て", "ないで", "たり", "れば"], correct: 0 },
    { type: "fill", jp: "電気[でんき]をつけ＿＿＿＿＿、勉強[べんきょう]します。（つける）", en: "I study without turning on the light.", answer: "つけないで" },
  ],

  // ---------- 33課 他動詞・自動詞 ----------
  "他動詞・自動詞": [
    { type: "fill", jp: "暑[あつ]いので、まど＿＿開[あ]けます。", en: "It's hot, so I'll open the window.", answer: "を" },
    { type: "choice", jp: "車[くるま]のドア＿＿急[きゅう]に開[ひら]きました。", en: "The car door suddenly opened.", options: ["が", "を", "に", "で"], correct: 0 },
    { type: "fill", jp: "へやにいた虫[むし]を外[そと]に＿＿＿＿＿。（出[だ]す）", en: "I put the bug that was in the room outside.", answer: "出しました" },
    { type: "choice", jp: "学生[がくせい]は後[うし]ろのドアから＿＿。", en: "Students go out through the back door.", options: ["出ます", "出します", "出させます", "出られます"], correct: 0 },
    { type: "fill", jp: "トムは古[ふる]いおもちゃを＿＿＿＿＿います。（集[あつ]める）", en: "Tom is collecting old toys.", answer: "集めて" },
    { type: "choice", jp: "みんなが＿＿、旅行[りょこう]のそうだんをします。", en: "Everyone gathers and discusses the trip.", options: ["集まって", "集めて", "集まられて", "集められて"], correct: 0 },
  ],

  // ---------- 34課 〜ています・〜てあります ----------
  "〜ています・〜てあります": [
    { type: "fill", jp: "まどが＿＿＿＿＿います。（開[あ]く）", en: "The window is open.", answer: "開いて" },
    { type: "choice", jp: "暑[あつ]いので、まどが＿＿あります。", en: "It's hot, so the window has been left open on purpose.", options: ["開けて", "開いて", "開かれて", "開けさせて"], correct: 0 },
    { type: "fill", jp: "かべにきれいな絵[え]が＿＿＿＿＿います。（かかる）", en: "There's a beautiful picture hanging on the wall.", answer: "かかって" },
    { type: "choice", jp: "パーティーのために、かべに絵[え]が＿＿あります。", en: "A picture has been hung on the wall for the party.", options: ["かけて", "かかって", "かかられて", "かけられて"], correct: 0 },
    { type: "fill", jp: "電気[でんき]が＿＿＿＿＿います。（消[き]える）", en: "The light is off.", answer: "消えて" },
    { type: "choice", jp: "会議室[かいぎしつ]にお茶[ちゃ]が＿＿あります。", en: "Tea has been prepared in the meeting room.", options: ["用意して", "用意されて", "用意し", "用意させて"], correct: 0 },
  ],

  // ---------- 35課 〜てきます・〜ていきます ----------
  "〜てきます・〜ていきます": [
    { type: "fill", jp: "ちょっとコンビニに＿＿＿＿＿。（行[い]く）", en: "I'm just going to the convenience store, and I'll be back.", answer: "行ってきます" },
    { type: "choice", jp: "雨[あめ]がだんだん強[つよ]くなって＿＿。", en: "The rain has been gradually getting stronger.", options: ["きました", "いきました", "きます", "いきます"], correct: 0 },
    { type: "fill", jp: "これから日本語[にほんご]をもっと勉強[べんきょう]して＿＿＿＿＿です。（いく）", en: "From now on, I want to keep studying Japanese more.", answer: "いきたい" },
    { type: "choice", jp: "子[こ]どもたちは元気[げんき]に育[そだ]って＿＿でしょう。", en: "The children will likely keep growing up healthy.", options: ["いく", "くる", "いった", "きた"], correct: 0 },
    { type: "fill", jp: "財布[さいふ]を忘[わす]れたので、家[いえ]に取[と]りに帰[かえ]って＿＿＿＿＿。（くる）", en: "I forgot my wallet, so I'll go home to get it and come back.", answer: "きます" },
    { type: "choice", jp: "空[そら]が明[あか]るくなって＿＿。", en: "The sky has been getting brighter.", options: ["きました", "いきました", "きます", "いくでしょう"], correct: 0 },
  ],

  // ---------- 36課 こ・そ・あ ----------
  "こ・そ・あ": [
    { type: "choice", jp: "A「＿＿シャツ、どこで買[か]いましたか。」（相手[あいて]が着[き]ているシャツを指[さ]して）", en: "\"Where did you buy that shirt you're wearing?\"", options: ["その", "この", "あの", "どの"], correct: 0 },
    { type: "fill", jp: "＿＿＿＿に大[おお]きい木[き]がありますね。（遠[とお]くを指[さ]して）", en: "There's a big tree over there, isn't there.", answer: "あそこ" },
    { type: "choice", jp: "A「新[あたら]しいレストランができたんですよ。」B「＿＿ですか。今度[こんど]行[い]ってみましょう。」", en: "A: \"A new restaurant opened.\" B: \"Is that so? Let's try going sometime.\"", options: ["そう", "ああ", "こう", "どう"], correct: 0 },
    { type: "fill", jp: "＿＿＿の映画[えいが]、二人[ふたり]で見[み]に行[い]ったの覚[おぼ]えてる？（二人[ふたり]とも知[し]っている話[はなし]）", en: "Do you remember that movie we went to see together?", answer: "あの" },
    { type: "choice", jp: "＿＿＿はわたしのかさです。（手[て]に持[も]っているものを指[さ]して）", en: "This is my umbrella.", options: ["これ", "それ", "あれ", "どれ"], correct: 0 },
    { type: "fill", jp: "＿＿＿＿＿のバッグにしますか。", en: "Which bag will you choose?", answer: "どちら" },
  ],

  // ---------- 37課 接続の言葉 ----------
  "ですから・だから": [
    { type: "fill", jp: "これは一[ひと]つ100円[えん]です。＿＿＿＿＿、三[みっ]つで300円[えん]です。", en: "This is 100 yen each. So three of them is 300 yen.", answer: "ですから" },
    { type: "choice", jp: "もう夜[よる]8時[じ]だ。＿＿、教室[きょうしつ]にはだれもいないと思[おも]う。", en: "It's already 8pm. So I think no one's in the classroom.", options: ["だから", "それで", "けれど", "それに"], correct: 0 },
    { type: "fill", jp: "ここは人[ひと]がよく通[とお]るんだ。＿＿＿、ここに物[もの]をおかないで。", en: "People often pass through here. So don't leave things here.", answer: "だから" },
    { type: "choice", jp: "明日[あした]は試験[しけん]があります。＿＿＿＿＿、今晩[こんばん]は早[はや]く寝[ね]ます。", en: "I have an exam tomorrow. So I'm going to sleep early tonight.", options: ["ですから", "それに", "けれど", "たとえば"], correct: 0 },
    { type: "fill", jp: "雨[あめ]が降[ふ]っています。＿＿＿＿＿、傘[かさ]を持[も]っていきます。", en: "It's raining. So I'll take an umbrella.", answer: "ですから" },
    { type: "choice", jp: "もう遅[おそ]い。＿＿、そろそろ帰[かえ]ろう。", en: "It's already late. So let's head home soon.", options: ["だから", "それに", "たとえば", "けれど"], correct: 0 },
  ],
  "それで": [
    { type: "fill", jp: "小[ちい]さい字[じ]が見[み]えなくなりました。＿＿＿＿、新[あたら]しいめがねを買[か]いました。", en: "I could no longer see small print. So I bought new glasses.", answer: "それで" },
    { type: "choice", jp: "会社[かいしゃ]が遠[とお]い。＿＿＿、毎朝[まいあさ]早[はや]く家[いえ]を出[で]る。", en: "The office is far. So I leave home early every morning.", options: ["それで", "それに", "けれど", "たとえば"], correct: 0 },
    { type: "fill", jp: "熱[ねつ]が出[で]ました。＿＿＿＿、学校[がっこう]を休[やす]みました。", en: "I got a fever. So I was absent from school.", answer: "それで" },
    { type: "choice", jp: "電車[でんしゃ]が止[と]まった。＿＿＿、遅刻[ちこく]してしまった。", en: "The train stopped. So I ended up being late.", options: ["それで", "それに", "たとえば", "では"], correct: 0 },
    { type: "fill", jp: "財布[さいふ]をなくしました。＿＿＿＿、警察[けいさつ]に行[い]きました。", en: "I lost my wallet. So I went to the police.", answer: "それで" },
    { type: "choice", jp: "頭[あたま]が痛[いた]かった。＿＿＿、薬[くすり]を飲[の]んで早[はや]く寝[ね]た。", en: "I had a headache. So I took medicine and went to bed early.", options: ["それで", "けれど", "それに", "たとえば"], correct: 0 },
  ],
  "けれど(も)": [
    { type: "fill", jp: "とてもがんばりました。＿＿＿＿＿、いいてんはとれませんでした。", en: "I tried very hard. But I couldn't get a good grade.", answer: "けれども" },
    { type: "choice", jp: "このカメラはいい。＿＿、少[すこ]し重[おも]い。", en: "This camera is good. But it's a little heavy.", options: ["けれど", "それで", "たとえば", "だから"], correct: 0 },
    { type: "fill", jp: "安[やす]いです。＿＿＿、あまりおいしくなかったです。", en: "It was cheap. But it wasn't very good.", answer: "けれど" },
    { type: "choice", jp: "頑張[がんば]って勉強[べんきょう]した。＿＿、試験[しけん]に落[お]ちてしまった。", en: "I studied hard. But I ended up failing the exam.", options: ["けれど", "それで", "それに", "たとえば"], correct: 0 },
    { type: "fill", jp: "天気[てんき]はよかった。＿＿＿、風[かぜ]がとても強[つよ]かった。", en: "The weather was good. But the wind was very strong.", answer: "けれど" },
    { type: "choice", jp: "彼[かれ]は忙[いそが]しい。＿＿、いつも笑顔[えがお]だ。", en: "He's busy. But he always has a smile on his face.", options: ["けれども", "それで", "だから", "たとえば"], correct: 0 },
  ],
  "それに": [
    { type: "fill", jp: "バナナはおいしいです。＿＿＿＿、安[やす]いです。", en: "Bananas are tasty. What's more, they're cheap.", answer: "それに" },
    { type: "choice", jp: "雨[あめ]がふっているし、＿＿＿、風[かぜ]もある。", en: "It's raining, and on top of that, it's windy too.", options: ["それに", "けれど", "それで", "たとえば"], correct: 0 },
    { type: "fill", jp: "この部屋[へや]は広[ひろ]い。＿＿＿＿、明[あか]るい。", en: "This room is spacious. On top of that, it's bright.", answer: "それに" },
    { type: "choice", jp: "彼[かれ]は頭[あたま]がいい。＿＿＿、性格[せいかく]もいい。", en: "He's smart. On top of that, his personality is good too.", options: ["それに", "けれど", "だから", "では"], correct: 0 },
    { type: "fill", jp: "この店[みせ]は安[やす]い。＿＿＿＿、おいしい。", en: "This shop is cheap. On top of that, it's delicious.", answer: "それに" },
    { type: "choice", jp: "今日[きょう]は暑[あつ]い。＿＿＿、湿度[しつど]も高[たか]い。", en: "It's hot today. On top of that, the humidity is high too.", options: ["それに", "それで", "けれど", "たとえば"], correct: 0 },
  ],
  "たとえば": [
    { type: "fill", jp: "日本[にほん]のスポーツ、＿＿＿＿、じゅうどうをやってみたいです。", en: "I'd like to try a Japanese sport — judo, for example.", answer: "たとえば" },
    { type: "choice", jp: "山田[やまだ]さんはいつもおそく帰[かえ]る。＿＿、きのうは11時[じ]に帰[かえ]った。", en: "Yamada always comes home late. For example, yesterday he came home at 11.", options: ["たとえば", "それで", "けれど", "では"], correct: 0 },
    { type: "fill", jp: "果物[くだもの]が好[す]きです。＿＿＿＿、りんごやみかんをよく食[た]べます。", en: "I like fruit. For example, I often eat apples and oranges.", answer: "たとえば" },
    { type: "choice", jp: "田中[たなか]さんは色々[いろいろ]な国[くに]に行[い]ったことがある。＿＿、フランスやドイツに行[い]った。", en: "Tanaka has been to various countries. For example, he went to France and Germany.", options: ["たとえば", "それに", "けれど", "だから"], correct: 0 },
    { type: "fill", jp: "この町[まち]には有名[ゆうめい]な建物[たてもの]が多[おお]い。＿＿＿＿、古[ふる]いお寺[てら]がある。", en: "This town has many famous buildings. For example, there's an old temple.", answer: "たとえば" },
    { type: "choice", jp: "わたしは辛[から]い食[た]べ物[もの]が苦手[にがて]だ。＿＿、カレーも食[た]べられない。", en: "I'm not good with spicy food. For example, I can't even eat curry.", options: ["たとえば", "それで", "それに", "けれど"], correct: 0 },
  ],
  "(それ)では・じゃ": [
    { type: "fill", jp: "じゅんびはできましたか。＿＿＿＿＿、始[はじ]めましょう。", en: "Are you ready? Well then, let's begin.", answer: "それでは" },
    { type: "choice", jp: "トム「ぼくは兄[あに]がいます。」先生[せんせい]「＿＿、二人兄弟[ふたりきょうだい]ですね。」", en: "Tom: \"I have an older brother.\" Teacher: \"Well then, there are two of you siblings.\"", options: ["じゃ", "それに", "たとえば", "けれど"], correct: 0 },
    { type: "fill", jp: "えっ？サラはパーティーに来[こ]ない？＿＿、ぼくもやめようかな。", en: "Huh? Sara's not coming to the party? Well then, maybe I'll skip it too.", answer: "じゃ" },
    { type: "choice", jp: "A「準備[じゅんび]、終[お]わりました。」B「＿＿＿＿、始[はじ]めましょうか。」", en: "A: \"I'm ready.\" B: \"Well then, shall we begin?\"", options: ["それでは", "それに", "たとえば", "けれど"], correct: 0 },
    { type: "fill", jp: "雨[あめ]が降[ふ]ってきた。＿＿、今日[きょう]は中止[ちゅうし]にしよう。", en: "It's started raining. Well then, let's call it off for today.", answer: "じゃ" },
    { type: "choice", jp: "みんな集[あつ]まりましたね。＿＿＿＿、会議[かいぎ]を始[はじ]めます。", en: "Everyone's gathered. Well then, let's start the meeting.", options: ["それでは", "それに", "たとえば", "だから"], correct: 0 },
  ],

  // ---------- 38課 副詞 ----------
  "まだ・もう": [
    { type: "fill", jp: "トム「昼[ひる]ご飯[はん]はもう食[た]べた？」サラ「ううん、＿＿＿食[た]べていない。」", en: "Tom: \"Have you already eaten lunch?\" Sara: \"No, not yet.\"", answer: "まだ" },
    { type: "choice", jp: "銀行[ぎんこう]は＿＿開[あ]いていますか。", en: "Is the bank still open?", options: ["まだ", "もう", "なかなか", "やっと"], correct: 0 },
    { type: "fill", jp: "4時[じ]だから、＿＿＿しまっていますよ。", en: "It's 4 o'clock, so it's already closed.", answer: "もう" },
    { type: "choice", jp: "これ、おいしい。＿＿一[ひと]つ食[た]べてもいい？", en: "This is delicious. Can I have one more?", options: ["もう", "まだ", "けっこう", "ずいぶん"], correct: 0 },
    { type: "fill", jp: "スープに＿＿＿少[すこ]ししおを入[い]れてください。", en: "Please add a little more salt to the soup.", answer: "もう" },
    { type: "choice", jp: "宿題[しゅくだい]は＿＿終[お]わっていません。", en: "I haven't finished my homework yet.", options: ["まだ", "もう", "やっと", "とうとう"], correct: 0 },
  ],
  "なかなか・やっと・とうとう": [
    { type: "fill", jp: "バスが＿＿＿＿来[き]ません。", en: "The bus just won't come.", answer: "なかなか" },
    { type: "choice", jp: "＿＿仕事[しごと]が終[お]わりました。（苦労[くろう]した後[あと]で）", en: "I finally finished the work, after a struggle.", options: ["やっと", "なかなか", "とうとう", "もう"], correct: 0 },
    { type: "fill", jp: "テレビが＿＿＿＿こわれてしまった。", en: "The TV finally broke down, after a long time.", answer: "とうとう" },
    { type: "choice", jp: "彼[かれ]はいくら誘[さそ]っても＿＿来[こ]なかった。", en: "No matter how much I invited him, he just wouldn't come.", options: ["なかなか", "やっと", "とうとう", "もう"], correct: 0 },
    { type: "fill", jp: "三年間[さんねんかん]頑張[がんば]って、＿＿＿＿試験[しけん]に合格[ごうかく]しました。", en: "After three years of hard work, I finally passed the exam.", answer: "やっと" },
    { type: "choice", jp: "長[なが]い間[あいだ]病気[びょうき]だった祖父[そふ]は、＿＿亡[な]くなってしまった。", en: "My grandfather, who had been ill for a long time, finally passed away.", options: ["とうとう", "なかなか", "やっと", "もう"], correct: 0 },
  ],
  "かならず・きっと・ぜひ": [
    { type: "fill", jp: "わたしはご飯[はん]の後[あと]で、＿＿＿＿はをみがいている。", en: "I always brush my teeth without fail after meals.", answer: "かならず" },
    { type: "choice", jp: "今度[こんど]のテストでは＿＿いいてんがとれるでしょう。", en: "You'll surely get a good grade on the next test.", options: ["きっと", "かならず", "ぜひ", "もう"], correct: 0 },
    { type: "fill", jp: "あしたの試合[しあい]は＿＿＿＿かつぞ！", en: "We will definitely win tomorrow's match!", answer: "かならず" },
    { type: "choice", jp: "トム「＿＿わたしの国[くに]へあそびに来[き]てください。」", en: "Tom: \"Please, by all means, come visit my country.\"", options: ["ぜひ", "かならず", "きっと", "なかなか"], correct: 0 },
    { type: "fill", jp: "彼女[かのじょ]はまじめだから、＿＿＿＿約束[やくそく]を守[まも]る。", en: "She's serious, so she definitely keeps her promises.", answer: "かならず" },
    { type: "choice", jp: "山田[やまだ]「ええ、＿＿行[い]きたいです。」", en: "Yamada: \"Yes, I'd love to go.\"", options: ["ぜひ", "かならず", "きっと", "もう"], correct: 0 },
  ],

  // ---------- 39課 〜すぎます・〜にくいです・〜やすいです ----------
  "〜すぎます・〜にくいです・〜やすいです": [
    { type: "fill", jp: "昨日[きのう]の夜[よる]、食[た]べ＿＿＿＿＿、おなかが痛[いた]いです。（食[た]べる）", en: "I ate too much last night, and my stomach hurts.", answer: "すぎて" },
    { type: "choice", jp: "この漢字[かんじ]は画数[かくすう]が多[おお]くて、覚[おぼ]え＿＿です。", en: "This kanji has a lot of strokes, so it's hard to remember.", options: ["にくい", "やすい", "すぎる", "がたい"], correct: 0 },
    { type: "fill", jp: "この靴[くつ]は軽[かる]くて、歩[ある]き＿＿＿＿です。（歩[ある]く）", en: "These shoes are light and easy to walk in.", answer: "やすい" },
    { type: "choice", jp: "話[はな]し＿＿、のどが痛[いた]くなりました。", en: "I talked too much, and my throat started to hurt.", options: ["すぎて", "にくくて", "やすくて", "がたくて"], correct: 0 },
    { type: "fill", jp: "先生[せんせい]の説明[せつめい]はいつも分[わ]かり＿＿＿＿です。（分[わ]かる）", en: "The teacher's explanations are always easy to understand.", answer: "やすい" },
    { type: "choice", jp: "この道[みち]は暗[くら]くて、夜[よる]は歩[ある]き＿＿です。", en: "This road is dark, so it's hard to walk at night.", options: ["にくい", "やすい", "すぎる", "っぽい"], correct: 0 },
  ],

  // ---------- 40課 品詞 ----------
  "名詞⇔動詞": [
    { type: "fill", jp: "料理[りょうり]は好[す]きですが、＿＿＿＿は好[す]きではありません。（そうじする）", en: "I like cooking, but I don't like cleaning.", answer: "そうじ" },
    { type: "choice", jp: "帰[かえ]りの＿＿はもう買[か]いました。", en: "I've already bought the return ticket.", options: ["きっぷ", "きっぷする", "きっぷして", "きっぷされ"], correct: 0 },
    { type: "fill", jp: "＿＿＿＿は楽[たの]しいですよ。（山[やま]にのぼる）", en: "Mountain climbing is fun.", answer: "山のぼり" },
    { type: "choice", jp: "毎朝[まいあさ]の＿＿は健康[けんこう]にいいです。", en: "My morning walk is good for my health.", options: ["散歩", "散歩する", "散歩して", "散歩され"], correct: 0 },
    { type: "fill", jp: "彼[かれ]の＿＿＿＿はとても上手[じょうず]です。（料理[りょうり]する）", en: "His cooking is very good.", answer: "料理" },
    { type: "choice", jp: "週末[しゅうまつ]はいつも家[いえ]で＿＿をします。", en: "On weekends I always do cleaning at home.", options: ["そうじ", "そうじする", "そうじして", "そうじされ"], correct: 0 },
  ],
  "名詞⇔形容詞": [
    { type: "fill", jp: "東京[とうきょう]スカイツリーの＿＿＿は634メートルです。（高[たか]い）", en: "The height of the Tokyo Skytree is 634 meters.", answer: "高さ" },
    { type: "choice", jp: "場所[ばしょ]の＿＿を考[かんが]えて、ホテルをえらびます。", en: "I'll choose the hotel considering the convenience of the location.", options: ["べんりさ", "べんりな", "べんりに", "べんりだ"], correct: 0 },
    { type: "fill", jp: "この問題[もんだい]の＿＿＿＿は分[わ]かりません。（難[むずか]しい）", en: "I don't know how difficult this problem is.", answer: "難しさ" },
    { type: "choice", jp: "荷物[にもつ]の＿＿を測[はか]ってください。", en: "Please measure the weight of the luggage.", options: ["重さ", "重い", "重く", "重くて"], correct: 0 },
    { type: "fill", jp: "部屋[へや]の＿＿＿＿にびっくりしました。（広[ひろ]い）", en: "I was surprised by how spacious the room was.", answer: "広さ" },
    { type: "choice", jp: "値段[ねだん]の＿＿を比[くら]べてみましょう。", en: "Let's compare the prices.", options: ["高さ", "高い", "高く", "高くて"], correct: 0 },
  ],
  "副詞⇔形容詞": [
    { type: "fill", jp: "みんなで＿＿＿話[はな]しましょう。（楽[たの]しい）", en: "Let's all chat happily together.", answer: "楽しく" },
    { type: "choice", jp: "手[て]を＿＿あらってください。", en: "Please wash your hands thoroughly.", options: ["きれいに", "きれいな", "きれいだ", "きれいの"], correct: 0 },
    { type: "fill", jp: "もっと＿＿＿＿字[じ]を書[か]いてください。（大[おお]きい）", en: "Please write in bigger letters.", answer: "大きく" },
    { type: "choice", jp: "部屋[へや]を＿＿片付[かたづ]けました。", en: "I tidied the room quietly.", options: ["静かに", "静かな", "静かだ", "静かの"], correct: 0 },
    { type: "fill", jp: "彼[かれ]はいつも＿＿＿＿話[はな]します。（優[やさ]しい）", en: "He always speaks kindly.", answer: "優しく" },
    { type: "choice", jp: "荷物[にもつ]を＿＿運[はこ]んでください。", en: "Please carry the luggage carefully.", options: ["丁寧に", "丁寧な", "丁寧だ", "丁寧の"], correct: 0 },
  ],
  "名詞⇔文": [
    { type: "choice", jp: "友[とも]だちと話[はな]す＿＿は楽[たの]しいです。", en: "Talking with friends is fun.", options: ["こと", "とき", "ため", "あいだ"], correct: 0 },
    { type: "fill", jp: "トムさんと会[あ]うやくそくをした＿＿＿＿をわすれていました。", en: "I had forgotten that I'd made a promise to meet Tom.", answer: "こと" },
    { type: "choice", jp: "毎日[まいにち]運動[うんどう]する＿＿は体[からだ]にいいです。", en: "Exercising every day is good for your health.", options: ["の", "とき", "ため", "あいだ"], correct: 0 },
    { type: "fill", jp: "漢字[かんじ]を書[か]く＿＿＿＿は難[むずか]しいです。", en: "Writing kanji is difficult.", answer: "の" },
    { type: "choice", jp: "早[はや]く寝[ね]る＿＿は大切[たいせつ]です。", en: "Going to bed early is important.", options: ["こと", "とき", "ところ", "ため"], correct: 0 },
    { type: "fill", jp: "音楽[おんがく]を聞[き]く＿＿＿＿が好[す]きです。", en: "I like listening to music.", answer: "の" },
  ],
};
