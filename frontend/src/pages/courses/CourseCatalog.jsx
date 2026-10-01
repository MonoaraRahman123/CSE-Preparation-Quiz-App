import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Search, 
  Filter, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CourseCatalog() {
  const { courses, curriculum } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedYear = searchParams.get("year") || "All";
  const selectedTerm = searchParams.get("term") || "All";
  const selectedType = searchParams.get("type") || "All";
  const searchQuery = searchParams.get("search") || "";

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleYearChange = (yr) => {
    const next = new URLSearchParams(searchParams);
    if (yr === "All") next.delete("year");
    else next.set("year", yr);
    setSearchParams(next);
  };

  const handleTermChange = (tm) => {
    const next = new URLSearchParams(searchParams);
    if (tm === "All") next.delete("term");
    else next.set("term", tm);
    setSearchParams(next);
  };

  const handleTypeChange = (tp) => {
    const next = new URLSearchParams(searchParams);
    if (tp === "All") next.delete("type");
    else next.set("type", tp);
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (!localSearch.trim()) next.delete("search");
    else next.set("search", localSearch.trim());
    setSearchParams(next);
  };

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      if (selectedYear !== "All" && c.year !== Number(selectedYear)) return false;
      if (selectedTerm !== "All" && c.term !== Number(selectedTerm)) return false;
      if (selectedType !== "All" && c.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const codeMatch = c.code.toLowerCase().includes(q);
        const titleMatch = c.title.toLowerCase().includes(q);
        const prereqMatch = c.prerequisite?.toLowerCase().includes(q);
        return codeMatch || titleMatch || prereqMatch;
      }
      return true;
    });
  }, [courses, selectedYear, selectedTerm, selectedType, searchQuery]);

  // Total credits in view
  const totalCreditsInView = filteredCourses.reduce((sum, c) => sum + (c.credit || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>PUST B.Sc. Engg. Curriculum • Session 2020-2021</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              CSE Course Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore all 78 undergraduate courses across 4 Academic Years and 8 Terms (165 Total Credits).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right shadow-sm">
            <span className="text-xs text-slate-500 block">Total Degree Credits</span>
            <span className="text-xl font-extrabold text-brand-600 dark:text-brand-400">165.00 Cr</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by course code or title (e.g. CSE 3203, Operating Systems, CSE 2101, Algorithms)..."
            className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Year, Term, Type Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Year Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Year:</span>
            {["All", "1", "2", "3", "4"].map((yr) => (
              <button
                key={yr}
                onClick={() => handleYearChange(yr)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  selectedYear === yr 
                    ? "bg-brand-600 text-white shadow-sm" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {yr === "All" ? "All Years" : `Year ${yr}`}
              </button>
            ))}
          </div>

          {/* Term Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Term:</span>
            {["All", "1", "2"].map((tm) => (
              <button
                key={tm}
                onClick={() => handleTermChange(tm)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  selectedTerm === tm 
                    ? "bg-indigo-600 text-white shadow-sm" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tm === "All" ? "All Terms" : `Term ${tm}`}
              </button>
            ))}
          </div>

          {/* Type Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Type:</span>
            {["All", "Theory", "Sessional", "Viva"].map((tp) => (
              <button
                key={tp}
                onClick={() => handleTypeChange(tp)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  selectedType === tp 
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {tp}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <b>{filteredCourses.length}</b> courses ({totalCreditsInView.toFixed(2)} Credits)</span>
        {(selectedYear !== "All" || selectedTerm !== "All" || selectedType !== "All" || searchQuery) && (
          <button 
            onClick={() => setSearchParams({})}
            className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">No Courses Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.code}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-brand-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/50 dark:border-brand-800/50">
                    {c.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {c.credit} Cr
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.type === "Theory" 
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : c.type === "Sessional"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                    }`}>
                      {c.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                  {c.objectives?.[0] || "Foundational principles, system models, and real-world computing practices."}
                </p>

                {/* Prerequisite & Term context */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 font-medium">
                    Year {c.year}, Term {c.term}
                  </span>
                  {c.prerequisite && c.prerequisite !== "None" && (
                    <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium border border-amber-200/40">
                      Prereq: {c.prerequisite}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5 text-brand-500" /> {c.quizCount || 4} Quizzes</span>
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-indigo-500" /> {c.materialCount || 6} Materials</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{c.progress || 0}% Done</span>
                </div>

                <Link
                  to={`/courses/${encodeURIComponent(c.code)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Course</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
