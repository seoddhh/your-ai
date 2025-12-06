"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Box,
    Card,
    ThemeIcon,
    Badge,
    Progress
} from '@mantine/core';
import {
    IconArrowDown,
    IconSparkles,
    IconCode,
    IconPalette,
    IconChartBar,
    IconBrain,
    IconArrowRight,
    IconCheck,
    IconBookmark,
    IconScale
} from '@tabler/icons-react';

interface ScrollLandingProps {
    onEnter: () => void;
}

// 도메인 예시 데이터
const DOMAIN_EXAMPLES = [
    {
        domain: 'Tech',
        title: '개발자',
        icon: IconCode,
        color: '#3b82f6',
        instruction: '코드 예제 위주로 답변해주세요. TypeScript를 사용하고, 에러 핸들링을 포함해주세요.',
        response: '```typescript\nconst fetchData = async (): Promise<Data> => {\n  try {\n    const res = await fetch("/api/data");\n    if (!res.ok) throw new Error("Failed");\n    return res.json();\n  } catch (error) {\n    console.error(error);\n    throw error;\n  }\n};\n```',
    },
    {
        domain: 'Creative',
        title: '디자이너',
        icon: IconPalette,
        color: '#ec4899',
        instruction: '시각적 레퍼런스와 함께 설명해주세요. 최신 디자인 트렌드를 반영해주세요.',
        response: '모던한 UI는 **Glassmorphism**과 **Neumorphism**을 조합하여...\n\n🎨 컬러 팔레트:\n- Primary: #E0B861\n- Background: #fdfdf2\n\n💡 트렌드: 마이크로 인터랙션, 다크모드',
    },
    {
        domain: 'Business',
        title: '마케터',
        icon: IconChartBar,
        color: '#f59e0b',
        instruction: '데이터 기반의 인사이트를 제공해주세요. ROI와 전환율 관점에서 분석해주세요.',
        response: '📊 분석 결과:\n\n| 지표 | 현재 | 목표 | 갭 |\n|------|------|------|----|\n| CVR | 2.3% | 3.5% | +52% |\n| CAC | ₩45K | ₩35K | -22% |\n\n✅ 추천 액션: A/B 테스트 진행',
    },
    {
        domain: 'Academia',
        title: '연구자',
        icon: IconBrain,
        color: '#8b5cf6',
        instruction: '학술적 근거와 함께 설명해주세요. 관련 논문이나 연구를 인용해주세요.',
        response: 'Transformer 아키텍처(Vaswani et al., 2017)에 따르면...\n\n📚 참고문헌:\n- "Attention Is All You Need" (NeurIPS 2017)\n- "BERT: Pre-training" (Devlin et al., 2019)',
    },
];

// 핵심 기능 데이터
const FEATURES = [
    {
        icon: IconBookmark,
        title: '지침 라이브러리',
        description: '검증된 도메인별 Custom Instructions 템플릿을 탐색하고 바로 적용하세요.',
    },
    {
        icon: IconScale,
        title: '실시간 비교',
        description: '같은 질문에 다른 지침을 적용했을 때 AI 응답이 어떻게 달라지는지 확인하세요.',
    },
    {
        icon: IconSparkles,
        title: '개인화 테스트',
        description: '나만의 지침을 만들고 테스트하여 최적의 AI 활용법을 찾아보세요.',
    },
];

