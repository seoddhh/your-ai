"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    ActionIcon,
    Paper,
    SimpleGrid,
    Stack,
    Loader,
    Menu
} from '@mantine/core';
import {
    IconArrowLeft,
    IconX,
    IconSparkles,
    IconRobot,
    IconPlus,
    IconChevronDown
} from '@tabler/icons-react';

// ============================================================
// 안전한 더미 데이터 (외부 의존성 없이 내재화)
// ============================================================

type Domain = 'Tech' | 'Creative' | 'Business' | 'Academia';

interface Instruction {
    id: string;
    name: string;
    domain: Domain;
    targetRole: string;
    description: string;
    emoji: string;
}

const DOMAIN_COLORS: Record<Domain, string> = {
    Tech: '#3b82f6',
    Creative: '#ec4899',
    Business: '#f59e0b',
    Academia: '#8b5cf6',
};

const DOMAIN_LABELS: Record<Domain, string> = {
    Tech: '개발/기술',
    Creative: '디자인/예술',
    Business: '비즈니스',
    Academia: '학술/연구',
};

const INSTRUCTIONS: Instruction[] = [
    {
        id: 'tech-fullstack',
        name: '풀스택 개발자',
        domain: 'Tech',
        targetRole: '풀스택 개발자',
        description: '코드 예제 중심의 실용적인 답변',
        emoji: '👨‍💻'
    },
    {
        id: 'tech-backend',
        name: '백엔드 아키텍트',
        domain: 'Tech',
        targetRole: '백엔드 시니어 개발자',
        description: '시스템 설계와 아키텍처 관점 조언',
        emoji: '🏗️'
    },
    {
        id: 'creative-uxui',
        name: 'UX/UI 디자이너',
        domain: 'Creative',
        targetRole: 'UX/UI 디자이너',
        description: '트렌디한 시각적 레퍼런스 제안',
        emoji: '🎨'
    },
    {
        id: 'business-marketer',
        name: '퍼포먼스 마케터',
        domain: 'Business',
        targetRole: '디지털 마케터',
        description: '데이터 기반의 ROI 분석 위주',
        emoji: '📊'
    },
    {
        id: 'academia-researcher',
        name: '학술 연구자',
        domain: 'Academia',
        targetRole: '대학원생/연구원',
        description: '논문 작성과 학술적 분석',
        emoji: '🔬'
    }
];

const SAMPLE_QUESTIONS = [
    "효율적인 코드 리뷰 방법을 알려주세요",
    "결혼식 축의금 얼마가 적당해?",
    "처음 창업할 때 가장 중요한 것은?",
];

// 모의 AI 응답 생성
function generateMockResponse(instruction: Instruction, question: string): string {
    return `[${instruction.emoji} ${instruction.name}의 답변]

"${question}"에 대해 ${instruction.targetRole} 관점에서 답변합니다.

**핵심 포인트:**
1. 첫 번째 고려사항 - ${instruction.domain} 도메인 특화
2. 두 번째 고려사항 - 실무 경험 기반
3. 결론 및 제안 - 실행 가능한 액션 아이템

---
*이 응답은 "${instruction.name}" 지침이 적용되었습니다.*`;
}

// ============================================================
// 메인 컴포넌트
// ============================================================

