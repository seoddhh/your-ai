# UI Design System - Your AI

> **Version:** 2.0.0
> **Date:** 2025-12-18
> **Description:** AI 응답 규칙 아카이브 플랫폼 'Your AI'의 UI 설계 가이드

---

## 1. Design Philosophy

### 1.1. 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **Aurora Gold** | 프리미엄하면서도 따뜻한 골드 계열 악센트 |
| **Clean & Minimal** | 정보 위계가 명확한 깔끔한 인터페이스 |
| **Hover-First** | Hover 인터랙션 중심의 UX (사이드바, 카드) |
| **Consistent Spacing** | 일관된 간격과 정렬 |

### 1.2. 디자인 레퍼런스

- **Wanted**: 깔끔한 카드 레이아웃, 필터 시스템
- **Disquiet**: 커뮤니티 기반 콘텐츠 정렬
- **Linear**: 미니멀한 사이드바, 키보드 중심 UX

---

## 2. Color System

### 2.1. Aurora Gold Theme

```css
:root {
  /* Primary - Aurora Gold */
  --accent-color: #E0B861;
  --accent-hover: #c9a254;
  --accent-light: rgba(224, 184, 97, 0.15);
  --accent-lighter: rgba(224, 184, 97, 0.2);
  --gold-light: #faf7e8;
  --gold-medium: #E4C778;

  /* Background */
  --bg-color: #f0eee9;
  --card-bg: #ffffff;

  /* Sidebar */
  --sidebar-bg: #2a2a28;
  --sidebar-text: #c9c9c0;

  /* Text */
  --text-primary: #2a2a28;
  --text-secondary: #5a5a52;

  /* Border */
  --border-color: #e8e4d9;
}
```

### 2.2. Mantine Color Scale (Aurora Gold)

```typescript
const auroraGold: MantineColorsTuple = [
  '#fdfdf2', // 0 - 가장 밝은 배경
  '#faf7e8', // 1
  '#f5edcf', // 2
  '#efe2b3', // 3
  '#e8d494', // 4
  '#E4C778', // 5
  '#E0B861', // 6 - Primary (메인 포인트)
  '#c9a254', // 7
  '#b08d47', // 8
  '#96783a', // 9 - 가장 어두운
];
```

### 2.3. 도메인별 컬러

```typescript
const DOMAIN_COLORS = {
  Tech: '#3b82f6',      // Blue
  Creative: '#ec4899',  // Pink
  Business: '#f59e0b',  // Amber
  Academia: '#8b5cf6',  // Purple
  Healthcare: '#10b981', // Emerald
  Education: '#06b6d4', // Cyan
  Finance: '#6366f1',   // Indigo
  Legal: '#64748b',     // Slate
};
```

---

## 3. Typography

### 3.1. Font Stack

```css
:root {
  --font-main: 'Wanted Sans Variable', 'Wanted Sans', 
               -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 3.2. Font Weights

| 용도 | Weight |
|------|--------|
| 제목 (Heading) | 700 (Bold) |
| 강조 텍스트 | 600 (SemiBold) |
| 본문 | 400 (Regular) |
| 캡션/메타 | 400 (Regular) + 색상 dimmed |

### 3.3. Font Sizes (Mantine 기준)

| 용도 | Size | 예시 |
|------|------|------|
| 페이지 타이틀 | xl~xxl | 28-32px |
| 섹션 타이틀 | lg | 18px |
| 카드 제목 | md | 16px |
| 본문 | sm | 14px |
| 캡션/태그 | xs | 12px |

---

## 4. Layout System

### 4.1. Global Layout

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

### 4.2. App Container

```html
<div class="app-container">  <!-- display: flex -->
  <Sidebar />                 <!-- sticky, height: 100vh -->
  <main class="main-content"> <!-- flex-grow: 1 -->
    <!-- Page Content -->
  </main>
</div>
```

### 4.3. Grid System

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
```

### 4.4. 반응형 Breakpoints

| Breakpoint | 동작 |
|------------|------|
| > 768px | 전체 레이아웃 (사이드바 + 콘텐츠) |
| ≤ 768px | 사이드바 숨김, 모바일 레이아웃 |

---

## 5. Components

### 5.1. Sidebar

**상태:**
- **축소 (Default)**: width 60px, 아이콘만 표시
- **확장 (Hover)**: width 280px, 아이콘 + 라벨

**스타일:**
```css
.sidebar {
  background-color: var(--sidebar-bg);  /* #2a2a28 */
  color: var(--sidebar-text);           /* #c9c9c0 */
  height: 100vh;
  position: sticky;
  top: 0;
  transition: width 0.3s ease;
}
```

