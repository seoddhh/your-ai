"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import {
    Title,
    Text,
    Card,
    Group,
    Badge,
    Button,
    Box,
    SimpleGrid,
    Paper,
    Loader,
    Stack,
    Container,
} from '@mantine/core';
import {
    IconTrendingUp,
    IconSparkles,
    IconArrowRight,
    IconEye,
    IconPlus,
    IconStar,
    IconCategory,
} from '@tabler/icons-react';
import {
    DOMAIN_META,
    Domain,
    CustomInstruction
} from '@/data/customInstructions';
import AnswerRuleListSection from '@/components/shared/AnswerRuleListSection';
import DomainHighlightSection from '@/components/shared/DomainHighlightSection';
import AnswerRuleCard from '@/components/shared/AnswerRuleCard';
import { useTopRulesByDomain, useAnswerRules } from '@/hooks/useAnswerRules';

// 도메인 탭 정보
const DOMAIN_TABS = [
    { id: 'all', label: '전체', icon: '/icons/all.png' },
    { id: 'Tech', label: '개발자', icon: '/icons/developericons.png' },
    { id: 'Creative', label: '디자이너', icon: '/icons/designer.png' },
    { id: 'Business', label: '비즈니스', icon: '/icons/business.png' },
    { id: 'Marketing', label: '마케터', icon: '/icons/marketing.png' },
    { id: 'Social', label: 'SNS', icon: '/icons/social-network.png' },
    { id: 'Academia', label: '연구자', icon: '/icons/reserchericons.png' },
    { id: 'Education', label: '교육자', icon: '/icons/teacher.png' },
    { id: 'Healthcare', label: '의료인', icon: '/icons/doctor.png' },
    { id: 'Finance', label: '금융인', icon: '/icons/bank.png' },
    { id: 'Legal', label: '법률가', icon: '/icons/law.png' },
] as const;

