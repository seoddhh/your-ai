import { Domain } from '@/data/customInstructions';

export type UseCaseType =
  | 'writing'
  | 'analysis'
  | 'planning'
  | 'feedback'
  | 'learning'
  | 'decision'
  | 'communication';

export interface UseCase {
  id: string;
  domain: Domain;
  type: UseCaseType;
  title: string;
  goal: string;
  inputs: string[];
  promptTemplate: string;
  desiredTags: string[];
  notes?: string;
}

export const USE_CASE_TYPE_LABEL: Record<UseCaseType, string> = {
  writing: '작성',
  analysis: '분석',
  planning: '기획',
  feedback: '피드백',
  learning: '학습',
  decision: '의사결정',
  communication: '커뮤니케이션',
};

export const useCases: UseCase[] = [
  {
    id: 'tech-pr-review',
    domain: 'Tech',
    type: 'feedback',
    title: 'PR 코드리뷰 코멘트 정리',
    goal: '코드 품질/리스크/개선안을 구조적으로 리뷰한다.',
    inputs: ['PR 요약', '변경된 파일/핵심 diff', '의도/배경', '제약(일정/성능/호환성)'],
    desiredTags: ['코드 위주', '간결함', '단계별', '리스크'],
    promptTemplate: `당신은 시니어 개발자입니다. 아래 PR을 리뷰해주세요.

[PR 요약]
{{summary}}

[핵심 변경점 / diff]
{{diff}}

[리뷰 기준]
- 버그/엣지케이스
- 성능/복잡도
- 가독성/유지보수성
- 보안/안정성

[출력 형식]
1) 총평(1~2줄)
2) 반드시 수정(Must-fix) 목록
3) 제안사항(Should) 목록
4) 칭찬/좋은 점
5) 체크리스트(테스트/로그/모니터링)`,
    notes: 'diff를 그대로 붙이면 길어지니 핵심 부분만 발췌하면 더 좋아요.',
  },
  {
    id: 'tech-architecture-tradeoff',
    domain: 'Tech',
    type: 'decision',
    title: '아키텍처 대안 비교(트레이드오프)',
    goal: '여러 설계안의 장단점/리스크/결정 기준을 명확히 한다.',
    inputs: ['요구사항', '트래픽/성능 목표', '팀 역량/제약', '후보 아키텍처 2~3개'],
    desiredTags: ['시스템 설계', '아키텍처', '확장성', '리스크'],
    promptTemplate: `당신은 백엔드 아키텍트입니다. 아래 설계안을 비교해 주세요.

[요구사항]
{{requirements}}

[후보 설계안]
A안: {{optionA}}
B안: {{optionB}}
(있다면) C안: {{optionC}}

[평가 기준]
- 확장성/성능
- 운영 난이도
- 개발 속도
- 비용
- 리스크(장애/데이터/보안)

[출력 형식]
1) 결론(추천안 + 이유 3개)
2) 비교표(기준별 점수/근거)
3) 리스크와 대응책
4) 다음 액션(검증/PoC 항목)`,
  },
  {
    id: 'creative-ux-review',
    domain: 'Creative',
    type: 'feedback',
    title: 'UX 화면 피드백(문제→개선안)',
    goal: '사용자 관점에서 문제를 찾고 개선안을 제안한다.',
    inputs: ['화면 설명/링크', '타겟 유저', '핵심 목표(전환/가입/구매)', '현재 이슈'],
    desiredTags: ['UX', 'UI', '접근성', '단계별'],
    promptTemplate: `당신은 UX/UI 디자이너입니다. 아래 화면에 대해 피드백해주세요.

[화면/상황]
{{screen_context}}

[타겟 유저]
{{target_user}}

[목표]
{{goal}}

[출력 형식]
1) 핵심 문제 3가지(근거 포함)
2) 개선안(우선순위: High/Med/Low)
3) 카피/마이크로카피 제안 5개
4) 접근성 체크(색/대비/포커스/ARIA)`,
  },
  {
    id: 'business-prd-outline',
    domain: 'Business',
    type: 'planning',
    title: 'PRD 초안 생성(요구사항→스펙)',
    goal: '아이디어를 팀이 실행 가능한 PRD로 정리한다.',
    inputs: ['문제/기회', '타겟 유저', '성공 지표', '범위/제약', '경쟁/대안'],
    desiredTags: ['PRD', '로드맵', '우선순위', 'SaaS'],
    promptTemplate: `당신은 B2B SaaS PM입니다. 아래 정보를 바탕으로 PRD 초안을 작성해주세요.

[문제/기회]
{{problem}}

[타겟 유저]
{{target}}

[성공 지표]
{{metrics}}

[범위/제약]
{{scope}}

[출력 형식]
- 배경/목표
- 사용자 스토리(3~5개)
- 요구사항(기능/비기능)
- 제외 범위(Out of scope)
- 리스크/가정
- 우선순위(MoSCoW 또는 RICE)
- 출시 계획(마일스톤)`,
  },
  {
    id: 'marketing-funnel-diagnosis',
    domain: 'Marketing',
    type: 'analysis',
    title: '퍼널 진단(이탈 원인→실험 설계)',
    goal: '지표를 기반으로 병목을 찾고 실험을 제안한다.',
    inputs: ['퍼널 단계 정의', '기간/트래픽', '전환율', '유입 채널', '제약(예산/리소스)'],
    desiredTags: ['퍼널', 'A/B테스트', '데이터', 'ROI'],
    promptTemplate: `당신은 그로스 마케터입니다. 아래 퍼널 데이터를 분석하고 실험을 설계해주세요.

[퍼널 정의]
{{funnel_steps}}

[데이터]
{{data}}

[출력 형식]
1) 병목 단계와 원인 가설(우선순위)
2) 실험 제안 3~5개(A/B 테스트 가설, 변경점, 기대효과)
3) 측정 지표(Primary/Secondary)
4) 리스크 및 실패 시 학습 포인트`,
  },
  {
    id: 'academia-paper-summary',
    domain: 'Academia',
    type: 'analysis',
    title: '논문 요약 + 한계/후속 연구',
    goal: '논문을 빠르게 이해하고 비판적으로 정리한다.',
    inputs: ['논문 초록/본문 일부', '관심 포인트', '내 연구 주제'],
    desiredTags: ['논문', '연구', '인용', '통계'],
    promptTemplate: `당신은 학술 연구자입니다. 아래 논문을 요약하고 비판적으로 분석해주세요.

[논문 텍스트]
{{paper_text}}

[내 관심 포인트]
{{focus}}

[출력 형식]
1) 한 문장 요약
2) 연구 질문/가설
3) 방법론(데이터/모델/실험)
4) 핵심 결과
5) 한계/위협(Validity)
6) 후속 연구 아이디어 3개
7) 인용 문장 후보(짧은 문장 2~3개)`,
  },
  {
    id: 'education-tutor',
    domain: 'Education',
    type: 'learning',
    title: '개념 튜터링(진단→맞춤 설명)',
    goal: '학습자의 수준을 진단하고 단계적으로 가르친다.',
    inputs: ['배우는 주제', '현재 이해 수준', '막히는 지점', '목표(시험/실무)'],
    desiredTags: ['쉬운 설명', '단계별', '실습', '초보자'],
    promptTemplate: `당신은 친절한 튜터입니다. 아래 조건에 맞춰 가르쳐주세요.

[주제]
{{topic}}

[내 수준]
{{level}}

[막히는 지점]
{{stuck}}

[출력 형식]
1) 먼저 이해도 확인 질문 3개
2) 쉬운 설명(비유 1개 포함)
3) 예시
4) 실습 문제 3개(난이도 점진)
5) 정답/해설`,
  },
  {
    id: 'legal-contract-check',
    domain: 'Legal',
    type: 'analysis',
    title: '계약서 리스크 체크리스트',
    goal: '조항별 리스크를 정리하고 수정안을 제안한다.',
    inputs: ['계약서 텍스트', '당사자(갑/을)', '핵심 우려(대금/해지/책임)', '관할/준거법'],
    desiredTags: ['계약', '법조항', '리스크', '컴플라이언스'],
    promptTemplate: `당신은 계약 검토에 능한 법률가입니다. 아래 계약서를 검토해주세요.

[계약서]
{{contract_text}}

[상황]
- 우리 입장(갑/을): {{position}}
- 우려사항: {{concerns}}

[출력 형식]
1) 위험 조항 Top 5(이유)
2) 수정 제안 문구(대체 문장)
3) 추가로 확인할 질문(누락된 정보)
4) 협상 우선순위`,
    notes: '법률 자문이 아니라 참고용이라는 디스클레이머를 붙이는 것을 권장해요.',
  },
  {
    id: 'finance-statement-analysis',
    domain: 'Finance',
    type: 'analysis',
    title: '재무제표 요약(핵심 지표/리스크)',
    goal: '손익/현금흐름 관점에서 요점을 요약한다.',
    inputs: ['재무제표 요약', '동종 업계/비교 대상', '투자 관점(성장/가치)', '기간'],
    desiredTags: ['재무제표', '투자', '리스크', '산업분석'],
    promptTemplate: `당신은 투자 분석가입니다. 아래 재무 정보를 요약하고 리스크를 분석해주세요.

[재무 데이터]
{{financials}}

[비교 대상/업계]
{{benchmarks}}

[출력 형식]
1) 핵심 요약(3줄)
2) 지표 분석(성장성/수익성/안정성/현금흐름)
3) 리스크 5개와 확인 방법
4) 추가로 필요한 데이터`,
  },
];

export function getAllUseCases(): UseCase[] {
  return useCases;
}

export function getUseCaseById(id: string): UseCase | undefined {
  return useCases.find((u) => u.id === id);
}

export function getUseCasesByDomain(domain: Domain | 'all'): UseCase[] {
  if (domain === 'all') return useCases;
  return useCases.filter((u) => u.domain === domain);
}

