import express from "express";
import { demoLeaderboard } from "../data/seedData.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { scope = "Global" } = req.query;
  let list = [...demoLeaderboard];
  
  if (scope === "Year") {
    list = list.filter(l => l.year === 3);
  } else if (scope === "Term") {
    list = list.filter(l => l.year === 3 && l.term === 2);
  }

  res.json({
    success: true,
    scope,
    leaderboard: list,
    currentUserRank: {
      rank: 5,
      studentName: "MD. Tanvir Hasan (You)",
      studentId: "200615",
      points: 1245,
      quizzesCompleted: 24,
      averageScore: 82.5,
      badges: ["Consistent Learner", "7-Day Streak"]
    }
  });
});

export default router;
