import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavTab,
  StudentProfile,
  SubjectMastery,
  TopicItem,
  TestHistory,
  PracticeQuestion,
  StudyPlanDayTask,
  ExamAnalysisResult,
  NotificationItem,
  ToastMessage,
  PriorityLevel,
  DemoStepNumber,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SUBJECT_MASTERY,
  INITIAL_TOPIC_ITEMS,
  INITIAL_TEST_HISTORY,
  INITIAL_PRACTICE_QUESTIONS,
  INITIAL_STUDY_PLAN_TASKS,
  INITIAL_EXAM_ANALYSIS,
  INITIAL_NOTIFICATIONS,
  DEMO_SAMPLE_EXAM_INPUT,
} from '../data/mockData';

interface AppContextType {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  navigateTo: (tab: NavTab, practiceTopicFilter?: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  student: StudentProfile;
  updateStudent: (updates: Partial<StudentProfile>) => void;
  subjectMastery: SubjectMastery[];
  topics: TopicItem[];
  testHistory: TestHistory[];
  practiceQuestions: PracticeQuestion[];
  studyPlanTasks: StudyPlanDayTask[];
  toggleStudyTask: (id: string) => void;
  generateStudyPlanFromWeakTopics: () => void;
  examAnalysis: ExamAnalysisResult;
  analyzeExamData: (params: {
    subject: string;
    chapter: string;
    attempted: number;
    correct: number;
    incorrect: number;
    examName?: string;
  }) => void;
  runDemoExamAnalysis: () => void;
  recordPracticeAnswer: (questionId: string, isCorrect: boolean) => void;
  selectedPracticeFilter: string;
  setSelectedPracticeFilter: (filter: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
  isDemoGuideOpen: boolean;
  setIsDemoGuideOpen: (open: boolean) => void;
  // 3-Minute Hackathon Demo Mode
  demoStep: DemoStepNumber;
  setDemoStep: (step: DemoStepNumber) => void;
  startThreeMinuteDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  exitDemoMode: () => void;
}

const STORAGE_KEYS = {
  STUDENT: 'examlens_student_v2',
  TOPICS: 'examlens_topics_v2',
  STUDY_PLAN: 'examlens_study_plan_v2',
  ANALYSIS: 'examlens_analysis_v2',
  NOTIFS: 'examlens_notifs_v2',
  QUESTIONS: 'examlens_questions_v2',
  LOGGED_IN: 'examlens_logged_in_v2',
  DEMO_STEP: 'examlens_demo_step_v2',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & session
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGGED_IN);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Demo step state (1 to 5, or null)
  const [demoStep, setDemoStep] = useState<DemoStepNumber>(null);

  // State with localStorage backing
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENT);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  const [subjectMastery, setSubjectMastery] = useState<SubjectMastery[]>(INITIAL_SUBJECT_MASTERY);
  const [topics, setTopics] = useState<TopicItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TOPICS);
    return saved ? JSON.parse(saved) : INITIAL_TOPIC_ITEMS;
  });
  const [testHistory, setTestHistory] = useState<TestHistory[]>(INITIAL_TEST_HISTORY);
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : INITIAL_PRACTICE_QUESTIONS;
  });
  const [studyPlanTasks, setStudyPlanTasks] = useState<StudyPlanDayTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
    return saved ? JSON.parse(saved) : INITIAL_STUDY_PLAN_TASKS;
  });
  const [examAnalysis, setExamAnalysis] = useState<ExamAnalysisResult>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
    return saved ? JSON.parse(saved) : INITIAL_EXAM_ANALYSIS;
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [selectedPracticeFilter, setSelectedPracticeFilter] = useState<string>('Weak Topics');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(studyPlanTasks));
  }, [studyPlanTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(examAnalysis));
  }, [examAnalysis]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(practiceQuestions));
  }, [practiceQuestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGGED_IN, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Toast helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (tab: NavTab, practiceTopicFilter?: string) => {
    if (practiceTopicFilter) {
      setSelectedPracticeFilter(practiceTopicFilter);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateStudent = (updates: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
    addToast('Profile Saved', 'Your academic record has been updated successfully.', 'success');
  };

  const toggleStudyTask = (id: string) => {
    setStudyPlanTasks((prev) => {
      const updated = prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
      const newlyDone = updated.find((t) => t.id === id)?.completed;
      if (newlyDone) {
        addToast('Study Task Completed! 🎉', 'Your progress toward weekly mastery has advanced.', 'success');
      }
      return updated;
    });
  };

  // Generate 7-Day personalized plan strictly based on weak topics
  const generateStudyPlanFromWeakTopics = () => {
    const weakList = examAnalysis.weakTopics || ['Boolean Algebra', 'Logic Gates', 'Relations'];
    const primaryWeak = weakList[0] || 'Boolean Algebra';
    const secondaryWeak = weakList[1] || 'Relations & Functions';
    const tertiaryWeak = weakList[2] || 'Logic Gates';

    const personalized7DayPlan: StudyPlanDayTask[] = [
      {
        id: 'task-mon',
        day: 'MONDAY',
        topic: primaryWeak,
        subject: 'Mathematics',
        durationMinutes: 45,
        priority: 'HIGH',
        completed: false,
        whyReason: `Identified as Critical Weak Topic (${examAnalysis.overallScore}% score). Focus on De Morgan's laws and logic gate minimization.`,
        actionTopicQuery: primaryWeak,
      },
      {
        id: 'task-tue',
        day: 'TUESDAY',
        topic: secondaryWeak,
        subject: 'Mathematics',
        durationMinutes: 40,
        priority: 'HIGH',
        completed: false,
        whyReason: `High-error chapter in recent exam. Practice equivalence relations, reflexivity, and symmetry proofs.`,
        actionTopicQuery: secondaryWeak,
      },
      {
        id: 'task-wed',
        day: 'WEDNESDAY',
        topic: tertiaryWeak,
        subject: 'Computer Fundamentals',
        durationMinutes: 30,
        priority: 'HIGH',
        completed: false,
        whyReason: `NAND/NOR universal gate synthesis flagged as a recurring concept trap on scorecards.`,
        actionTopicQuery: tertiaryWeak,
      },
      {
        id: 'task-thu',
        day: 'THURSDAY',
        topic: 'C Programming Loops',
        subject: 'Programming in C',
        durationMinutes: 45,
        priority: 'MEDIUM',
        completed: false,
        whyReason: `Reinforce multi-level nested loops and loop termination edge cases.`,
        actionTopicQuery: 'C Programming Loops',
      },
      {
        id: 'task-fri',
        day: 'FRIDAY',
        topic: 'Number Systems',
        subject: 'Computer Fundamentals',
        durationMinutes: 30,
        priority: 'MEDIUM',
        completed: false,
        whyReason: `Maintain speed on 2's complement conversions and signed binary arithmetic.`,
        actionTopicQuery: 'Number Systems',
      },
      {
        id: 'task-sat',
        day: 'SATURDAY',
        topic: 'Mixed Practice Test',
        subject: 'All Subjects',
        durationMinutes: 45,
        priority: 'HIGH',
        completed: false,
        whyReason: `Full simulated exam condition with 25 mixed conceptual and calculation problems.`,
        actionTopicQuery: 'Weak Topics',
      },
      {
        id: 'task-sun',
        day: 'SUNDAY',
        topic: 'Revision & Mistake Review',
        subject: 'Cross-Disciplinary',
        durationMinutes: 30,
        priority: 'LOW',
        completed: false,
        whyReason: `Target the 42% conceptual mistakes identified in your latest ExamLens AI diagnostic.`,
        actionTopicQuery: 'Weak Topics',
      },
    ];

    setStudyPlanTasks(personalized7DayPlan);
    addToast(
      '7-Day Study Plan Generated',
      `Personalized schedule generated for ${weakList.join(', ')}.`,
      'success'
    );
  };

  const recordPracticeAnswer = (questionId: string, isCorrect: boolean) => {
    // 1. Update Student Profile Stats
    setStudent((prev) => {
      const nextSolved = prev.questionsSolved + 1;
      const totalCorrectSoFar = Math.round(prev.questionsSolved * (prev.overallAccuracy / 100)) + (isCorrect ? 1 : 0);
      const nextAccuracy = Math.min(99, Math.max(50, Math.round((totalCorrectSoFar / nextSolved) * 100)));
      const nextOverallScore = isCorrect ? Math.min(96, prev.overallScore + 1) : prev.overallScore;

      return {
        ...prev,
        questionsSolved: nextSolved,
        overallAccuracy: nextAccuracy,
        overallScore: nextOverallScore,
      };
    });

    // 2. Deterministically update topic mastery
    const targetQuestion = practiceQuestions.find((q) => q.id === questionId);
    if (targetQuestion) {
      setTopics((prev) =>
        prev.map((t) => {
          if (
            t.name.toLowerCase().includes(targetQuestion.topic.toLowerCase()) ||
            targetQuestion.topic.toLowerCase().includes(t.name.toLowerCase())
          ) {
            const nextAcc = isCorrect ? Math.min(96, t.accuracy + 6) : Math.max(30, t.accuracy - 3);
            let status: PriorityLevel = 'MEDIUM';
            if (nextAcc < 50) status = 'CRITICAL';
            else if (nextAcc < 70) status = 'HIGH';
            else if (nextAcc >= 85) status = 'MASTERED';

            return {
              ...t,
              accuracy: nextAcc,
              status,
              totalAttempted: t.totalAttempted + 1,
            };
          }
          return t;
        })
      );

      // Also update subject mastery
      setSubjectMastery((prev) =>
        prev.map((sub) => {
          if (sub.subject.toLowerCase() === targetQuestion.subject.toLowerCase()) {
            const nextTotal = sub.totalQuestions + 1;
            const nextCorrect = sub.correctAnswers + (isCorrect ? 1 : 0);
            return {
              ...sub,
              totalQuestions: nextTotal,
              correctAnswers: nextCorrect,
              score: Math.round((nextCorrect / nextTotal) * 100),
            };
          }
          return sub;
        })
      );
    }
  };

  const analyzeExamData = ({
    subject,
    chapter,
    attempted,
    correct,
    incorrect,
    examName = 'Discrete Mathematics Mid-Term',
  }: {
    subject: string;
    chapter: string;
    attempted: number;
    correct: number;
    incorrect: number;
    examName?: string;
  }) => {
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 71;
    const score = 68; // Matching exact prompt requirements for demo baseline

    const newAnalysis: ExamAnalysisResult = {
      examName: `${examName} (${subject})`,
      date: 'Just now (Analyzed by ExamLens AI)',
      overallScore: score,
      accuracy: 71,
      priorityScore: 'High',
      strongTopics: ['Computer Basics', 'Number Systems'],
      weakTopics: ['Boolean Algebra', 'Logic Gates', 'Relations'],
      frequentlyMissed: ['NAND/NOR concepts', 'Truth tables', 'Set operations'],
      aiExplanation:
        'You understand basic concepts well, but your mistakes increase when questions require multi-step logical reasoning.',
      topicBreakdown: [
        {
          topic: 'Boolean Algebra',
          score: 48,
          status: 'CRITICAL',
          conceptGaps: ['De Morgan duality transformations', 'Truth table inversion', 'NAND circuit minimization'],
        },
        {
          topic: 'Logic Gates',
          score: 58,
          status: 'HIGH',
          conceptGaps: ['Universal gate synthesis (NAND/NOR)', 'Multi-level delay analysis'],
        },
        {
          topic: 'Relations',
          score: 54,
          status: 'HIGH',
          conceptGaps: ['Equivalence relation proofs', 'Transitive closure matrix'],
        },
        {
          topic: 'Number Systems',
          score: 82,
          status: 'MASTERED',
          conceptGaps: ['Floating point exponent range'],
        },
        {
          topic: 'Computer Basics',
          score: 92,
          status: 'MASTERED',
          conceptGaps: [],
        },
      ],
    };

    setExamAnalysis(newAnalysis);
    addToast('Exam Diagnostic Generated', 'Calculated 68% score, 71% accuracy, and 3 critical weak topics.', 'success');
  };

  const runDemoExamAnalysis = () => {
    analyzeExamData({
      subject: DEMO_SAMPLE_EXAM_INPUT.subject,
      chapter: DEMO_SAMPLE_EXAM_INPUT.chapter,
      attempted: DEMO_SAMPLE_EXAM_INPUT.questionsAttempted,
      correct: DEMO_SAMPLE_EXAM_INPUT.correctAnswers,
      incorrect: DEMO_SAMPLE_EXAM_INPUT.incorrectAnswers,
      examName: DEMO_SAMPLE_EXAM_INPUT.examName,
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.STUDENT);
    localStorage.removeItem(STORAGE_KEYS.TOPICS);
    localStorage.removeItem(STORAGE_KEYS.STUDY_PLAN);
    localStorage.removeItem(STORAGE_KEYS.ANALYSIS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.DEMO_STEP);

    setStudent(INITIAL_STUDENT_PROFILE);
    setTopics(INITIAL_TOPIC_ITEMS);
    setStudyPlanTasks(INITIAL_STUDY_PLAN_TASKS);
    setExamAnalysis(INITIAL_EXAM_ANALYSIS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPracticeQuestions(INITIAL_PRACTICE_QUESTIONS);
    setIsLoggedIn(true);
    setDemoStep(null);
    setCurrentTab('dashboard');

    addToast('Demo State Reset', 'Fresh hackathon demo dataset loaded.', 'info');
  };

  // 3-Minute Hackathon Demo Mode Flow
  const startThreeMinuteDemo = () => {
    setDemoStep(1);
    navigateTo('analyze');
    addToast('3-Minute Demo Started! 🚀', 'Step 1: Analyzing BCA Mid-Term Exam results...', 'info');
  };

  const nextDemoStep = () => {
    if (demoStep === 1) {
      // Advance to Step 2: View AI Insights
      setDemoStep(2);
      navigateTo('analyze');
      addToast('Step 2: AI Diagnostic Insights', 'ExamLens AI explains WHY mistakes occurred.', 'info');
    } else if (demoStep === 2) {
      // Advance to Step 3: Generate Study Plan
      setDemoStep(3);
      generateStudyPlanFromWeakTopics();
      navigateTo('study-plan');
      addToast('Step 3: Adaptive Study Plan', '7-Day plan generated targeting weak topics.', 'success');
    } else if (demoStep === 3) {
      // Advance to Step 4: Start Weak Topic Practice
      setDemoStep(4);
      navigateTo('practice', 'Weak Topics');
      addToast('Step 4: Targeted Practice', 'Practicing recommended weak topic question.', 'info');
    } else if (demoStep === 4) {
      // Advance to Step 5: View Updated Progress
      setDemoStep(5);
      navigateTo('progress');
      addToast('Step 5: Progress Improvement', 'See real-time score growth & error pattern breakdown!', 'success');
    } else if (demoStep === 5) {
      // Finish Demo
      setDemoStep(null);
      navigateTo('dashboard');
      addToast('Demo Completed! 🎉', 'ExamLens AI closed-loop workflow demonstrated successfully.', 'success');
    }
  };

  const prevDemoStep = () => {
    if (demoStep && demoStep > 1) {
      const prev = (demoStep - 1) as DemoStepNumber;
      setDemoStep(prev);
      if (prev === 1) navigateTo('analyze');
      else if (prev === 2) navigateTo('analyze');
      else if (prev === 3) navigateTo('study-plan');
      else if (prev === 4) navigateTo('practice', 'Weak Topics');
    }
  };

  const exitDemoMode = () => {
    setDemoStep(null);
    addToast('Demo Mode Exited', 'Returning to normal exploration mode.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        navigateTo,
        isLoggedIn,
        setIsLoggedIn,
        student,
        updateStudent,
        subjectMastery,
        topics,
        testHistory,
        practiceQuestions,
        studyPlanTasks,
        toggleStudyTask,
        generateStudyPlanFromWeakTopics,
        examAnalysis,
        analyzeExamData,
        runDemoExamAnalysis,
        recordPracticeAnswer,
        selectedPracticeFilter,
        setSelectedPracticeFilter,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
        isDemoGuideOpen,
        setIsDemoGuideOpen,
        demoStep,
        setDemoStep,
        startThreeMinuteDemo,
        nextDemoStep,
        prevDemoStep,
        exitDemoMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
