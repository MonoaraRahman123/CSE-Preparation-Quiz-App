import React from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Bot, 
  FileText, 
  BarChart3, 
  Trophy, 
  History, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Layers,
  Award,
  Zap,
  Clock
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LandingPage() {
  const { user } = useApp();

  const features = [
    {
      icon: BookOpen,
      color: "bg-blue-500",
      title: "📚 All CSE Courses",
      desc: "Complete 4-year curriculum with 8 terms and 165 credits based on PUST Session 2020-2021."
    },
    {
      icon: HelpCircle,
      color: "bg-emerald-500",
      title: "📝 Course-wise Quiz",
      desc: "Exam-style quizzes covering MCQs, True/False, Multiple Select, and Short Answers with timers."
    },
    {
      icon: Bot,
      color: "bg-indigo-500",
      title: "🤖 AI Preparation Assistant",
      desc: "Context-aware AI tutor answering queries, generating practice questions, and explaining errors."
    },
    {
      icon: FileText,
      color: "bg-amber-500",
      title: "📄 Course Materials",
      desc: "Instant access to lecture slides, past question papers, lab manuals, and PDF books."
    },
    {
      icon: BarChart3,
      color: "bg-purple-500",
      title: "📊 Progress Tracking",
      desc: "Granular analytics mapping your topic mastery, study hours, and weak topic alerts."
    },
    {
      icon: Trophy,
      color: "bg-rose-500",
      title: "🏆 Leaderboard",
      desc: "Friendly competition by department, semester, and batch with achievement badges."
    },
    {
      icon: History,
      color: "bg-cyan-500",
      title: "📜 Complete Quiz History",
      desc: "Detailed historical logs of all your quiz attempts, scores, and step-by-step solutions."
    },
    {
      icon: User,
      color: "bg-teal-500",
      title: "👤 Student Profile",
      desc: "Official institutional profile showcasing academic credentials, streak days, and trophies."
    }
  ];

  const steps = [
    { step: 1, title: "Select Year & Term", desc: "Choose from Year 1 to Year 4, covering all 8 semesters." },
    { step: 2, title: "Choose a CSE Course", desc: "Access theory or lab courses (e.g. Operating Systems, Data Structures)." },
    { step: 3, title: "Study Course Materials", desc: "Review lecture slides, course outcomes (COs), and reference notes." },
    { step: 4, title: "Take Timed Quizzes", desc: "Simulate examination environments with topic-wise questions." },
    { step: 5, title: "Review Mistakes", desc: "Analyze in-depth explanations and pinpoint your weak topics." },
    { step: 6, title: "Use AI Assistant", desc: "Ask the AI tutor to clarify difficult concepts and generate code." },
    { step: 7, title: "Track Progress & Rank", desc: "Monitor your completion percentage and climb the semester leaderboard." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* Top Floating Announcement */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-600 text-white text-xs font-semibold py-2 px-4 text-center">
        <span>🎓 Official B.Sc. Engineering Curriculum • Pabna University of Science and Technology (PUST) • 165 Total Credits</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Next-Gen CSE Academic Preparation Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Prepare Every CSE Course in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">One Place.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Learn smarter with course-wise quizzes, AI-powered preparation, study materials, progress tracking, and competitive leaderboards — tailored for PUST CSE undergraduates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
                >
                  <span>Start Preparation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore 78 Courses</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 8 Academic Semesters</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 165 Total Credits</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Tutor Included</span>
              </div>
            </div>

            {/* Right Column: High-Fidelity App Mockup Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-800 p-4 shadow-2xl ring-1 ring-white/10 text-white">
                
                {/* Mock Card Top Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">CSE 3203: Operating Systems</span>
                </div>

                {/* Mock Quiz Card */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div className="flex items-center justify-between text-[11px] text-brand-400 font-semibold mb-1.5">
                    <span>Question 4 of 10</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 11:45 remaining</span>
                  </div>
                  <p className="text-xs font-medium text-slate-200">
                    Which CPU scheduling algorithm guarantees minimum average waiting time?
                  </p>
                  <div className="mt-2 space-y-1.5">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-[11px] text-slate-300">A. FCFS</div>
                    <div className="px-3 py-1.5 rounded-lg bg-brand-500/30 border border-brand-400 text-[11px] font-bold text-white flex justify-between items-center">
                      <span>B. Shortest Job First (SJF)</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-[11px] text-slate-300">C. Round Robin</div>
                  </div>
                </div>

                {/* Mock AI Tutor Snippet */}
                <div className="mt-3 p-3 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-indigo-300">CSE AI Assistant</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      "SJF is provably optimal. Let's review how the Gantt chart handles preemptive context switches."
                    </p>
                  </div>
                </div>

                {/* Student Score Badge */}
                <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-[11px] font-bold text-white">Score: 82%</p>
                      <p className="text-[10px] text-slate-400">Class Rank: #5 • +100 XP</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                    Mastered
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Complete Preparation Suite
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need to Ace Your CSE Degree
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Designed according to the Pabna University of Science and Technology (PUST) Computer Science and Engineering Department syllabus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:shadow-xl hover:border-brand-500/50 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl ${feat.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{feat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works (7 Steps) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Workflow
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
              How CSE Prep Accelerates Your Learning
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Follow our 7-step guided study routine from semester enrollment to term final success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.slice(0, 4).map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.title}</h4>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
            {steps.slice(4).map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.title}</h4>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Degree Highlight */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Pabna University of Science and Technology (PUST)
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Department of Computer Science and Engineering • Session 2020-2021
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-brand-400">4 Years</p>
              <p className="text-xs text-slate-300 mt-1">Undergraduate Program</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-indigo-400">8 Terms</p>
              <p className="text-xs text-slate-300 mt-1">Semester Examinations</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-400">165.00</p>
              <p className="text-xs text-slate-300 mt-1">Total Degree Credits</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-amber-400">78 Courses</p>
              <p className="text-xs text-slate-300 mt-1">Theory, Lab & Viva</p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all"
            >
              <span>Explore Course Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">CSE Prep</span>
            <span>— Academic preparation app for CSE undergraduates</span>
          </div>
          <p>© 2026 CSE Prep • Pabna University of Science and Technology (PUST)</p>
        </div>
      </footer>

    </div>
  );
}
