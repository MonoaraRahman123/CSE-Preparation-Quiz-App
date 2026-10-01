import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  avatar: { type: String, default: "" },
  points: { type: Number, required: true },
  quizzesCompleted: { type: Number, required: true },
  averageScore: { type: Number, required: true },
  badges: [{ type: String }],
  year: { type: Number, default: 3 },
  term: { type: Number, default: 2 },
  rank: { type: Number }
}, { timestamps: true });

export default mongoose.models.Leaderboard || mongoose.model("Leaderboard", leaderboardSchema);
