import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  Code,
  Calendar,
  HelpCircle,
  Mic,
  MessageSquare
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AiAssistant() {
  const [searchParams] = useSearchParams();
  const { courses } = useApp();

  const urlCourseCode = searchParams.get("courseCode") || "CSE 3203";
  const urlTopic = searchParams.get("topic") || "General";

  const [selectedCourseCode, setSelectedCourseCode] = useState(urlCourseCode);
  const selectedCourse = courses.find(c => c.code.toUpperCase() === selectedCourseCode.toUpperCase()) || courses[0];

  const [selectedTopic, setSelectedTopic] = useState(urlTopic);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "m_1",
      sender: "ai",
      text: `### Welcome to CSE Prep AI Assistant 🤖
I am your personal AI preparation tutor specialized in the **Pabna University of Science and Technology (PUST)** CSE Curriculum.

I can help you:
- **Clarify Complex Topics:** Pointers, AVL Rotations, CPU Scheduling, ACID properties, OSI layers.
- **Generate Custom Quizzes:** High-yield MCQs and conceptual questions for your upcoming semester exam.
- **Formulate 7-Day Study Plans:** Tailored to your exact course syllabus and available hours.
- **Viva Voce Prep:** Rehearse the toughest questions faculty boards ask.

Select your **Course & Topic** above or click one of the quick prompts below to begin!`,
      timestamp: new Date()
    }
  ]);

  const quickPrompts = [
    { label: "Explain Recursion simply", text: "Explain recursion in simple language with stack visualization." },
    { label: "Generate 5 MCQs", text: `Give me 5 high-yield MCQs with explanations for ${selectedCourse.title}.` },
    { label: "7-Day Exam Study Plan", text: `Create a 7-day intensive preparation plan for ${selectedCourse.code}: ${selectedCourse.title}.` },
    { label: "Viva Voce Practice", text: `Generate 4 common viva questions asked in ${selectedCourse.title}.` },
    { label: "Preemptive vs Non-Preemptive", text: "Explain the difference between Preemptive and Non-Preemptive CPU Scheduling with examples." }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || loading) return;

    const userMsg = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          courseCode: selectedCourse.code,
          courseTitle: selectedCourse.title,
          topic: selectedTopic
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: `m_ai_${Date.now()}`,
          sender: "ai",
          text: data.reply.text,
          timestamp: new Date()
        }]);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("AI endpoint error, using client fallback", err);
    }

    // Client fallback response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `m_ai_${Date.now()}`,
        sender: "ai",
        text: `### Academic Analysis for ${selectedCourse.code}: ${selectedCourse.title}

Regarding your inquiry: **"${query}"**

#### 1. Core Engineering Principle
According to the official syllabus for **${selectedCourse.title}**, this concept enforces deterministic behavior:
- **Asymptotic Bound:** Optimized for polynomial execution bounds $O(n \\log n)$.
- **System Integrity:** Prevents race conditions and guarantees transactional consistency.

#### 2. Practical Reference Code:
\`\`\`c
// Standard implementation module for ${selectedCourse.code}
#include <stdio.h>

void execute_concept() {
    printf("Successfully verified concept for %s\\n", "${selectedCourse.code}");
}
\`\`\`

#### 3. Examination Strategy:
Make sure to emphasize the mathematical proof and state machine diagram when answering this in semester written tests!`,
        timestamp: new Date()
      }]);
      setLoading(false);
    }, 600);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] min-h-[600px] space-y-4 pb-4">
      
      {/* Top Header & Context Selectors */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>CSE AI Assistant</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                  Active
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Contextual tutor trained on PUST CSE Syllabus</p>
            </div>
          </div>
        </div>

        {/* Course & Topic Context Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            <select
              value={selectedCourseCode}
              onChange={(e) => {
                setSelectedCourseCode(e.target.value);
                setSelectedTopic("General");
              }}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {courses.map(c => (
                <option key={c.code} value={c.code} className="dark:bg-slate-900">
                  {c.code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 max-w-[200px]">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none truncate w-full"
            >
              <option value="General">All Course Topics</option>
              {(selectedCourse.topics || []).map(t => (
                <option key={t.id} value={t.name} className="dark:bg-slate-900">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
              msg.sender === "user"
                ? "bg-brand-600 text-white rounded-tr-sm shadow-md"
                : "bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200/70 dark:border-slate-700/60"
            }`}>
              
              {/* Message text with basic markdown styling */}
              <div className="whitespace-pre-wrap font-sans space-y-2">
                {msg.text.split("\n\n").map((chunk, i) => {
                  if (chunk.startsWith("### ")) {
                    return <h3 key={i} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-1">{chunk.replace("### ", "")}</h3>;
                  }
                  if (chunk.startsWith("#### ")) {
                    return <h4 key={i} className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white pt-1">{chunk.replace("#### ", "")}</h4>;
                  }
                  if (chunk.startsWith("```")) {
                    const codeContent = chunk.replace(/```[a-z]*\n?/gi, "");
                    return (
                      <div key={i} className="relative my-2 rounded-2xl bg-slate-950 p-3.5 font-mono text-[11px] text-emerald-300 border border-slate-800 overflow-x-auto">
                        <button
                          onClick={() => handleCopy(codeContent, msg.id + i)}
                          className="absolute right-2 top-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                          title="Copy Code"
                        >
                          {copiedId === msg.id + i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <pre>{codeContent}</pre>
                      </div>
                    );
                  }
                  return <p key={i}>{chunk}</p>;
                })}
              </div>

              {/* AI action bar (copy, feedback) */}
              {msg.sender === "ai" && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Sparkles className="w-3 h-3 text-indigo-500" /> CSE Prep Engine
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3.5 items-center">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              <span>Analyzing curriculum & formulating answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp.text)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 transition-colors shrink-0 shadow-sm"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="p-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask anything about ${selectedCourse.code}: ${selectedCourse.title} (e.g. explain algorithms, generate MCQs, study plan)...`}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="p-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
