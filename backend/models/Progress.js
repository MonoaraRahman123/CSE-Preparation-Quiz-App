import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  overallCompletion: { type: Number, default: 68 },
  totalQuizzesCompleted: { type: Number, default: 24 },
  averageScore: { type: Number, default: 82.5 },
  coursesCompleted: { type: Number, default: 38 },
  studyHours: { type: Number, default: 114 },
  courseProgress: [{
    courseCode: String,
    courseTitle: String,
    year: Number,
    term: Number,
    completionPercentage: Number,
    quizzesTaken: Number,
    avgScore: Number,
    lastStudied: { type: Date, default: Date.now }
  }],
  weakTopics: [{ type: String }],
  strongTopics: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Progress || mongoose.model("Progress", progressSchema);
