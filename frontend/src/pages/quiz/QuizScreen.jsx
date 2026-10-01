import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  X
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function QuizScreen() {
  const navigate = useNavigate();
  const { activeQuiz, recordQuizAttempt } = useApp();

  // Redirect if no active quiz
  useEffect(() => {
    if (!activeQuiz) {
      navigate("/quiz");
    }
  }, [activeQuiz, navigate]);

  if (!activeQuiz) return null;

  const { questions = [], courseCode, courseTitle, topic, timeLimitMinutes = 15 } = activeQuiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || {};

  const handleSelectOption = (option) => {
    if (currentQ.questionType === "Multiple Select") {
      const currentList = Array.isArray(answers[currentQ._id]) ? answers[currentQ._id] : [];
      const updated = currentList.includes(option) 
        ? currentList.filter(o => o !== option)
        : [...currentList, option];
      setAnswers(prev => ({ ...prev, [currentQ._id]: updated }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQ._id]: option }));
    }
  };

  const toggleMarkReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ._id]: !prev[currentQ._id]
    }));
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    const timeTaken = (timeLimitMinutes * 60) - timeLeft;

    try {
      const res = await fetch("/api/quizzes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: activeQuiz.quizId,
          courseCode,
          courseTitle,
          topic,
          timeTakenSeconds: timeTaken,
          answers,
          questions
        })
      });

      if (res.ok) {
        const data = await res.json();
        recordQuizAttempt(data.result);
        navigate("/quiz/result");
        return;
      }
    } catch (err) {
      console.warn("Backend submit error, using client evaluation", err);
    }

    // Client fallback evaluation
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    const graded = questions.map(q => {
      const ans = answers[q._id];
      let isCorrect = false;
      if (ans === undefined || ans === "") {
        unansweredCount++;
      } else {
        if (Array.isArray(q.correctAnswer) && Array.isArray(ans)) {
          isCorrect = q.correctAnswer.length === ans.length && q.correctAnswer.every(v => ans.includes(v));
        } else {
          isCorrect = String(ans).toLowerCase().trim() === String(q.correctAnswer).toLowerCase().trim();
        }
        if (isCorrect) correctCount++;
        else wrongCount++;
      }
      return {
        questionId: q._id,
        questionText: q.question,
        userAnswer: ans ?? "Unanswered",
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || "Official curriculum syllabus reasoning."
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const result = {
      _id: `att_${Date.now()}`,
      courseCode,
      courseTitle,
      topic,
      score: correctCount,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      unanswered: unansweredCount,
      percentage,
      timeTakenSeconds: timeTaken,
      answers: graded,
      strongTopics: ["Theoretical Foundations"],
      weakTopics: percentage < 70 ? ["Asymptotic Analysis"] : [],
      recommendations: ["Review lecture slides and test again using AI Tutor."]
    };

    recordQuizAttempt(result);
    navigate("/quiz/result");
  };

  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Top Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {courseCode}
            </span>
            <span className="text-xs font-semibold text-slate-500 truncate max-w-xs">{topic}</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Live Timer */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm border ${
          timeLeft < 120 
            ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-200 dark:border-rose-800 animate-pulse" 
            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-md transition-colors"
        >
          Submit Examination
        </button>
      </div>

      {/* Main Question Card & Palette */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question {currentIndex + 1}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                {currentQ.questionType || "MCQ"} • {currentQ.marks || 1} Mark
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {(currentQ.options || []).map((opt, optIdx) => {
                const letter = String.fromCharCode(65 + optIdx);
                const isSelected = currentQ.questionType === "Multiple Select"
                  ? Array.isArray(answers[currentQ._id]) && answers[currentQ._id].includes(opt)
                  : answers[currentQ._id] === opt;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 group ${
                      isSelected
                        ? "bg-brand-50/80 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-brand-600 text-white"
                        : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    }`}>
                      {letter}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 pt-0.5 flex-1">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={toggleMarkReview}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  markedForReview[currentQ._id]
                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ._id] ? "Marked for Review" : "Mark for Review"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Question Navigator Palette */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Question Navigator
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = answers[q._id] !== undefined && answers[q._id] !== "";
                const isMarked = markedForReview[q._id];

                let btnClass = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

                if (isAnswered) {
                  btnClass = "bg-emerald-500 text-white shadow-sm";
                }
                if (isMarked) {
                  btnClass = "bg-amber-500 text-white ring-2 ring-amber-400/40";
                }
                if (isCurrent) {
                  btnClass += " ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 font-extrabold";
                }

                return (
                  <button
                    key={q._id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered</span>
                <span className="font-bold text-slate-900 dark:text-white">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Marked</span>
                <span className="font-bold text-slate-900 dark:text-white">{markedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Unanswered</span>
                <span className="font-bold text-slate-900 dark:text-white">{unansweredCount}</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors shadow-md mt-4"
            >
              Finish & Review Submission
            </button>

          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Submit Examination?</h3>
              <button onClick={() => setShowConfirmModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Questions:</span>
                <span className="font-bold text-slate-900 dark:text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Answered:</span>
                <span>{answeredCount}</span>
              </div>
              <div className="flex justify-between text-rose-500 font-bold">
                <span>Unanswered:</span>
                <span>{unansweredCount}</span>
              </div>
              <div className="flex justify-between text-amber-500 font-bold">
                <span>Marked for Review:</span>
                <span>{markedCount}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Are you sure you want to finalize your submission? Your score and step-by-step explanations will be calculated immediately.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Keep Reviewing
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitQuiz}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 shadow-md transition-colors"
              >
                {isSubmitting ? "Grading..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
