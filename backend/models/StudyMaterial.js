import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  year: { type: Number, required: true },
  term: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ["Course Notes", "Lecture Slides", "PDF Books", "Previous Questions", "Lab Materials", "Assignments", "Viva Questions"],
    required: true 
  },
  fileType: { type: String, default: "PDF" },
  fileSize: { type: String, default: "2.4 MB" },
  downloadUrl: { type: String, default: "#" },
  description: { type: String, default: "Comprehensive lecture slides and reference notes." },
  uploadedBy: { type: String, default: "CSE Faculty, PUST" },
  pages: { type: Number, default: 42 }
}, { timestamps: true });

export default mongoose.models.StudyMaterial || mongoose.model("StudyMaterial", studyMaterialSchema);
