import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Trash2, 
  Award
} from 'lucide-react';
import type { StudentStats } from '../../types';
import { WEEKS_METADATA } from '../../data/questionsData';
import { StorageService } from '../../services/storageService';

interface PerformanceViewProps {
  stats: StudentStats;
  onStartWeek: (weekNumber: number) => void;
  onReviewAttempt: (attemptId: string) => void;
  onPracticeMistakes: (questionIds: string[]) => void;
  onRefreshStats: () => void;
}

export const PerformanceView = ({
  stats,
  onStartWeek,
  onReviewAttempt,
  onPracticeMistakes,
  onRefreshStats,
}: PerformanceViewProps) => {
  const attempts = StorageService.getAttempts();
  const allQuestions = StorageService.getQuestions();

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your test attempt history? This will reset all your performance statistics.')) {
      StorageService.clearAllAttempts();
      onRefreshStats();
    }
  };

  const handlePracticeWeakWeek = (weekNumber: number) => {
    onStartWeek(weekNumber);
  };

  // If no attempts at all, display a clean empty state encouraging practice
  if (attempts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">
          No Attempt History Yet
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Your diagnostic analytics, weekly scores, weak-area identification, and mistake bank will appear here as soon as you practice your first assignment or mock exam.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => onStartWeek(1)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition-colors"
          >
            Start Week 1 Practice
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header & Overall Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Performance & Progress Diagnostics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Empirical breakdown of your accuracy across all 12 weeks, weakest topics, and mistake bank.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-md border border-rose-200 self-start sm:self-auto flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Reset History
        </button>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="text-xs text-slate-500 font-medium">Overall Accuracy</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.overallAccuracy}%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all completed tests</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="text-xs text-slate-500 font-medium">Questions Attempted</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {stats.totalQuestionsAttempted} / {stats.totalQuestionsBank}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {Math.round((stats.totalQuestionsAttempted / stats.totalQuestionsBank) * 100)}% bank coverage
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="text-xs text-slate-500 font-medium">Weekly Assignments</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {stats.completedWeeklyAssignments} / 12
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Completed at least once</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="text-xs text-slate-500 font-medium">Best Mock Exam</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {stats.bestMockScore ? `${stats.bestMockScore.percentage}%` : '—'}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {stats.bestMockScore ? `${stats.bestMockScore.score} marks` : 'No mock attempted'}
          </p>
        </div>
      </div>

      {/* Weak Areas vs Strong Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Weak Areas (Targeted Practice)
            </h2>
            <span className="text-xs text-slate-400">&lt;65% Accuracy</span>
          </div>

          {stats.weakestWeeks.length > 0 ? (
            <div className="space-y-3">
              {stats.weakestWeeks.map(w => {
                const meta = WEEKS_METADATA.find(m => m.week === w);
                const acc = stats.weeklyAccuracy[w]?.percentage || 0;
                return (
                  <div
                    key={w}
                    className="p-3.5 rounded-lg border border-rose-200/60 bg-rose-50/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-rose-700">Week {w}</span>
                        <span className="text-xs font-semibold text-rose-600">{acc}% accuracy</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-0.5">{meta?.title}</p>
                    </div>

                    <button
                      onClick={() => handlePracticeWeakWeek(w)}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-rose-600 text-white hover:bg-rose-700 transition-colors shrink-0"
                    >
                      Practice Week {w}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
              No identified weak areas! Either all attempted weeks are ≥ 65% or you haven't attempted enough questions yet.
            </div>
          )}
        </div>

        {/* Strong Areas */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              Strong Areas
            </h2>
            <span className="text-xs text-slate-400">≥75% Accuracy</span>
          </div>

          {stats.strongestWeeks.length > 0 ? (
            <div className="space-y-3">
              {stats.strongestWeeks.map(w => {
                const meta = WEEKS_METADATA.find(m => m.week === w);
                const acc = stats.weeklyAccuracy[w]?.percentage || 0;
                return (
                  <div
                    key={w}
                    className="p-3.5 rounded-lg border border-emerald-200/60 bg-emerald-50/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700">Week {w}</span>
                        <span className="text-xs font-semibold text-emerald-600">{acc}% accuracy</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium mt-0.5">{meta?.title}</p>
                    </div>

                    <span className="text-xs font-medium text-emerald-700 bg-emerald-100/70 px-2 py-1 rounded-sm">
                      Mastered
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-slate-500 text-xs">
              Attempt more weekly assignments to discover your top-performing subjects.
            </div>
          )}
        </div>
      </div>

      {/* 12-Week Accuracy Bar Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Weekly Accuracy Breakdown (All 12 Weeks)
          </h2>
          <span className="text-xs text-slate-400">Accuracy % per week</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {WEEKS_METADATA.map(m => {
            const wData = stats.weeklyAccuracy[m.week] || { attempted: 0, correct: 0, percentage: 0 };
            const hasData = wData.attempted > 0;

            return (
              <div
                key={m.week}
                className="p-3 rounded-md border border-slate-100 bg-slate-50/50 space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-800">Week {m.week}</span>
                  <span className="font-bold text-slate-700">
                    {hasData ? `${wData.percentage}%` : '—'}
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      wData.percentage >= 75
                        ? 'bg-emerald-500'
                        : wData.percentage >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${hasData ? wData.percentage : 0}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{wData.correct}/{wData.attempted} correct</span>
                  <button
                    onClick={() => onStartWeek(m.week)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Practice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mistake Bank: Frequently Missed Questions */}
      {stats.frequentlyMissedQuestionIds.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Mistake Bank ({stats.frequentlyMissedQuestionIds.length} Missed Questions)
              </h2>
              <p className="text-xs text-slate-500">
                Questions you have answered incorrectly in previous attempts.
              </p>
            </div>

            <button
              onClick={() => onPracticeMistakes(stats.frequentlyMissedQuestionIds.map(m => m.questionId))}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Practice All Missed Questions
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.frequentlyMissedQuestionIds.map(({ questionId, missCount }) => {
              const q = allQuestions.find(item => item.id === questionId);
              if (!q) return null;

              return (
                <div key={questionId} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                        Week {q.week}
                      </span>
                      <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                        Missed {missCount} {missCount === 1 ? 'time' : 'times'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 line-clamp-2">
                      {q.text}
                    </p>
                  </div>

                  <button
                    onClick={() => onPracticeMistakes([q.id])}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 shrink-0 px-2.5 py-1 rounded-md border border-indigo-200 hover:bg-indigo-50"
                  >
                    Retry Q
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Complete Attempt History Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Complete Test Attempt History ({attempts.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Test Title</th>
                <th className="py-2.5 px-3">Mode</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Percentage</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {attempts.map(att => (
                <tr key={att.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                    {new Date(att.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 max-w-xs truncate">
                    {att.title}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-xs bg-slate-100 text-slate-600 text-[11px] uppercase">
                      {att.mode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                    {att.totalScore} / {att.maxPossibleScore}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`font-semibold ${
                      att.percentage >= 75 ? 'text-emerald-600' : att.percentage >= 50 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {att.percentage}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {Math.floor(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onReviewAttempt(att.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
