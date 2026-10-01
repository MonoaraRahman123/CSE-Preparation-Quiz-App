import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Register() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "Computer Science and Engineering",
    year: "3",
    term: "2"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please verify your password confirmation.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          studentId: form.studentId.trim(),
          email: form.email.trim(),
          password: form.password,
          department: form.department,
          year: form.year,
          term: form.term
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to register. Please check your information.");
      }

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      console.warn("Register backend notice:", err.message);
      // If server error or offline fallback, allow fallback demo registration
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        const newUser = {
          _id: `u_${Date.now()}`,
          fullName: form.fullName,
          studentId: form.studentId,
          email: form.email,
          department: form.department,
          year: Number(form.year),
          term: Number(form.term),
          role: "student",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.studentId}`,
          points: 100,
          streak: 1,
          preferences: {
            darkMode: false,
            notifications: true,
            favoriteCourses: []
          }
        };
        login(newUser, "offline_jwt_token");
        navigate("/dashboard");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 py-12">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/25 mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create Student Account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Join the CSE undergraduate preparation platform
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Tanvir Hasan"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Student ID (PUST)</label>
              <input
                type="text"
                required
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                placeholder="e.g. 200615"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. student@pust.ac.bd"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
            <input
              type="text"
              readOnly
              value={form.department}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Year</label>
              <select
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Term / Semester</label>
              <select
                value={form.term}
                onChange={(e) => setForm({ ...form, term: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="1">1st Term</option>
                <option value="2">2nd Term</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            <span>{loading ? "Creating Student Account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
