# PROJECT SPECIFICATION: Your AI

> **Version:** 3.1.0
> **Date:** 2025-12-18
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
| **큐레이션 질문 (Curated Question)** | 응답 규칙별 차이를 확인할 수 있도록 정리된 실험용 질문 |

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
│  │               Hooks Layer                    │           │
│  │   (useAnswerRules, useAppStore, useFilterStore)         │
│  └──────────────────────┬──────────────────────┘           │
│                         │                                   │
│  ┌──────────────────────┴──────────────────────┐           │
│  │          Data Layer (Static + LocalStorage)  │           │
│  └─────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

- **Client**: Next.js 14 App Router + Mantine UI
- **Styling**: Mantine Components + Tailwind Utilities + Custom CSS Variables
- **State Management**: Zustand (persist to LocalStorage)
- **Animation**: Framer Motion
- **Data**: Static TypeScript + User LocalStorage

---

## 2. Directory Structure

```text
client/src/
├─ app/                           # Next.js App Router Pages
│  ├─ layout.tsx                  # Global Layout (Mantine Provider)
│  ├─ page.tsx                    # Landing/Home Router
│  ├─ globals.css                 # Global Styles + CSS Variables
│  ├─ compare/
│  │  ├─ page.tsx                 # 응답 규칙 비교 페이지
│  │  └─ compare.module.css       # 비교 페이지 스타일
│  ├─ instructions/page.tsx       # 응답 규칙 라이브러리 페이지
│  ├─ my-ai/page.tsx              # 나의 AI 만들기 페이지
│  ├─ questions/
│  │  ├─ page.tsx                 # 큐레이션 질문 목록
│  │  └─ [id]/page.tsx            # 질문 상세 (답변 비교)
│  ├─ register/page.tsx           # 응답 규칙 등록 페이지
│  └─ rule/[id]/page.tsx          # 응답 규칙 상세 페이지
│
├─ components/
│  ├─ Providers.tsx               # Mantine + Theme Provider
│  ├─ layout/
│  │  ├─ Sidebar.tsx              # 통합 사이드바 네비게이션 (hover 확장)
│  │  └─ Header.tsx               # 페이지 헤더
│  ├─ home/
│  │  ├─ InstructionsHome.tsx     # 홈 메인 콘텐츠 (도메인 탭, TOP 3)
│  │  ├─ QuestionFeed.tsx         # 질문 피드
│  │  ├─ LandingHero.tsx          # 랜딩 히어로 섹션
│  │  └─ ScrollLanding.tsx        # 랜딩 스크롤 애니메이션
│  ├─ shared/
│  │  ├─ AnswerRuleCard.tsx       # 응답 규칙 카드 컴포넌트
│  │  ├─ AnswerRuleListSection.tsx # 응답 규칙 리스트 섹션
│  │  └─ DomainHighlightSection.tsx # 도메인별 하이라이트
│  ├─ questions/
│  │  ├─ QuestionCard.tsx         # 질문 카드
│  │  └─ QuestionCard.module.css  # 질문 카드 스타일
│  ├─ answers/
│  │  └─ AnswerCard.tsx           # 답변 카드
│  └─ ui/
│     └─ FilterChips.tsx          # 필터 칩 UI
│
├─ data/
│  ├─ customInstructions.ts       # 응답 규칙 데이터 모델 및 샘플
│  └─ questions.ts                # 큐레이션 질문 데이터
│
├─ hooks/
│  └─ useAnswerRules.ts           # 응답 규칙 필터/정렬 훅
│
├─ store/
│  ├─ useAppStore.ts              # Zustand 전역 상태 (앱 상태 + 사용자 규칙)
│  └─ useFilterStore.ts           # 필터 상태 관리
│
└─ theme.ts                       # Mantine 테마 설정 (Aurora Gold)
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

### 3.3. CuratedQuestion (큐레이션 질문)

```typescript
type QuestionCategory =
  | 'response_divergent'   // 응답이 갈리는 질문들 (결론/입장 차이)
  | 'output_different'     // 출력 차이가 드러나는 질문 (구조 차이)
  | 'thinking_divergent';  // 사고가 갈리는 질문 (프레임 차이)

