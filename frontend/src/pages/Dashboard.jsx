import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Bot, 
  FileText, 
  Flame, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  PlayCircle,
  GraduationCap
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { user, courses, quizHistory } = useApp();
  const navigate = useNavigate();

  // Greeting time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : (hour < 18 ? "Good Afternoon" : "Good Evening");

  // Calculate student stats
  const currentYear = user?.year || 3;
  const currentTerm = user?.term || 2;
  const currentSemesterCourses = courses.filter(c => c.year === currentYear && c.term === currentTerm);

  // Continue learning: active courses in current semester
  const continueCourses = currentSemesterCourses.slice(0, 3);

  // Weekly performance points for SVG chart
  const weeklyScores = [
    { day: "Sat", score: 75 },
    { day: "Sun", score: 82 },
    { day: "Mon", score: 90 },
    { day: "Tue", score: 85 },
    { day: "Wed", score: 78 },
    { day: "Thu", score: 92 },
    { day: "Fri", score: 88 }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Personalized Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-800 p-6 sm:p-8 text-white shadow-xl shadow-brand-500/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-brand-100 mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-200" />
            <span>PUST CSE Department • Session 2020-2021</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {greeting}, {user?.fullName || "Student"} 👋
          </h1>
          <p className="mt-1 text-sm text-brand-100">
            Continue your CSE undergraduate preparation. You're currently enrolled in <b>Year {currentYear}, Term {currentTerm}</b>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/quiz")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-xs hover:bg-brand-50 shadow-md transition-all hover:scale-105"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Start Quick Quiz</span>
            </button>
            <button
              onClick={() => navigate("/ai")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white font-bold text-xs hover:bg-white/30 border border-white/25 transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/20 text-white font-bold text-xs hover:bg-black/30 border border-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Curriculum</span>
            </button>
          </div>
        </div>

        {/* Decorative background badges */}
        <div className="absolute right-4 bottom-4 opacity-10 hidden sm:block pointer-events-none">
          <GraduationCap className="w-64 h-64 text-white -mr-10 -mb-10" />
        </div>
      </div>

      {/* 1. Overall Progress Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Degree</span>
            <TrendingUp className="w-4 h-4 text-brand-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">68%</span>
            <span className="text-xs font-bold text-emerald-500">+4% this mo</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">112 / 165 Credits completed</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full transition-all duration-500" style={{ width: "68%" }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Quizzes Passed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">24</span>
            <span className="text-xs font-bold text-brand-500">5 this week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 8 core subjects</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "80%" }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Score</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">82.5%</span>
            <span className="text-xs font-bold text-emerald-500">Top 10%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Rank #5 on Leaderboard</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: "82.5%" }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Courses Done</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">38</span>
            <span className="text-xs text-slate-400">/ 78 total</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Years 1 & 2 100% completed</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: "48%" }} />
          </div>
        </div>
      </div>

      {/* 2. Continue Learning Section (Recently Studied Courses) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Continue Learning</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pick up where you left off in your current term</p>
          </div>
          <Link to="/courses" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
            <span>All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {continueCourses.map((c) => (
            <div 
              key={c.code}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-brand-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                    {c.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {c.credit} Credits • {c.type}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {c.objectives?.[0] || "Foundations and advanced computational methods."}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 text-[11px]">Syllabus Progress</span>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px]">{c.progress || 60}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-brand-500 h-full rounded-full" style={{ width: `${c.progress || 60}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last studied today
                  </span>
                  <Link
                    to={`/courses/${encodeURIComponent(c.code)}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:bg-brand-600 hover:text-white text-xs font-bold transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Performance Chart & Recommendations Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Weekly Performance Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Performance Trend</h3>
              <p className="text-xs text-slate-500">Average Quiz Accuracy across recent 7 days</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              Avg 82.5%
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {weeklyScores.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.score}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-32 flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-lg transition-all duration-700 group-hover:from-brand-500 group-hover:to-indigo-400"
                    style={{ height: `${item.score}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Recommended For You</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
              Action Items for Higher GPA
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Revise CPU Scheduling (CSE 3203)</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">Your score was 40% in your last quiz. AI tutor recommends review.</p>
                  <button 
                    onClick={() => navigate("/ai")}
                    className="mt-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Ask AI about CPU Scheduling →
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                <PlayCircle className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Take Data Structures Practice</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">Prepare for midterm with 10 questions on AVL Trees.</p>
                  <button 
                    onClick={() => navigate("/quiz")}
                    className="mt-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Start AVL Quiz →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link to="/progress" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              View Complete Performance Analytics →
            </Link>
          </div>
        </div>

      </div>

      {/* 4. Recent Activity Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Recent Activity</h3>
            <p className="text-xs text-slate-500">Your latest quizzes, lectures opened, and AI queries</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            View Complete History
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {quizHistory.slice(0, 3).map((act, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                  {act.percentage}%
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Completed {act.courseCode} Quiz: {act.topic}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {act.score}/{act.totalQuestions} Correct • Time: {Math.round(act.timeTakenSeconds / 60)}m • Passed with distinction
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                {new Date(act.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
