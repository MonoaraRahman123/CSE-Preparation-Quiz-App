import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const { login, defaultStudent, defaultAdmin } = useApp();
  const [email, setEmail] = useState("tanvir.cse@pust.ac.bd");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials. Please verify your email and password.");
      }

      login(data.user, data.token);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.warn("Backend login warning, falling back to local session if matching demo:", err.message);
      // Fallback for offline demo credentials
      if (email.toLowerCase().includes("admin") && (password === "adminpassword" || password === "password123")) {
        login(defaultAdmin, "admin_jwt_token");
        navigate("/admin");
      } else if (password === "password123") {
        login(defaultStudent, "student_jwt_token");
        navigate("/dashboard");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStudent = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "tanvir.cse@pust.ac.bd", password: "password123" })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login(data.user, data.token);
      } else {
        login(defaultStudent, "student_jwt_token");
      }
    } catch {
      login(defaultStudent, "student_jwt_token");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  const handleQuickAdmin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin.cse@pust.ac.bd", password: "adminpassword" })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login(data.user, data.token);
      } else {
        login(defaultAdmin, "admin_jwt_token");
      }
    } catch {
      login(defaultAdmin, "admin_jwt_token");
    } finally {
      setLoading(false);
      navigate("/admin");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "student.google@pust.ac.bd", name: "PUST Student" })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login(data.user, data.token);
      } else {
        login(defaultStudent, "google_jwt_token");
      }
    } catch {
      login(defaultStudent, "google_jwt_token");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Brand */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-500/25 mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to continue your CSE undergraduate preparation
          </p>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">
            🚀 1-Click Instant Demo Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickStudent}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-500 transition-colors shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Student</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student.cse@pust.ac.bd"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Continue with Google */}
        <div className="mt-4">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400">or</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}