interface CuratedQuestion {
  id: string;
  question: string;
  category: QuestionCategory;
  hint: string;  // 이 질문에서 어떤 차이가 드러나는지 힌트
}
```

### 3.4. DomainMeta (도메인 메타정보)

```typescript
const DOMAIN_META: Record<Domain, { 
  label: string;   // 한글 라벨
  emoji: string;   // 대표 이모지
  color: string;   // 테마 색상
}>;
```

---

## 4. State Management (Zustand)

### 4.1. AppState (useAppStore)

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
  updateUserInstruction: (id: string, updates: Partial<CustomInstruction>) => void;
  deleteUserInstruction: (id: string) => void;
}
```

### 4.2. FilterState (useFilterStore)

```typescript
type FilterCategory = 
  | 'domain' 
  | 'usageStyle' 
  | 'experience' 
  | 'cognitiveStyle' 
  | 'toolStack' 
  | 'outputPreference';

interface FilterState {
  filters: Record<FilterCategory, string[]>;
  toggleFilter: (category: FilterCategory, value: string) => void;
  removeFilter: (category: FilterCategory, value: string) => void;
  clearFilters: () => void;
}
```

### 4.3. Persistence

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
  onlyTrending?: boolean;      // 인기 항목만 (popularity >= 400)
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
| `/compare` | Compare | 응답 규칙 비교 (질문 → 다중 응답) |
| `/questions` | Questions | 큐레이션 질문 목록 (카테고리별) |
| `/questions/[id]` | Question Detail | 질문별 답변 비교 |
| `/register` | Register | 새 응답 규칙 등록 |
| `/my-ai` | My AI | 나의 AI 스타일 테스트 |
| `/rule/[id]` | Rule Detail | 응답 규칙 상세 보기 |

---

## 7. UI Layout

### 7.1. 통합 레이아웃 구조

```html
<div class="app-container">
  <Sidebar />             <!-- hover 시 확장 (60px → 280px) -->
  <main class="main-content">
    <!-- 페이지별 콘텐츠 -->
  </main>
</div>
```

### 7.2. Sidebar 구성

- **Hover 확장 방식**: 기본 60px, hover 시 280px
- **네비게이션 항목**: 아이콘 + 텍스트 (확장 시)
- **로고**: 축소 시 아이콘만, 확장 시 전체 로고

| 메뉴 | 경로 | 아이콘 |
|------|------|--------|
| 홈 | `/` | IconHome |
| 응답 규칙 등록 | `/register` | IconPlus |
| 응답 규칙 라이브러리 | `/instructions` | IconBooks |
| 질문 목록 | `/questions` | IconMessageQuestion |
| 응답 규칙 비교 | `/compare` | IconGitCompare |
| 나의 AI 만들기 | `/my-ai` | IconSparkles |

### 7.3. 홈 페이지 구성 (InstructionsHome)

1. **도메인 탭**: 아이콘 기반 도메인 선택
2. **도메인별 TOP 3**: 선택된 도메인의 인기 규칙
3. **사용자 등록 규칙**: 내가 등록한 응답 규칙
4. **분야별 하이라이트**: 각 도메인 대표 규칙

---

## 8. Design System

### 8.1. Colors (Aurora Gold Theme)

```css
:root {
  /* 메인 컬러 */
  --accent-color: #E0B861;      /* Aurora Gold - Primary */
  --accent-hover: #c9a254;
  --accent-light: rgba(224, 184, 97, 0.15);
  
  /* 배경 */
  --bg-color: #f0eee9;
  --card-bg: #ffffff;
  --gold-light: #faf7e8;
  
  /* 사이드바 */
  --sidebar-bg: #2a2a28;
  --sidebar-text: #c9c9c0;
  
  /* 텍스트 */
  --text-primary: #2a2a28;
  --text-secondary: #5a5a52;
  
  /* 보더 */
  --border-color: #e8e4d9;
}
```

