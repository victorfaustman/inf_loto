import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, Monitor, MousePointerClick } from "lucide-react";

const Card = ({ className = "", children }) => <div className={className}>{children}</div>;
const CardContent = ({ className = "", children }) => <div className={className}>{children}</div>;
const Button = ({ className = "", children, ...props }) => (
  <button className={`bg-sky-600 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>
    {children}
  </button>
);


const QUESTIONS = [
  {
    id: 1,
    category: "РЈСЃС‚СЂРѕР№СЃС‚РІРѕ РєРѕРјРїСЊСЋС‚РµСЂР°",
    question: "Р§С‚Рѕ РїРѕРјРѕРіР°РµС‚ РІРІРѕРґРёС‚СЊ Р±СѓРєРІС‹ Рё С†РёС„СЂС‹ РІ РєРѕРјРїСЊСЋС‚РµСЂ?",
    answer: "РљР»Р°РІРёР°С‚СѓСЂР°",
    options: ["РњРѕРЅРёС‚РѕСЂ", "РљР»Р°РІРёР°С‚СѓСЂР°", "РљРѕР»РѕРЅРєРё", "РџСЂРёРЅС‚РµСЂ"],
  },
  {
    id: 2,
    category: "РЈСЃС‚СЂРѕР№СЃС‚РІРѕ РєРѕРјРїСЊСЋС‚РµСЂР°",
    question: "РќР° РєР°РєРѕРј СѓСЃС‚СЂРѕР№СЃС‚РІРµ РјС‹ РІРёРґРёРј РёР·РѕР±СЂР°Р¶РµРЅРёРµ СЃ РєРѕРјРїСЊСЋС‚РµСЂР°?",
    answer: "РњРѕРЅРёС‚РѕСЂ",
    options: ["РњС‹С€СЊ", "РњРѕРЅРёС‚РѕСЂ", "РЎРєР°РЅРµСЂ", "Р¤Р»РµС€РєР°"],
  },
  {
    id: 3,
    category: "Р¤Р°Р№Р»С‹ Рё РїР°РїРєРё",
    question: "Р§С‚Рѕ РїРѕРјРѕРіР°РµС‚ С…СЂР°РЅРёС‚СЊ С„Р°Р№Р»С‹ РїРѕ РіСЂСѓРїРїР°Рј?",
    answer: "РџР°РїРєР°",
    options: ["РџР°РїРєР°", "РљРЅРѕРїРєР°", "РљР°Р±РµР»СЊ", "РћРєРЅРѕ"],
  },
  {
    id: 4,
    category: "Р¤Р°Р№Р»С‹ Рё РїР°РїРєРё",
    question: "РљР°Рє РЅР°Р·С‹РІР°РµС‚СЃСЏ РєР°СЂС‚РёРЅРєР° РёР»Рё Р·РЅР°Рє РїСЂРѕРіСЂР°РјРјС‹ РЅР° СЂР°Р±РѕС‡РµРј СЃС‚РѕР»Рµ?",
    answer: "Р—РЅР°С‡РѕРє",
    options: ["Р¤Р°Р№Р»", "Р—РЅР°С‡РѕРє", "РљСѓСЂСЃРѕСЂ", "РђР±Р·Р°С†"],
  },
  {
    id: 5,
    category: "Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ",
    question: "Р§С‚Рѕ РЅРµР»СЊР·СЏ СЃРѕРѕР±С‰Р°С‚СЊ РЅРµР·РЅР°РєРѕРјС‹Рј Р»СЋРґСЏРј РІ РёРЅС‚РµСЂРЅРµС‚Рµ?",
    answer: "РџР°СЂРѕР»СЊ",
    options: ["Р›СЋР±РёРјС‹Р№ С†РІРµС‚", "РџР°СЂРѕР»СЊ", "РќР°Р·РІР°РЅРёРµ РёРіСЂС‹", "РџРѕРіРѕРґСѓ"],
  },
  {
    id: 6,
    category: "Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ",
    question: "Р§С‚Рѕ РЅСѓР¶РЅРѕ СЃРґРµР»Р°С‚СЊ, РµСЃР»Рё СЃР°Р№С‚ РїСЂРѕСЃРёС‚ СЃРєР°С‡Р°С‚СЊ РїРѕРґРѕР·СЂРёС‚РµР»СЊРЅС‹Р№ С„Р°Р№Р»?",
    answer: "РЎРїСЂРѕСЃРёС‚СЊ РІР·СЂРѕСЃР»РѕРіРѕ",
    options: ["РЎРєР°С‡Р°С‚СЊ СЃСЂР°Р·Сѓ", "РЎРїСЂРѕСЃРёС‚СЊ РІР·СЂРѕСЃР»РѕРіРѕ", "РћС‚РїСЂР°РІРёС‚СЊ РґСЂСѓРіСѓ", "РћС‚РєСЂС‹С‚СЊ РЅРѕС‡СЊСЋ"],
  },
  {
    id: 7,
    category: "РђР»РіРѕСЂРёС‚РјС‹",
    question: "РљР°Рє РЅР°Р·С‹РІР°РµС‚СЃСЏ С‚РѕС‡РЅРѕРµ РѕРїРёСЃР°РЅРёРµ РґРµР№СЃС‚РІРёР№ РїРѕ РїРѕСЂСЏРґРєСѓ?",
    answer: "РђР»РіРѕСЂРёС‚Рј",
    options: ["Р РёСЃСѓРЅРѕРє", "РђР»РіРѕСЂРёС‚Рј", "РџР°РїРєР°", "РњРѕРЅРёС‚РѕСЂ"],
  },
  {
    id: 8,
    category: "РђР»РіРѕСЂРёС‚РјС‹",
    question: "Р§С‚Рѕ РѕР·РЅР°С‡Р°РµС‚ РєРѕРјР°РЅРґР° В«РїРѕРІС‚РѕСЂРё 3 СЂР°Р·Р°В»?",
    answer: "Р¦РёРєР»",
    options: ["РћС€РёР±РєР°", "Р¦РёРєР»", "Р¤Р°Р№Р»", "РЎСЃС‹Р»РєР°"],
  },
  {
    id: 9,
    category: "РРЅС‚РµСЂРЅРµС‚",
    question: "Р§С‚Рѕ РїРѕРјРѕРіР°РµС‚ РёСЃРєР°С‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ РІ РёРЅС‚РµСЂРЅРµС‚Рµ?",
    answer: "РџРѕРёСЃРєРѕРІРёРє",
    options: ["РџРѕРёСЃРєРѕРІРёРє", "РџР°РїРєР°", "РџСЂРёРЅС‚РµСЂ", "РљР°Р»СЊРєСѓР»СЏС‚РѕСЂ"],
  },
  {
    id: 10,
    category: "РРЅС‚РµСЂРЅРµС‚",
    question: "РљР°Рє РЅР°Р·С‹РІР°РµС‚СЃСЏ Р°РґСЂРµСЃ СЃС‚СЂР°РЅРёС†С‹ РІ РёРЅС‚РµСЂРЅРµС‚Рµ?",
    answer: "РЎСЃС‹Р»РєР°",
    options: ["РЎСЃС‹Р»РєР°", "РљР»Р°РІРёС€Р°", "РџРёРєСЃРµР»СЊ", "РљСѓСЂСЃРѕСЂ"],
  },
  {
    id: 11,
    category: "РРЅС„РѕСЂРјР°С†РёСЏ",
    question: "Р§С‚Рѕ РёР· СЌС‚РѕРіРѕ СЏРІР»СЏРµС‚СЃСЏ С‚РµРєСЃС‚РѕРІРѕР№ РёРЅС„РѕСЂРјР°С†РёРµР№?",
    answer: "Р Р°СЃСЃРєР°Р·",
    options: ["Р Р°СЃСЃРєР°Р·", "РњРµР»РѕРґРёСЏ", "Р—Р°РїР°С…", "Р’РєСѓСЃ"],
  },
  {
    id: 12,
    category: "РРЅС„РѕСЂРјР°С†РёСЏ",
    question: "Р§С‚Рѕ РёР· СЌС‚РѕРіРѕ СЏРІР»СЏРµС‚СЃСЏ РіСЂР°С„РёС‡РµСЃРєРѕР№ РёРЅС„РѕСЂРјР°С†РёРµР№?",
    answer: "Р РёСЃСѓРЅРѕРє",
    options: ["Р—РІСѓРє", "Р РёСЃСѓРЅРѕРє", "РљРѕРјР°РЅРґР°", "РџР°СЂРѕР»СЊ"],
  },
];

const BINGO_WORDS = [
  "РљР»Р°РІРёР°С‚СѓСЂР°",
  "РњРѕРЅРёС‚РѕСЂ",
  "РџР°РїРєР°",
  "Р—РЅР°С‡РѕРє",
  "РџР°СЂРѕР»СЊ",
  "РЎРїСЂРѕСЃРёС‚СЊ РІР·СЂРѕСЃР»РѕРіРѕ",
  "РђР»РіРѕСЂРёС‚Рј",
  "Р¦РёРєР»",
  "РџРѕРёСЃРєРѕРІРёРє",
  "РЎСЃС‹Р»РєР°",
  "Р Р°СЃСЃРєР°Р·",
  "Р РёСЃСѓРЅРѕРє",
];

const bingoLines = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [0, 4, 8],
  [1, 5, 9],
  [2, 6, 10],
  [3, 7, 11],
  [0, 5, 10],
  [3, 6, 9],
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function InformaticsLotoApp() {
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [marked, setMarked] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const current = questions[currentIndex];
  const finished = currentIndex >= questions.length;

  const completedLines = useMemo(() => {
    return bingoLines.filter((line) => line.every((index) => marked.includes(BINGO_WORDS[index]))).length;
  }, [marked]);

  const progress = Math.round((currentIndex / QUESTIONS.length) * 100);

  const chooseAnswer = (option) => {
    if (selected || finished) return;

    setSelected(option);

    if (option === current.answer) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      setMarked((prev) => (prev.includes(current.answer) ? prev : [...prev, current.answer]));
    } else {
      setFeedback("wrong");
      setMistakes((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setFeedback(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const restart = () => {
    setQuestions(shuffle(QUESTIONS));
    setCurrentIndex(0);
    setMarked([]);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setMistakes(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-fuchsia-100 to-amber-100 p-4 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 rounded-[2rem] bg-white/75 p-5 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                <Sparkles size={16} /> РРЅС„РѕСЂРјР°С‚РёРєР° В· 4 РєР»Р°СЃСЃ
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">Р’РёРєС‚РѕСЂРёРЅР°вЂ‘Р»РѕС‚Рѕ</h1>
              <p className="mt-2 max-w-2xl text-base text-slate-600 md:text-lg">
                РћС‚РІРµС‡Р°Р№ РЅР° РІРѕРїСЂРѕСЃС‹ Рё Р·Р°РєСЂС‹РІР°Р№ РїСЂР°РІРёР»СЊРЅС‹Рµ РѕС‚РІРµС‚С‹ РЅР° Р»РѕС‚РѕвЂ‘РїРѕР»Рµ. РЎРѕР±РµСЂРё РєР°Рє РјРѕР¶РЅРѕ Р±РѕР»СЊС€Рµ Р»РёРЅРёР№!
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-emerald-100 p-3">
                <div className="text-2xl font-black text-emerald-700">{score}</div>
                <div className="text-xs font-semibold text-emerald-700">РІРµСЂРЅРѕ</div>
              </div>
              <div className="rounded-2xl bg-rose-100 p-3">
                <div className="text-2xl font-black text-rose-700">{mistakes}</div>
                <div className="text-xs font-semibold text-rose-700">РѕС€РёР±РєРё</div>
              </div>
              <div className="rounded-2xl bg-violet-100 p-3">
                <div className="text-2xl font-black text-violet-700">{completedLines}</div>
                <div className="text-xs font-semibold text-violet-700">Р»РёРЅРёРё</div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-500"
              animate={{ width: `${finished ? 100 : progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </header>

        <main className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            {!finished ? (
              <Card className="overflow-hidden rounded-[2rem] border-0 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="p-5 md:p-7">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
                      Р’РѕРїСЂРѕСЃ {currentIndex + 1} РёР· {questions.length}
                    </span>
                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                      {current.category}
                    </span>
                  </div>

                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.75rem] bg-gradient-to-br from-white to-sky-50 p-5 shadow-inner"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="rounded-2xl bg-sky-500 p-3 text-white shadow-lg">
                        <Monitor size={28} />
                      </div>
                      <h2 className="text-2xl font-black leading-tight md:text-3xl">{current.question}</h2>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {current.options.map((option) => {
                        const isCorrect = option === current.answer;
                        const isSelected = option === selected;
                        let style = "bg-white hover:bg-sky-50 border-slate-200";

                        if (selected && isCorrect) style = "bg-emerald-100 border-emerald-400 text-emerald-800";
                        if (selected && isSelected && !isCorrect) style = "bg-rose-100 border-rose-400 text-rose-800";

                        return (
                          <button
                            key={option}
                            onClick={() => chooseAnswer(option)}
                            className={`rounded-2xl border-2 p-4 text-left text-lg font-extrabold shadow-sm transition ${style}`}
                          >
                            <span className="flex items-center gap-2">
                              <MousePointerClick size={20} /> {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-5 rounded-2xl p-4 font-bold ${
                          feedback === "correct" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {feedback === "correct" ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 /> Р’РµСЂРЅРѕ! РћС‚РІРµС‚ Р·Р°РєСЂС‹С‚ РЅР° Р»РѕС‚РѕвЂ‘РїРѕР»Рµ.
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle /> РќРµ СЃРѕРІСЃРµРј. РџСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚: {current.answer}.
                          </div>
                        )}
                      </motion.div>
                    )}

                    <div className="mt-5 flex justify-end">
                      <Button
                        onClick={nextQuestion}
                        disabled={!selected}
                        className="rounded-2xl px-6 py-6 text-base font-black"
                      >
                        РЎР»РµРґСѓСЋС‰РёР№ РІРѕРїСЂРѕСЃ
                      </Button>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-[2rem] border-0 bg-white/85 shadow-xl backdrop-blur">
                <CardContent className="p-7 text-center">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Trophy size={54} />
                    </div>
                    <h2 className="text-4xl font-black">РРіСЂР° РѕРєРѕРЅС‡РµРЅР°!</h2>
                    <p className="mt-3 text-lg text-slate-600">
                      РџСЂР°РІРёР»СЊРЅС‹С… РѕС‚РІРµС‚РѕРІ: <b>{score}</b> РёР· <b>{QUESTIONS.length}</b>. РЎРѕР±СЂР°РЅРѕ Р»РёРЅРёР№: <b>{completedLines}</b>.
                    </p>
                    <div className="mt-6 rounded-3xl bg-sky-50 p-5 text-left text-slate-700">
                      <h3 className="mb-2 text-xl font-black">РС‚РѕРі</h3>
                      {score >= 10 ? (
                        <p>РћС‚Р»РёС‡РЅС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚! РўС‹ С…РѕСЂРѕС€Рѕ Р·РЅР°РµС€СЊ РѕСЃРЅРѕРІС‹ РёРЅС„РѕСЂРјР°С‚РёРєРё.</p>
                      ) : score >= 7 ? (
                        <p>РҐРѕСЂРѕС€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚! РџРѕРІС‚РѕСЂРё С‚РµРјС‹, РіРґРµ Р±С‹Р»Рё РѕС€РёР±РєРё, Рё СЃС‹РіСЂР°Р№ РµС‰С‘ СЂР°Р·.</p>
                      ) : (
                        <p>РќСѓР¶РЅРѕ РЅРµРјРЅРѕРіРѕ РїРѕС‚СЂРµРЅРёСЂРѕРІР°С‚СЊСЃСЏ. РћР±СЂР°С‚Рё РІРЅРёРјР°РЅРёРµ РЅР° Р±РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ, С„Р°Р№Р»С‹, РёРЅС‚РµСЂРЅРµС‚ Рё Р°Р»РіРѕСЂРёС‚РјС‹.</p>
                      )}
                    </div>
                    <Button onClick={restart} className="mt-6 rounded-2xl px-6 py-6 text-base font-black">
                      <RotateCcw className="mr-2" /> РќР°С‡Р°С‚СЊ Р·Р°РЅРѕРІРѕ
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </section>

          <aside>
            <Card className="rounded-[2rem] border-0 bg-white/85 shadow-xl backdrop-blur">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black">Р›РѕС‚РѕвЂ‘РїРѕР»Рµ</h2>
                  <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-sm font-bold text-fuchsia-700">
                    3 Г— 4
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {BINGO_WORDS.map((word) => {
                    const isMarked = marked.includes(word);
                    return (
                      <motion.div
                        key={word}
                        animate={{ scale: isMarked ? [1, 1.08, 1] : 1 }}
                        className={`flex min-h-24 items-center justify-center rounded-2xl border-2 p-2 text-center text-sm font-black shadow-sm transition md:text-base ${
                          isMarked
                            ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-600"
                        }`}
                      >
                        {isMarked ? (
                          <span className="flex flex-col items-center gap-1">
                            <CheckCircle2 size={24} /> {word}
                          </span>
                        ) : (
                          word
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-3xl bg-gradient-to-br from-violet-100 to-sky-100 p-4">
                  <h3 className="mb-2 text-lg font-black">РџСЂР°РІРёР»Р°</h3>
                  <ol className="list-inside list-decimal space-y-1 text-sm font-semibold text-slate-700">
                    <li>РџСЂРѕС‡РёС‚Р°Р№ РІРѕРїСЂРѕСЃ.</li>
                    <li>Р’С‹Р±РµСЂРё РїСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚.</li>
                    <li>Р•СЃР»Рё РѕС‚РІРµС‚ РІРµСЂРЅС‹Р№, РѕРЅ Р·Р°РєСЂРѕРµС‚СЃСЏ РЅР° РїРѕР»Рµ.</li>
                    <li>РЎРѕР±РёСЂР°Р№ Р»РёРЅРёРё РїРѕ РіРѕСЂРёР·РѕРЅС‚Р°Р»Рё, РІРµСЂС‚РёРєР°Р»Рё РёР»Рё РґРёР°РіРѕРЅР°Р»Рё.</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
}
