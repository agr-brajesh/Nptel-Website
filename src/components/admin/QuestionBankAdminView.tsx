import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  X
} from 'lucide-react';
import type { Question, QuestionType } from '../../types';
import { StorageService } from '../../services/storageService';

interface QuestionBankAdminViewProps {
  onRefreshBank: () => void;
}

export const QuestionBankAdminView = ({
  onRefreshBank,
}: QuestionBankAdminViewProps) => {
  const [questions, setQuestions] = useState<Question[]>(StorageService.getQuestions());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatusMessage, setImportStatusMessage] = useState<string>('');

  const refreshData = () => {
    const fresh = StorageService.getQuestions();
    setQuestions(fresh);
    onRefreshBank();
  };

  // Filter questions
  const filtered = questions.filter(q => {
    if (selectedWeek !== 'all' && q.week !== selectedWeek) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    if (verifiedFilter === 'verified' && !q.verified) return false;
    if (verifiedFilter === 'unverified' && q.verified) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const inText = q.text.toLowerCase().includes(term);
      const inId = q.id.toLowerCase().includes(term);
      const inOpts = q.options.some(o => o.text.toLowerCase().includes(term));
      if (!inText && !inId && !inOpts) return false;
    }

    return true;
  });

  const verifiedCount = questions.filter(q => q.verified).length;
  const pendingCount = questions.length - verifiedCount;

  // Handle Add New Question
  const handleAddNewQuestion = () => {
    const nextQNum = questions.filter(q => q.week === 1).length + 1;
    setEditingQuestion({
      id: `w1_q${Date.now()}`,
      week: 1,
      question_number: nextQNum,
      text: '',
      type: 'single_choice',
      marks: 1,
      negative_marks: 0,
      options: [
        { id: 'a', text: '', is_correct: true },
        { id: 'b', text: '', is_correct: false },
        { id: 'c', text: '', is_correct: false },
        { id: 'd', text: '', is_correct: false },
      ],
      correct_answers: ['a'],
      explanation: '',
      verified: true
    });
    setIsEditModalOpen(true);
  };

  // Handle Edit existing question
  const handleEdit = (q: Question) => {
    setEditingQuestion(JSON.parse(JSON.stringify(q)));
    setIsEditModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updated = StorageService.deleteQuestion(questionId);
      setQuestions(updated);
      onRefreshBank();
    }
  };

  // Handle Toggle Verification
  const handleToggleVerify = (q: Question) => {
    const updated = { ...q, verified: !q.verified };
    StorageService.updateQuestion(updated);
    refreshData();
  };

  // Save Modal
  const handleSaveQuestion = () => {
    if (!editingQuestion || !editingQuestion.text?.trim()) {
      alert('Question text is required');
      return;
    }

    // Determine correct answers from options
    if (editingQuestion.type === 'single_choice' || editingQuestion.type === 'multiple_choice') {
      const corrects = (editingQuestion.options || [])
        .filter(opt => opt.is_correct)
        .map(opt => opt.id);
      
      if (corrects.length === 0) {
        alert('Please mark at least one option as the correct answer.');
        return;
      }
      editingQuestion.correct_answers = corrects;
    }

    const fullQuestion = editingQuestion as Question;

    const exists = questions.some(q => q.id === fullQuestion.id);
    if (exists) {
      StorageService.updateQuestion(fullQuestion);
    } else {
      StorageService.addQuestion(fullQuestion);
    }

    setIsEditModalOpen(false);
    setEditingQuestion(null);
    refreshData();
  };

  // Export Bank as JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nptel_hs169_questions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to original 96 questions
  const handleResetToDefault = () => {
    if (window.confirm('Reset Question Bank to original 96 verified NPTEL assignment questions from IIT Guwahati? Any custom edits will be reverted.')) {
      const restored = StorageService.resetQuestionsToDefault();
      setQuestions(restored);
      onRefreshBank();
    }
  };

  // Import JSON / CSV
  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('Input must be a JSON array of question objects');
      }

      let count = 0;
      parsed.forEach((item: any) => {
        if (item.text && item.week) {
          StorageService.addQuestion({
            id: item.id || `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            week: Number(item.week),
            question_number: Number(item.question_number || 1),
            text: String(item.text),
            type: item.type || 'single_choice',
            marks: Number(item.marks || 1),
            negative_marks: Number(item.negative_marks || 0),
            options: item.options || [],
            correct_answers: item.correct_answers || [],
            explanation: item.explanation || '',
            verified: item.verified !== false
          });
          count++;
        }
      });

      setImportStatusMessage(`Successfully imported ${count} questions!`);
      refreshData();
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportJsonText('');
        setImportStatusMessage('');
      }, 1200);
    } catch (e: any) {
      setImportStatusMessage(`Import error: ${e.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Question Bank Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Maintain, import, verify, and publish assignment questions across all 12 weeks.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            onClick={handleAddNewQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Import (JSON)
          </button>
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Bank
          </button>
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            title="Reset to 96 original questions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Defaults
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs text-slate-500 font-medium">Total Questions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{questions.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all 12 weeks</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs text-slate-500 font-medium">Verified Active</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{verifiedCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Eligible for tests</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs text-slate-500 font-medium">Pending Review</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Needs admin verification</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-xs text-slate-500 font-medium">Course Code</p>
          <p className="text-xl font-bold text-slate-800 mt-1">NOC26 HS169</p>
          <p className="text-[11px] text-slate-400 mt-0.5">IIT Guwahati</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions by text or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs border border-slate-200 rounded-md px-2.5 py-1.5 bg-white text-slate-700"
          >
            <option value="all">All Weeks (1-12)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(w => (
              <option key={w} value={w}>Week {w}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="text-xs border border-slate-200 rounded-md px-2.5 py-1.5 bg-white text-slate-700"
          >
            <option value="all">All Types</option>
            <option value="single_choice">Single Choice</option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="numerical">Numerical</option>
          </select>

          <select
            value={verifiedFilter}
            onChange={e => setVerifiedFilter(e.target.value as any)}
            className="text-xs border border-slate-200 rounded-md px-2.5 py-1.5 bg-white text-slate-700"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Week</th>
                <th className="py-3 px-3">Q#</th>
                <th className="py-3 px-3">Question Text</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Correct Ans</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(q => (
                <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3 font-medium whitespace-nowrap">
                    Week {q.week}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono whitespace-nowrap">
                    #{q.question_number}
                  </td>
                  <td className="py-3 px-3 max-w-md">
                    <p className="line-clamp-2 text-slate-900 font-medium leading-relaxed">
                      {q.text}
                    </p>
                    {q.explanation && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                        {q.explanation}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                    <span className="capitalize">{q.type.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900 uppercase">
                    {q.correct_answers.join(', ')}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleVerify(q)}
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-sm border ${
                        q.verified
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {q.verified ? 'Verified' : 'Review'}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(q)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100 transition-colors"
                        title="Edit Question"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No questions matched your search criteria.
          </div>
        )}
      </div>

      {/* Edit / Add Question Modal */}
      {isEditModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">
                {editingQuestion.id?.startsWith('custom_') ? 'Add New Question' : 'Edit Question'}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Week Number (1-12)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={editingQuestion.week || 1}
                    onChange={e => setEditingQuestion({ ...editingQuestion, week: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Question Number</label>
                  <input
                    type="number"
                    value={editingQuestion.question_number || 1}
                    onChange={e => setEditingQuestion({ ...editingQuestion, question_number: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Type</label>
                  <select
                    value={editingQuestion.type || 'single_choice'}
                    onChange={e => setEditingQuestion({ ...editingQuestion, type: e.target.value as QuestionType })}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-md bg-white"
                  >
                    <option value="single_choice">Single Choice</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="numerical">Numerical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question Text</label>
                <textarea
                  rows={3}
                  value={editingQuestion.text || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                  placeholder="Enter the full question prompt here..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              {/* Options */}
              {editingQuestion.type !== 'numerical' && (
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700 block">
                    Options (Check the radio/box for the correct answer):
                  </label>
                  {(editingQuestion.options || []).map((opt, optIdx) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <input
                        type={editingQuestion.type === 'single_choice' ? 'radio' : 'checkbox'}
                        name="correctOption"
                        checked={opt.is_correct}
                        onChange={e => {
                          const updatedOpts = (editingQuestion.options || []).map((o, i) => {
                            if (editingQuestion.type === 'single_choice') {
                              return { ...o, is_correct: i === optIdx };
                            } else {
                              return i === optIdx ? { ...o, is_correct: e.target.checked } : o;
                            }
                          });
                          setEditingQuestion({ ...editingQuestion, options: updatedOpts });
                        }}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="w-5 text-center font-bold text-slate-500 uppercase">{opt.id}</span>
                      <input
                        type="text"
                        value={opt.text}
                        onChange={e => {
                          const updatedOpts = [...(editingQuestion.options || [])];
                          updatedOpts[optIdx].text = e.target.value;
                          setEditingQuestion({ ...editingQuestion, options: updatedOpts });
                        }}
                        placeholder={`Option ${opt.id.toUpperCase()} text...`}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Explanation */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Solution Explanation (Pedagogical Rationale)
                </label>
                <textarea
                  rows={2}
                  value={editingQuestion.explanation || ''}
                  onChange={e => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  placeholder="Briefly explain why this is the correct answer based on the course literature..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingQuestion.verified || false}
                    onChange={e => setEditingQuestion({ ...editingQuestion, verified: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span>Mark as Verified for Student Examination</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-4 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">
                Import Questions (JSON Format)
              </h3>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Paste a JSON array of questions matching the question schema.
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder={`[
  {
    "week": 1,
    "question_number": 9,
    "text": "Sample Question Text?",
    "type": "single_choice",
    "options": [
      { "id": "a", "text": "Choice 1", "is_correct": true },
      { "id": "b", "text": "Choice 2", "is_correct": false }
    ],
    "correct_answers": ["a"],
    "explanation": "Rationale...",
    "verified": true
  }
]`}
              className="w-full font-mono text-xs p-3 border border-slate-200 rounded-md"
            />

            {importStatusMessage && (
              <p className={`text-xs font-medium ${
                importStatusMessage.includes('Successfully') ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {importStatusMessage}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-4 py-1.5 text-xs font-semibold rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Parse & Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
