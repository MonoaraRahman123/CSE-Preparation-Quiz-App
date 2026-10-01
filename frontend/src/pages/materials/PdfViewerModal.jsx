import React, { useState } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Bookmark, 
  Download, 
  FileText, 
  Search,
  Check,
  Edit3
} from "lucide-react";

export default function PdfViewerModal({ isOpen, onClose, documentTitle = "Operating Systems Lecture Slides", courseCode = "CSE 3203" }) {
  if (!isOpen) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 42;
  const [zoom, setZoom] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);
  const [notes, setNotes] = useState("Key Exam Focus: Preemptive CPU scheduling Gantt chart formulas.");
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Top Controls Toolbar */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate max-w-md">
                {documentTitle}
              </h3>
              <span className="text-[10px] font-mono text-slate-400">{courseCode} • PUST Department Document</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
              <button 
                onClick={() => setZoom(prev => Math.max(50, prev - 15))}
                className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">{zoom}%</span>
              <button 
                onClick={() => setZoom(prev => Math.min(175, prev + 15))}
                className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-colors ${
                bookmarked 
                  ? "bg-amber-50 dark:bg-amber-950 text-amber-500 border-amber-300" 
                  : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
              }`}
              title="Bookmark this page"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Notes Toggle */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                showNotes 
                  ? "bg-brand-600 text-white border-brand-600" 
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notes</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main Document Preview Pane */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto p-6 flex flex-col items-center">
            
            <div 
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl shadow-xl p-8 sm:p-12 space-y-6 border border-slate-200 dark:border-slate-800 min-h-[680px] transition-transform duration-150"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-mono text-xs font-bold text-brand-600">{courseCode} Lecture Pack</span>
                <span className="text-xs text-slate-400 font-mono">Page {currentPage} of {totalPages}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Chapter {Math.ceil(currentPage / 6)}: Core Architectural Foundations
                </h2>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  This document provides university reference notes for students enrolled in the <b>Pabna University of Science and Technology (PUST) Department of CSE</b>.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-brand-600">// Module Overview</p>
                  <p>1. Theoretical Formulations & Model Constraints</p>
                  <p>2. Performance Metrics: Turnaround Time (TAT) & Waiting Time (WT)</p>
                  <p>3. Asymptotic Verification & Proofs</p>
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white">Section {currentPage}.1: Process State Transitions</h4>
                  <p>
                    Processes transition through five canonical states: New, Ready, Running, Waiting, and Terminated. The OS dispatcher switches contexts by saving CPU registers to the Process Control Block (PCB).
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Student Notes Drawer */}
          {showNotes && (
            <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Student Personal Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Jot down formulas, exam questions, or questions for your teacher..."
                  className="w-full h-72 p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>
              <p className="text-[10px] text-slate-400">Notes are saved locally for this document.</p>
            </div>
          )}

        </div>

        {/* Bottom Pager */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => alert(`Downloaded: ${documentTitle}.pdf`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-bold hover:bg-brand-600 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Offline PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
