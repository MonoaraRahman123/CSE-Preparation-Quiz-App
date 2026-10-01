import React, { useState } from "react";
import { 
  HelpCircle, 
  Plus, 
  UploadCloud, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  X, 
  BookOpen,
  FileCode,
  ArrowRight
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function QuestionManagement() {
  const { courses } = useApp();

  const [questions, setQuestions] = useState([
    {
      _id: "q_1",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      topic: "CPU Scheduling Algorithms",
      question: "Which CPU scheduling algorithm minimizes average waiting time?",
      questionType: "MCQ",
      options: ["FCFS", "SJF / SRTF", "Round Robin", "Priority Scheduling"],
      correctAnswer: "SJF / SRTF",
      explanation: "SJF is provably optimal for minimizing average waiting time.",
      difficulty: "Medium",
      marks: 1
    },
    {
      _id: "q_2",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      topic: "Deadlocks",
      question: "Which condition is NOT one of Coffman's four necessary conditions?",
      questionType: "MCQ",
      options: ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"],
      correctAnswer: "Preemption Allowed",
      explanation: "No Preemption is required for deadlock; if preemption is allowed, deadlock is avoided.",
      difficulty: "Easy",
      marks: 1
    },
    {
      _id: "q_3",
      courseCode: "CSE 2101",
      courseTitle: "Data Structures",
      topic: "Binary Search Trees",
      question: "What is worst-case search time in an unbalanced BST?",
      questionType: "MCQ",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: "O(n)",
      explanation: "Degenerate trees act as linear lists with O(n) worst-case search.",
      difficulty: "Medium",
      marks: 1
    },
    {
      _id: "q_4",
      courseCode: "CSE 2101",
      courseTitle: "Data Structures",
      topic: "Graph Representation",
      question: "Breadth-First Search (BFS) finds shortest paths in unweighted graphs.",
      questionType: "True/False",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "BFS explores vertices level by level, guaranteeing shortest path.",
      difficulty: "Easy",
      marks: 1
    }
  ]);

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkInput, setBulkInput] = useState("");
  const [bulkNotice, setBulkNotice] = useState("");

  const [form, setForm] = useState({
    courseCode: "CSE 3203",
    topic: "Process Management",
    question: "",
    questionType: "MCQ",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    explanation: "",
    difficulty: "Medium",
    marks: 1
  });

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQ = {
      _id: `q_${Date.now()}`,
      courseCode: form.courseCode,
      courseTitle: courses.find(c => c.code === form.courseCode)?.title || form.courseCode,
      topic: form.topic,
      question: form.question,
      questionType: form.questionType,
      options: form.questionType === "True/False" ? ["True", "False"] : [form.optionA, form.optionB, form.optionC, form.optionD],
      correctAnswer: form.correctAnswer,
      explanation: form.explanation,
      difficulty: form.difficulty,
      marks: Number(form.marks) || 1
    };

    setQuestions([newQ, ...questions]);
    setShowAddModal(false);
    setForm({
      courseCode: "CSE 3203",
      topic: "Process Management",
      question: "",
      questionType: "MCQ",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      explanation: "",
      difficulty: "Medium",
      marks: 1
    });
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q._id !== id));
  };

  const handleBulkImport = () => {
    try {
      const parsed = JSON.parse(bulkInput);
      if (Array.isArray(parsed)) {
        const mapped = parsed.map((item, i) => ({
          _id: `q_bulk_${Date.now()}_${i}`,
          courseCode: item.courseCode || "CSE 3203",
          courseTitle: item.courseTitle || "Operating Systems",
          topic: item.topic || "General Topic",
          question: item.question || "Untitled Question",
          questionType: item.questionType || "MCQ",
          options: item.options || ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: item.correctAnswer || "Option A",
          explanation: item.explanation || "Textbook explanation.",
          difficulty: item.difficulty || "Medium",
          marks: item.marks || 1
        }));
        setQuestions([...mapped, ...questions]);
        setBulkNotice(`Successfully imported ${mapped.length} questions!`);
        setTimeout(() => {
          setShowBulkModal(false);
          setBulkNotice("");
          setBulkInput("");
        }, 1500);
      }
    } catch (err) {
      setBulkNotice("Invalid JSON format. Please verify syntax.");
    }
  };

  const filtered = questions.filter(q => {
    if (courseFilter !== "All" && q.courseCode !== courseFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Question Bank Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, and bulk-import examination questions calibrated for PUST syllabus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm"
          >
            <UploadCloud className="w-4 h-4 text-indigo-500" />
            <span>Bulk JSON Import</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none w-full sm:w-auto"
        >
          <option value="All">All Courses</option>
          {courses.slice(0, 15).map(c => (
            <option key={c.code} value={c.code}>{c.code}</option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        {filtered.map((q, idx) => (
          <div key={q._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {q.courseCode}
                </span>
                <span className="text-xs font-semibold text-slate-400">• {q.topic}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {q.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{q.question}</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Answer: {q.correctAnswer}
              </p>
              <p className="text-[11px] text-slate-500 line-clamp-1">{q.explanation}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleDelete(q._id)}
                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                title="Delete question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Question */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Exam Question</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Course</label>
                  <select
                    value={form.courseCode}
                    onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {courses.map(c => (
                      <option key={c.code} value={c.code}>{c.code} — {c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                  <input
                    type="text"
                    required
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Question Text</label>
                <textarea
                  required
                  rows={2}
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  placeholder="e.g. Which algorithm minimizes average waiting time?"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Option A</label>
                  <input
                    type="text"
                    value={form.optionA}
                    onChange={(e) => setForm({ ...form, optionA: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Option B</label>
                  <input
                    type="text"
                    value={form.optionB}
                    onChange={(e) => setForm({ ...form, optionB: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Option C</label>
                  <input
                    type="text"
                    value={form.optionC}
                    onChange={(e) => setForm({ ...form, optionC: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Option D</label>
                  <input
                    type="text"
                    value={form.optionD}
                    onChange={(e) => setForm({ ...form, optionD: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Exact Correct Answer</label>
                <input
                  type="text"
                  required
                  value={form.correctAnswer}
                  onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                  placeholder="Should match one of the options verbatim"
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Explanation</label>
                <textarea
                  required
                  rows={2}
                  value={form.explanation}
                  onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                  placeholder="Mathematical and syllabus reasoning..."
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-md"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Bulk JSON Import */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bulk Question Import (JSON)</h3>
              <button onClick={() => setShowBulkModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Paste an array of question JSON objects. You can also import CSV by copying standard JSON output.
            </p>

            {bulkNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-xs font-bold">
                {bulkNotice}
              </div>
            )}

            <textarea
              rows={8}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`[
  {
    "courseCode": "CSE 3203",
    "topic": "Process Synchronization",
    "question": "What primitive ensures mutual exclusion?",
    "options": ["Mutex", "Pipeline", "Bus", "Clock"],
    "correctAnswer": "Mutex",
    "explanation": "Mutex locks provide exclusive mutual lock guarantees."
  }
]`}
              className="w-full p-3 font-mono text-[11px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-md transition-colors"
              >
                Import Questions
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
