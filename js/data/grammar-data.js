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
    {
      pattern: "〜ながら",
      meaning: "while doing ~",
      usage: "Attach to the verb stem to show two actions happening at the same time, performed by the same person.",
      examples: [{ jp: "音楽を聞きながら勉強する。", en: "I study while listening to music." }],
    },
    {
      pattern: "〜たり〜たりする",
      meaning: "do things like ~ and ~",
      usage: "Attach to the ta-form of two or more verbs to list example actions among several, not an exhaustive list.",
      examples: [{ jp: "週末は本を読んだり映画を見たりします。", en: "On weekends I do things like read books and watch movies." }],
    },
    {
      pattern: "〜なければならない",
      meaning: "must do ~",
      usage: "Attach to the negative stem of a verb (nai-form minus い + ければ) to express obligation or necessity.",
      examples: [{ jp: "明日までにレポートを出さなければならない。", en: "I must submit the report by tomorrow." }],
    },
    {
      pattern: "〜そうです",
      meaning: "looks like ~ / I heard that ~",
      usage: "Attach to a verb stem or adjective stem for an appearance-based guess ('looks like'), or to the plain form for hearsay ('I heard that').",
      examples: [{ jp: "雨が降りそうです。", en: "It looks like it's going to rain." }],
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
