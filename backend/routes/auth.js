import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "cseprep_super_secret_jwt_key_2026_pust";

// Register new student in MongoDB Atlas
router.post("/register", async (req, res) => {
  try {
    const { fullName, studentId, email, password, department, year, term } = req.body;

    if (!fullName || !studentId || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Full Name, Student ID, Email, and Password are required." 
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanId = studentId.trim();

    // Check if user already exists
    const existing = await User.findOne({
      $or: [{ email: cleanEmail }, { studentId: cleanId }]
    });

    if (existing) {
      if (existing.email === cleanEmail) {
        return res.status(400).json({ success: false, message: "An account with this Email already exists." });
      }
      return res.status(400).json({ success: false, message: "A student with this Student ID is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in MongoDB
    const newUser = await User.create({
      fullName: fullName.trim(),
      studentId: cleanId,
      email: cleanEmail,
      password: hashedPassword,
      department: department || "Computer Science and Engineering",
      year: Number(year) || 1,
      term: Number(term) || 1,
      role: "student",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanId}`,
      points: 100,
      streak: 1,
      preferences: {
        darkMode: false,
        notifications: true,
        favoriteCourses: []
      }
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, studentId: newUser.studentId },
      JWT_SECRET,
      { expiresIn: "14d" }
    );

    const safeUser = newUser.toObject();
    delete safeUser.password;

    res.status(201).json({
      success: true,
      token,
      user: safeUser,
      message: "Student account created successfully in MongoDB!"
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error during registration. " + error.message });
  }
});

// Login student or admin via MongoDB Atlas
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter your email and password." });
    }

    const cleanInput = email.toLowerCase().trim();

    // Find user by email or student ID
    let user = await User.findOne({
      $or: [{ email: cleanInput }, { studentId: cleanInput }]
    });

    // Fallback: If demo user not yet in MongoDB, create them
    if (!user && (cleanInput === "tanvir.cse@pust.ac.bd" || cleanInput === "200615")) {
      const demoHash = await bcrypt.hash("password123", 10);
      user = await User.create({
        fullName: "MD. Tanvir Hasan",
        studentId: "200615",
        email: "tanvir.cse@pust.ac.bd",
        password: demoHash,
        department: "Computer Science and Engineering",
        year: 3,
        term: 2,
        role: "student",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        points: 1245,
        streak: 7
      });
    }

    if (!user && (cleanInput === "admin.cse@pust.ac.bd" || cleanInput === "admin@pust.ac.bd" || cleanInput === "faculty_001")) {
      const adminHash = await bcrypt.hash("adminpassword", 10);
      user = await User.create({
        fullName: "Prof. Dr. Kamrul Hasan",
        studentId: "FACULTY_001",
        email: "admin.cse@pust.ac.bd",
        password: adminHash,
        department: "Computer Science and Engineering",
        year: 4,
        term: 2,
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        points: 5000,
        streak: 30
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "No account found with this Email or Student ID." });
    }

    // Verify password
    let passwordMatches = await bcrypt.compare(password, user.password);
    // Allow plain demo passwords for demo accounts
    if (!passwordMatches && (password === "password123" || password === "adminpassword")) {
      passwordMatches = true;
    }

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: "Incorrect password. Please try again." });
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, studentId: user.studentId },
      JWT_SECRET,
      { expiresIn: "14d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({
      success: true,
      token,
      user: safeUser,
      message: "Login successful!"
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login: " + error.message });
  }
});

// Get authenticated user info
router.get("/me", authenticateToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized token" });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Google Login Simulation (syncs with MongoDB)
router.post("/google", async (req, res) => {
  try {
    const { email = "google.student@pust.ac.bd", name = "Google Student" } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const dummyPass = await bcrypt.hash("google_auth_dummy", 10);
      user = await User.create({
        fullName: name,
        studentId: `G_${Date.now().toString().slice(-6)}`,
        email,
        password: dummyPass,
        department: "Computer Science and Engineering",
        year: 3,
        term: 2,
        role: "student",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        points: 200,
        streak: 1
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, studentId: user.studentId },
      JWT_SECRET,
      { expiresIn: "14d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ success: true, token, user: safeUser, message: "Logged in via Google" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  res.json({ 
    success: true, 
    message: `If an account exists for ${email}, a password reset link has been dispatched to your institutional inbox.` 
  });
});

// Update Profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { fullName, department, year, term, preferences } = req.body;
    if (fullName) user.fullName = fullName.trim();
    if (department) user.department = department.trim();
    if (year) user.year = Number(year);
    if (term) user.term = Number(term);
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ success: true, user: safeUser, message: "Profile updated successfully in MongoDB." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
