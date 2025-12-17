"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Container,
    Title,
    Text,
    Card,
    Group,
    Badge,
    Button,
    Box,
    Textarea,
    Divider,
    Paper,
    Stack,
    Loader,
    Stepper,
    Radio,
    Checkbox,
    TextInput,
    ActionIcon,
    ThemeIcon,
    SimpleGrid
} from '@mantine/core';
import {
    IconArrowLeft,
    IconArrowRight,
    IconSparkles,
    IconCheck,
    IconCopy,
    IconPlayerPlay,
    IconRefresh,
    IconTarget,
    IconLayoutList,
    IconBrain,
    IconShieldCheck
} from '@tabler/icons-react';


// ============================================================
// 응답 규칙 생성 파이프라인 옵션
// ============================================================

// Step 1: 목적 선택
const PURPOSE_OPTIONS = [
    { id: 'coding', label: '코딩/개발', description: '코드 작성, 디버깅, 기술 문서 작성' },
    { id: 'writing', label: '글쓰기', description: '블로그, 에세이, 비즈니스 문서 작성' },
    { id: 'analysis', label: '분석/리서치', description: '데이터 분석, 시장 조사, 연구' },
    { id: 'learning', label: '학습/교육', description: '새로운 개념 학습, 튜터링' },
    { id: 'creative', label: '창작/디자인', description: '아이디어 발상, 디자인 피드백' },
    { id: 'business', label: '비즈니스/마케팅', description: '전략 수립, 마케팅 기획' },
];

// Step 2: 출력 형식 선택
const OUTPUT_FORMAT_OPTIONS = [
    { id: 'code-heavy', label: '코드 중심', description: '코드 예제를 먼저 보여주고 설명' },
    { id: 'explanation', label: '설명 중심', description: '개념과 이론을 상세히 설명' },
    { id: 'structured', label: '구조화된 형식', description: '표, 리스트, 섹션으로 정리' },
    { id: 'conversational', label: '대화형', description: '친근하고 자연스러운 대화 스타일' },
    { id: 'brief', label: '간결한 요약', description: '핵심만 짧고 명확하게' },
];

// Step 3: 논리 구조 선택
const LOGIC_STRUCTURE_OPTIONS = [
    { id: 'step-by-step', label: '단계별 설명', description: '1, 2, 3... 순서대로 진행' },
    { id: 'overview-first', label: '개요 우선', description: '전체 그림을 먼저 보여주고 세부 설명' },
    { id: 'problem-solution', label: '문제-해결', description: '문제 정의 후 해결책 제시' },
    { id: 'comparison', label: '비교 분석', description: '여러 옵션의 장단점 비교' },
    { id: 'practical', label: '실용적 접근', description: '바로 적용 가능한 실전 위주' },
];

// Step 4: 제약 조건
const CONSTRAINT_OPTIONS = [
    { id: 'concise', label: '간결하게 (500자 이내)' },
    { id: 'detailed', label: '상세하게 (제한 없음)' },
    { id: 'formal', label: '격식체 사용' },
    { id: 'casual', label: '비격식체 사용' },
    { id: 'include-examples', label: '예시 포함' },
    { id: 'include-references', label: '참고자료/출처 포함' },
    { id: 'korean-only', label: '한국어로만 응답' },
    { id: 'no-jargon', label: '전문 용어 최소화' },
];

// ============================================================
// 응답 규칙 생성 로직
// ============================================================

