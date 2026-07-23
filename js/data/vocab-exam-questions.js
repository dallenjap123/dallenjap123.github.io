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
    ],

    // ---------- 5課 買い物① ----------
    "カード": [
      { type: "kanji", sentence: "買[か]い物[もの]を＿＿で払[はら]いました。", distractors: ["現金", "レシート", "お釣り"] },
      { type: "usage", sentence: "「カード」の正しい使い方はどれですか。", answer: "カードで払いました。", distractors: ["カードを払いました。", "カードに払いました。", "カードが払いました。"] }
    ],
    "お釣り": [
      { type: "kanji", sentence: "＿＿を数[かぞ]えてください。", distractors: ["現金", "レシート", "財布"] },
      { type: "particle", sentence: "レジでお釣[つ]り＿＿もらいました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "億": [
      { type: "kanji", sentence: "この会社[かいしゃ]は一年[いちねん]に一＿＿円[えん]も稼[かせ]ぎます。", distractors: ["万", "兆", "千"] },
      { type: "usage", sentence: "「億」の正しい使い方はどれですか。", answer: "この会社は一億円を稼ぎました。", distractors: ["この会社は一億円が稼ぎました。", "この会社は一億円に稼ぎました。", "この会社は一億円で稼ぎました。"] }
    ],
    "サイズ": [
      { type: "kanji", sentence: "この靴[くつ]の＿＿は大[おお]きすぎます。", distractors: ["カラー", "デザイン", "スタイル"] },
      { type: "particle", sentence: "この靴[くつ]＿＿サイズは大[おお]きすぎます。", answer: "の", distractors: ["が", "を", "に"] }
    ],
    "売り場": [
      { type: "kanji", sentence: "靴[くつ]の＿＿は三階[さんがい]です。", distractors: ["受付", "駐車場", "会場"] },
      { type: "usage", sentence: "「売り場」の正しい使い方はどれですか。", answer: "靴の売り場は三階です。", distractors: ["靴が売り場は三階です。", "靴を売り場は三階です。", "靴に売り場は三階です。"] }
    ],
    "エスカレーター": [
      { type: "kanji", sentence: "＿＿で二階[にかい]に上[あ]がりました。", distractors: ["エレベーター", "階段", "電車"] },
      { type: "particle", sentence: "エスカレーター＿＿二階[にかい]に上[あ]がりました。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "サービス": [
      { type: "kanji", sentence: "この店[みせ]は＿＿がとてもいいです。", distractors: ["品物", "システム", "スタッフ"] },
      { type: "usage", sentence: "「サービス」の正しい使い方はどれですか。", answer: "この店はサービスがとてもいいです。", distractors: ["この店はサービスをとてもいいです。", "この店はサービスにとてもいいです。", "この店はサービスでとてもいいです。"] }
    ],
    "(お)土産": [
      { type: "kanji", sentence: "旅行[りょこう]から帰[かえ]って、＿＿を買[か]ってきました。", distractors: ["(お)祝い", "プレゼント", "荷物"] },
      { type: "particle", sentence: "友達[ともだち]に(お)土産[みやげ]＿＿買[か]ってきました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "下ろす": [
      { type: "kanji", sentence: "銀行[ぎんこう]でお金[かね]を＿＿ました。", distractors: ["下がる", "降ろす", "落とす"] },
      { type: "usage", sentence: "「下ろす」の正しい使い方はどれですか。", answer: "銀行でお金を下ろしました。", distractors: ["銀行でお金が下ろしました。", "銀行でお金に下ろしました。", "銀行でお金を下ろされました。"] }
    ],
    "押す": [
      { type: "kanji", sentence: "ボタンを＿＿ください。", distractors: ["引く", "触る", "押さえる"] },
      { type: "particle", sentence: "ボタン＿＿押[お]してください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "払う": [
      { type: "kanji", sentence: "レジでお金[かね]を＿＿ました。", distractors: ["拾う", "洗う", "手伝う"] },
      { type: "usage", sentence: "「払う」の正しい使い方はどれですか。", answer: "レジでお金を払いました。", distractors: ["レジでお金が払いました。", "レジでお金に払いました。", "レジでお金を払われました。"] }
    ],
    "触る": [
      { type: "kanji", sentence: "この絵[え]に＿＿ないでください。", distractors: ["触れる", "座る", "騒ぐ"] },
      { type: "particle", sentence: "この絵[え]＿＿触[さわ]らないでください。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "細かい": [
      { type: "kanji", sentence: "＿＿お金[かね]がありますか。", distractors: ["温かい", "柔らかい", "暖かい"] },
      { type: "usage", sentence: "「細かい」の正しい使い方はどれですか。", answer: "細かいお金がありますか。", distractors: ["細かいのお金がありますか。", "細かかお金がありますか。", "細かくお金がありますか。"] }
    ],

    // ---------- 6課 学校① ----------
    "レポート": [
      { type: "kanji", sentence: "明日[あした]までに＿＿を出[だ]してください。", distractors: ["レシート", "ノート", "テスト"] },
      { type: "usage", sentence: "「レポート」の正しい使い方はどれですか。", answer: "レポートを書きました。", distractors: ["レポートが書きました。", "レポートに書きました。", "レポートを書かれました。"] }
    ],
    "高校": [
      { type: "kanji", sentence: "彼[かれ]は今[いま]＿＿三年生[さんねんせい]です。", distractors: ["高校生", "大学", "中学"] },
      { type: "usage", sentence: "「高校」の正しい使い方はどれですか。", answer: "彼女は高校で英語を教えています。", distractors: ["彼女は高校を英語を教えています。", "彼女は高校に英語で教えています。", "彼女は高校が英語を教えています。"] },
      { type: "particle", sentence: "高校[こうこう]＿＿通[かよ]っています。", answer: "に", distractors: ["を", "で", "が"] }
    ],
    "留学生": [
      { type: "kanji", sentence: "この大学[だいがく]には＿＿がたくさんいます。", distractors: ["留学", "旅行者", "外国人"] },
      { type: "usage", sentence: "「留学生」の正しい使い方はどれですか。", answer: "彼は中国から来た留学生です。", distractors: ["彼は中国から来た留学生でした。", "彼は中国から来た留学生を来ました。", "彼は中国から来る留学生です。"] },
      { type: "particle", sentence: "留学生[りゅうがくせい]＿＿日本語[にほんご]を勉強[べんきょう]しています。", answer: "は", distractors: ["を", "に", "で"] }
    ],
    "ホームステイ": [
      { type: "kanji", sentence: "夏休[なつやす]みに＿＿をしました。", distractors: ["アルバイト", "ボランティア", "キャンプ"] },
      { type: "usage", sentence: "「ホームステイ」の正しい使い方はどれですか。", answer: "アメリカでホームステイをしました。", distractors: ["アメリカでホームステイしました。", "アメリカをホームステイをしました。", "アメリカでホームステイをされました。"] }
    ],
    "字": [
      { type: "kanji", sentence: "彼[かれ]の＿＿はとてもきれいです。", distractors: ["絵", "文章", "漢字"] },
      { type: "collocation", sentence: "彼[かれ]の字[じ]は＿＿読[よ]みにくいです。", answer: "汚くて", distractors: ["忙しくて", "眠くて", "痛くて"] },
      { type: "particle", sentence: "平仮名[ひらがな]の字[じ]＿＿覚[おぼ]えました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "答え": [
      { type: "kanji", sentence: "問題[もんだい]の＿＿が分[わ]かりません。", distractors: ["応え", "返事", "質問"] },
      { type: "usage", sentence: "「答え」の正しい使い方はどれですか。", answer: "この問題の答えが分かりません。", distractors: ["この問題の答えを分かりません。", "この問題の答えは分かりませんでした。", "この問題は答えが分かりません。"] },
      { type: "particle", sentence: "問題[もんだい]の答[こた]え＿＿分[わ]かりません。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "消しゴム": [
      { type: "kanji", sentence: "間違[まちが]えたところを＿＿で消[け]しました。", distractors: ["鉛筆", "定規", "ペン"] },
      { type: "usage", sentence: "「消しゴム」の正しい使い方はどれですか。", answer: "消しゴムで字を消しました。", distractors: ["消しゴムを字を消しました。", "消しゴムに字が消しました。", "消しゴムで字が消えました。"] }
    ],
    "意味": [
      { type: "kanji", sentence: "この言葉[ことば]の＿＿が分[わ]かりません。", distractors: ["意見", "味方", "趣味"] },
      { type: "usage", sentence: "「意味」の正しい使い方はどれですか。", answer: "この言葉の意味が分かりません。", distractors: ["この言葉の意味を分かりません。", "この言葉は意味が分かりませんでした。", "この言葉の意味は分かりませんでした。"] },
      { type: "particle", sentence: "この言葉[ことば]の意味[いみ]＿＿分[わ]かりません。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "試験": [
      { type: "kanji", sentence: "来週[らいしゅう]、日本語[にほんご]の＿＿があります。", distractors: ["実験", "経験", "受験"] },
      { type: "usage", sentence: "「試験」の正しい使い方はどれですか。", answer: "来週、日本語の試験があります。", distractors: ["来週、日本語の試験をあります。", "来週、日本語は試験があります。", "来週、日本語の試験でありました。"] },
      { type: "collocation", sentence: "明日[あした]試験[しけん]が＿＿ので、緊張[きんちょう]しています。", answer: "ある", distractors: ["いる", "する", "なる"] }
    ],
    "説明する": [
      { type: "kanji", sentence: "先生[せんせい]が文法[ぶんぽう]を＿＿くれました。", distractors: ["接続する", "設定する", "節約する"] },
      { type: "usage", sentence: "「説明する」の正しい使い方はどれですか。", answer: "先生が文法を説明してくれました。", distractors: ["先生が文法を説明にくれました。", "先生は文法が説明してくれました。", "先生が文法を説明されくれました。"] }
    ],
    "研究する": [
      { type: "kanji", sentence: "大学[だいがく]で環境[かんきょう]問題[もんだい]を＿＿います。", distractors: ["見学する", "検討する", "研修する"] },
      { type: "usage", sentence: "「研究する」の正しい使い方はどれですか。", answer: "大学で環境問題を研究しています。", distractors: ["大学で環境問題が研究しています。", "大学で環境問題に研究しています。", "大学は環境問題を研究しています。"] },
      { type: "particle", sentence: "大学[だいがく]で環境[かんきょう]問題[もんだい]＿＿研究[けんきゅう]しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "考える": [
      { type: "kanji", sentence: "将来[しょうらい]のことをよく＿＿います。", distractors: ["感じる", "覚える", "比べる"] },
      { type: "usage", sentence: "「考える」の正しい使い方はどれですか。", answer: "将来のことをよく考えています。", distractors: ["将来のことをよく考えます、いつも。", "将来のことがよく考えています。", "将来のことをよく考えられています。"] },
      { type: "particle", sentence: "将来[しょうらい]のこと＿＿よく考[かんが]えています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "調べる": [
      { type: "kanji", sentence: "分[わ]からない言葉[ことば]は辞書[じしょ]で＿＿ください。", distractors: ["述べる", "比べる", "並べる"] },
      { type: "usage", sentence: "「調べる」の正しい使い方はどれですか。", answer: "分からない言葉は辞書で調べてください。", distractors: ["分からない言葉は辞書に調べてください。", "分からない言葉は辞書が調べてください。", "分からない言葉は辞書で調べられてください。"] },
      { type: "collocation", sentence: "図書館[としょかん]で資料[しりょう]を＿＿調[しら]べました。", answer: "詳しく", distractors: ["早く", "上手に", "静かに"] }
    ],
    "だいたい": [
      { type: "kanji", sentence: "宿題[しゅくだい]は＿＿終[お]わりました。", distractors: ["ちょうど", "そろそろ", "なかなか"] },
      { type: "usage", sentence: "「だいたい」の正しい使い方はどれですか。", answer: "宿題はだいたい終わりました。", distractors: ["宿題はだいたいの終わりました。", "宿題はだいたいに終わりました。", "宿題はだいたいで終わりました。"] }
    ],
    "全然": [
      { type: "kanji", sentence: "この問題[もんだい]は＿＿分[わ]かりません。", distractors: ["あまり", "少し", "たぶん"] },
      { type: "usage", sentence: "「全然」の正しい使い方はどれですか。", answer: "この問題は全然分かりません。", distractors: ["この問題は全然分かります。", "この問題が全然分かりません。", "この問題は全然の分かりません。"] }
    ],

    // ---------- 7課 仕事① ----------
    "社長": [
      { type: "kanji", sentence: "＿＿はこの会社[かいしゃ]を三十年前[さんじゅうねんまえ]に作[つく]りました。", distractors: ["部長", "課長", "店長"] },
      { type: "usage", sentence: "「社長」の正しい使い方はどれですか。", answer: "社長は今、出張中です。", distractors: ["社長は今、出張中でした、いつも。", "社長を今、出張中です。", "社長は今、出張中でございました。"] },
      { type: "particle", sentence: "社長[しゃちょう]＿＿この会社[かいしゃ]を作[つく]りました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "部長": [
      { type: "kanji", sentence: "＿＿に新[あたら]しい企画[きかく]について相談[そうだん]しました。", distractors: ["社長", "課長", "係長"] },
      { type: "usage", sentence: "「部長」の正しい使い方はどれですか。", answer: "部長に相談してから決めます。", distractors: ["部長を相談してから決めます。", "部長が相談されてから決めます。", "部長へ相談してから決めさせます、私が。"] },
      { type: "particle", sentence: "部長[ぶちょう]＿＿相談[そうだん]しました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "アルバイト": [
      { type: "kanji", sentence: "大学生[だいがくせい]は＿＿をしています。", distractors: ["就職", "インターン", "内職"] },
      { type: "usage", sentence: "「アルバイト」の正しい使い方はどれですか。", answer: "コンビニでアルバイトをしています。", distractors: ["コンビニをアルバイトをしています。", "コンビニでアルバイトしされています。", "コンビニでアルバイトにしています。"] }
    ],
    "受付": [
      { type: "kanji", sentence: "分[わ]からないことがあったら、＿＿で聞[き]いてください。", distractors: ["受取", "案内", "予約"] },
      { type: "usage", sentence: "「受付」の正しい使い方はどれですか。", answer: "受付で名前を書いてください。", distractors: ["受付を名前を書いてください。", "受付は名前が書いてください。", "受付で名前を書かせてください、必ず。"] },
      { type: "particle", sentence: "受付[うけつけ]＿＿聞[き]いてください。", answer: "で", distractors: ["に", "を", "が"] }
    ],
    "事務所": [
      { type: "kanji", sentence: "私[わたし]たちの＿＿は駅前[えきまえ]のビルにあります。", distractors: ["事務室", "会議室", "住所"] },
      { type: "usage", sentence: "「事務所」の正しい使い方はどれですか。", answer: "事務所に電話をかけました。", distractors: ["事務所を電話をかけました。", "事務所は電話がかけました。", "事務所で電話をかけられました、彼は。"] },
      { type: "particle", sentence: "事務所[じむしょ]＿＿電話[でんわ]をかけました。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "会議室": [
      { type: "kanji", sentence: "三階[さんがい]の＿＿で打[う]ち合[あ]わせをします。", distractors: ["事務室", "教室", "会議所"] },
      { type: "usage", sentence: "「会議室」の正しい使い方はどれですか。", answer: "会議室で会議をします。", distractors: ["会議室を会議をします。", "会議室は会議しました、いつも。", "会議室に会議をされます。"] },
      { type: "particle", sentence: "三階[さんがい]の会議室[かいぎしつ]＿＿会議[かいぎ]をします。", answer: "で", distractors: ["に", "を", "が"] }
    ],
    "昼休み": [
      { type: "kanji", sentence: "＿＿に友達[ともだち]とご飯[はん]を食[た]べます。", distractors: ["夏休み", "昼寝", "休憩"] },
      { type: "usage", sentence: "「昼休み」の正しい使い方はどれですか。", answer: "昼休みに友達とご飯を食べます。", distractors: ["昼休みを友達とご飯を食べます。", "昼休みは友達とご飯を食べました、いつも。", "昼休みが友達とご飯を食べます。"] },
      { type: "particle", sentence: "昼休[ひるやす]み＿＿友達[ともだち]とご飯[はん]を食[た]べます。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "スーツ": [
      { type: "kanji", sentence: "面接[めんせつ]に＿＿を着[き]て行[い]きました。", distractors: ["制服", "着物", "浴衣"] },
      { type: "usage", sentence: "「スーツ」の正しい使い方はどれですか。", answer: "面接にスーツを着て行きました。", distractors: ["面接にスーツで着て行きました。", "面接はスーツを着て行きました。", "面接にスーツが着て行きました。"] }
    ],
    "コンピューター": [
      { type: "kanji", sentence: "＿＿で仕事[しごと]をします。", distractors: ["テレビ", "カメラ", "プリンター"] },
      { type: "usage", sentence: "「コンピューター」の正しい使い方はどれですか。", answer: "コンピューターで仕事をします。", distractors: ["コンピューターを仕事をします。", "コンピューターに仕事します。", "コンピューターが仕事をされます。"] }
    ],
    "経済": [
      { type: "kanji", sentence: "大学[だいがく]で＿＿を勉強[べんきょう]しています。", distractors: ["経験", "経営", "景気"] },
      { type: "usage", sentence: "「経済」の正しい使い方はどれですか。", answer: "大学で経済を勉強しています。", distractors: ["大学で経済が勉強しています。", "大学は経済を勉強しました、いつも。", "大学で経済に勉強しています。"] },
      { type: "particle", sentence: "大学[だいがく]で経済[けいざい]＿＿勉強[べんきょう]しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "会議する": [
      { type: "kanji", sentence: "来週[らいしゅう]、新[あたら]しい商品[しょうひん]について＿＿予定[よてい]です。", distractors: ["開催する", "回答する", "解決する"] },
      { type: "usage", sentence: "「会議する」の正しい使い方はどれですか。", answer: "来週、新しい商品について会議します。", distractors: ["来週、新しい商品について会議です。", "来週、新しい商品が会議します。", "来週、新しい商品を会議されます。"] },
      { type: "grammar", sentence: "明日[あした]の午後[ごご]、会議[かいぎ]＿＿予定[よてい]です。", answer: "する", distractors: ["した", "している", "します"] }
    ],
    "送る": [
      { type: "kanji", sentence: "友達[ともだち]に手紙[てがみ]を＿＿ました。", distractors: ["贈る", "遅れる", "届ける"] },
      { type: "usage", sentence: "「送る」の正しい使い方はどれですか。", answer: "友達に手紙を送りました。", distractors: ["友達に手紙が送りました。", "友達を手紙に送りました。", "友達に手紙を送られました、私は。"] },
      { type: "particle", sentence: "友達[ともだち]に手紙[てがみ]＿＿送[おく]りました。", answer: "を", distractors: ["に", "が", "で"] }
    ],
    "簡単": [
      { type: "kanji", sentence: "この問題[もんだい]はとても＿＿です。", distractors: ["単純", "簡潔", "楽"] },
      { type: "usage", sentence: "「簡単」の正しい使い方はどれですか。", answer: "この問題は簡単です。", distractors: ["この問題は簡単いです。", "この問題は簡単くです。", "この問題は簡単です、を。"] },
      { type: "grammar", sentence: "この問題[もんだい]は＿＿解[と]けました。", answer: "簡単に", distractors: ["簡単な", "簡単だ", "簡単の"] }
    ],
    "大変": [
      { type: "kanji", sentence: "今日[きょう]の仕事[しごと]は＿＿でした。", distractors: ["大切", "大丈夫", "大分"] },
      { type: "usage", sentence: "「大変」の正しい使い方はどれですか。", answer: "今日の仕事は大変でした。", distractors: ["今日の仕事は大変いでした。", "今日の仕事は大変くでした。", "今日の仕事は大変をでした。"] },
      { type: "grammar", sentence: "今日[きょう]は仕事[しごと]が＿＿忙[いそが]しかったです。", answer: "大変", distractors: ["大変な", "大変に", "大変だ"] }
    ],
    "失礼": [
      { type: "kanji", sentence: "「＿＿します。」と言[い]って部屋[へや]に入[はい]りました。", distractors: ["無礼", "お礼", "敬礼"] },
      { type: "usage", sentence: "「失礼」の正しい使い方はどれですか。", answer: "お先に失礼します。", distractors: ["お先に失礼です。", "お先に失礼をします。", "お先に失礼くします。"] },
      { type: "collocation", sentence: "話[はなし]の途中[とちゅう]ですが、お先[さき]に＿＿します。", answer: "失礼", distractors: ["すみません", "ごめん", "どうも"] }
    ],

    // ---------- 8課 町① ----------
    "建物": [
      { type: "kanji", sentence: "駅前[えきまえ]の高[たか]い＿＿は何[なん]ですか。", distractors: ["建築", "建設", "荷物"] },
      { type: "usage", sentence: "「建物」の正しい使い方はどれですか。", answer: "あの建物は何ですか。", distractors: ["あの建物が何ですか、あれは。", "あの建物を何ですか。", "あの建物は何でございましたか、あれ。"] },
      { type: "particle", sentence: "あの建物[たてもの]＿＿何[なん]ですか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "交差点": [
      { type: "kanji", sentence: "あの＿＿を右[みぎ]に曲[ま]がってください。", distractors: ["交番", "交通", "横断歩道"] },
      { type: "usage", sentence: "「交差点」の正しい使い方はどれですか。", answer: "その交差点を右に曲がってください。", distractors: ["その交差点で右に曲がってください。", "その交差点が右に曲がってください。", "その交差点に右へ曲がられてください。"] },
      { type: "particle", sentence: "交差点[こうさてん]＿＿右[みぎ]に曲[ま]がってください。", answer: "を", distractors: ["に", "で", "が"] }
    ],
    "駐車場": [
      { type: "kanji", sentence: "この建物[たてもの]の＿＿は地下[ちか]にあります。", distractors: ["駐輪場", "売り場", "会場"] },
      { type: "usage", sentence: "「駐車場」の正しい使い方はどれですか。", answer: "車を駐車場に止めました。", distractors: ["車を駐車場を止めました。", "車は駐車場が止めました。", "車を駐車場で止められました、私は。"] },
      { type: "particle", sentence: "駐車場[ちゅうしゃじょう]＿＿車[くるま]を止[と]めました。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "角": [
      { type: "kanji", sentence: "あの＿＿を左[ひだり]に曲[ま]がってください。", distractors: ["隅", "端", "横"] },
      { type: "usage", sentence: "「角」の正しい使い方はどれですか。", answer: "次の角を左に曲がってください。", distractors: ["次の角で左に曲がってください。", "次の角が左に曲がってください。", "次の角に左へ曲がられてください。"] },
      { type: "particle", sentence: "角[かど]＿＿左[ひだり]に曲[ま]がってください。", answer: "を", distractors: ["に", "で", "が"] }
    ],
    "(お)寺": [
      { type: "kanji", sentence: "京都[きょうと]には有名[ゆうめい]な＿＿がたくさんあります。", distractors: ["神社", "教会", "仏像"] },
      { type: "usage", sentence: "「(お)寺」の正しい使い方はどれですか。", answer: "京都には有名なお寺がたくさんあります。", distractors: ["京都には有名なお寺をたくさんあります。", "京都には有名なお寺がたくさんいます。", "京都は有名なお寺がたくさんありました、昔から。"] },
      { type: "particle", sentence: "京都[きょうと]には有名[ゆうめい]な(お)寺[てら]＿＿たくさんあります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "歯医者": [
      { type: "kanji", sentence: "歯[は]が痛[いた]いので、＿＿に行[い]きました。", distractors: ["医者", "看護師", "薬剤師"] },
      { type: "usage", sentence: "「歯医者」の正しい使い方はどれですか。", answer: "歯が痛いので、歯医者に行きました。", distractors: ["歯が痛いので、歯医者を行きました。", "歯が痛いので、歯医者が行きました。", "歯が痛いので、歯医者で行かれました、私は。"] },
      { type: "particle", sentence: "歯医者[はいしゃ]＿＿歯[は]を見[み]てもらいました。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "県": [
      { type: "kanji", sentence: "これはどこの＿＿の名産[めいさん]ですか。", distractors: ["市", "都", "州"] },
      { type: "usage", sentence: "「県」の正しい使い方はどれですか。", answer: "私は静岡県に住んでいます。", distractors: ["私は静岡県を住んでいます。", "私は静岡県が住んでいます。", "私は静岡県で住まれています。"] },
      { type: "particle", sentence: "私[わたし]は静岡県[しずおかけん]＿＿住[す]んでいます。", answer: "に", distractors: ["を", "で", "が"] }
    ],
    "(お)正月": [
      { type: "kanji", sentence: "＿＿には家族[かぞく]みんなで集[あつ]まります。", distractors: ["(お)盆", "(お)祭り", "誕生日"] },
      { type: "usage", sentence: "「(お)正月」の正しい使い方はどれですか。", answer: "お正月には家族みんなで集まります。", distractors: ["お正月を家族みんなで集まります。", "お正月が家族みんなで集まります。", "お正月には家族みんなで集まりました、必ず来年も。"] },
      { type: "particle", sentence: "(お)正月[しょうがつ]＿＿家族[かぞく]みんなで集[あつ]まります。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "(お)祭り": [
      { type: "kanji", sentence: "夏[なつ]には各地[かくち]で＿＿が行[おこな]われます。", distractors: ["行事", "(お)正月", "花火大会"] },
      { type: "usage", sentence: "「(お)祭り」の正しい使い方はどれですか。", answer: "夏には各地でお祭りが行われます。", distractors: ["夏には各地でお祭りを行われます。", "夏には各地でお祭りは行いました。", "夏には各地でお祭りが行われられます。"] },
      { type: "particle", sentence: "(お)祭り[まつり]＿＿浴衣[ゆかた]を着[き]て行[い]きました。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "田舎": [
      { type: "kanji", sentence: "祖父母[そふぼ]は＿＿に住[す]んでいます。", distractors: ["都会", "故郷", "地方"] },
      { type: "usage", sentence: "「田舎」の正しい使い方はどれですか。", answer: "祖父母は田舎に住んでいます。", distractors: ["祖父母は田舎を住んでいます。", "祖父母は田舎が住んでいます。", "祖父母は田舎で住まれています。"] },
      { type: "particle", sentence: "祖父母[そふぼ]は田舎[いなか]＿＿住[す]んでいます。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "季節": [
      { type: "kanji", sentence: "日本[にほん]には四[よ]つの＿＿があります。", distractors: ["気候", "時期", "季語"] },
      { type: "usage", sentence: "「季節」の正しい使い方はどれですか。", answer: "日本には四つの季節があります。", distractors: ["日本には四つの季節をあります。", "日本には四つの季節でありました。", "日本は四つの季節があります、今も昔も。"] },
      { type: "particle", sentence: "日本[にほん]には四[よ]つの季節[きせつ]＿＿あります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "着物": [
      { type: "kanji", sentence: "(お)正月[しょうがつ]に＿＿を着[き]ました。", distractors: ["浴衣", "制服", "服"] },
      { type: "usage", sentence: "「着物」の正しい使い方はどれですか。", answer: "お正月に着物を着ました。", distractors: ["お正月に着物が着ました。", "お正月は着物を着ました、必ず毎年。", "お正月に着物で着られました。"] },
      { type: "particle", sentence: "(お)正月[しょうがつ]に着物[きもの]＿＿着[き]ました。", answer: "を", distractors: ["に", "が", "で"] }
    ],
    "曲がる": [
      { type: "kanji", sentence: "あの角[かど]を右[みぎ]に＿＿ください。", distractors: ["回る", "曲げる", "混ざる"] },
      { type: "usage", sentence: "「曲がる」の正しい使い方はどれですか。", answer: "あの角を右に曲がってください。", distractors: ["あの角で右に曲がってください。", "あの角を右に曲げてください、あなたが。", "あの角が右に曲がってください。"] },
      { type: "particle", sentence: "あの角[かど]を右[みぎ]＿＿曲[ま]がってください。", answer: "に", distractors: ["を", "で", "が"] }
    ],
    "渡る": [
      { type: "kanji", sentence: "横断歩道[おうだんほどう]を＿＿ください。", distractors: ["渡す", "回る", "通る"] },
      { type: "usage", sentence: "「渡る」の正しい使い方はどれですか。", answer: "横断歩道を渡ってください。", distractors: ["横断歩道に渡ってください。", "横断歩道が渡ってください。", "横断歩道を渡されてください。"] },
      { type: "particle", sentence: "横断歩道[おうだんほどう]＿＿渡[わた]ってください。", answer: "を", distractors: ["に", "で", "が"] }
    ],
    "不便": [
      { type: "kanji", sentence: "この町[まち]は交通[こうつう]が＿＿です。", distractors: ["便利", "不安", "不満"] },
      { type: "usage", sentence: "「不便」の正しい使い方はどれですか。", answer: "この町は交通が不便です。", distractors: ["この町は交通が不便いです。", "この町は交通が不便くです。", "この町は交通を不便です。"] },
      { type: "grammar", sentence: "この駅[えき]は工事中[こうじちゅう]で、＿＿場所[ばしょ]になっています。", answer: "不便な", distractors: ["不便に", "不便だ", "不便の"] }
    ],

    // ---------- 9課 人と人② ----------
    "息子": [
      { type: "kanji", sentence: "私[わたし]の＿＿は今年[ことし]大学生[だいがくせい]になりました。", distractors: ["娘", "子供", "甥"] },
      { type: "usage", sentence: "「息子」の正しい使い方はどれですか。", answer: "私の息子は今年大学生になりました。", distractors: ["私の息子を今年大学生になりました。", "私の息子が今年大学生になられました。", "私は息子を今年大学生でした。"] },
      { type: "particle", sentence: "私[わたし]の息子[むすこ]＿＿今年[ことし]大学生[だいがくせい]になりました。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "娘": [
      { type: "kanji", sentence: "＿＿は来月[らいげつ]結婚[けっこん]します。", distractors: ["息子", "姪", "女の子"] },
      { type: "usage", sentence: "「娘」の正しい使い方はどれですか。", answer: "娘は来月結婚します。", distractors: ["娘を来月結婚します。", "娘が来月結婚されました。", "娘は来月結婚をさせます、私が。"] },
      { type: "particle", sentence: "娘[むすめ]＿＿結婚[けっこん]しました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "ペット": [
      { type: "kanji", sentence: "一人暮[ひとりぐ]らしなので、＿＿を飼[か]っています。", distractors: ["動物", "家畜", "仲間"] },
      { type: "usage", sentence: "「ペット」の正しい使い方はどれですか。", answer: "一人暮らしなので、ペットを飼っています。", distractors: ["一人暮らしなので、ペットが飼っています。", "一人暮らしなので、ペットに飼っています。", "一人暮らしなので、ペットを飼われています。"] }
    ],
    "声": [
      { type: "kanji", sentence: "電話[でんわ]で彼女[かのじょ]の＿＿を聞[き]いて安心[あんしん]しました。", distractors: ["音", "音声", "歌声"] },
      { type: "usage", sentence: "「声」の正しい使い方はどれですか。", answer: "電話で彼女の声を聞いて安心しました。", distractors: ["電話で彼女の声が聞いて安心しました。", "電話で彼女の声に聞いて安心しました。", "電話は彼女の声を聞いて安心されました。"] },
      { type: "particle", sentence: "電話[でんわ]で彼女[かのじょ]の声[こえ]＿＿聞[き]いて安心[あんしん]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "力": [
      { type: "kanji", sentence: "この仕事[しごと]には＿＿がいります。", distractors: ["体力", "元気", "権力"] },
      { type: "usage", sentence: "「力」の正しい使い方はどれですか。", answer: "この仕事には力がいります。", distractors: ["この仕事には力をいります。", "この仕事は力がいりました、いつも。", "この仕事には力にいります。"] },
      { type: "particle", sentence: "この仕事[しごと]には力[ちから]＿＿いります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "うそ": [
      { type: "kanji", sentence: "彼[かれ]はいつも＿＿をつきます。", distractors: ["冗談", "秘密", "文句"] },
      { type: "usage", sentence: "「うそ」の正しい使い方はどれですか。", answer: "彼はいつもうそをつきます。", distractors: ["彼はいつもうそがつきます。", "彼はいつもうそでつきます。", "彼はいつもうそをつかれます、みんなに。"] },
      { type: "particle", sentence: "彼[かれ]はいつもうそ＿＿つきます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "夢": [
      { type: "kanji", sentence: "私[わたし]の＿＿は医者[いしゃ]になることです。", distractors: ["希望", "目標", "理想"] },
      { type: "usage", sentence: "「夢」の正しい使い方はどれですか。", answer: "私の夢は医者になることです。", distractors: ["私の夢を医者になることです。", "私は夢が医者になることでした。", "私の夢は医者になることでございます、必ず。"] },
      { type: "particle", sentence: "私[わたし]の夢[ゆめ]＿＿医者[いしゃ]になることです。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "普通": [
      { type: "kanji", sentence: "彼[かれ]は＿＿の人[ひと]と違[ちが]って、とても優[やさ]しいです。", distractors: ["普段", "一般", "特別"] },
      { type: "usage", sentence: "「普通」の正しい使い方はどれですか。", answer: "彼は普通の人と違って、とても優しいです。", distractors: ["彼は普通な人と違って、とても優しいです。", "彼は普通に人と違って、とても優しいです。", "彼は普通だ人と違って、とても優しいです。"] },
      { type: "grammar", sentence: "電車[でんしゃ]で＿＿三十分[さんじゅっぷん]かかります。", answer: "普通", distractors: ["普通な", "普通に", "普通の"] }
    ],
    "将来": [
      { type: "kanji", sentence: "彼[かれ]の＿＿の夢[ゆめ]は医者[いしゃ]になることです。", distractors: ["未来", "過去", "現在"] },
      { type: "usage", sentence: "「将来」の正しい使い方はどれですか。", answer: "彼の将来の夢は医者になることです。", distractors: ["彼の将来を夢は医者になることです。", "彼は将来の夢が医者になることでした。", "彼の将来の夢は医者になることでございました。"] },
      { type: "particle", sentence: "彼[かれ]の将来[しょうらい]＿＿夢[ゆめ]は医者[いしゃ]になることです。", answer: "の", distractors: ["を", "に", "が"] }
    ],
    "決める": [
      { type: "kanji", sentence: "自分[じぶん]の進路[しんろ]は自分[じぶん]で＿＿ました。", distractors: ["決まる", "定める", "認める"] },
      { type: "usage", sentence: "「決める」の正しい使い方はどれですか。", answer: "自分の進路は自分で決めました。", distractors: ["自分の進路は自分で決まりました、私が。", "自分の進路が自分で決めました。", "自分の進路は自分に決めました。"] },
      { type: "particle", sentence: "進路[しんろ]＿＿決[き]めました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "偉い": [
      { type: "kanji", sentence: "毎日[まいにち]早起[はやお]きして勉強[べんきょう]するなんて、＿＿ですね。", distractors: ["賢い", "優しい", "立派"] },
      { type: "usage", sentence: "「偉い」の正しい使い方はどれですか。", answer: "毎日早起きするなんて、偉いですね。", distractors: ["毎日早起きするなんて、偉いなですね。", "毎日早起きするなんて、偉くですね。", "毎日早起きするなんて、偉いにですね。"] },
      { type: "grammar", sentence: "彼[かれ]はちっとも＿＿ないと思[おも]います。", answer: "偉く", distractors: ["偉い", "偉くて", "偉さ"] }
    ],
    "すごい": [
      { type: "kanji", sentence: "彼[かれ]は一日[いちにち]で百[ひゃく]キロ走[はし]るなんて、＿＿です。", distractors: ["立派", "偉い", "上手"] },
      { type: "usage", sentence: "「すごい」の正しい使い方はどれですか。", answer: "彼は一日で百キロ走るなんて、すごいです。", distractors: ["彼は一日で百キロ走るなんて、すごいなです。", "彼は一日で百キロ走るなんて、すごくです。", "彼は一日で百キロ走るなんて、すごいにです。"] },
      { type: "grammar", sentence: "彼[かれ]は＿＿速[はや]く走[はし]ります。", answer: "すごく", distractors: ["すごい", "すごくて", "すごさ"] }
    ],
    "久しぶり": [
      { type: "kanji", sentence: "「＿＿ですね。お元気[げんき]でしたか。」", distractors: ["久しい", "しばらく", "久々"] },
      { type: "usage", sentence: "「久しぶり」の正しい使い方はどれですか。", answer: "久しぶりですね。お元気でしたか。", distractors: ["久しぶりなですね。お元気でしたか。", "久しぶりをですね。お元気でしたか。", "久しぶりにですね。お元気でしたか。"] }
    ],

    // ---------- 10課 趣味③ ----------
    "小説": [
      { type: "kanji", sentence: "この＿＿はとても面白[おもしろ]いです。", distractors: ["物語", "漫画", "説明"] },
      { type: "usage", sentence: "「小説」の正しい使い方はどれですか。", answer: "この小説はとても面白いです。", distractors: ["この小説をとても面白いです。", "この小説がとても面白いでした。", "この小説は面白いをとてもです。"] },
      { type: "particle", sentence: "この小説[しょうせつ]＿＿とても面白[おもしろ]いです。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "展覧会": [
      { type: "kanji", sentence: "美術館[びじゅつかん]で＿＿が開[ひら]かれています。", distractors: ["展示会", "見学会", "音楽会"] },
      { type: "usage", sentence: "「展覧会」の正しい使い方はどれですか。", answer: "美術館で展覧会が開かれています。", distractors: ["美術館を展覧会が開かれています。", "美術館で展覧会を開いています、あの人たちが。", "美術館は展覧会が開かれました、来週も。"] },
      { type: "particle", sentence: "美術館[びじゅつかん]で展覧会[てんらんかい]＿＿開[ひら]かれています。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "番組": [
      { type: "kanji", sentence: "このテレビ＿＿はとても人気[にんき]があります。", distractors: ["番号", "放送", "組み合わせ"] },
      { type: "usage", sentence: "「番組」の正しい使い方はどれですか。", answer: "このテレビ番組はとても人気があります。", distractors: ["このテレビ番組をとても人気があります。", "このテレビ番組が人気をあります。", "このテレビ番組はとても人気でありました。"] },
      { type: "particle", sentence: "このテレビ番組[ばんぐみ]＿＿とても人気[にんき]があります。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "ドラマ": [
      { type: "kanji", sentence: "毎晩[まいばん]韓国[かんこく]の＿＿を見[み]ています。", distractors: ["映画", "アニメ", "ニュース"] },
      { type: "usage", sentence: "「ドラマ」の正しい使い方はどれですか。", answer: "毎晩韓国のドラマを見ています。", distractors: ["毎晩韓国のドラマが見ています。", "毎晩韓国のドラマに見ています。", "毎晩韓国のドラマを見られています。"] }
    ],
    "ゲーム": [
      { type: "kanji", sentence: "弟[おとうと]は毎日[まいにち]＿＿をしています。", distractors: ["スポーツ", "運動", "勝負"] },
      { type: "usage", sentence: "「ゲーム」の正しい使い方はどれですか。", answer: "弟は毎日ゲームをしています。", distractors: ["弟は毎日ゲームがしています。", "弟は毎日ゲームにしています。", "弟は毎日ゲームをされています。"] }
    ],
    "今夜": [
      { type: "kanji", sentence: "＿＿は星[ほし]がきれいに見[み]えます。", distractors: ["今晩", "今日", "昨夜"] },
      { type: "usage", sentence: "「今夜」の正しい使い方はどれですか。", answer: "今夜は星がきれいに見えます。", distractors: ["今夜を星がきれいに見えます。", "今夜が星をきれいに見えました。", "今夜は星がきれいに見えました、明日も。"] },
      { type: "particle", sentence: "今夜[こんや]＿＿星[ほし]がきれいに見[み]えます。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "運動する": [
      { type: "kanji", sentence: "健康[けんこう]のために毎朝[まいあさ]＿＿しています。", distractors: ["運転する", "移動する", "行動する"] },
      { type: "usage", sentence: "「運動する」の正しい使い方はどれですか。", answer: "健康のために毎朝運動しています。", distractors: ["健康のために毎朝運動をされています、みんなが。", "健康のために毎朝運動でしています。", "健康のために毎朝運動しれています。"] },
      { type: "particle", sentence: "健康[けんこう]のために毎朝[まいあさ]運動[うんどう]＿＿しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "練習する": [
      { type: "kanji", sentence: "毎日[まいにち]ピアノを＿＿います。", distractors: ["復習する", "予習する", "学習する"] },
      { type: "usage", sentence: "「練習する」の正しい使い方はどれですか。", answer: "毎日ピアノを練習しています。", distractors: ["毎日ピアノが練習しています。", "毎日ピアノに練習しています。", "毎日ピアノを練習されています、先生に。"] },
      { type: "particle", sentence: "毎日[まいにち]ピアノ＿＿練習[れんしゅう]しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "けがする": [
      { type: "kanji", sentence: "サッカーの試合中[しあいちゅう]に足[あし]を＿＿ました。", distractors: ["痛める", "折る", "疲れる"] },
      { type: "usage", sentence: "「けがする」の正しい使い方はどれですか。", answer: "サッカーの試合中に足をけがしました。", distractors: ["サッカーの試合中に足がけがしました。", "サッカーの試合中に足にけがされました。", "サッカーの試合中は足をけがでした。"] }
    ],
    "踊る": [
      { type: "kanji", sentence: "音楽[おんがく]に合[あ]わせて＿＿ました。", distractors: ["躍る", "泳ぐ", "歌う"] },
      { type: "usage", sentence: "「踊る」の正しい使い方はどれですか。", answer: "音楽に合わせて踊りました。", distractors: ["音楽を合わせて踊りました。", "音楽に合わせて踊られました、みんなに。", "音楽が合わせて踊りました。"] },
      { type: "particle", sentence: "音楽[おんがく]＿＿合[あ]わせて踊[おど]りました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "投げる": [
      { type: "kanji", sentence: "ピッチャーがボールを＿＿ました。", distractors: ["逃げる", "蹴る", "投げ出す"] },
      { type: "usage", sentence: "「投げる」の正しい使い方はどれですか。", answer: "ピッチャーがボールを投げました。", distractors: ["ピッチャーがボールに投げました。", "ピッチャーがボールを投げられました、相手に。", "ピッチャーはボールが投げました。"] },
      { type: "particle", sentence: "ピッチャーがボール＿＿投[な]げました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "勝つ": [
      { type: "kanji", sentence: "今日[きょう]の試合[しあい]で＿＿ました。", distractors: ["買う", "勝手", "優勝する"] },
      { type: "usage", sentence: "「勝つ」の正しい使い方はどれですか。", answer: "今日の試合で勝ちました。", distractors: ["今日の試合を勝ちました。", "今日の試合で勝たれました、相手が。", "今日の試合は勝ちました、また来週も。"] },
      { type: "particle", sentence: "試合[しあい]＿＿勝[か]ちました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "負ける": [
      { type: "kanji", sentence: "残念[ざんねん]ながら、決勝戦[けっしょうせん]で＿＿ました。", distractors: ["負う", "曲げる", "諦める"] },
      { type: "usage", sentence: "「負ける」の正しい使い方はどれですか。", answer: "今日の試合で負けました。", distractors: ["今日の試合を負けました。", "今日の試合で負けられました、相手に。", "今日の試合は負けました、また来週も。"] },
      { type: "particle", sentence: "試合[しあい]＿＿負[ま]けました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "すばらしい": [
      { type: "kanji", sentence: "彼[かれ]の演技[えんぎ]は＿＿でした。", distractors: ["立派", "見事", "優秀"] },
      { type: "usage", sentence: "「すばらしい」の正しい使い方はどれですか。", answer: "彼の演技はすばらしかったです。", distractors: ["彼の演技はすばらしいでした。", "彼の演技はすばらしいだったです。", "彼の演技はすばらしくでした。"] }
    ],

    // ---------- 11課 趣味④ ----------
    "動物園": [
      { type: "kanji", sentence: "北海道[ほっかいどう]の＿＿に行[い]きました。", distractors: ["遊園地", "水族館", "植物園"] },
      { type: "usage", sentence: "「動物園」の正しい使い方はどれですか。", answer: "北海道の動物園に行きました。", distractors: ["北海道の動物園を行きました。", "北海道の動物園が行きました。", "北海道の動物園で行かれました。"] },
      { type: "particle", sentence: "動物園[どうぶつえん]＿＿ライオンを見[み]ました。", answer: "で", distractors: ["を", "に", "が"] }
    ],
    "星": [
      { type: "kanji", sentence: "空[そら]に＿＿が出[で]ていました。", distractors: ["月", "太陽", "雲"] },
      { type: "usage", sentence: "「星」の正しい使い方はどれですか。", answer: "空に星が出ていました。", distractors: ["空に星を出ていました。", "空は星が出ました、いつも。", "空に星が出されていました。"] },
      { type: "particle", sentence: "空[そら]に星[ほし]＿＿出[で]ていました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "エンジン": [
      { type: "kanji", sentence: "この車[くるま]は＿＿がうるさいです。", distractors: ["タイヤ", "ブレーキ", "ハンドル"] },
      { type: "usage", sentence: "「エンジン」の正しい使い方はどれですか。", answer: "この車はエンジンがうるさいです。", distractors: ["この車はエンジンをうるさいです。", "この車はエンジンでうるさいです。", "この車のエンジンはうるさいでした、あの日。"] }
    ],
    "場所": [
      { type: "kanji", sentence: "ホテルの＿＿が分[わ]かりません。", distractors: ["位置", "住所", "会場"] },
      { type: "usage", sentence: "「場所」の正しい使い方はどれですか。", answer: "ホテルの場所が分かりません。", distractors: ["ホテルの場所を分かりません。", "ホテルは場所が分かりませんでした。", "ホテルの場所は分かりませんでございます。"] },
      { type: "particle", sentence: "ホテルの場所[ばしょ]＿＿分[わ]かりません。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "帰り": [
      { type: "kanji", sentence: "＿＿にお土産[みやげ]を買[か]いました。", distractors: ["帰国", "戻り", "行き"] },
      { type: "usage", sentence: "「帰り」の正しい使い方はどれですか。", answer: "帰りにお土産を買いました。", distractors: ["帰りをお土産を買いました。", "帰りがお土産を買いました。", "帰りにお土産が買われました。"] },
      { type: "collocation", sentence: "帰[かえ]りにお土産[みやげ]を＿＿ました。", answer: "買い", distractors: ["食べ", "作り", "売り"] }
    ],
    "気分": [
      { type: "kanji", sentence: "バスで＿＿が悪[わる]くなりました。", distractors: ["気持ち", "天気", "元気"] },
      { type: "usage", sentence: "「気分」の正しい使い方はどれですか。", answer: "バスで気分が悪くなりました。", distractors: ["バスで気分を悪くなりました。", "バスは気分が悪くなりました。", "バスで気分が悪くさせました。"] },
      { type: "particle", sentence: "バスで気分[きぶん]＿＿悪[わる]くなりました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "都合": [
      { type: "kanji", sentence: "＿＿が悪[わる]いので、行[い]けません。", distractors: ["場合", "都会", "具合"] },
      { type: "usage", sentence: "「都合」の正しい使い方はどれですか。", answer: "日曜日のご都合はいかがですか。", distractors: ["日曜日のご都合をいかがですか。", "日曜日はご都合がいかがでした。", "日曜日のご都合はいかがでございましたか、来週も。"] },
      { type: "particle", sentence: "都合[つごう]＿＿悪[わる]いので、行[い]けません。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "予定": [
      { type: "kanji", sentence: "夏休[なつやす]みの＿＿はもう決[き]まりましたか。", distractors: ["予約", "決定", "予想"] },
      { type: "usage", sentence: "「予定」の正しい使い方はどれですか。", answer: "夏休みの予定はもう決まりましたか。", distractors: ["夏休みの予定をもう決まりましたか。", "夏休みは予定がもう決まりましたか、いつも。", "夏休みの予定はもう決められましたか、先生に。"] },
      { type: "particle", sentence: "夏休[なつやす]みの予定[よてい]＿＿決[き]まりましたか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "約束する": [
      { type: "kanji", sentence: "いっしょに旅行[りょこう]に行[い]く＿＿をしました。", distractors: ["予約する", "拘束する", "集合する"] },
      { type: "usage", sentence: "「約束する」の正しい使い方はどれですか。", answer: "いっしょに旅行に行く約束をしました。", distractors: ["いっしょに旅行に行く約束しました。", "いっしょに旅行に行く約束をされました。", "いっしょに旅行に行く約束が しました。"] },
      { type: "particle", sentence: "友達[ともだち]と映画[えいが]を見[み]に行[い]く約束[やくそく]＿＿しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "迎える": [
      { type: "kanji", sentence: "駅[えき]に友達[ともだち]を＿＿に行[い]きました。", distractors: ["向かえる", "教える", "送る"] },
      { type: "usage", sentence: "「迎える」の正しい使い方はどれですか。", answer: "駅に友達を迎えに行きました。", distractors: ["駅で友達を迎えに行きました。", "駅に友達が迎えに行きました。", "駅に友達を迎えられに行きました。"] },
      { type: "particle", sentence: "駅[えき]に友達[ともだち]＿＿迎[むか]えに行[い]きました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "戻る": [
      { type: "kanji", sentence: "12時[じ]に部屋[へや]に＿＿ました。", distractors: ["届く", "戻す", "通る"] },
      { type: "usage", sentence: "「戻る」の正しい使い方はどれですか。", answer: "12時に部屋に戻りました。", distractors: ["12時に部屋を戻りました。", "12時に部屋が戻りました。", "12時に部屋に戻されました。"] },
      { type: "particle", sentence: "12時[じ]に部屋[へや]＿＿戻[もど]りました。", answer: "に", distractors: ["で", "を", "が"] }
    ],
    "かかる": [
      { type: "kanji", sentence: "ドアに鍵[かぎ]が＿＿ています。", distractors: ["閉まる", "開く", "壊れる"] },
      { type: "usage", sentence: "「かかる」の正しい使い方はどれですか。", answer: "バスのエンジンがかかりました。", distractors: ["バスのエンジンをかかりました。", "バスのエンジンにかかりました。", "バスのエンジンがかけました。"] },
      { type: "particle", sentence: "バスのエンジン＿＿かかりました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "聞こえる": [
      { type: "kanji", sentence: "鳥[とり]の声[こえ]が＿＿ます。", distractors: ["聞く", "見える", "分かる"] },
      { type: "usage", sentence: "「聞こえる」の正しい使い方はどれですか。", answer: "鳥の声が聞こえます。", distractors: ["鳥の声を聞こえます。", "鳥の声は聞こえました、いつも。", "鳥の声が聞こえられます。"] },
      { type: "particle", sentence: "鳥[とり]の声[こえ]＿＿聞[き]こえます。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "見える": [
      { type: "kanji", sentence: "電車[でんしゃ]の窓[まど]から富士山[ふじさん]が＿＿ました。", distractors: ["見る", "見せる", "聞こえる"] },
      { type: "usage", sentence: "「見える」の正しい使い方はどれですか。", answer: "電車の窓から富士山が見えました。", distractors: ["電車の窓から富士山を見えました。", "電車の窓は富士山が見ました。", "電車の窓から富士山が見られました。"] },
      { type: "particle", sentence: "電車[でんしゃ]の窓[まど]から富士山[ふじさん]＿＿見[み]えました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "騒ぐ": [
      { type: "kanji", sentence: "子供[こども]たちが＿＿で、大変[たいへん]でした。", distractors: ["触る", "遊ぶ", "騒がしい"] },
      { type: "usage", sentence: "「騒ぐ」の正しい使い方はどれですか。", answer: "子供たちが騒いで、大変でした。", distractors: ["子供たちを騒いで、大変でした。", "子供たちが騒がせて、大変でした。", "子供たちが騒ぐで、大変でした。"] },
      { type: "particle", sentence: "子供[こども]たち＿＿騒[さわ]いで、大変[たいへん]でした。", answer: "が", distractors: ["を", "に", "で"] }
    ],

    // ---------- 12課 生活② ----------
    "サンドイッチ": [
      { type: "kanji", sentence: "朝[あさ]ご飯[はん]に卵[たまご]の＿＿を作[つく]りました。", distractors: ["おにぎり", "トースト", "サラダ"] },
      { type: "usage", sentence: "「サンドイッチ」の正しい使い方はどれですか。", answer: "卵のサンドイッチを作りました。", distractors: ["卵のサンドイッチが作りました。", "卵のサンドイッチに作りました。", "卵のサンドイッチを作られました、母に。"] }
    ],
    "ガム": [
      { type: "kanji", sentence: "授業中[じゅぎょうちゅう]に＿＿をかんではいけません。", distractors: ["あめ", "キャンディー", "チョコレート"] },
      { type: "usage", sentence: "「ガム」の正しい使い方はどれですか。", answer: "お店でガムをもらいました。", distractors: ["お店でガムがもらいました。", "お店はガムをもらいました、いつも。", "お店でガムをもらわれました。"] }
    ],
    "ミルク": [
      { type: "kanji", sentence: "紅茶[こうちゃ]に＿＿を入[い]れます。", distractors: ["さとう", "レモン", "こおり"] },
      { type: "usage", sentence: "「ミルク」の正しい使い方はどれですか。", answer: "いつも紅茶にミルクを入れます。", distractors: ["いつも紅茶にミルクが入れます。", "いつも紅茶はミルクを入れました。", "いつも紅茶にミルクを入れられます。"] }
    ],
    "(お)湯": [
      { type: "kanji", sentence: "＿＿を入[い]れて、3分[ぷん]待[ま]ちます。", distractors: ["水", "温泉", "氷"] },
      { type: "usage", sentence: "「(お)湯」の正しい使い方はどれですか。", answer: "お湯を入れて、3分待ちます。", distractors: ["お湯が入れて、3分待ちます。", "お湯を入れて、3分待たれます。", "お湯は入れて、3分待ちました、いつも。"] },
      { type: "particle", sentence: "お湯[ゆ]＿＿入[い]れて、3分[ぷん]待[ま]ちます。", answer: "を", distractors: ["に", "が", "で"] }
    ],
    "味": [
      { type: "kanji", sentence: "日本[にほん]の料理[りょうり]は＿＿が甘[あま]いと思[おも]います。", distractors: ["意味", "趣味", "香り"] },
      { type: "usage", sentence: "「味」の正しい使い方はどれですか。", answer: "日本の料理は味が甘いと思います。", distractors: ["日本の料理は味を甘いと思います。", "日本の料理を味が甘いと思います。", "日本の料理は味が甘くと思います。"] },
      { type: "particle", sentence: "日本[にほん]の料理[りょうり]は味[あじ]＿＿甘[あま]いと思[おも]います。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "ガス": [
      { type: "kanji", sentence: "料理[りょうり]をするから、＿＿をつけてください。", distractors: ["でんき", "すいどう", "でんわ"] },
      { type: "usage", sentence: "「ガス」の正しい使い方はどれですか。", answer: "ガスをつけてください。", distractors: ["ガスにつけてください。", "ガスがつけてください。", "ガスをつかれてください。"] }
    ],
    "ごちそうする": [
      { type: "kanji", sentence: "友達[ともだち]に晩[ばん]ご飯[はん]を＿＿しました。", distractors: ["招待", "用意", "注文"] },
      { type: "usage", sentence: "「ごちそうする」の正しい使い方はどれですか。", answer: "友達に晩ご飯をごちそうしました。", distractors: ["友達に晩ご飯がごちそうしました。", "友達は晩ご飯をごちそうされました。", "友達に晩ご飯にごちそうしました。"] },
      { type: "particle", sentence: "友達[ともだち]に晩[ばん]ご飯[はん]＿＿ごちそうしました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "食事する": [
      { type: "kanji", sentence: "レストランで＿＿をしました。", distractors: ["外食する", "就職する", "食べる"] },
      { type: "usage", sentence: "「食事する」の正しい使い方はどれですか。", answer: "レストランで食事をしました。", distractors: ["レストランを食事をしました。", "レストランで食事しました、を。", "レストランに食事をされました。"] },
      { type: "particle", sentence: "レストラン＿＿食事[しょくじ]をしました。", answer: "で", distractors: ["に", "を", "が"] }
    ],
    "片付ける": [
      { type: "kanji", sentence: "食事[しょくじ]の後[あと]で、お皿[さら]を＿＿ました。", distractors: ["片付く", "付ける", "届ける"] },
      { type: "usage", sentence: "「片付ける」の正しい使い方はどれですか。", answer: "お皿を片付けました。", distractors: ["お皿が片付けました。", "お皿に片付けました。", "お皿を片付かれました。"] },
      { type: "particle", sentence: "食事[しょくじ]の後[あと]で、お皿[さら]＿＿片付[かたづ]けました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "かむ": [
      { type: "kanji", sentence: "よく＿＿で、食[た]べましょう。", distractors: ["飲んで", "味わって", "かじって"] },
      { type: "usage", sentence: "「かむ」の正しい使い方はどれですか。", answer: "よくかんで、食べましょう。", distractors: ["よくかむで、食べましょう。", "よくかんでは、食べましょう。", "よくかまれて、食べましょう。"] },
      { type: "particle", sentence: "ガム＿＿かんでいます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "残る": [
      { type: "kanji", sentence: "食[た]べ物[もの]がたくさん＿＿ました。", distractors: ["残す", "余る", "消える"] },
      { type: "usage", sentence: "「残る」の正しい使い方はどれですか。", answer: "食べ物がたくさん残りました。", distractors: ["食べ物をたくさん残りました。", "食べ物はたくさん残しました、私が。", "食べ物がたくさん残られました。"] },
      { type: "particle", sentence: "食[た]べ物[もの]＿＿たくさん残[のこ]りました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "冷やす": [
      { type: "kanji", sentence: "冷蔵庫[れいぞうこ]でビールを＿＿しましょう。", distractors: ["冷える", "冷たい", "温める"] },
      { type: "usage", sentence: "「冷やす」の正しい使い方はどれですか。", answer: "冷蔵庫でビールを冷やしましょう。", distractors: ["冷蔵庫でビールが冷やしましょう。", "冷蔵庫はビールを冷やされました。", "冷蔵庫でビールに冷やしましょう。"] },
      { type: "particle", sentence: "冷蔵庫[れいぞうこ]でビール＿＿冷[ひ]やしましょう。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "たいてい": [
      { type: "kanji", sentence: "朝[あさ]は＿＿パンを食[た]べます。", distractors: ["ときどき", "たまに", "めったに"] },
      { type: "usage", sentence: "「たいてい」の正しい使い方はどれですか。", answer: "朝はたいていパンを食べます。", distractors: ["朝はたいていのパンを食べます。", "朝はたいていにパンを食べます。", "朝はたいていだパンを食べます。"] }
    ],
    "なかなか": [
      { type: "kanji", sentence: "料理[りょうり]が＿＿来[き]ませんでした。", distractors: ["すぐに", "もうすぐ", "やっと"] },
      { type: "usage", sentence: "「なかなか」の正しい使い方はどれですか。", answer: "料理がなかなか来ませんでした。", distractors: ["料理がなかなか来ました、すぐに。", "料理はなかなかの来ませんでした。", "料理がなかなかに来ませんでした。"] }
    ],

    // ---------- 13課 生活③ ----------
    "ジャケット": [
      { type: "kanji", sentence: "寒[さむ]いので、＿＿を脱[ぬ]ぎました。", distractors: ["コート", "セーター", "シャツ"] },
      { type: "usage", sentence: "「ジャケット」の正しい使い方はどれですか。", answer: "ジャケットを脱ぎました。", distractors: ["ジャケットが脱ぎました。", "ジャケットに脱ぎました。", "ジャケットを脱がれました。"] }
    ],
    "下着": [
      { type: "kanji", sentence: "新[あたら]しい＿＿を買[か]いました。", distractors: ["上着", "下手", "着物"] },
      { type: "usage", sentence: "「下着」の正しい使い方はどれですか。", answer: "新しい下着を買いました。", distractors: ["新しい下着が買いました。", "新しい下着に買いました。", "新しい下着を買われました。"] },
      { type: "particle", sentence: "新[あたら]しい下着[したぎ]＿＿買[か]いました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "道具": [
      { type: "kanji", sentence: "これは野菜[やさい]を切[き]る＿＿です。", distractors: ["家具", "道路", "用具"] },
      { type: "usage", sentence: "「道具」の正しい使い方はどれですか。", answer: "この道具は何ですか。", distractors: ["この道具を何ですか。", "この道具が何でございましたか。", "この道具は何をですか。"] },
      { type: "particle", sentence: "この道具[どうぐ]＿＿何[なん]ですか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "忘れ物": [
      { type: "kanji", sentence: "これは田中[たなか]さんの＿＿です。", distractors: ["落とし物", "買い物", "忘れる"] },
      { type: "usage", sentence: "「忘れ物」の正しい使い方はどれですか。", answer: "これは田中さんの忘れ物です。", distractors: ["これは田中さんの忘れ物をです。", "これは田中さんが忘れ物です。", "これは田中さんの忘れ物でされます。"] },
      { type: "particle", sentence: "忘[わす]れ物[もの]＿＿ないように、気[き]をつけてください。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "クリーニングする": [
      { type: "kanji", sentence: "このスーツを＿＿に出[だ]しました。", distractors: ["洗濯", "修理", "掃除"] },
      { type: "usage", sentence: "「クリーニングする」の正しい使い方はどれですか。", answer: "この服はクリーニングできません。", distractors: ["この服はクリーニングしできません。", "この服にクリーニングできません。", "この服はクリーニングをさせません。"] }
    ],
    "生活する": [
      { type: "kanji", sentence: "日本[にほん]で＿＿しています。", distractors: ["生産する", "成功する", "製作する"] },
      { type: "usage", sentence: "「生活する」の正しい使い方はどれですか。", answer: "日本で生活しています。", distractors: ["日本を生活しています。", "日本は生活されています。", "日本に生活しています。"] },
      { type: "particle", sentence: "日本[にほん]で生活[せいかつ]＿＿しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "植える": [
      { type: "kanji", sentence: "庭[にわ]に花[はな]を＿＿ました。", distractors: ["飢える", "植わる", "埋める"] },
      { type: "usage", sentence: "「植える」の正しい使い方はどれですか。", answer: "庭に花を植えました。", distractors: ["庭が花を植えました。", "庭に花が植えました。", "庭に花を植わりました。"] },
      { type: "particle", sentence: "庭[にわ]に花[はな]＿＿植[う]えました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "消える": [
      { type: "kanji", sentence: "テレビが＿＿います。", distractors: ["消す", "冷める", "切れる"] },
      { type: "usage", sentence: "「消える」の正しい使い方はどれですか。", answer: "電気が消えています。", distractors: ["電気を消えています。", "電気は消しています、だれかが。", "電気が消えられています。"] },
      { type: "particle", sentence: "電気[でんき]＿＿消[き]えています。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "つく": [
      { type: "kanji", sentence: "部屋[へや]の電気[でんき]が＿＿ました。", distractors: ["着く", "付く", "突く"] },
      { type: "usage", sentence: "「つく」の正しい使い方はどれですか。", answer: "部屋の電気がつきました。", distractors: ["部屋の電気をつきました。", "部屋は電気がつけました、だれかが。", "部屋の電気がつけられました。"] },
      { type: "particle", sentence: "部屋[へや]の電気[でんき]＿＿つきました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "はく": [
      { type: "kanji", sentence: "今日[きょう]は赤[あか]い靴[くつ]を＿＿ます。", distractors: ["掃く", "吐く", "着る"] },
      { type: "usage", sentence: "「はく」の正しい使い方はどれですか。", answer: "今日は赤い靴をはきます。", distractors: ["今日は赤い靴にはきます。", "今日は赤い靴がはきます。", "今日は赤い靴をはかれます。"] },
      { type: "particle", sentence: "今日[きょう]は赤[あか]い靴[くつ]＿＿はきます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "引く": [
      { type: "kanji", sentence: "そのドアを＿＿ください。", distractors: ["弾く", "押す", "轢く"] },
      { type: "usage", sentence: "「引く」の正しい使い方はどれですか。", answer: "そのドアは引いてください。", distractors: ["そのドアに引いてください。", "そのドアが引いてください。", "そのドアは引かれてください。"] },
      { type: "particle", sentence: "そのドア＿＿引[ひ]いてください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "拾う": [
      { type: "kanji", sentence: "道[みち]でお金[かね]を＿＿ました。", distractors: ["捨てる", "洗う", "失う"] },
      { type: "usage", sentence: "「拾う」の正しい使い方はどれですか。", answer: "道でお金を拾いました。", distractors: ["道でお金が拾いました。", "道はお金を拾われました。", "道でお金に拾いました。"] },
      { type: "particle", sentence: "道[みち]でお金[かね]＿＿拾[ひろ]いました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "汚れる": [
      { type: "kanji", sentence: "ワインで服[ふく]が＿＿ました。", distractors: ["汚す", "疲れる", "壊れる"] },
      { type: "usage", sentence: "「汚れる」の正しい使い方はどれですか。", answer: "ワインで服が汚れました。", distractors: ["ワインを服が汚れました。", "ワインで服を汚しました、だれかが。", "ワインで服が汚されました。"] },
      { type: "particle", sentence: "ワイン＿＿服[ふく]が汚[よご]れました。", answer: "で", distractors: ["を", "に", "が"] }
    ],
    "気をつける": [
      { type: "kanji", sentence: "風邪[かぜ]に＿＿ください。", distractors: ["気にする", "気がつく", "気に入る"] },
      { type: "usage", sentence: "「気をつける」の正しい使い方はどれですか。", answer: "風邪に気をつけてください。", distractors: ["風邪に気がつけてください。", "風邪を気をつけてください。", "風邪に気をつかれてください。"] },
      { type: "collocation", sentence: "風邪[かぜ]に＿＿つけてください。", answer: "気を", distractors: ["心を", "身を", "力を"] }
    ],
    "十分": [
      { type: "kanji", sentence: "たくさん食[た]べましたから、もう＿＿です。", distractors: ["半分", "自分", "気分"] },
      { type: "usage", sentence: "「十分」の正しい使い方はどれですか。", answer: "たくさん食べましたから、もう十分です。", distractors: ["たくさん食べましたから、もう十分いです。", "たくさん食べましたから、もう十分くです。", "たくさん食べましたから、もう十分をです。"] },
      { type: "grammar", sentence: "十分[じゅうぶん]＿＿休[やす]みました。", answer: "に", distractors: ["を", "が", "で"] }
    ],

    // ---------- 14課 生活④ ----------
    "鏡": [
      { type: "kanji", sentence: "部屋[へや]に大[おお]きな＿＿があります。", distractors: ["眼鏡", "窓", "画面"] },
      { type: "usage", sentence: "「鏡」の正しい使い方はどれですか。", answer: "部屋に大きな鏡があります。", distractors: ["部屋に大きな鏡をあります。", "部屋は大きな鏡がありました、いつも。", "部屋に大きな鏡がございませんでした。"] },
      { type: "particle", sentence: "部屋[へや]に大[おお]きな鏡[かがみ]＿＿あります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "人形": [
      { type: "kanji", sentence: "かわいい＿＿を買[か]いました。", distractors: ["人間", "形", "変形"] },
      { type: "usage", sentence: "「人形」の正しい使い方はどれですか。", answer: "かわいい人形を買いました。", distractors: ["かわいい人形が買いました。", "かわいい人形に買いました。", "かわいい人形を買われました。"] },
      { type: "particle", sentence: "かわいい人形[にんぎょう]＿＿買[か]いました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "引き出し": [
      { type: "kanji", sentence: "服[ふく]を＿＿に入[い]れます。", distractors: ["押し入れ", "出口", "貸し出し"] },
      { type: "usage", sentence: "「引き出し」の正しい使い方はどれですか。", answer: "服を引き出しに入れます。", distractors: ["服が引き出しに入れます。", "服を引き出しが入れます。", "服を引き出しで入れられます。"] },
      { type: "particle", sentence: "服[ふく]を引[ひ]き出[だ]し＿＿入[い]れます。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "枝": [
      { type: "kanji", sentence: "長[なが]くなった＿＿を切[き]りました。", distractors: ["葉", "根", "幹"] },
      { type: "usage", sentence: "「枝」の正しい使い方はどれですか。", answer: "長くなった枝を切りました。", distractors: ["長くなった枝が切りました。", "長くなった枝に切りました。", "長くなった枝は切られました、庭師に。"] },
      { type: "particle", sentence: "長[なが]くなった枝[えだ]＿＿切[き]りました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "ガラス": [
      { type: "kanji", sentence: "＿＿のお皿[さら]でご飯[はん]を食[た]べました。", distractors: ["プラスチック", "陶器", "木製"] },
      { type: "usage", sentence: "「ガラス」の正しい使い方はどれですか。", answer: "ガラスのお皿でご飯を食べました。", distractors: ["ガラスのお皿がご飯を食べました。", "ガラスのお皿でご飯が食べました。", "ガラスのお皿でご飯を食べられました。"] }
    ],
    "真ん中": [
      { type: "kanji", sentence: "部屋[へや]の＿＿にベッドを置[お]きました。", distractors: ["途中", "中心", "真っ直ぐ"] },
      { type: "usage", sentence: "「真ん中」の正しい使い方はどれですか。", answer: "部屋の真ん中にベッドを置きました。", distractors: ["部屋の真ん中をベッドを置きました。", "部屋は真ん中にベッドを置きました、いつも。", "部屋の真ん中にベッドが置かれました。"] },
      { type: "particle", sentence: "部屋[へや]の真[ま]ん中＿＿ベッドを置[お]きました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "隅": [
      { type: "kanji", sentence: "部屋[へや]の＿＿にテレビがあります。", distractors: ["角", "端", "奥"] },
      { type: "usage", sentence: "「隅」の正しい使い方はどれですか。", answer: "部屋の隅にテレビがあります。", distractors: ["部屋の隅をテレビがあります。", "部屋は隅にテレビがありました、いつも。", "部屋の隅にテレビをあります。"] },
      { type: "particle", sentence: "部屋[へや]の隅[すみ]＿＿テレビがあります。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "落とす": [
      { type: "kanji", sentence: "コップを＿＿ました。", distractors: ["落ちる", "落とし物", "落ち込む"] },
      { type: "usage", sentence: "「落とす」の正しい使い方はどれですか。", answer: "コップを落としました。", distractors: ["コップが落としました。", "コップに落としました。", "コップを落とされました、私が。"] },
      { type: "particle", sentence: "コップ＿＿落[お]としました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "変える": [
      { type: "kanji", sentence: "机[つくえ]の場所[ばしょ]を＿＿ました。", distractors: ["変わる", "帰る", "換える"] },
      { type: "usage", sentence: "「変える」の正しい使い方はどれですか。", answer: "机の場所を変えました。", distractors: ["机の場所が変えました。", "机の場所に変えました。", "机の場所を変わりました、だれかが。"] },
      { type: "particle", sentence: "机[つくえ]の場所[ばしょ]＿＿変[か]えました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "かける": [
      { type: "kanji", sentence: "ドアの横[よこ]にカレンダーを＿＿ました。", distractors: ["欠ける", "駆ける", "架ける"] },
      { type: "usage", sentence: "「かける」の正しい使い方はどれですか。", answer: "魚にしょうゆをかけて食べました。", distractors: ["魚がしょうゆをかけて食べました。", "魚にしょうゆがかけて食べました。", "魚にしょうゆをかけられて食べました。"] },
      { type: "particle", sentence: "ドアの横[よこ]にカレンダー＿＿かけました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "飾る": [
      { type: "kanji", sentence: "玄関[げんかん]に絵[え]を＿＿ました。", distractors: ["飾り", "塗る", "並べる"] },
      { type: "usage", sentence: "「飾る」の正しい使い方はどれですか。", answer: "玄関に絵を飾りました。", distractors: ["玄関が絵を飾りました。", "玄関に絵が飾りました。", "玄関に絵を飾られました。"] },
      { type: "particle", sentence: "玄関[げんかん]に絵[え]＿＿飾[かざ]りました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "取り替える": [
      { type: "kanji", sentence: "花瓶[かびん]の水[みず]を＿＿ました。", distractors: ["着替える", "入れ替える", "取り消す"] },
      { type: "usage", sentence: "「取り替える」の正しい使い方はどれですか。", answer: "花瓶の水を取り替えました。", distractors: ["花瓶の水が取り替えました。", "花瓶の水に取り替えました。", "花瓶の水を取り替えられました。"] },
      { type: "particle", sentence: "花瓶[かびん]の水[みず]＿＿取[と]り替[か]えました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "折れる": [
      { type: "kanji", sentence: "強[つよ]い風[かぜ]で枝[えだ]が＿＿ました。", distractors: ["折る", "倒れる", "割れる"] },
      { type: "usage", sentence: "「折れる」の正しい使い方はどれですか。", answer: "お箸が折れました。", distractors: ["お箸を折れました。", "お箸は折りました、だれかが。", "お箸が折られました。"] },
      { type: "particle", sentence: "強[つよ]い風[かぜ]で枝[えだ]＿＿折[お]れました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "壊れる": [
      { type: "kanji", sentence: "テレビが＿＿ました。", distractors: ["壊す", "怖い", "割れる"] },
      { type: "usage", sentence: "「壊れる」の正しい使い方はどれですか。", answer: "テレビが壊れました。", distractors: ["テレビを壊れました。", "テレビは壊しました、だれかが。", "テレビが壊されました。"] },
      { type: "particle", sentence: "テレビ＿＿壊[こわ]れました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "割れる": [
      { type: "kanji", sentence: "お皿[さら]が＿＿ました。", distractors: ["割る", "破れる", "折れる"] },
      { type: "usage", sentence: "「割れる」の正しい使い方はどれですか。", answer: "お皿が割れました。", distractors: ["お皿を割れました。", "お皿は割りました、だれかが。", "お皿が割られました。"] },
      { type: "particle", sentence: "お皿[さら]＿＿割[わ]れました。", answer: "が", distractors: ["を", "に", "で"] }
    ],

    // ---------- 15課 買い物② ----------
    "財布": [
      { type: "kanji", sentence: "＿＿を落[お]としてしまいました。", distractors: ["財産", "布", "小銭入れ"] },
      { type: "usage", sentence: "「財布」の正しい使い方はどれですか。", answer: "財布を落としてしまいました。", distractors: ["財布が落としてしまいました。", "財布に落としてしまいました。", "財布を落とされてしまいました。"] },
      { type: "particle", sentence: "財布[さいふ]＿＿落[お]としてしまいました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "品物": [
      { type: "kanji", sentence: "あの店[みせ]は＿＿がいい物[もの]が多[おお]いです。", distractors: ["建物", "食べ物", "製品"] },
      { type: "usage", sentence: "「品物」の正しい使い方はどれですか。", answer: "あの店は品物がいい物が多いです。", distractors: ["あの店は品物をいい物が多いです。", "あの店に品物がいい物が多いです。", "あの店は品物がいい物を多いです。"] },
      { type: "particle", sentence: "あの店[みせ]は品物[しなもの]＿＿いい物[もの]が多[おお]いです。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "値段": [
      { type: "kanji", sentence: "日本[にほん]は果物[くだもの]の＿＿が高[たか]いです。", distractors: ["段階", "値打ち", "料金"] },
      { type: "usage", sentence: "「値段」の正しい使い方はどれですか。", answer: "日本は果物の値段が高いです。", distractors: ["日本は果物の値段を高いです。", "日本を果物の値段が高いです。", "日本は果物の値段が高くさせます。"] },
      { type: "particle", sentence: "日本[にほん]は果物[くだもの]の値段[ねだん]＿＿高[たか]いです。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "ボーナス": [
      { type: "kanji", sentence: "今年[ことし]は＿＿をたくさんもらいました。", distractors: ["きゅうりょう", "てあて", "ちょきん"] },
      { type: "usage", sentence: "「ボーナス」の正しい使い方はどれですか。", answer: "今年はボーナスをたくさんもらいました。", distractors: ["今年はボーナスがたくさんもらいました。", "今年はボーナスにたくさんもらいました。", "今年はボーナスをたくさんもらわれました。"] }
    ],
    "平日": [
      { type: "kanji", sentence: "＿＿は買[か]い物[もの]になかなか行[い]けません。", distractors: ["休日", "平和", "毎日"] },
      { type: "usage", sentence: "「平日」の正しい使い方はどれですか。", answer: "平日は買い物になかなか行けません。", distractors: ["平日を買い物になかなか行けません。", "平日に買い物になかなか行けません。", "平日は買い物へなかなか行かれません。"] },
      { type: "particle", sentence: "平日[へいじつ]＿＿買[か]い物[もの]になかなか行[い]けません。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "メモする": [
      { type: "kanji", sentence: "忘[わす]れないように、電話番号[でんわばんごう]を＿＿しました。", distractors: ["記録", "確認", "連絡"] },
      { type: "usage", sentence: "「メモする」の正しい使い方はどれですか。", answer: "買う物をメモしておきました。", distractors: ["買う物がメモしておきました。", "買う物にメモしておきました。", "買う物をメモされておきました。"] }
    ],
    "開く": [
      { type: "kanji", sentence: "スーパーは朝[あさ]10時[じ]に＿＿ます。", distractors: ["開ける", "空く", "閉じる"] },
      { type: "usage", sentence: "「開く」の正しい使い方はどれですか。", answer: "スーパーは朝10時に開きます。", distractors: ["スーパーを朝10時に開きます。", "スーパーは朝10時に開けます、店員が。", "スーパーは朝10時に開かれます。"] },
      { type: "particle", sentence: "スーパー＿＿朝[あさ]10時[じ]に開[あ]きます。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "売れる": [
      { type: "kanji", sentence: "きょうはケーキが＿＿ました。", distractors: ["売る", "買える", "流行る"] },
      { type: "usage", sentence: "「売れる」の正しい使い方はどれですか。", answer: "きょうはケーキがたくさん売れました。", distractors: ["きょうはケーキをたくさん売れました。", "きょうはケーキがたくさん売りました、店員が。", "きょうはケーキがたくさん売られました。"] },
      { type: "particle", sentence: "きょうはケーキ＿＿たくさん売[う]れました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "選ぶ": [
      { type: "kanji", sentence: "母[はは]にプレゼントを＿＿でいます。", distractors: ["遊ぶ", "呼ぶ", "偉い"] },
      { type: "usage", sentence: "「選ぶ」の正しい使い方はどれですか。", answer: "母にプレゼントを選んでいます。", distractors: ["母にプレゼントが選んでいます。", "母のプレゼントを選んでいます、いつも。", "母にプレゼントを選ばれています。"] },
      { type: "particle", sentence: "母[はは]にプレゼント＿＿選[えら]んでいます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "閉まる": [
      { type: "kanji", sentence: "デパートは午後[ごご]8時[じ]に＿＿ます。", distractors: ["閉める", "始まる", "閉じる"] },
      { type: "usage", sentence: "「閉まる」の正しい使い方はどれですか。", answer: "デパートは午後8時に閉まります。", distractors: ["デパートを午後8時に閉まります。", "デパートは午後8時に閉めます、店員が。", "デパートは午後8時に閉められます。"] },
      { type: "particle", sentence: "デパート＿＿午後[ごご]8時[じ]に閉[し]まります。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "なくす": [
      { type: "kanji", sentence: "カードを＿＿ました。", distractors: ["なくなる", "捜す", "忘れる"] },
      { type: "usage", sentence: "「なくす」の正しい使い方はどれですか。", answer: "カードをなくしました。", distractors: ["カードがなくしました。", "カードはなくなりました、いつのまにか。", "カードをなくされました。"] },
      { type: "particle", sentence: "カード＿＿なくしました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "足りる": [
      { type: "kanji", sentence: "お金[かね]が＿＿ませんでした。", distractors: ["借りる", "頼る", "足"] },
      { type: "usage", sentence: "「足りる」の正しい使い方はどれですか。", answer: "お金が足りませんでした。", distractors: ["お金を足りませんでした。", "お金は足られませんでした。", "お金が足りさせませんでした。"] },
      { type: "particle", sentence: "お金[かね]＿＿足[た]りませんでした。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "見つける": [
      { type: "kanji", sentence: "きれいな色[いろ]のシャツを＿＿ました。", distractors: ["見つかる", "見つめる", "探す"] },
      { type: "usage", sentence: "「見つける」の正しい使い方はどれですか。", answer: "きれいな色のシャツを見つけました。", distractors: ["きれいな色のシャツが見つけました。", "きれいな色のシャツに見つけました。", "きれいな色のシャツを見つかりました。"] },
      { type: "particle", sentence: "きれいな色[いろ]のシャツ＿＿見[み]つけました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "むだ": [
      { type: "kanji", sentence: "＿＿な物[もの]を買[か]わないでください。", distractors: ["ひつような", "べんりな", "とくべつな"] },
      { type: "usage", sentence: "「むだ」の正しい使い方はどれですか。", answer: "むだな物を買わないでください。", distractors: ["むだの物を買わないでください。", "むだい物を買わないでください。", "むだく物を買わないでください。"] }
    ],
    // ---------- 16課 学校② ----------
    "講義": [
      { type: "kanji", sentence: "田中先生[たなかせんせい]の＿＿はおもしろいです。", distractors: ["会議", "講演", "議論"] },
      { type: "usage", sentence: "「講義」の正しい使い方はどれですか。", answer: "田中先生の講義はおもしろいです。", distractors: ["田中先生の講義をおもしろいです。", "田中先生は講義がおもしろくさせます。", "田中先生の講義におもしろいです。"] },
      { type: "particle", sentence: "田中先生[たなかせんせい]の講義[こうぎ]＿＿おもしろいです。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "席": [
      { type: "kanji", sentence: "この＿＿は空[あ]いていますか。", distractors: ["座席", "出席", "椅子"] },
      { type: "usage", sentence: "「席」の正しい使い方はどれですか。", answer: "この席は空いていますか。", distractors: ["この席を空いていますか。", "この席が空けていますか、だれかが。", "この席は空けられていますか。"] },
      { type: "particle", sentence: "この席[せき]＿＿空[あ]いていますか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "出席する": [
      { type: "kanji", sentence: "あしたの会議[かいぎ]に＿＿します。", distractors: ["出勤する", "出発する", "欠席する"] },
      { type: "usage", sentence: "「出席する」の正しい使い方はどれですか。", answer: "あしたの会議に出席します。", distractors: ["あしたの会議を出席します。", "あしたの会議が出席されます。", "あしたの会議は出席させます。"] },
      { type: "particle", sentence: "あしたの会議[かいぎ]＿＿出席[しゅっせき]します。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "返事する": [
      { type: "kanji", sentence: "メールにすぐ＿＿しました。", distractors: ["返信する", "変化する", "返却する"] },
      { type: "usage", sentence: "「返事する」の正しい使い方はどれですか。", answer: "メールにすぐ返事しました。", distractors: ["メールをすぐ返事しました。", "メールにすぐ返事されました。", "メールですぐ返事しました。"] },
      { type: "particle", sentence: "メール＿＿すぐ返事[へんじ]しました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "予習する": [
      { type: "kanji", sentence: "授業[じゅぎょう]の前[まえ]に＿＿します。", distractors: ["復習する", "練習する", "学習する"] },
      { type: "usage", sentence: "「予習する」の正しい使い方はどれですか。", answer: "授業の前に予習します。", distractors: ["授業の前を予習します。", "授業の前に予習されます。", "授業の前が予習します。"] },
      { type: "particle", sentence: "授業[じゅぎょう]の前[まえ]＿＿予習[よしゅう]します。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "復習する": [
      { type: "kanji", sentence: "授業[じゅぎょう]の後[あと]で＿＿します。", distractors: ["予習する", "練習する", "学習する"] },
      { type: "usage", sentence: "「復習する」の正しい使い方はどれですか。", answer: "授業の後で復習します。", distractors: ["授業の後を復習します。", "授業の後に復習されます。", "授業の後が復習します。"] },
      { type: "particle", sentence: "授業[じゅぎょう]の後[あと]＿＿復習[ふくしゅう]します。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "連絡する": [
      { type: "kanji", sentence: "先生[せんせい]に電話[でんわ]で＿＿しました。", distractors: ["連続する", "練習する", "記録する"] },
      { type: "usage", sentence: "「連絡する」の正しい使い方はどれですか。", answer: "先生に電話で連絡しました。", distractors: ["先生を電話で連絡しました。", "先生に電話で連絡されました。", "先生が電話で連絡されます。"] },
      { type: "particle", sentence: "先生[せんせい]に電話[でんわ]＿＿連絡[れんらく]しました。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "失敗する": [
      { type: "kanji", sentence: "テストで＿＿しました。", distractors: ["失礼する", "心配する", "成功する"] },
      { type: "usage", sentence: "「失敗する」の正しい使い方はどれですか。", answer: "テストで失敗しました。", distractors: ["テストを失敗しました。", "テストに失敗されました。", "テストが失敗させました。"] },
      { type: "particle", sentence: "テスト＿＿失敗[しっぱい]しました。", answer: "で", distractors: ["を", "が", "に"] }
    ],
    "出す": [
      { type: "kanji", sentence: "宿題[しゅくだい]を明日[あした]＿＿ください。", distractors: ["出る", "出かける", "貸す"] },
      { type: "usage", sentence: "「出す」の正しい使い方はどれですか。", answer: "宿題を明日出してください。", distractors: ["宿題が明日出してください。", "宿題に明日出してください。", "宿題を明日出られてください。"] },
      { type: "particle", sentence: "宿題[しゅくだい]＿＿明日[あした]出[だ]してください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "受ける": [
      { type: "kanji", sentence: "来月[らいげつ]、試験[しけん]を＿＿ます。", distractors: ["受かる", "受け取る", "売れる"] },
      { type: "usage", sentence: "「受ける」の正しい使い方はどれですか。", answer: "来月、試験を受けます。", distractors: ["来月、試験が受けます。", "来月、試験に受けられます。", "来月、試験は受けさせます。"] },
      { type: "particle", sentence: "来月[らいげつ]、試験[しけん]＿＿受[う]けます。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "通う": [
      { type: "kanji", sentence: "毎日[まいにち]、電車[でんしゃ]で学校[がっこう]に＿＿ています。", distractors: ["通る", "買う", "歌う"] },
      { type: "usage", sentence: "「通う」の正しい使い方はどれですか。", answer: "毎日、電車で学校に通っています。", distractors: ["毎日、電車で学校を通っています。", "毎日、電車で学校が通わせています。", "毎日、電車で学校に通われています。"] },
      { type: "particle", sentence: "毎日[まいにち]、電車[でんしゃ]で学校[がっこう]＿＿通[かよ]っています。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "急ぐ": [
      { type: "kanji", sentence: "遅刻[ちこく]しそうなので＿＿ました。", distractors: ["泳ぐ", "騒ぐ", "忙しい"] },
      { type: "usage", sentence: "「急ぐ」の正しい使い方はどれですか。", answer: "遅刻しそうなので急ぎました。", distractors: ["遅刻しそうなので急がれました。", "遅刻しそうなので急がせました。", "遅刻しそうなので急がさせました。"] }
    ],
    "間に合う": [
      { type: "kanji", sentence: "急[いそ]いだので、電車[でんしゃ]に＿＿ました。", distractors: ["似合う", "知り合う", "都合"] },
      { type: "usage", sentence: "「間に合う」の正しい使い方はどれですか。", answer: "急いだので、電車に間に合いました。", distractors: ["急いだので、電車を間に合いました。", "急いだので、電車が間に合わせました。", "急いだので、電車は間に合われました。"] },
      { type: "particle", sentence: "急[いそ]いだので、電車[でんしゃ]＿＿間[ま]に合[あ]いました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "遅れる": [
      { type: "kanji", sentence: "バスが＿＿ています。", distractors: ["遅い", "送れる", "遅らせる"] },
      { type: "usage", sentence: "「遅れる」の正しい使い方はどれですか。", answer: "バスが遅れています。", distractors: ["バスを遅れています。", "バスは遅らせています、いつも。", "バスが遅れさせています。"] },
      { type: "particle", sentence: "バス＿＿遅[おく]れています。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "まじめ": [
      { type: "kanji", sentence: "彼[かれ]は＿＿な学生[がくせい]です。", distractors: ["ねっしんな", "しんせつな", "げんきな"] },
      { type: "usage", sentence: "「まじめ」の正しい使い方はどれですか。", answer: "彼はまじめな学生です。", distractors: ["彼はまじめの学生です。", "彼はまじめい学生です。", "彼はまじめく学生です。"] }
    ],
    // ---------- 17課 学校③ ----------
    "廊下": [
      { type: "kanji", sentence: "＿＿を走[はし]らないでください。", distractors: ["地下", "階段", "教室"] },
      { type: "usage", sentence: "「廊下」の正しい使い方はどれですか。", answer: "廊下を走らないでください。", distractors: ["廊下が走らないでください。", "廊下に走らないでください。", "廊下は走られないでください。"] },
      { type: "particle", sentence: "廊下[ろうか]＿＿走[はし]らないでください。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "音": [
      { type: "kanji", sentence: "変[へん]な＿＿が聞[き]こえます。", distractors: ["声", "音楽", "騒音"] },
      { type: "usage", sentence: "「音」の正しい使い方はどれですか。", answer: "変な音が聞こえます。", distractors: ["変な音を聞こえます。", "変な音は聞かせます。", "変な音が聞かれさせます。"] },
      { type: "particle", sentence: "変[へん]な音[おと]＿＿聞[き]こえます。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "規則": [
      { type: "kanji", sentence: "この学校[がっこう]には＿＿がたくさんあります。", distractors: ["法律", "規定", "原則"] },
      { type: "usage", sentence: "「規則」の正しい使い方はどれですか。", answer: "この学校には規則がたくさんあります。", distractors: ["この学校には規則をたくさんあります。", "この学校には規則がたくさんいます。", "この学校には規則がたくさんさせます。"] },
      { type: "particle", sentence: "この学校[がっこう]には規則[きそく]＿＿たくさんあります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "意見": [
      { type: "kanji", sentence: "私[わたし]の＿＿を言[い]ってもいいですか。", distractors: ["意味", "発見", "経験"] },
      { type: "usage", sentence: "「意見」の正しい使い方はどれですか。", answer: "私の意見を言ってもいいですか。", distractors: ["私の意見が言ってもいいですか。", "私の意見に言ってもいいですか。", "私の意見は言われてもいいですか。"] },
      { type: "particle", sentence: "私[わたし]の意見[いけん]＿＿言[い]ってもいいですか。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "注意する": [
      { type: "kanji", sentence: "先生[せんせい]は学生[がくせい]に＿＿しました。", distractors: ["注目する", "中止する", "用意する"] },
      { type: "usage", sentence: "「注意する」の正しい使い方はどれですか。", answer: "先生は学生に注意しました。", distractors: ["先生は学生を注意しました。", "先生は学生が注意されました。", "先生は学生で注意しました。"] },
      { type: "particle", sentence: "先生[せんせい]は学生[がくせい]＿＿注意[ちゅうい]しました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "思い出す": [
      { type: "kanji", sentence: "子供[こども]のころのことを＿＿ました。", distractors: ["思い出", "忘れる", "気がつく"] },
      { type: "usage", sentence: "「思い出す」の正しい使い方はどれですか。", answer: "子供のころのことを思い出しました。", distractors: ["子供のころのことが思い出しました。", "子供のころのことに思い出しました。", "子供のころのことを思い出されました。"] },
      { type: "particle", sentence: "子供[こども]のころのこと＿＿思[おも]い出[だ]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "続ける": [
      { type: "kanji", sentence: "日本語[にほんご]の勉強[べんきょう]を＿＿ています。", distractors: ["続く", "片付ける", "止める"] },
      { type: "usage", sentence: "「続ける」の正しい使い方はどれですか。", answer: "日本語の勉強を続けています。", distractors: ["日本語の勉強が続けています。", "日本語の勉強に続けています。", "日本語の勉強を続かれています。"] },
      { type: "particle", sentence: "日本語[にほんご]の勉強[べんきょう]＿＿続[つづ]けています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "直す": [
      { type: "kanji", sentence: "間違[まちが]えたところを＿＿ました。", distractors: ["直る", "治す", "見直す"] },
      { type: "usage", sentence: "「直す」の正しい使い方はどれですか。", answer: "間違えたところを直しました。", distractors: ["間違えたところが直しました。", "間違えたところに直しました。", "間違えたところを直られました。"] },
      { type: "particle", sentence: "間違[まちが]えたところ＿＿直[なお]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "並べる": [
      { type: "kanji", sentence: "机[つくえ]の上[うえ]に本[ほん]を＿＿ました。", distractors: ["並ぶ", "比べる", "食べる"] },
      { type: "usage", sentence: "「並べる」の正しい使い方はどれですか。", answer: "机の上に本を並べました。", distractors: ["机の上が本を並べました。", "机の上に本が並べました。", "机の上に本を並びました。"] },
      { type: "particle", sentence: "机[つくえ]の上[うえ]に本[ほん]＿＿並[なら]べました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "間違える": [
      { type: "kanji", sentence: "答[こた]えを＿＿てしまいました。", distractors: ["間違う", "間違い", "間に合う"] },
      { type: "usage", sentence: "「間違える」の正しい使い方はどれですか。", answer: "答えを間違えてしまいました。", distractors: ["答えが間違えてしまいました。", "答えに間違えてしまいました。", "答えを間違われてしまいました。"] },
      { type: "particle", sentence: "答[こた]え＿＿間違[まちが]えてしまいました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "守る": [
      { type: "kanji", sentence: "規則[きそく]を＿＿なければなりません。", distractors: ["止まる", "決まる", "習う"] },
      { type: "usage", sentence: "「守る」の正しい使い方はどれですか。", answer: "規則を守らなければなりません。", distractors: ["規則が守らなければなりません。", "規則に守らなければなりません。", "規則を守られなければなりません。"] },
      { type: "particle", sentence: "規則[きそく]＿＿守[まも]らなければなりません。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "やめる": [
      { type: "kanji", sentence: "たばこを＿＿ました。", distractors: ["辞める", "止める", "終わる"] },
      { type: "usage", sentence: "「やめる」の正しい使い方はどれですか。", answer: "たばこをやめました。", distractors: ["たばこがやめました。", "たばこにやめました。", "たばこをやめられました。"] },
      { type: "particle", sentence: "たばこ＿＿やめました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "熱心": [
      { type: "kanji", sentence: "彼[かれ]は仕事[しごと]に＿＿です。", distractors: ["感心", "安心", "関心"] },
      { type: "usage", sentence: "「熱心」の正しい使い方はどれですか。", answer: "彼は仕事に熱心です。", distractors: ["彼は仕事に熱心いです。", "彼は仕事に熱心くです。", "彼は仕事を熱心です。"] },
      { type: "particle", sentence: "彼[かれ]は仕事[しごと]＿＿熱心[ねっしん]です。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "無理": [
      { type: "kanji", sentence: "今日中[きょうじゅう]に終[お]わらせるのは＿＿です。", distractors: ["無駄", "不便", "困難"] },
      { type: "usage", sentence: "「無理」の正しい使い方はどれですか。", answer: "今日中に終わらせるのは無理です。", distractors: ["今日中に終わらせるのは無理いです。", "今日中に終わらせるのは無理くです。", "今日中に終わらせるのを無理です。"] }
    ],
    "ずっと": [
      { type: "kanji", sentence: "朝[あさ]から＿＿雨[あめ]が降[ふ]っています。", distractors: ["すこし", "たまに", "すぐに"] },
      { type: "usage", sentence: "「ずっと」の正しい使い方はどれですか。", answer: "朝からずっと雨が降っています。", distractors: ["朝からずっとを雨が降っています。", "朝からずっとが雨に降っています。", "朝からずっとに雨は降っています。"] }
    ],
    // ---------- 18課 町② ----------
    "月": [
      { type: "kanji", sentence: "空[そら]に＿＿が出[で]ています。", distractors: ["星", "太陽", "雲"] },
      { type: "usage", sentence: "「月」の正しい使い方はどれですか。", answer: "空に月が出ています。", distractors: ["空を月が出ています。", "空に月を出ています。", "空は月が出されています。"] },
      { type: "particle", sentence: "空[そら]に月[つき]＿＿出[で]ています。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "教会": [
      { type: "kanji", sentence: "毎週日曜日[まいしゅうにちようび]に＿＿へ行[い]きます。", distractors: ["(お)寺", "神社", "会議"] },
      { type: "usage", sentence: "「教会」の正しい使い方はどれですか。", answer: "毎週日曜日に教会へ行きます。", distractors: ["毎週日曜日を教会へ行きます。", "毎週日曜日は教会に行かせます。", "毎週日曜日に教会が行かれます。"] },
      { type: "particle", sentence: "毎週日曜日[まいしゅうにちようび]に教会[きょうかい]＿＿行[い]きます。", answer: "へ", distractors: ["を", "が", "で"] }
    ],
    "景色": [
      { type: "kanji", sentence: "山[やま]の上[うえ]からの＿＿はきれいです。", distractors: ["風景", "様子", "景気"] },
      { type: "usage", sentence: "「景色」の正しい使い方はどれですか。", answer: "山の上からの景色はきれいです。", distractors: ["山の上からの景色をきれいです。", "山の上からの景色にきれいです。", "山の上からの景色はきれくです。"] },
      { type: "particle", sentence: "山[やま]の上[うえ]からの景色[けしき]＿＿きれいです。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "緑": [
      { type: "kanji", sentence: "公園[こうえん]には＿＿がたくさんあります。", distractors: ["森", "草", "青"] },
      { type: "usage", sentence: "「緑」の正しい使い方はどれですか。", answer: "公園には緑がたくさんあります。", distractors: ["公園には緑をたくさんあります。", "公園には緑がたくさんいます。", "公園には緑がたくさんさせます。"] },
      { type: "particle", sentence: "公園[こうえん]には緑[みどり]＿＿たくさんあります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "南": [
      { type: "kanji", sentence: "沖縄[おきなわ]は日本[にほん]の＿＿にあります。", distractors: ["北", "東", "西"] },
      { type: "usage", sentence: "「南」の正しい使い方はどれですか。", answer: "沖縄は日本の南にあります。", distractors: ["沖縄は日本の南をあります。", "沖縄は日本の南があります。", "沖縄は日本の南はあられます。"] },
      { type: "particle", sentence: "沖縄[おきなわ]は日本[にほん]の南[みなみ]＿＿あります。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "形": [
      { type: "kanji", sentence: "この雲[くも]は変[へん]な＿＿をしています。", distractors: ["色", "大きさ", "人形"] },
      { type: "usage", sentence: "「形」の正しい使い方はどれですか。", answer: "この雲は変な形をしています。", distractors: ["この雲は変な形にしています。", "この雲が変な形をされています。", "この雲は変な形をさせています。"] },
      { type: "particle", sentence: "この雲[くも]は変[へん]な形[かたち]＿＿しています。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "込む": [
      { type: "kanji", sentence: "電車[でんしゃ]が＿＿ています。", distractors: ["混む", "頼む", "進む"] },
      { type: "usage", sentence: "「込む」の正しい使い方はどれですか。", answer: "電車が込んでいます。", distractors: ["電車を込んでいます。", "電車は込ませています。", "電車が込まれています。"] },
      { type: "particle", sentence: "電車[でんしゃ]＿＿込[こ]んでいます。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "すく": [
      { type: "kanji", sentence: "この時間[じかん]はバスが＿＿ています。", distractors: ["込む", "晴れる", "空く"] },
      { type: "usage", sentence: "「すく」の正しい使い方はどれですか。", answer: "この時間はバスがすいています。", distractors: ["この時間はバスをすいています。", "この時間はバスにすいています。", "この時間はバスがすかれています。"] },
      { type: "particle", sentence: "この時間[じかん]はバス＿＿すいています。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "晴れる": [
      { type: "kanji", sentence: "あしたは＿＿でしょう。", distractors: ["腫れる", "曇る", "降る"] },
      { type: "usage", sentence: "「晴れる」の正しい使い方はどれですか。", answer: "あしたは晴れるでしょう。", distractors: ["あしたは晴れをでしょう。", "あしたは晴れにでしょう。", "あしたは晴れさせるでしょう。"] }
    ],
    "曇る": [
      { type: "kanji", sentence: "午後[ごご]から空[そら]が＿＿ました。", distractors: ["雲", "晴れる", "降る"] },
      { type: "usage", sentence: "「曇る」の正しい使い方はどれですか。", answer: "午後から空が曇りました。", distractors: ["午後から空を曇りました。", "午後から空に曇りました。", "午後から空が曇らせました。"] },
      { type: "particle", sentence: "午後[ごご]から空[そら]＿＿曇[くも]りました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "やむ": [
      { type: "kanji", sentence: "やっと雨[あめ]が＿＿ました。", distractors: ["止まる", "降る", "晴れる"] },
      { type: "usage", sentence: "「やむ」の正しい使い方はどれですか。", answer: "やっと雨がやみました。", distractors: ["やっと雨をやみました。", "やっと雨にやみました。", "やっと雨がやまれました。"] },
      { type: "particle", sentence: "やっと雨[あめ]＿＿やみました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "続く": [
      { type: "kanji", sentence: "この天気[てんき]はしばらく＿＿でしょう。", distractors: ["続ける", "片付く", "気がつく"] },
      { type: "usage", sentence: "「続く」の正しい使い方はどれですか。", answer: "この天気はしばらく続くでしょう。", distractors: ["この天気はしばらく続けるでしょう。", "この天気はしばらく続かせるでしょう。", "この天気はしばらく続かれるでしょう。"] }
    ],
    "建てる": [
      { type: "kanji", sentence: "駅[えき]の近[ちか]くに家[いえ]を＿＿ました。", distractors: ["建つ", "立てる", "育てる"] },
      { type: "usage", sentence: "「建てる」の正しい使い方はどれですか。", answer: "駅の近くに家を建てました。", distractors: ["駅の近くに家が建てました。", "駅の近くに家は建ちました、自然に。", "駅の近くに家を建たれました。"] },
      { type: "particle", sentence: "駅[えき]の近[ちか]くに家[いえ]＿＿建[た]てました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "はっきり": [
      { type: "kanji", sentence: "山[やま]の上[うえ]からは町[まち]が＿＿見[み]えます。", distractors: ["ゆっくり", "しっかり", "すっかり"] },
      { type: "usage", sentence: "「はっきり」の正しい使い方はどれですか。", answer: "山の上からは町がはっきり見えます。", distractors: ["山の上からは町がはっきりを見えます。", "山の上からは町がはっきりに見えます。", "山の上からは町がはっきりで見えます。"] }
    ],
    // ---------- 19課 人と人③ ----------
    "祖父": [
      { type: "kanji", sentence: "私[わたし]の＿＿は80歳[さい]です。", distractors: ["祖母", "父", "おじ(さん)"] },
      { type: "usage", sentence: "「祖父」の正しい使い方はどれですか。", answer: "私の祖父は80歳です。", distractors: ["私の祖父を80歳です。", "私は祖父が80歳です。", "私の祖父は80歳にです。"] },
      { type: "particle", sentence: "私[わたし]の祖父[そふ]＿＿80歳[さい]です。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "祖母": [
      { type: "kanji", sentence: "私[わたし]の＿＿は料理[りょうり]が上手[じょうず]です。", distractors: ["祖父", "母", "おば(さん)"] },
      { type: "usage", sentence: "「祖母」の正しい使い方はどれですか。", answer: "私の祖母は料理が上手です。", distractors: ["私の祖母を料理が上手です。", "私は祖母が料理を上手です。", "私の祖母は料理に上手です。"] },
      { type: "particle", sentence: "私[わたし]の祖母[そぼ]は料理[りょうり]＿＿上手[じょうず]です。", answer: "が", distractors: ["を", "に", "は"] }
    ],
    "おば(さん)": [
      { type: "kanji", sentence: "＿＿は父[ちち]の妹[いもうと]です。", distractors: ["おじ(さん)", "祖母", "いとこ"] },
      { type: "usage", sentence: "「おば(さん)」の正しい使い方はどれですか。", answer: "おばは父の妹です。", distractors: ["おばを父の妹です。", "おばに父の妹です。", "おばが父の妹をです。"] },
      { type: "particle", sentence: "おば＿＿父[ちち]の妹[いもうと]です。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "おじ(さん)": [
      { type: "kanji", sentence: "＿＿は母[はは]の兄[あに]です。", distractors: ["おば(さん)", "祖父", "いとこ"] },
      { type: "usage", sentence: "「おじ(さん)」の正しい使い方はどれですか。", answer: "おじは母の兄です。", distractors: ["おじを母の兄です。", "おじに母の兄です。", "おじが母の兄をです。"] },
      { type: "particle", sentence: "おじ＿＿母[はは]の兄[あに]です。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "お子さん": [
      { type: "kanji", sentence: "山田[やまだ]さんの＿＿は何歳[なんさい]ですか。", distractors: ["息子", "娘", "赤ちゃん"] },
      { type: "usage", sentence: "「お子さん」の正しい使い方はどれですか。", answer: "山田さんのお子さんは何歳ですか。", distractors: ["山田さんのお子さんを何歳ですか。", "山田さんはお子さんが何歳をですか。", "山田さんのお子さんに何歳ですか。"] },
      { type: "particle", sentence: "山田[やまだ]さんのお子[こ]さん＿＿何歳[なんさい]ですか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "赤ちゃん": [
      { type: "kanji", sentence: "隣[となり]の家[いえ]に＿＿が生[う]まれました。", distractors: ["お子さん", "子供", "孫"] },
      { type: "usage", sentence: "「赤ちゃん」の正しい使い方はどれですか。", answer: "隣の家に赤ちゃんが生まれました。", distractors: ["隣の家を赤ちゃんが生まれました。", "隣の家に赤ちゃんを生まれました。", "隣の家は赤ちゃんが生まれさせました。"] },
      { type: "particle", sentence: "隣[となり]の家[いえ]に赤[あか]ちゃん＿＿生[う]まれました。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "お宅": [
      { type: "kanji", sentence: "今度[こんど]、先生[せんせい]の＿＿に伺[うかが]います。", distractors: ["自宅", "家", "住所"] },
      { type: "usage", sentence: "「お宅」の正しい使い方はどれですか。", answer: "今度、先生のお宅に伺います。", distractors: ["今度、先生のお宅を伺います。", "今度、先生はお宅に伺わせます。", "今度、先生のお宅が伺われます。"] },
      { type: "particle", sentence: "今度[こんど]、先生[せんせい]のお宅[たく]＿＿伺[うかが]います。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "気持ち": [
      { type: "kanji", sentence: "その＿＿はよく分[わ]かります。", distractors: ["気分", "持ち物", "天気"] },
      { type: "usage", sentence: "「気持ち」の正しい使い方はどれですか。", answer: "その気持ちはよく分かります。", distractors: ["その気持ちをよく分かります。", "その気持ちがよく分けます。", "その気持ちに分かります。"] },
      { type: "particle", sentence: "その気持[きも]ち＿＿よく分[わ]かります。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "お祝い": [
      { type: "kanji", sentence: "誕生日[たんじょうび]の＿＿にプレゼントをもらいました。", distractors: ["お礼", "贈り物", "お見舞い"] },
      { type: "usage", sentence: "「お祝い」の正しい使い方はどれですか。", answer: "誕生日のお祝いにプレゼントをもらいました。", distractors: ["誕生日のお祝いをプレゼントをもらいました。", "誕生日のお祝いがプレゼントをもらいました。", "誕生日のお祝いへプレゼントがもらいました。"] }
    ],
    "安心する": [
      { type: "kanji", sentence: "子供[こども]が無事[ぶじ]だと聞[き]いて＿＿しました。", distractors: ["案内する", "感心する", "心配する"] },
      { type: "usage", sentence: "「安心する」の正しい使い方はどれですか。", answer: "子供が無事だと聞いて安心しました。", distractors: ["子供が無事だと聞いて安心されました。", "子供が無事だと聞いて安心させました。", "子供が無事だと聞いて安心をしました、彼女は。"] }
    ],
    "褒める": [
      { type: "kanji", sentence: "先生[せんせい]が私[わたし]を＿＿くれました。", distractors: ["認める", "決める", "叱る"] },
      { type: "usage", sentence: "「褒める」の正しい使い方はどれですか。", answer: "先生が私を褒めてくれました。", distractors: ["先生が私に褒めてくれました。", "先生は私を褒められてくれました。", "先生が私を褒めさせてくれました。"] },
      { type: "particle", sentence: "先生[せんせい]が私[わたし]＿＿褒[ほ]めてくれました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "びっくりする": [
      { type: "kanji", sentence: "大[おお]きい音[おと]に＿＿しました。", distractors: ["安心", "感心", "心配"] },
      { type: "usage", sentence: "「びっくりする」の正しい使い方はどれですか。", answer: "大きい音にびっくりしました。", distractors: ["大きい音をびっくりしました。", "大きい音がびっくりされました。", "大きい音でびっくりさせました。"] },
      { type: "particle", sentence: "大[おお]きい音[おと]＿＿びっくりしました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "育てる": [
      { type: "kanji", sentence: "両親[りょうしん]は私[わたし]を大切[たいせつ]に＿＿くれました。", distractors: ["育つ", "建てる", "褒める"] },
      { type: "usage", sentence: "「育てる」の正しい使い方はどれですか。", answer: "両親は私を大切に育ててくれました。", distractors: ["両親は私が大切に育ててくれました。", "両親は私を大切に育ってくれました。", "両親は私を大切に育てさせてくれました。"] },
      { type: "particle", sentence: "両親[りょうしん]は私[わたし]＿＿大切[たいせつ]に育[そだ]ててくれました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "親切": [
      { type: "kanji", sentence: "隣[となり]の人[ひと]はとても＿＿です。", distractors: ["大切", "優しい", "丁寧"] },
      { type: "usage", sentence: "「親切」の正しい使い方はどれですか。", answer: "隣の人はとても親切です。", distractors: ["隣の人はとても親切いです。", "隣の人はとても親切くです。", "隣の人をとても親切です。"] }
    ],
    // ---------- 20課 趣味⑤ ----------
    "旅館": [
      { type: "kanji", sentence: "温泉[おんせん]の＿＿に泊[と]まりました。", distractors: ["旅行", "会館", "民宿"] },
      { type: "usage", sentence: "「旅館」の正しい使い方はどれですか。", answer: "温泉の旅館に泊まりました。", distractors: ["温泉の旅館を泊まりました。", "温泉の旅館は泊まらせました。", "温泉の旅館が泊まられました。"] },
      { type: "particle", sentence: "温泉[おんせん]の旅館[りょかん]＿＿泊[と]まりました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "ラッシュ": [
      { type: "kanji", sentence: "朝[あさ]の＿＿はいつも込[こ]んでいます。", distractors: ["じかん", "じこ", "こうつう"] },
      { type: "usage", sentence: "「ラッシュ」の正しい使い方はどれですか。", answer: "朝のラッシュはいつも込んでいます。", distractors: ["朝のラッシュをいつも込んでいます。", "朝のラッシュがいつも込ませています。", "朝のラッシュに込んでいます。"] }
    ],
    "港": [
      { type: "kanji", sentence: "船[ふね]は＿＿を出[で]ました。", distractors: ["空港", "海岸", "駅"] },
      { type: "usage", sentence: "「港」の正しい使い方はどれですか。", answer: "船は港を出ました。", distractors: ["船は港が出ました。", "船は港に出されました。", "船は港へ出させました。"] },
      { type: "particle", sentence: "船[ふね]は港[みなと]＿＿出[で]ました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "村": [
      { type: "kanji", sentence: "祖父[そふ]は小[ちい]さい＿＿に住[す]んでいます。", distractors: ["町", "田舎", "市"] },
      { type: "usage", sentence: "「村」の正しい使い方はどれですか。", answer: "祖父は小さい村に住んでいます。", distractors: ["祖父は小さい村を住んでいます。", "祖父は小さい村が住まわせています。", "祖父は小さい村で住まれています。"] },
      { type: "particle", sentence: "祖父[そふ]は小[ちい]さい村[むら]＿＿住[す]んでいます。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "島": [
      { type: "kanji", sentence: "沖縄[おきなわ]にはきれいな＿＿がたくさんあります。", distractors: ["港", "海岸", "陸"] },
      { type: "usage", sentence: "「島」の正しい使い方はどれですか。", answer: "沖縄にはきれいな島がたくさんあります。", distractors: ["沖縄にはきれいな島をたくさんあります。", "沖縄にはきれいな島がたくさんいます。", "沖縄にはきれいな島がたくさんさせます。"] },
      { type: "particle", sentence: "沖縄[おきなわ]にはきれいな島[しま]＿＿たくさんあります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "海岸": [
      { type: "kanji", sentence: "＿＿を散歩[さんぽ]しました。", distractors: ["海", "岸", "港"] },
      { type: "usage", sentence: "「海岸」の正しい使い方はどれですか。", answer: "海岸を散歩しました。", distractors: ["海岸が散歩しました。", "海岸に散歩されました。", "海岸は散歩させました。"] },
      { type: "particle", sentence: "海岸[かいがん]＿＿散歩[さんぽ]しました。", answer: "を", distractors: ["が", "に", "で"] }
    ],
    "天気予報": [
      { type: "kanji", sentence: "＿＿によると、あしたは雨[あめ]です。", distractors: ["天気", "予定", "予約"] },
      { type: "usage", sentence: "「天気予報」の正しい使い方はどれですか。", answer: "天気予報によると、あしたは雨です。", distractors: ["天気予報をによると、あしたは雨です。", "天気予報がによると、あしたは雨です。", "天気予報はによると、あしたは雨です。"] }
    ],
    "会場": [
      { type: "kanji", sentence: "コンサートの＿＿はどこですか。", distractors: ["会議室", "劇場", "広場"] },
      { type: "usage", sentence: "「会場」の正しい使い方はどれですか。", answer: "コンサートの会場はどこですか。", distractors: ["コンサートの会場をどこですか。", "コンサートは会場がどこにですか。", "コンサートの会場へどこですか。"] },
      { type: "particle", sentence: "コンサートの会場[かいじょう]＿＿どこですか。", answer: "は", distractors: ["を", "に", "が"] }
    ],
    "出発する": [
      { type: "kanji", sentence: "朝[あさ]6時[じ]に空港[くうこう]へ＿＿します。", distractors: ["出席する", "出張する", "到着する"] },
      { type: "usage", sentence: "「出発する」の正しい使い方はどれですか。", answer: "朝6時に空港へ出発します。", distractors: ["朝6時に空港を出発します。", "朝6時に空港が出発させます。", "朝6時に空港は出発されます。"] },
      { type: "particle", sentence: "朝[あさ]6時[じ]に空港[くうこう]＿＿出発[しゅっぱつ]します。", answer: "へ", distractors: ["を", "が", "で"] }
    ],
    "ハイキングする": [
      { type: "kanji", sentence: "週末[しゅうまつ]、山[やま]で＿＿しました。", distractors: ["キャンプ", "サイクリング", "ドライブ"] },
      { type: "usage", sentence: "「ハイキングする」の正しい使い方はどれですか。", answer: "週末、山でハイキングしました。", distractors: ["週末、山をハイキングしました。", "週末、山にハイキングされました。", "週末、山はハイキングさせました。"] }
    ],
    "通る": [
      { type: "kanji", sentence: "この道[みち]は毎日[まいにち]バスが＿＿ます。", distractors: ["通う", "泊まる", "止まる"] },
      { type: "usage", sentence: "「通る」の正しい使い方はどれですか。", answer: "この道は毎日バスが通ります。", distractors: ["この道は毎日バスを通ります。", "この道は毎日バスに通わせます。", "この道は毎日バスが通われます。"] },
      { type: "particle", sentence: "この道[みち]は毎日[まいにち]バス＿＿通[とお]ります。", answer: "が", distractors: ["を", "に", "で"] }
    ],
    "誘う": [
      { type: "kanji", sentence: "友達[ともだち]を映画[えいが]に＿＿ました。", distractors: ["争う", "招待する", "呼ぶ"] },
      { type: "usage", sentence: "「誘う」の正しい使い方はどれですか。", answer: "友達を映画に誘いました。", distractors: ["友達が映画に誘いました。", "友達に映画を誘いました。", "友達を映画に誘われました。"] },
      { type: "particle", sentence: "友達[ともだち]を映画[えいが]＿＿誘[さそ]いました。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "美しい": [
      { type: "kanji", sentence: "この島[しま]の海[うみ]はとても＿＿です。", distractors: ["素晴らしい", "きれい", "美味しい"] },
      { type: "usage", sentence: "「美しい」の正しい使い方はどれですか。", answer: "この島の海はとても美しいです。", distractors: ["この島の海はとても美しいなです。", "この島の海はとても美しくなです。", "この島の海はとても美しいでした。"] },
      { type: "grammar", sentence: "この島[しま]の海[うみ]はとても＿＿見[み]えます。", answer: "美しく", distractors: ["美しいで", "美しくて", "美しいに"] }
    ],
    "必要": [
      { type: "kanji", sentence: "旅行[りょこう]にはパスポートが＿＿です。", distractors: ["重要", "主要", "不要"] },
      { type: "usage", sentence: "「必要」の正しい使い方はどれですか。", answer: "旅行にはパスポートが必要です。", distractors: ["旅行にはパスポートを必要です。", "旅行にはパスポートが必要いです。", "旅行にはパスポートが必要くです。"] },
      { type: "particle", sentence: "パスポートは旅行[りょこう]＿＿必要[ひつよう]です。", answer: "に", distractors: ["を", "が", "で"] }
    ],
    "特別": [
      { type: "kanji", sentence: "きょうは＿＿な日[ひ]です。", distractors: ["特徴", "別", "普通"] },
      { type: "usage", sentence: "「特別」の正しい使い方はどれですか。", answer: "きょうは特別な日です。", distractors: ["きょうは特別の日です。", "きょうは特別い日です。", "きょうは特別く日です。"] }
    ]
  }
};