export default function ComparePage() {
    const [mounted, setMounted] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [question, setQuestion] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [responses, setResponses] = useState<Record<string, string>>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    // 선택 가능한 페르소나 목록
    const availableInstructions = INSTRUCTIONS.filter(inst => !selectedIds.includes(inst.id));

    const handleAddInstruction = (id: string) => {
        if (selectedIds.length < 3 && !selectedIds.includes(id)) {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const handleRemoveInstruction = (idToRemove: string) => {
        setSelectedIds(prev => prev.filter(id => id !== idToRemove));
        setResponses(prev => {
            const updated = { ...prev };
            delete updated[idToRemove];
            return updated;
        });
    };

    const handleGenerate = async () => {
        if (!question.trim() || selectedIds.length === 0) return;

        setIsGenerating(true);
        setResponses({});

        // Simulate staggered API responses
        for (let i = 0; i < selectedIds.length; i++) {
            const id = selectedIds[i];
            const instruction = INSTRUCTIONS.find(inst => inst.id === id);
            if (!instruction) continue;

            await new Promise(resolve => setTimeout(resolve, 800 + i * 400));

            setResponses(prev => ({
                ...prev,
                [id]: generateMockResponse(instruction, question)
            }));
        }

        setIsGenerating(false);
    };

    if (!mounted) {
        return (
            <Box style={{
                minHeight: '100vh',
                backgroundColor: '#fdfdf2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    return (
        <Box style={{ backgroundColor: '#fdfdf2', minHeight: '100vh' }}>
            {/* Sticky Header */}
            <Box
                py="md"
                style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid #e5e5e5',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100
                }}
            >
                <Container size="xl">
                    <Group justify="space-between">
                        <Group>
                            <ActionIcon
                                component={Link}
                                href="/"
                                variant="subtle"
                                size="lg"
                                color="gray"
                            >
                                <IconArrowLeft size={20} />
                            </ActionIcon>
                            <div>
                                <Title order={3}>지침 비교</Title>
                                <Text size="sm" c="dimmed">
                                    같은 질문, 다른 지침으로 AI 응답 비교하기
                                </Text>
                            </div>
                        </Group>
                        <Badge color="yellow" variant="light" size="lg">Beta</Badge>
                    </Group>
                </Container>
            </Box>

            <Container size="xl" py="xl">
                {/* Control Panel */}
                <Paper
                    p="xl"
                    radius="lg"
                    withBorder
                    mb="xl"
                    style={{ backgroundColor: '#fff' }}
                >
                    <Stack gap="lg">
                        {/* Step 1: Select Instructions */}
                        <Box>
                            <Text fw={700} mb="sm" size="lg">
                                1. 비교할 페르소나 선택 <Text span c="dimmed" size="sm">(최대 3개)</Text>
                            </Text>
                            <Group align="flex-start" gap="md">
                                {selectedIds.map(id => {
                                    const inst = INSTRUCTIONS.find(i => i.id === id);
                                    if (!inst) return null;
                                    const color = DOMAIN_COLORS[inst.domain];
                                    const label = DOMAIN_LABELS[inst.domain];

                                    return (
                                        <Card
                                            key={id}
                                            withBorder
                                            shadow="sm"
                                            radius="md"
                                            padding="sm"
                                            w={200}
                                            style={{ borderColor: color, borderWidth: 2 }}
                                        >
                                            <Group justify="space-between" align="start" mb="xs">
                                                <Text size="xl">{inst.emoji}</Text>
                                                <ActionIcon
                                                    variant="subtle"
                                                    color="gray"
                                                    size="sm"
                                                    onClick={() => handleRemoveInstruction(id)}
                                                >
                                                    <IconX size={16} />
                                                </ActionIcon>
                                            </Group>
                                            <Text fw={600} size="sm" lineClamp={1}>{inst.name}</Text>
                                            <Text size="xs" c="dimmed" lineClamp={1}>{inst.description}</Text>
                                            <Badge
                                                size="xs"
                                                variant="light"
                                                mt={6}
                                                style={{ backgroundColor: `${color}20`, color: color }}
                                            >
                                                {label}
                                            </Badge>
                                        </Card>
                                    );
                                })}

                                {selectedIds.length < 3 && (
                                    <Menu shadow="md" width={220}>
                                        <Menu.Target>
                                            <Button
                                                variant="outline"
                                                color="yellow"
                                                w={200}
                                                h={100}
                                                leftSection={<IconPlus size={18} />}
                                                rightSection={<IconChevronDown size={16} />}
                                                styles={{
                                                    root: {
                                                        borderStyle: 'dashed',
                                                        borderColor: '#E0B861',
                                                    }
                                                }}
                                            >
                                                페르소나 추가
                                            </Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            {availableInstructions.map(inst => (
                                                <Menu.Item
                                                    key={inst.id}
                                                    leftSection={<Text size="lg">{inst.emoji}</Text>}
                                                    onClick={() => handleAddInstruction(inst.id)}
                                                >
                                                    <Text size="sm" fw={500}>{inst.name}</Text>
                                                    <Text size="xs" c="dimmed">{DOMAIN_LABELS[inst.domain]}</Text>
                                                </Menu.Item>
                                            ))}
                                        </Menu.Dropdown>
                                    </Menu>
                                )}
                            </Group>
                        </Box>

                        <Divider />

                        {/* Step 2: Enter Question */}
                        <Box>
                            <Text fw={700} mb="sm" size="lg">2. 질문 입력</Text>
                            <Group gap="xs" mb="sm">
                                {SAMPLE_QUESTIONS.map((q, i) => (
                                    <Button
                                        key={i}
                                        variant="subtle"
                                        size="xs"
                                        color="gray"
                                        radius="xl"
                                        onClick={() => setQuestion(q)}
                                    >
                                        {q}
                                    </Button>
                                ))}
                            </Group>
                            <Group align="flex-start" gap="md">
                                <Textarea
                                    placeholder="어떤 내용이 궁금하신가요?"
                                    value={question}
                                    onChange={(e) => setQuestion(e.currentTarget.value)}
                                    minRows={3}
                                    autosize
                                    style={{ flex: 1 }}
                                    styles={{
                                        input: { fontSize: 16 }
                                    }}
                                />
                                <Button
                                    size="lg"
                                    h={86}
                                    px="xl"
                                    onClick={handleGenerate}
                                    loading={isGenerating}
                                    disabled={selectedIds.length === 0 || !question.trim()}
                                    leftSection={<IconSparkles size={20} />}
                                    styles={{
                                        root: {
                                            backgroundColor: '#E0B861',
                                        }
                                    }}
                                >
                                    비교하기
                                </Button>
                            </Group>
                        </Box>
                    </Stack>
                </Paper>

                {/* Comparison Results */}
                {selectedIds.length > 0 && (
                    <Box>
                        <Title order={4} mb="lg">
                            {Object.keys(responses).length > 0 ? '비교 결과' : '응답 대기 중...'}
                        </Title>
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, lg: Math.min(selectedIds.length, 3) }}
                            spacing="lg"
                        >
                            {selectedIds.map(id => {
                                const inst = INSTRUCTIONS.find(i => i.id === id);
                                if (!inst) return null;
                                const color = DOMAIN_COLORS[inst.domain];
                                const label = DOMAIN_LABELS[inst.domain];
                                const response = responses[id];

                                return (
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card
                                            radius="lg"
                                            withBorder
                                            padding={0}
                                            style={{
                                                borderColor: color,
                                                borderWidth: 2,
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Card Header */}
                                            <Box
                                                p="md"
                                                style={{
                                                    backgroundColor: `${color}10`,
                                                    borderBottom: `1px solid ${color}30`
                                                }}
                                            >
                                                <Group gap="sm">
                                                    <Text size="xl">{inst.emoji}</Text>
                                                    <div>
                                                        <Text fw={700} size="sm">{inst.name}</Text>
                                                        <Badge
                                                            size="xs"
                                                            variant="light"
                                                            style={{
                                                                backgroundColor: `${color}20`,
                                                                color: color
                                                            }}
                                                        >
                                                            {label}
                                                        </Badge>
                                                    </div>
                                                </Group>
                                            </Box>

                                            {/* Card Body */}
                                            <Box p="md" style={{ flex: 1, minHeight: 300 }}>
                                                {response ? (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        <Text
                                                            size="sm"
                                                            style={{
                                                                whiteSpace: 'pre-wrap',
                                                                lineHeight: 1.7
                                                            }}
                                                        >
                                                            {response}
                                                        </Text>
                                                    </motion.div>
                                                ) : (
                                                    <Stack align="center" justify="center" h="100%">
                                                        <IconRobot size={40} color="#adb5bd" style={{ opacity: 0.5 }} />
                                                        <Text size="sm" c="dimmed">
                                                            {isGenerating ? '답변 생성 중...' : '질문을 입력하고 비교하기를 누르세요'}
                                                        </Text>
                                                        {isGenerating && <Loader color="yellow" size="sm" type="dots" />}
                                                    </Stack>
                                                )}
                                            </Box>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
