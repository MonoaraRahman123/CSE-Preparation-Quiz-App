import express from "express";
import { demoStudyMaterials } from "../data/seedData.js";

const router = express.Router();
let materialsDb = [...demoStudyMaterials];

// List materials
router.get("/", (req, res) => {
  const { year, term, courseCode, category, search } = req.query;
  let list = [...materialsDb];

  if (year && year !== "All") list = list.filter(m => m.year === Number(year));
  if (term && term !== "All") list = list.filter(m => m.term === Number(term));
  if (courseCode && courseCode !== "All") list = list.filter(m => m.courseCode.toUpperCase() === courseCode.toUpperCase());
  if (category && category !== "All") list = list.filter(m => m.category === category);
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(m => m.title.toLowerCase().includes(s) || m.description.toLowerCase().includes(s));
  }

  res.json({ success: true, count: list.length, materials: list });
});

// Add study material (Admin)
router.post("/", (req, res) => {
  const { title, courseCode, courseTitle, year, term, category, description, fileSize } = req.body;
  if (!title || !courseCode || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const newMat = {
    _id: `mat_${Date.now()}`,
    title,
    courseCode,
    courseTitle: courseTitle || courseCode,
    year: Number(year) || 3,
    term: Number(term) || 2,
    category,
    fileType: "PDF",
    fileSize: fileSize || "3.5 MB",
    downloadUrl: "#",
    description: description || "Course material resource.",
    uploadedBy: "CSE Faculty, PUST",
    pages: 35
  };

  materialsDb.unshift(newMat);
  res.status(201).json({ success: true, material: newMat, message: "Study material added successfully!" });
});

export default router;
