import express from "express";
import { demoQuestions, demoQuizAttempts } from "../data/seedData.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
let questionsDb = [...demoQuestions];
let attemptsDb = [...demoQuizAttempts];

// Helper: Generate dynamic questions if needed
const generateDynamicQuestionsForCourse = (courseCode, courseTitle, count, difficulty, topic) => {
  const generated = [];
  const sampleTopics = [
    "Core Foundations & Mathematical Modeling",
    "Architecture, Data Structures & Logic",
    "Algorithms & Performance Analysis",
    "System Integration & Real-time Processing",
    "Problem Solving & Semester Examination Essentials"
  ];
  
  for (let i = 1; i <= count; i++) {
    const chosenTopic = topic && topic !== "All Topics" ? topic : sampleTopics[(i - 1) % sampleTopics.length];
    generated.push({
      _id: `q_dyn_${courseCode.replace(/\s+/g, '')}_${i}_${Date.now()}`,
      courseCode,
      courseTitle,
      topic: chosenTopic,
      question: `[${courseCode}] Question ${i}: Which of the following statements accurately characterizes the principles of ${chosenTopic}?`,
      questionType: i % 4 === 0 ? "True/False" : (i % 3 === 0 ? "Multiple Select" : "MCQ"),
      options: i % 4 === 0 ? ["True", "False"] : [
        `Optimal algorithmic complexity O(n log n) is achieved under typical constraints in ${chosenTopic}.`,
        `Direct memory management ensures strict determinism without OS intervention.`,
        `Heuristic pruning guarantees polynomial-time resolution for NP-hard reductions.`,
        `Formal verification proves correctness across all finite state boundaries.`
      ],
      correctAnswer: i % 4 === 0 ? "True" : `Optimal algorithmic complexity O(n log n) is achieved under typical constraints in ${chosenTopic}.`,
      explanation: `According to the official ${courseCode} syllabus at PUST, ${chosenTopic} emphasizes rigorous asymptotic analysis and modular system separation. Option A provides the mathematically established bound.`,
      difficulty: difficulty === "All" ? (i % 2 === 0 ? "Medium" : "Hard") : difficulty,
      marks: 1
    });
  }
  return generated;
};

// Generate quiz setup
router.post("/generate", (req, res) => {
  const { courseCode, courseTitle, topic, questionCount = 10, difficulty = "Medium", questionType = "All" } = req.body;
  
  // Look for existing questions
  let matched = questionsDb.filter(q => {
    let ok = true;
    if (courseCode && q.courseCode.toUpperCase() !== courseCode.toUpperCase()) ok = false;
    if (topic && topic !== "All Topics" && q.topic !== topic) ok = false;
    if (difficulty && difficulty !== "All" && q.difficulty !== difficulty) ok = false;
    if (questionType && questionType !== "All" && q.questionType !== questionType) ok = false;
    return ok;
  });

  const count = Number(questionCount) || 10;
  let finalQuestions = [];

  if (matched.length >= count) {
    finalQuestions = matched.slice(0, count);
  } else {
    // Fill remaining with course-specific questions
    finalQuestions = [...matched];
    const needed = count - matched.length;
    const additional = generateDynamicQuestionsForCourse(courseCode || "CSE 3203", courseTitle || "Operating Systems", needed, difficulty, topic);
    finalQuestions = [...finalQuestions, ...additional];
  }

  const quizSession = {
    quizId: `quiz_${Date.now()}`,
    courseCode: courseCode || "CSE 3203",
    courseTitle: courseTitle || "Operating Systems",
    topic: topic || "All Topics",
    difficulty: difficulty || "Medium",
    timeLimitMinutes: Math.max(5, Math.round(count * 1.5)),
    totalQuestions: finalQuestions.length,
    questions: finalQuestions.map(q => ({
      _id: q._id,
      courseCode: q.courseCode,
      topic: q.topic,
      question: q.question,
      questionType: q.questionType,
      options: q.options,
      difficulty: q.difficulty,
      marks: q.marks
    }))
  };

  res.json({ success: true, quiz: quizSession });
});

// Submit Quiz and Grade
router.post("/submit", authenticateToken, (req, res) => {
  const { quizId, courseCode, courseTitle, topic, timeTakenSeconds, answers, questions } = req.body;
  
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  const gradedAnswers = [];
  const topicStats = {};

  (questions || []).forEach(q => {
    const userAns = answers ? answers[q._id] : undefined;
    // Find reference question from DB or questions array
    const original = questionsDb.find(dbq => dbq._id === q._id) || q;
    const correctAns = original.correctAnswer;
    const explanation = original.explanation || `Correct concept for ${original.topic}: The verified textbook answer is ${JSON.stringify(correctAns)}.`;
    
    let isCorrect = false;
    if (userAns === undefined || userAns === null || userAns === "") {
      unansweredCount++;
    } else {
      if (Array.isArray(correctAns) && Array.isArray(userAns)) {
        isCorrect = correctAns.length === userAns.length && correctAns.every(v => userAns.includes(v));
      } else {
        isCorrect = String(userAns).trim().toLowerCase() === String(correctAns).trim().toLowerCase();
      }
      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

    // Accumulate topic stats
    const qTopic = original.topic || "General";
    if (!topicStats[qTopic]) topicStats[qTopic] = { correct: 0, total: 0 };
    topicStats[qTopic].total++;
    if (isCorrect) topicStats[qTopic].correct++;

    gradedAnswers.push({
      questionId: q._id,
      questionText: q.question,
      questionType: q.questionType,
      options: q.options,
      userAnswer: userAns ?? "Unanswered",
      correctAnswer: correctAns,
      isCorrect,
      explanation
    });
  });

  const total = questions.length || 1;
  const percentage = Math.round((correctCount / total) * 100);

  // Classify strong and weak topics
  const strongTopics = [];
  const weakTopics = [];
  Object.keys(topicStats).forEach(t => {
    const ratio = topicStats[t].correct / topicStats[t].total;
    if (ratio >= 0.7) {
      strongTopics.push(t);
    } else {
      weakTopics.push(t);
    }
  });

  const recommendations = [];
  if (weakTopics.length > 0) {
    weakTopics.forEach(wt => {
      recommendations.push(`Revise '${wt}' in lecture notes & use AI Assistant for step-by-step clarification.`);
    });
  } else {
    recommendations.push("Exceptional accuracy! Proceed to comprehensive previous year questions.");
  }

  const attempt = {
    _id: `att_${Date.now()}`,
    userId: req.user._id,
    quizId: quizId || `quiz_${Date.now()}`,
    courseCode: courseCode || "CSE",
    courseTitle: courseTitle || "Computer Science Course",
    topic: topic || "Comprehensive",
    score: correctCount,
    totalQuestions: total,
    correctAnswers: correctCount,
    wrongAnswers: wrongCount,
    unanswered: unansweredCount,
    percentage,
    timeTakenSeconds: timeTakenSeconds || 320,
    answers: gradedAnswers,
    strongTopics,
    weakTopics,
    recommendations,
    createdAt: new Date()
  };

  attemptsDb.unshift(attempt);

  res.json({
    success: true,
    result: attempt,
    message: "Quiz evaluated successfully!"
  });
});

// Quiz history
router.get("/history", authenticateToken, (req, res) => {
  res.json({ success: true, count: attemptsDb.length, history: attemptsDb });
});

// Single attempt detail
router.get("/attempt/:id", (req, res) => {
  const attempt = attemptsDb.find(a => a._id === req.params.id);
  if (!attempt) return res.status(404).json({ success: false, message: "Attempt not found" });
  res.json({ success: true, attempt });
});

export default router;
