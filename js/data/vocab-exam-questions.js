// Hand-authored question bank for the Exam tab's vocab meaning-in-context
// phase — entirely local, no API/network needed. Keyed by level, then by
// the exact word string used in vocab-data.js.
//
// Each word maps to an array of questions covering up to 5 categories
// (skip whichever don't naturally fit a given word — simple kana-only
// words / adverbs typically only get 2-3):
//   - "kanji"       — 漢字・語彙: sentence hides which word is being
//                     tested; distractors trick by SOUND (same on-reading
//                     prefix, for する-verbs) or by KANJI SHAPE (same
//                     first kanji / plausible-but-invented compounds are
//                     fine here — they're never presented as real
//                     vocabulary elsewhere, only as wrong answers).
//   - "usage"       — 使い方: word is named in the prompt; the 4 options
//                     are full candidate sentences, one correct usage and
//                     three with a real grammar/particle/register error.
//   - "particle"    — 助詞: word is shown in the sentence; blank is the
//                     particle it takes.
//   - "collocation" — コロケーション: blank is the natural companion
//                     word/adverb that pairs with the target.
//   - "grammar"     — 関連語・文法: blank is a related derived form
//                     (adverbial/noun/na-adjective form, compound, etc).
//
// Each question is { type, sentence, distractors, answer? }:
//  - sentence: the Japanese text. For "kanji"/"particle"/"collocation"/
//    "grammar" it has a blank marked "＿＿", with every kanji run
//    annotated furigana-bracket-style immediately after the kanji, e.g.
//    "毎日[まいにち]". For "usage" it's the prompt question instead
//    (e.g. "「心配する」の正しい使い方はどれですか。").
//  - distractors: exactly 3 wrong option strings.
//  - answer: the correct option string. Omit it ONLY for "kanji"-type
//    questions testing the word itself — it then defaults to the word.
//    Every other type must set it explicitly (a particle, a collocate, a
//    related form, or — for "usage" — the correct full sentence).
window.VOCAB_EXAM_QUESTIONS = {
  N4: {
    // ---------- 1課 人と人① ----------
    "夫": [
      { type: "kanji", sentence: "彼女[かのじょ]の＿＿は、来月[らいげつ]海外[かいがい]へ出張[しゅっちょう]するそうです。", distractors: ["妻", "(ご)主人", "息子"] },
      { type: "usage", sentence: "「夫」の正しい使い方はどれですか。", answer: "私の夫は毎日会社で働いています。", distractors: ["私の夫さんは毎日会社で働いています。", "私は夫にお弁当を作られました。", "私の夫はいつも会社が働いています。"] },
      { type: "particle", sentence: "夫[おっと]＿＿仕事[しごと]で忙[いそが]しいです。", answer: "は", distractors: ["を", "に", "で"] }
    ],
    "妻": [
      { type: "kanji", sentence: "彼[かれ]の＿＿は看護師[かんごし]として働[はたら]いています。", distractors: ["夫", "娘", "祖母"] },
      { type: "usage", sentence: "「妻」の正しい使い方はどれですか。", answer: "私の妻は料理が得意です。", distractors: ["私の妻さんは料理が得意です。", "私は妻に褒められさせました。", "私の妻は料理を得意です。"] },
      { type: "particle", sentence: "妻[つま]＿＿一緒[いっしょ]に旅行[りょこう]に行[い]きました。", answer: "と", distractors: ["に", "を", "が"] }
    ],
    "僕": [
      { type: "kanji", sentence: "＿＿は毎朝[まいあさ]六時[ろくじ]に起[お]きます。", distractors: ["私", "君", "彼"] },
      { type: "usage", sentence: "「僕」の正しい使い方はどれですか。", answer: "僕は毎日日本語を勉強しています。", distractors: ["僕さんは毎日日本語を勉強しています。", "僕が僕の本を読みます。", "これは僕の私です。"] }
    ],
    "髪": [
      { type: "kanji", sentence: "彼女[かのじょ]は＿＿がとても長[なが]いです。", distractors: ["顔", "声", "手"] },
      { type: "collocation", sentence: "美容院[びよういん]で髪[かみ]を＿＿もらいました。", answer: "切って", distractors: ["折って", "破って", "割って"] },
      { type: "particle", sentence: "彼女[かのじょ]は髪[かみ]＿＿長[なが]くしたいと思[おも]っています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "のど": [
      { type: "kanji", sentence: "風邪[かぜ]をひいて、＿＿が痛[いた]いです。", distractors: ["声", "頭", "気分"] },
      { type: "collocation", sentence: "のどが＿＿ので、水[みず]を飲[の]みました。", answer: "渇いた", distractors: ["濡れた", "冷たい", "汚れた"] },
      { type: "particle", sentence: "歌[うた]いすぎて、のど＿＿痛[いた]くなりました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "熱": [
      { type: "kanji", sentence: "昨日[きのう]から＿＿があって、学校[がっこう]を休[やす]んでいます。", distractors: ["のど", "気分", "力"] },
      { type: "usage", sentence: "「熱」の正しい使い方はどれですか。", answer: "今日は熱があるので、病院に行きます。", distractors: ["今日は熱をあるので、病院に行きます。", "今日は熱にあるので、病院に行きます。", "今日は熱でいるので、病院に行きます。"] },
      { type: "particle", sentence: "子供[こども]が熱＿＿出[だ]して、心配[しんぱい]しています。", answer: "を", distractors: ["が", "に", "で"] },
      { type: "collocation", sentence: "薬[くすり]を飲[の]んだら、熱[ねつ]が＿＿。", answer: "下がりました", distractors: ["落ちました", "消えました", "止まりました"] },
      { type: "grammar", sentence: "熱[ねつ]を＿＿ときは、水[みず]をたくさん飲[の]んでください。", answer: "出した", distractors: ["出て", "出せば", "出そう"] }
    ],
    "(ご)主人": [
      { type: "kanji", sentence: "田中[たなか]さんの＿＿はとても親切[しんせつ]な方[かた]です。", distractors: ["夫", "息子", "祖父"] },
      { type: "usage", sentence: "「ご主人」の正しい使い方はどれですか。", answer: "山田さんのご主人は医者だそうです。", distractors: ["私のご主人は医者です。", "山田さんのご主人さんは医者だそうです。", "山田さんはご主人を医者です。"] },
      { type: "particle", sentence: "奥[おく]さんのご主人[しゅじん]＿＿、来月[らいげつ]退職[たいしょく]するそうです。", answer: "は", distractors: ["を", "に", "で"] }
    ],
    "紹介する": [
      { type: "kanji", sentence: "友達[ともだち]にガールフレンドを＿＿しました。", distractors: ["承諾する", "招待する", "消化する"] },
      { type: "usage", sentence: "「紹介する」の正しい使い方はどれですか。", answer: "田中さんに新しい社員を紹介しました。", distractors: ["田中さんが新しい社員を紹介させました。", "田中さんを新しい社員に紹介しました。", "田中さんは新しい社員が紹介しました。"] },
      { type: "particle", sentence: "先生[せんせい]が新[あたら]しい学生[がくせい]をクラス＿＿紹介[しょうかい]しました。", answer: "に", distractors: ["を", "が", "で"] },
      { type: "collocation", sentence: "パーティーで＿＿紹介[しょうかい]し合[あ]いました。", answer: "お互いに", distractors: ["一人で", "全部", "少し"] },
      { type: "grammar", sentence: "会議[かいぎ]の前[まえ]に、＿＿紹介[しょうかい]をしました。", answer: "自己", distractors: ["他己", "自分", "他人"] }
    ],
    "心配する": [
      { type: "kanji", sentence: "母[はは]は私[わたし]の健康[けんこう]をいつも＿＿している。", distractors: ["信頼する", "審判する", "心理する"] },
      { type: "usage", sentence: "「心配する」の正しい使い方はどれですか。", answer: "母は私のことをいつも心配しています。", distractors: ["母は私に心配しています。", "母は私を心配になります。", "母は私が心配をします。"] },
      { type: "particle", sentence: "母[はは]は私[わたし]の健康[けんこう]＿＿心配[しんぱい]しています。", answer: "を", distractors: ["に", "が", "で"] },
      { type: "collocation", sentence: "息子[むすこ]の帰[かえ]りが遅[おそ]くて、＿＿心配[しんぱい]している。", answer: "とても", distractors: ["全然", "あまり", "だいたい"] },
      { type: "grammar", sentence: "そんなに＿＿顔[かお]をしないでください。", answer: "心配な", distractors: ["心配", "心配して", "心配だ"] }
    ],
    "もらう": [
      { type: "kanji", sentence: "誕生日[たんじょうび]に友達[ともだち]からプレゼントを＿＿ました。", distractors: ["くれる", "あげる", "いただく"] },
      { type: "particle", sentence: "友達[ともだち]＿＿誕生日[たんじょうび]プレゼントをもらいました。", answer: "から", distractors: ["に", "を", "で"] },
      { type: "usage", sentence: "「もらう」の正しい使い方はどれですか。", answer: "私は友達から本をもらいました。", distractors: ["友達は私に本をもらいました。", "私は友達から本をもらわれました。", "私は友達から本をもらいてもらいました。"] }
    ],
    "くれる": [
      { type: "kanji", sentence: "友達[ともだち]がお土産[みやげ]を＿＿ました。", distractors: ["もらう", "あげる", "いただく"] },
      { type: "particle", sentence: "友達[ともだち]が私[わたし]＿＿誕生日[たんじょうび]プレゼントをくれました。", answer: "に", distractors: ["を", "が", "で"] },
      { type: "usage", sentence: "「くれる」の正しい使い方はどれですか。", answer: "友達が私にお土産をくれました。", distractors: ["私が友達にお土産をくれました。", "友達が私にお土産をくれられました。", "友達が私にお土産をくれさせました。"] }
    ],
    "連れて行く": [
      { type: "kanji", sentence: "子供[こども]を動物園[どうぶつえん]に＿＿ました。", distractors: ["連れて来る", "持って行く", "送って行く"] },
      { type: "usage", sentence: "「連れて行く」の正しい使い方はどれですか。", answer: "子供を公園に連れて行きました。", distractors: ["子供が公園に連れて行きました。", "子供を公園に連れて行かれました。", "子供を公園で連れて行きました。"] },
      { type: "particle", sentence: "友達[ともだち]をお祭[まつ]り＿＿連[つ]れて行[い]きました。", answer: "に", distractors: ["を", "が", "で"] },
      { type: "collocation", sentence: "子供[こども]を＿＿動物園[どうぶつえん]に連[つ]れて行[い]きました。", answer: "よく", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "手伝う": [
      { type: "kanji", sentence: "母[はは]の料理[りょうり]を＿＿ました。", distractors: ["手合ふ", "手待つ", "手洗う"] },
      { type: "usage", sentence: "「手伝う」の正しい使い方はどれですか。", answer: "母の家事を手伝いました。", distractors: ["母の家事に手伝いました。", "母の家事を手伝われました。", "母は家事を手伝かいました。"] },
      { type: "particle", sentence: "引[ひ]っ越[こ]し＿＿手伝[てつだ]ってもらいました。", answer: "を", distractors: ["に", "が", "で"] },
      { type: "collocation", sentence: "忙[いそが]しいときは、いつも＿＿手伝[てつだ]ってくれます。", answer: "よく", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "若い": [
      { type: "kanji", sentence: "彼[かれ]はまだ＿＿ので、経験[けいけん]が少[すく]ないです。", distractors: ["高い", "悪い", "甘い"] },
      { type: "usage", sentence: "「若い」の正しい使い方はどれですか。", answer: "彼はまだ若いですが、とても優秀です。", distractors: ["彼はまだ若いくてとても優秀です。", "彼はまだ若いだったですが、とても優秀です。", "彼はまだ若いそうにみえます。"] },
      { type: "grammar", sentence: "彼女[かのじょ]は年[とし]より＿＿見[み]えます。", answer: "若く", distractors: ["若い", "若さ", "若くて"] }
    ],
    "寂しい": [
      { type: "kanji", sentence: "一人[ひとり]で暮[く]らすのは＿＿です。", distractors: ["楽しい", "忙しい", "悲しい"] },
      { type: "usage", sentence: "「寂しい」の正しい使い方はどれですか。", answer: "友達がいなくて寂しいです。", distractors: ["友達がいなくて寂しいくないです。", "友達がいなくて寂しいでした。", "友達がいなくて寂しいさを感じます。"] },
      { type: "grammar", sentence: "彼[かれ]が引[ひ]っ越[こ]して、＿＿を感[かん]じています。", answer: "寂しさ", distractors: ["寂しい", "寂しく", "寂しかった"] }
    ],

    // ---------- 2課 趣味① ----------
    "趣味": [
      { type: "kanji", sentence: "私[わたし]の＿＿は写真[しゃしん]を撮[と]ることです。", distractors: ["趣旨", "主義", "首位"] },
      { type: "usage", sentence: "「趣味」の正しい使い方はどれですか。", answer: "私の趣味は写真を撮ることです。", distractors: ["私は趣味が写真を撮ることをします。", "私の趣味を写真を撮ることです。", "私の趣味は写真を撮ることにします。"] },
      { type: "particle", sentence: "あなた＿＿趣味[しゅみ]は何[なん]ですか。", answer: "の", distractors: ["が", "を", "に"] }
    ],
    "美術館": [
      { type: "kanji", sentence: "週末[しゅうまつ]に＿＿へ絵[え]を見[み]に行[い]きました。", distractors: ["博物館", "図書館", "美容院"] },
      { type: "usage", sentence: "「美術館」の正しい使い方はどれですか。", answer: "美術館で有名な絵を見ました。", distractors: ["美術館を有名な絵を見ました。", "美術館に有名な絵がいます。", "美術館は有名な絵を見ました。"] },
      { type: "particle", sentence: "週末[しゅうまつ]、美術館[びじゅつかん]＿＿絵[え]を見[み]に行[い]きました。", answer: "へ", distractors: ["を", "が", "で"] }
    ],
    "(お)花見": [
      { type: "kanji", sentence: "春[はる]になったら、＿＿に行[い]きましょう。", distractors: ["(お)祭り", "(お)正月", "ハイキング"] },
      { type: "collocation", sentence: "(お)花見[はなみ]は＿＿の時期[じき]にします。", answer: "春", distractors: ["夏", "秋", "冬"] }
    ],
    "コンサート": [
      { type: "kanji", sentence: "昨日[きのう]、有名[ゆうめい]な歌手[かしゅ]の＿＿に行[い]きました。", distractors: ["展覧会", "試合", "番組"] },
      { type: "collocation", sentence: "コンサートが＿＿始[はじ]まりました。", answer: "もうすぐ", distractors: ["だいたい", "なかなか", "たいてい"] }
    ],
    "ダンス": [
      { type: "kanji", sentence: "妹[いもうと]は毎週[まいしゅう]＿＿を習[なら]っています。", distractors: ["運動", "練習", "スキー"] },
      { type: "collocation", sentence: "ダンスの発表会[はっぴょうかい]で＿＿踊[おど]りました。", answer: "上手に", distractors: ["下手に", "大変に", "十分に"] }
    ],
    "スキー": [
      { type: "kanji", sentence: "冬[ふゆ]になったら、家族[かぞく]で＿＿に行[い]きます。", distractors: ["ダンス", "ハイキング", "旅行"] },
      { type: "collocation", sentence: "スキーで＿＿転[ころ]びました。", answer: "たくさん", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "ビデオ": [
      { type: "kanji", sentence: "結婚式[けっこんしき]の＿＿を撮[と]りました。", distractors: ["ドラマ", "番組", "写真"] },
      { type: "particle", sentence: "息子[むすこ]の運動会[うんどうかい]＿＿ビデオを撮[と]りました。", answer: "の", distractors: ["を", "が", "に"] }
    ],
    "アニメ": [
      { type: "kanji", sentence: "息子[むすこ]は毎週[まいしゅう]＿＿を見[み]ています。", distractors: ["マンガ", "ドラマ", "ゲーム"] },
      { type: "collocation", sentence: "そのアニメは＿＿人気[にんき]があります。", answer: "とても", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "マンガ": [
      { type: "kanji", sentence: "息子[むすこ]は＿＿を読[よ]むのが好[す]きです。", distractors: ["アニメ", "小説", "日記"] },
      { type: "collocation", sentence: "そのマンガを＿＿読[よ]みました。", answer: "一気に", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "日記": [
      { type: "kanji", sentence: "毎晩[まいばん]寝[ね]る前[まえ]に＿＿を書[か]きます。", distractors: ["手紙", "小説", "レポート"] },
      { type: "particle", sentence: "日記[にっき]＿＿今日[きょう]あったことを書[か]きました。", answer: "に", distractors: ["を", "が", "で"] },
      { type: "collocation", sentence: "旅行中[りょこうちゅう]、＿＿日記[にっき]をつけていました。", answer: "毎日", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "試合する": [
      { type: "kanji", sentence: "私[わたし]たちのチームは強[つよ]いチームと＿＿しました。", distractors: ["試着する", "準備する", "練習する"] },
      { type: "usage", sentence: "「試合する」の正しい使い方はどれですか。", answer: "私たちのチームは強いチームと試合しました。", distractors: ["私たちのチームは強いチームを試合しました。", "私たちのチームは強いチームと試合されました。", "私たちのチームは強いチームと試合させました。"] },
      { type: "particle", sentence: "私[わたし]たちのチームは強[つよ]いチーム＿＿試合[しあい]しました。", answer: "と", distractors: ["を", "が", "に"] },
      { type: "collocation", sentence: "明日[あした]、＿＿な試合[しあい]があります。", answer: "大切", distractors: ["心配", "便利", "熱心"] }
    ],
    "放送する": [
      { type: "kanji", sentence: "その番組[ばんぐみ]は毎週[まいしゅう]土曜日[どようび]に＿＿されます。", distractors: ["包装する", "訪問する", "解放する"] },
      { type: "usage", sentence: "「放送する」の正しい使い方はどれですか。", answer: "その番組は毎週土曜日に放送されます。", distractors: ["その番組は毎週土曜日を放送されます。", "その番組は毎週土曜日に放送させます。", "その番組は毎週土曜日で放送されます。"] },
      { type: "particle", sentence: "好[す]きな番組[ばんぐみ]が夜[よる]九時[くじ]＿＿放送[ほうそう]されます。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "集める": [
      { type: "kanji", sentence: "息子[むすこ]は切手[きって]を＿＿のが好[す]きです。", distractors: ["選ぶ", "並べる", "調べる"] },
      { type: "usage", sentence: "「集める」の正しい使い方はどれですか。", answer: "息子は切手を集めるのが好きです。", distractors: ["息子は切手が集めるのが好きです。", "息子は切手を集まるのが好きです。", "息子は切手を集めさせるのが好きです。"] },
      { type: "particle", sentence: "会議[かいぎ]の前[まえ]に資料[しりょう]＿＿集[あつ]めました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "ぜひ": [
      { type: "usage", sentence: "「ぜひ」の正しい使い方はどれですか。", answer: "この本はぜひ読んでみてください。", distractors: ["この本はぜひを読んでみてください。", "この本はぜひが読んでみてください。", "この本はぜひで読んでみてください。"] },
      { type: "collocation", sentence: "＿＿一度[いちど]食[た]べてみてください、おいしいですよ。", answer: "ぜひ", distractors: ["だいたい", "たいてい", "なかなか"] }
    ],
    "一度": [
      { type: "usage", sentence: "「一度」の正しい使い方はどれですか。", answer: "その映画は一度見たことがあります。", distractors: ["その映画は一度に見たことがあります。", "その映画は一度を見たことがあります。", "その映画は一度が見たことがあります。"] },
      { type: "collocation", sentence: "一度[いちど]決[き]めたら、＿＿変[か]えません。", answer: "絶対に", distractors: ["全然", "あまり", "だいたい"] }
    ],

    // ---------- 3課 趣味② ----------
    "船": [
      { type: "kanji", sentence: "港[みなと]から＿＿に乗[の]って島[しま]へ行[い]きました。", distractors: ["舟", "空港", "交通"] },
      { type: "usage", sentence: "「船」の正しい使い方はどれですか。", answer: "船で島に行きました。", distractors: ["船を島に行きました。", "船に島に行きました。", "船が島に行きました。"] },
      { type: "particle", sentence: "港[みなと]から船[ふね]＿＿乗[の]りました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "空港": [
      { type: "kanji", sentence: "友達[ともだち]を＿＿まで送[おく]りました。", distractors: ["港", "駐車場", "会場"] },
      { type: "usage", sentence: "「空港」の正しい使い方はどれですか。", answer: "空港まで友達を送りました。", distractors: ["空港を友達を送りました。", "空港に友達が送りました。", "空港は友達を送りました。"] },
      { type: "particle", sentence: "飛行機[ひこうき]に乗[の]るために、空港[くうこう]＿＿行[い]きました。", answer: "へ", distractors: ["を", "が", "で"] }
    ],
    "急行": [
      { type: "kanji", sentence: "この＿＿に乗[の]れば、早[はや]く着[つ]きます。", distractors: ["交通", "空港", "世界"] },
      { type: "particle", sentence: "駅[えき]で急行[きゅうこう]＿＿乗[の]りました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "交通": [
      { type: "kanji", sentence: "この町[まち]は＿＿がとても便利[べんり]です。", distractors: ["急行", "空港", "世界"] },
      { type: "usage", sentence: "「交通」の正しい使い方はどれですか。", answer: "この町は交通がとても便利です。", distractors: ["この町は交通をとても便利です。", "この町は交通にとても便利です。", "この町は交通がとても便利にします。"] },
      { type: "particle", sentence: "この町[まち]は交通[こうつう]＿＿便利[べんり]です。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "神社": [
      { type: "kanji", sentence: "お正月[しょうがつ]に＿＿へお参[まい]りに行[い]きました。", distractors: ["(お)寺", "教会", "美術館"] },
      { type: "usage", sentence: "「神社」の正しい使い方はどれですか。", answer: "神社で祈りました。", distractors: ["神社を祈りました。", "神社は祈りました。", "神社が祈りました。"] },
      { type: "particle", sentence: "お正月[しょうがつ]に神社[じんじゃ]＿＿お参[まい]りに行[い]きました。", answer: "へ", distractors: ["を", "が", "で"] }
    ],
    "世界": [
      { type: "kanji", sentence: "この本[ほん]は＿＿中[じゅう]で読[よ]まれています。", distractors: ["世代", "世紀", "業界"] },
      { type: "usage", sentence: "「世界」の正しい使い方はどれですか。", answer: "この本は世界中で読まれています。", distractors: ["この本は世界中を読まれています。", "この本は世界中に読まれています。", "この本は世界中が読まれています。"] },
      { type: "particle", sentence: "日本[にほん]のアニメは世界＿＿人気[にんき]です。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "予約する": [
      { type: "kanji", sentence: "レストラン＿＿しました。", distractors: ["要約する", "予測する", "約束する"] },
      { type: "usage", sentence: "「予約する」の正しい使い方はどれですか。", answer: "レストランを予約しました。", distractors: ["レストランに予約しました。", "レストランが予約しました。", "レストランを予約されました。"] },
      { type: "particle", sentence: "友達[ともだち]といい医者[いしゃ]＿＿予約[よやく]しました。", answer: "を", distractors: ["に", "が", "で"] },
      { type: "collocation", sentence: "ホテルを＿＿予約[よやく]しました。", answer: "すぐに", distractors: ["全然", "あまり", "だいたい"] }
    ],
    "案内する": [
      { type: "kanji", sentence: "留学生[りゅうがくせい]を神社[じんじゃ]に＿＿しました。", distractors: ["安心する", "暗記する", "準備する"] },
      { type: "usage", sentence: "「案内する」の正しい使い方はどれですか。", answer: "留学生を神社に案内しました。", distractors: ["留学生を神社が案内しました。", "留学生に神社を案内されました。", "留学生を神社に案内させました。"] },
      { type: "particle", sentence: "留学生[りゅうがくせい]を神社[じんじゃ]＿＿案内[あんない]しました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "準備する": [
      { type: "kanji", sentence: "会議[かいぎ]のために資料[しりょう]を＿＿しました。", distractors: ["出席する", "予約する", "研究する"] },
      { type: "usage", sentence: "「準備する」の正しい使い方はどれですか。", answer: "会議のために資料を準備しました。", distractors: ["会議のために資料が準備しました。", "会議のために資料を準備されました。", "会議のために資料を準備させました。"] },
      { type: "particle", sentence: "会議[かいぎ]の前[まえ]に資料[しりょう]＿＿準備[じゅんび]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "動く": [
      { type: "kanji", sentence: "このスイッチを押[お]すと、機械[きかい]が＿＿ます。", distractors: ["止まる", "壊れる", "消える"] },
      { type: "usage", sentence: "「動く」の正しい使い方はどれですか。", answer: "この機械は電気で動きます。", distractors: ["この機械は電気を動きます。", "この機械は電気に動かれます。", "この機械は電気が動かせます。"] },
      { type: "particle", sentence: "このスイッチ＿＿押[お]すと、機械[きかい]が動[うご]きます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "泊まる": [
      { type: "kanji", sentence: "京都[きょうと]で旅館[りょかん]に＿＿ました。", distractors: ["止まる", "泊める", "止める"] },
      { type: "usage", sentence: "「泊まる」の正しい使い方はどれですか。", answer: "旅館に泊まりました。", distractors: ["旅館を泊まりました。", "旅館で泊まりました。", "旅館が泊まりました。"] },
      { type: "particle", sentence: "京都[きょうと]で旅館[りょかん]＿＿泊[と]まりました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "乗り換える": [
      { type: "kanji", sentence: "次[つぎ]の駅[えき]で電車[でんしゃ]を＿＿ます。", distractors: ["乗り遅れる", "乗り越す", "取り替える"] },
      { type: "usage", sentence: "「乗り換える」の正しい使い方はどれですか。", answer: "次の駅で電車を乗り換えます。", distractors: ["次の駅で電車が乗り換えます。", "次の駅で電車に乗り換えられます。", "次の駅に電車を乗り換えます。"] },
      { type: "particle", sentence: "次[つぎ]の駅[えき]＿＿電車[でんしゃ]を乗[の]り換[か]えます。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "止める": [
      { type: "kanji", sentence: "車[くるま]をここに＿＿もいいですか。", distractors: ["止まる", "泊まる", "停める"] },
      { type: "usage", sentence: "「止める」の正しい使い方はどれですか。", answer: "車をここに止めてもいいですか。", distractors: ["車がここに止めてもいいですか。", "車をここに止まってもいいですか。", "車をここで止めってもいいですか。"] },
      { type: "particle", sentence: "車[くるま]＿＿ここに止[と]めてもいいですか。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "残念": [
      { type: "kanji", sentence: "旅行[りょこう]に行[い]けなくて＿＿です。", distractors: ["心配", "大変", "不便"] },
      { type: "usage", sentence: "「残念」の正しい使い方はどれですか。", answer: "旅行に行けなくて残念です。", distractors: ["旅行に行けなくて残念くないです。", "旅行に行けなくて残念いです。", "旅行に行けなくて残念かったです。"] }
    ],
    "もうすぐ": [
      { type: "usage", sentence: "「もうすぐ」の正しい使い方はどれですか。", answer: "もうすぐ夏休みです。", distractors: ["もうすぐを夏休みです。", "もうすぐが夏休みです。", "もうすぐに夏休みです。"] },
      { type: "collocation", sentence: "電車[でんしゃ]は＿＿到着[とうちゃく]します。", answer: "もうすぐ", distractors: ["だいたい", "たいてい", "なかなか"] }
    ],

    // ---------- 4課 生活① ----------
    "棚": [
      { type: "kanji", sentence: "本[ほん]を＿＿に置[お]きました。", distractors: ["引き出し", "机", "押入れ"] },
      { type: "usage", sentence: "「棚」の正しい使い方はどれですか。", answer: "本を棚に置きました。", distractors: ["本を棚が置きました。", "本を棚を置きました。", "本を棚で置きました。"] },
      { type: "particle", sentence: "本[ほん]を棚[たな]＿＿置[お]きました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "スイッチ": [
      { type: "kanji", sentence: "電気[でんき]の＿＿を押[お]しました。", distractors: ["リモコン", "ボタン", "コンセント"] },
      { type: "particle", sentence: "電気[でんき]のスイッチ＿＿押[お]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "パソコン": [
      { type: "kanji", sentence: "新[あたら]しい＿＿を買[か]いました。", distractors: ["コンピューター", "テレビ", "スマホ"] },
      { type: "usage", sentence: "「パソコン」の正しい使い方はどれですか。", answer: "パソコンで宿題をします。", distractors: ["パソコンを宿題をします。", "パソコンに宿題をします。", "パソコンが宿題をします。"] }
    ],
    "布団": [
      { type: "kanji", sentence: "毎朝[まいあさ]＿＿をたたみます。", distractors: ["毛布", "シーツ", "枕"] },
      { type: "particle", sentence: "毎朝[まいあさ]布団[ふとん]＿＿たたみます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "ごみ": [
      { type: "kanji", sentence: "＿＿を捨[す]ててください。", distractors: ["荷物", "忘れ物", "洗濯物"] },
      { type: "particle", sentence: "ごみ＿＿捨[す]ててください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "住所": [
      { type: "kanji", sentence: "この紙[かみ]に＿＿を書[か]いてください。", distractors: ["名前", "電話番号", "意味"] },
      { type: "usage", sentence: "「住所」の正しい使い方はどれですか。", answer: "この紙に住所を書いてください。", distractors: ["この紙は住所を書いてください。", "この紙に住所が書いてください。", "この紙を住所を書いてください。"] }
    ],
    "修理する": [
      { type: "kanji", sentence: "壊[こわ]れたパソコンを＿＿しました。", distractors: ["習得する", "集中する", "終了する"] },
      { type: "usage", sentence: "「修理する」の正しい使い方はどれですか。", answer: "壊れたパソコンを修理しました。", distractors: ["壊れたパソコンが修理しました。", "壊れたパソコンを修理されました。", "壊れたパソコンを修理させました。"] },
      { type: "particle", sentence: "壊[こわ]れたパソコン＿＿修理[しゅうり]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "故障する": [
      { type: "kanji", sentence: "パソコンが＿＿しました。", distractors: ["呼称する", "交渉する", "誇張する"] },
      { type: "usage", sentence: "「故障する」の正しい使い方はどれですか。", answer: "パソコンが故障しました。", distractors: ["パソコンを故障しました。", "パソコンに故障しました。", "パソコンで故障しました。"] },
      { type: "particle", sentence: "パソコン＿＿故障[こしょう]しました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "引っ越しする": [
      { type: "kanji", sentence: "来月[らいげつ]、新[あたら]しい家[いえ]に＿＿します。", distractors: ["引き出し", "引き受ける", "修理する"] },
      { type: "usage", sentence: "「引っ越しする」の正しい使い方はどれですか。", answer: "来月、新しい家に引っ越しします。", distractors: ["来月、新しい家を引っ越しします。", "来月、新しい家に引っ越しされます。", "来月、新しい家に引っ越しさせます。"] },
      { type: "particle", sentence: "来月[らいげつ]、新[あたら]しい家[いえ]＿＿引[ひ]っ越[こ]しします。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "役に立つ": [
      { type: "kanji", sentence: "この辞書[じしょ]はとても＿＿ます。", distractors: ["立つ", "目に立つ", "気に入る"] },
      { type: "usage", sentence: "「役に立つ」の正しい使い方はどれですか。", answer: "この辞書はとても役に立ちます。", distractors: ["この辞書はとても役に立てます。", "この辞書はとても役が立ちます。", "この辞書はとても役を立ちます。"] }
    ],
    "捨てる": [
      { type: "kanji", sentence: "古[ふる]い服[ふく]を＿＿ました。", distractors: ["拾う", "忘れる", "汚れる"] },
      { type: "particle", sentence: "古[ふる]い服[ふく]＿＿捨[す]てました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "つける": [
      { type: "kanji", sentence: "部屋[へや]が暗[くら]いので、電気[でんき]を＿＿ください。", distractors: ["消す", "つく", "開く"] },
      { type: "usage", sentence: "「つける」の正しい使い方はどれですか。", answer: "電気をつけてください。", distractors: ["電気がつけてください。", "電気につけてください。", "電気をつきてください。"] }
    ],
    "消す": [
      { type: "kanji", sentence: "寝[ね]る前[まえ]に電気[でんき]を＿＿ください。", distractors: ["つける", "消える", "忘れる"] },
      { type: "particle", sentence: "寝[ね]る前[まえ]に電気[でんき]＿＿消[け]してください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "すてき": [
      { type: "usage", sentence: "「すてき」の正しい使い方はどれですか。", answer: "すてきな部屋ですね。", distractors: ["すてきの部屋ですね。", "すてきい部屋ですね。", "すてきだ部屋ですね。"] }
    ],
    "そろそろ": [
      { type: "usage", sentence: "「そろそろ」の正しい使い方はどれですか。", answer: "そろそろ帰りましょう。", distractors: ["そろそろを帰りましょう。", "そろそろが帰りましょう。", "そろそろに帰りましょう。"] },
      { type: "collocation", sentence: "時間[じかん]なので、＿＿失礼[しつれい]します。", answer: "そろそろ", distractors: ["だいたい", "たいてい", "なかなか"] }
    ]
  }
};
