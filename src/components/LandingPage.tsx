import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Brain,
  ScanText,
  Dumbbell,
  CalendarCheck2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BarChart3,
  Award,
  ChevronRight,
  Clock,
  Target,
  FileSpreadsheet,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, setIsLoggedIn, student } = useApp();

  const handleDemoStudentLogin = () => {
    setIsLoggedIn(true);
    navigateTo('dashboard');
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Top Banner & Header for Landing */}
      <nav className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">ExamLens AI</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                EdTech Hackathon MVP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="landing-explore-nav-btn"
              onClick={() => navigateTo('dashboard')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Explore Dashboard
            </button>
            <button
              id="landing-login-nav-btn"
              onClick={handleDemoStudentLogin}
              className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all"
            >
              Demo Student Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Powered Exam Performance Diagnostics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Study smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600">
              Improve faster.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
            ExamLens AI analyzes your exam performance and tells you exactly what to focus on next.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              id="hero-analyze-exam-btn"
              onClick={() => navigateTo('analyze')}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all group"
            >
              <span>Analyze My Exam</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              id="hero-explore-dashboard-btn"
              onClick={() => navigateTo('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold text-sm rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Dashboard</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick Value Anchor */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100/70 px-4 py-2 rounded-full border border-slate-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Core Principle: "Stop studying everything. Study what matters."</span>
          </div>
        </div>

        {/* Visual Preview of the Analytics Dashboard */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div
            id="hero-dashboard-preview"
            onClick={() => navigateTo('dashboard')}
            className="group relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 sm:p-6 cursor-pointer hover:border-indigo-300 transition-all overflow-hidden"
          >
            {/* Top Bar Preview */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-semibold text-slate-400">ExamLens AI Live Dashboard View</span>
              </div>
              <span className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
                Open Full Screen &rarr;
              </span>
            </div>

            {/* Dashboard Mock Grid Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Overall Score</p>
                <p className="text-xl font-bold text-slate-900 mt-1">72%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">+6% vs mid-term</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Questions Solved</p>
                <p className="text-xl font-bold text-slate-900 mt-1">128</p>
                <span className="text-[10px] text-indigo-600 font-semibold">15 today</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Accuracy Rate</p>
                <p className="text-xl font-bold text-slate-900 mt-1">76%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">High confidence</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Topics Mastered</p>
                <p className="text-xl font-bold text-slate-900 mt-1">14</p>
                <span className="text-[10px] text-amber-600 font-semibold">2 Critical remaining</span>
              </div>
            </div>

            {/* Mock AI Insight Banner */}
            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-lg shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-900">AI Diagnostic Insight</p>
                  <p className="text-xs text-indigo-800/90 mt-0.5">
                    "Your strongest area is Computer Fundamentals (82%). Your biggest improvement opportunity is Mathematics — especially Boolean Algebra (48%)."
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('practice', 'Boolean Algebra');
                }}
                className="shrink-0 text-xs font-bold px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Practice Weak Topic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Problem Card */}
            <div className="p-7 rounded-2xl bg-rose-50/50 border border-rose-100 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">The Real Dilemma</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                "Students don't need more content. They need better direction."
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                Most students prepare by re-reading full textbooks or randomly solving questions without diagnostic feedback. They spend 50%+ of their revision on material they have already mastered, leaving critical gaps undetected until exam day.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  No visibility into which chapters carry high exam weight vs low accuracy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  Repeated calculation or reasoning traps going unflagged
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  Generic, unprioritized study schedules that cause burnout
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="p-7 rounded-2xl bg-indigo-50/50 border border-indigo-100 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">The ExamLens Solution</h3>
              <h4 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                "ExamLens AI turns exam results into personalized learning insights."
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By ingesting score sheets, test attempts, or manual marks, ExamLens AI applies targeted diagnostic modeling to identify exactly what to study, why that topic matters, and generates an adaptive 7-day remedial plan.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Identifies Strong vs Weak topics and frequently missed concepts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Ranks chapters by priority based on accuracy and syllabus marks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Delivers targeted practice questions with instant step explanations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Engineered for Results</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Three pillars of diagnostic exam preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div
              id="feature-card-1"
              onClick={() => navigateTo('analyze')}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-5 border border-indigo-100">
                  <ScanText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Smart Exam Analysis</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload an exam result or enter marks manually. Our deterministic diagnostic engine parses score distributions, identifies high-weight chapters, and flags repeated failure modes.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600">
                <span>Analyze your paper</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Feature 2 */}
            <div
              id="feature-card-2"
              onClick={() => navigateTo('practice')}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-5 border border-blue-100">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Personalized Practice</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Target questions curated specifically for your vulnerable concepts like Karnaugh Maps, De Morgan laws, and NAND/NOR conversions. Receive immediate pedagogic rationale.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600">
                <span>Solve targeted questions</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Feature 3 */}
            <div
              id="feature-card-3"
              onClick={() => navigateTo('study-plan')}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-5 border border-purple-100">
                  <CalendarCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Adaptive Study Plan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A personalized 7-day roadmap with dynamic time allocations (30–45 mins/day), explicit priority levels, and transparent "Why this topic?" AI reasoning.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-600">
                <span>View daily roadmap</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section with Demo Statistics */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-widest text-indigo-400 uppercase">
              Measured Student Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Data-backed acceleration for exam prep
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              *Clearly treated as demo and simulated product metrics for the hackathon presentation.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-1">32%</p>
              <p className="text-sm font-semibold text-white">Less Wasted Study Time</p>
              <p className="text-xs text-slate-400 mt-1">
                Eliminating redundant review of already mastered subjects
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">3.4x</p>
              <p className="text-sm font-semibold text-white">Faster Weak-Topic Identification</p>
              <p className="text-xs text-slate-400 mt-1">
                Zeroing in on root misconceptions within seconds of upload
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">87%</p>
              <p className="text-sm font-semibold text-white">Recommendation Accuracy</p>
              <p className="text-xs text-slate-400 mt-1">
                Demo metric benchmarking predicted score uplift
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Student Login Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-indigo-50/70 to-blue-50/30 border border-indigo-100 shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-indigo-700 text-xs font-bold border border-indigo-200/70 mb-5 shadow-xs">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Instant Hackathon Evaluation Access</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Experience the Live Demo
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8">
              No complex registration or credentials required. Step right into Aarav Sharma’s personalized dashboard and test every diagnostic workflow.
            </p>

            {/* Student Preview Card */}
            <div className="max-w-md mx-auto bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-md text-left mb-8">
              <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {student.course} • Semester {student.semester}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Enrolled Subjects
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
                    Computer Fundamentals
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
                    Mathematics
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-lg">
                    Programming in C
                  </span>
                </div>
              </div>
            </div>

            {/* Continue as Demo Student Button */}
            <button
              id="continue-as-demo-student-btn"
              onClick={handleDemoStudentLogin}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Continue as Demo Student</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ExamLens AI • College Hackathon Edition</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('dashboard')} className="hover:text-indigo-600">
              Dashboard
            </button>
            <button onClick={() => navigateTo('analyze')} className="hover:text-indigo-600">
              Analyze Exam
            </button>
            <button onClick={() => navigateTo('practice')} className="hover:text-indigo-600">
              Practice
            </button>
            <button onClick={() => navigateTo('study-plan')} className="hover:text-indigo-600">
              Study Plan
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
