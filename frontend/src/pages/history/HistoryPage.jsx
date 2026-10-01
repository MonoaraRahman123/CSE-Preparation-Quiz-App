import React, { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  HelpCircle, 
  BookOpen, 
  Bot, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function HistoryPage() {
  const { quizHistory } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const staticActivities = [
    {
      id: "act_1",
      date: "Sep 16, 2026",
      course: "CSE 3203 — Operating Systems",
      activity: "Quiz Completed",
      type: "quiz",
      score: "80%",
      timeSpent: "9 min",
      status: "Passed with Distinction",
      details: "CPU Scheduling & Synchronization (8/10 correct)"
    },
    {
      id: "act_2",
      date: "Sep 16, 2026",
      course: "CSE 3203 — Operating Systems",
      activity: "PDF Viewed",
      type: "pdf",
      score: "—",
      timeSpent: "24 min",
      status: "Completed",
      details: "CPU Scheduling & Process Control Slides (58 pages)"
    },
    {
      id: "act_3",
      date: "Sep 15, 2026",
      course: "CSE 3203 — Operating Systems",
      activity: "AI Question Asked",
      type: "ai",
      score: "—",
      timeSpent: "14 min",
      status: "Resolved",
      details: "Preemptive vs Non-Preemptive Scheduling comparison"
    },
    {
      id: "act_4",
      date: "Sep 14, 2026",
      course: "CSE 2101 — Data Structures",
      activity: "Quiz Completed",
      type: "quiz",
      score: "90%",
      timeSpent: "8 min",
      status: "Passed",
      details: "Trees & AVL Rotations (9/10 correct)"
    },
    {
      id: "act_5",
      date: "Sep 13, 2026",
      course: "CSE 1103 — Structured Programming",
      activity: "Quiz Completed",
      type: "quiz",
      score: "100%",
      timeSpent: "6 min",
      status: "Perfect Score",
      details: "Pointers & Dynamic Memory (10/10 correct)"
    },
    {
      id: "act_6",
      date: "Sep 12, 2026",
      course: "CSE 3205 — Web Engineering",
      activity: "Study Session",
      type: "study",
      score: "—",
      timeSpent: "45 min",
      status: "Logged",
      details: "REST API Design & Authentication Protocols"
    }
  ];

  const filtered = staticActivities.filter(a => {
    if (activeTab === "quiz" && a.type !== "quiz") return false;
    if (activeTab === "ai" && a.type !== "ai") return false;
    if (activeTab === "pdf" && a.type !== "pdf") return false;
    if (activeTab === "study" && a.type !== "study") return false;
    if (search) {
      const q = search.toLowerCase();
      return a.course.toLowerCase().includes(q) || a.details.toLowerCase().includes(q) || a.activity.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
          <History className="w-3.5 h-3.5" />
          <span>Complete Academic Log</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Learning History & Activity Log
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical record of all attempted quizzes, study sessions, viewed PDFs, and AI conversations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity by course, topic, or keyword (e.g. Operating Systems, Quiz, AI)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "All Activities" },
            { id: "quiz", label: "Quiz Attempts" },
            { id: "ai", label: "AI Conversations" },
            { id: "pdf", label: "PDF Views" },
            { id: "study", label: "Study Sessions" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Table / Cards */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map(item => (
            <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  item.type === "quiz" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" :
                  item.type === "ai" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" :
                  item.type === "pdf" ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" :
                  "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
                }`}>
                  {item.type === "quiz" ? <HelpCircle className="w-5 h-5" /> :
                   item.type === "ai" ? <Bot className="w-5 h-5" /> :
                   item.type === "pdf" ? <FileText className="w-5 h-5" /> :
                   <BookOpen className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{item.activity}</span>
                    <span className="text-[10px] font-medium text-slate-400">• {item.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{item.course}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{item.details}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                {item.score !== "—" && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Score</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{item.score}</span>
                  </div>
                )}
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Time</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.timeSpent}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
