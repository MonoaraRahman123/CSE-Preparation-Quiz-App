import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["info", "success", "warning", "quiz", "material"], default: "info" },
  link: { type: String, default: "" },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
