import React from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Clock
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity & Announcements</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            System announcements, quiz releases, study reminders, and milestone badges.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          Mark all as read
        </button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => markNotificationRead(n._id)}
            className={`p-5 flex items-start gap-4 transition-colors cursor-pointer ${
              !n.read ? "bg-brand-50/40 dark:bg-brand-950/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700">
              {n.type === "quiz" ? <Sparkles className="w-5 h-5 text-brand-500" /> :
               n.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
               n.type === "material" ? <BookOpen className="w-5 h-5 text-indigo-500" /> :
               <Bell className="w-5 h-5 text-amber-500" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</h3>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {n.time}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {n.message}
              </p>
              {n.link && (
                <Link
                  to={n.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline mt-2"
                >
                  <span>Open Related Section</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
