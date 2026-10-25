import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  BarChart2, 
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TestAttempt } from '../../types';

interface TestResultViewProps {
  attempt: TestAttempt;
  onRetake: () => void;
  onReviewMistakesOnly: (mistakeQuestionIds: string[]) => void;
  onReturnDashboard: () => void;
}

export const TestResultView = ({
  attempt,
  onRetake,
  onReviewMistakesOnly,
  onReturnDashboard,
}: TestResultViewProps) => {
  const [filterType, setFilterType] = useState<'all' | 'incorrect' | 'correct' | 'unanswered'>('all');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');

  // Launch confetti if score is >= 80%
  useEffect(() => {
    if (attempt.percentage >= 80) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fail
      }
    }
  }, [attempt.percentage]);

  // Calculate week breakdown (especially for full mock test)
  const weekBreakdown: Record<number, { total: number; correct: number; score: number; maxScore: number }> = {};
  for (let w = 1; w <= 12; w++) {
    weekBreakdown[w] = { total: 0, correct: 0, score: 0, maxScore: 0 };
  }

  attempt.questions.forEach(q => {
    const ans = attempt.answers[q.id];
    const w = q.week;
    if (weekBreakdown[w]) {
      weekBreakdown[w].total += 1;
      weekBreakdown[w].maxScore += q.marks;
      if (ans && ans.isCorrect) {
        weekBreakdown[w].correct += 1;
        weekBreakdown[w].score += ans.marksAwarded;
      }
    }
  });

  const activeWeeks = Object.entries(weekBreakdown)
    .filter(([_, stats]) => stats.total > 0)
    .map(([w, stats]) => ({
      week: Number(w),
      ...stats,
      accuracy: Math.round((stats.correct / stats.total) * 100)
    }));

  // Identify mistake question IDs for the "Review Mistakes Only" button
  const mistakeQuestionIds = attempt.questions
    .filter(q => {
      const ans = attempt.answers[q.id];
      return ans && !ans.isCorrect && !ans.isSkipped;
    })
    .map(q => q.id);

  // Filtered questions for review
  const filteredQuestions = attempt.questions.filter(q => {
    const ans = attempt.answers[q.id];
    const isSkipped = ans ? ans.isSkipped : true;
    const isCorrect = ans ? ans.isCorrect : false;

    if (selectedWeekFilter !== 'all' && q.week !== selectedWeekFilter) {
      return false;
    }

    if (filterType === 'correct') return isCorrect;
    if (filterType === 'incorrect') return !isCorrect && !isSkipped;
    if (filterType === 'unanswered') return isSkipped;
    return true;
  });

  // Format time taken
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Summary Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                {attempt.mode === 'full_mock'
                  ? 'Mock Examination'
                  : attempt.mode === 'weekly'
                  ? `Week ${attempt.weekNumber} Practice`
                  : 'Practice Test'}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(attempt.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {attempt.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onRetake}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Test
            </button>
            <button
              onClick={onReturnDashboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Final Score</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {attempt.totalScore}
              <span className="text-xs font-normal text-slate-400 ml-1">/ {attempt.maxPossibleScore}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Percentage</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {attempt.percentage}%
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-emerald-50/50 border border-emerald-100">
            <p className="text-xs text-emerald-800 font-medium">Correct</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {attempt.correctCount}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-rose-50/50 border border-rose-100">
            <p className="text-xs text-rose-800 font-medium">Incorrect</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">
              {attempt.incorrectCount}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Unanswered</p>
            <p className="text-2xl font-bold text-slate-600 mt-1">
              {attempt.unansweredCount}
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Time Taken</p>
            <p className="text-xl font-bold text-slate-800 mt-1.5 flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              {formatDuration(attempt.timeTakenSeconds)}
            </p>
          </div>
        </div>

        {/* Retake Mistakes Prompt */}
        {mistakeQuestionIds.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/60 p-4 rounded-lg border border-amber-200/60">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-900 font-medium">
                You made {mistakeQuestionIds.length} {mistakeQuestionIds.length === 1 ? 'mistake' : 'mistakes'} in this test. Would you like to practice only these questions?
              </p>
            </div>
            <button
              onClick={() => onReviewMistakesOnly(mistakeQuestionIds)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Practice {mistakeQuestionIds.length} Incorrect Questions
            </button>
          </div>
        )}
      </div>

      {/* Week-by-Week Performance Breakdown (If multi-week mock test) */}
      {activeWeeks.length > 1 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" />
              Performance Breakdown Across All 12 Weeks
            </h2>
            <span className="text-xs text-slate-500">
              Week-by-week accuracy
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {activeWeeks.map(w => (
              <div
                key={w.week}
                className="p-3 rounded-md border border-slate-100 bg-slate-50/60 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">Week {w.week}</span>
                  <span className={`font-bold ${
                    w.accuracy >= 75 ? 'text-emerald-600' : w.accuracy >= 50 ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {w.accuracy}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      w.accuracy >= 75 ? 'bg-emerald-500' : w.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${w.accuracy}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  {w.correct} / {w.total} correct
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question-by-Question Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Detailed Question Review
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredQuestions.length} of {attempt.questions.length} questions
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex rounded-md border border-slate-200 bg-white p-0.5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                  filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({attempt.totalQuestions})
              </button>
              <button
                onClick={() => setFilterType('incorrect')}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                  filterType === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Incorrect ({attempt.incorrectCount})
              </button>
              <button
                onClick={() => setFilterType('correct')}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                  filterType === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({attempt.correctCount})
              </button>
              <button
                onClick={() => setFilterType('unanswered')}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                  filterType === 'unanswered' ? 'bg-slate-700 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unanswered ({attempt.unansweredCount})
              </button>
            </div>

            {/* Filter by Week (if mock) */}
            {activeWeeks.length > 1 && (
              <select
                value={selectedWeekFilter}
                onChange={e => setSelectedWeekFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="text-xs border border-slate-200 bg-white rounded-md px-2.5 py-1 text-slate-700"
              >
                <option value="all">All Weeks</option>
                {activeWeeks.map(w => (
                  <option key={w.week} value={w.week}>
                    Week {w.week}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Questions Review List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const ans = attempt.answers[q.id];
            const isSkipped = !ans || ans.isSkipped;
            const isCorrect = ans && ans.isCorrect;
            const marksAwarded = ans ? ans.marksAwarded : 0;
            const studentSelected = ans ? ans.selectedAnswers : [];

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-slate-900 text-white">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                      Week {q.week}
                    </span>
                    <span className="text-xs text-slate-400">
                      Available: {q.marks} mark
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSkipped ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                        Unanswered (0 marks)
                      </span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct (+{marksAwarded} mark)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-sm bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect ({marksAwarded} marks)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                  {q.text}
                </p>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map(opt => {
                    const isSelected = studentSelected.includes(opt.id);
                    const isOfficialCorrect = opt.is_correct;

                    let optStyle = 'border-slate-200 bg-white text-slate-700';
                    let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

                    if (isOfficialCorrect) {
                      optStyle = 'border-emerald-300 bg-emerald-50/60 text-emerald-950 font-medium';
                      badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isSelected && !isOfficialCorrect) {
                      optStyle = 'border-rose-300 bg-rose-50/60 text-rose-950 line-through';
                      badgeStyle = 'bg-rose-500 text-white border-rose-500';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-md border text-xs sm:text-sm flex items-start gap-3 transition-colors ${optStyle}`}
                      >
                        <span className={`w-5 h-5 shrink-0 rounded-full text-[11px] font-semibold flex items-center justify-center border ${badgeStyle}`}>
                          {opt.id.toUpperCase()}
                        </span>
                        <div className="flex-1 flex items-center justify-between gap-2">
                          <span>{opt.text}</span>
                          <div className="flex items-center gap-1 shrink-0 text-xs">
                            {isOfficialCorrect && (
                              <span className="text-[11px] font-bold text-emerald-700 uppercase">
                                ✓ Correct Answer
                              </span>
                            )}
                            {isSelected && (
                              <span className="text-[11px] font-medium text-slate-500">
                                (Your response)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pedagogical Explanation Box */}
                <div className="mt-3 p-3.5 rounded-md bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Solution Explanation
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-10 bg-white border border-slate-200 rounded-lg">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-900">No questions in this filter view</p>
          </div>
        )}
      </div>
    </div>
  );
};
