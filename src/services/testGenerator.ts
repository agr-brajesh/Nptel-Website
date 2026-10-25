import type { Question, QuestionOption, TestConfig } from '../types';
import { StorageService } from './storageService';

// Helper to shuffle array in-place using Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function cloneAndShuffleOptions(q: Question, shouldShuffle: boolean): Question {
  if (!shouldShuffle || q.type === 'numerical' || q.options.length <= 1) {
    return { ...q };
  }

  // Shuffle options while preserving option text & correctness mapping
  const shuffledOptions: QuestionOption[] = shuffle(q.options).map((opt, idx) => {
    const newKey = String.fromCharCode(97 + idx); // 'a', 'b', 'c', 'd'
    return {
      id: newKey,
      text: opt.text,
      is_correct: opt.is_correct
    };
  });

  const correctKeys = shuffledOptions
    .filter(opt => opt.is_correct)
    .map(opt => opt.id);

  return {
    ...q,
    options: shuffledOptions,
    correct_answers: correctKeys
  };
}

export class TestGenerator {
  /**
   * Generates a weekly practice test for a specific week (e.g. Week 1 to 12)
   */
  static generateWeeklyTest(weekNumber: number): { config: TestConfig; questions: Question[] } {
    const allQuestions = StorageService.getQuestions();
    const weekQuestions = allQuestions
      .filter(q => q.week === weekNumber && q.verified)
      .sort((a, b) => a.question_number - b.question_number);

    const config: TestConfig = {
      mode: 'weekly',
      weekNumber,
      title: `Week ${weekNumber} Assignment Practice`,
      questionCount: weekQuestions.length,
      selectedWeeks: [weekNumber],
      durationMinutes: 0, // untimed by default for weekly
      hasNegativeMarking: false,
      negativeMarkRate: 0,
      shuffleQuestions: false,
      shuffleOptions: false,
      immediateFeedback: true
    };

    return { config, questions: weekQuestions };
  }

  /**
   * Generates a full mock test combining questions across all 12 weeks
   * Distributes evenly across weeks if questionCount is less than total
   */
  static generateMockTest(options: {
    questionCount?: number;
    durationMinutes?: number;
    hasNegativeMarking?: boolean;
    negativeMarkRate?: number;
    shuffleOptions?: boolean;
  } = {}): { config: TestConfig; questions: Question[] } {
    const allQuestions = StorageService.getQuestions().filter(q => q.verified);
    const targetCount = Math.min(options.questionCount ?? allQuestions.length, allQuestions.length);
    const shuffleOpts = options.shuffleOptions ?? false;

    // Group by week
    const byWeek: Record<number, Question[]> = {};
    for (let w = 1; w <= 12; w++) {
      byWeek[w] = shuffle(allQuestions.filter(q => q.week === w));
    }

    let selectedQuestions: Question[] = [];

    if (targetCount >= allQuestions.length) {
      // Full mock: all eligible questions exactly once, randomized order
      selectedQuestions = shuffle(allQuestions);
    } else {
      // Distribute evenly across 12 weeks
      const perWeek = Math.floor(targetCount / 12);
      let remainder = targetCount % 12;

      for (let w = 1; w <= 12; w++) {
        const take = perWeek + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
        const weekSet = byWeek[w] || [];
        selectedQuestions.push(...weekSet.slice(0, take));
      }

      // If still short, backfill from remaining
      if (selectedQuestions.length < targetCount) {
        const currentIds = new Set(selectedQuestions.map(q => q.id));
        const remaining = allQuestions.filter(q => !currentIds.has(q.id));
        selectedQuestions.push(...shuffle(remaining).slice(0, targetCount - selectedQuestions.length));
      }

      selectedQuestions = shuffle(selectedQuestions);
    }

    // Apply option shuffling if requested
    const finalQuestions = selectedQuestions.map(q => cloneAndShuffleOptions(q, shuffleOpts));

    const config: TestConfig = {
      mode: 'full_mock',
      title: `Full 12-Week NPTEL Mock Examination (${finalQuestions.length} Questions)`,
      questionCount: finalQuestions.length,
      selectedWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      durationMinutes: options.durationMinutes ?? (finalQuestions.length <= 30 ? 45 : 90),
      hasNegativeMarking: options.hasNegativeMarking ?? false,
      negativeMarkRate: options.negativeMarkRate ?? 0.25,
      shuffleQuestions: true,
      shuffleOptions: shuffleOpts,
      immediateFeedback: false
    };

    return { config, questions: finalQuestions };
  }

  /**
   * Generates a randomized practice test with immediate feedback
   */
  static generatePracticeTest(options: {
    questionCount?: number;
    selectedWeeks?: number[];
    durationMinutes?: number;
  } = {}): { config: TestConfig; questions: Question[] } {
    const allQuestions = StorageService.getQuestions().filter(q => q.verified);
    const selectedWeeks = options.selectedWeeks && options.selectedWeeks.length > 0
      ? options.selectedWeeks
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const pool = allQuestions.filter(q => selectedWeeks.includes(q.week));
    const targetCount = Math.min(options.questionCount ?? 20, pool.length);

    const shuffled = shuffle(pool).slice(0, targetCount);

    const config: TestConfig = {
      mode: 'practice',
      title: `Randomized Practice Test (${shuffled.length} Questions)`,
      questionCount: shuffled.length,
      selectedWeeks,
      durationMinutes: options.durationMinutes ?? 0, // untimed default
      hasNegativeMarking: false,
      negativeMarkRate: 0,
      shuffleQuestions: true,
      shuffleOptions: false,
      immediateFeedback: true
    };

    return { config, questions: shuffled };
  }

  /**
   * Generates a practice test specifically for reviewing missed questions
   */
  static generateMistakeTest(questionIds: string[]): { config: TestConfig; questions: Question[] } {
    const allQuestions = StorageService.getQuestions();
    const pool = allQuestions.filter(q => questionIds.includes(q.id));
    const shuffled = shuffle(pool);

    const config: TestConfig = {
      mode: 'practice',
      title: `Mistake Bank Practice (${shuffled.length} Questions)`,
      questionCount: shuffled.length,
      selectedWeeks: Array.from(new Set(shuffled.map(q => q.week))),
      durationMinutes: 0,
      hasNegativeMarking: false,
      negativeMarkRate: 0,
      shuffleQuestions: true,
      shuffleOptions: false,
      immediateFeedback: true
    };

    return { config, questions: shuffled };
  }
}