### 8.2. Typography

- **주 폰트**: Wanted Sans Variable (한글/영문 통합)
- **폴백**: -apple-system, BlinkMacSystemFont, sans-serif

### 8.3. Layout Variables

```css
:root {
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 60px;
  --header-height: 64px;
  --content-max-width: 1200px;
  --content-padding: 48px;
  --section-gap: 48px;
  --card-gap: 16px;
}
```

### 8.4. Motion

```css
:root {
  --motion-fast: 0.15s ease;
  --motion-base: 0.25s ease;
  --motion-slow: 0.4s ease;
}
```

---

## 9. Key Components

### 9.1. Sidebar (`components/layout/Sidebar.tsx`)

- Hover 시 자동 확장 (60px → 280px)
- NavItem: 아이콘 + 툴팁 (축소) / 아이콘 + 라벨 (확장)
- 활성 경로 하이라이트
- Hydration-safe 렌더링

### 9.2. AnswerRuleCard (`components/shared/AnswerRuleCard.tsx`)

**정보 위계 (고정):**
1. 제목 (가장 강조) + 도메인 배지
2. 대상 역할 (targetRole)
3. 한 줄 설명
4. 태그 (pill 형태, 최대 3개)
5. 확장 시: 사용자 프로필 + 액션 버튼
6. 푸터: 사용자 수 + 작성자

**Props:**
```typescript
interface AnswerRuleCardProps {
  instruction: CustomInstruction;
  index?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  isUserOwned?: boolean;
  isCompact?: boolean;
  showAnimation?: boolean;
}
```

### 9.3. InstructionsHome (`components/home/InstructionsHome.tsx`)

- 도메인 탭 (아이콘 기반, 9개: all + 8 domains)
- TopRankCard: 순위 표시 (1, 2, 3...)
- CompactRuleCard: 사용자 등록 규칙용
- 애니메이션: Framer Motion AnimatePresence

### 9.4. QuestionCard (`components/questions/QuestionCard.tsx`)

- 질문 텍스트 + 힌트
- 카테고리 배지
- CTA: 비교 페이지로 이동 (질문 자동 주입)

---

## 10. Development Guidelines

### 10.1. 파일 생성 규칙

1. 새 페이지: `app/[route]/page.tsx`
2. 재사용 컴포넌트: `components/shared/`
3. 페이지 전용 컴포넌트: `components/[feature]/`
4. 데이터 모델: `data/`
5. 상태 관리: `store/`
6. 커스텀 훅: `hooks/`

### 10.2. 스타일링 규칙

1. Mantine 컴포넌트 우선 사용
2. CSS Variables 활용 (`globals.css`에 정의)
3. 컴포넌트별 스타일: `styles` prop 또는 `.module.css`
4. 색상: `theme.ts`의 Aurora Gold 팔레트

### 10.3. 상태 관리 규칙

1. 전역 UI 상태: `useAppStore` (Zustand)
2. 필터 상태: `useFilterStore` (Zustand)
3. 데이터 필터링: `useAnswerRules` (Custom Hook)
4. 컴포넌트 로컬 상태: `useState`

### 10.4. 애니메이션 규칙

1. 리스트 애니메이션: Framer Motion AnimatePresence
2. 트랜지션: CSS Variables (`--motion-fast`, `--motion-base`)
3. 호버 효과: `transform: translateY(-2px)` + `box-shadow`

---

## 11. 향후 개선 방향

### 11.1. 현재 제한사항

- 데이터: Static TypeScript (API 미연동)
- 인증: 없음 (LocalStorage 기반)
- 검색: 클라이언트 사이드 필터링

### 11.2. 예정된 개선

1. **Backend 연동**: NestJS API 서버
2. **사용자 인증**: OAuth 또는 자체 인증
3. **실시간 AI 응답**: OpenAI API 연동
4. **커뮤니티 기능**: 좋아요, 댓글, 팔로우