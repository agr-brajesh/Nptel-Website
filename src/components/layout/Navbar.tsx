import { BookOpen, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenMockConfig: () => void;
  onOpenPracticeConfig: () => void;
}

export const Navbar = ({
  currentView,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenMockConfig,
  onOpenPracticeConfig,
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 tracking-tight text-sm sm:text-base">
                    NPTEL Prep
                  </span>
                  <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200">
                    NOC26 HS169
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block truncate max-w-xs">
                  Psychology of Stress, Health & Well-Being
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('weekly')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'weekly'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Weekly Assignments
            </button>
            <button
              onClick={onOpenMockConfig}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'full_mock'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Full Mock Test
            </button>
            <button
              onClick={onOpenPracticeConfig}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'practice'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => onNavigate('performance')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'performance'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentView === 'admin'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Question Bank
            </button>
          </nav>

          {/* Quick Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenMockConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start Mock Exam
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onNavigate('weekly');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'weekly' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Weekly Assignments (Weeks 1-12)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMockConfig();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Full Mock Test (All 12 Weeks)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPracticeConfig();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Random Practice Mode
          </button>
          <button
            onClick={() => {
              onNavigate('performance');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'performance' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Performance & Weak Areas
          </button>
          <button
            onClick={() => {
              onNavigate('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              currentView === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            Question Bank Management
          </button>
        </div>
      )}
    </header>
  );
};
