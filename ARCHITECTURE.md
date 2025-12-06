# PROJECT SPECIFICATION: Your AI (Phase 1)

문제정의: LLM은 같은 사용자별로 같은 답변을 출력하지 않는다는 점을 이용하여 페르소나별로 다양한 답변을 생성하고, 이를 아카이브하는 플랫폼을 구축한다.

> **Version:** 2.0.0 (Implementation Ready)
> **Date:** 2025-12-04
> **Description:** AI 답변 아카이브 플랫폼 'Your AI'의 상세 구현 명세서.
> **Role:** 이 문서는 개발 에이전트(AI)가 프로젝트 구조, DB 스키마, API 명세를 정확히 이해하고 코드를 생성하기 위한 기준 문서임.

---

## 1. System Overview
**Your AI**은 동일한 질문에 대해 다양한 사용자의 조건에서 생성된 AI 답변을 수집·저장하고, 필터링 UI를 통해 비교하는 아카이브 웹 서비스이다.

### 1.1. Architecture Layers
1.  **Client (Presentation):** Next.js 14 App Router + Tailwind CSS
2.  **API (Interface):** Next.js Route Handlers (Serverless Functions)
3.  **Database (Persistence):** Supabase PostgreSQL (JSONB 활용)
4.  **State Management:** Zustand (Client Filter), React Query or Server Components (Server State)

---

## 2. Directory Structure (Next.js 14)
에이전트는 아래 폴더 구조를 엄격히 준수하여 파일을 생성해야 한다.

```text
src/
├─ app/
│  ├─ layout.tsx                  # Global Layout (Header, Font)
│  ├─ page.tsx                    # Main Home (Active Question + Grid)
│  ├─ questions/
│  │  └─ [id]/page.tsx            # Specific Question View
│  ├─ submit/
│  │  └─ page.tsx                 # Answer Submission Form
│  └─ admin/
│     └─ questions/
│        └─ page.tsx              # Admin: Create Question
│
├─ app/api/
│  ├─ questions/
│  │  └─ route.ts                 # GET (List), POST (Create)
│  └─ answers/
│     ├─ route.ts                 # POST (Submit Answer)
│     └─ [questionId]/route.ts    # GET (Fetch with Filters)
│
├─ lib/
│  ├─ supabaseClient.ts           # Supabase Instance
│  ├─ utils.ts                    # Classname merger etc.
│  └─ database.types.ts           # Supabase Auto-generated Types
│
├─ types/
│  ├─ persona.ts                  # PersonaTraits Interface
│  └─ index.ts                    # Global Types
│
├─ store/
│  └─ useFilterStore.ts           # Zustand: { ageGroup, gender, ... }
│
└─ components/
   ├─ ui/                         # Buttons, Inputs, Cards (Sharp Modern Style)
   ├─ layout/                     # Header, Sidebar
   ├─ questions/                  # QuestionHero, QuestionList
   └─ answers/                    # AnswerCard, FilterBar

---

## 3. Database Schema (Supabase SQL)
에이전트는 아래 SQL을 실행하여 테이블을 생성한다고 가정하고 로직을 작성한다.

-- 1. Questions Table
CREATE TABLE public.questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'social', 'tech', 'love'
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Answers Table
CREATE TABLE public.answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    model_name VARCHAR(100) NOT NULL, -- 'GPT-4o', 'Claude-3.5'
    prompt_settings TEXT, -- Optional system prompt
    likes INTEGER DEFAULT 0,
    persona_tags JSONB NOT NULL, -- Stores age, gender, job, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for filtering (JSONB indexing is crucial for performance)
CREATE INDEX idx_answers_question_id ON public.answers(question_id);
CREATE INDEX idx_answers_persona ON public.answers USING gin (persona_tags);

4. TypeScript Definitions (Domain Models)
파일 위치: src/types/persona.ts

export type AgeGroup = '10s' | '20s' | '30s' | '40s' | '50s' | '60s+';
export type Gender = 'Male' | 'Female' | 'Non-binary' | 'Other';
export type JobCategory = 'Student' | 'Tech' | 'Art' | 'Service' | 'Office' | 'Medical' | 'Other';
export type Education = 'HighSchool' | 'Bachelor' | 'Master' | 'PhD';

export interface PersonaTraits {
  ageGroup: AgeGroup;
  gender: Gender;
  jobCategory: JobCategory;
  education: Education;
  mbti?: string; // Optional
}

export interface Answer {
  id: string;
  question_id: string;
  content: string;
  model_name: string;
  persona_tags: PersonaTraits; // Mapped from DB jsonb
  likes: number;
  created_at: string;
}

export interface Question {
  id: string;
  content: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

5. API Specification & Logic
5.1. POST /api/questions (Admin)
Use Case: 관리자가 새로운 토론 주제를 등록함.

Body:

JSON

{
  "content": "결혼식 축의금 5만원, 적절한가?",
  "category": "social",
  "is_active": true
}
Logic: questions 테이블에 INSERT.

5.2. POST /api/answers (User Submit)
Use Case: 사용자가 페르소나 정보와 함께 답변을 제출함.

Body:

JSON

{
  "questionId": "uuid-string",
  "content": "마음이 중요하죠.",
  "modelName": "GPT-4o",
  "persona": {
    "ageGroup": "20s",
    "gender": "Female",
    "jobCategory": "Student",
    "education": "Bachelor"
  }
}
Logic: 1. persona 객체를 persona_tags 컬럼(JSONB)에 매핑. 2. answers 테이블에 INSERT.

5.3. GET /api/answers/[questionId] (Filtering)
Use Case: 뷰어 페이지에서 필터링된 답변 목록을 가져옴.

Query Params: ?ageGroup=20s&gender=Male&jobCategory=Tech

Logic (Supabase Query):

TypeScript

// Example Logic for Route Handler
let query = supabase.from('answers').select('*').eq('question_id', questionId);

if (ageGroup) query = query.eq('persona_tags->>ageGroup', ageGroup);
if (gender) query = query.eq('persona_tags->>gender', gender);
// ... apply other filters

const { data } = await query;
6. Implementation Guidelines for Agent
6.1. Styling (Tailwind CSS)
Design System: "Sharp Modern" & "Tech Mono"

Rules:

border-radius: 0px (All cards, buttons, inputs).

font-family: Headers -> JetBrains Mono, Body -> D2Coding.

Grid: Use grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for responsive layouts.

6.2. State Management (Zustand)
useFilterStore.ts를 생성하여 현재 선택된 필터(selectedAge, selectedJob 등)를 전역 관리한다.

필터가 변경되면 API를 다시 호출하여 그리드를 갱신한다.

6.3. Environment Variables
.env.local 파일 사용을 가정한다.

코드 스니펫

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
ADMIN_SECRET=your_admin_secret
7. Development Phases
Setup: Next.js 설치, Supabase 클라이언트 설정, types 정의.

DB & API: Supabase 테이블 생성, /api/questions, /api/answers 구현.

Admin UI: 질문 등록 페이지 구현.

User UI (Submit): 페르소나 입력 폼 및 답변 제출 기능 구현.

Viewer UI (Main): 질문 조회, 사이드바 필터링, Masonry Grid 답변 카드 구현.