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
    ]
  }
};
