export interface AgentTrait {
    rationality: number; // 0 (Empathy) - 100 (Rationality)
    structure: number;   // 0 (Flow) - 100 (Structure)
    verbosity: number;   // 0 (Concise) - 100 (Verbose)
    theory: number;      // 0 (Practice) - 100 (Theory)
}

export interface IdentityState {
    traits: AgentTrait;
    dominance: string[]; // e.g. ["Analytical", "Structured"]
}

export interface SimulationScenario {
    id: string;
    question: string;
    options: {
        id: string;
        label: string;
        effect: Partial<AgentTrait>;
        insight: string; // The "Analysis" text shown by AI
    }[];
}

export const INITIAL_IDENTITY: IdentityState = {
    traits: {
        rationality: 50,
        structure: 50,
        verbosity: 50,
        theory: 50,
    },
    dominance: ["Neutral"],
};

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
    {
        id: "q1_error_handling",
        question: "코드 리뷰 중, 작동은 하지만 비효율적인 로직을 발견했습니다. 당신의 에이전트는 어떻게 반응해야 할까요?",
        options: [
            {
                id: "opt_fix_silent",
                label: "말없이 개선된 코드로 수정하여 보여준다.",
                effect: { rationality: 10, structure: -10, verbosity: -20 },
                insight: "효율성과 결과물을 최우선으로 생각하는 'Silent Solver' 성향이 감지되었습니다.",
            },
            {
                id: "opt_explain_detailed",
                label: "왜 비효율적인지 원리를 상세히 설명하고 수정을 제안한다.",
                effect: { rationality: 5, theory: 20, verbosity: 20 },
                insight: "지식 전달과 원리 이해를 중시하는 'Mentor' 성향이시군요.",
            },
            {
                id: "opt_warn_risks",
                label: "잠재적 성능 문제와 리스크를 경고하는 데 집중한다.",
                effect: { rationality: 20, structure: 10, theory: 10 },
                insight: "안정성과 리스크 관리를 중시하는 'Risk Averse' 패턴이 보입니다.",
            },
        ],
    },
    {
        id: "q2_communication_tone",
        question: "사용자가 기본적인 실수를 반복해서 질문합니다. 에이전트의 태도는?",
        options: [
            {
                id: "opt_empathetic",
                label: "좌절하지 않도록 격려하며 차근차근 다시 설명한다.",
                effect: { rationality: -20, verbosity: 10 },
                insight: "사용자의 감정을 케어하는 'Supportive'한 동반자가 필요하군요.",
            },
            {
                id: "opt_dry_fact",
                label: "감정적 동요 없이 매뉴얼과 정답만 건조하게 제시한다.",
                effect: { rationality: 20, verbosity: -10 },
                insight: "감정 소모를 줄이고 정보 효율을 극대화하는 'Dry Professional'을 선호하시는군요.",
            },
        ],
    },
    {
        id: "q3_output_structure",
        question: "복잡한 아키텍처를 설명해야 합니다. 어떤 형식을 선호합니까?",
        options: [
            {
                id: "opt_diagram_first",
                label: "먼저 다이어그램(Mermaid)과 도표로 구조를 잡고 시작한다.",
                effect: { structure: 20, verbosity: -5 },
                insight: "텍스트보다 시각적 구조화를 선호하는 'Structuralist' 성향입니다.",
            },
            {
                id: "opt_narrative",
                label: "비유와 스토리를 통해 흐름을 따라가듯 설명한다.",
                effect: { structure: -20, theory: -10, verbosity: 10 },
                insight: "논리의 흐름과 맥락을 중시하는 'Storyteller' 스타일입니다.",
            },
        ],
    },
    {
        id: "q4_prioritization",
        question: "내일이 마감인 프로젝트, 기능 구현은 다 됐지만 코드가 지저분합니다.",
        options: [
            {
                id: "opt_ship_it",
                label: "일단 배포가 우선입니다. 리팩토링은 나중에 합니다.",
                effect: { rationality: 10, theory: -20, structure: -10 },
                insight: "실용주의적(Pragmatic) 접근을 선호하며 비즈니스 임팩트를 우선시합니다.",
            },
            {
                id: "opt_refactor",
                label: "나쁜 코드는 배포하지 않습니다. 밤을 새서라도 정리합니다.",
                effect: { rationality: -10, theory: 10, structure: 20 },
                insight: "장인정신(Craftsmanship)과 코드 품질에 대한 타협 없는 기준을 가지고 계십니다.",
            }
        ]
    }
];

export function calculateIdentityUpdate(
    current: AgentTrait,
    effect: Partial<AgentTrait>
): AgentTrait {
    const newTraits = { ...current };
    (Object.keys(effect) as (keyof AgentTrait)[]).forEach((key) => {
        if (effect[key] !== undefined) {
            newTraits[key] = Math.max(0, Math.min(100, newTraits[key] + effect[key]!));
        }
    });
    return newTraits;
}

export function getNextQuestion(currentId: string | null): SimulationScenario | null {
    if (!currentId) return SIMULATION_SCENARIOS[0];
    const currentIndex = SIMULATION_SCENARIOS.findIndex((s) => s.id === currentId);
    if (currentIndex === -1 || currentIndex === SIMULATION_SCENARIOS.length - 1) return null;
    return SIMULATION_SCENARIOS[currentIndex + 1];
}
