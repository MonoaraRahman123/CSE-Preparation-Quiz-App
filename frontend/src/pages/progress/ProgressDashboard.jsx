import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Flame,
  Award
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProgressDashboard() {
  const navigate = useNavigate();
  const { user, courses, quizHistory } = useApp();

  const currentSemesterCourses = courses.filter(c => c.year === (user?.year || 3) && c.term === (user?.term || 2));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Student Performance Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Progress & Learning Trajectory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed breakdown of your credit progress, quiz scores, and weak topics.
        </p>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Degree Completion</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">68%</span>
            <span className="text-xs font-bold text-emerald-500">+12% semester</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">112 of 165 total credits</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full" style={{ width: "68%" }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Quizzes Completed</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">24</span>
            <span className="text-xs font-bold text-brand-500">100% evaluated</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 8 core CSE subjects</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: "75%" }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Average Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">82.5%</span>
            <span className="text-xs font-bold text-emerald-500">Grade A</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Top 10% in CSE 13th batch</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "82.5%" }} />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Active Study Hours</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">118h</span>
            <span className="text-xs font-bold text-amber-500">🔥 7-day streak</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">4.2 hours/week average</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: "88%" }} />
          </div>
        </div>
      </div>

      {/* Smart Recommended Next Topic Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-indigo-500/10 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Recommended Next Action
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                CSE 3203
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
              CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Your performance in Process Scheduling is below your average (40% on recent attempt). Revise this topic and attempt the recommended quiz.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/quiz?courseCode=CSE%203203&topic=CPU%20Scheduling%20Algorithms")}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Retake Topic Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course-Wise Progress Bars */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Current Semester Course Mastery</h3>
            <p className="text-xs text-slate-500">Year {user?.year || 3}, Term {user?.term || 2} Course Enrollments</p>
          </div>
          <span className="text-xs text-brand-600 font-bold">PUST Session 2020-2021</span>
        </div>

        <div className="space-y-4">
          {currentSemesterCourses.map((c) => (
            <div key={c.code} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{c.code}</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">{c.title}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{c.progress || 60}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    (c.progress || 60) >= 80 ? "bg-emerald-500" : ((c.progress || 60) >= 60 ? "bg-brand-500" : "bg-amber-500")
                  }`}
                  style={{ width: `${c.progress || 60}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
