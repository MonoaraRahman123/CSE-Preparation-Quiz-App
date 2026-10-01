import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  HelpCircle, 
  BookOpen, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Sliders
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function QuizSetup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { courses, setActiveQuiz } = useApp();

  const initialCode = searchParams.get("courseCode") || "CSE 3203";
  const initialTopic = searchParams.get("topic") || "All Topics";

  const [courseCode, setCourseCode] = useState(initialCode);
  const selectedCourse = courses.find(c => c.code.toUpperCase() === courseCode.toUpperCase()) || courses[0];

  const [topic, setTopic] = useState(initialTopic);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");
  const [timeLimit, setTimeLimit] = useState(15);
  const [questionType, setQuestionType] = useState("All");

  const handleStart = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/quizzes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseCode: selectedCourse.code,
          courseTitle: selectedCourse.title,
          topic,
          questionCount,
          difficulty,
          questionType
        })
      });

      if (res.ok) {
        const data = await res.json();
        setActiveQuiz(data.quiz);
        navigate("/quiz/live");
        return;
      }
    } catch (err) {
      console.warn("Backend generate failed, using client fallback", err);
    }

    // Client fallback quiz session
    const fallbackQuiz = {
      quizId: `quiz_${Date.now()}`,
      courseCode: selectedCourse.code,
      courseTitle: selectedCourse.title,
      topic,
      difficulty,
      timeLimitMinutes: timeLimit,
      totalQuestions: questionCount,
      questions: Array.from({ length: questionCount }, (_, i) => ({
        _id: `q_loc_${i + 1}`,
        courseCode: selectedCourse.code,
        topic: topic !== "All Topics" ? topic : (selectedCourse.topics?.[i % (selectedCourse.topics?.length || 1)]?.name || "Core Principles"),
        question: `[${selectedCourse.code}] Practice Question ${i + 1}: Which principle describes standard operation in this module?`,
        questionType: i % 4 === 0 ? "True/False" : (i % 3 === 0 ? "Multiple Select" : "MCQ"),
        options: i % 4 === 0 ? ["True", "False"] : [
          "Rigorous asymptotic optimization O(n log n)",
          "Direct unstructured hardware access",
          "Heuristic state enumeration",
          "Linear polynomial upper bound"
        ],
        correctAnswer: i % 4 === 0 ? "True" : "Rigorous asymptotic optimization O(n log n)",
        explanation: "As established in the official PUST syllabus, rigorous analysis guarantees polynomial-time resolution.",
        difficulty,
        marks: 1
      }))
    };

    setActiveQuiz(fallbackQuiz);
    navigate("/quiz/live");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Exam Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Quiz Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Customize course, topic focus, difficulty, and question formats.
        </p>
      </div>

      <form onSubmit={handleStart} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Select Course
          </label>
          <select
            value={courseCode}
            onChange={(e) => {
              setCourseCode(e.target.value);
              setTopic("All Topics");
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            {courses.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.title} (Y{c.year}T{c.term})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Select Topic / Module
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="All Topics">All Topics (Comprehensive Mock Exam)</option>
            {(selectedCourse.topics || []).map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.difficulty})
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((cnt) => (
                <button
                  type="button"
                  key={cnt}
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    questionCount === cnt
                      ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Difficulty
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["All", "Easy", "Medium", "Hard"].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    difficulty === lvl
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Time Limit
            </label>
            <select
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="5">5 Minutes (Sprint)</option>
              <option value="10">10 Minutes (Standard)</option>
              <option value="15">15 Minutes (Comprehensive)</option>
              <option value="30">30 Minutes (Full Exam Mode)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Question Types
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="All">All Formats (MCQ, True/False, Multi-Select)</option>
              <option value="MCQ">Multiple Choice Only (MCQ)</option>
              <option value="True/False">True / False</option>
              <option value="Multiple Select">Multiple Select</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 mt-4 text-sm"
        >
          <span>Start Examination</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
