import React from "react";
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.removeItem("cseprep_user");
    localStorage.removeItem("cseprep_token");
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-rose-200 dark:border-rose-900/50 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Something went wrong
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              An unexpected error occurred while rendering the page. Don't worry, your progress and session data are safe.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left overflow-x-auto text-[11px] font-mono text-rose-600 dark:text-rose-400 max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </a>

              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold transition-colors"
              >
                <span>Reset Session</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
