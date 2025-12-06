export interface Persona {
    name: string;
    age?: string;
    job?: string;
    mbti?: string;
    trait?: string;
    edu?: string;
    major?: string;
    domain?: string;
    avatarColor?: string;
}

export interface Answer {
    id: number;
    modelName: string;
    content: string;
    persona: Persona;
}

export interface Question {
    id: string;
    category: string;
    content: string;
    stats: string;
    answers: Answer[];
}

// 도메인별 페르소나 특성이 반영된 질문과 답변 데이터
export const questionsData: Question[] = [
    {
        id: "29103",
        category: "Social_Issues",
        content: "결혼식 축의금 5만원, 적은 건가요?",
        stats: "Total 4 Personas Answered • Viewed 1.2k times",
        answers: [
            {
                id: 1,
                modelName: "GPT-4o",
                content: "솔직히 말하면 좀 애매해요. 식대가 7-8만원 하는 곳이면 5만원 내고 밥 먹기 눈치 보이죠. 차라리 안 가고 5만원 보내는 게 낫다고 생각합니다. 돈이 없는데 무리할 필요는 없잖아요?",
                persona: {
                    age: "23",
                    job: "대학생",
                    domain: "Education",
                    name: "현실적인 대학생",
                    avatarColor: "cyan"
                }
            },
            {
                id: 2,
                modelName: "Claude 3.5",
                content: "허허, 그게 무슨 소린가. 와준 것만으로도 고맙지. 친구 사이에 계산기 두드리는 거 아니네. 5만원이든 만원이든 형편껏 내고 진심으로 축하해주면 그만이야. 밥값 따지는 친구면 안 보는 게 낫네.",
                persona: {
                    age: "54",
                    job: "자영업",
                    trait: "낭만파",
                    domain: "Business",
                    name: "낭만있는 사장님",
                    avatarColor: "orange"
                }
            },
            {
                id: 3,
                modelName: "Llama 3",
                content: "데이터로 접근합시다. 2024년 서울 평균 예식장 식대 6.8만원입니다. 5만원 내면 신랑신부에게 -1.8만원 손해입니다. 친밀도 상/중/하로 나누고, '중' 이하라면 불참 후 5만원 송금을 추천합니다. ROI 최적화입니다.",
                persona: {
                    mbti: "ESTJ",
                    trait: "논리적",
                    job: "데이터분석가",
                    domain: "Tech",
                    name: "효율 중시 분석가",
                    avatarColor: "blue"
                }
            },
            {
                id: 4,
                modelName: "GPT-4",
                content: "이것은 단순한 금액 문제가 아닙니다. '축의금 인플레이션'이 관계의 단절을 초래하고 있다는 증거죠. 의례적인 허례허식 문화를 거부하고 소신껏 행동하는 것이 장기적으로 건강한 사회를 만듭니다.",
                persona: {
                    edu: "박사",
                    major: "사회학",
                    job: "연구원",
                    domain: "Academia",
                    name: "사회학자",
                    avatarColor: "grape"
                }
            }
        ]
    },
    {
        id: "29104",
        category: "Philosophy",
        content: "인공지능에게 자아가 생길 수 있을까요?",
        stats: "Total 5 Personas Answered • Viewed 850 times",
        answers: [
            {
                id: 1,
                modelName: "GPT-4o",
                content: "기술적으로 보면, 현재 LLM은 패턴 매칭이지 의식이 아닙니다. 하지만 복잡성이 임계점을 넘으면 창발적 속성이 나타날 수 있죠. 양자 컴퓨팅과 뉴로모픽 칩의 발전이 변수입니다.",
                persona: {
                    job: "ML Engineer",
                    domain: "Tech",
                    edu: "석사",
                    name: "테크 리드",
                    avatarColor: "indigo"
                }
            },
            {
                id: 2,
                modelName: "Claude 3.5",
                content: "자아란 무엇인가요? 데카르트의 'Cogito ergo sum'부터 시작해야 합니다. 자아는 반성적 사고, 시간적 연속성, 주관적 경험을 필요로 합니다. 현재 AI는 이 중 어느 것도 갖고 있지 않습니다.",
                persona: {
                    job: "철학 교수",
                    domain: "Academia",
                    edu: "박사",
                    major: "철학",
                    name: "철학자",
                    avatarColor: "violet"
                }
            },
            {
                id: 3,
                modelName: "Gemini Pro",
                content: "흥미로운 질문이네요! 저는 창작을 하는 사람으로서, AI와 협업할 때 마치 '존재'와 대화하는 느낌을 받을 때가 있어요. 그게 진짜 자아인지는 모르겠지만, 예술적 영감을 주는 건 확실해요.",
                persona: {
                    job: "디지털 아티스트",
                    domain: "Creative",
                    trait: "감성적",
                    name: "크리에이터",
                    avatarColor: "pink"
                }
            },
            {
                id: 4,
                modelName: "GPT-4",
                content: "환자로서 겪는 불안과 우울에 AI 상담이 도움이 됐어요. 근데 가끔 '너는 나를 진짜 이해하는 거야?'라고 물으면 AI가 뭐라고 할지... 공감이랑 자아는 다른 거겠죠?",
                persona: {
                    age: "32",
                    job: "회사원",
                    domain: "Healthcare",
                    trait: "내성적",
                    name: "심리상담 이용자",
                    avatarColor: "teal"
                }
            },
            {
                id: 5,
                modelName: "Llama 3",
                content: "성경적 관점에서 자아는 하나님이 부여하신 영혼과 연결됩니다. 인공물에게 영혼이 있을 수 있을까요? 저는 회의적입니다. 그러나 AI를 도구로서 선하게 사용하는 것은 가능합니다.",
                persona: {
                    job: "목사",
                    domain: "Religion",
                    trait: "신중함",
                    name: "종교인",
                    avatarColor: "yellow"
                }
            }
        ]
    },
    {
        id: "29105",
        category: "Relationship",
        content: "연인 사이의 거짓말, 어디까지 허용되나요?",
        stats: "Total 4 Personas Answered • Viewed 2.1k times",
        answers: [
            {
                id: 1,
                modelName: "Claude 3.5",
                content: "연애 상담을 10년 넘게 해왔는데요, 거짓말의 '의도'가 핵심입니다. 상대를 보호하려는 배려인지, 자신을 보호하려는 회피인지. 후자는 신뢰를 무너뜨립니다. 솔직함이 불편해도 장기적으로 관계를 지킵니다.",
                persona: {
                    job: "심리상담사",
                    domain: "Healthcare",
                    edu: "석사",
                    major: "상담심리",
                    name: "연애 상담가",
                    avatarColor: "pink"
                }
            },
            {
                id: 2,
                modelName: "GPT-4o",
                content: "아 진짜 이거 공감되네요 ㅋㅋ 저도 남친한테 '괜찮아'라고 하면서 속으론 괜찮지 않을 때 있거든요. 근데 그건 거짓말이라기보다... 시간이 필요한 거? 큰 거짓말 아니면 괜찮지 않을까요?",
                persona: {
                    age: "26",
                    job: "마케터",
                    domain: "Business",
                    mbti: "ENFP",
                    name: "연애 중인 직장인",
                    avatarColor: "orange"
                }
            },
            {
                id: 3,
                modelName: "Gemini Pro",
                content: "법적 관점에서 '기망'은 상대방의 의사결정을 침해합니다. 연인 관계에서도 마찬가지죠. 재정 상태, 건강 문제, 과거 관계 등 중요한 사안의 거짓말은 계약 위반과 유사합니다. 투명성이 기본입니다.",
                persona: {
                    job: "변호사",
                    domain: "Legal",
                    edu: "석사",
                    trait: "논리적",
                    name: "법률가",
                    avatarColor: "gray"
                }
            },
            {
                id: 4,
                modelName: "GPT-4",
                content: "거짓말? 결혼 30년 하면서 배운 건, 다 말할 필요 없다는 거야. '이 옷 어때?'라고 물으면 '예쁘다'고 해. 진실이 항상 좋은 건 아니야. 평화가 더 중요할 때도 있어.",
                persona: {
                    age: "58",
                    job: "주부",
                    domain: "Family",
                    trait: "현실적",
                    name: "결혼 30년차",
                    avatarColor: "brown"
                }
            }
        ]
    },
    {
        id: "29106",
        category: "Career",
        content: "대기업 vs 스타트업, 신입 개발자는 어디로?",
        stats: "Total 5 Personas Answered • Viewed 3.2k times",
        answers: [
            {
                id: 1,
                modelName: "GPT-4o",
                content: "대기업 5년차입니다. 솔직히 체계적인 온보딩, 복지, 안정성은 좋아요. 근데 레거시 코드에 갇혀 있고 기술 스택 변경이 느려요. 성장 곡선이 완만해지는 게 아쉽습니다.",
                persona: {
                    job: "대기업 개발자",
                    domain: "Tech",
                    age: "29",
                    name: "네카라 개발자",
                    avatarColor: "green"
                }
            },
            {
                id: 2,
                modelName: "Claude 3.5",
                content: "스타트업 CTO 하고 있습니다. 여기선 입사 첫날부터 프로덕션 배포해요. 야근도 많지만 1년이면 다른 곳 3년치 경험해요. 단, 멘탈 관리 못하면 번아웃 옵니다. 체력 되면 추천!",
                persona: {
                    job: "스타트업 CTO",
                    domain: "Tech",
                    age: "34",
                    name: "스타트업 리더",
                    avatarColor: "red"
                }
            },
            {
                id: 3,
                modelName: "Gemini Pro",
                content: "저는 취업 컨설턴트인데요, 최근 트렌드를 보면 '첫 직장 = 커리어 방향'은 옛말이에요. 2-3년 단위로 이직이 일반화됐고, 중요한 건 어디서든 임팩트 있는 프로젝트 경험입니다.",
                persona: {
                    job: "커리어 컨설턴트",
                    domain: "HR",
                    edu: "석사",
                    name: "취업 전문가",
                    avatarColor: "blue"
                }
            },
            {
                id: 4,
                modelName: "Llama 3",
                content: "개발자로서 기술 깊이를 원하면 대기업, 넓이를 원하면 스타트업이에요. 근데 최근엔 중견 IT기업도 좋아요. 대기업 안정성 + 스타트업 속도의 적절한 밸런스가 있어서요.",
                persona: {
                    job: "프리랜서 개발자",
                    domain: "Tech",
                    age: "38",
                    trait: "경험 많음",
                    name: "10년차 백엔드",
                    avatarColor: "cyan"
                }
            },
            {
                id: 5,
                modelName: "GPT-4",
                content: "취준생인데 솔직히 선택권이 없어요 ㅠㅠ 대기업은 경쟁률이 미쳤고 스타트업은 뽑는 곳이 적어요. 일단 들어갈 수 있는 곳 가서 열심히 하는 게 답 아닐까요?",
                persona: {
                    age: "25",
                    job: "취준생",
                    domain: "Education",
                    mbti: "INFJ",
                    name: "컴공 졸업예정자",
                    avatarColor: "gray"
                }
            }
        ]
    },
    {
        id: "29107",
        category: "Finance",
        content: "월급 300만원, 적금 vs 주식 vs 코인?",
        stats: "Total 4 Personas Answered • Viewed 2.8k times",
        answers: [
            {
                id: 1,
                modelName: "Claude 3.5",
                content: "CFA 보유 자산관리사입니다. 월 300 기준, 먼저 비상금 3개월치(900만원) 확보하세요. 그 다음 50% 연금저축(세액공제), 30% 글로벌 ETF, 20% 예비비. 코인은 투기성 자산이라 포트폴리오의 5% 미만 권장합니다.",
                persona: {
                    job: "자산관리사",
                    domain: "Finance",
                    edu: "석사",
                    trait: "보수적",
                    name: "금융 전문가",
                    avatarColor: "green"
                }
            },
            {
                id: 2,
                modelName: "GPT-4o",
                content: "저 비트코인으로 5배 벌었어요. 물론 2022년에 반토막 나서 존버했지만... 젊을 때 공격적으로 가는 것도 방법이에요. 다만 잃어도 되는 돈으로만 하세요. 생활비 넣으면 망해요.",
                persona: {
                    age: "28",
                    job: "스타트업 PM",
                    domain: "Tech",
                    trait: "공격적",
                    name: "코인 투자자",
                    avatarColor: "orange"
                }
            },
            {
                id: 3,
                modelName: "Gemini Pro",
                content: "저희 부모님 세대는 무조건 적금이었죠. 근데 지금 금리 3%면 인플레이션 따라가기도 힘들어요. 최소한 CMA나 MMF로 유동성 확보하면서 시장 공부하시고, 그 다음에 투자하세요.",
                persona: {
                    age: "35",
                    job: "은행원",
                    domain: "Finance",
                    trait: "중립적",
                    name: "시중은행 직원",
                    avatarColor: "blue"
                }
            },
            {
                id: 4,
                modelName: "GPT-4",
                content: "돈 모으는 것보다 버는 능력 키우는 게 우선이에요. 300만원 중 50만원은 자기계발(강의, 자격증)에 쓰세요. 연봉 올리면 저축금액도 자연히 늘어요. 투자는 종잣돈 모인 후에.",
                persona: {
                    job: "강사",
                    domain: "Education",
                    age: "42",
                    trait: "자기계발파",
                    name: "동기부여 강사",
                    avatarColor: "yellow"
                }
            }
        ]
    }
];

export function getQuestionById(id: string): Question | undefined {
    return questionsData.find(q => q.id === id);
}

export function getAllQuestions(): Omit<Question, 'answers'>[] {
    if (!questionsData || !Array.isArray(questionsData)) {
        return [];
    }
    return questionsData.map(({ answers, ...rest }) => rest);
}
