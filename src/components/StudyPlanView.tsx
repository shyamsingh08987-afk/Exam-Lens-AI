import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  Play,
  BrainCircuit,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Flame,
  RotateCcw,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Dumbbell,
} from 'lucide-react';

export const StudyPlanView: React.FC = () => {
  const {
    studyPlanTasks,
    toggleStudyTask,
    generateStudyPlanFromWeakTopics,
    navigateTo,
    addToast,
    demoStep,
    nextDemoStep,
  } = useApp();

  const [expandedWhyTaskId, setExpandedWhyTaskId] = useState<string | null>('task-mon');

  const completedCount = studyPlanTasks.filter((t) => t.completed).length;
  const totalCount = studyPlanTasks.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const handleStartTaskPractice = (topicQuery: string) => {
    addToast('Launching Practice', `Loading customized question pool for ${topicQuery}.`, 'info');
    navigateTo('practice', topicQuery);
  };

  const handleRegenerate = () => {
    generateStudyPlanFromWeakTopics();
  };

  return (
    <div id="study-plan-view-root" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized 7-Day Study Plan
            </h1>
            <span className="text-xs px-2.5 py-0.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
              Adaptive AI
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Synthesized directly from your latest exam diagnostics and targeted at your highest-payoff weak topics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="regenerate-study-plan-btn"
            onClick={handleRegenerate}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Regenerate from Weak Topics</span>
          </button>

          {demoStep === 3 && (
            <button
              id="demo-study-plan-next-step-btn"
              onClick={nextDemoStep}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
            >
              <span>Step 4: Practice &rarr;</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Indicator Card */}
      <div
        id="study-plan-progress-card"
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Weekly Execution Rate
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {completedCount} of {totalCount} tasks completed
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-indigo-600">{completionPercentage}%</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
              {completionPercentage >= 50 ? 'On Track for Target' : 'Action Required'}
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Checking off tasks automatically updates your mastery record and adjusts future recommendations.
        </p>
      </div>

      {/* AI Recommendation Engine Explainer Banner */}
      <div
        id="ai-recommendation-engine-banner"
        className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-5 sm:p-6 rounded-2xl shadow-md border border-indigo-800/40 relative overflow-hidden"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-indigo-500/30 border border-indigo-400/30 text-indigo-300 rounded-xl shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                ExamLens AI Dynamic Recommendation Weights
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/40 text-indigo-200 rounded-full">
                Deterministic Model
              </span>
            </div>
            <p className="text-xs text-indigo-200/90 leading-relaxed max-w-3xl">
              Unlike generic syllabus timelines, ExamLens AI weights topics using 4 strict diagnostic criteria:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-200">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-rose-400">1. &lt;50% Accuracy</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Critical deficit flags</p>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-amber-400">2. Recurring Traps</span>
                <p className="text-[10px] text-slate-400 mt-0.5">High mistake frequency</p>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-blue-400">3. Exam Weighting</span>
                <p className="text-[10px] text-slate-400 mt-0.5">High-scoring chapters</p>
              </div>
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <span className="font-bold text-emerald-400">4. Recent Mistakes</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Last 3 exam attempts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Plan Tasks List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          7-Day Schedule Tailored to Weak Topics
        </h3>

        {studyPlanTasks.map((task) => {
          const isExpanded = expandedWhyTaskId === task.id;

          return (
            <div
              key={task.id}
              id={`task-card-${task.id}`}
              className={`bg-white rounded-2xl border transition-all ${
                task.completed
                  ? 'border-slate-200/60 bg-slate-50/40 opacity-90'
                  : 'border-slate-200/90 shadow-xs hover:border-indigo-300'
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Checkbox & Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <button
                    id={`toggle-task-${task.id}`}
                    onClick={() => toggleStudyTask(task.id)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 sm:mt-0 ${
                      task.completed
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 hover:border-indigo-500 bg-white'
                    }`}
                    aria-label={`Mark ${task.topic} as ${task.completed ? 'incomplete' : 'complete'}`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                        {task.day}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          task.priority === 'HIGH'
                            ? 'bg-rose-100 text-rose-700'
                            : task.priority === 'MEDIUM'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Priority: {task.priority}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {task.durationMinutes} mins
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold text-slate-900 truncate ${
                        task.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.topic}
                    </h4>
                    <p className="text-xs text-slate-500">{task.subject}</p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    id={`why-task-btn-${task.id}`}
                    onClick={() => setExpandedWhyTaskId(isExpanded ? null : task.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/60 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Why this?</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>

                  <button
                    id={`practice-task-btn-${task.id}`}
                    onClick={() => handleStartTaskPractice(task.actionTopicQuery || task.topic)}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>

              {/* Collapsible "Why this task?" Drawer */}
              {isExpanded && (
                <div
                  id={`why-explanation-${task.id}`}
                  className="px-5 pb-4 pt-1 bg-indigo-50/40 border-t border-indigo-100/60 rounded-b-2xl text-xs text-indigo-950 space-y-1.5"
                >
                  <p className="font-bold flex items-center gap-1 text-indigo-900">
                    <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                    ExamLens AI Recommendation Rationale:
                  </p>
                  <p className="text-slate-600 leading-relaxed">{task.whyReason}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
