import mongoose from "mongoose";

const aiConversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseCode: { type: String, default: "General" },
  courseTitle: { type: String, default: "General CSE" },
  topic: { type: String, default: "General" },
  messages: [{
    sender: { type: String, enum: ["user", "ai"], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    codeSnippet: { type: String },
    helpful: { type: Boolean }
  }]
}, { timestamps: true });

export default mongoose.models.AIConversation || mongoose.model("AIConversation", aiConversationSchema);
