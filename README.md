# NPTEL Assignment Practice Platform
### Course: Psychology of Stress, Health and Well-Being (NOC26 HS169)
**Offering Institution:** Indian Institute of Technology Guwahati (IIT Guwahati)  
**Curriculum Scope:** All 12 Weekly Assignments (96 Verified Official Questions)

---

## 🚀 Overview

The **NPTEL Assignment Practice Platform** is a minimal, distraction-free web application designed to help students master their NPTEL certification course. Inspired by the clean, typography-focused interfaces of **Linear** and **Notion**, the platform provides:

1. **Weekly Assignment Practice (Weeks 1 to 12)**: Practice official weekly assignments individually with instant **"Check Answer"** feedback, immediate solution explanations, untimed flexibility, and comprehensive post-submission score tracking.
2. **Full Mock Examination (All 12 Weeks)**: Simulate the real NPTEL final exam with a live countdown timer, 12-week question blending, configurable negative marking (-0.25), and auto-submission on timeout.
3. **Randomized Practice Mode**: Immediate feedback on every question with instant "Check Answer", score tracking, and in-depth pedagogical rationales.
4. **Performance & Diagnostic Tracking**: Real-time 12-week accuracy chart, weakest area identification (<65%), strongest areas (≥75%), mistake bank with 1-click retry, and complete attempt history.
5. **Question Bank Management (Admin)**: Add, edit, verify, import (JSON), and export questions, with the ability to restore the 96 original verified questions at any time.
6. **Refresh Resilience**: Never lose an active test! Active test states and timers are preserved in real-time.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Inter Typography
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Storage & State**: Real-time `localStorage` persistence with zero cold-starts
- **Database Readiness**: PostgreSQL / Supabase relational schema provided in `src/data/schema.sql`

---

## 📦 Question Bank Details

The platform comes pre-populated with **96 official questions** extracted directly from IIT Guwahati's Assignment Solutions:

| Week | Topic | Questions |
|:---:|:---|:---:|
| **Week 1** | Introduction to Stress & Lazarus-Folkman Appraisal Model | 8 Questions |
| **Week 2** | Physiological Bases of Stress & Psychosomatics (GAS, HPA axis) | 8 Questions |
| **Week 3** | Sources & Manifestations of Stress (SRRS, Hassles, Burnout) | 8 Questions |
| **Week 4** | Coping Processes & Social Support (Problem vs Emotion-focused) | 8 Questions |
| **Week 5** | Personality, Hardiness & Resilience (Type A, Kobasa's 3 Cs) | 8 Questions |
| **Week 6** | Interventions & Stress Management (PMR, MBSR, CBT) | 8 Questions |
| **Week 7** | Health, Well-Being & Positive Psychology (PERMA, SWB) | 8 Questions |
| **Week 8** | Hedonic Adaptation & Sustainable Happiness (AREA model, 40% model) | 8 Questions |
| **Week 9** | Gratitude, Altruism & Social Comparison (Festinger, Prosocial) | 8 Questions |
| **Week 10** | Character Strengths & Flow (VIA Classification, Csikszentmihalyi) | 8 Questions |
| **Week 11** | Self-Actualization & Self-Determination Theory (Maslow, Rogers, SDT) | 8 Questions |
| **Week 12** | Meaning in Life & Logotherapy (Viktor Frankl, Intrinsic Goals) | 8 Questions |
| **Total** | **Comprehensive 12-Week Question Bank** | **96 Questions** |

---

## 🏃 Running the Platform Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

If deploying to Supabase:
1. Navigate to your Supabase project's SQL Editor.
2. Execute the script located in `src/data/schema.sql`.
3. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
The application will automatically synchronize completed test attempts and results to your PostgreSQL database.
