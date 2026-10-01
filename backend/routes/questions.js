import express from "express";
import { demoQuestions } from "../data/seedData.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();
let questionsDb = [...demoQuestions];

// List questions
router.get("/", (req, res) => {
  const { courseCode, topic, search, difficulty } = req.query;
  let list = [...questionsDb];
  if (courseCode) list = list.filter(q => q.courseCode.toUpperCase() === courseCode.toUpperCase());
  if (topic && topic !== "All") list = list.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
  if (difficulty && difficulty !== "All") list = list.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(q => q.question.toLowerCase().includes(s) || q.explanation.toLowerCase().includes(s));
  }
  res.json({ success: true, count: list.length, questions: list });
});

// Create question
router.post("/", (req, res) => {
  const { courseCode, courseTitle, topic, question, questionType, options, correctAnswer, explanation, difficulty, marks } = req.body;
  if (!courseCode || !question || !correctAnswer || !explanation) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  const newQ = {
    _id: `q_${Date.now()}`,
    courseCode,
    courseTitle: courseTitle || courseCode,
    topic: topic || "General Concepts",
    question,
    questionType: questionType || "MCQ",
    options: options || ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer,
    explanation,
    difficulty: difficulty || "Medium",
    marks: Number(marks) || 1
  };

  questionsDb.unshift(newQ);
  res.status(201).json({ success: true, question: newQ, message: "Question created successfully!" });
});

// Update question
router.put("/:id", (req, res) => {
  const idx = questionsDb.findIndex(q => q._id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Question not found" });

  questionsDb[idx] = { ...questionsDb[idx], ...req.body };
  res.json({ success: true, question: questionsDb[idx], message: "Question updated successfully!" });
});

// Delete question
router.delete("/:id", (req, res) => {
  const initialLen = questionsDb.length;
  questionsDb = questionsDb.filter(q => q._id !== req.params.id);
  if (questionsDb.length === initialLen) {
    return res.status(404).json({ success: false, message: "Question not found" });
  }
  res.json({ success: true, message: "Question deleted successfully." });
});

// Bulk Import questions (CSV / JSON)
router.post("/bulk-import", (req, res) => {
  const { items, format } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid question import array." });
  }

  let importedCount = 0;
  items.forEach(item => {
    if (item.question && item.correctAnswer) {
      questionsDb.unshift({
        _id: `q_imp_${Date.now()}_${importedCount}`,
        courseCode: item.courseCode || "CSE 3203",
        courseTitle: item.courseTitle || "Operating Systems",
        topic: item.topic || "Core Syllabus Topic",
        question: item.question,
        questionType: item.questionType || "MCQ",
        options: item.options || ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: item.correctAnswer,
        explanation: item.explanation || "Official curriculum solution explanation.",
        difficulty: item.difficulty || "Medium",
        marks: item.marks || 1
      });
      importedCount++;
    }
  });

  res.json({ 
    success: true, 
    importedCount, 
    totalQuestions: questionsDb.length, 
    message: `Successfully imported ${importedCount} academic questions into the question bank.` 
  });
});

export default router;
