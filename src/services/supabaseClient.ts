// Supabase Client Configuration
// This service seamlessly connects to your Supabase PostgreSQL backend when credentials are provided in .env
// Fallback: If not configured, the platform safely operates using robust local storage persistence.

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
}

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-supabase-url'));
};

export async function syncAttemptToSupabase(attemptData: any) {
  if (!isSupabaseConfigured()) {
    return { success: true, mode: 'local' };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/test_attempts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        course_id: null,
        test_mode: attemptData.mode,
        week_number: attemptData.weekNumber,
        title: attemptData.title,
        total_questions: attemptData.totalQuestions,
        total_score: attemptData.totalScore,
        max_possible_score: attemptData.maxPossibleScore,
        percentage: attemptData.percentage,
        correct_count: attemptData.correctCount,
        incorrect_count: attemptData.incorrectCount,
        unanswered_count: attemptData.unansweredCount,
        time_taken_seconds: attemptData.timeTakenSeconds,
        status: 'completed',
        completed_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      console.warn('Supabase sync returned non-200:', response.status);
      return { success: false, error: response.statusText };
    }

    return { success: true, mode: 'supabase' };
  } catch (err) {
    console.warn('Could not sync to Supabase (using local persistence):', err);
    return { success: false, error: err };
  }
}