export default function ScrollLanding({ onEnter }: ScrollLandingProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [activeExample, setActiveExample] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 스크롤 진행률에 따른 섹션 변경
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.2) setCurrentSection(0);
        else if (latest < 0.45) setCurrentSection(1);
        else if (latest < 0.7) setCurrentSection(2);
        else setCurrentSection(3);

        // 섹션 2에서 도메인 예시 자동 전환
        if (latest >= 0.2 && latest < 0.45) {
            const progress = (latest - 0.2) / 0.25;
            const index = Math.min(Math.floor(progress * 4), 3);
            setActiveExample(index);
        }
    });

    // 스크롤 진행 바 값
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <Box
            ref={containerRef}
            style={{
                position: 'relative',
                backgroundColor: 'var(--bg-color)',
                height: '500vh', // 스크롤 공간 확보
            }}
        >
            {/* 스크롤 진행 바 */}
            <Box
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: 'rgba(224, 184, 97, 0.2)',
                    zIndex: 9999,
                }}
            >
                <motion.div
                    style={{
                        height: '100%',
                        backgroundColor: '#E0B861',
                        width: progressWidth,
                    }}
                />
            </Box>

            {/* 섹션 인디케이터 */}
            <Box
                style={{
                    position: 'fixed',
                    right: 24,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                }}
            >
                {[0, 1, 2, 3].map((i) => (
                    <Box
                        key={i}
                        style={{
                            width: 8,
                            height: currentSection === i ? 32 : 8,
                            borderRadius: 4,
                            backgroundColor: currentSection === i ? '#E0B861' : 'rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </Box>

            {/* ========== Section 0: Hero (Pinned) ========== */}
            <Box
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: currentSection === 0 ? 10 : 1,
                    opacity: currentSection === 0 ? 1 : 0,
                    pointerEvents: currentSection === 0 ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Container size="lg" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <Badge
                            size="xl"
                            variant="light"
                            color="yellow"
                            mb="xl"
                            style={{
                                letterSpacing: '3px',
                                padding: '12px 24px',
                                backgroundColor: 'rgba(224, 184, 97, 0.15)',
                            }}
                        >
                            CUSTOM INSTRUCTIONS HUB
                        </Badge>

                        <Title
                            order={1}
                            mb="xl"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                lineHeight: 1.1,
                                fontFamily: 'var(--font-en)',
                                color: 'var(--text-primary)',
                                fontWeight: 900,
                            }}
                        >
                            같은 AI,{' '}
                            <span style={{
                                color: '#E0B861',
                                textDecoration: 'underline',
                                textDecorationThickness: '4px',
                                textUnderlineOffset: '8px',
                            }}>
                                다른 지침
                            </span>
                            ,<br />
                            완전히 다른 결과.
                        </Title>

                        <Text
                            size="xl"
                            c="dimmed"
                            mb={80}
                            maw={600}
                            mx="auto"
                            style={{
                                fontFamily: 'var(--font-kr)',
                                fontWeight: 400,
                                lineHeight: 1.8,
                            }}
                        >
                            당신의 Custom Instructions가 AI를 완전히 바꿉니다.<br />
                            도메인별 추천 지침을 발견하고, 직접 비교해보세요.
                        </Text>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Text size="sm" c="dimmed" mb="xs">스크롤하여 탐색하기</Text>
                            <IconArrowDown
                                size={28}
                                color="#E0B861"
                            />
                        </motion.div>
                    </motion.div>
                </Container>
            </Box>

            {/* ========== Section 1: Scrollytelling - 도메인별 예시 (Pinned) ========== */}
            <Box
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--gold-light)',
                    zIndex: currentSection === 1 ? 10 : 1,
                    opacity: currentSection === 1 ? 1 : 0,
                    pointerEvents: currentSection === 1 ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Container size="xl" py={60}>
                    <Group align="flex-start" gap={60}>
                        {/* 왼쪽: 텍스트 설명 */}
                        <Box style={{ flex: 1 }}>
                            <Badge variant="light" color="orange" size="lg" mb="lg">
                                WHY CUSTOM INSTRUCTIONS?
                            </Badge>

                            <Title order={2} size="2.5rem" mb="xl" style={{ color: 'var(--text-primary)' }}>
                                같은 질문이라도<br />
                                지침에 따라 답이 달라집니다.
                            </Title>

                            <Box mb="xl">
                                {DOMAIN_EXAMPLES.map((domain, index) => (
                                    <Box
                                        key={domain.domain}
                                        p="md"
                                        mb="sm"
                                        style={{
                                            borderRadius: 12,
                                            backgroundColor: activeExample === index
                                                ? 'rgba(255,255,255,0.9)'
                                                : 'transparent',
                                            border: activeExample === index
                                                ? `2px solid ${domain.color}`
                                                : '2px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onClick={() => setActiveExample(index)}
                                    >
                                        <Group>
                                            <ThemeIcon
                                                size={40}
                                                radius="md"
                                                style={{ backgroundColor: domain.color }}
                                            >
                                                <domain.icon size={20} color="white" />
                                            </ThemeIcon>
                                            <div>
                                                <Text fw={700}>{domain.title}</Text>
                                                <Text size="xs" c="dimmed">{domain.domain} Domain</Text>
                                            </div>
                                        </Group>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {/* 오른쪽: 인터랙티브 비교 뷰 */}
                        <Box style={{ flex: 1.2 }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeExample}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* 지침 카드 */}
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        mb="md"
                                        style={{
                                            backgroundColor: '#fff',
                                            border: `2px solid ${DOMAIN_EXAMPLES[activeExample].color}20`,
                                        }}
                                    >
                                        <Group mb="sm">
                                            <Badge color="blue" variant="light">Custom Instruction</Badge>
                                            <Badge color="gray" variant="outline">
                                                {DOMAIN_EXAMPLES[activeExample].title}
                                            </Badge>
                                        </Group>
                                        <Text
                                            size="sm"
                                            style={{
                                                fontStyle: 'italic',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            "{DOMAIN_EXAMPLES[activeExample].instruction}"
                                        </Text>
                                    </Card>

                                    {/* 응답 카드 */}
                                    <Card
                                        p="lg"
                                        radius="lg"
                                        style={{
                                            backgroundColor: '#1a1b1e',
                                            color: '#fff',
                                        }}
                                    >
                                        <Group mb="md">
                                            <Badge color="green" variant="light">AI Response</Badge>
                                            <Text size="xs" c="dimmed">GPT-4o</Text>
                                        </Group>
                                        <Text
                                            size="sm"
                                            style={{
                                                fontFamily: 'var(--font-en)',
                                                whiteSpace: 'pre-wrap',
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            {DOMAIN_EXAMPLES[activeExample].response}
                                        </Text>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </Group>
                </Container>
            </Box>

            {/* ========== Section 2: Features (Pinned) ========== */}
            <Box
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-color)',
                    zIndex: currentSection === 2 ? 10 : 1,
                    opacity: currentSection === 2 ? 1 : 0,
                    pointerEvents: currentSection === 2 ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Container size="lg">
                    <Box style={{ textAlign: 'center', marginBottom: 60 }}>
                        <Badge variant="light" color="yellow" size="lg" mb="lg">
                            WHAT WE OFFER
                        </Badge>

                        <Title order={2} size="2.5rem" mb="md" style={{ color: 'var(--text-primary)' }}>
                            Your AI에서 할 수 있는 것들
                        </Title>

                        <Text size="lg" c="dimmed" maw={500} mx="auto">
                            AI 활용의 새로운 차원을 경험해보세요
                        </Text>
                    </Box>

                    <Group justify="center" gap={40}>
                        {FEATURES.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    padding="xl"
                                    radius="xl"
                                    w={320}
                                    style={{
                                        textAlign: 'center',
                                        border: '2px solid var(--border-color)',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <ThemeIcon
                                        size={72}
                                        radius="xl"
                                        mb="lg"
                                        style={{
                                            backgroundColor: '#E0B861',
                                            margin: '0 auto',
                                            boxShadow: '0 8px 24px rgba(224, 184, 97, 0.25)',
                                        }}
                                    >
                                        <feature.icon size={36} color="white" />
                                    </ThemeIcon>
                                    <Title order={4} mb="sm">{feature.title}</Title>
                                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
                                        {feature.description}
                                    </Text>
                                </Card>
                            </motion.div>
                        ))}
                    </Group>
                </Container>
            </Box>

            {/* ========== Section 3: CTA (Pinned) ========== */}
            <Box
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(180deg, var(--bg-color) 0%, var(--gold-light) 50%, var(--bg-color) 100%)',
                    zIndex: currentSection === 3 ? 10 : 1,
                    opacity: currentSection === 3 ? 1 : 0,
                    pointerEvents: currentSection === 3 ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
            >
                <Container size="md" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ThemeIcon
                            size={100}
                            radius={100}
                            mb="xl"
                            style={{
                                backgroundColor: '#E0B861',
                                margin: '0 auto',
                                boxShadow: '0 20px 60px rgba(224, 184, 97, 0.4)',
                            }}
                        >
                            <IconSparkles size={50} color="white" />
                        </ThemeIcon>

                        <Title
                            order={2}
                            mb="xl"
                            style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            나에게 맞는 AI 지침을<br />
                            지금 바로 찾아보세요.
                        </Title>

                        <Text size="lg" c="dimmed" mb={50} maw={450} mx="auto" style={{ lineHeight: 1.8 }}>
                            도메인별 추천 지침부터 시작하거나,<br />
                            직접 나만의 지침을 테스트해보세요.
                        </Text>

                        <Group justify="center" gap="lg">
                            <Button
                                size="xl"
                                rightSection={<IconArrowRight size={20} />}
                                onClick={onEnter}
                                styles={{
                                    root: {
                                        backgroundColor: '#E0B861',
                                        color: '#fff',
                                        padding: '0 48px',
                                        height: 56,
                                        fontSize: 18,
                                        fontWeight: 600,
                                        '&:hover': {
                                            backgroundColor: '#c9a254',
                                            transform: 'translateY(-2px)',
                                        }
                                    }
                                }}
                            >
                                시작하기
                            </Button>
                            <Button
                                size="xl"
                                variant="outline"
                                onClick={onEnter}
                                styles={{
                                    root: {
                                        borderColor: 'var(--text-secondary)',
                                        color: 'var(--text-primary)',
                                        height: 56,
                                        fontSize: 18,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.03)',
                                            borderColor: '#E0B861',
                                        }
                                    }
                                }}
                            >
                                지침 둘러보기
                            </Button>
                        </Group>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}
