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
    ]
  }
};