**NavItem:**
- 비활성: 기본 텍스트 색상
- Hover: 배경 rgba(255,255,255,0.08)
- 활성: 골드 악센트 (#E0B861), 왼쪽 보더

### 5.2. Card

**기본 스타일:**
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;  /* radius: md~xl */
  padding: 16-24px;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-color: var(--accent-color);
}
```

### 5.3. AnswerRuleCard 정보 위계

1. **제목** (fw: 700, size: md) + 도메인 배지
2. **대상 역할** (size: xs, color: dimmed)
3. **설명** (size: sm, lineClamp: 2)
4. **태그** (Badge, pill 형태, 최대 3개)
5. **확장 시**: 사용자 프로필 + 액션 버튼
6. **푸터**: 사용자 수 + 작성자

### 5.4. Badge

**도메인 배지:**
```typescript
{
  variant: 'light',
  size: 'sm',
  backgroundColor: `${domainColor}15`,  // 15% opacity
  color: domainColor,
}
```

**태그 배지:**
```typescript
{
  variant: 'outline',
  color: 'gray',
  radius: 'sm',
  fontWeight: 400,
  textTransform: 'none',
}
```

### 5.5. Button

**Primary (CTA):**
```typescript
{
  variant: 'filled',
  color: 'yellow',
  styles: { root: { backgroundColor: '#E0B861' } },
}
```

**Secondary:**
```typescript
{
  variant: 'light',
  color: 'gray',
}
```

---

## 6. Animation & Motion

### 6.1. Timing Variables

```css
:root {
  --motion-fast: 0.15s ease;
  --motion-base: 0.25s ease;
  --motion-slow: 0.4s ease;
}
```

### 6.2. Framer Motion - List Animation

```typescript
// 개별 카드
<motion.div
  layout
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, delay: index * 0.02 }}
>
  {/* Card Content */}
</motion.div>
```

### 6.3. Expand/Collapse

```typescript
<AnimatePresence>
  {isExpanded && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Expanded Content */}
    </motion.div>
  )}
</AnimatePresence>
```

### 6.4. Hover Effects

```css
/* Button */
.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

/* Card */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-color: var(--accent-color);
}
```

---

## 7. Scrollbar

### 7.1. Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
```

### 7.2. Hide Scrollbar

```css
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```

---

## 8. Accessibility

### 8.1. Focus States

- Mantine 기본 focus ring 사용
- 키보드 네비게이션 지원

### 8.2. Color Contrast

- 텍스트: WCAG AA 준수
- 인터랙티브 요소: 충분한 대비

### 8.3. Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Icons

### 9.1. Icon Library

- **Primary**: Tabler Icons (`@tabler/icons-react`)
- **크기**: 16-24px (상황에 따라)

### 9.2. 사용되는 주요 아이콘

| 아이콘 | 용도 |
|--------|------|
| `IconHome` | 홈 네비게이션 |
| `IconPlus` | 등록/추가 |
| `IconBooks` | 라이브러리 |
| `IconGitCompare` | 비교 |
| `IconSparkles` | 나의 AI |
| `IconMessageQuestion` | 질문 |
| `IconEye` | 상세보기 |
| `IconTrash` | 삭제 |

### 9.3. 도메인 아이콘 (이미지)

```
/public/icons/
├── 001-icon-5110754.png  (전체)
├── developericons.png     (Tech)
├── designer.png           (Creative)
├── business.png           (Business)
├── professor.png          (Academia)
├── teacher.png            (Education)
├── doctor.png             (Healthcare)
├── bank.png               (Finance)
└── law.png                (Legal)
```

---

## 10. Performance

### 10.1. 이미지 최적화

- Next.js `Image` 컴포넌트 사용
- WebP 포맷 권장

### 10.2. 폰트 최적화

- Wanted Sans: CDN 로드 (variable font)
- `font-display: swap`

### 10.3. CSS 최적화

- CSS Variables 활용
- 불필요한 스타일 제거

### 10.4. Animation 성능

- `will-change` 사용 주의
- `transform`, `opacity` 위주 애니메이션

---

## 11. 개선 고려사항

### 11.1. 현재 이슈

- [ ] 다크모드 미지원
- [ ] 모바일 네비게이션 개선 필요
- [ ] 키보드 단축키 미구현

### 11.2. 향후 계획

- [ ] 다크모드 토글
- [ ] 드롭다운/바텀시트 모바일 네비게이션
- [ ] 스켈레톤 로딩 UI
- [ ] 토스트 알림 시스템
