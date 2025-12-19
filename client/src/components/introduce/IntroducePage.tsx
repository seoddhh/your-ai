"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Box,
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Divider,
    ThemeIcon,
} from '@mantine/core';
import {
    IconArrowRight,
    IconBooks,
    IconHome,
    IconAdjustments,
    IconX,
    IconAi,
    IconRobot,
    IconReceiptBitcoin,
    IconSettingsAutomation,
} from '@tabler/icons-react';

// 간단한 fade-in 애니메이션
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function IntroducePage() {
    const router = useRouter();

    return (
        <Box
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--bg-color)',
                paddingLeft: 'var(--content-padding-x)',
                paddingRight: 'var(--content-padding-x)',
                paddingTop: 80,
                paddingBottom: 120,
            }}
        >
            <Container size="md" p={0}>
                {/* ========== Section 1: Hero / 정체성 선언 ========== */}
                <motion.section {...fadeIn} style={{ marginBottom: 100 }}>
                    <Text
                        size="sm"
                        tt="uppercase"
                        fw={600}
                        c="dimmed"
                        mb="md"
                        style={{ letterSpacing: '2px' }}
                    >
                        About YourAI
                    </Text>

                    <Title
                        order={1}
                        mb="xl"
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            lineHeight: 1.2,
                            color: 'var(--text-primary)',
                            fontWeight: 800,
                        }}
                    >
                        "어떻게 물어볼까"가 아니라,
                        <br />
                        <span style={{ color: 'var(--accent-color)' }}>
                            "어떻게 대답할지"
                        </span>
                        를 정합니다.
                    </Title>

                    <Text
                        size="lg"
                        c="dimmed"
                        maw={560}
                        style={{ lineHeight: 1.8 }}
                    >
                        YourAI는 프롬프트 모음 사이트가 아닙니다.
                        <br />
                        AI 응답을 통제할 <strong>기준</strong>을 정리하는 도구입니다.
                    </Text>
                </motion.section>

                <Divider mb={80} />

                {/* ========== Section 2: Problem / 왜 필요한가 ========== */}
                <motion.section
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.1 }}
                    style={{ marginBottom: 100 }}
                >
                    <Text size="sm" fw={600} c="var(--accent-color)" mb="sm">
                        PROBLEM
                    </Text>

                    <Title order={2} size="1.75rem" mb="lg" style={{ color: 'var(--text-primary)' }}>
                        AI 답변이 불편한 건, 성능 문제가 아닙니다.
                    </Title>

                    <Stack gap="md">
                        <Text size="md" c="dimmed" style={{ lineHeight: 1.8 }}>
                            "답변이 너무 길어요."
                            <br />
                            "핵심만 말해달라니까 너무 짧게 대답해요."
                            <br />
                            "감정 표현이 과해요."
                            <br />
                            "뭔가 내 스타일이 아니에요."
                        </Text>

                        <Text size="md" style={{ lineHeight: 1.8 }}>
                            이런 불만은 AI가 잘못해서가 아닙니다.
                            <br />
                            <strong style={{ color: 'var(--text-primary)' }}>
                                '평균적인 사람'을 위한 답변
                            </strong>
                            이 나오도록 설계되어 있기 때문입니다.
                        </Text>

                        <Text size="md" c="dimmed" style={{ lineHeight: 1.8, marginTop: 8 }}>
                            사람마다 정보 처리 방식이 다릅니다.
                            <br />
                            같은 답변이 모두에게 최적일 수 없습니다.
                        </Text>
                    </Stack>
                </motion.section>

                <Divider mb={80} />

                {/* ========== Section 3: Concept / 응답 형식 ========== */}
                <motion.section
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    style={{ marginBottom: 100 }}
                >
                    <Text size="sm" fw={600} c="var(--accent-color)" mb="sm">
                        CONCEPT
                    </Text>

                    <Title order={2} size="1.75rem" mb="lg" style={{ color: 'var(--text-primary)' }}>
                        문제는 질문이 아니라, 응답 기준이었습니다.
                    </Title>

                    <Text size="md" c="dimmed" mb="xl" style={{ lineHeight: 1.8 }}>
                        YourAI가 다루는 <strong style={{ color: 'var(--text-primary)' }}>'응답 형식'</strong>은
                        단순한 말투가 아닙니다.
                        <br />
                        AI가 답변을 구성하는 <strong style={{ color: 'var(--text-primary)' }}>구조 규칙</strong>입니다.
                    </Text>

                    <Box
                        p="xl"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: 12,
                            border: '1px solid var(--border-color)',
                        }}
                    >
                        <Stack gap="lg">
                            <Group gap="lg" align="flex-start">
                                <Text fw={600} size="sm" w={100} c="var(--accent-color)">
                                    정보 밀도
                                </Text>
                                <Text size="sm" c="dimmed">
                                    자세한 설명 vs 핵심 요약
                                </Text>
                            </Group>
                            <Group gap="lg" align="flex-start">
                                <Text fw={600} size="sm" w={100} c="var(--accent-color)">
                                    구조
                                </Text>
                                <Text size="sm" c="dimmed">
                                    서술형 줄글 vs 단계/목록 형식
                                </Text>
                            </Group>
                            <Group gap="lg" align="flex-start">
                                <Text fw={600} size="sm" w={100} c="var(--accent-color)">
                                    톤
                                </Text>
                                <Text size="sm" c="dimmed">
                                    공감 중심 vs 논리 중심
                                </Text>
                            </Group>
                        </Stack>
                    </Box>
                </motion.section>

                <Divider mb={80} />

                {/* ========== Section 4: Value / 얻어가는 것 ========== */}
                <motion.section
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.3 }}
                    style={{ marginBottom: 100 }}
                >
                    <Text size="sm" fw={600} c="var(--accent-color)" mb="sm">
                        VALUE
                    </Text>

                    <Title order={2} size="1.75rem" mb="lg" style={{ color: 'var(--text-primary)' }}>
                        여기서 얻어가는 것
                    </Title>

                    <Stack gap="md">
                        {[
                            '읽기 피로 감소 — 내 방식에 맞는 답변 구조',
                            '응답 일관성 — 매번 다른 스타일로 답하지 않음',
                            'AI 사용 기준 정리 — 내가 원하는 답의 원칙 확립',
                        ].map((item, index) => (
                            <Group key={index} gap="sm" align="flex-start">
                                <ThemeIcon
                                    size={24}
                                    radius="xl"
                                    style={{
                                        backgroundColor: 'var(--accent-color)',
                                        flexShrink: 0,
                                        marginTop: 2,
                                    }}
                                >
                                    <Text size="xs" fw={700} c="white">
                                        {index + 1}
                                    </Text>
                                </ThemeIcon>
                                <Text size="md" style={{ lineHeight: 1.6 }}>
                                    {item}
                                </Text>
                            </Group>
                        ))}
                    </Stack>
                </motion.section>

                <Divider mb={80} />

                {/* ========== Section 5: Clarification / 이런 곳이 아닙니다 ========== */}
                <motion.section
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.4 }}
                    style={{ marginBottom: 100 }}
                >
                    <Text size="sm" fw={600} c="var(--accent-color)" mb="sm">
                        CLARIFICATION
                    </Text>

                    <Title order={2} size="1.75rem" mb="lg" style={{ color: 'var(--text-primary)' }}>
                        YourAI는 이런 곳이 아닙니다
                    </Title>

                    <Stack gap="sm">
                        {[
                            '프롬프트 예제/템플릿 모음 사이트',
                            'AI 툴 리뷰/비교 사이트',
                            '성향 테스트/MBTI 서비스',
                        ].map((item, index) => (
                            <Group key={index} gap="sm" align="center">
                                <ThemeIcon
                                    size={20}
                                    radius="xl"
                                    variant="light"
                                    color="gray"
                                >
                                    <IconX size={12} />
                                </ThemeIcon>
                                <Text size="md" c="dimmed">
                                    {item}
                                </Text>
                            </Group>
                        ))}
                    </Stack>
                </motion.section>

                <Divider mb={80} />

                {/* ========== Section 6: Next Steps / CTA ========== */}
                <motion.section
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.5 }}
                >
                    <Text size="sm" fw={600} c="var(--accent-color)" mb="md">
                        NEXT STEPS
                    </Text>

                    <Title order={2} size="1.75rem" mb="xl" style={{ color: 'var(--text-primary)' }}>
                        다음 행동을 선택하세요
                    </Title>

                    <Stack gap="md" align="center">
                        <Button
                            size="lg"
                            rightSection={<IconSettingsAutomation size={18} />}
                            onClick={() => router.push('/my-ai')}
                            styles={{
                                root: {
                                    backgroundColor: 'var(--accent-color)',
                                    color: '#fff',
                                    width: 320,
                                    height: 45,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: 'var(--accent-hover)',
                                    }
                                }
                            }}
                        >
                            나의 AI 만들기
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            rightSection={<IconBooks size={18} />}
                            onClick={() => router.push('/instructions')}
                            styles={{
                                root: {
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-primary)',
                                    width: 320,
                                    height: 45,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                        borderColor: 'var(--text-secondary)',
                                    }
                                }
                            }}
                        >
                            응답 규칙 라이브러리 보기
                        </Button>

                        <Button
                            size="lg"
                            variant="subtle"
                            rightSection={<IconHome size={18} />}
                            onClick={() => router.push('/')}
                            styles={{
                                root: {
                                    color: 'var(--text-secondary)',
                                    width: 320,
                                    height: 45,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                        color: 'var(--text-primary)',
                                    }
                                }
                            }}
                        >
                            홈으로 돌아가기
                        </Button>
                    </Stack>
                </motion.section>
            </Container>
        </Box>
    );
}