function generateCustomInstruction(
    purpose: string,
    outputFormat: string,
    logicStructure: string,
    constraints: string[]
): { userProfile: string; responsePreference: string } {
    const purposeLabel = PURPOSE_OPTIONS.find(p => p.id === purpose)?.label || purpose;
    const formatLabel = OUTPUT_FORMAT_OPTIONS.find(f => f.id === outputFormat)?.label || outputFormat;
    const logicLabel = LOGIC_STRUCTURE_OPTIONS.find(l => l.id === logicStructure)?.label || logicStructure;

    const userProfile = `저는 ${purposeLabel}을 주로 활용하는 사용자입니다.
AI 응답이 ${formatLabel} 스타일로 제공되기를 원하며,
${logicLabel} 방식으로 정보를 전달받는 것을 선호합니다.`;

    let preferences: string[] = [];

    // 출력 형식에 따른 선호도
    if (outputFormat === 'code-heavy') {
        preferences.push('코드 예제를 먼저 보여주고 그 다음에 설명해주세요');
        preferences.push('실행 가능한 완전한 코드를 제공해주세요');
    } else if (outputFormat === 'explanation') {
        preferences.push('개념과 원리를 충분히 설명해주세요');
        preferences.push('이해를 돕는 비유나 예시를 활용해주세요');
    } else if (outputFormat === 'structured') {
        preferences.push('정보를 표나 리스트로 정리해주세요');
        preferences.push('명확한 섹션으로 구분해주세요');
    } else if (outputFormat === 'conversational') {
        preferences.push('친근하고 자연스러운 톤으로 대화해주세요');
        preferences.push('딱딱한 형식보다 편안한 설명을 선호합니다');
    } else if (outputFormat === 'brief') {
        preferences.push('핵심만 간결하게 전달해주세요');
        preferences.push('불필요한 설명은 생략해주세요');
    }

    // 논리 구조에 따른 선호도
    if (logicStructure === 'step-by-step') {
        preferences.push('단계별로 순서대로 설명해주세요');
    } else if (logicStructure === 'overview-first') {
        preferences.push('먼저 전체 개요를 보여주고 세부 내용을 설명해주세요');
    } else if (logicStructure === 'practical') {
        preferences.push('이론보다 실전에서 바로 적용할 수 있는 내용 위주로 알려주세요');
    }

    // 제약 조건 추가
    constraints.forEach(c => {
        const constraint = CONSTRAINT_OPTIONS.find(opt => opt.id === c);
        if (constraint) {
            if (c === 'concise') preferences.push('응답은 500자 이내로 간결하게 해주세요');
            if (c === 'include-examples') preferences.push('구체적인 예시를 포함해주세요');
            if (c === 'include-references') preferences.push('관련 참고자료나 출처를 함께 알려주세요');
            if (c === 'no-jargon') preferences.push('전문 용어는 최소화하고 쉬운 말로 설명해주세요');
            if (c === 'formal') preferences.push('격식체로 응답해주세요');
            if (c === 'casual') preferences.push('편안한 비격식체로 응답해주세요');
        }
    });

    const responsePreference = preferences.map((p, i) => `${i + 1}. ${p}`).join('\n');

    return { userProfile, responsePreference };
}

// ============================================================
// 메인 컴포넌트
// ============================================================

