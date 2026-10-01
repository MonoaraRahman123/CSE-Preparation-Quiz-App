import React, { useState } from "react";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Award, 
  Flame, 
  Trophy, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Edit3, 
  ShieldCheck,
  Star,
  Zap,
  Sparkles,
  X
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProfilePage() {
  const { user, login } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || "MD. Tanvir Hasan");
  const [editDept, setEditDept] = useState(user?.department || "Computer Science and Engineering");
  const [editYear, setEditYear] = useState(user?.year || 3);
  const [editTerm, setEditTerm] = useState(user?.term || 2);

  const badges = [
    { title: "First Quiz", desc: "Completed first quiz", icon: Award, unlocked: true, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50" },
    { title: "10 Quizzes", desc: "Passed 10 course quizzes", icon: BookOpen, unlocked: true, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/50" },
    { title: "7-Day Streak", desc: "Studied 7 consecutive days", icon: Flame, unlocked: true, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/50" },
    { title: "Quiz Master", desc: "Score >= 90% in 5 quizzes", icon: Trophy, unlocked: true, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/50" },
    { title: "Perfect Score", desc: "Achieved 100% on a full test", icon: Star, unlocked: true, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50" },
    { title: "30-Day Streak", desc: "Month of consistency", icon: Zap, unlocked: false, color: "text-slate-400 bg-slate-100 dark:bg-slate-800" },
    { title: "Course Champion", desc: "100% modules completed", icon: Sparkles, unlocked: false, color: "text-slate-400 bg-slate-100 dark:bg-slate-800" }
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      fullName: editName,
      department: editDept,
      year: Number(editYear),
      term: Number(editTerm)
    };
    login(updated, "demo_token");
    setShowEditModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.studentId}`}
            alt={user?.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-brand-500 shadow-lg"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {user?.fullName || "MD. Tanvir Hasan"}
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {user?.email || "tanvir.cse@pust.ac.bd"}
                </p>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto sm:mx-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
              <span className="font-bold px-2.5 py-1 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/50">
                Student ID: {user?.studentId || "200615"}
              </span>
              <span className="font-semibold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {user?.department || "CSE Department"}
              </span>
              <span className="font-semibold px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Year {user?.year || 3}, Term {user?.term || 2}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Quizzes</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">24</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Score</span>
            <span className="text-xl font-extrabold text-emerald-500">82.5%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Courses Done</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">38</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Study Hours</span>
            <span className="text-xl font-extrabold text-indigo-500">118h</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Streak</span>
            <span className="text-xl font-extrabold text-amber-500">7 Days 🔥</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Rank</span>
            <span className="text-xl font-extrabold text-purple-500">#5 🏆</span>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Achievement Badges</h3>
          <p className="text-xs text-slate-500">Milestones unlocked throughout your academic journey</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div 
                key={i}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  b.unlocked 
                    ? "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700" 
                    : "opacity-40 border-dashed border-slate-300 dark:border-slate-800 bg-transparent"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${b.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.title}</h4>
                <p className="text-[10px] text-slate-500">{b.desc}</p>
                <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  b.unlocked ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-200 text-slate-500"
                }`}>
                  {b.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Academic Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Year</label>
                  <select
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Term</label>
                  <select
                    value={editTerm}
                    onChange={(e) => setEditTerm(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="1">Term 1</option>
                    <option value="2">Term 2</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
