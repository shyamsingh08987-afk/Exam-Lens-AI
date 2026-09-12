import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, CheckCircle, ArrowRight, BookOpen, Brain, Zap, Target } from 'lucide-react';

export const DemoTourModal: React.FC = () => {
  const { isDemoGuideOpen, setIsDemoGuideOpen, navigateTo } = useApp();

  if (!isDemoGuideOpen) return null;

  return (
    <div
      id="demo-tour-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="demo-tour-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-tight">Hackathon Judge Demo Guide</h3>
              <p className="text-xs text-indigo-200">3-Minute Walkthrough: From Exam Results to Actionable Mastery</p>
            </div>
          </div>
          <button
            id="close-demo-tour-btn"
            onClick={() => setIsDemoGuideOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 flex items-start gap-3">
            <div className="p-1 bg-indigo-600 text-white rounded-md mt-0.5">
              <Brain className="w-4 h-4" />
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              <strong className="font-semibold">Value Proposition:</strong> Students often spend hours studying what they already know. ExamLens AI identifies precise blind spots, explains <em>why</em> topics need attention, and auto-generates adaptive practice.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Suggested 3-Minute Demo Flow</h4>

            <div className="grid sm:grid-cols-2 gap-3">
              <div
                id="tour-step-1"
                onClick={() => {
                  navigateTo('dashboard');
                  setIsDemoGuideOpen(false);
                }}
                className="group p-3.5 border border-slate-200 hover:border-indigo-500 rounded-xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">Step 1 (30s)</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h5 className="text-sm font-semibold text-slate-900 mb-1">Explore Student Dashboard</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Review Aarav’s performance overview, topic mastery (CF 82%, Math 61%), and AI insights highlighting Boolean Algebra deficits.
                </p>
              </div>

              <div
                id="tour-step-2"
                onClick={() => {
                  navigateTo('analyze');
                  setIsDemoGuideOpen(false);
                }}
                className="group p-3.5 border border-slate-200 hover:border-indigo-500 rounded-xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md">Step 2 (45s)</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <h5 className="text-sm font-semibold text-slate-900 mb-1">Analyze Exam & AI Breakdown</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Click "Use Demo Exam" to run simulated AI gap detection, identifying multi-step logic errors, NAND/NOR gate confusion, and high priority scores.
                </p>
              </div>

              <div
                id="tour-step-3"
                onClick={() => {
                  navigateTo('practice', 'Weak Topics');
                  setIsDemoGuideOpen(false);
                }}
                className="group p-3.5 border border-slate-200 hover:border-indigo-500 rounded-xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">Step 3 (45s)</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h5 className="text-sm font-semibold text-slate-900 mb-1">Solve Personalized Practice</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Test the interactive question system. Submit answers, view instant pedagogical explanations, and observe dynamic topic score updates.
                </p>
              </div>

              <div
                id="tour-step-4"
                onClick={() => {
                  navigateTo('study-plan');
                  setIsDemoGuideOpen(false);
                }}
                className="group p-3.5 border border-slate-200 hover:border-indigo-500 rounded-xl bg-slate-50/50 hover:bg-indigo-50/30 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md">Step 4 (30s)</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <h5 className="text-sm font-semibold text-slate-900 mb-1">Adaptive 7-Day Study Plan</h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Inspect the "Why this topic?" AI reasoning engine, toggle completed tasks, and launch focused revision sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Demo data is pre-populated and persistent in localStorage
            </span>
            <button
              id="got-it-tour-btn"
              onClick={() => setIsDemoGuideOpen(false)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Start Demonstration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
