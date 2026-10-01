import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  BookOpen, 
  Layers, 
  Calendar,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function StudyMaterials({ onOpenPdf }) {
  const { courses } = useApp();

  const [category, setCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Course Notes",
    "Lecture Slides",
    "PDF Books",
    "Previous Questions",
    "Lab Materials",
    "Assignments",
    "Viva Questions"
  ];

  const materials = [
    {
      id: "mat_1",
      title: "Operating Systems Lecture Slides: CPU Scheduling & Deadlock",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      year: 3,
      term: 2,
      category: "Lecture Slides",
      size: "4.8 MB",
      pages: 58,
      date: "Sep 2026",
      uploadedBy: "Dept of CSE, PUST"
    },
    {
      id: "mat_2",
      title: "Operating Systems Hand-annotated Notes: Memory Management & Paging",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      year: 3,
      term: 2,
      category: "Course Notes",
      size: "3.2 MB",
      pages: 44,
      date: "Aug 2026",
      uploadedBy: "Prof. Kamrul Hasan"
    },
    {
      id: "mat_3",
      title: "Previous 5-Years Term Final Questions (2018-2023) with Hints",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      year: 3,
      term: 2,
      category: "Previous Questions",
      size: "2.1 MB",
      pages: 28,
      date: "July 2026",
      uploadedBy: "CSE Academic Committee"
    },
    {
      id: "mat_4",
      title: "Data Structures & Tree Balances Reference Handbook",
      courseCode: "CSE 2101",
      courseTitle: "Data Structures",
      year: 2,
      term: 1,
      category: "PDF Books",
      size: "8.4 MB",
      pages: 110,
      date: "June 2026",
      uploadedBy: "PUST Library"
    },
    {
      id: "mat_5",
      title: "Algorithms Dynamic Programming & Graph Solutions Guide",
      courseCode: "CSE 2201",
      courseTitle: "Algorithms",
      year: 2,
      term: 2,
      category: "Course Notes",
      size: "5.5 MB",
      pages: 72,
      date: "May 2026",
      uploadedBy: "Dept of CSE, PUST"
    },
    {
      id: "mat_6",
      title: "C Structured Programming Sessional Manual (60 Experiments)",
      courseCode: "CSE 1104",
      courseTitle: "Structured Programming Language Sessional I",
      year: 1,
      term: 1,
      category: "Lab Materials",
      size: "3.9 MB",
      pages: 50,
      date: "Jan 2026",
      uploadedBy: "Lab Instructor"
    },
    {
      id: "mat_7",
      title: "Computer Networks Protocols & OSI Layer Sheet",
      courseCode: "CSE 4201",
      courseTitle: "Computer Networks",
      year: 4,
      term: 2,
      category: "Lecture Slides",
      size: "4.5 MB",
      pages: 65,
      date: "Sep 2026",
      uploadedBy: "Dept of CSE, PUST"
    },
    {
      id: "mat_8",
      title: "Comprehensive Viva Voce Questions & Model Answers",
      courseCode: "CSE 3250",
      courseTitle: "Viva Voce",
      year: 3,
      term: 2,
      category: "Viva Questions",
      size: "1.8 MB",
      pages: 22,
      date: "Aug 2026",
      uploadedBy: "Faculty Committee"
    }
  ];

  const filteredMaterials = materials.filter(m => {
    if (category !== "All" && m.category !== category) return false;
    if (selectedYear !== "All" && m.year !== Number(selectedYear)) return false;
    if (selectedTerm !== "All" && m.term !== Number(selectedTerm)) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.courseCode.toLowerCase().includes(q) || m.courseTitle.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PUST CSE Department Repository</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Study Materials & Digital Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Access verified lecture notes, slides, previous term questions, and lab manuals.
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
            placeholder="Search documents by title, course code (e.g. Operating Systems, CSE 3203, Slides)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                category === cat
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Academic Year & Term Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400">Year:</span>
            {["All", "1", "2", "3", "4"].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  selectedYear === y ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {y === "All" ? "All" : `Y${y}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400">Term:</span>
            {["All", "1", "2"].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTerm(t)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  selectedTerm === t ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {t === "All" ? "All" : `T${t}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {mat.courseCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  {mat.category}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {mat.title}
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                {mat.courseTitle} • Y{mat.year}T{mat.term}
              </p>

              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                <span>{mat.size}</span>
                <span>•</span>
                <span>{mat.pages} Pages</span>
                <span>•</span>
                <span>{mat.uploadedBy}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenPdf && onOpenPdf(mat.title, mat.courseCode)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Read in PDF Viewer</span>
              </button>

              <button
                onClick={() => alert(`Downloaded: ${mat.title}.pdf`)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
