import express from "express";
import { curriculumData, allCourses } from "../data/seedData.js";

const router = express.Router();
let coursesDb = [...allCourses];

// Get terms and curriculum structure
router.get("/curriculum-summary", (req, res) => {
  const summary = curriculumData.map(term => ({
    year: term.year,
    term: term.term,
    title: term.title,
    totalCredits: term.totalCredits,
    theoryCredits: term.theoryCredits,
    sessionalCredits: term.sessionalCredits,
    vivaCredits: term.vivaCredits,
    courseCount: term.courses.length
  }));
  const totalDegreeCredits = summary.reduce((acc, curr) => acc + curr.totalCredits, 0);
  res.json({ success: true, totalDegreeCredits, terms: summary });
});

// Get all courses with query filters
router.get("/", (req, res) => {
  const { year, term, type, search } = req.query;
  let filtered = [...coursesDb];

  if (year && year !== "All") {
    filtered = filtered.filter(c => c.year === Number(year));
  }
  if (term && term !== "All") {
    filtered = filtered.filter(c => c.term === Number(term));
  }
  if (type && type !== "All") {
    filtered = filtered.filter(c => c.type.toLowerCase() === type.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.code.toLowerCase().includes(q) || 
      c.title.toLowerCase().includes(q) ||
      (c.prerequisite && c.prerequisite.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: filtered.length, courses: filtered });
});

// Get single course by code
router.get("/:code", (req, res) => {
  const code = req.params.code.toUpperCase().replace("-", " ");
  const course = coursesDb.find(c => c.code.toUpperCase() === code || c.code.replace(/\s+/g, '') === code.replace(/\s+/g, ''));
  if (!course) {
    return res.status(404).json({ success: false, message: `Course ${req.params.code} not found.` });
  }
  res.json({ success: true, course });
});

// Update course topic completion (student learning)
router.post("/:code/topics/:topicId/complete", (req, res) => {
  const code = req.params.code.toUpperCase();
  const { topicId } = req.params;
  const course = coursesDb.find(c => c.code.toUpperCase() === code);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });

  const topic = course.topics.find(t => t.id === topicId);
  if (topic) {
    topic.completion = 100;
    // recalculate course progress
    const total = course.topics.reduce((acc, t) => acc + (t.completion || 0), 0);
    course.progress = Math.round(total / course.topics.length);
  }
  res.json({ success: true, course, message: "Topic completed!" });
});

export default router;
