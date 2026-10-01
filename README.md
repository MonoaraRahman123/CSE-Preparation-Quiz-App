# CSE-Preparation-Quiz-App
## 🎓 CSE Prep — AI-Powered Undergraduate Academic Platform

> **Pabna University of Science and Technology (PUST)**
> **Department of Computer Science and Engineering (CSE)**
> **B.Sc. Engineering Curriculum, Session 2020–2021**
> **4 Academic Years • 8 Terms/Semesters • 165 Total Credits • 78 Courses**

---

## 🌟 Overview

**CSE Prep** is a modern, responsive, full-stack, AI-powered web platform designed to prepare Computer Science & Engineering students for every course in their 4-year undergraduate degree.

The platform maps 1:1 to the official **PUST CSE 2020-2021 Syllabus**, covering all 165.00 credits across Years 1 to 4 with:
- **Comprehensive Course Catalog:** 78 courses (Theory, Sessionals, and Viva Voce).
- **Exam-Style Timed Quiz Engine:** MCQs, True/False, Multiple Select, and Short Answer formats with question status palette, timers, score analytics, and step-by-step solutions.
- **Intelligent AI Academic Assistant:** Context-aware AI tutor answering course questions, generating custom quizzes, formulating 7-day study plans, and conducting Viva Voce preparation.
- **Study Materials & Digital PDF Library:** Interactive in-browser PDF reader with zoom, page navigation, bookmarking, and student notes.
- **Progress Tracking & Analytics:** Real-time degree completion %, course-wise mastery bars, study hours streak, and weak topic alerts.
- **Competitive Academic Leaderboard:** Cohort rankings by Term, Year, and Department with gamification points and achievement badges.
- **Administrative Management Suite:** Course syllabus editor, question repository manager with **Bulk JSON/CSV Import**, and student progress overview.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ (tested on Node.js v24 LTS)
- **MongoDB**: (Optional) Connects to `mongodb://127.0.0.1:27017/cseprep` or utilizes embedded in-memory database store out of the box with zero setup.

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
- **Mongoose & MongoDB** schemas with embedded memory fallback
- **Contextual AI Tutor Engine** with custom prompt handlers

### MongoDB Collections
1. `users`
2. `courses`
3. `topics`
4. `questions`
5. `quizzes`
6. `quizattempts`
7. `studymaterials`
8. `aiconversations`
9. `progress`
10. `leaderboard`
11. `achievements`
12. `notifications`
