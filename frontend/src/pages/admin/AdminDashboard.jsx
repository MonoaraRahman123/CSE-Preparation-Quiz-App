import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  TrendingUp, 
  Plus, 
  UploadCloud, 
  Search, 
  Edit, 
  Trash2,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { courses } = useApp();
  const navigate = useNavigate();

  const stats = [
    { title: "Total Students", value: "312", change: "+18 this month", icon: Users, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/50" },
    { title: "Active Today", value: "184", change: "59% engagement", icon: Sparkles, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50" },
    { title: "Degree Courses", value: courses.length.toString(), change: "165 Total Credits", icon: BookOpen, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50" },
    { title: "Total Questions", value: "520", change: "+45 this week", icon: HelpCircle, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50" },
    { title: "Study Materials", value: "92", change: "PDFs & Notes", icon: FileText, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/50" },
    { title: "Avg Exam Score", value: "81.4%", change: "+2.1% overall", icon: TrendingUp, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/50" }
  ];

  const students = [
    { id: "200615", name: "MD. Tanvir Hasan", email: "tanvir.cse@pust.ac.bd", year: 3, term: 2, quizzes: 24, avg: 82.5, status: "Active" },
    { id: "200601", name: "Sadia Afrin", email: "sadia.cse@pust.ac.bd", year: 3, term: 2, quizzes: 42, avg: 94.2, status: "Active" },
    { id: "200608", name: "Nahidul Islam", email: "nahidul.cse@pust.ac.bd", year: 3, term: 2, quizzes: 38, avg: 91.5, status: "Active" },
    { id: "200619", name: "Fariha Tasnim", email: "fariha.cse@pust.ac.bd", year: 3, term: 2, quizzes: 35, avg: 88.0, status: "Active" }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Faculty & Administrator Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Admin Dashboard & Academic Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage PUST CSE curriculum, question repository, student analytics, and course files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/questions"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Import Questions</span>
          </Link>
        </div>
      </div>

      {/* 6 Metric Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{s.title}</span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{s.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Quick Action Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Question Management</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create MCQs, True/False, and Multi-select questions. Support for JSON/CSV bulk import.
            </p>
          </div>
          <Link
            to="/admin/questions"
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-600 hover:underline flex items-center justify-between"
          >
            <span>Manage Question Bank</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Course Syllabus Management</h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure course credits, prerequisites, contact hours, and outcomes across all 8 terms.
            </p>
          </div>
          <Link
            to="/courses"
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-indigo-600 hover:underline flex items-center justify-between"
          >
            <span>Inspect 78 Degree Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Study Materials Upload</h3>
            <p className="text-xs text-slate-500 mt-1">
              Upload PDF lecture notes, previous question papers, and sessional code packs.
            </p>
          </div>
          <Link
            to="/materials"
            className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 hover:underline flex items-center justify-between"
          >
            <span>Open Repository</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Student Enrollment Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Student Activity & Progress</h3>
            <p className="text-xs text-slate-500">Students enrolled in PUST CSE session 2020-2021</p>
          </div>
          <span className="text-xs font-bold text-brand-600">312 Total Students</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold">
              <tr>
                <th className="p-3 rounded-l-xl">Student Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Academic Term</th>
                <th className="p-3">Quizzes</th>
                <th className="p-3">Avg Score</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="p-3 font-mono text-slate-500">{s.id}</td>
                  <td className="p-3">Year {s.year}, Term {s.term}</td>
                  <td className="p-3 font-semibold">{s.quizzes} tests</td>
                  <td className="p-3 font-bold text-emerald-500">{s.avg}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
