// Verb conjugation reference (9 topics) and a precomputed verb bank for the
// practice drill. Unlike vocab/grammar, conjugation forms are rule-based —
// so CONJUGATION_PRACTICE_VERBS holds hand-checked correct answers rather
// than being generated on the fly, to avoid silently teaching a wrong form.

window.CONJUGATION_TOPICS = [
  {
    number: 1,
    id: "verb-groups",
    title: "動詞のグループ",
    englishTitle: "Verb groups",
    type: "classification",
    intro:
      "There are three groups of verbs. You work out which one a verb belongs to based on the sound before ます, or the ending of the dictionary form. The rules for forming the て form, potential form, etc. are different for each group.",
    groups: [
      {
        label: "I",
        rows: [
          { masu: "-います", dict: "-う", examples: ["買う", "使う"] },
          { masu: "-きます / -ぎます", dict: "-く / -ぐ", examples: ["聞く", "行く", "およぐ"] },
          { masu: "-します", dict: "-す", examples: ["話す", "出す"] },
          { masu: "-ちます", dict: "-つ", examples: ["立つ", "持つ"] },
          { masu: "-にます", dict: "-ぬ", examples: ["死ぬ"] },
          { masu: "-びます", dict: "-ぶ", examples: ["運ぶ", "あそぶ"] },
          { masu: "-みます", dict: "-む", examples: ["読む", "飲む"] },
          { masu: "-ります", dict: "-aる / -oる / -uる", examples: ["ある", "とる", "作る"] },
          { masu: "-ります", dict: "-iる (exception)", examples: ["知る", "入る", "切る", "走る", "要る"] },
          { masu: "-ります", dict: "-eる (exception)", examples: ["帰る", "すべる"] },
        ],
      },
      {
        label: "II",
        rows: [
          { masu: "-iます", dict: "-iる", examples: ["見る", "いる", "着る", "あびる", "できる", "起きる"] },
          { masu: "-eます", dict: "-eる", examples: ["ねる", "食べる", "開ける", "かける", "変える", "聞こえる", "考える"] },
        ],
      },
      {
        label: "III",
        rows: [{ masu: "(irregular)", dict: "(irregular)", examples: ["する", "勉強する", "そうじする", "来る", "持ってくる"] }],
      },
    ],
  },

  {
    number: 2,
    id: "te-ta-form",
    title: "て形・た形",
    englishTitle: "Te-form / Ta-form",
    columns: ["て形", "た形"],
    groups: [
      {
        label: "I",
        examples: [
          { dict: "書く", values: ["書いて", "書いた"] },
          { dict: "行く (exception)", values: ["行って", "行った"] },
          { dict: "ぬぐ", values: ["ぬいで", "ぬいだ"] },
          { dict: "読む", values: ["読んで", "読んだ"] },
          { dict: "とぶ", values: ["とんで", "とんだ"] },
          { dict: "死ぬ", values: ["死んで", "死んだ"] },
          { dict: "言う", values: ["言って", "言った"] },
          { dict: "持つ", values: ["持って", "持った"] },
          { dict: "作る", values: ["作って", "作った"] },
          { dict: "出す", values: ["出して", "出した"] },
        ],
      },
      {
        label: "II",
        examples: [
          { dict: "いる", values: ["いて", "いた"] },
          { dict: "起きる", values: ["起きて", "起きた"] },
          { dict: "出る", values: ["出て", "出た"] },
          { dict: "食べる", values: ["食べて", "食べた"] },
          { dict: "あげる", values: ["あげて", "あげた"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["して", "した"] },
          { dict: "来る", values: ["来て", "来た"] },
        ],
      },
    ],
  },

  {
    number: 3,
    id: "polite-plain",
    title: "ていねい形とぶつう形",
    englishTitle: "Polite form and Plain form",
    columns: ["polite", "plain"],
    intro:
      "The plain form is used when talking with close friends and family, and also in literary styles used when writing reports, essays, and diaries.",
    groups: [
      {
        label: "Verb (買う)",
        examples: [
          { dict: "affirmative", values: ["買います", "買う"] },
          { dict: "negative", values: ["買いません", "買わない"] },
          { dict: "past affirmative", values: ["買いました", "買った"] },
          { dict: "past negative", values: ["買いませんでした", "買わなかった"] },
        ],
      },
      {
        label: "い adjective (高い)",
        examples: [
          { dict: "affirmative", values: ["高いです", "高い"] },
          { dict: "negative", values: ["高くないです", "高くない"] },
          { dict: "past affirmative", values: ["高かったです", "高かった"] },
          { dict: "past negative", values: ["高くなかったです", "高くなかった"] },
        ],
      },
      {
        label: "な adjective (静か)",
        examples: [
          { dict: "affirmative", values: ["静かです", "静かだ"] },
          { dict: "negative", values: ["静かではありません", "静かではない"] },
          { dict: "past affirmative", values: ["静かでした", "静かだった"] },
          { dict: "past negative", values: ["静かではありませんでした", "静かではなかった"] },
        ],
      },
      {
        label: "Noun (雨)",
        examples: [
          { dict: "affirmative", values: ["雨です", "雨だ"] },
          { dict: "negative", values: ["雨ではありません", "雨ではない"] },
          { dict: "past affirmative", values: ["雨でした", "雨だった"] },
          { dict: "past negative", values: ["雨ではありませんでした", "雨ではなかった"] },
        ],
      },
    ],
  },

  {
    number: 4,
    id: "potential-form",
    title: "可能の形",
    englishTitle: "The potential form",
    columns: ["可能形"],
    groups: [
      {
        label: "I",
        rule: "dictionary -u → -eる",
        examples: [
          { dict: "言う", values: ["言える"] },
          { dict: "聞く", values: ["聞ける"] },
          { dict: "急ぐ", values: ["急げる"] },
          { dict: "貸す", values: ["貸せる"] },
          { dict: "待つ", values: ["待てる"] },
          { dict: "呼ぶ", values: ["呼べる"] },
          { dict: "飲む", values: ["飲める"] },
          { dict: "作る", values: ["作れる"] },
        ],
      },
      {
        label: "II",
        rule: "dictionary -る → stem + られる",
        examples: [
          { dict: "見る", values: ["見られる"] },
          { dict: "いる", values: ["いられる"] },
          { dict: "ねる", values: ["ねられる"] },
          { dict: "考える", values: ["考えられる"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["できる"] },
          { dict: "来る", values: ["来られる"] },
        ],
      },
    ],
  },

  {
    number: 5,
    id: "ba-nara-form",
    title: "「~ば・~なら」の形",
    englishTitle: "Ba-form / Nara-form (conditional)",
    columns: ["affirmative", "negative"],
    groups: [
      {
        label: "I (Verb)",
        rule: "dictionary -u → -eば　／　-ない → -なければ",
        examples: [
          { dict: "すう", values: ["すえば", "すわなければ"] },
          { dict: "歩く", values: ["歩けば", "歩かなければ"] },
          { dict: "急ぐ", values: ["急げば", "急がなければ"] },
          { dict: "貸す", values: ["貸せば", "貸さなければ"] },
          { dict: "待つ", values: ["待てば", "待たなければ"] },
          { dict: "死ぬ", values: ["死ねば", "死ななければ"] },
          { dict: "とぶ", values: ["とべば", "とばなければ"] },
          { dict: "住む", values: ["住めば", "住まなければ"] },
          { dict: "作る", values: ["作れば", "作らなければ"] },
          { dict: "ある", values: ["あれば", "なければ"] },
        ],
      },
      {
        label: "II (Verb)",
        rule: "dictionary -る → -れば　／　-ない → -なければ",
        examples: [
          { dict: "見る", values: ["見れば", "見なければ"] },
          { dict: "いる", values: ["いれば", "いなければ"] },
          { dict: "ねる", values: ["ねれば", "ねなければ"] },
          { dict: "しめる", values: ["しめれば", "しめなければ"] },
        ],
      },
      {
        label: "III (Verb)",
        examples: [
          { dict: "する", values: ["すれば", "しなければ"] },
          { dict: "来る", values: ["来れば", "来なければ"] },
        ],
      },
      {
        label: "い adjective",
        examples: [
          { dict: "高い", values: ["高ければ", "高くなければ"] },
          { dict: "いい (exception)", values: ["よければ", "よくなければ"] },
        ],
      },
      {
        label: "な adjective / Noun",
        examples: [
          { dict: "しずか", values: ["しずかなら", "しずかでなければ"] },
          { dict: "雨", values: ["雨なら", "雨でなければ"] },
        ],
      },
    ],
  },

  {
    number: 6,
    id: "u-yo-form",
    title: "う・よう形",
    englishTitle: "Volitional form",
    columns: ["う・よう形"],
    note: "This form is also used as the plain form of ~ましょう.",
    groups: [
      {
        label: "I",
        rule: "dictionary -u → -oう",
        examples: [
          { dict: "買う", values: ["買おう"] },
          { dict: "みがく", values: ["みがこう"] },
          { dict: "およぐ", values: ["およごう"] },
          { dict: "出す", values: ["出そう"] },
          { dict: "立つ", values: ["立とう"] },
          { dict: "死ぬ", values: ["死のう"] },
          { dict: "よぶ", values: ["よぼう"] },
          { dict: "飲む", values: ["飲もう"] },
          { dict: "帰る", values: ["帰ろう"] },
        ],
      },
      {
        label: "II",
        rule: "dictionary -る → -よう",
        examples: [
          { dict: "見る", values: ["見よう"] },
          { dict: "起きる", values: ["起きよう"] },
          { dict: "ねる", values: ["ねよう"] },
          { dict: "あげる", values: ["あげよう"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["しよう"] },
          { dict: "来る", values: ["来よう"] },
        ],
      },
    ],
  },

  {
    number: 7,
    id: "passive-form",
    title: "受身の形",
    englishTitle: "The passive form",
    columns: ["受身形"],
    note: "With Group II verbs and 来る, the passive form and potential form are the same.",
    groups: [
      {
        label: "I",
        rule: "dictionary -u → -aれる",
        examples: [
          { dict: "言う", values: ["言われる"] },
          { dict: "なく", values: ["なかれる"] },
          { dict: "さわぐ", values: ["さわがれる"] },
          { dict: "話す", values: ["話される"] },
          { dict: "立つ", values: ["立たれる"] },
          { dict: "死ぬ", values: ["死なれる"] },
          { dict: "よぶ", values: ["よばれる"] },
          { dict: "ふむ", values: ["ふまれる"] },
          { dict: "しかる", values: ["しかられる"] },
        ],
      },
      {
        label: "II",
        rule: "dictionary -る → stem + られる",
        examples: [
          { dict: "見る", values: ["見られる"] },
          { dict: "いる", values: ["いられる"] },
          { dict: "ねる", values: ["ねられる"] },
          { dict: "ほめる", values: ["ほめられる"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["される"] },
          { dict: "来る", values: ["来られる"] },
        ],
      },
    ],
  },

  {
    number: 8,
    id: "causative-form",
    title: "使役の形",
    englishTitle: "The causative form",
    columns: ["使役形"],
    groups: [
      {
        label: "I",
        rule: "dictionary -u → -aせる",
        examples: [
          { dict: "言う", values: ["言わせる"] },
          { dict: "なく", values: ["なかせる"] },
          { dict: "およぐ", values: ["およがせる"] },
          { dict: "話す", values: ["話させる"] },
          { dict: "立つ", values: ["立たせる"] },
          { dict: "死ぬ", values: ["死なせる"] },
          { dict: "あそぶ", values: ["あそばせる"] },
          { dict: "飲む", values: ["飲ませる"] },
          { dict: "すわる", values: ["すわらせる"] },
        ],
      },
      {
        label: "II",
        rule: "dictionary -る → stem + させる",
        examples: [
          { dict: "見る", values: ["見させる"] },
          { dict: "いる", values: ["いさせる"] },
          { dict: "かける", values: ["かけさせる"] },
          { dict: "やめる", values: ["やめさせる"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["させる"] },
          { dict: "来る", values: ["来させる"] },
        ],
      },
    ],
  },

  {
    number: 9,
    id: "causative-passive-form",
    title: "使役受身の形",
    englishTitle: "The causative-passive form",
    columns: ["form 1 (-aされる)", "form 2 (-aせられる)"],
    note:
      "Group I verbs commonly use causative-passive form 1 (-aされる). However, verbs whose dictionary form ends in す (話す, 出す, おす, etc.) and Group II/III verbs do not have the -aされる form — only form 2.",
    groups: [
      {
        label: "I",
        examples: [
          { dict: "はらう", values: ["はらわされる", "はらわせられる"] },
          { dict: "聞く", values: ["聞かされる", "聞かせられる"] },
          { dict: "急ぐ", values: ["急がされる", "急がせられる"] },
          { dict: "話す", values: ["—", "話させられる"] },
          { dict: "立つ", values: ["立たされる", "立たせられる"] },
          { dict: "運ぶ", values: ["運ばされる", "運ばせられる"] },
          { dict: "飲む", values: ["飲まされる", "飲ませられる"] },
          { dict: "すわる", values: ["すわらされる", "すわらせられる"] },
        ],
      },
      {
        label: "II",
        examples: [
          { dict: "着る", values: ["—", "着させられる"] },
          { dict: "いる", values: ["—", "いさせられる"] },
          { dict: "ねる", values: ["—", "ねさせられる"] },
          { dict: "考える", values: ["—", "考えさせられる"] },
        ],
      },
      {
        label: "III",
        examples: [
          { dict: "する", values: ["—", "させられる"] },
          { dict: "来る", values: ["—", "来させられる"] },
        ],
      },
    ],
  },
];

// Practice-drill verb bank. Every form is pre-checked by hand — this is
// deliberately a fixed list rather than a generated one, since conjugation
// has real exceptions (行く, する/来る, す-ending verbs, etc.) that a
// generic rule engine could easily get wrong.
window.CONJUGATION_PRACTICE_VERBS = [
  { dict: "買う", group: "I", te: "買って", ta: "買った", potential: "買える", ba: "買えば", volitional: "買おう", passive: "買われる", causative: "買わせる", causativePassive: "買わされる（買わせられる）" },
  { dict: "聞く", group: "I", te: "聞いて", ta: "聞いた", potential: "聞ける", ba: "聞けば", volitional: "聞こう", passive: "聞かれる", causative: "聞かせる", causativePassive: "聞かされる（聞かせられる）" },
  { dict: "泳ぐ", group: "I", te: "泳いで", ta: "泳いだ", potential: "泳げる", ba: "泳げば", volitional: "泳ごう", passive: "泳がれる", causative: "泳がせる", causativePassive: "泳がされる（泳がせられる）" },
  { dict: "話す", group: "I", te: "話して", ta: "話した", potential: "話せる", ba: "話せば", volitional: "話そう", passive: "話される", causative: "話させる", causativePassive: "話させられる" },
  { dict: "待つ", group: "I", te: "待って", ta: "待った", potential: "待てる", ba: "待てば", volitional: "待とう", passive: "待たれる", causative: "待たせる", causativePassive: "待たされる（待たせられる）" },
  { dict: "死ぬ", group: "I", te: "死んで", ta: "死んだ", potential: "死ねる", ba: "死ねば", volitional: "死のう", passive: "死なれる", causative: "死なせる", causativePassive: "死なされる（死なせられる）" },
  { dict: "遊ぶ", group: "I", te: "遊んで", ta: "遊んだ", potential: "遊べる", ba: "遊べば", volitional: "遊ぼう", passive: "遊ばれる", causative: "遊ばせる", causativePassive: "遊ばされる（遊ばせられる）" },
  { dict: "読む", group: "I", te: "読んで", ta: "読んだ", potential: "読める", ba: "読めば", volitional: "読もう", passive: "読まれる", causative: "読ませる", causativePassive: "読まされる（読ませられる）" },
  { dict: "作る", group: "I", te: "作って", ta: "作った", potential: "作れる", ba: "作れば", volitional: "作ろう", passive: "作られる", causative: "作らせる", causativePassive: "作らされる（作らせられる）" },
  { dict: "帰る", group: "I", te: "帰って", ta: "帰った", potential: "帰れる", ba: "帰れば", volitional: "帰ろう", passive: "帰られる", causative: "帰らせる", causativePassive: "帰らされる（帰らせられる）" },
  { dict: "行く", group: "I", te: "行って", ta: "行った", potential: "行ける", ba: "行けば", volitional: "行こう", passive: "行かれる", causative: "行かせる", causativePassive: "行かされる（行かせられる）" },
  { dict: "見る", group: "II", te: "見て", ta: "見た", potential: "見られる", ba: "見れば", volitional: "見よう", passive: "見られる", causative: "見させる", causativePassive: "見させられる" },
  { dict: "食べる", group: "II", te: "食べて", ta: "食べた", potential: "食べられる", ba: "食べれば", volitional: "食べよう", passive: "食べられる", causative: "食べさせる", causativePassive: "食べさせられる" },
  { dict: "起きる", group: "II", te: "起きて", ta: "起きた", potential: "起きられる", ba: "起きれば", volitional: "起きよう", passive: "起きられる", causative: "起きさせる", causativePassive: "起きさせられる" },
  { dict: "かける", group: "II", te: "かけて", ta: "かけた", potential: "かけられる", ba: "かければ", volitional: "かけよう", passive: "かけられる", causative: "かけさせる", causativePassive: "かけさせられる" },
  { dict: "考える", group: "II", te: "考えて", ta: "考えた", potential: "考えられる", ba: "考えれば", volitional: "考えよう", passive: "考えられる", causative: "考えさせる", causativePassive: "考えさせられる" },
  { dict: "する", group: "III", te: "して", ta: "した", potential: "できる", ba: "すれば", volitional: "しよう", passive: "される", causative: "させる", causativePassive: "させられる" },
  { dict: "来る", group: "III", te: "来て", ta: "来た", potential: "来られる", ba: "来れば", volitional: "来よう", passive: "来られる", causative: "来させる", causativePassive: "来させられる" },
];
