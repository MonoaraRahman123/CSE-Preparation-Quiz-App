import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  term: { type: Number, required: true },
  credit: { type: Number, required: true },
  contactHours: { type: String, default: "3L+0P" },
  type: { type: String, enum: ["Theory", "Sessional", "Viva"], default: "Theory" },
  prerequisite: { type: String, default: "None" },
  objectives: [{ type: String }],
  outcomes: [{ type: String }],
  books: [{ type: String }],
  isOptional: { type: Boolean, default: false },
  topics: [{
    id: String,
    name: String,
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
    completion: { type: Number, default: 0 },
    quizAvailable: { type: Boolean, default: true },
    hours: Number
  }],
  materialCount: { type: Number, default: 6 },
  quizCount: { type: Number, default: 4 },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
