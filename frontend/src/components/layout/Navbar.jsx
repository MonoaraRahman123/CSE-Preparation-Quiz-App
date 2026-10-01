import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, 
  Moon, 
  Sun, 
  Search, 
  Flame, 
  Zap, 
  User, 
  LogOut, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Navbar({ onToggleMobileMenu }) {
  const { 
    user, 
    darkMode, 
    toggleDarkMode, 
    notifications, 
    unreadCount, 
    markNotificationRead, 
    markAllNotificationsRead, 
    logout, 
    switchRole 
  } = useApp();
  
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  CSE<span className="text-brand-500">Prep</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  PUST
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Session 2020-2021 • 165 Cr
              </p>
            </div>
          </Link>
        </div>

        {/* Middle: Universal Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search CSE courses, codes, topics (e.g. CSE 3203, OS, Trees)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
            />
          </form>
        </div>

        {/* Right: Quick actions, Streak, Notifications, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Role Switcher for Demo evaluation */}
          <button
            onClick={() => switchRole(user?.role === "admin" ? "student" : "admin")}
            title="Click to toggle between Student and Admin perspective"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role: {user?.role === "admin" ? "Admin 🛡️" : "Student 👨‍🎓"}</span>
          </button>

          {/* Study Streak & Gamification Points */}
          {user && (
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800/50">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{user.streak || 7}d Streak</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-200 dark:border-brand-800/50">
                <Zap className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                <span>{user.points || 1245} pts</span>
              </div>
            </div>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brand-500 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.map((n) => (
                    <div 
                      key={n._id}
                      onClick={() => markNotificationRead(n._id)}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex gap-3 ${!n.read ? "bg-brand-50/40 dark:bg-brand-950/20" : ""}`}
                    >
                      <div className="mt-0.5">
                        {n.type === "quiz" ? <Sparkles className="w-4 h-4 text-brand-500" /> :
                         n.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                         n.type === "material" ? <BookOpen className="w-4 h-4 text-indigo-500" /> :
                         <Bell className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 px-4 text-center border-t border-slate-100 dark:border-slate-800">
                  <Link to="/notifications" onClick={() => setShowNotifs(false)} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500/50 transition-all"
              >
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.studentId}`} 
                  alt={user.fullName} 
                  className="w-8 h-8 rounded-full object-cover border border-brand-500/40"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300">
                        ID: {user.studentId}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {user.year ? `Y${user.year}T${user.term}` : user.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Student Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      Settings & Preferences
                    </Link>
                    {user.role === "admin" && (
                      <Link 
                        to="/admin" 
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => { setShowUserMenu(false); logout(); navigate("/"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-500 shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
