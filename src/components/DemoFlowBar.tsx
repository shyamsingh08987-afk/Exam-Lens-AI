import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Brain,
  CalendarCheck,
  Dumbbell,
  TrendingUp,
  Play,
} from 'lucide-react';

export const DemoFlowBar: React.FC = () => {
  const { demoStep, nextDemoStep, prevDemoStep, exitDemoMode, runDemoExamAnalysis } = useApp();

  if (!demoStep) return null;

  const stepsConfig = [
    {
      step: 1,
      title: 'Step 1: Analyze Demo Exam',
      description: 'Evaluating BCA Mid-Term Discrete Mathematics results (30 attempted, 21 correct).',
      actionLabel: 'Proceed to AI Insights',
      icon: Brain,
    },
    {
      step: 2,
      title: 'Step 2: View AI Insights & Root Cause',
      description: 'ExamLens AI isolates weak topics & diagnoses WHY mistakes occurred under logical deduction.',
      actionLabel: 'Generate Adaptive Study Plan',
      icon: Sparkles,
    },
    {
      step: 3,
      title: 'Step 3: Generate Personalized Study Plan',
      description: 'Automatically slots identified weak topics (Boolean Algebra, Logic Gates) into 7 days.',
      actionLabel: 'Start Targeted Practice',
      icon: CalendarCheck,
    },
    {
      step: 4,
      title: 'Step 4: Practice Weak Topic Questions',
      description: 'Solve the recommended NAND logic gate question with instant step-by-step explanations.',
      actionLabel: 'Inspect Updated Progress',
      icon: Dumbbell,
    },
    {
      step: 5,
      title: 'Step 5: View Real-Time Progress Uplift',
      description: 'Observe the accuracy gains, streak growth, and error pattern diagnostic model.',
      actionLabel: 'Complete Demo & Finish',
      icon: TrendingUp,
    },
  ];

  const currentConfig = stepsConfig[demoStep - 1];
  const StepIcon = currentConfig.icon;

  return (
    <div
      id="demo-flow-sticky-controller"
      className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-indigo-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Step indicator & Description */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-md shadow-indigo-600/30">
            <StepIcon className="w-5 h-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/30 text-indigo-300 rounded-full border border-indigo-400/30">
                Hackathon Demo Mode • Step {demoStep} of 5
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• 3-Minute Live Tour</span>
            </div>

            <h4 className="text-sm font-bold text-white mt-0.5 truncate">{currentConfig.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-1">{currentConfig.description}</p>
          </div>
        </div>

        {/* Stepper Dots for visual progress */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 px-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === demoStep
                  ? 'w-6 bg-indigo-400'
                  : i < demoStep
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Right: Controller Actions */}
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto shrink-0">
          {demoStep > 1 && (
            <button
              id="demo-flow-prev-btn"
              onClick={prevDemoStep}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button
            id="demo-flow-next-btn"
            onClick={nextDemoStep}
            className="flex-1 md:flex-initial px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>{currentConfig.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="demo-flow-exit-btn"
            onClick={exitDemoMode}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors ml-1"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
