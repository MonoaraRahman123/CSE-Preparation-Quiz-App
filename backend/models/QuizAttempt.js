import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  topic: { type: String, default: "Comprehensive" },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  unanswered: { type: Number, default: 0 },
  percentage: { type: Number, required: true },
  timeTakenSeconds: { type: Number, required: true },
  answers: [{
    questionId: String,
    questionText: String,
    userAnswer: mongoose.Schema.Types.Mixed,
    correctAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    explanation: String
  }],
  strongTopics: [{ type: String }],
  weakTopics: [{ type: String }],
  recommendations: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.QuizAttempt || mongoose.model("QuizAttempt", quizAttemptSchema);
