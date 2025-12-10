# PROJECT SPECIFICATION: Your AI

> **Version:** 3.0.0
> **Date:** 2025-12-11
> **Description:** AI 응답 규칙 아카이브 플랫폼 'Your AI'의 구현 명세서.

---

## 1. System Overview

**Your AI**는 다양한 사용자 유형(Domain)에 맞는 AI 응답 규칙(Custom Instructions)을 수집·저장하고, 비교·탐색할 수 있는 아카이브 웹 서비스이다.

### 1.1. 핵심 개념

| 용어 | 정의 |
|------|------|
| **응답 규칙 (Custom Instruction)** | 특정 사용자 프로필과 응답 스타일 선호도를 정의한 AI 설정 |
| **도메인 (Domain)** | 사용자의 직업/관심 분야 (Tech, Creative, Business 등 8개 영역) |
| **사용자 프로필 (User Profile)** | AI에게 자신을 소개하는 맥락 정보 |
| **응답 선호도 (Response Preference)** | AI의 답변 형식/스타일에 대한 요구사항 |

### 1.2. Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Next.js 14)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐    │
│  │  App Pages │  │ Components │  │ State (Zustand)    │    │
│  └────────────┘  └────────────┘  └────────────────────┘    │
│         │               │                    │              │
│         └───────────────┴────────────────────┘              │
│                         │                                   │
│  ┌──────────────────────┴──────────────────────┐           │
│  │            Hooks (useAnswerRules)           │           │
│  └──────────────────────┬──────────────────────┘           │
│                         │                                   │
│  ┌──────────────────────┴──────────────────────┐           │
│  │          Data Layer (Static + LocalStorage)  │           │
│  └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

- **Client**: Next.js 14 App Router + Mantine UI
- **Styling**: Mantine Components + Custom CSS
- **State Management**: Zustand (persist to LocalStorage)
- **Data**: Static JSON + User LocalStorage

---

## 2. Directory Structure

```text
client/src/
├─ app/                         # Next.js App Router Pages
│  ├─ layout.tsx                # Global Layout (Mantine Provider)
│  ├─ page.tsx                  # Landing/Home Router
│  ├─ globals.css               # Global Styles
│  ├─ compare/page.tsx          # 응답 규칙 비교 페이지
│  ├─ instructions/page.tsx     # 응답 규칙 라이브러리 페이지
│  ├─ my-ai/page.tsx            # 나의 AI 만들기 페이지
│  ├─ questions/
│  │  ├─ page.tsx               # 질문 목록
│  │  └─ [id]/page.tsx          # 질문 상세 (답변 비교)
│  └─ register/page.tsx         # 응답 규칙 등록 페이지
│
├─ components/
│  ├─ Providers.tsx             # Mantine + Theme Provider
│  ├─ layout/
│  │  ├─ Sidebar.tsx            # 통합 사이드바 네비게이션
│  │  └─ ScrollLanding.tsx      # 랜딩 스크롤 애니메이션
│  ├─ home/
│  │  ├─ InstructionsHome.tsx   # 홈 메인 콘텐츠
│  │  ├─ QuestionFeed.tsx       # 질문 피드
│  │  └─ DomainHighlightSection.tsx
│  ├─ shared/
│  │  ├─ AnswerRuleCard.tsx     # 응답 규칙 카드 컴포넌트
│  │  ├─ AnswerRuleListSection.tsx
│  │  └─ DomainHighlightSection.tsx
│  └─ questions/
│     ├─ QuestionCard.tsx       # 질문 카드
│     └─ AnswerWithProfile.tsx  # 프로필별 답변 표시
│
├─ data/
│  ├─ customInstructions.ts     # 응답 규칙 데이터 모델 및 샘플
│  └─ questions.ts              # 질문 및 답변 샘플 데이터
│
├─ hooks/
│  └─ useAnswerRules.ts         # 응답 규칙 필터/정렬 훅
│
├─ store/
│  └─ useAppStore.ts            # Zustand 전역 상태
│
└─ theme.ts                     # Mantine 테마 설정
```

---

## 3. Data Models

### 3.1. Domain (도메인)

```typescript
type Domain =
  | 'Tech'       // 개발/기술
  | 'Creative'   // 디자인/예술
  | 'Business'   // 비즈니스
  | 'Academia'   // 학술/연구
  | 'Healthcare' // 의료/상담
  | 'Education'  // 교육/학습
  | 'Legal'      // 법률
  | 'Finance';   // 금융
```

### 3.2. CustomInstruction (응답 규칙)

```typescript
interface CustomInstruction {
  id: string;             // 고유 식별자
  name: string;           // 규칙 이름 (예: "풀스택 개발자")
  domain: Domain;         // 소속 도메인
  targetRole: string;     // 대상 역할 (예: "시니어 개발자")
  description: string;    // 규칙 설명
  userProfile: string;    // AI에게 전달할 사용자 프로필
  responsePreference: string;  // 응답 스타일 요구사항
  tags: string[];          // 검색용 태그
  popularity: number;      // 인기도 (사용자 수)
  author?: string;         // 작성자 (선택)
  emoji: string;           // 대표 이모지
}
```

### 3.3. Question & Answer (질문과 답변)

