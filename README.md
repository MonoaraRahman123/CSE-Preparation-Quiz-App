# CSE-Preparation-Quiz-App
## 🎓 CSE Prep — AI-Powered Undergraduate Academic Platform

> **Pabna University of Science and Technology (PUST)**  
> **Department of Computer Science and Engineering (CSE)**  
> **B.Sc. Engineering Curriculum, Session 2020–2021**  
> **4 Academic Years • 8 Terms/Semesters • 165 Total Credits • 78 Courses**

---

## 🌟 Overview

**CSE Prep** is a modern, responsive, full-stack, AI-powered web platform designed to prepare Computer Science & Engineering students for every course in their 4-year undergraduate degree.

The platform maps 1:1 to the official **PUST CSE 2020-2021 Syllabus**, covering all 165.00 credits across Years 1 to 4 with automated quizzes, Google Gemini AI tutoring, lecture materials, progress analytics, and academic leaderboards.

---

## ✨ Key Features (প্রধান ফিচারসমূহ)

### 1. 🎓 Official PUST CSE Curriculum Engine (165 Credits)
- **Complete Academic Journey**: All 4 Years and 8 Terms with exactly 165.00 credits.
- **78 Courses Mapped**: Theory courses, Laboratory/Sessional courses, Engineering Projects, and Viva Voce modules.
- **Curriculum Details**: Course Code, Course Title, Credit hours, Prerequisites, Course Objectives, Course Outcomes (CO1, CO2, CO3, etc.), and Chapter-wise Syllabus Topics.

### 2. 🔐 Real Authentication & MongoDB Atlas Storage
- **Student Registration (`/register`)**: Full Name, PUST Student ID, Institutional Email, Password, Department, Academic Year, and Term.
- **Secure Password Protection**: Passwords securely hashed with `bcryptjs` before storing in MongoDB Atlas.
- **Duplicate Prevention**: Real-time validation preventing duplicate emails or student IDs.
- **JWT Authorization**: 14-day persistent sessions verified via `Bearer` tokens on backend API routes.
- **1-Click Instant Demo Login**: Fast-switch shortcuts for **Demo Student** (`200615`) and **Demo Admin** (`FACULTY_001`).
- **Google Login Simulation**: One-click Google sign-in syncing user profile to MongoDB Atlas.

### 3. 🤖 AI Academic Preparation Assistant (Google Gemini)
- **Powered by Google Gemini API**: Integrated with Gemini 3 Flash models (`gemini-3.1-flash-lite`, `gemini-3.5-flash`) with automatic model failover.
- **Syllabus-Aware Tutoring**: System context automatically injects the selected Course Code and Topic to deliver accurate, exam-focused answers.
- **Quick Prompts**:
  - *"Explain Recursion simply with Call Stack"*
  - *"Generate 5 High-Yield Exam MCQs"*
  - *"7-Day Intensive Exam Study Plan"*
  - *"Viva Voce High-Yield Questions"*
  - *"Preemptive vs Non-Preemptive CPU Scheduling"*
- **Zero-Downtime Fallback**: Internal PUST knowledgebase fallback guarantees an answer even during network interruptions.

### 4. 📝 Exam-Style Timed Quiz Engine
- **Customizable Exam Setup**: Filter by Course, Topic, Question Count (5, 10, 15, 20), Difficulty (Easy, Medium, Hard), and Question Type.
- **Multi-Format Question Support**:
  - Multiple Choice Questions (MCQ)
  - True / False Questions
  - Multiple Select (Multiple correct answers)
  - Short Answer / Conceptual Questions
- **Live Exam Experience**: Real-time countdown timer, visual warning at 5 minutes, and interactive Question Palette (Answered, Flagged, Unanswered).
- **Comprehensive Score Analysis**: Instant score calculation, percentage, time spent, Strong & Weak topic breakdown, and question-by-question explanations.

### 5. 📚 Course Catalog & 7-Tab Course Details
- **Course Catalog**: Filter courses by Academic Year (1 to 4), Term (1 or 2), Type (Theory/Lab), with instant keyword search.
- **7 Interactive Tabs per Course**:
  1. **Overview**: Credit hours, Theory/Lab status, Prerequisites.
  2. **Course Outcomes (COs)**: Bloom's taxonomy mapped learning outcomes.
  3. **Syllabus Topics**: Chapter breakdown with interactive completion checkboxes.
  4. **Topic Quizzes**: Start customized quizzes for specific course topics in 1 click.
  5. **Study Materials**: Downloadable slides, textbooks, and past semester papers.
  6. **AI Assistant**: Course-scoped AI tutoring interface.
  7. **Study Plan**: Recommended 7-day preparation schedule for finals.

### 6. 📄 Study Materials & Built-in PDF Reader
- **Digital Library**: Organized repository of lecture slides, question banks with hints, and lab manuals.
- **In-App PDF Viewer**: Built-in modal reader (`PdfViewerModal`) allowing students to preview documents directly inside the web browser without external downloads.

