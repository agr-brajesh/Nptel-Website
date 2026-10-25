export type QuestionType = 'single_choice' | 'multiple_choice' | 'numerical';

export interface QuestionOption {
  id: string; // 'a', 'b', 'c', 'd'
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  week: number;
  question_number: number;
  text: string;
  type: QuestionType;
  marks: number;
  negative_marks: number;
  options: QuestionOption[];
  correct_answers: string[]; // e.g. ['c']
  explanation: string;
  verified: boolean;
  tolerance?: number; // for numerical
}

export interface WeekInfo {
  week: number;
  title: string;
  description: string;
  icon: string;
  questionCount: number;
}

export type TestMode = 'weekly' | 'full_mock' | 'practice';

export interface TestConfig {
  mode: TestMode;
  weekNumber?: number;
  title: string;
  questionCount: number;
  selectedWeeks: number[]; // e.g. [1, 2, ..., 12]
  durationMinutes: number; // 0 means untimed
  hasNegativeMarking: boolean;
  negativeMarkRate: number; // e.g. 0.25
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  immediateFeedback: boolean; // true for practice mode
}

export interface AttemptAnswer {
  questionId: string;
  selectedAnswers: string[]; // ['a'] or ['12.5']
  isCorrect: boolean;
  marksAwarded: number;
  isSkipped: boolean;
  isMarkedForReview: boolean;
  isChecked?: boolean; // for practice immediate feedback
  timeSpentSeconds: number;
}

export interface TestAttempt {
  id: string;
  mode: TestMode;
  weekNumber?: number;
  title: string;
  totalQuestions: number;
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  timeTakenSeconds: number;
  answers: Record<string, AttemptAnswer>; // key: questionId
  questions: Question[]; // snapshots of questions in attempt order
  timestamp: string; // ISO string
}

export interface ActiveTestState {
  attemptId: string;
  config: TestConfig;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string[]>; // questionId -> selected answer ids
  markedForReview: Record<string, boolean>;
  checkedAnswers: Record<string, boolean>; // for practice mode
  timeRemainingSeconds: number;
  startTime: number;
  isCompleted: boolean;
}

export interface StudentStats {
  totalQuestionsBank: number;
  totalQuestionsAttempted: number;
  overallAccuracy: number;
  completedWeeklyAssignments: number;
  bestMockScore: {
    score: number;
    maxScore: number;
    percentage: number;
    date: string;
  } | null;
  recentAttempts: TestAttempt[];
  weeklyAccuracy: Record<number, { attempted: number; correct: number; percentage: number }>;
  weakestWeeks: number[];
  strongestWeeks: number[];
  frequentlyMissedQuestionIds: { questionId: string; missCount: number }[];
}
