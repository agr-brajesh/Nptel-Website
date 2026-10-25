import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Shuffle
} from 'lucide-react';
import type { StudentStats, WeekInfo } from '../../types';
import { WEEKS_METADATA } from '../../data/questionsData';
import { StorageService } from '../../services/storageService';

interface DashboardViewProps {
  stats: StudentStats;
  onStartWeek: (weekNumber: number) => void;
  onOpenMockConfig: () => void;
  onOpenPracticeConfig: () => void;
  onNavigate: (view: string) => void;
  onReviewAttempt: (attemptId: string) => void;
}

export const DashboardView = ({
  stats,
  onStartWeek,
  onOpenMockConfig,
  onOpenPracticeConfig,
  onNavigate,
  onReviewAttempt
}: DashboardViewProps) => {
  // Determine next week to practice
  const findNextWeek = () => {
    for (let w = 1; w <= 12; w++) {
      const wStat = StorageService.getWeekStats(w);
      if (!wStat.hasAttempted) {
        return w;
      }
    }
    // If all attempted, recommend the weakest week
    if (stats.weakestWeeks.length > 0) {
      return stats.weakestWeeks[0];
    }
    return 1;
  };

  const nextWeekNumber = findNextWeek();

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* A. Welcome Section */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
            <span>IIT Guwahati</span>
            <span>•</span>
            <span>NPTEL Online Certification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Psychology of Stress, Health and Well-Being
          </h1>
          <p className="text-slate-600 text-sm mt-1.5 max-w-2xl">
            Prepare for your exam with authentic assignment questions across all 12 weeks, realistic mock simulations, and real-time performance diagnostics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => onStartWeek(nextWeekNumber)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            Continue Practicing (Week {nextWeekNumber})
          </button>
        </div>
      </section>

      {/* D. Quick Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('weekly')}
          className="text-left bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
              12 Weeks
            </span>
          </div>
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Weekly Practice
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Focus on one assignment at a time with untimed submission and comprehensive solutions.
          </p>
        </button>

        <button
          onClick={onOpenMockConfig}
          className="text-left bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
              Full Exam
            </span>
          </div>
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Full Mock Test
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate the final NPTEL examination with a live countdown timer and 12-week question blending.
          </p>
        </button>

        <button
          onClick={onOpenPracticeConfig}
          className="text-left bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all hover:shadow-xs group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shuffle className="w-5 h-5" />
            </span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
              Instant
            </span>
          </div>
          <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Random Practice Test
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Get instant right/wrong answers with immediate explanations on every single question.
          </p>
        </button>
      </section>

      {/* B. Progress Overview */}
      <section className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-900">
            Progress Overview
          </h2>
          <button
            onClick={() => onNavigate('performance')}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Detailed Analytics <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Question Bank</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalQuestionsBank}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 12 Weeks</p>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Attempted</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.totalQuestionsAttempted}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {stats.totalQuestionsBank > 0 
                ? `${Math.round((stats.totalQuestionsAttempted / stats.totalQuestionsBank) * 100)}% coverage` 
                : '0%'}
            </p>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Overall Accuracy</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {stats.overallAccuracy > 0 ? `${stats.overallAccuracy}%` : '—'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all tests</p>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Completed Weeks</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stats.completedWeeklyAssignments} / 12</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Weekly assignments</p>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-500 font-medium">Best Mock Exam</p>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {stats.bestMockScore ? `${stats.bestMockScore.percentage}%` : '—'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {stats.bestMockScore 
                ? `${stats.bestMockScore.score}/${stats.bestMockScore.maxScore} marks` 
                : 'Not attempted yet'}
            </p>
          </div>
        </div>
      </section>

      {/* C. Weekly Assignment Overview (All 12 Weeks) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Weekly Assignments
            </h2>
            <p className="text-xs text-slate-500">
              12 weeks of official assignments from IIT Guwahati
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {stats.completedWeeklyAssignments} of 12 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WEEKS_METADATA.map((weekInfo: WeekInfo) => {
            const wStat = StorageService.getWeekStats(weekInfo.week);
            const isCompleted = wStat.hasAttempted;

            return (
              <div
                key={weekInfo.week}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                      Week {weekInfo.week}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Best: {wStat.bestPercentage}%
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">
                        Not attempted
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">
                    {weekInfo.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {weekInfo.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {weekInfo.questionCount} Questions
                  </span>

                  <button
                    onClick={() => onStartWeek(weekInfo.week)}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      isCompleted
                        ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs'
                    }`}
                  >
                    {isCompleted ? 'Practice Again' : 'Start Practice'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity Section */}
      {stats.recentAttempts.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Recent Activity
            </h2>
            <button
              onClick={() => onNavigate('performance')}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              View All History
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.recentAttempts.slice(0, 4).map(attempt => (
              <div
                key={attempt.id}
                className="py-3 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    attempt.percentage >= 75 ? 'bg-emerald-500' : attempt.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900 text-xs sm:text-sm">
                      {attempt.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(attempt.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {attempt.percentage}%
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {attempt.totalScore} / {attempt.maxPossibleScore} marks
                    </p>
                  </div>

                  <button
                    onClick={() => onReviewAttempt(attempt.id)}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 px-2 py-1 rounded-sm hover:bg-indigo-50"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
