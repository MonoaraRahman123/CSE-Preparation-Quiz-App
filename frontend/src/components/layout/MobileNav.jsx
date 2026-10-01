import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, HelpCircle, Bot, User } from "lucide-react";

export default function MobileNav() {
  const items = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/courses", icon: BookOpen },
    { name: "Quiz", path: "/quiz", icon: HelpCircle },
    { name: "AI Tutor", path: "/ai", icon: Bot },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-medium transition-colors
                ${isActive 
                  ? "text-brand-600 dark:text-brand-400 font-bold" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
