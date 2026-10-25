-- NPTEL Assignment Practice Platform Schema
-- Course: Psychology of Stress, Health and Well-Being (NOC26 HS169)
-- Designed for PostgreSQL & Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL DEFAULT 'Indian Institute of Technology Guwahati',
    instructor VARCHAR(255),
    description TEXT,
    total_weeks INT NOT NULL DEFAULT 12,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Weeks Table
CREATE TABLE IF NOT EXISTS weeks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(course_id, week_number)
);

-- 3. Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    week_id UUID REFERENCES weeks(id) ON DELETE SET NULL,
    week_number INT NOT NULL,
    question_number INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL DEFAULT 'single_choice', -- single_choice, multiple_choice, numerical
    marks NUMERIC(5,2) NOT NULL DEFAULT 1.0,
    negative_marks NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    correct_answers JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g. ["c"] or ["a", "b"]
    explanation TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT true,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Question Options Table
CREATE TABLE IF NOT EXISTS question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_key VARCHAR(10) NOT NULL, -- 'a', 'b', 'c', 'd'
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(question_id, option_key)
);

-- 5. Question Imports Table
CREATE TABLE IF NOT EXISTS question_imports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    format VARCHAR(50) NOT NULL, -- json, csv, pdf
    total_parsed INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'completed', -- pending, reviewing, completed, failed
    imported_by UUID,
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'student', -- student, instructor, admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Test Configurations Table
CREATE TABLE IF NOT EXISTS test_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    mode VARCHAR(50) NOT NULL, -- weekly, full_mock, practice
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 60,
    question_count INT NOT NULL DEFAULT 50,
    has_negative_marking BOOLEAN NOT NULL DEFAULT false,
    negative_marking_rate NUMERIC(4,2) DEFAULT 0.25,
    allow_revisit BOOLEAN NOT NULL DEFAULT true,
    shuffle_questions BOOLEAN NOT NULL DEFAULT true,
    shuffle_options BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Test Attempts Table
CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    test_mode VARCHAR(50) NOT NULL, -- 'weekly', 'full_mock', 'practice'
    week_number INT, -- for weekly tests
    title VARCHAR(255) NOT NULL,
    total_questions INT NOT NULL,
    total_score NUMERIC(6,2) NOT NULL DEFAULT 0.0,
    max_possible_score NUMERIC(6,2) NOT NULL DEFAULT 0.0,
    percentage NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    correct_count INT NOT NULL DEFAULT 0,
    incorrect_count INT NOT NULL DEFAULT 0,
    unanswered_count INT NOT NULL DEFAULT 0,
    time_taken_seconds INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'completed', -- 'in_progress', 'completed', 'abandoned'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 9. Attempt Answers Table
CREATE TABLE IF NOT EXISTS attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES test_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    selected_answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    marks_awarded NUMERIC(5,2) NOT NULL DEFAULT 0.0,
    is_skipped BOOLEAN NOT NULL DEFAULT false,
    is_marked_for_review BOOLEAN NOT NULL DEFAULT false,
    time_spent_seconds INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_course_week ON questions(course_id, week_number);
CREATE INDEX IF NOT EXISTS idx_attempts_user_mode ON test_attempts(user_id, test_mode);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt ON attempt_answers(attempt_id);

-- Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempt_answers ENABLE ROW LEVEL SECURITY;

-- Public read access for questions and courses
CREATE POLICY "Public read for courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read for weeks" ON weeks FOR SELECT USING (true);
CREATE POLICY "Public read for verified questions" ON questions FOR SELECT USING (is_verified = true);
CREATE POLICY "Public read for question options" ON question_options FOR SELECT USING (true);

-- User specific attempt access
CREATE POLICY "Users can view own test attempts" ON test_attempts FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own test attempts" ON test_attempts FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can view own attempt answers" ON attempt_answers FOR SELECT USING (true);
CREATE POLICY "Users can insert own attempt answers" ON attempt_answers FOR INSERT WITH CHECK (true);
