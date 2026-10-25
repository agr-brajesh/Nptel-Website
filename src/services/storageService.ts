import type { Question, TestAttempt, ActiveTestState, StudentStats } from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';

const QUESTIONS_KEY = 'nptel_question_bank_v1';
const ATTEMPTS_KEY = 'nptel_test_attempts_v1';
const ACTIVE_TEST_KEY = 'nptel_active_test_v1';

export class StorageService {
  // QUESTIONS MANAGEMENT
  static getQuestions(): Question[] {
    try {
      const stored = localStorage.getItem(QUESTIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read questions from localStorage:', e);
    }
    // Default to the 96 extracted questions
    return QUESTIONS_DATA;
  }

  static saveQuestions(questions: Question[]): void {
    try {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save questions to localStorage:', e);
    }
  }

  static addQuestion(question: Question): Question[] {
    const questions = this.getQuestions();
    const updated = [question, ...questions];
    this.saveQuestions(updated);
    return updated;
  }

  static updateQuestion(updatedQuestion: Question): Question[] {
    const questions = this.getQuestions();
    const idx = questions.findIndex(q => q.id === updatedQuestion.id);
    if (idx !== -1) {
      questions[idx] = updatedQuestion;
      this.saveQuestions(questions);
    }
    return questions;
  }

  static deleteQuestion(questionId: string): Question[] {
    const questions = this.getQuestions();
    const filtered = questions.filter(q => q.id !== questionId);
    this.saveQuestions(filtered);
    return filtered;
  }

  static resetQuestionsToDefault(): Question[] {
    this.saveQuestions(QUESTIONS_DATA);
    return QUESTIONS_DATA;
  }

  // ATTEMPTS MANAGEMENT
  static getAttempts(): TestAttempt[] {
    try {
      const stored = localStorage.getItem(ATTEMPTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read attempts from localStorage:', e);
    }
    return [];
  }

  static saveAttempt(attempt: TestAttempt): void {
    try {
      const attempts = this.getAttempts();
      const updated = [attempt, ...attempts];
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save attempt to localStorage:', e);
    }
  }

  static deleteAttempt(id: string): TestAttempt[] {
    try {
      const attempts = this.getAttempts().filter(a => a.id !== id);
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
      return attempts;
    } catch (e) {
      console.error('Failed to delete attempt:', e);
      return this.getAttempts();
    }
  }

  static clearAllAttempts(): void {
    try {
      localStorage.removeItem(ATTEMPTS_KEY);
      localStorage.removeItem(ACTIVE_TEST_KEY);
    } catch (e) {
      console.error('Failed to clear attempts:', e);
    }
  }

  // ACTIVE IN-PROGRESS TEST STATE (REFRESH PROTECTION)
  static getActiveTestState(): ActiveTestState | null {
    try {
      const stored = localStorage.getItem(ACTIVE_TEST_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read active test state:', e);
    }
    return null;
  }

  static saveActiveTestState(state: ActiveTestState | null): void {
    try {
      if (state) {
        localStorage.setItem(ACTIVE_TEST_KEY, JSON.stringify(state));
      } else {
        localStorage.removeItem(ACTIVE_TEST_KEY);
      }
    } catch (e) {
      console.error('Failed to save active test state:', e);
    }
  }

  static clearActiveTestState(): void {
    this.saveActiveTestState(null);
  }


  // AGGREGATE PERFORMANCE ANALYTICS
  static getStudentStats(): StudentStats {
    const questions = this.getQuestions();
    const attempts = this.getAttempts();

    const attemptedQuestionIds = new Set<string>();
    let totalScoreSum = 0;
    let totalMaxScoreSum = 0;
    let bestMock: StudentStats['bestMockScore'] = null;

    const weeklyAccuracy: Record<number, { attempted: number; correct: number; percentage: number }> = {};
    for (let w = 1; w <= 12; w++) {
      weeklyAccuracy[w] = { attempted: 0, correct: 0, percentage: 0 };
    }

    const questionMissCounts: Record<string, number> = {};

    attempts.forEach(attempt => {
      // Mock stats
      if (attempt.mode === 'full_mock') {
        if (!bestMock || attempt.percentage > bestMock.percentage) {
          bestMock = {
            score: attempt.totalScore,
            maxScore: attempt.maxPossibleScore,
            percentage: attempt.percentage,
            date: attempt.timestamp
          };
        }
      }

      totalScoreSum += attempt.totalScore;
      totalMaxScoreSum += attempt.maxPossibleScore;

      // Track individual answers
      Object.entries(attempt.answers).forEach(([qId, ans]) => {
        attemptedQuestionIds.add(qId);
        const q = questions.find(item => item.id === qId);
        const w = q?.week;

        if (w && weeklyAccuracy[w]) {
          weeklyAccuracy[w].attempted += 1;
          if (ans.isCorrect) {
            weeklyAccuracy[w].correct += 1;
          }
        }

        if (!ans.isCorrect && !ans.isSkipped) {
          questionMissCounts[qId] = (questionMissCounts[qId] || 0) + 1;
        }
      });
    });

    // Compute weekly percentages
    for (let w = 1; w <= 12; w++) {
      const data = weeklyAccuracy[w];
      if (data.attempted > 0) {
        data.percentage = Math.round((data.correct / data.attempted) * 100);
      }
    }

    // Identify completed weekly assignments
    const completedWeeks = new Set<number>();
    attempts
      .filter(a => a.mode === 'weekly' && a.weekNumber)
      .forEach(a => {
        if (a.weekNumber) completedWeeks.add(a.weekNumber);
      });

    // Weakest and strongest weeks (only among weeks attempted)
    const evaluatedWeeks = Object.entries(weeklyAccuracy)
      .filter(([_, stats]) => stats.attempted >= 3)
      .map(([w, stats]) => ({ week: Number(w), percentage: stats.percentage }));

    evaluatedWeeks.sort((a, b) => a.percentage - b.percentage);

    const weakestWeeks = evaluatedWeeks
      .filter(w => w.percentage < 65)
      .map(w => w.week)
      .slice(0, 3);

    const strongestWeeks = evaluatedWeeks
      .filter(w => w.percentage >= 75)
      .map(w => w.week)
      .reverse()
      .slice(0, 3);

    const overallAccuracy =
      totalMaxScoreSum > 0 ? Math.round((totalScoreSum / totalMaxScoreSum) * 100) : 0;

    const frequentlyMissedQuestionIds = Object.entries(questionMissCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([questionId, missCount]) => ({ questionId, missCount }))
      .slice(0, 10);

    return {
      totalQuestionsBank: questions.length,
      totalQuestionsAttempted: attemptedQuestionIds.size,
      overallAccuracy,
      completedWeeklyAssignments: completedWeeks.size,
      bestMockScore: bestMock,
      recentAttempts: attempts.slice(0, 8),
      weeklyAccuracy,
      weakestWeeks,
      strongestWeeks,
      frequentlyMissedQuestionIds
    };
  }

  // WEEK STATS HELPER
  static getWeekStats(weekNumber: number) {
    const attempts = this.getAttempts().filter(
      a => a.mode === 'weekly' && a.weekNumber === weekNumber
    );

    if (attempts.length === 0) {
      return {
        hasAttempted: false,
        attemptsCount: 0,
        bestScore: 0,
        maxScore: 8,
        bestPercentage: 0,
        lastAttemptDate: null,
        lastAttemptId: null
      };
    }

    let bestScore = 0;
    let maxScore = 8;
    let bestPercentage = 0;

    attempts.forEach(a => {
      if (a.percentage > bestPercentage) {
        bestPercentage = a.percentage;
        bestScore = a.totalScore;
        maxScore = a.maxPossibleScore;
      }
    });

    return {
      hasAttempted: true,
      attemptsCount: attempts.length,
      bestScore,
      maxScore,
      bestPercentage,
      lastAttemptDate: attempts[0].timestamp,
      lastAttemptId: attempts[0].id
    };
  }
}
