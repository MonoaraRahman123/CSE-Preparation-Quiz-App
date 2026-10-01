import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Bot, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Award
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function QuizResult() {
  const navigate = useNavigate();
  const { lastQuizResult } = useApp();

  if (!lastQuizResult) {
    return (
      <div className="p-12 text-center max-w-md mx-auto space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">No Result Available</h3>
        <p className="text-xs text-slate-500">Take a quiz first to inspect detailed analytics.</p>
        <Link to="/quiz" className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold">
          Start Quiz
        </Link>
      </div>
    );
  }

  const {
    courseCode,
    courseTitle,
    topic,
    score,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    unanswered,
    percentage,
    timeTakenSeconds = 320,
    answers = [],
    strongTopics = [],
    weakTopics = [],
    recommendations = []
  } = lastQuizResult;

  const [filterAnswer, setFilterAnswer] = useState("all");

  const filteredAnswers = answers.filter(a => {
    if (filterAnswer === "correct") return a.isCorrect;
    if (filterAnswer === "wrong") return !a.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Score Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-xl bg-brand-500 text-white">
            {courseCode} Examination Result
          </span>

          <div className="flex items-center justify-center gap-3 py-2">
            <span className="text-6xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-200 to-emerald-300">
              {percentage}%
            </span>
          </div>

          <h2 className="text-xl font-bold">
            {percentage >= 80 ? "Outstanding Mastery! 🏆" : (percentage >= 60 ? "Good Effort! Keep Polishing 📈" : "Revision Required ⚠️")}
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            You answered {correctAnswers} correctly out of {totalQuestions} questions for <b>{topic}</b>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(`/quiz?courseCode=${encodeURIComponent(courseCode)}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 shadow-md transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => navigate(`/ai?courseCode=${encodeURIComponent(courseCode)}&topic=${encodeURIComponent(topic)}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-md transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI About Mistakes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Numerical Performance Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Correct</span>
          <span className="text-2xl font-extrabold text-emerald-500">{correctAnswers}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Incorrect</span>
          <span className="text-2xl font-extrabold text-rose-500">{wrongAnswers}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Unanswered</span>
          <span className="text-2xl font-extrabold text-slate-500">{unanswered}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Time Taken</span>
          <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">
            {Math.floor(timeTakenSeconds / 60)}m {timeTakenSeconds % 60}s
          </span>
        </div>
      </div>

      {/* Strong / Weak Topic Analysis */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Strong Topics</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(strongTopics.length > 0 ? strongTopics : ["Core Conceptual Understanding", "Basic Definitions"]).map((st, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Topics Requiring Revision</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {(weakTopics.length > 0 ? weakTopics : ["Edge-case Complexities & Gantt Charts"]).map((wt, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{wt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Question Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Question Review & Explanations</h3>
          
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterAnswer("all")}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${filterAnswer === "all" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
            >
              All ({answers.length})
            </button>
            <button
              onClick={() => setFilterAnswer("correct")}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${filterAnswer === "correct" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
            >
              Correct ({correctAnswers})
            </button>
            <button
              onClick={() => setFilterAnswer("wrong")}
              className={`px-3 py-1 rounded-xl font-bold transition-colors ${filterAnswer === "wrong" ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
            >
              Incorrect ({wrongAnswers})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAnswers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                ans.isCorrect
                  ? "bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-950"
                  : "bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-950"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  ans.isCorrect
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
                }`}>
                  {ans.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <span>{ans.isCorrect ? "Correct" : "Incorrect"}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                {ans.questionText}
              </h4>

              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl border ${
                  ans.isCorrect 
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-800 dark:text-emerald-300"
                    : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 text-rose-800 dark:text-rose-300"
                }`}>
                  <span className="font-bold block mb-0.5">Your Answer:</span>
                  <span>{JSON.stringify(ans.userAnswer)}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  <span className="font-bold block mb-0.5 text-brand-600 dark:text-brand-400">Official Correct Answer:</span>
                  <span>{JSON.stringify(ans.correctAnswer)}</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">Academic Explanation:</span>
                <p>{ans.explanation}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
