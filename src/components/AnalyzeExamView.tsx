import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_SAMPLE_EXAM_INPUT } from '../data/mockData';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Brain,
  FileCheck,
  TrendingDown,
  TrendingUp,
  Sliders,
  Layers,
  HelpCircle,
  Target,
  Zap,
} from 'lucide-react';

export const AnalyzeExamView: React.FC = () => {
  const {
    examAnalysis,
    analyzeExamData,
    generateStudyPlanFromWeakTopics,
    navigateTo,
    addToast,
    demoStep,
    nextDemoStep,
  } = useApp();

  const [activeTabOption, setActiveTabOption] = useState<'upload' | 'manual'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Manual inputs
  const [subject, setSubject] = useState(DEMO_SAMPLE_EXAM_INPUT.subject);
  const [chapter, setChapter] = useState(DEMO_SAMPLE_EXAM_INPUT.chapter);
  const [attempted, setAttempted] = useState(DEMO_SAMPLE_EXAM_INPUT.questionsAttempted);
  const [correct, setCorrect] = useState(DEMO_SAMPLE_EXAM_INPUT.correctAnswers);
  const [incorrect, setIncorrect] = useState(DEMO_SAMPLE_EXAM_INPUT.incorrectAnswers);
  const [examName, setExamName] = useState(DEMO_SAMPLE_EXAM_INPUT.examName);

  // Loading animation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Automatic realistic exam analysis on "Use Demo Exam" click
  const handleUseDemoExam = () => {
    setSubject(DEMO_SAMPLE_EXAM_INPUT.subject);
    setChapter(DEMO_SAMPLE_EXAM_INPUT.chapter);
    setAttempted(DEMO_SAMPLE_EXAM_INPUT.questionsAttempted);
    setCorrect(DEMO_SAMPLE_EXAM_INPUT.correctAnswers);
    setIncorrect(DEMO_SAMPLE_EXAM_INPUT.incorrectAnswers);
    setExamName(DEMO_SAMPLE_EXAM_INPUT.examName);

    setIsAnalyzing(true);
    setAnalysisStep(1);
    addToast('Demo Exam Loaded', 'Running AI diagnostic pipeline on BCA Mid-Term Paper...', 'info');

    setTimeout(() => setAnalysisStep(2), 500);
    setTimeout(() => setAnalysisStep(3), 1100);

    setTimeout(() => {
      analyzeExamData({
        subject: DEMO_SAMPLE_EXAM_INPUT.subject,
        chapter: DEMO_SAMPLE_EXAM_INPUT.chapter,
        attempted: DEMO_SAMPLE_EXAM_INPUT.questionsAttempted,
        correct: DEMO_SAMPLE_EXAM_INPUT.correctAnswers,
        incorrect: DEMO_SAMPLE_EXAM_INPUT.incorrectAnswers,
        examName: DEMO_SAMPLE_EXAM_INPUT.examName,
      });
      setIsAnalyzing(false);
      setAnalysisStep(0);

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('analysis-result-container');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1700);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
      addToast('File Attached', `${e.dataTransfer.files[0].name} uploaded for evaluation.`, 'success');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      addToast('File Attached', `${e.target.files[0].name} uploaded for evaluation.`, 'success');
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1200);

    setTimeout(() => {
      analyzeExamData({
        subject,
        chapter,
        attempted: Number(attempted),
        correct: Number(correct),
        incorrect: Number(incorrect),
        examName,
      });
      setIsAnalyzing(false);
      setAnalysisStep(0);

      setTimeout(() => {
        const el = document.getElementById('analysis-result-container');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1800);
  };

  const handleGenerateStudyPlan = () => {
    generateStudyPlanFromWeakTopics();
    navigateTo('study-plan');
    if (demoStep === 2) {
      nextDemoStep();
    }
  };

  return (
    <div id="analyze-exam-view-root" className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Analyze your exam
          </h1>
          <span className="text-xs px-2.5 py-0.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 rounded-full">
            AI Engine v1.2
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload your result or enter your performance to discover where you should focus.
        </p>
      </div>

      {/* Input Options Container */}
      <div
        className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
          demoStep === 1 ? 'ring-2 ring-indigo-500 border-indigo-400' : 'border-slate-200/80'
        }`}
      >
        {/* Switcher Header */}
        <div className="flex border-b border-slate-200/80 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            id="tab-option-upload-btn"
            onClick={() => setActiveTabOption('upload')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTabOption === 'upload'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Option A: Upload Exam Result</span>
          </button>

          <button
            id="tab-option-manual-btn"
            onClick={() => setActiveTabOption('manual')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTabOption === 'manual'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Option B: Enter Results Manually</span>
          </button>
        </div>

        {/* Option A: Upload Form */}
        {activeTabOption === 'upload' && (
          <div className="p-6 space-y-5">
            <div
              id="file-upload-dropzone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50'
                  : 'border-slate-200 hover:border-indigo-400 bg-slate-50/30'
              }`}
              onClick={() => document.getElementById('exam-file-input')?.click()}
            >
              <input
                id="exam-file-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.csv"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Supported formats: PDF scorecards, teacher grading sheets, or test response screenshots (PNG, JPG)
              </p>

              {uploadedFile && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Ready for OCR & Diagnostic Parsing</span>
                </div>
              )}
            </div>

            {/* Demo Exam Shortcut */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-indigo-50/70 rounded-xl border border-indigo-100">
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Instant Hackathon Evaluation:</span>
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Click below to immediately populate and diagnose Aarav's BCA Discrete Mathematics exam (30 questions, 21 correct).
                </p>
              </div>

              <button
                id="use-demo-exam-btn"
                onClick={handleUseDemoExam}
                className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use Demo Exam (Auto-Analyze)</span>
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                id="start-file-analysis-btn"
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Exam Data...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Run AI Exam Diagnostic</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Option B: Manual Entry Form */}
        {activeTabOption === 'manual' && (
          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Exam Name / Title</label>
                <input
                  id="manual-exam-name-input"
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  placeholder="e.g. Mid-Term Exam (BCA-102)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Subject</label>
                <select
                  id="manual-subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computer Fundamentals">Computer Fundamentals</option>
                  <option value="Programming in C">Programming in C</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Chapter / Unit</label>
                <input
                  id="manual-chapter-input"
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  placeholder="e.g. Discrete Structures & Boolean Algebra"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Questions Attempted</label>
                <input
                  id="manual-attempted-input"
                  type="number"
                  value={attempted}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    setAttempted(val);
                    setIncorrect(Math.max(0, val - correct));
                  }}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Correct Answers</label>
                <input
                  id="manual-correct-input"
                  type="number"
                  value={correct}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value));
                    setCorrect(val);
                    setIncorrect(Math.max(0, attempted - val));
                  }}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Incorrect Answers</label>
                <input
                  id="manual-incorrect-input"
                  type="number"
                  value={incorrect}
                  onChange={(e) => setIncorrect(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Quick Demo Pre-fill & Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                id="manual-use-demo-btn"
                type="button"
                onClick={handleUseDemoExam}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Analyze Demo Exam &rarr;</span>
              </button>

              <button
                id="start-manual-analysis-btn"
                type="button"
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Performance...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Exam Diagnostic</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Animation States during Analysis */}
      {isAnalyzing && (
        <div
          id="analysis-loading-state"
          className="p-8 bg-indigo-950 text-white rounded-2xl shadow-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Brain className="w-7 h-7 animate-pulse" />
          </div>

          <h3 className="text-base font-bold">ExamLens AI Diagnostic Engine Active</h3>

          <div className="max-w-md mx-auto space-y-2 text-xs">
            <div
              className={`p-2.5 rounded-xl transition-colors ${
                analysisStep >= 1 ? 'bg-indigo-900 text-indigo-200 font-semibold' : 'text-slate-500'
              }`}
            >
              1. Ingesting question response distributions (30 items evaluated)...
            </div>
            <div
              className={`p-2.5 rounded-xl transition-colors ${
                analysisStep >= 2 ? 'bg-indigo-900 text-indigo-200 font-semibold' : 'text-slate-500'
              }`}
            >
              2. Isolating concept error clusters (De Morgan, K-Maps, Logic Gates)...
            </div>
            <div
              className={`p-2.5 rounded-xl transition-colors ${
                analysisStep >= 3 ? 'bg-indigo-900 text-indigo-200 font-semibold' : 'text-slate-500'
              }`}
            >
              3. Synthesizing pedagogic reasoning & generating 7-day remedial roadmap...
            </div>
          </div>
        </div>
      )}

      {/* IMPRESSIVE AI ANALYSIS RESULTS SECTION */}
      {!isAnalyzing && (
        <div
          id="analysis-result-container"
          className={`space-y-6 pt-2 ${
            demoStep === 2 ? 'p-4 rounded-3xl bg-indigo-50/50 border-2 border-indigo-500' : ''
          }`}
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Diagnostic Analysis Result
                </h2>
                <span className="text-xs px-2.5 py-0.5 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                  AI Evaluated
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {examAnalysis.examName} • {examAnalysis.date}
              </p>
            </div>

            <button
              id="generate-study-plan-from-analysis-btn"
              onClick={handleGenerateStudyPlan}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Study Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Overall Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Overall Score</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{examAnalysis.overallScore}%</span>
                <span className="text-xs font-semibold text-slate-400">Scaled Grade</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${examAnalysis.overallScore}%` }}
                />
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Accuracy</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{examAnalysis.accuracy}%</span>
                <span className="text-xs font-semibold text-indigo-600">21 of 30 correct</span>
              </div>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${examAnalysis.accuracy}%` }}
                />
              </div>
            </div>

            {/* Priority Score */}
            <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold text-slate-500">Priority Level</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-600">{examAnalysis.priorityScore}</span>
                <span className="text-xs font-semibold text-rose-600">Action Required</span>
              </div>
              <p className="text-[11px] text-rose-600 font-medium mt-2">
                3 Topics require immediate remediation
              </p>
            </div>
          </div>

          {/* AI Explanation Banner (WHY the student made mistakes) */}
          <div
            id="analysis-ai-explanation-card"
            className="p-5 sm:p-6 rounded-2xl bg-indigo-50/90 border border-indigo-200/80 flex items-start gap-4 shadow-xs"
          >
            <div className="p-3 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5 shadow-md shadow-indigo-600/20">
              <Brain className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  AI Root Cause Diagnostic
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 font-semibold rounded-md">
                  Deductive Reasoning Bottleneck
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-indigo-900 leading-snug">
                "{examAnalysis.aiExplanation}"
              </p>

              <p className="text-xs text-indigo-800/90 leading-relaxed">
                <strong>Why this happened:</strong> Your memory retention of direct definitions and single-step formulas (such as basic AND/OR gates and base-2 arithmetic) is high (82–92%). However, when problems require combining De Morgan's laws with multi-variable truth table inversion, error frequency jumps to 52%. ExamLens AI has targeted this exact friction point in your practice plan.
              </p>
            </div>
          </div>

          {/* 3 Pillars Breakdown: Strong Topics, Weak Topics, Frequently Missed */}
          <div className="grid md:grid-cols-3 gap-5">
            {/* Strong Topics */}
            <div
              id="analysis-strong-topics-card"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Strong Topics
                  </h3>
                </div>

                <div className="space-y-2.5 mt-3">
                  {examAnalysis.strongTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-emerald-950">{topic}</span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        Mastered
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                Safe to deprioritize during daily study sessions.
              </p>
            </div>

            {/* Weak Topics */}
            <div
              id="analysis-weak-topics-card"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    Weak Topics
                  </h3>
                </div>

                <div className="space-y-2.5 mt-3">
                  {examAnalysis.weakTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigateTo('practice', topic)}
                      className="p-3 bg-rose-50/60 hover:bg-rose-100/60 cursor-pointer rounded-xl border border-rose-100 flex items-center justify-between transition-colors group"
                    >
                      <span className="text-xs font-bold text-rose-950">{topic}</span>
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        Practice &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-rose-600 font-medium mt-4 pt-3 border-t border-slate-100">
                Accounts for 78% of marks lost on this paper.
              </p>
            </div>

            {/* Frequently Missed Concepts */}
            <div
              id="analysis-missed-concepts-card"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Frequently Missed
                  </h3>
                </div>

                <div className="space-y-2.5 mt-3">
                  {examAnalysis.frequentlyMissed.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-50/60 rounded-xl border border-amber-100"
                    >
                      <p className="text-xs font-bold text-amber-950">{concept}</p>
                      <p className="text-[10px] text-amber-800 mt-0.5">Recurring trap in university exams</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                Directly targeted with concept cards in Practice Mode.
              </p>
            </div>
          </div>

          {/* Granular Chapter Concept Gaps Breakdown */}
          {examAnalysis.topicBreakdown && examAnalysis.topicBreakdown.length > 0 && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Granular Chapter Gap Breakdown
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Specific sub-skills isolated by the ExamLens AI knowledge graph
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                {examAnalysis.topicBreakdown.slice(0, 3).map((item, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">{item.topic}</p>
                      <span className="text-xs font-extrabold text-rose-600">{item.score}%</span>
                    </div>

                    <div className="mt-2.5 space-y-1">
                      {item.conceptGaps.map((gap, gIdx) => (
                        <div key={gIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="truncate">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Turn these diagnostics into a 7-day turnaround
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                ExamLens AI will automatically slot high-priority weak topics into your daily study schedule.
              </p>
            </div>
            <button
              id="generate-my-study-plan-cta-btn"
              onClick={handleGenerateStudyPlan}
              className="shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Study Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
