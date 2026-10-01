import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "cseprep_super_secret_jwt_key_2026_pust";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // For demo/prototype convenience, attach demo student if no token
    req.user = {
      _id: "u_student_1",
      fullName: "MD. Tanvir Hasan",
      studentId: "200615",
      email: "tanvir.cse@pust.ac.bd",
      role: "student",
      year: 3,
      term: 2
    };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Fallback demo user
      req.user = {
        _id: "u_student_1",
        fullName: "MD. Tanvir Hasan",
        studentId: "200615",
        email: "tanvir.cse@pust.ac.bd",
        role: "student",
        year: 3,
        term: 2
      };
      return next();
    }
    req.user = user;
    next();
  });
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Admin access required." });
  }
};