```typescript
interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  viewCount: number;
  answerCount: number;
}

interface Answer {
  id: string;
  questionId: string;
  instructionId: string;  // 사용된 응답 규칙 ID
  content: string;        // AI 답변 내용
  author: string;
  createdAt: string;
  likes: number;
}
```

---

## 4. State Management (Zustand)

### 4.1. AppState

```typescript
interface AppState {
  // 랜딩 페이지 상태
  hasSeenLanding: boolean;
  setHasSeenLanding: (value: boolean) => void;

  // 사이드바 상태
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Hydration 상태
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  // 사용자 등록 응답 규칙
  userInstructions: CustomInstruction[];
  addUserInstruction: (instruction: CustomInstruction) => void;
  deleteUserInstruction: (id: string) => void;
}
```

### 4.2. Persistence

- Storage Key: `your-ai-app-storage`
- 저장 항목: `hasSeenLanding`, `isSidebarOpen`, `userInstructions`

---

## 5. Hooks

### 5.1. useAnswerRules

```typescript
// 옵션
interface UseAnswerRulesOptions {
  domain?: Domain | 'all';     // 도메인 필터
  searchQuery?: string;        // 검색어
  sortBy?: 'popular' | 'recent' | 'usage';  // 정렬
  limit?: number;              // 최대 개수
  onlyTrending?: boolean;      // 인기 항목만
  includeUserRules?: boolean;  // 사용자 등록 규칙 포함
}

// 반환값
interface UseAnswerRulesResult {
  instructions: CustomInstruction[];      // 필터링된 규칙
  allInstructions: CustomInstruction[];   // 전체 규칙
  isLoading: boolean;
  domainMeta: Record<Domain, DomainInfo>;
  domains: Domain[];
}
```

### 5.2. 관련 훅

| 훅 | 용도 |
|----|------|
| `useAnswerRules` | 응답 규칙 필터링/정렬 |
| `useTopRulesByDomain` | 도메인별 TOP N 규칙 |
| `useDomainRepresentatives` | 도메인별 대표 규칙 1개씩 |

---

## 6. Pages & Routes

| Route | 페이지 | 설명 |
|-------|--------|------|
| `/` | Home | 랜딩 또는 홈 대시보드 |
| `/instructions` | Library | 응답 규칙 라이브러리 (필터/검색) |
| `/compare` | Compare | 응답 규칙 비교 |
| `/questions` | Questions | 질문 목록 |
| `/questions/[id]` | Question Detail | 질문별 답변 비교 |
| `/register` | Register | 새 응답 규칙 등록 |
| `/my-ai` | My AI | 나의 AI 스타일 테스트 |

---

## 7. UI Layout

### 7.1. 통합 레이아웃 구조

```html
<div class="app-container">
  <Sidebar />             <!-- 276px, 축소 시 60px -->
  <main class="main-content">
    <!-- 헤더 -->
    <Box px={48} py="lg" style={{ borderBottom: '1px solid ...' }}>
      <Title /> + <Actions />
    </Box>
    <!-- 콘텐츠 -->
    <Box px={48} py="xl">
      <!-- Page Content -->
    </Box>
  </main>
</div>
```

### 7.2. Sidebar 메뉴

| 메뉴 | 경로 |
|------|------|
| 홈 | `/` |
| 응답 규칙 등록 | `/register` |
| 응답 규칙 라이브러리 | `/instructions` |
| 질문 목록 | `/questions` |
| 응답 규칙 비교 | `/compare` |
| 나의 AI 만들기 | `/my-ai` |

---

## 8. Design System

### 8.1. Colors

```typescript
const colors = {
  gold: '#E0B861',      // Primary accent
  goldLight: '#fffdf8', // Light background
  sidebar: '#1a1a1a',   // Sidebar background
  border: '#e5e5e5',    // Border color
};
```

### 8.2. Typography

- **영문 타이틀**: JetBrains Mono
- **본문**: Pretendard (시스템 폰트 fallback)

### 8.3. Spacing

- 헤더/콘텐츠 패딩: `48px`
- 카드 간격: `md` (16px) ~ `xl` (32px)

---

## 9. Key Components

### 9.1. Sidebar (`components/layout/Sidebar.tsx`)

- 토글 가능 (276px ↔ 60px)
- 네비게이션 메뉴
- 로고 및 버전 표시
- Hydration-safe 렌더링

### 9.2. AnswerRuleCard

- 응답 규칙 정보 표시
- 확장/축소 기능
- 도메인 배지
- 복사/비교 액션

### 9.3. InstructionsHome

- 도메인별 TOP 3 섹션
- 분야별 하이라이트
- 추천 응답 규칙

---

## 10. Development Guidelines

### 10.1. 파일 생성 규칙

1. 새 페이지: `app/[route]/page.tsx`
2. 재사용 컴포넌트: `components/shared/`
3. 페이지 전용 컴포넌트: `components/[feature]/`
4. 데이터 모델: `data/`
5. 상태 관리: `store/`

### 10.2. 스타일링 규칙

1. Mantine 컴포넌트 우선 사용
2. 커스텀 스타일: `styles` prop 또는 `globals.css`
3. 색상: `theme.ts` 또는 CSS Variables

### 10.3. 상태 관리 규칙

1. 전역 UI 상태: Zustand (`useAppStore`)
2. 데이터 필터링: Custom Hooks (`useAnswerRules`)
3. 컴포넌트 로컬 상태: `useState`