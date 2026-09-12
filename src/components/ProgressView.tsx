import React from 'react';
import { useApp } from '../context/AppContext';
import { MISTAKE_PATTERNS } from '../data/mockData';
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Flame,
  ArrowUpRight,
  Check,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

export const ProgressView: React.FC = () => {
  const { student, subjectMastery, topics, testHistory, navigateTo, demoStep, nextDemoStep } = useApp();

  // Weekly learning activity (Mon-Sun questions solved)
  const weeklyActivityData = [
    { day: 'Mon', questions: 18, hours: 1.2 },
    { day: 'Tue', questions: 22, hours: 1.5 },
    { day: 'Wed', questions: 15, hours: 1.0 },
    { day: 'Thu', questions: 25, hours: 1.8 },
    { day: 'Fri', questions: 14, hours: 0.9 },
    { day: 'Sat', questions: 20, hours: 1.4 },
    { day: 'Sun', questions: 16, hours: 1.1 },
  ];

  // Accuracy trend across tests
  const accuracyTrendData = testHistory.map((test) => ({
    name: test.date,
    accuracy: test.accuracy,
    score: test.score,
  }));

  // Pie chart data for mistake patterns
  const mistakePieData = MISTAKE_PATTERNS.map((item) => ({
    name: item.category,
    value: item.percentage,
    color: item.color,
  }));

  // Find Boolean Algebra topic for live before/after tracking
  const booleanTopic = topics.find((t) => t.name.toLowerCase().includes('boolean'));
  const booleanAccuracy = booleanTopic ? booleanTopic.accuracy : 54;

  return (
    <div id="progress-view-root" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Progress & Analytics
            </h1>
            <span className="text-xs px-2.5 py-0.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
              Overall: {student.overallScore}%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track historical score velocity, mistake breakdown, and real-time subject mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('practice', 'Weak Topics')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <span>Remediate Weak Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {demoStep === 5 && (
            <button
              id="demo-complete-tour-btn"
              onClick={nextDemoStep}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
            >
              <span>Finish Demo Tour 🎉</span>
            </button>
          )}
        </div>
      </div>

      {/* BEFORE vs. AFTER INTERVENTION COMPARISON (Prompt requirement: show clear improvement, before/after comparison) */}
      <div
        id="before-after-comparison-card"
        className={`bg-white rounded-3xl p-6 border shadow-xs transition-all ${
          demoStep === 5 ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/20' : 'border-slate-200/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Intervention Efficacy
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                Verified Closed-Loop
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Before vs. After ExamLens AI Targeted Practice
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <TrendingUp className="w-4 h-4" />
            <span>+{Math.max(4, student.overallScore - 68)}% Score Uplift Since Baseline</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* BEFORE: Baseline Exam State */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                1. Baseline Assessment (BCA Mid-Term)
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md">
                Pre-Remediation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Initial Score</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">68%</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/70">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Initial Accuracy</span>
                <p className="text-xl font-extrabold text-slate-700 mt-0.5">71%</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Boolean Algebra Accuracy:</span>
                <strong className="text-rose-600">48% (Critical)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Study Strategy:</span>
                <span className="text-slate-500 italic">Studied everything equally</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mistake Concentration:</span>
                <span className="text-slate-500">De Morgan & logic synthesis</span>
              </div>
            </div>
          </div>

          {/* AFTER: Post-Targeted Practice State */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                2. Post-Practice Status (Today)
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-md shadow-xs">
                Active Improvement
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Score</span>
                <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{student.overallScore}%</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Accuracy</span>
                <p className="text-xl font-extrabold text-indigo-700 mt-0.5">{student.overallAccuracy}%</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center justify-between">
                <span>Boolean Algebra Accuracy:</span>
                <strong className="text-emerald-700">{booleanAccuracy}% (+{booleanAccuracy - 48}%)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Study Strategy:</span>
                <strong className="text-indigo-700">AI Weak-Topic Prescription</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Questions Solved:</span>
                <span className="font-semibold text-slate-900">{student.questionsSolved} verified items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Progress Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Overall Progress</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{student.overallScore}%</span>
            <span className="text-xs font-semibold text-emerald-600">+14% total growth</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${student.overallScore}%` }} />
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Average Accuracy</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{student.overallAccuracy}%</span>
            <span className="text-xs font-semibold text-indigo-600">Top 15% in BCA</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Calculated over {student.questionsSolved} responses</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Active Study Streak</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{student.streakDays} Days</span>
            <span className="text-xs font-semibold text-amber-600">Personal record</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Consistent daily practice habit</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Tests Completed</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{student.testsCompleted}</span>
            <span className="text-xs font-semibold text-purple-600">Semester 1</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">6 Full Mocks + 6 Unit Tests</p>
        </div>
      </div>

      {/* Analytics Charts Row 1: Weekly Activity & Accuracy Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Learning Activity</h3>
              <p className="text-xs text-slate-500">Questions solved each day this week</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {student.questionsSolved} Total
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value} questions`, 'Solved']}
                />
                <Bar dataKey="questions" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Trend Line Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Accuracy & Score Trend</h3>
              <p className="text-xs text-slate-500">Historical progression over 6 test milestones</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Accuracy %
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Score %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#4F46E5' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mistake Patterns Breakdown (AI Root Cause Analysis) */}
      <div
        id="mistake-patterns-breakdown-card"
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Mistake Patterns Breakdown</h3>
            <p className="text-xs text-slate-500">
              ExamLens AI diagnostic taxonomy classifying every error made across tests
            </p>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
            Top Trap: Conceptual Gaps (42%)
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {MISTAKE_PATTERNS.map((item) => (
            <div
              key={item.category}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-extrabold px-2.5 py-0.5 rounded-full"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="text-2xl font-extrabold" style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs">
                <p className="text-[11px] font-bold text-slate-900 mb-0.5">Recommended Remedy:</p>
                <p className="text-[11px] text-slate-600">{item.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Performance & Topic Mastery Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Performance Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Subject Performance</h3>
          <p className="text-xs text-slate-500 mb-4">Cumulative mastery by curriculum syllabus</p>

          <div className="space-y-4">
            {subjectMastery.map((sub) => (
              <div key={sub.subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{sub.subject}</span>
                  <span className="font-bold" style={{ color: sub.color }}>
                    {sub.score}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${sub.score}%`, backgroundColor: sub.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{sub.correctAnswers} of {sub.totalQuestions} questions correct</span>
                  <span>{sub.score >= 75 ? 'On Target' : 'Needs Practice'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Mastery List */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Topic Mastery Spectrum</h3>
            <p className="text-xs text-slate-500 mb-4">Granular accuracy ranking across chapters</p>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigateTo('practice', t.name)}
                  className="p-3 bg-slate-50 hover:bg-indigo-50/60 rounded-xl border border-slate-200/80 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.subject} • {t.totalAttempted} solved</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        t.accuracy < 50
                          ? 'bg-rose-100 text-rose-700'
                          : t.accuracy < 70
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {t.accuracy}%
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-center">
            <button
              onClick={() => navigateTo('practice', 'Weak Topics')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Start Practice Session for Weak Topics &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Recent Tests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Tests</h3>
            <p className="text-xs text-slate-500">History of analyzed assessments and mock examinations</p>
          </div>
          <button
            onClick={() => navigateTo('analyze')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            + Analyze New Test
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Test Title</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {testHistory.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{test.title}</td>
                  <td className="py-3 px-4 text-slate-500">{test.date}</td>
                  <td className="py-3 px-4 text-slate-600">{test.subject}</td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-slate-900">{test.score}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                        test.accuracy >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : test.accuracy >= 70
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {test.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigateTo('analyze')}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                    >
                      View Diagnostics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
