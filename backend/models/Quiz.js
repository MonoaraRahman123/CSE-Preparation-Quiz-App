import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  topic: { type: String, default: "All Topics" },
  difficulty: { type: String, enum: ["All", "Easy", "Medium", "Hard"], default: "Medium" },
  timeLimitMinutes: { type: Number, default: 15 },
  totalMarks: { type: Number, default: 10 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
