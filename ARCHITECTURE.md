# PROJECT SPECIFICATION: AI Spectrum (Phase 1)
> **Version:** 1.0.0 (MVP)
> **Date:** 2025-12-03
> **Description:** 사용자별로 다른 AI 페르소나의 답변을 수집하여, 인구통계학적 변수(나이, 성별, 직업)에 따라 시각화하여 보여주는 아카이브 플랫폼.

---

## 1. Project Goal & Core Logic
### 1.1. 핵심 가치
- LLM의 비결정적(Non-deterministic) 특성을 활용하여 동일 질문에 대한 다양한 답변 패턴을 관찰.
- 사용자가 설정한 페르소나(나이, 성별, 직업 등)에 따른 답변 차이를 카드 UI로 비교.

### 1.2. 사용자 흐름 (User Flow)
1. **Admin (운영자):** 메인 주제(Question)를 등록한다. (예: "좋은 삶의 기준은 무엇이라고 정의하나요?")
2. **User (참여자):** - 답변을 등록하기 전, 자신의 페르소나 정보(성별, 나이대, 직업, 학력)를 입력한다.
   - 외부 LLM에서 받은 답변을 복사해 넣거나, 내부 API를 통해 답변을 생성하여 제출한다.
3. **Viewer (관찰자):**
   - 메인 화면에서 질문을 선택한다.
   - 필터(20대 vs 50대, IT직군 vs 인문계)를 조작한다.
   - 조건에 맞는 답변 카드들이 Grid 형태로 나열되는 것을 본다.

---

## 2. Tech Stack (Recommended)
에이전트는 아래 스택을 기준으로 코드를 생성할 것.

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (UI 가이드라인 준수)
- **Database:** Supabase (PostgreSQL)
- **State Management:** React Context API or Zustand (가벼운 상태 관리)
- **Icon Set:** Lucide React

---

## 3. Database Schema (Supabase)
데이터 구조는 엄격하게 아래 타입을 따른다.

### 3.1. Tables

#### `questions` (질문 테이블)
- `id`: uuid (PK)
- `content`: text (질문 내용, 예: "좋은 삶의 기준은 무엇인가요?")
- `category`: varchar (예: social, tech, love)
- `is_active`: boolean (현재 메인에 노출 중인지 여부)
- `created_at`: timestamp

#### `answers` (답변 카드 테이블)
- `id`: uuid (PK)
- `question_id`: uuid (FK -> questions.id)
- `content`: text (AI가 내놓은 답변 본문)
- `model_name`: varchar (사용된 모델명, 예: GPT-4o, Claude-3)
- `prompt_settings`: text (시스템 프롬프트 내용, 선택사항)
- `likes`: integer (좋아요 수)
- `created_at`: timestamp
- `persona_tags`: jsonb (검색 속도를 위한 역정규화 데이터, 아래 구조 참조)

### 3.2. Types Definition (TypeScript)

```typescript
// 페르소나 설정을 위한 메타데이터 타입
type PersonaTraits = {
  ageGroup: '10s' | '20s' | '30s' | '40s' | '50s' | '60s+';
  gender: 'Male' | 'Female' | 'Non-binary' | 'Other';
  jobCategory: 'Student' | 'Tech' | 'Art' | 'Service' | 'Office' | 'Medical' | 'Other';
  education: 'HighSchool' | 'Bachelor' | 'Master' | 'PhD';
  mbti?: string; // Optional
};

// 답변 데이터 인터페이스
interface AnswerCard {
  id: string;
  questionId: string;
  content: string;
  persona: PersonaTraits; // DB의 persona_tags 컬럼과 매핑
  modelName: string;
  createdAt: string;
}