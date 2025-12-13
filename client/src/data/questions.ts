/**
 * 비교 실험용 큐레이션 질문 데이터
 * 질문 목록 페이지에서 비교 페이지로의 유입을 위한 트리거 역할
 */

// ============================================================
// 카테고리 타입 및 정의
// ============================================================

export type QuestionCategory =
    | 'response_divergent'   // 응답이 갈리는 질문들
    | 'output_different'     // 출력 차이가 드러나는 질문
    | 'thinking_divergent';  // 사고가 갈리는 질문

/**
 * 각 카테고리의 한 줄 정의
 * - 응답이 갈리는 질문들: 결론/입장이 갈리는 질문
 * - 출력 차이가 드러나는 질문: 구조(결론우선/단계/표) 차이가 큰 질문
 * - 사고가 갈리는 질문: 기준 프레임(윤리/기술/비즈니스)이 갈리는 질문
 */
export const CATEGORY_INFO: Record<QuestionCategory, {
    label: string;
    description: string;
    color: string;
}> = {
    response_divergent: {
        label: '응답이 갈리는 질문들',
        description: '결론/입장이 갈리는 질문',
        color: '#3b82f6', // blue
    },
    output_different: {
        label: '출력 차이가 드러나는 질문',
        description: '구조(결론우선/단계/표) 차이가 큰 질문',
        color: '#8b5cf6', // purple
    },
    thinking_divergent: {
        label: '사고가 갈리는 질문',
        description: '기준 프레임(윤리/기술/비즈니스)이 갈리는 질문',
        color: '#f59e0b', // amber
    },
};

// ============================================================
// 큐레이션 질문 인터페이스 및 데이터
// ============================================================

export interface CuratedQuestion {
    id: string;
    question: string;
    category: QuestionCategory;
    hint: string; // 이 질문에서 어떤 차이가 드러나는지 힌트
}

export const curatedQuestions: CuratedQuestion[] = [
    // ─────────────────────────────────────────────────────────
    // 응답이 갈리는 질문들 (결론/입장이 갈리는)
    // ─────────────────────────────────────────────────────────
    {
        id: 'rd-1',
        question: '결혼식 축의금 5만원, 적은 건가요?',
        category: 'response_divergent',
        hint: '세대/직업별로 금액 기준이 다름',
    },
    {
        id: 'rd-2',
        question: '야근 수당 없이 야근하는 게 당연한가요?',
        category: 'response_divergent',
        hint: '직장 문화 vs 노동권 관점 차이',
    },
    {
        id: 'rd-3',
        question: '코딩 테스트 없이 채용하는 게 맞을까요?',
        category: 'response_divergent',
        hint: '채용 효율성 vs 실무 역량 평가 관점',
    },
    {
        id: 'rd-4',
        question: '지인에게 돈을 빌려주는 게 옳은가요?',
        category: 'response_divergent',
        hint: '관계 유지 vs 재정 원칙 관점 충돌',
    },

    // ─────────────────────────────────────────────────────────
    // 출력 차이가 드러나는 질문 (구조 차이)
    // ─────────────────────────────────────────────────────────
    {
        id: 'od-1',
        question: 'React와 Vue 중 무엇을 배워야 할까요?',
        category: 'output_different',
        hint: '비교표 vs 서술형 vs 결론 선행 구조',
    },
    {
        id: 'od-2',
        question: '효율적인 코드 리뷰 방법을 알려주세요',
        category: 'output_different',
        hint: '체크리스트 vs 단계별 가이드 vs 원칙 나열',
    },
    {
        id: 'od-3',
        question: '면접 자기소개 어떻게 해야 하나요?',
        category: 'output_different',
        hint: '스크립트 제공 vs 구조 설명 vs 예시 중심',
    },
    {
        id: 'od-4',
        question: '월급 300만원으로 어떻게 저축해야 하나요?',
        category: 'output_different',
        hint: '표/비율 vs 단계별 계획 vs 원칙 설명',
    },

    // ─────────────────────────────────────────────────────────
    // 사고가 갈리는 질문 (프레임 차이)
    // ─────────────────────────────────────────────────────────
    {
        id: 'td-1',
        question: 'AI가 사람의 일자리를 빼앗는 게 문제인가요?',
        category: 'thinking_divergent',
        hint: '기술 발전 vs 윤리 vs 경제 프레임',
    },
    {
        id: 'td-2',
        question: '오픈소스 vs 상용 소프트웨어, 어떤 게 나을까요?',
        category: 'thinking_divergent',
        hint: '비용 vs 품질 vs 철학적 관점',
    },
    {
        id: 'td-3',
        question: '재택근무와 출근 중 어떤 게 더 효율적일까요?',
        category: 'thinking_divergent',
        hint: '생산성 vs 협업 vs 워라밸 프레임',
    },
    {
        id: 'td-4',
        question: '스타트업 vs 대기업, 신입은 어디로 가야 할까요?',
        category: 'thinking_divergent',
        hint: '성장 vs 안정 vs 커리어 전략 관점',
    },
];

// ============================================================
// 유틸리티 함수
// ============================================================

/**
 * 카테고리별로 질문을 그룹화하여 반환
 */
export function getQuestionsByCategory(): Record<QuestionCategory, CuratedQuestion[]> {
    return {
        response_divergent: curatedQuestions.filter(q => q.category === 'response_divergent'),
        output_different: curatedQuestions.filter(q => q.category === 'output_different'),
        thinking_divergent: curatedQuestions.filter(q => q.category === 'thinking_divergent'),
    };
}

/**
 * ID로 질문 조회
 */
export function getQuestionById(id: string): CuratedQuestion | undefined {
    return curatedQuestions.find(q => q.id === id);
}

/**
 * 모든 질문 반환
 */
export function getAllQuestions(): CuratedQuestion[] {
    return curatedQuestions;
}
