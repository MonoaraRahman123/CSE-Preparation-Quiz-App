import React, { useState } from "react";
import { 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Lock
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SettingsPage() {
  const { user, darkMode, toggleDarkMode } = useApp();
  const [notifsEnabled, setNotifsEnabled] = useState(true);
  const [leaderboardVisible, setLeaderboardVisible] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Application Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Preferences & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your theme, alerts, course preferences, and privacy.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Appearance & Display */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Appearance & Theme</span>
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Switch between light and high-contrast dark academic themes</p>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                darkMode ? "bg-brand-600 justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-500" />
            <span>Notifications & Alerts</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Quiz & Material Alerts</p>
                <p className="text-[11px] text-slate-500">Receive in-app alerts when faculty uploads slides or tests</p>
              </div>
              <input
                type="checkbox"
                checked={notifsEnabled}
                onChange={(e) => setNotifsEnabled(e.target.checked)}
                className="w-4 h-4 accent-brand-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Study Streak Reminders</p>
                <p className="text-[11px] text-slate-500">Daily notification to maintain your 7-day study streak</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-brand-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Privacy & Community */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span>Privacy & Leaderboard Visibility</span>
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Public Leaderboard Ranking</p>
              <p className="text-[11px] text-slate-500">Display your student ID and points on the department leaderboard</p>
            </div>
            <input
              type="checkbox"
              checked={leaderboardVisible}
              onChange={(e) => setLeaderboardVisible(e.target.checked)}
              className="w-4 h-4 accent-brand-600 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all"
          >
            Save Preferences
          </button>
        </div>

      </form>

    </div>
  );
}
