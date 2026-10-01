import React, { useState } from "react";
import { 
  Trophy, 
  Medal, 
  Award, 
  Flame, 
  Zap, 
  Star, 
  Crown, 
  CheckCircle2, 
  Users,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function LeaderboardPage() {
  const { user } = useApp();
  const [scope, setScope] = useState("Term");

  const scopes = [
    { id: "Global", label: "Global (All PUST)" },
    { id: "Department", label: "CSE Department" },
    { id: "Year", label: "3rd Year" },
    { id: "Term", label: "Year 3 Term 2" },
    { id: "Weekly", label: "Weekly Sprint" },
    { id: "Monthly", label: "Monthly" }
  ];

  const students = [
    {
      rank: 1,
      studentName: "Sadia Afrin",
      studentId: "200601",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      points: 1890,
      quizzesCompleted: 42,
      averageScore: 94.2,
      badges: ["Quiz Master", "Top Performer", "30-Day Streak", "Course Champion"],
      year: 3,
      term: 2
    },
    {
      rank: 2,
      studentName: "Nahidul Islam",
      studentId: "200608",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      points: 1740,
      quizzesCompleted: 38,
      averageScore: 91.5,
      badges: ["Top Performer", "Consistent Learner", "7-Day Streak"],
      year: 3,
      term: 2
    },
    {
      rank: 3,
      studentName: "Fariha Tasnim",
      studentId: "200619",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      points: 1610,
      quizzesCompleted: 35,
      averageScore: 88.0,
      badges: ["Quiz Master", "7-Day Streak"],
      year: 3,
      term: 2
    },
    {
      rank: 4,
      studentName: "Rafiul Alam",
      studentId: "200627",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      points: 1450,
      quizzesCompleted: 31,
      averageScore: 86.4,
      badges: ["Consistent Learner"],
      year: 3,
      term: 2
    },
    {
      rank: 5,
      studentName: "MD. Tanvir Hasan (You)",
      studentId: "200615",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      points: 1245,
      quizzesCompleted: 24,
      averageScore: 82.5,
      badges: ["Consistent Learner", "7-Day Streak"],
      year: 3,
      term: 2,
      isCurrentUser: true
    },
    {
      rank: 6,
      studentName: "Ashikur Rahman",
      studentId: "200633",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      points: 1120,
      quizzesCompleted: 22,
      averageScore: 79.8,
      badges: ["7-Day Streak"],
      year: 3,
      term: 2
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Academic Learning Leaderboard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Student Leaderboard & Rankings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Celebrate learning consistency, quiz excellence, and milestone achievements.
        </p>
      </div>

      {/* Your Rank Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-extrabold text-2xl border border-white/25">
            #5
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-200">Your Standing</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">Top 10%</span>
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">{user?.fullName || "MD. Tanvir Hasan"}</h3>
            <p className="text-xs text-brand-100">ID: {user?.studentId || "200615"} • Session 2020-2021</p>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/20">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-brand-200 block">Total Points</span>
            <span className="text-xl font-extrabold text-white">{user?.points || 1245} Pts</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-brand-200 block">Accuracy</span>
            <span className="text-xl font-extrabold text-emerald-300">82.5%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {scopes.map(s => (
          <button
            key={s.id}
            onClick={() => setScope(s.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              scope === s.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid sm:grid-cols-3 gap-6 items-end pt-4">
        {/* Rank 2 */}
        <div className="order-2 sm:order-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm relative">
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 shadow">
            #2
          </div>
          <img src={students[1].avatar} alt="" className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-300 mb-3" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{students[1].studentName}</h4>
          <p className="text-[11px] text-slate-500">ID: {students[1].studentId}</p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-around text-xs">
            <div><span className="font-bold text-brand-600">{students[1].points}</span> <span className="text-[10px] text-slate-400 block">Pts</span></div>
            <div><span className="font-bold text-emerald-500">{students[1].averageScore}%</span> <span className="text-[10px] text-slate-400 block">Avg</span></div>
          </div>
        </div>

        {/* Rank 1 (Tallest) */}
        <div className="order-1 sm:order-2 p-7 rounded-3xl bg-gradient-to-b from-amber-500/15 to-white dark:to-slate-900 border-2 border-amber-400 text-center shadow-lg relative">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-extrabold text-sm flex items-center justify-center absolute -top-5 left-1/2 -translate-x-1/2 shadow-lg ring-4 ring-white dark:ring-slate-900">
            👑 #1
          </div>
          <img src={students[0].avatar} alt="" className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-400 mb-3 shadow-md" />
          <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{students[0].studentName}</h4>
          <p className="text-[11px] text-slate-500">ID: {students[0].studentId} • Batch Champion</p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-around text-xs">
            <div><span className="font-extrabold text-amber-500 text-sm">{students[0].points}</span> <span className="text-[10px] text-slate-400 block">Pts</span></div>
            <div><span className="font-extrabold text-emerald-500 text-sm">{students[0].averageScore}%</span> <span className="text-[10px] text-slate-400 block">Avg</span></div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-sm relative">
          <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 shadow">
            #3
          </div>
          <img src={students[2].avatar} alt="" className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-700 mb-3" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{students[2].studentName}</h4>
          <p className="text-[11px] text-slate-500">ID: {students[2].studentId}</p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-around text-xs">
            <div><span className="font-bold text-brand-600">{students[2].points}</span> <span className="text-[10px] text-slate-400 block">Pts</span></div>
            <div><span className="font-bold text-emerald-500">{students[2].averageScore}%</span> <span className="text-[10px] text-slate-400 block">Avg</span></div>
          </div>
        </div>
      </div>

      {/* Complete Rankings Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Rankings Table</h3>
          <span className="text-xs text-slate-400">PUST CSE Batch 13</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map(s => (
            <div
              key={s.rank}
              className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                s.isCurrentUser ? "bg-brand-50/70 dark:bg-brand-950/40 border-l-4 border-l-brand-600" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                  s.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-extrabold" :
                  s.rank === 2 ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold" :
                  s.rank === 3 ? "bg-amber-900/20 text-amber-800 dark:text-amber-400 font-bold" :
                  "text-slate-400 font-medium"
                }`}>
                  {s.rank}
                </span>

                <img src={s.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{s.studentName}</h4>
                    {s.isCurrentUser && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-500 text-white">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {s.badges.map((b, bi) => (
                      <span key={bi} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 text-xs shrink-0 text-right">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Quizzes</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{s.quizzesCompleted}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg</span>
                  <span className="font-bold text-emerald-500">{s.averageScore}%</span>
                </div>
                <div className="min-w-[60px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Points</span>
                  <span className="font-extrabold text-brand-600 dark:text-brand-400">{s.points}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
