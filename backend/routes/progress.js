import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { allCourses, demoQuizAttempts } from "../data/seedData.js";

const router = express.Router();

router.get("/summary", authenticateToken, (req, res) => {
  const completedQuizzes = demoQuizAttempts.length + 21;
  const avgScore = 82.5;
  const overallCompletion = 68;
  const completedCourses = allCourses.filter(c => c.progress >= 70).length;
  const totalCourses = allCourses.length;

  const currentYear = 3;
  const currentTerm = 2;
  const currentSemesterCourses = allCourses.filter(c => c.year === currentYear && c.term === currentTerm);

  const recommendedNextTopic = {
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topicName: "CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)",
    reason: "Your score in CPU Scheduling was 40% in your last quiz attempt. Revise this topic and test again.",
    suggestedQuizCount: 5,
    difficulty: "Medium"
  };

  const weeklyActivity = [
    { day: "Sat", score: 85, quizzes: 3 },
    { day: "Sun", score: 78, quizzes: 2 },
    { day: "Mon", score: 92, quizzes: 4 },
    { day: "Tue", score: 88, quizzes: 3 },
    { day: "Wed", score: 80, quizzes: 2 },
    { day: "Thu", score: 95, quizzes: 5 },
    { day: "Fri", score: 82, quizzes: 2 }
  ];

  res.json({
    success: true,
    progress: {
      overallCompletion,
      completedQuizzes,
      avgScore,
      completedCourses,
      totalCourses,
      studyHours: 118,
      streak: 7,
      currentYear,
      currentTerm,
      currentSemesterCourses,
      recommendedNextTopic,
      weeklyActivity
    }
  });
});

export default router;
