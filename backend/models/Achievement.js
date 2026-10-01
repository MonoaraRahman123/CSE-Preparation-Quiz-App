import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "Trophy" },
  points: { type: Number, default: 100 },
  category: { type: String, default: "Quiz" }
});

export default mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);
