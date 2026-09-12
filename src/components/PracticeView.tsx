import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PracticeQuestion } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  HelpCircle,
  Lightbulb,
  Award,
  BookOpen,
  Filter,
  Check,
  TrendingUp,
  Brain,
  Zap,
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const {
    practiceQuestions,
    recordPracticeAnswer,
    selectedPracticeFilter,
    setSelectedPracticeFilter,
    student,
    addToast,
    navigateTo,
    demoStep,
    nextDemoStep,
  } = useApp();

  // Filter questions
  const filteredQuestions = practiceQuestions.filter((q) => {
    if (selectedPracticeFilter === 'Weak Topics') {
      return q.isWeakTopic === true;
    }
    if (selectedPracticeFilter === 'Medium') {
      return q.difficulty === 'Medium';
    }
    if (selectedPracticeFilter === 'Hard') {
      return q.difficulty === 'Hard';
    }
    if (selectedPracticeFilter === 'Boolean Algebra') {
      return q.topic.toLowerCase().includes('boolean');
    }
    if (selectedPracticeFilter === 'Relations & Functions') {
      return q.topic.toLowerCase().includes('relation');
    }
    if (selectedPracticeFilter === 'Logic Gates & Circuits') {
      return q.topic.toLowerCase().includes('gate');
    }
    return true; // 'All Topics'
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  // Reset indices when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
  }, [selectedPracticeFilter]);

  const currentQ: PracticeQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswer(key);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQ || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      setSessionCorrectCount((prev) => prev + 1);
      setSessionStreak((prev) => prev + 1);

      // Trigger celebratory confetti on correct answer
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Fallback gracefully
      }

      addToast('Correct Answer! 🎉', `Progress updated: Overall accuracy recalculated to ${student.overallAccuracy}%.`, 'success');
    } else {
      setSessionStreak(0);
      addToast('Incorrect Answer', 'Review the step-by-step breakdown below to master this concept.', 'warning');
    }

    recordPracticeAnswer(currentQ.id, isCorrect);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
      addToast('Round Completed', 'You have reviewed all questions in this filter.', 'info');
    }
  };

  const filterOptions = [
    { label: '⚠️ Weak Topics (AI Recommended)', key: 'Weak Topics' },
    { label: 'Boolean Algebra', key: 'Boolean Algebra' },
    { label: 'Medium Difficulty', key: 'Medium' },
    { label: 'Hard Difficulty', key: 'Hard' },
    { label: 'All Topics', key: 'All Topics' },
  ];

  if (!currentQ) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-sm font-bold text-slate-700">No questions found for this filter.</p>
        <button
          onClick={() => setSelectedPracticeFilter('All Topics')}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
        >
          View All Questions
        </button>
      </div>
    );
  }

  const isCurrentCorrect = selectedAnswer === currentQ.correctAnswer;
  const correctOptionObject = currentQ.options.find((o) => o.key === currentQ.correctAnswer);

  return (
    <div id="practice-view-root" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Adaptive Practice
            </h1>
            <span className="text-xs px-2.5 py-0.5 font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-full">
              Weak Topic Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Questions algorithmically generated to target your verified exam error patterns.
          </p>
        </div>

        {/* Live Session Counter */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Streak: {sessionStreak}</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="text-xs font-semibold text-slate-600">
            Session Score:{' '}
            <strong className="text-indigo-600">
              {sessionCorrectCount}/{sessionCorrectCount + (isSubmitted && !isCurrentCorrect ? 1 : 0)}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            id={`practice-filter-${opt.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => setSelectedPracticeFilter(opt.key)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedPracticeFilter === opt.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/70'
            }`}
          >
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div
        id="active-practice-question-card"
        className={`bg-white rounded-3xl border shadow-xs overflow-hidden transition-all ${
          demoStep === 4 ? 'ring-2 ring-indigo-500 border-indigo-400' : 'border-slate-200/80'
        }`}
      >
        {/* Card Header Bar */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
            <span className="text-xs font-bold text-slate-600">• {currentQ.subject}</span>
            <span className="text-xs font-medium text-slate-400">({currentQ.topic})</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                currentQ.difficulty === 'Hard'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : currentQ.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {currentQ.difficulty}
            </span>

            {currentQ.isWeakTopic && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100/70 text-rose-800 border border-rose-200 flex items-center gap-1">
                <span>⚠️ Weak Topic Focus</span>
              </span>
            )}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {currentQ.isWeakTopic ? 'AI Targeted Remediation' : 'Concept Practice'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug whitespace-pre-line">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.key;
              const isCorrectOpt = isSubmitted && opt.key === currentQ.correctAnswer;
              const isWrongOpt = isSubmitted && isSelected && !isCorrectOpt;

              let styleClasses = 'border-slate-200 hover:border-indigo-400 bg-white';
              if (isSelected && !isSubmitted) {
                styleClasses = 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500';
              } else if (isCorrectOpt) {
                styleClasses = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500';
              } else if (isWrongOpt) {
                styleClasses = 'border-rose-500 bg-rose-50/70 ring-1 ring-rose-500';
              }

              return (
                <div
                  key={opt.key}
                  id={`practice-option-${opt.key}`}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${styleClasses}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected && !isSubmitted
                          ? 'bg-indigo-600 text-white'
                          : isCorrectOpt
                          ? 'bg-emerald-600 text-white'
                          : isWrongOpt
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {opt.text}
                    </span>
                  </div>

                  {/* Icon indicator */}
                  {isSubmitted && (
                    <div>
                      {isCorrectOpt && (
                        <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Correct Answer</span>
                        </div>
                      )}
                      {isWrongOpt && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button: Submit vs Next */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs text-slate-400">
              {isSubmitted
                ? isCurrentCorrect
                  ? '✅ Correctly solved! Real-time stats updated.'
                  : '❌ Review step-by-step logic below'
                : selectedAnswer
                ? 'Option selected. Click Submit Answer.'
                : 'Select an option to evaluate your answer'}
            </span>

            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <button
                  id="practice-submit-answer-btn"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    id="practice-next-question-btn"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {demoStep === 4 && (
                    <button
                      id="demo-proceed-to-progress-btn"
                      onClick={nextDemoStep}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <span>Step 5: View Progress &rarr;</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* COMPREHENSIVE INSTANT FEEDBACK BANNER (Prompt requirement: instant feedback, correct answer, step-by-step explanation, concept clarification, updated progress) */}
          {isSubmitted && (
            <div
              id="practice-explanation-banner"
              className={`p-6 rounded-2xl border text-left animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-4 shadow-sm ${
                isCurrentCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              {/* 1. Instant Feedback Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  {isCurrentCorrect ? (
                    <div className="p-2 bg-emerald-600 text-white rounded-xl">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-2 bg-rose-600 text-white rounded-xl">
                      <XCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {isCurrentCorrect ? 'Instant Feedback: Correct Answer! 🎉' : 'Instant Feedback: Incorrect Answer'}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {isCurrentCorrect
                        ? 'Mastery progress applied immediately to your profile.'
                        : 'Review the step-by-step resolution to clarify the concept.'}
                    </p>
                  </div>
                </div>

                {/* 2. Correct Answer Callout */}
                <div className="px-3.5 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Correct Answer:</span>
                  <span className="text-xs font-extrabold text-indigo-700">
                    Option {currentQ.correctAnswer}: {correctOptionObject?.text}
                  </span>
                </div>
              </div>

              {/* 3. Step-by-Step Explanation */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-900">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Step-by-Step AI Explanation</span>
                </div>

                <div className="p-3.5 bg-white/90 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed space-y-1.5">
                  <p>{currentQ.explanation}</p>
                </div>
              </div>

              {/* 4. Concept Clarification */}
              <div className="p-3.5 bg-indigo-50/90 rounded-xl border border-indigo-200/80 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950">
                  <span className="font-bold">Concept Clarification: </span>
                  <span>{currentQ.keyTakeaway}</span>
                </div>
              </div>

              {/* 5. Live Progress Updated Banner */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>
                    <strong>Progress Updated:</strong> Questions solved: <strong>{student.questionsSolved}</strong> • Overall Accuracy: <strong>{student.overallAccuracy}%</strong>
                  </span>
                </div>

                <button
                  id="view-updated-progress-shortcut-btn"
                  onClick={() => navigateTo('progress')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Progress Screen &rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Topics Carousel / Shortcut */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Other Weak Topics Scheduled for Practice
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div
            onClick={() => setSelectedPracticeFilter('Boolean Algebra')}
            className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">Boolean Algebra</p>
            <p className="text-[11px] text-rose-600 font-semibold mt-0.5">48% Accuracy • Critical Focus</p>
          </div>
          <div
            onClick={() => setSelectedPracticeFilter('Relations & Functions')}
            className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">Relations & Functions</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">54% Accuracy • High Priority</p>
          </div>
          <div
            onClick={() => setSelectedPracticeFilter('Logic Gates & Circuits')}
            className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">Logic Gates & Circuits</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">58% Accuracy • High Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};