export default function InstructionsHome() {
    const [mounted, setMounted] = useState(false);
    const [activeDomainTab, setActiveDomainTab] = useState<Domain | 'all'>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // 사용자 등록 응답 규칙
    const userInstructions = useAppStore((state) => state.userInstructions);

    // 도메인별 TOP 3
    const topRulesByDomain = useTopRulesByDomain(3);

    // 추천 규칙 (가장 인기 있는 4개)
    const { instructions: recommendedRules } = useAnswerRules({
        sortBy: 'popular',
        limit: 4,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // 현재 선택된 도메인의 TOP 3
    const currentTop3 = useMemo(() => {
        return topRulesByDomain[activeDomainTab] || [];
    }, [topRulesByDomain, activeDomainTab]);

    if (!mounted) {
        return (
            <Box style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Loader color="yellow" size="lg" />
            </Box>
        );
    }

    return (
        <Box py="xl" style={{ paddingLeft: 190, paddingRight: 190 }}>
            {/* 헤더 영역 */}
            <Box mb={48}>
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={2} fw={700} mb={4}>
                            나만의 AI 찾기
                        </Title>
                        <Text size="sm" c="dimmed">
                            나에게 맞는 AI 응답 스타일을 발견하세요
                        </Text>
                    </div>
                    <Group gap="sm">
                        <Link href="/instructions">
                            <Button
                                variant="subtle"
                                color="gray"
                                leftSection={<IconCategory size={16} />}
                                size="sm"
                            >
                                전체 라이브러리
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                variant="filled"
                                leftSection={<IconPlus size={16} />}
                                size="sm"
                                styles={{ root: { backgroundColor: 'var(--accent-color)' } }}
                            >
                                응답 규칙 등록
                            </Button>
                        </Link>
                    </Group>
                </Group>
            </Box>

            {/* AI 스타일 테스트 CTA */}
            <Paper
                p="lg"
                radius="lg"
                mb={48}
                style={{
                    background: 'linear-gradient(135deg, #E0B861 0%, #d4a84a 100%)',
                    color: '#fff',
                }}
            >
                <Group justify="space-between" align="center">
                    <Group gap="md">
                        <Image
                            src="/icons/ai-robot.png"
                            alt="AI Robot"
                            width={40}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                        <div>
                            <Text fw={700} size="lg">AI 응답 스타일 테스트</Text>
                            <Text size="sm" style={{ opacity: 0.9 }}>
                                간단한 질문에 답하고 나에게 맞는 응답 규칙을 찾아보세요
                            </Text>
                        </div>
                    </Group>
                    <Link href="/my-ai">
                        <Button
                            variant="white"
                            color="dark"
                            size="md"
                            rightSection={<IconArrowRight size={16} />}
                        >
                            테스트 시작하기
                        </Button>
                    </Link>
                </Group>
            </Paper>

            {/* 도메인별 TOP 3 섹션 */}
            <Box mb={48}>
                <Group justify="space-between" align="center" mb="md">
                    <Group gap="sm">
                        <div>
                            <Title order={5}>분야별 인기 응답 규칙 TOP 3</Title>
                            <Text size="xs" c="dimmed">각 분야에서 가장 많이 사용되는 응답 규칙</Text>
                        </div>
                    </Group>
                    <Link href="/instructions">
                        <Button variant="subtle" color="gray" size="xs">
                            전체 라이브러리 보기
                        </Button>
                    </Link>
                </Group>

                {/* 도메인 탭 - 카드 스타일 유지 */}
                <Box
                    mb="md"
                    style={{
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                    }}
                    className="hide-scrollbar"
                >
                    <Group gap={8} wrap="nowrap">
                        {DOMAIN_TABS.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeDomainTab === tab.id ? 'filled' : 'light'}
                                size="xs"
                                radius="md"
                                leftSection={
                                    <Image
                                        src={tab.icon}
                                        alt={tab.label}
                                        width={16}
                                        height={16}
                                        style={{ objectFit: 'contain' }}
                                    />
                                }
                                onClick={() => setActiveDomainTab(tab.id as Domain | 'all')}
                                styles={{
                                    root: activeDomainTab === tab.id ? {
                                        backgroundColor: 'var(--accent-color)',
                                    } : {
                                        backgroundColor: 'var(--card-bg)',
                                        color: 'var(--text-secondary)',
                                        border: '1px solid var(--border-color)',
                                    }
                                }}
                                style={{ flexShrink: 0 }}
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </Group>
                </Box>

                {/* TOP 3 카드 리스트 */}
                <Paper
                    p="lg"
                    radius="lg"
                    withBorder
                    style={{
                        borderColor: 'var(--border-color)',
                        backgroundColor: 'var(--card-bg)',
                    }}
                >
                    <Title order={6} mb="md" c="dimmed">
                        {activeDomainTab === 'all'
                            ? '전체 인기 응답 규칙 TOP 3'
                            : `${DOMAIN_TABS.find(t => t.id === activeDomainTab)?.label} 분야 TOP 3`
                        }
                    </Title>
                    <Stack gap="sm">
                        <AnimatePresence mode="wait">
                            {currentTop3.map((instruction, idx) => (
                                <TopRankCard
                                    key={`${activeDomainTab}-${instruction.id}`}
                                    instruction={instruction}
                                    rank={idx + 1}
                                    isExpanded={expandedId === instruction.id}
                                    onToggle={() => setExpandedId(
                                        expandedId === instruction.id ? null : instruction.id
                                    )}
                                />
                            ))}
                        </AnimatePresence>
                        {currentTop3.length === 0 && (
                            <Text c="dimmed" ta="center" py="lg" size="sm">
                                이 분야의 응답 규칙이 없습니다
                            </Text>
                        )}
                    </Stack>
                </Paper>
            </Box>

            {/* 분야별 하이라이트 */}
            <Box mb={48}>
                <Group gap="sm" mb="md">

                    <div>
                        <Title order={5}>분야별 추천</Title>
                        <Text size="xs" c="dimmed">각 분야의 대표 응답 규칙을 한눈에</Text>
                    </div>
                </Group>
                <DomainHighlightSection />
            </Box>

            {/* 나의 응답 규칙 */}
            {userInstructions.length > 0 && (
                <Box mb={48}>
                    <Group justify="space-between" align="center" mb="md">
                        <Group gap="sm">
                            <div>
                                <Title order={5}>나의 응답 규칙</Title>
                                <Text size="xs" c="dimmed">내가 등록한 응답 규칙</Text>
                            </div>
                        </Group>
                        <Link href="/my-ai">
                            <Button variant="subtle" color="gray" size="xs">
                                전체 보기
                            </Button>
                        </Link>
                    </Group>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        {userInstructions.slice(0, 2).map((instruction) => (
                            <CompactRuleCard
                                key={instruction.id}
                                instruction={instruction}
                                isUserOwned
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            )}

            {/* 오늘의 추천 */}
            <Box mb={48}>
                <Group gap="sm" mb="md">
                    <div>
                        <Title order={5}>오늘의 추천 응답 규칙</Title>
                        <Text size="xs" c="dimmed">가장 많이 사용되는 검증된 규칙</Text>
                    </div>
                </Group>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                    {recommendedRules.slice(0, 4).map((instruction, index) => (
                        <AnswerRuleCard
                            key={instruction.id}
                            instruction={instruction}
                            index={index}
                            isExpanded={expandedId === instruction.id}
                            onToggle={() => setExpandedId(
                                expandedId === instruction.id ? null : instruction.id
                            )}
                            isCompact={false}
                            showAnimation={true}
                        />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}

// TOP 순위 카드 - 간결한 리스트형
function TopRankCard({
    instruction,
    rank,
    isExpanded,
    onToggle,
}: {
    instruction: CustomInstruction;
    rank: number;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const domainMeta = DOMAIN_META[instruction.domain];
    const rankIcon = rank === 1 ? '/icons/011-1.png' : rank === 2 ? '/icons/010-2.png' : '/icons/012-3.png';

    return (
        <motion.div
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.15, delay: rank * 0.03 }}
        >
            <Card
                p="md"
                radius="md"
                withBorder
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderColor: isExpanded ? 'var(--accent-color)' : 'var(--border-color)',
                    backgroundColor: isExpanded ? 'var(--gold-light)' : 'var(--card-bg)',
                }}
                onClick={onToggle}
            >
                <Group gap="md" align="flex-start">
                    {/* 순위 아이콘 */}
                    <Image
                        src={rankIcon}
                        alt={`Rank ${rank}`}
                        width={28}
                        height={28}
                    />

                    {/* 콘텐츠 */}
                    <div style={{ flex: 1 }}>
                        <Group justify="space-between" mb={4}>
                            <Text fw={600} size="sm">{instruction.name}</Text>
                            <Badge
                                variant="light"
                                size="xs"
                                style={{
                                    backgroundColor: `${domainMeta?.color || '#ccc'}10`,
                                    color: domainMeta?.color || '#666',
                                }}
                            >
                                {domainMeta?.label || instruction.domain}
                            </Badge>
                        </Group>

                        <Text size="xs" c="dimmed" lineClamp={isExpanded ? undefined : 1}>
                            {instruction.description}
                        </Text>

                        {/* 확장 내용 */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Box mt="sm">
                                        <Text size="xs" fw={500} c="dimmed" mb={4}>
                                            사용자 프로필
                                        </Text>
                                        <Paper
                                            p="xs"
                                            radius="sm"
                                            style={{
                                                backgroundColor: 'var(--gold-light)',
                                                fontSize: 12,
                                                lineHeight: 1.5,
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {instruction.userProfile}
                                        </Paper>

                                        <Group mt="sm" gap="xs">
                                            <Link href={`/rule/${instruction.id}`}>
                                                <Button
                                                    size="xs"
                                                    variant="filled"
                                                    styles={{ root: { backgroundColor: 'var(--accent-color)' } }}
                                                    rightSection={<IconArrowRight size={12} />}
                                                >
                                                    상세보기
                                                </Button>
                                            </Link>
                                            <Link href={`/compare?instruction=${instruction.id}`}>
                                                <Button size="xs" variant="light" color="gray">
                                                    비교하기
                                                </Button>
                                            </Link>
                                        </Group>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 메타 정보 */}
                        <Group gap="xs" mt="xs">
                            <IconEye size={12} color="#999" />
                            <Text size="xs" c="dimmed">{instruction.popularity}명 사용</Text>
                        </Group>
                    </div>
                </Group>
            </Card>
        </motion.div>
    );
}

// 컴팩트 규칙 카드 - 사용자 규칙용
function CompactRuleCard({
    instruction,
    isUserOwned = false,
}: {
    instruction: CustomInstruction;
    isUserOwned?: boolean;
}) {
    const domainMeta = DOMAIN_META[instruction.domain];

    return (
        <Card
            p="md"
            radius="lg"
            withBorder
            style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--card-bg)',
            }}
        >
            <Group justify="space-between" mb={8}>
                <Group gap="xs">
                    <Text fw={600} size="sm">{instruction.name}</Text>
                    {isUserOwned && (
                        <Badge color="yellow" variant="light" size="xs">내가 등록</Badge>
                    )}
                </Group>
                <Badge
                    variant="light"
                    size="xs"
                    style={{
                        backgroundColor: `${domainMeta?.color || '#ccc'}10`,
                        color: domainMeta?.color || '#666',
                    }}
                >
                    {domainMeta?.label}
                </Badge>
            </Group>
            <Text size="xs" c="dimmed" lineClamp={2} mb="sm">
                {instruction.description}
            </Text>
            <Group justify="space-between" pt="xs" style={{ borderTop: '1px solid var(--border-color)' }}>
                <Text size="xs" c="dimmed">{instruction.popularity}명 사용</Text>
                <Link href={`/rule/${instruction.id}`}>
                    <Button size="xs" variant="subtle" color="yellow">
                        자세히 보기
                    </Button>
                </Link>
            </Group>
        </Card>
    );
}