export default function MyAIPage() {
    const [mounted, setMounted] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    // 선택 상태
    const [selectedPurpose, setSelectedPurpose] = useState<string>('');
    const [selectedFormat, setSelectedFormat] = useState<string>('');
    const [selectedLogic, setSelectedLogic] = useState<string>('');
    const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);

    // 생성된 응답 규칙
    const [generatedInstruction, setGeneratedInstruction] = useState<{
        userProfile: string;
        responsePreference: string;
    } | null>(null);

    // 테스트 관련
    const [testQuestion, setTestQuestion] = useState('');
    const [testResponse, setTestResponse] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 다음 단계로 이동
    const handleNext = () => {
        if (activeStep === 3) {
            // 응답 규칙 생성
            const instruction = generateCustomInstruction(
                selectedPurpose,
                selectedFormat,
                selectedLogic,
                selectedConstraints
            );
            setGeneratedInstruction(instruction);
        }
        setActiveStep(prev => Math.min(prev + 1, 5));
    };

    // 이전 단계로 이동
    const handlePrev = () => {
        setActiveStep(prev => Math.max(prev - 1, 0));
    };

    // 다음 버튼 활성화 여부
    const canProceed = () => {
        switch (activeStep) {
            case 0: return !!selectedPurpose;
            case 1: return !!selectedFormat;
            case 2: return !!selectedLogic;
            case 3: return true; // 제약 조건은 선택 사항
            case 4: return true; // 확인 단계
            case 5: return true; // 테스트 단계
            default: return false;
        }
    };

    // 테스트 실행 (API 연결 부분은 주석 처리)
    const handleTest = async () => {
        if (!testQuestion.trim() || !generatedInstruction) return;

        setIsTesting(true);
        setTestResponse('');

        // TODO: 실제 API 연결
        // const response = await fetch('/api/test-instruction', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         userProfile: generatedInstruction.userProfile,
        //         responsePreference: generatedInstruction.responsePreference,
        //         question: testQuestion,
        //     }),
        // });
        // const data = await response.json();
        // setTestResponse(data.response);

        // 임시 모의 응답
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTestResponse(`[나의 AI 응답]

"${testQuestion}"에 대한 맞춤 응답입니다.

${selectedFormat === 'code-heavy' ? '```typescript\n// 예시 코드\nconst example = "Hello World";\nconsole.log(example);\n```\n' : ''}
${selectedLogic === 'step-by-step' ? '**1단계**: 핵심 개념 이해\n**2단계**: 실제 적용\n**3단계**: 결과 확인\n' : ''}
${selectedFormat === 'structured' ? '| 항목 | 설명 |\n|------|------|\n| 핵심 | 요약된 내용 |\n' : ''}

---
*이 응답은 사용자의 맞춤 응답 규칙이 적용되었습니다.*`);

        setIsTesting(false);
    };

    // 처음으로 리셋
    const handleReset = () => {
        setActiveStep(0);
        setSelectedPurpose('');
        setSelectedFormat('');
        setSelectedLogic('');
        setSelectedConstraints([]);
        setGeneratedInstruction(null);
        setTestQuestion('');
        setTestResponse('');
    };

    // 클립보드 복사
    const handleCopy = () => {
        if (generatedInstruction) {
            navigator.clipboard.writeText(
                `[사용자 프로필]\n${generatedInstruction.userProfile}\n\n[응답 스타일]\n${generatedInstruction.responsePreference}`
            );
        }
    };

    if (!mounted) {
        return (
            <Box style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    return (
        <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
            {/* 헤더 */}
            <Box mb="xl">
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={2} fw={700} mb={4}>나의 AI 만들기</Title>
                        <Text size="sm" c="dimmed">
                            나만의 맞춤 응답 규칙을 만들어보세요
                        </Text>
                    </div>
                    <Badge color="yellow" variant="light" size="lg">Beta</Badge>
                </Group>
            </Box>

            <Box>
                {/* Stepper */}
                <Paper p="xl" radius="lg" withBorder mb="xl" style={{ backgroundColor: '#fff' }}>
                    <Stepper
                        active={activeStep}
                        onStepClick={setActiveStep}
                        color="yellow"
                        styles={{
                            stepIcon: {
                                backgroundColor: 'var(--bg-color)',
                                borderColor: '#E0B861',
                            },
                            stepCompletedIcon: {
                                backgroundColor: '#E0B861',
                            },
                        }}
                    >
                        <Stepper.Step label="목적" icon={<IconTarget size={18} />} />
                        <Stepper.Step label="출력 형식" icon={<IconLayoutList size={18} />} />
                        <Stepper.Step label="논리 구조" icon={<IconBrain size={18} />} />
                        <Stepper.Step label="제약 조건" icon={<IconShieldCheck size={18} />} />
                        <Stepper.Step label="확인" icon={<IconCheck size={18} />} />
                        <Stepper.Step label="테스트" icon={<IconPlayerPlay size={18} />} />
                    </Stepper>
                </Paper>

                {/* 단계별 콘텐츠 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Paper p="xl" radius="lg" withBorder style={{ backgroundColor: '#fff' }}>
                            {/* Step 0: 목적 선택 */}
                            {activeStep === 0 && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">어떤 목적으로 AI를 사용하시나요?</Title>
                                        <Text size="sm" c="dimmed">주로 사용하는 용도를 선택해주세요</Text>
                                    </div>
                                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                                        {PURPOSE_OPTIONS.map(option => (
                                            <Card
                                                key={option.id}
                                                p="lg"
                                                radius="md"
                                                withBorder
                                                style={{
                                                    cursor: 'pointer',
                                                    borderColor: selectedPurpose === option.id ? '#E0B861' : '#e5e5e5',
                                                    borderWidth: selectedPurpose === option.id ? 2 : 1,
                                                    backgroundColor: selectedPurpose === option.id ? 'var(--gold-light)' : '#fff',
                                                    transition: 'all 0.2s',
                                                }}
                                                onClick={() => setSelectedPurpose(option.id)}
                                            >
                                                <Text fw={600} mb={4}>{option.label}</Text>
                                                <Text size="xs" c="dimmed">{option.description}</Text>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </Stack>
                            )}

                            {/* Step 1: 출력 형식 선택 */}
                            {activeStep === 1 && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">어떤 형식으로 응답받고 싶으신가요?</Title>
                                        <Text size="sm" c="dimmed">선호하는 응답 스타일을 선택해주세요</Text>
                                    </div>
                                    <Stack gap="sm">
                                        {OUTPUT_FORMAT_OPTIONS.map(option => (
                                            <Card
                                                key={option.id}
                                                p="md"
                                                radius="md"
                                                withBorder
                                                style={{
                                                    cursor: 'pointer',
                                                    borderColor: selectedFormat === option.id ? '#E0B861' : '#e5e5e5',
                                                    borderWidth: selectedFormat === option.id ? 2 : 1,
                                                    backgroundColor: selectedFormat === option.id ? 'var(--gold-light)' : '#fff',
                                                    transition: 'all 0.2s',
                                                }}
                                                onClick={() => setSelectedFormat(option.id)}
                                            >
                                                <Group>
                                                    <Radio
                                                        checked={selectedFormat === option.id}
                                                        onChange={() => setSelectedFormat(option.id)}
                                                        color="yellow"
                                                    />
                                                    <div>
                                                        <Text fw={500}>{option.label}</Text>
                                                        <Text size="xs" c="dimmed">{option.description}</Text>
                                                    </div>
                                                </Group>
                                            </Card>
                                        ))}
                                    </Stack>
                                </Stack>
                            )}

                            {/* Step 2: 논리 구조 선택 */}
                            {activeStep === 2 && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">어떤 방식으로 정보를 전달받고 싶으신가요?</Title>
                                        <Text size="sm" c="dimmed">선호하는 설명 방식을 선택해주세요</Text>
                                    </div>
                                    <Stack gap="sm">
                                        {LOGIC_STRUCTURE_OPTIONS.map(option => (
                                            <Card
                                                key={option.id}
                                                p="md"
                                                radius="md"
                                                withBorder
                                                style={{
                                                    cursor: 'pointer',
                                                    borderColor: selectedLogic === option.id ? '#E0B861' : '#e5e5e5',
                                                    borderWidth: selectedLogic === option.id ? 2 : 1,
                                                    backgroundColor: selectedLogic === option.id ? 'var(--gold-light)' : '#fff',
                                                    transition: 'all 0.2s',
                                                }}
                                                onClick={() => setSelectedLogic(option.id)}
                                            >
                                                <Group>
                                                    <Radio
                                                        checked={selectedLogic === option.id}
                                                        onChange={() => setSelectedLogic(option.id)}
                                                        color="yellow"
                                                    />
                                                    <div>
                                                        <Text fw={500}>{option.label}</Text>
                                                        <Text size="xs" c="dimmed">{option.description}</Text>
                                                    </div>
                                                </Group>
                                            </Card>
                                        ))}
                                    </Stack>
                                </Stack>
                            )}

                            {/* Step 3: 제약 조건 설정 */}
                            {activeStep === 3 && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">추가 제약 조건을 설정하세요</Title>
                                        <Text size="sm" c="dimmed">원하는 옵션을 모두 선택해주세요 (선택사항)</Text>
                                    </div>
                                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                                        {CONSTRAINT_OPTIONS.map(option => (
                                            <Card
                                                key={option.id}
                                                p="md"
                                                radius="md"
                                                withBorder
                                                style={{
                                                    cursor: 'pointer',
                                                    borderColor: selectedConstraints.includes(option.id) ? '#E0B861' : '#e5e5e5',
                                                    backgroundColor: selectedConstraints.includes(option.id) ? 'var(--gold-light)' : '#fff',
                                                    transition: 'all 0.2s',
                                                }}
                                                onClick={() => {
                                                    setSelectedConstraints(prev =>
                                                        prev.includes(option.id)
                                                            ? prev.filter(c => c !== option.id)
                                                            : [...prev, option.id]
                                                    );
                                                }}
                                            >
                                                <Group>
                                                    <Checkbox
                                                        checked={selectedConstraints.includes(option.id)}
                                                        onChange={() => { }}
                                                        color="yellow"
                                                    />
                                                    <Text size="sm">{option.label}</Text>
                                                </Group>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </Stack>
                            )}

                            {/* Step 4: 생성된 응답 규칙 확인 */}
                            {activeStep === 4 && generatedInstruction && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">나만의 응답 규칙이 생성되었습니다</Title>
                                        <Text size="sm" c="dimmed">아래 내용을 확인하고 복사하여 사용하세요</Text>
                                    </div>

                                    <Box>
                                        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                            사용자 프로필
                                        </Text>
                                        <Paper
                                            p="md"
                                            radius="md"
                                            style={{
                                                backgroundColor: 'var(--gold-light)',
                                                whiteSpace: 'pre-wrap',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {generatedInstruction.userProfile}
                                        </Paper>
                                    </Box>

                                    <Box>
                                        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                            응답 스타일
                                        </Text>
                                        <Paper
                                            p="md"
                                            radius="md"
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                                whiteSpace: 'pre-wrap',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {generatedInstruction.responsePreference}
                                        </Paper>
                                    </Box>

                                    <Group>
                                        <Button
                                            variant="light"
                                            color="gray"
                                            leftSection={<IconCopy size={16} />}
                                            onClick={handleCopy}
                                        >
                                            클립보드에 복사
                                        </Button>
                                    </Group>
                                </Stack>
                            )}

                            {/* Step 5: 샘플 테스트 */}
                            {activeStep === 5 && generatedInstruction && (
                                <Stack gap="lg">
                                    <div>
                                        <Title order={4} mb="xs">응답 규칙을 테스트해보세요</Title>
                                        <Text size="sm" c="dimmed">질문을 입력하고 맞춤 응답을 확인하세요</Text>
                                    </div>

                                    <Textarea
                                        placeholder="테스트할 질문을 입력하세요..."
                                        value={testQuestion}
                                        onChange={(e) => setTestQuestion(e.currentTarget.value)}
                                        minRows={3}
                                        autosize
                                    />

                                    <Button
                                        onClick={handleTest}
                                        loading={isTesting}
                                        disabled={!testQuestion.trim()}
                                        leftSection={<IconSparkles size={18} />}
                                        styles={{
                                            root: {
                                                backgroundColor: '#E0B861',
                                            }
                                        }}
                                    >
                                        테스트 실행
                                    </Button>

                                    {testResponse && (
                                        <Paper
                                            p="lg"
                                            radius="md"
                                            style={{
                                                backgroundColor: '#1a1b1e',
                                                color: '#fff',
                                            }}
                                        >
                                            <Group mb="md">
                                                <Badge color="green" variant="light">AI Response</Badge>
                                            </Group>
                                            <Text
                                                size="sm"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                    lineHeight: 1.8,
                                                }}
                                            >
                                                {testResponse}
                                            </Text>
                                        </Paper>
                                    )}
                                </Stack>
                            )}

                            {/* 네비게이션 버튼 */}
                            <Divider my="xl" />
                            <Group justify="space-between">
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<IconArrowLeft size={16} />}
                                    onClick={activeStep === 0 ? handleReset : handlePrev}
                                >
                                    {activeStep === 0 ? '처음으로' : '이전'}
                                </Button>

                                <Group>
                                    {activeStep === 5 && (
                                        <Button
                                            variant="light"
                                            color="gray"
                                            leftSection={<IconRefresh size={16} />}
                                            onClick={handleReset}
                                        >
                                            다시 만들기
                                        </Button>
                                    )}
                                    {activeStep < 5 && (
                                        <Button
                                            rightSection={<IconArrowRight size={16} />}
                                            onClick={handleNext}
                                            disabled={!canProceed()}
                                            styles={{
                                                root: {
                                                    backgroundColor: '#E0B861',
                                                }
                                            }}
                                        >
                                            {activeStep === 3 ? '생성하기' : '다음'}
                                        </Button>
                                    )}
                                </Group>
                            </Group>
                        </Paper>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    );
}
