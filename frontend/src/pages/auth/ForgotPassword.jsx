import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Reset Password</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter your PUST student email to receive recovery instructions
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instructions Sent</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              If an account is associated with <b>{email}</b>, you will receive a secure password reset link.
            </p>
            <Link to="/login" className="inline-block pt-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student.cse@pust.ac.bd"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-slate-500 dark:text-slate-400 hover:underline">
                Return to Login
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
