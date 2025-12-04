# UI 마크다운 - 2025년 12월 03일 16시 15분

--- 

### 대시보드 레이아웃 시스템

## 레이아웃 구조
- **컨테이너**: max-width 1200px, 중앙 정렬
- **사이드바**: 고정 너비 280px, sticky 포지셔닝
- **헤더**: 높이 64px, 그림자 효과
- **메인 컨텐츠**: flex-grow: 1, 패딩 24px
- **반응형**: 768px 이하에서 사이드바 숨김

### Tech Mono 폰트 시스템

## 타이포그래피
- **영문**: JetBrains Mono (400-700)
- **한글**: D2Coding (400-700)
- **폴백**: Consolas, monospace
- **크기**: 14px 기준, 1.1 배율
- **행간**: 1.3-1.4
- **특징**: 개발자, 기술 블로그에 적합

### Parallax Scroll 인터랙션

## 애니메이션 효과
- **트랜지션**: transform: translateY() + scroll
- **지속시간**: 스크롤 기반
- **적용 요소**: 배경, 이미지, 텍스트
- **성능**: will-change 속성 활용
- **접근성**: prefers-reduced-motion 고려

### Tech Mono 폰트 시스템

## 타이포그래피
- **영문**: JetBrains Mono (400-700)
- **한글**: D2Coding (400-700)
- **폴백**: Consolas, monospace
- **크기**: 14px 기준, 1.1 배율
- **행간**: 1.3-1.4
- **특징**: 개발자, 기술 블로그에 적합

### CSS Grid Modern 그리드 시스템

## 그리드 구조
- **컬럼**: auto-fit, minmax(250px, 1fr)
- **간격**: 32px (2rem)
- **브레이크포인트**: 유연한 반응형
- **컨테이너**: 100% width
- **특징**: 현대적이고 유연한 레이아웃

### Sharp Modern 컴포넌트 스타일

## 컴포넌트 디자인
- **모서리**: border-radius 0px
- **그림자**: box-shadow 0 2px 4px rgba(0,0,0,0.15)
- **호버**: transform translateY(-2px)
- **트랜지션**: all 0.15s ease
- **특징**: 기술적이고 전문적인 느낌

### Standard 성능 최적화

## 성능 최적화 전략
- **이미지**: WebP 포맷 사용
- **폰트**: Google Fonts 최적화
- **CSS**: 파일 압축 및 최소화
- **JS**: 번들링 및 최소화
- **캐싱**: 브라우저 캐싱 활용

### Desktop First 반응형 전략

## 반응형 접근법
- **우선순위**: 데스크톱 우선 설계
- **브레이크포인트**: max-width 기준
- **그리드**: 다중 컬럼 → 단일 컬럼
- **네비게이션**: 전체 메뉴 → 햄버거 메뉴
- **이미지**: 큰 크기 → 작은 크기
- **특징**: 데스크톱 기능 중심

### SEO Priority 성능 최적화

## 성능 최적화 전략
- **메타태그**: Open Graph, Twitter Cards
- **구조화**: Schema.org 마크업
- **속도**: Core Web Vitals 최적화
- **접근성**: WCAG 2.1 AA 준수
- **사이트맵**: XML 사이트맵 제출

