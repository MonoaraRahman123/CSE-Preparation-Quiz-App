import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Bot, 
  FileText, 
  BarChart3, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  PlayCircle, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Award
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CourseDetails({ onOpenPdf }) {
  const { code } = useParams();
  const navigate = useNavigate();
  const { courses, markTopicComplete } = useApp();
  
  const courseCode = decodeURIComponent(code || "").toUpperCase();
  const course = courses.find(c => c.code.toUpperCase() === courseCode || c.code.replace(/\s+/g, '') === courseCode.replace(/\s+/g, '')) || courses[0];

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "outcomes", label: "Course Outcomes (COs)", icon: Award },
    { id: "topics", label: `Topics (${course.topics?.length || 0})`, icon: CheckCircle2 },
    { id: "materials", label: `Study Materials (${course.materialCount || 6})`, icon: FileText },
    { id: "quiz", label: "Take Quiz", icon: HelpCircle },
    { id: "ai", label: "AI Assistant", icon: Bot },
    { id: "progress", label: "Progress", icon: BarChart3 },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Back button */}
      <button
        onClick={() => navigate("/courses")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Catalog</span>
      </button>

      {/* Course Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-xs font-extrabold px-3 py-1 rounded-xl bg-brand-500 text-white shadow-sm">
              {course.code}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white">
              Year {course.year}, Term {course.term}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white">
              {course.credit} Credits
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {course.type}
            </span>
            {course.prerequisite && course.prerequisite !== "None" && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Prerequisite: {course.prerequisite}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {course.title}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {course.objectives?.[0] || "Foundations and advanced computational methods for CSE undergraduates."}
          </p>

          {/* Quick Stat Highlights */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Hours</span>
              <span className="font-bold text-white text-sm">{course.contactHours || "3L+0P"}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Course Mastery</span>
              <span className="font-bold text-brand-400 text-sm">{course.progress || 60}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Quizzes Available</span>
              <span className="font-bold text-emerald-400 text-sm">{course.quizCount || 4} Tests</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">AI Tutor</span>
              <span className="font-bold text-indigo-300 text-sm">Context Activated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                active 
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Course Objectives</h3>
              <ul className="space-y-2.5">
                {(course.objectives || []).map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Prescribed Textbooks & References</h3>
              <ul className="space-y-2">
                {(course.books || []).map((bk, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{bk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Fast Preparation</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Start a timed diagnostic quiz for this course to calculate your current readiness score.
              </p>
              <button
                onClick={() => navigate(`/quiz?courseCode=${encodeURIComponent(course.code)}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Launch Course Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Course Outcomes (COs) */}
      {activeTab === "outcomes" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Program Learning Outcomes Mapping</h3>
            <p className="text-xs text-slate-500">Official Outcome-Based Education (OBE) descriptors for {course.code}</p>
          </div>

          <div className="space-y-3 pt-2">
            {(course.outcomes || []).map((co, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">{co}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Topics */}
      {activeTab === "topics" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Syllabus Topic Modules</h3>
              <p className="text-xs text-slate-500">Track your module-by-module mastery and test specific concepts</p>
            </div>
          </div>

          <div className="grid gap-3.5">
            {(course.topics || []).map((t, idx) => (
              <div
                key={t.id || idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Module {idx + 1}:</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>Difficulty: <b className="text-slate-700 dark:text-slate-300">{t.difficulty}</b></span>
                    <span>•</span>
                    <span>Estimated: <b className="text-slate-700 dark:text-slate-300">{t.hours || 6} Contact Hrs</b></span>
                    <span>•</span>
                    <span className="text-brand-600 dark:text-brand-400 font-bold">{t.completion || 0}% Mastered</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {t.completion >= 100 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => markTopicComplete(course.code, t.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      Mark Done
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/quiz?courseCode=${encodeURIComponent(course.code)}&topic=${encodeURIComponent(t.name)}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 transition-colors"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Practice Topic</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Study Materials */}
      {activeTab === "materials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Course Materials & Downloads</h3>
              <p className="text-xs text-slate-500">Lecture slides, previous questions, notes and laboratory workbooks</p>
            </div>
            <Link to={`/materials?courseCode=${encodeURIComponent(course.code)}`} className="text-xs font-bold text-brand-600 hover:underline">
              View All in Material Library →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: `${course.code}: Comprehensive Lecture Slides`, type: "Lecture Slides", size: "4.2 MB", pages: 54 },
              { title: `${course.code}: Past 5-Years Term Final Questions`, type: "Previous Questions", size: "2.1 MB", pages: 30 },
              { title: `${course.code}: Handwritten Teacher Reference Notes`, type: "Course Notes", size: "5.8 MB", pages: 62 },
              { title: `${course.code}: Practical Viva Voce Sheet`, type: "Viva Questions", size: "1.4 MB", pages: 18 }
            ].map((mat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{mat.type}</span>
                    <span>{mat.size} • {mat.pages} Pages</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{mat.title}</h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenPdf && onOpenPdf(mat.title, course.code)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in PDF Viewer</span>
                  </button>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert("File downloaded: " + mat.title); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Quiz Launch */}
      {activeTab === "quiz" && (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {course.code} Practice Examination
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Customize question count, difficulty, and question formats (MCQs, True/False, Multiple Select, Short Answers) calibrated to the PUST syllabus.
          </p>

          <button
            onClick={() => navigate(`/quiz?courseCode=${encodeURIComponent(course.code)}`)}
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all"
          >
            Configure & Start Quiz Now
          </button>
        </div>
      )}

      {/* Tab 6: AI Assistant */}
      {activeTab === "ai" && (
        <div className="p-8 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Bot className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Study {course.code} with AI Tutor
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Ask the AI Assistant to generate 7-day study plans, explain difficult algorithms, or simulate viva voce examinations for <b>{course.title}</b>.
          </p>
          <button
            onClick={() => navigate(`/ai?courseCode=${encodeURIComponent(course.code)}`)}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open AI Assistant for {course.code}</span>
          </button>
        </div>
      )}

      {/* Tab 7: Progress */}
      {activeTab === "progress" && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Course Progress & Topic Mastery</h3>
              <p className="text-xs text-slate-500">Real-time status based on completed quizzes and study check-offs</p>
            </div>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">{course.progress || 60}%</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full rounded-full" style={{ width: `${course.progress || 60}%` }} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 block">Quizzes Passed</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">3 of 4</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 block">Average Quiz Score</span>
              <span className="text-lg font-bold text-emerald-500">84.0%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 block">Materials Consulted</span>
              <span className="text-lg font-bold text-indigo-500">5 Documents</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
