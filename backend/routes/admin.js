import express from "express";
import { demoUsers, allCourses, demoQuestions, demoStudyMaterials, demoQuizAttempts } from "../data/seedData.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin stats
router.get("/stats", authenticateToken, (req, res) => {
  res.json({
    success: true,
    stats: {
      totalStudents: 312,
      activeStudents: 184,
      totalCourses: allCourses.length,
      totalQuestions: demoQuestions.length,
      totalQuizzes: 45,
      totalMaterials: demoStudyMaterials.length + 86,
      averageSystemScore: 81.4,
      totalDegreeCredits: 165
    }
  });
});

// Students list
router.get("/students", authenticateToken, (req, res) => {
  const students = [
    { id: "200615", name: "MD. Tanvir Hasan", email: "tanvir.cse@pust.ac.bd", year: 3, term: 2, quizzesCompleted: 24, avgScore: 82.5, status: "Active" },
    { id: "200601", name: "Sadia Afrin", email: "sadia.cse@pust.ac.bd", year: 3, term: 2, quizzesCompleted: 42, avgScore: 94.2, status: "Active" },
    { id: "200608", name: "Nahidul Islam", email: "nahidul.cse@pust.ac.bd", year: 3, term: 2, quizzesCompleted: 38, avgScore: 91.5, status: "Active" },
    { id: "200619", name: "Fariha Tasnim", email: "fariha.cse@pust.ac.bd", year: 3, term: 2, quizzesCompleted: 35, avgScore: 88.0, status: "Active" },
    { id: "200627", name: "Rafiul Alam", email: "rafiul.cse@pust.ac.bd", year: 3, term: 2, quizzesCompleted: 31, avgScore: 86.4, status: "Active" }
  ];
  res.json({ success: true, count: students.length, students });
});

export default router;
