import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, default: "Computer Science and Engineering" },
  year: { type: Number, default: 3 },
  term: { type: Number, default: 2 },
  role: { type: String, enum: ["student", "admin", "teacher"], default: "student" },
  avatar: { type: String, default: "" },
  points: { type: Number, default: 1245 },
  streak: { type: Number, default: 7 },
  lastActive: { type: Date, default: Date.now },
  preferences: {
    darkMode: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    favoriteCourses: [{ type: String }]
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
