import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Dumbbell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Award,
  Zap,
  Layers,
  ArrowUpRight,
  BrainCircuit,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    student,
    subjectMastery,
    topics,
    testHistory,
    navigateTo,
    studyPlanTasks,
    addToast,
    startThreeMinuteDemo,
    resetDemoData,
  } = useApp();

  // Filter topics by priority level
  const highPriority = topics.filter((t) => t.status === 'CRITICAL' || t.status === 'HIGH');
  const mediumPriority = topics.filter((t) => t.status === 'MEDIUM');
  const lowPriority = topics.filter((t) => t.status === 'LOW' || t.status === 'MASTERED');

  // Chart data for score progression across 6 recent tests
  const scoreProgressionData = testHistory.map((test) => ({
    name: test.date,
    title: test.title,
    score: test.score,
    accuracy: test.accuracy,
  }));

  // Topic mastery bar data
  const topicMasteryData = [
    { subject: 'Computer Fundamentals', score: 82, fill: '#3B82F6' },
    { subject: 'Mathematics', score: 61, fill: '#8B5CF6' },
    { subject: 'Programming in C', score: 74, fill: '#10B981' },
  ];

  const handleStartBooleanPractice = () => {
    addToast('Opening Practice', 'Loaded targeted Boolean Algebra question set.', 'info');
    navigateTo('practice', 'Boolean Algebra');
  };

  return (
    <div id="dashboard-view-root" className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {student.name.split(' ')[0]} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
              Demo Data Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's what your learning data says today.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            id="dashboard-analyze-exam-header-btn"
            onClick={() => navigateTo('analyze')}
            className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>Upload New Exam</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            id="dashboard-practice-header-btn"
            onClick={() => navigateTo('practice', 'Weak Topics')}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Practice Weak Topics</span>
          </button>
        </div>
      </div>

      {/* HACKATHON LIVE DEMO MODE BANNER (Prompt requirement: obvious 3-minute demo flow) */}
      <div
        id="hackathon-demo-banner"
        className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 border border-indigo-500/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5"
      >
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[11px] font-bold border border-indigo-400/30">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Hackathon Presentation Mode</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Demonstrate the Complete 3-Minute Closed Loop
          </h3>

          <p className="text-xs text-indigo-200/80 max-w-xl leading-relaxed">
            Walk judges through the live core sequence:{' '}
            <strong className="text-white">Exam Result → AI Diagnostics → Weak Topics → 7-Day Plan → Targeted Practice → Real-Time Progress.</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            id="start-three-minute-demo-btn"
            onClick={startThreeMinuteDemo}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.03]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start 3-Minute Demo</span>
          </button>

          <button
            id="reset-demo-state-quick-btn"
            onClick={resetDemoData}
            title="Reset to fresh initial demo baseline"
            className="px-3.5 py-3 bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* KPI Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Score */}
        <div
          id="kpi-overall-score"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overall Score</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.overallScore}%</span>
            <span className="text-xs font-semibold text-emerald-600">+6% vs last mock</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${student.overallScore}%` }}
            />
          </div>
        </div>

        {/* Card 2: Questions Attempted */}
        <div
          id="kpi-questions-attempted"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Questions Attempted</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.questionsSolved}</span>
            <span className="text-xs font-semibold text-indigo-600">12 mock tests</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Daily target: {student.dailyGoalQuestions} questions</p>
        </div>

        {/* Card 3: Accuracy */}
        <div
          id="kpi-accuracy"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Accuracy</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.overallAccuracy}%</span>
            <span className="text-xs font-semibold text-emerald-600">High accuracy</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${student.overallAccuracy}%` }}
            />
          </div>
        </div>

        {/* Card 4: Topics Mastered */}
        <div
          id="kpi-topics-mastered"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Topics Mastered</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{student.topicsMastered}</span>
            <span className="text-xs font-semibold text-purple-600">of 18 tracked</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-2">2 Critical topics require focus</p>
        </div>
      </div>

      {/* AI Insight Card & Today's Recommendation Banner */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* AI Insight Card (2 cols) */}
        <div
          id="dashboard-ai-insight-card"
          className="lg:col-span-2 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>AI Insight</span>
              </div>
              <span className="text-[11px] text-indigo-300/80">Calculated from 128 answers</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              "Your strongest area is Computer Fundamentals. Your biggest improvement opportunity is Mathematics — especially Boolean Algebra and Relations."
            </h3>

            <p className="text-xs text-indigo-200/90 mt-2.5 leading-relaxed">
              Diagnostic analysis indicates that 42% of your mistakes stem from multi-step theorem application (De Morgan laws and Karnaugh maps), rather than basic factual recall. Addressing this will yield up to +12% score gain on your end-semester paper.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-indigo-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-indigo-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Comp. Fundamentals: <strong>82%</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Mathematics: <strong>61%</strong>
              </span>
            </div>

            <button
              id="ai-insight-inspect-btn"
              onClick={() => navigateTo('progress')}
              className="text-xs font-semibold text-indigo-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View Deep Diagnostics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Today's Recommendation Action Box (1 col) */}
        <div
          id="dashboard-today-recommendation-card"
          className="bg-white rounded-2xl p-5 border border-indigo-100/80 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                Priority: HIGH
              </span>
              <span className="text-xs text-slate-400">~15 mins</span>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Today's Recommendation
            </h4>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Practice 10 questions on Boolean Algebra
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Targeted logic simplification practice designed to eliminate frequent mistakes on NAND/NOR duality and truth tables.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              id="today-start-practice-btn"
              onClick={handleStartBooleanPractice}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 1. Performance Overview chart (Score progression across 6 recent tests) */}
        <div
          id="dashboard-performance-chart-card"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Performance Overview</h3>
              <p className="text-xs text-slate-500">Score progression across 6 recent tests</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                Score %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreProgressionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Score']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#scoreColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[11px] text-slate-400">
              Steadily climbed from 58% to 78% after targeted practice cycles
            </span>
          </div>
        </div>

        {/* 2. Topic Mastery chart */}
        <div
          id="dashboard-topic-mastery-card"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Topic Mastery</h3>
              <p className="text-xs text-slate-500">Subject-level performance benchmarks</p>
            </div>
            <button
              onClick={() => navigateTo('progress')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              See Breakdown &rarr;
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topicMasteryData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis
                  type="category"
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: '#334155' }}
                  width={130}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Mastery']}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={22}>
                  {topicMasteryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick subject benchmark summary */}
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-[10px] text-blue-700 font-semibold truncate">Comp. Fundamentals</p>
              <p className="text-sm font-bold text-blue-900">82%</p>
            </div>
            <div className="p-2 bg-purple-50/60 rounded-xl border border-purple-100">
              <p className="text-[10px] text-purple-700 font-semibold truncate">Mathematics</p>
              <p className="text-sm font-bold text-purple-900">61%</p>
            </div>
            <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-[10px] text-emerald-700 font-semibold truncate">Programming in C</p>
              <p className="text-sm font-bold text-emerald-900">74%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Topics Section */}
      <div
        id="dashboard-priority-topics-card"
        className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Priority Topics</h3>
            <p className="text-xs text-slate-500">
              Categorized by accuracy gap and exam weighting to maximize your score gain
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              HIGH: &lt;60%
            </span>
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              MEDIUM: 60-75%
            </span>
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              LOW: &gt;75%
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* HIGH PRIORITY */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">
                  HIGH PRIORITY
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>

              <div className="space-y-3 mt-3">
                <div
                  onClick={() => navigateTo('practice', 'Boolean Algebra')}
                  className="p-2.5 bg-white rounded-lg border border-rose-200/80 hover:border-rose-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Boolean Algebra</p>
                    <span className="text-xs font-bold text-rose-600">48%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Discrete Math • 6/10 missed</p>
                </div>

                <div
                  onClick={() => navigateTo('practice', 'Relations & Functions')}
                  className="p-2.5 bg-white rounded-lg border border-rose-200/80 hover:border-rose-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Relations & Functions</p>
                    <span className="text-xs font-bold text-rose-600">54%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Set Theory • Equivalence proofs</p>
                </div>
              </div>
            </div>

            <button
              id="high-priority-practice-btn"
              onClick={() => navigateTo('practice', 'Weak Topics')}
              className="mt-4 w-full py-1.5 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200/80 rounded-lg transition-colors"
            >
              Practice High Priority
            </button>
          </div>

          {/* MEDIUM PRIORITY */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                  MEDIUM PRIORITY
                </span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>

              <div className="space-y-3 mt-3">
                <div
                  onClick={() => navigateTo('practice', 'Number Systems')}
                  className="p-2.5 bg-white rounded-lg border border-amber-200/80 hover:border-amber-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Number Systems</p>
                    <span className="text-xs font-bold text-amber-600">76%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Comp. Fundamentals • 2s complement</p>
                </div>

                <div
                  onClick={() => navigateTo('practice', 'C Programming Loops')}
                  className="p-2.5 bg-white rounded-lg border border-amber-200/80 hover:border-amber-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">C Programming Loops</p>
                    <span className="text-xs font-bold text-amber-600">71%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Programming in C • Nested loops</p>
                </div>
              </div>
            </div>

            <button
              id="medium-priority-practice-btn"
              onClick={() => navigateTo('practice', 'Medium')}
              className="mt-4 w-full py-1.5 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200/80 rounded-lg transition-colors"
            >
              Review Medium Topics
            </button>
          </div>

          {/* LOW PRIORITY / MASTERED */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  LOW PRIORITY (MASTERED)
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-3 mt-3">
                <div
                  onClick={() => navigateTo('practice', 'Computer Basics')}
                  className="p-2.5 bg-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Computer Basics</p>
                    <span className="text-xs font-bold text-emerald-600">92%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">CPU & Memory Hierarchy • High mastery</p>
                </div>

                <div
                  onClick={() => navigateTo('practice', 'Functions & Recursion')}
                  className="p-2.5 bg-white rounded-lg border border-emerald-200/80 hover:border-emerald-400 cursor-pointer shadow-xs transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Functions & Recursion</p>
                    <span className="text-xs font-bold text-emerald-600">86%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Call stacks & base cases • Mastered</p>
                </div>
              </div>
            </div>

            <button
              id="low-priority-practice-btn"
              onClick={() => navigateTo('practice', 'All Topics')}
              className="mt-4 w-full py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200/80 rounded-lg transition-colors"
            >
              Light Review Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
