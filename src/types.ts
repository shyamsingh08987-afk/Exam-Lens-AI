export type NavTab = 'landing' | 'dashboard' | 'analyze' | 'practice' | 'progress' | 'study-plan' | 'profile';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'MASTERED';

export interface StudentProfile {
  name: string;
  course: string;
  semester: number;
  avatarUrl?: string;
  targetExam?: string;
  dailyGoalQuestions: number;
  streakDays: number;
  testsCompleted: number;
  questionsSolved: number;
  overallScore: number;
  overallAccuracy: number;
  topicsMastered: number;
}

export interface SubjectMastery {
  subject: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  color: string;
}

export interface TopicItem {
  id: string;
  subject: string;
  name: string;
  accuracy: number;
  status: PriorityLevel;
  totalAttempted: number;
  mistakeFrequency: string;
  highWeight: boolean;
  reasoning: string;
}

export interface TestHistory {
  id: string;
  title: string;
  date: string;
  subject: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  durationMinutes: number;
}

export interface PracticeQuestion {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyTakeaway: string;
  isWeakTopic?: boolean;
}

export interface StudyPlanDayTask {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  topic: string;
  subject: string;
  durationMinutes: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  completed: boolean;
  whyReason: string;
  actionTopicQuery: string;
}

export interface ExamAnalysisResult {
  examName: string;
  date: string;
  overallScore: number;
  accuracy: number;
  priorityScore: 'High' | 'Critical' | 'Medium' | 'Low';
  strongTopics: string[];
  weakTopics: string[];
  frequentlyMissed: string[];
  aiExplanation: string;
  topicBreakdown: {
    topic: string;
    score: number;
    status: PriorityLevel;
    conceptGaps: string[];
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'improvement' | 'alert' | 'recommendation';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning';
}

export type DemoStepNumber = 1 | 2 | 3 | 4 | 5 | null;
