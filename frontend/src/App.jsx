import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import PdfViewerModal from "./pages/materials/PdfViewerModal";
import ErrorBoundary from "./components/common/ErrorBoundary";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CourseCatalog from "./pages/courses/CourseCatalog";
import CourseDetails from "./pages/courses/CourseDetails";
import QuizSetup from "./pages/quiz/QuizSetup";
import QuizScreen from "./pages/quiz/QuizScreen";
import QuizResult from "./pages/quiz/QuizResult";
import AiAssistant from "./pages/ai/AiAssistant";
import StudyMaterials from "./pages/materials/StudyMaterials";
import ProgressDashboard from "./pages/progress/ProgressDashboard";
import HistoryPage from "./pages/history/HistoryPage";
import LeaderboardPage from "./pages/leaderboard/LeaderboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuestionManagement from "./pages/admin/QuestionManagement";

// 404 Fallback component
function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-extrabold text-2xl">
        404
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The requested syllabus module or academic resource could not be found.
      </p>
      <a href="/dashboard" className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
        Back to Dashboard
      </a>
    </div>
  );
}

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pdfModal, setPdfModal] = useState({ open: false, title: "", code: "" });
  const location = useLocation();

  const isLandingOrAuth = ["/", "/login", "/register", "/forgot-password"].includes(location.pathname);

  const openPdf = (title, code) => {
    setPdfModal({ open: true, title, code });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />

      <div className="flex-1 flex w-full">
        {/* Sidebar for authenticated student/admin views */}
        {!isLandingOrAuth && (
          <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}

        {/* Main Content Area */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${isLandingOrAuth ? "w-full max-w-full p-0 sm:p-0 lg:p-0" : "max-w-7xl mx-auto"}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:code" element={<CourseDetails onOpenPdf={openPdf} />} />
            
            <Route path="/quiz" element={<QuizSetup />} />
            <Route path="/quiz/live" element={<QuizScreen />} />
            <Route path="/quiz/result" element={<QuizResult />} />
            
            <Route path="/ai" element={<AiAssistant />} />
            <Route path="/materials" element={<StudyMaterials onOpenPdf={openPdf} />} />
            <Route path="/progress" element={<ProgressDashboard />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/questions" element={<QuestionManagement />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Bottom Mobile Navigation */}
      {!isLandingOrAuth && <MobileNav />}

      {/* Global Interactive PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModal.open}
        onClose={() => setPdfModal({ open: false, title: "", code: "" })}
        documentTitle={pdfModal.title}
        courseCode={pdfModal.code}
      />

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

