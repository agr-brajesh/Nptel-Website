import { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Flag, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Send, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import type { Question, TestConfig, TestAttempt } from '../../types';
import { computeAttemptSummary, evaluateQuestionAnswer } from '../../services/scoringEngine';
import { StorageService } from '../../services/storageService';

interface TestRunnerViewProps {
  config: TestConfig;
  questions: Question[];
  onFinishTest: (attempt: TestAttempt) => void;
  onExitWithoutSaving: () => void;
}

export const TestRunnerView = ({
  config,
  questions,
  onFinishTest,
  onExitWithoutSaving,
}: TestRunnerViewProps) => {
  // State initialization
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  
  // Timer state
  const totalSeconds = config.durationMinutes > 0 ? config.durationMinutes * 60 : 0;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Attempt ID for consistency
  const attemptIdRef = useRef<string>(`att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`);

  // Load active test state if present (Refresh Protection)
  useEffect(() => {
    const savedState = StorageService.getActiveTestState();
    if (savedState && savedState.config.mode === config.mode && savedState.questions.length === questions.length) {
      setAnswers(savedState.answers || {});
      setMarkedForReview(savedState.markedForReview || {});
      setCheckedQuestions(savedState.checkedAnswers || {});
      setCurrentIndex(savedState.currentQuestionIndex || 0);
      if (config.durationMinutes > 0 && savedState.timeRemainingSeconds > 0) {
        setSecondsRemaining(savedState.timeRemainingSeconds);
      }
    }
  }, []);

  // Save active state to localStorage on state changes (Refresh Protection)
  useEffect(() => {
    StorageService.saveActiveTestState({
      attemptId: attemptIdRef.current,
      config,
      questions,
      currentQuestionIndex: currentIndex,
      answers,
      markedForReview,
      checkedAnswers: checkedQuestions,
      timeRemainingSeconds: secondsRemaining,
      startTime: Date.now(),
      isCompleted: false
    });
  }, [answers, markedForReview, checkedQuestions, currentIndex, secondsRemaining]);

  // Timer effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeSpentSeconds(prev => prev + 1);

      if (config.durationMinutes > 0) {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            // Automatic submission when time reaches zero
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [config.durationMinutes]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentSelectedAnswers = answers[currentQ.id] || [];
  const isMarked = !!markedForReview[currentQ.id];
  const isChecked = !!checkedQuestions[currentQ.id];

  // Answer selection handlers
  const handleSelectOption = (optionId: string) => {
    if (config.immediateFeedback && isChecked) {
      // Don't allow changing answer once checked in practice mode
      return;
    }

    if (currentQ.type === 'single_choice') {
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: [optionId]
      }));
    } else if (currentQ.type === 'multiple_choice') {
      const current = answers[currentQ.id] || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: updated
      }));
    }
  };

  const handleNumericalInput = (val: string) => {
    if (config.immediateFeedback && isChecked) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: [val]
    }));
  };

  const handleClearAnswer = () => {
    if (config.immediateFeedback && isChecked) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleCheckAnswer = () => {
    if (currentSelectedAnswers.length === 0) return;
    setCheckedQuestions(prev => ({
      ...prev,
      [currentQ.id]: true
    }));
  };

  const handleFinalSubmit = () => {
    // Clear in-progress session
    StorageService.clearActiveTestState();

    const attempt = computeAttemptSummary(
      questions,
      answers,
      config,
      timeSpentSeconds,
      markedForReview,
      attemptIdRef.current
    );

    // Save attempt to history
    StorageService.saveAttempt(attempt);

    onFinishTest(attempt);
  };

  // Stats for submission confirmation
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).filter(qId => (answers[qId] || []).length > 0).length;
  const unansweredCount = totalQuestions - answeredCount;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  // Running practice score
  const runningPracticeCorrect = Object.keys(checkedQuestions).filter(qId => {
    const q = questions.find(item => item.id === qId);
    if (!q) return false;
    const ans = answers[qId] || [];
    return evaluateQuestionAnswer(q, ans).isCorrect;
  }).length;

  // Formatting time MM:SS
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = config.durationMinutes > 0 && secondsRemaining <= 300 && secondsRemaining > 0; // <= 5 mins

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Examination Control Bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit Test
            </button>
            <div className="hidden sm:block h-4 w-px bg-slate-200" />
            <div>
              <h1 className="text-xs sm:text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                {config.title}
              </h1>
              <p className="text-[11px] text-slate-500">
                Question {currentIndex + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Timer (for Mock or timed practice) */}
            {config.durationMinutes > 0 && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold ${
                isLowTime
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            )}

            {/* Practice Running Score Badge */}
            {config.immediateFeedback && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span>Score: {runningPracticeCorrect} / {Object.keys(checkedQuestions).length}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Low Time Warning Banner */}
      {isLowTime && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs font-medium text-amber-800 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Warning: Less than 5 minutes remaining! Your test will automatically submit when the timer ends.</span>
        </div>
      )}

      {/* Main Content: Question + Navigator Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Active Question */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6">
            
            {/* Question Top Metadata */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-slate-900 text-white">
                  Q{currentIndex + 1}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                  Week {currentQ.week}
                </span>
                <span className="text-xs text-slate-400">
                  {currentQ.marks} {currentQ.marks === 1 ? 'mark' : 'marks'}
                </span>
                {config.hasNegativeMarking && (
                  <span className="text-[11px] text-rose-600">
                    (-{config.negativeMarkRate} for incorrect)
                  </span>
                )}
              </div>

              {/* Mark for review toggle */}
              <button
                type="button"
                onClick={handleToggleReview}
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                  isMarked
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div>
              <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.text}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.type === 'numerical' ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                    Enter Numerical Value:
                  </label>
                  <input
                    type="number"
                    step="any"
                    disabled={config.immediateFeedback && isChecked}
                    value={currentSelectedAnswers[0] || ''}
                    onChange={e => handleNumericalInput(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full max-w-xs px-3.5 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100"
                  />
                </div>
              ) : (
                currentQ.options.map((option) => {
                  const isSelected = currentSelectedAnswers.includes(option.id);
                  const isSingle = currentQ.type === 'single_choice';

                  // Evaluation styles for practice immediate feedback
                  let optionStyles = 'border-slate-200 hover:border-slate-300 bg-white';
                  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200';

                  if (isSelected && (!config.immediateFeedback || !isChecked)) {
                    optionStyles = 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-medium';
                    badgeStyles = 'bg-indigo-600 text-white border-indigo-600';
                  }

                  if (config.immediateFeedback && isChecked) {
                    if (option.is_correct) {
                      optionStyles = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium';
                      badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isSelected && !option.is_correct) {
                      optionStyles = 'border-rose-400 bg-rose-50/60 text-rose-950';
                      badgeStyles = 'bg-rose-500 text-white border-rose-500';
                    } else {
                      optionStyles = 'border-slate-200 opacity-60 bg-white';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={config.immediateFeedback && isChecked}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-lg border transition-all flex items-start gap-3.5 ${optionStyles}`}
                    >
                      <span className={`w-6 h-6 shrink-0 rounded-${isSingle ? 'full' : 'md'} text-xs font-semibold flex items-center justify-center border transition-colors ${badgeStyles}`}>
                        {option.id.toUpperCase()}
                      </span>
                      <span className="text-sm leading-normal flex-1">
                        {option.text}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Immediate Feedback Card (Practice & Weekly Mode) */}
            {config.immediateFeedback && isChecked && (
              <div className="mt-4 p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  {evaluateQuestionAnswer(currentQ, currentSelectedAnswers).isCorrect ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Correct Answer! (+{currentQ.marks} mark)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-sm">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Incorrect. Official Correct: {currentQ.correct_answers.join(', ').toUpperCase()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/80">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Explanation
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions for Current Question */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={currentIndex === totalQuestions - 1}
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {currentSelectedAnswers.length > 0 && (!config.immediateFeedback || !isChecked) && (
                  <button
                    type="button"
                    onClick={handleClearAnswer}
                    className="text-xs text-slate-400 hover:text-slate-600 ml-2"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              {/* Check Answer Button */}
              {config.immediateFeedback && !isChecked && (
                <button
                  type="button"
                  disabled={currentSelectedAnswers.length === 0}
                  onClick={handleCheckAnswer}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Check Answer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Question Navigator Palette */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Question Navigator
            </h2>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pb-3 border-b border-slate-100">
              {config.immediateFeedback ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-600" />
                    <span>Correct ({runningPracticeCorrect})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-rose-600" />
                    <span>Incorrect ({Object.keys(checkedQuestions).length - runningPracticeCorrect})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-indigo-600" />
                    <span>Selected ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs ring-2 ring-indigo-600 bg-white" />
                    <span>Current</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-indigo-600" />
                    <span>Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200" />
                    <span>Unanswered ({unansweredCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-400" />
                    <span>Marked ({reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs ring-2 ring-indigo-600 bg-white" />
                    <span>Current</span>
                  </div>
                </>
              )}
            </div>

            {/* Question Buttons Matrix */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const hasAnswer = (answers[q.id] || []).length > 0;
                const isQChecked = !!checkedQuestions[q.id];
                const isMarkedReview = !!markedForReview[q.id];
                const isCurrent = idx === currentIndex;

                let btnStyles = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

                if (config.immediateFeedback && isQChecked) {
                  const isCorrect = evaluateQuestionAnswer(q, answers[q.id] || []).isCorrect;
                  btnStyles = isCorrect
                    ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 font-semibold'
                    : 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700 font-semibold';
                } else if (hasAnswer) {
                  btnStyles = 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700';
                }

                if (isMarkedReview && !isQChecked) {
                  btnStyles = 'bg-amber-400 text-amber-950 border-amber-500 font-semibold';
                }

                if (isCurrent) {
                  btnStyles += ' ring-2 ring-offset-1 ring-slate-900 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-8 rounded-md text-xs font-medium border flex items-center justify-center transition-all ${btnStyles}`}
                    title={`Question ${idx + 1} (Week ${q.week})`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Test Summary Box */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="font-semibold text-slate-800">
                  {Math.round((answeredCount / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Submit button on sidebar */}
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Examination
            </button>
          </div>
        </div>
      </main>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 animate-in fade-in duration-150 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Confirm Submission
                </h3>
                <p className="text-xs text-slate-500">
                  Are you ready to submit your test?
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-md p-3.5 border border-slate-100 grid grid-cols-3 text-center">
              <div>
                <p className="text-lg font-bold text-slate-900">{answeredCount}</p>
                <p className="text-[11px] text-slate-500">Answered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-600">{unansweredCount}</p>
                <p className="text-[11px] text-slate-500">Unanswered</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700">{reviewCount}</p>
                <p className="text-[11px] text-slate-500">Marked</p>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md text-xs text-amber-800 border border-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>You have {unansweredCount} unanswered questions remaining. You can go back and answer them or proceed to finalize.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Keep Practicing
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Without Saving Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900">
              Exit Active Test?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your active test progress is saved in this browser. You can return to it anytime or discard this session.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={() => {
                  StorageService.clearActiveTestState();
                  onExitWithoutSaving();
                }}
                className="px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-md"
              >
                Discard & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
