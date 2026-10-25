import { useState } from 'react';
import { X, Sparkles, Shuffle, Clock } from 'lucide-react';
import { StorageService } from '../../services/storageService';

interface TestConfigModalProps {
  mode: 'full_mock' | 'practice';
  isOpen: boolean;
  onClose: () => void;
  onStartMock: (options: {
    questionCount: number;
    durationMinutes: number;
    hasNegativeMarking: boolean;
    negativeMarkRate: number;
    shuffleOptions: boolean;
  }) => void;
  onStartPractice: (options: {
    questionCount: number;
    selectedWeeks: number[];
    durationMinutes: number;
  }) => void;
}

export const TestConfigModal = ({
  mode,
  isOpen,
  onClose,
  onStartMock,
  onStartPractice,
}: TestConfigModalProps) => {
  if (!isOpen) return null;

  const totalBankCount = StorageService.getQuestions().filter(q => q.verified).length;

  // Mock Test State
  const [mockPreset, setMockPreset] = useState<'full' | 'subset'>('full');
  const [mockQuestionCount, setMockQuestionCount] = useState<number>(totalBankCount);
  const [mockDuration, setMockDuration] = useState<number>(90);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(false);
  const negativeRate = 0.25;
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);

  // Practice Test State
  const [practiceQuestionCount, setPracticeQuestionCount] = useState<number>(20);
  const [practiceWeeks, setPracticeWeeks] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [practiceTimed, setPracticeTimed] = useState<boolean>(false);
  const [practiceDuration, setPracticeDuration] = useState<number>(30);

  const togglePracticeWeek = (week: number) => {
    if (practiceWeeks.includes(week)) {
      if (practiceWeeks.length > 1) {
        setPracticeWeeks(practiceWeeks.filter(w => w !== week));
      }
    } else {
      setPracticeWeeks([...practiceWeeks, week].sort((a, b) => a - b));
    }
  };

  const selectAllWeeks = () => {
    setPracticeWeeks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  };

  const handleStart = () => {
    if (mode === 'full_mock') {
      const count = mockPreset === 'full' ? totalBankCount : mockQuestionCount;
      onStartMock({
        questionCount: count,
        durationMinutes: mockDuration,
        hasNegativeMarking: negativeMarking,
        negativeMarkRate: negativeRate,
        shuffleOptions
      });
    } else {
      onStartPractice({
        questionCount: practiceQuestionCount,
        selectedWeeks: practiceWeeks,
        durationMinutes: practiceTimed ? practiceDuration : 0
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
              {mode === 'full_mock' ? <Sparkles className="w-4 h-4" /> : <Shuffle className="w-4 h-4" />}
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {mode === 'full_mock' ? 'Full Mock Examination Setup' : 'Random Practice Test Setup'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'full_mock'
                  ? 'Simulate authentic 12-week NPTEL final exam'
                  : 'Practice with instant explanations on every question'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {mode === 'full_mock' ? (
            <>
              {/* Mock Preset Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                  Examination Scope
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMockPreset('full');
                      setMockQuestionCount(totalBankCount);
                      setMockDuration(90);
                    }}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      mockPreset === 'full'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-medium'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold">Full Exam</span>
                      <span className="text-xs text-indigo-600 font-bold">{totalBankCount} Qs</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      All 12 weeks included once (complete coverage).
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMockPreset('subset');
                      setMockQuestionCount(36);
                      setMockDuration(45);
                    }}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      mockPreset === 'subset'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-medium'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold">Configurable Mock</span>
                      <span className="text-xs text-slate-500">Custom Qs</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Evenly distributed across all 12 weeks.
                    </p>
                  </button>
                </div>
              </div>

              {/* Number of Questions (if subset) */}
              {mockPreset === 'subset' && (
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-slate-700">Question Count</span>
                    <span className="font-semibold text-indigo-600">{mockQuestionCount} questions</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max={totalBankCount}
                    step="12"
                    value={mockQuestionCount}
                    onChange={e => setMockQuestionCount(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>12 (1/wk)</span>
                    <span>24 (2/wk)</span>
                    <span>36 (3/wk)</span>
                    <span>48 (4/wk)</span>
                    <span>{totalBankCount} (all)</span>
                  </div>
                </div>
              )}

              {/* Duration Settings */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Exam Duration</span>
                  <span className="font-semibold text-indigo-600">{mockDuration} minutes</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[30, 45, 60, 90].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setMockDuration(mins)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                        mockDuration === mins
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              {/* Negative Marking Toggle */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-900">Negative Marking</p>
                    <p className="text-[11px] text-slate-500">
                      Deduct marks for incorrect answers (-0.25)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={negativeMarking}
                    onChange={e => setNegativeMarking(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-900">Shuffle Options</p>
                    <p className="text-[11px] text-slate-500">
                      Randomize answer choices (prevents position memorization)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={shuffleOptions}
                    onChange={e => setShuffleOptions(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Practice Mode Setup */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-medium text-slate-700">Number of Questions</span>
                  <span className="font-semibold text-indigo-600">{practiceQuestionCount} questions</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 50].map(count => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPracticeQuestionCount(count)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                        practiceQuestionCount === count
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Weeks */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-700">Include Weeks</span>
                  <button
                    type="button"
                    onClick={selectAllWeeks}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Select All (1-12)
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(w => {
                    const isSelected = practiceWeeks.includes(w);
                    return (
                      <button
                        key={w}
                        type="button"
                        onClick={() => togglePracticeWeek(w)}
                        className={`py-1 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        W{w}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Selected: {practiceWeeks.length} of 12 weeks
                </p>
              </div>

              {/* Optional Timer */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-900">Optional Time Limit</p>
                    <p className="text-[11px] text-slate-500">
                      Enable countdown timer for practice
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={practiceTimed}
                    onChange={e => setPracticeTimed(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                {practiceTimed && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={practiceDuration}
                      onChange={e => setPracticeDuration(Number(e.target.value))}
                      className="w-20 px-2 py-1 text-xs border border-slate-200 rounded-md"
                    />
                    <span className="text-xs text-slate-500">minutes</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs"
          >
            {mode === 'full_mock' ? 'Start Mock Examination' : 'Start Practice Test'}
          </button>
        </div>
      </div>
    </div>
  );
};
