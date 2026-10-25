import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { WeeklyAssignmentsView } from './components/weekly/WeeklyAssignmentsView';
import { TestConfigModal } from './components/exam/TestConfigModal';
import { TestRunnerView } from './components/exam/TestRunnerView';
import { TestResultView } from './components/exam/TestResultView';
import { PerformanceView } from './components/performance/PerformanceView';
import { QuestionBankAdminView } from './components/admin/QuestionBankAdminView';

import type { TestConfig, Question, TestAttempt, StudentStats } from './types';
import { TestGenerator } from './services/testGenerator';
import { StorageService } from './services/storageService';
import { syncAttemptToSupabase } from './services/supabaseClient';

export function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<StudentStats>(StorageService.getStudentStats());

  // Test Runner Active Session
  const [activeConfig, setActiveConfig] = useState<TestConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeResult, setActiveResult] = useState<TestAttempt | null>(null);

  // Modal states
  const [mockModalOpen, setMockModalOpen] = useState<boolean>(false);
  const [practiceModalOpen, setPracticeModalOpen] = useState<boolean>(false);

  const refreshStats = () => {
    setStats(StorageService.getStudentStats());
  };

  // Check on load if an active test session exists (Accidental Refresh Protection)
  useEffect(() => {
    const savedActive = StorageService.getActiveTestState();
    if (savedActive && !savedActive.isCompleted) {
      setActiveConfig(savedActive.config);
      setActiveQuestions(savedActive.questions);
      setCurrentView('test_runner');
    }
  }, []);

  // 1. Start Weekly Practice
  const handleStartWeeklyPractice = (weekNumber: number) => {
    const { config, questions } = TestGenerator.generateWeeklyTest(weekNumber);
    if (questions.length === 0) {
      alert(`No verified questions available for Week ${weekNumber}`);
      return;
    }
    setActiveConfig(config);
    setActiveQuestions(questions);
    setCurrentView('test_runner');
  };

  // 2. Start Full Mock Test
  const handleStartMockTest = (options: {
    questionCount: number;
    durationMinutes: number;
    hasNegativeMarking: boolean;
    negativeMarkRate: number;
    shuffleOptions: boolean;
  }) => {
    const { config, questions } = TestGenerator.generateMockTest(options);
    setActiveConfig(config);
    setActiveQuestions(questions);
    setCurrentView('test_runner');
  };

  // 3. Start Practice Test
  const handleStartPracticeTest = (options: {
    questionCount: number;
    selectedWeeks: number[];
    durationMinutes: number;
  }) => {
    const { config, questions } = TestGenerator.generatePracticeTest(options);
    if (questions.length === 0) {
      alert('No questions match the selected weeks criteria.');
      return;
    }
    setActiveConfig(config);
    setActiveQuestions(questions);
    setCurrentView('test_runner');
  };

  // 4. Practice Mistake Bank
  const handlePracticeMistakes = (questionIds: string[]) => {
    const { config, questions } = TestGenerator.generateMistakeTest(questionIds);
    if (questions.length === 0) {
      alert('Selected questions not found in question bank.');
      return;
    }
    setActiveConfig(config);
    setActiveQuestions(questions);
    setCurrentView('test_runner');
  };

  // 5. Test Finished
  const handleFinishTest = (attempt: TestAttempt) => {
    setActiveResult(attempt);
    setCurrentView('test_result');
    refreshStats();
    // Fire-and-forget sync to Supabase if configured
    syncAttemptToSupabase(attempt);
  };

  // 6. Review Existing Attempt
  const handleReviewAttempt = (attemptId: string) => {
    const attempt = StorageService.getAttempts().find(a => a.id === attemptId);
    if (attempt) {
      setActiveResult(attempt);
      setCurrentView('test_result');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar (hidden during active examination for distraction-free focus) */}
      {currentView !== 'test_runner' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view: string) => setCurrentView(view)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onOpenMockConfig={() => setMockModalOpen(true)}
          onOpenPracticeConfig={() => setPracticeModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'dashboard' && (
          <DashboardView
            stats={stats}
            onStartWeek={handleStartWeeklyPractice}
            onOpenMockConfig={() => setMockModalOpen(true)}
            onOpenPracticeConfig={() => setPracticeModalOpen(true)}
            onNavigate={(view: string) => setCurrentView(view)}
            onReviewAttempt={handleReviewAttempt}
          />
        )}

        {currentView === 'weekly' && (
          <WeeklyAssignmentsView
            onStartWeek={handleStartWeeklyPractice}
            onReviewAttempt={handleReviewAttempt}
          />
        )}

        {currentView === 'performance' && (
          <PerformanceView
            stats={stats}
            onStartWeek={handleStartWeeklyPractice}
            onReviewAttempt={handleReviewAttempt}
            onPracticeMistakes={handlePracticeMistakes}
            onRefreshStats={refreshStats}
          />
        )}

        {currentView === 'admin' && (
          <QuestionBankAdminView
            onRefreshBank={refreshStats}
          />
        )}

        {currentView === 'test_runner' && activeConfig && (
          <TestRunnerView
            config={activeConfig}
            questions={activeQuestions}
            onFinishTest={handleFinishTest}
            onExitWithoutSaving={() => {
              setActiveConfig(null);
              setCurrentView('dashboard');
              refreshStats();
            }}
          />
        )}

        {currentView === 'test_result' && activeResult && (
          <TestResultView
            attempt={activeResult}
            onRetake={() => {
              if (activeResult.mode === 'weekly' && activeResult.weekNumber) {
                handleStartWeeklyPractice(activeResult.weekNumber);
              } else if (activeResult.mode === 'full_mock') {
                handleStartMockTest({
                  questionCount: activeResult.totalQuestions,
                  durationMinutes: 90,
                  hasNegativeMarking: false,
                  negativeMarkRate: 0.25,
                  shuffleOptions: true
                });
              } else {
                handleStartPracticeTest({
                  questionCount: activeResult.totalQuestions,
                  selectedWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  durationMinutes: 0
                });
              }
            }}
            onReviewMistakesOnly={(mistakeIds: string[]) => handlePracticeMistakes(mistakeIds)}
            onReturnDashboard={() => {
              setActiveResult(null);
              setCurrentView('dashboard');
              refreshStats();
            }}
          />
        )}
      </div>

      {/* Configuration Modals */}
      <TestConfigModal
        mode="full_mock"
        isOpen={mockModalOpen}
        onClose={() => setMockModalOpen(false)}
        onStartMock={handleStartMockTest}
        onStartPractice={() => {}}
      />

      <TestConfigModal
        mode="practice"
        isOpen={practiceModalOpen}
        onClose={() => setPracticeModalOpen(false)}
        onStartMock={() => {}}
        onStartPractice={handleStartPracticeTest}
      />

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
