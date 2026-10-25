import type { Question, AttemptAnswer, TestConfig, TestAttempt } from '../types';

export interface ScoringScheme {
  correctMarks: number;
  incorrectMarksDeduction: number;
  unansweredMarks: number;
  allowPartialCredit: boolean;
}

export function evaluateQuestionAnswer(
  question: Question,
  selectedAnswers: string[] = [],
  scheme?: ScoringScheme
): { isCorrect: boolean; marksAwarded: number; isSkipped: boolean } {
  // If no answer selected or empty string
  const cleanAnswers = selectedAnswers
    .map(a => a.trim().toLowerCase())
    .filter(a => a.length > 0);

  if (cleanAnswers.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: scheme?.unansweredMarks ?? 0,
      isSkipped: true
    };
  }

  const marksAvailable = scheme?.correctMarks ?? question.marks ?? 1;
  const negativeMark = scheme?.incorrectMarksDeduction ?? question.negative_marks ?? 0;

  // 1. Single Choice Question
  if (question.type === 'single_choice') {
    const studentChoice = cleanAnswers[0];
    const correctChoice = question.correct_answers[0]?.toLowerCase();

    if (studentChoice === correctChoice) {
      return { isCorrect: true, marksAwarded: marksAvailable, isSkipped: false };
    } else {
      return { isCorrect: false, marksAwarded: -Math.abs(negativeMark), isSkipped: false };
    }
  }

  // 2. Numerical Question
  if (question.type === 'numerical') {
    const studentVal = parseFloat(cleanAnswers[0]);
    const correctVal = parseFloat(question.correct_answers[0]);
    const tolerance = question.tolerance ?? 0.01;

    if (!isNaN(studentVal) && !isNaN(correctVal)) {
      if (Math.abs(studentVal - correctVal) <= tolerance) {
        return { isCorrect: true, marksAwarded: marksAvailable, isSkipped: false };
      }
    }
    return { isCorrect: false, marksAwarded: -Math.abs(negativeMark), isSkipped: false };
  }

  // 3. Multiple Choice Question
  if (question.type === 'multiple_choice') {
    const correctSet = new Set(question.correct_answers.map(a => a.toLowerCase()));
    const studentSet = new Set(cleanAnswers);

    // Exact match:
    const isExactMatch =
      correctSet.size === studentSet.size &&
      [...studentSet].every(item => correctSet.has(item));

    if (isExactMatch) {
      return { isCorrect: true, marksAwarded: marksAvailable, isSkipped: false };
    }

    if (scheme?.allowPartialCredit && correctSet.size > 1) {
      let correctSelected = 0;
      let wrongSelected = 0;

      studentSet.forEach(item => {
        if (correctSet.has(item)) {
          correctSelected += 1;
        } else {
          wrongSelected += 1;
        }
      });

      if (wrongSelected === 0 && correctSelected > 0) {
        const partialMark = Number(((correctSelected / correctSet.size) * marksAvailable).toFixed(2));
        return { isCorrect: false, marksAwarded: partialMark, isSkipped: false };
      }
    }

    return { isCorrect: false, marksAwarded: -Math.abs(negativeMark), isSkipped: false };
  }

  return { isCorrect: false, marksAwarded: 0, isSkipped: false };
}

export function computeAttemptSummary(
  questions: Question[],
  selectedAnswersMap: Record<string, string[]>,
  config: TestConfig,
  timeTakenSeconds: number,
  markedForReviewMap: Record<string, boolean> = {},
  attemptId?: string
): TestAttempt {
  const scheme: ScoringScheme = {
    correctMarks: 1.0,
    incorrectMarksDeduction: config.hasNegativeMarking ? config.negativeMarkRate : 0.0,
    unansweredMarks: 0.0,
    allowPartialCredit: true
  };

  const answersRecord: Record<string, AttemptAnswer> = {};
  let totalScore = 0;
  let maxPossibleScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const studentSelected = selectedAnswersMap[q.id] || [];
    const evaluation = evaluateQuestionAnswer(q, studentSelected, scheme);
    const qMarks = q.marks || 1;
    maxPossibleScore += qMarks;

    if (evaluation.isSkipped) {
      unansweredCount += 1;
    } else if (evaluation.isCorrect) {
      correctCount += 1;
      totalScore += evaluation.marksAwarded;
    } else {
      incorrectCount += 1;
      totalScore += evaluation.marksAwarded; // can be negative if negative marking enabled
    }

    answersRecord[q.id] = {
      questionId: q.id,
      selectedAnswers: studentSelected,
      isCorrect: evaluation.isCorrect,
      marksAwarded: evaluation.marksAwarded,
      isSkipped: evaluation.isSkipped,
      isMarkedForReview: !!markedForReviewMap[q.id],
      timeSpentSeconds: 0
    };
  });

  // Score cannot fall below 0 in overall display if standard floor applies
  const finalScore = Math.max(0, Number(totalScore.toFixed(2)));
  const percentage = maxPossibleScore > 0 ? Number(((finalScore / maxPossibleScore) * 100).toFixed(1)) : 0;

  return {
    id: attemptId || `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    mode: config.mode,
    weekNumber: config.weekNumber,
    title: config.title,
    totalQuestions: questions.length,
    totalScore: finalScore,
    maxPossibleScore,
    percentage,
    correctCount,
    incorrectCount,
    unansweredCount,
    timeTakenSeconds,
    answers: answersRecord,
    questions,
    timestamp: new Date().toISOString()
  };
}
