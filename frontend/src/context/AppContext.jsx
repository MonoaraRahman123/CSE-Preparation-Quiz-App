import React, { createContext, useContext, useState, useEffect } from "react";
import curriculumData from "../data/curriculum.json";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("cseprep_theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("cseprep_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("cseprep_theme", "light");
    }
  }, [darkMode]);

  // Flat courses list
  const initialCourses = [];
  curriculumData.forEach(term => {
    term.courses.forEach(c => {
      initialCourses.push({
        ...c,
        year: term.year,
        term: term.term,
        termTitle: term.title
      });
    });
  });

  const [courses, setCourses] = useState(initialCourses);

  // User state (Default Student: MD. Tanvir Hasan - PUST ID: 200615)
  const defaultStudent = {
    _id: "u_student_1",
    fullName: "MD. Tanvir Hasan",
    studentId: "200615",
    email: "tanvir.cse@pust.ac.bd",
    department: "Computer Science and Engineering",
    year: 3,
    term: 2,
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 1245,
    streak: 7,
    preferences: {
      darkMode: false,
      notifications: true,
      favoriteCourses: ["CSE 3203", "CSE 3205", "CSE 2101"]
    }
  };

  const defaultAdmin = {
    _id: "u_admin_1",
    fullName: "Prof. Dr. Kamrul Hasan",
    studentId: "FACULTY_001",
    email: "admin.cse@pust.ac.bd",
    department: "Computer Science and Engineering",
    year: 4,
    term: 2,
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    points: 5000,
    streak: 30,
    preferences: {
      darkMode: false,
      notifications: true,
      favoriteCourses: []
    }
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cseprep_user");
    return saved ? JSON.parse(saved) : defaultStudent;
  });

  const [token, setToken] = useState(() => localStorage.getItem("cseprep_token") || "demo_token");

  // Validate session with backend MongoDB on app startup
  useEffect(() => {
    const savedToken = localStorage.getItem("cseprep_token");
    if (savedToken && savedToken !== "demo_token" && savedToken !== "student_jwt_token" && savedToken !== "admin_jwt_token") {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            setUser(data.user);
            localStorage.setItem("cseprep_user", JSON.stringify(data.user));
          }
        })
        .catch(err => console.warn("Backend session check notice:", err.message));
    }
  }, []);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      _id: "notif_1",
      title: "New Quiz Available",
      message: "Practice quiz for 'Process Synchronization & Semaphores' (CSE 3203) is now active.",
      type: "quiz",
      link: "/quiz",
      read: false,
      time: "45m ago"
    },
    {
      _id: "notif_2",
      title: "Performance Milestone! 🎯",
      message: "You completed 5 quizzes this week! Your average score improved by 12%.",
      type: "success",
      link: "/progress",
      read: false,
      time: "3h ago"
    },
    {
      _id: "notif_3",
      title: "Study Material Uploaded",
      message: "Prof. Kamrul Hasan uploaded 'Previous 5 Years Question Bank with Hints' for Operating Systems.",
      type: "material",
      link: "/materials",
      read: true,
      time: "1d ago"
    },
    {
      _id: "notif_4",
      title: "Recommended Revision",
      message: "Your score in 'Process Scheduling Algorithms' is below your 82% average. Revise with AI Assistant.",
      type: "warning",
      link: "/ai",
      read: true,
      time: "2d ago"
    }
  ]);

  // Quiz History
  const [quizHistory, setQuizHistory] = useState([
    {
      _id: "att_1",
      courseCode: "CSE 3203",
      courseTitle: "Operating Systems",
      topic: "CPU Scheduling & Synchronization",
      score: 8,
      totalQuestions: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      percentage: 80,
      timeTakenSeconds: 520,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      strongTopics: ["OS Structures & Kernel", "Deadlocks & Banker's Algorithm"],
      weakTopics: ["CPU Scheduling Algorithms", "Process Synchronization"]
    },
    {
      _id: "att_2",
      courseCode: "CSE 2101",
      courseTitle: "Data Structures",
      topic: "Trees & Balanced BSTs",
      score: 9,
      totalQuestions: 10,
      correctAnswers: 9,
      wrongAnswers: 1,
      percentage: 90,
      timeTakenSeconds: 460,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      strongTopics: ["Binary Tree Traversals", "Stack and Queue applications"],
      weakTopics: ["AVL Double Rotations"]
    },
    {
      _id: "att_3",
      courseCode: "CSE 1103",
      courseTitle: "Structured Programming Language",
      topic: "Pointers & Dynamic Memory",
      score: 10,
      totalQuestions: 10,
      correctAnswers: 10,
      wrongAnswers: 0,
      percentage: 100,
      timeTakenSeconds: 380,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      strongTopics: ["Pointers", "Arrays & Strings", "Recursion"],
      weakTopics: []
    }
  ]);

  // Active Quiz Setup / State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [lastQuizResult, setLastQuizResult] = useState(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Login handler
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken || "demo_token");
    localStorage.setItem("cseprep_user", JSON.stringify(userData));
    localStorage.setItem("cseprep_token", userToken || "demo_token");
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cseprep_user");
    localStorage.removeItem("cseprep_token");
  };

  // Switch role between Student and Admin for seamless prototype testing
  const switchRole = (role) => {
    if (role === "admin") {
      login(defaultAdmin, "admin_token");
    } else {
      login(defaultStudent, "student_token");
    }
  };

  // Record completed quiz
  const recordQuizAttempt = (attempt) => {
    setQuizHistory(prev => [attempt, ...prev]);
    setLastQuizResult(attempt);
    // Add points & update streak
    if (user) {
      const updatedUser = {
        ...user,
        points: (user.points || 0) + (attempt.percentage >= 80 ? 100 : 50)
      };
      setUser(updatedUser);
      localStorage.setItem("cseprep_user", JSON.stringify(updatedUser));
    }
  };

  // Mark notification read
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mark course topic completed
  const markTopicComplete = (courseCode, topicId) => {
    setCourses(prev => prev.map(c => {
      if (c.code.toUpperCase() === courseCode.toUpperCase()) {
        const updatedTopics = c.topics.map(t => t.id === topicId ? { ...t, completion: 100 } : t);
        const total = updatedTopics.reduce((acc, t) => acc + (t.completion || 0), 0);
        const newProgress = Math.round(total / updatedTopics.length);
        return { ...c, topics: updatedTopics, progress: newProgress };
      }
      return c;
    }));
  };

  return (
    <AppContext.Provider value={{
      curriculum: curriculumData,
      courses,
      user,
      token,
      darkMode,
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      quizHistory,
      activeQuiz,
      lastQuizResult,
      setActiveQuiz,
      setLastQuizResult,
      toggleDarkMode,
      login,
      logout,
      switchRole,
      recordQuizAttempt,
      markNotificationRead,
      markAllNotificationsRead,
      markTopicComplete,
      defaultStudent,
      defaultAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