### 7. 📊 Progress Analytics & Quiz History
- **Degree Progress Tracker**: Real-time completion progress towards the 165 total credit degree requirement.
- **Performance Trends**: Weekly score trends visualized with clean SVG bar charts.
- **Weak Topic Detection**: Smart recommendations identifying low-scoring topics with direct links to revise with the AI Tutor.
- **Quiz History Log**: Complete historical record of all completed exams with date, score, and solution review.

### 8. 🏆 Academic Leaderboard & Gamification
- **Competitive Cohort Rankings**: Filter rankings by Global, Academic Year, and Current Semester.
- **XP & Study Streaks**: Earn points by completing quizzes; track consecutive study days with streak counters.
- **Achievement Badges**: *First Quiz*, *10 Quizzes*, *7-Day Streak*, *Quiz Master (90%+)*, and *Perfect Score (100%)*.

### 9. 🛡️ Faculty & Admin Suite
- **Admin Dashboard**: Real-time analytics on enrolled students, active exams, and total question bank statistics.
- **Question Management (`/admin/questions`)**: Full CRUD (Create, Read, Update, Delete) interface for question bank administration.
- **Bulk Question Import**: One-click bulk upload of examination questions via JSON or CSV.

### 10. 🌓 UI/UX, Reliability & Error Prevention
- **Dark Mode & Light Mode**: User preference saved in local storage.
- **Responsive Design**: Optimized for mobile phones, tablets, laptops, and wide screens with Tailwind CSS.
- **React ErrorBoundary**: Global error boundary catches unexpected render errors and provides graceful recovery, eliminating blank white screens.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ (tested on Node.js v24 LTS)
- **MongoDB**: Connects to MongoDB Atlas or local MongoDB `mongodb://127.0.0.1:27017/cseprep`

### 1. Run the Full-Stack Application
```bash
# Starts Node.js Express server and serves built React frontend on port 5000
npm start
```
Visit **[http://localhost:5000](http://localhost:5000)** in your browser.

### 2. Run in Development Mode (with Hot Reload)
In two separate terminals:
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: Vite React Frontend (Port 5173 with auto-proxy to 5000)
npm run client
```

---

## 🔑 Demo Credentials (1-Click Switcher Available in UI)

| Role | Name | Student / Faculty ID | Email | Password |
| :--- | :--- | :--- | :--- | :--- |
| **Student** | MD. Tanvir Hasan | `200615` (PUST 13th) | `tanvir.cse@pust.ac.bd` | `password123` |
| **Admin** | Prof. Dr. Kamrul Hasan | `FACULTY_001` | `admin.cse@pust.ac.bd` | `adminpassword` |

*(You can also click the **"1-Click Instant Demo Login"** buttons on the Login screen, or toggle the role pill in the top navigation bar at any time).*

---

## 📚 PUST Academic Structure (165.0 Credits)

| Academic Term | Theory Cr | Sessional Cr | Viva Cr | Total Term Cr |
| :--- | :--- | :--- | :--- | :--- |
| **Year 1, Term 1** | 15.00 | 3.75 | 0.75 | **19.50 Cr** |
| **Year 1, Term 2** | 14.00 | 4.75 | 0.75 | **19.50 Cr** |
| **Year 2, Term 1** | 15.00 | 4.50 | 0.75 | **20.25 Cr** |
| **Year 2, Term 2** | 14.00 | 4.50 | 0.75 | **19.25 Cr** |
| **Year 3, Term 1** | 15.00 | 5.25 | 0.75 | **21.00 Cr** |
| **Year 3, Term 2** | 15.00 | 6.25 | 0.75 | **22.00 Cr** |
| **Year 4, Term 1** | 15.00 | 5.25 | 0.75 | **21.00 Cr** |
| **Year 4, Term 2** | 15.00 | 6.75 | 0.75 | **22.50 Cr** |
| **Degree Total** | **118.00** | **41.00** | **6.00** | **165.00 Cr** |

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **React.js 18** with component-based modular structure
- **Tailwind CSS 3** with light and high-contrast dark academic themes
- **Lucide React** icons suite
- **React Router DOM v6**
- **Canvas-Confetti** for quiz milestone celebrations

### Backend
- **Node.js & Express.js** REST API
- **JSON Web Tokens (JWT)** authentication flow
- **Mongoose & MongoDB** schemas with Atlas cloud connection
- **Contextual AI Tutor Engine** powered by Google Gemini API

### MongoDB Collections
1. `users` — Student & Faculty profiles, hashed passwords, gamification XP & streaks
2. `courses` — 78 courses with COs, objectives, syllabus, credits, and prerequisites
3. `topics` — Chapter-wise breakdown with completion progress
4. `questions` — Multi-format exam repository (MCQ, True/False, Multiple Select)
5. `quizzes` — Active quiz sessions and configurations
6. `quizattempts` — Historical exam attempts, scores, and performance analysis
7. `studymaterials` — Lecture slides, lab sheets, and question papers
8. `aiconversations` — Student-AI interactive tutoring sessions
9. `progress` — Degree milestones, study hours, and weak topic alerts
10. `leaderboard` — Batch, semester, and departmental rankings
11. `achievements` — Badges, trophies, and milestone rewards
12. `notifications` — Academic updates, new quizzes, and reminders

---

## 📄 License
This project is developed for academic purposes under the **PUST CSE Department**.