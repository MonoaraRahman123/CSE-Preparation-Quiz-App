import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseTitle: { type: String },
  topic: { type: String, required: true },
  question: { type: String, required: true },
  questionType: { type: String, enum: ["MCQ", "True/False", "Multiple Select", "Short Answer"], default: "MCQ" },
  options: [{ type: String }],
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  explanation: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  marks: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
