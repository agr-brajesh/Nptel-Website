import { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  RotateCcw
} from 'lucide-react';
import { WEEKS_METADATA } from '../../data/questionsData';
import { StorageService } from '../../services/storageService';
import type { WeekInfo } from '../../types';

interface WeeklyAssignmentsViewProps {
  onStartWeek: (weekNumber: number) => void;
  onReviewAttempt?: (attemptId: string) => void;
}

export const WeeklyAssignmentsView = ({
  onStartWeek,
  onReviewAttempt,
}: WeeklyAssignmentsViewProps) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredWeeks = WEEKS_METADATA.filter(weekInfo => {
    const stats = StorageService.getWeekStats(weekInfo.week);
    if (filter === 'completed') return stats.hasAttempted;
    if (filter === 'pending') return !stats.hasAttempted;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Weekly Assignments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete, authentic 12-week assignment question sets from IIT Guwahati. Practice individually and review solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="inline-flex rounded-md border border-slate-200 bg-white p-1 self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Weeks (12)
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
              filter === 'completed'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
              filter === 'pending'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Week Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWeeks.map((weekInfo: WeekInfo) => {
          const stats = StorageService.getWeekStats(weekInfo.week);
          const isCompleted = stats.hasAttempted;

          return (
            <div
              key={weekInfo.week}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                    Week {weekInfo.week}
                  </span>

                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Best: {stats.bestPercentage}% ({stats.bestScore}/{stats.maxScore})
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Not attempted
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {weekInfo.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {weekInfo.description}
                </p>

                {stats.lastAttemptDate && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-3">
                    <Clock className="w-3 h-3" />
                    <span>
                      Last attempt: {new Date(stats.lastAttemptDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span>{stats.attemptsCount} {stats.attemptsCount === 1 ? 'attempt' : 'attempts'}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500">
                  {weekInfo.questionCount} Questions (1 mark each)
                </span>

                <div className="flex items-center gap-1.5">
                  {isCompleted && stats.lastAttemptId && onReviewAttempt && (
                    <button
                      onClick={() => onReviewAttempt(stats.lastAttemptId!)}
                      className="text-xs font-medium px-2.5 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      Review
                    </button>
                  )}

                  <button
                    onClick={() => onStartWeek(weekInfo.week)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors ${
                      isCompleted
                        ? 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-3 h-3" />
                        Retry
                      </>
                    ) : (
                      <>
                        Start Practice
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWeeks.length === 0 && (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-lg">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-900">No assignments match this filter</p>
          <p className="text-xs text-slate-500 mt-1">Try switching to 'All Weeks'</p>
        </div>
      )}
    </div>
  );
};
