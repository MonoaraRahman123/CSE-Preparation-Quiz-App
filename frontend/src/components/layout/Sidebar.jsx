import React from "react";
import { NavLink, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  Bot, 
  FileText, 
  BarChart3, 
  History, 
  Trophy, 
  User, 
  Settings, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useApp();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/courses", icon: BookOpen, badge: "78 Courses" },
    { name: "Quiz", path: "/quiz", icon: HelpCircle, badge: "Practice" },
    { name: "AI Assistant", path: "/ai", icon: Bot, isAi: true },
    { name: "Study Materials", path: "/materials", icon: FileText },
    { name: "Progress", path: "/progress", icon: BarChart3 },
    { name: "History", path: "/history", icon: History },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">CSE Prep</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Main Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25 font-semibold" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110`} />
                  <span>{item.name}</span>
                </div>

                {item.isAi ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <Sparkles className="w-2.5 h-2.5" /> AI
                  </span>
                ) : item.badge ? (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}

          {/* Academic Years Quick Access */}
          <div className="pt-5 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Academic Years (PUST)
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 px-1">
            {[1, 2, 3, 4].map(yr => (
              <Link
                key={yr}
                to={`/courses?year=${yr}`}
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200/60 dark:border-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <span>Year {yr}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </Link>
            ))}
          </div>

          {/* Admin Suite Section */}
          <div className="pt-5 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Administration
          </div>

          <NavLink
            to="/admin"
            onClick={() => onClose && onClose()}
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
              ${isActive 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25" 
                : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"}
            `}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </NavLink>
        </div>

        {/* Current Student Card footer */}
        {user && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.studentId}`} 
                alt={user.fullName}
                className="w-9 h-9 rounded-full object-cover border border-brand-500" 
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {user.studentId ? `ID: ${user.studentId}` : user.role}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Semester: Y{user.year || 3}T{user.term || 2}</span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">{user.points || 1245} Pts</span>
            </div>
          </div>
        )}

      </aside>
    </>
  );
}
