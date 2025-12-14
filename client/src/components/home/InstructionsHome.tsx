"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import {
    Container,
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
    Tabs,
    ScrollArea,
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
    customInstructions,
    DOMAIN_META,
    Domain,
    CustomInstruction
} from '@/data/customInstructions';
import Sidebar from '@/components/layout/Sidebar';
import AnswerRuleListSection from '@/components/shared/AnswerRuleListSection';
import DomainHighlightSection from '@/components/shared/DomainHighlightSection';
import { useTopRulesByDomain, useAnswerRules } from '@/hooks/useAnswerRules';

// 도메인 탭 정보
const DOMAIN_TABS = [
    { id: 'all', label: '전체', icon: '/icons/001-icon-5110754.png' },
    { id: 'Tech', label: '개발자', icon: '/icons/developericons.png' },
    { id: 'Creative', label: '디자이너', icon: '/icons/designer.png' },
    { id: 'Business', label: '비즈니스', icon: '/icons/business.png' },
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
            <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ backgroundColor: '#fff' }}>
                {/* 헤더 영역 */}
                <Box
                    py="lg"
                    px={48}
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group justify="space-between" align="center" wrap="wrap" gap="md">
                        <div>
                            <Title order={2} style={{ fontFamily: 'var(--font-en)' }}>
                                나만의 AI 찾기
                            </Title>
                            <Text size="sm" c="dimmed">
                                나에게 맞는 AI 응답 스타일을 발견하세요
                            </Text>
                        </div>
                        <Group gap="sm" wrap="nowrap">
                            <Link href="/instructions">
                                <Button
                                    variant="light"
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
                                    color="yellow"
                                    leftSection={<IconPlus size={16} />}
                                    size="sm"
                                    styles={{ root: { backgroundColor: '#E0B861' } }}
                                >
                                    응답 규칙 등록
                                </Button>
                            </Link>
                        </Group>
                    </Group>
                </Box>

                {/* 메인 콘텐츠 영역 */}
                <Box px={48} py="xl">
                    {/* AI 스타일 테스트 CTA */}
                    <Paper
                        p="xl"
                        radius="lg"
                        mb="xl"
                        style={{
                            background: 'linear-gradient(135deg, #E0B861 30%, #f4a70eff 100%)',
                            color: '#ffffff',
                        }}
                    >
                        <Group justify="space-between" align="center">
                            <div>
                                <Group gap="xs" mb="xs">
                                    <Image
                                        src="/icons/ai-robot.png"
                                        alt="AI Robot"
                                        width={28}
                                        height={28}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <Title order={3}>AI 응답 스타일 테스트</Title>
                                </Group>
                                <Text size="sm" opacity={0.9}>
                                    간단한 질문에 답하고 나에게 맞는 응답 규칙을 추천받으세요
                                </Text>
                            </div>
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
                    <AnswerRuleListSection
                        title="분야별 인기 응답 규칙 TOP 3"
                        subtitle="각 분야에서 가장 많이 사용되는 응답 규칙"
                        icon={<IconTrendingUp size={20} color="#E0B861" />}
                        linkHref="/instructions"
                        linkText="전체 라이브러리 보기"
                    >
                        {/* 도메인 탭 */}
                        <Box
                            mb="lg"
                            style={{
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                            className="hide-scrollbar"
                        >
                            <Group gap="xs" wrap="nowrap" pb="xs">
                                {DOMAIN_TABS.map((tab) => (
                                    <Button
                                        key={tab.id}
                                        variant={activeDomainTab === tab.id ? 'filled' : 'light'}
                                        color={activeDomainTab === tab.id ? 'yellow' : 'gray'}
                                        size="sm"
                                        radius="xl"
                                        leftSection={
                                            <Image
                                                src={tab.icon}
                                                alt={tab.label}
                                                width={18}
                                                height={18}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        }
                                        onClick={() => setActiveDomainTab(tab.id as Domain | 'all')}
                                        styles={{
                                            root: activeDomainTab === tab.id ? {
                                                backgroundColor: '#E0B861',
                                                color: '#fff',
                                            } : {
                                                backgroundColor: 'rgba(0,0,0,0.04)',
                                            }
                                        }}
                                        style={{ flexShrink: 0 }}
                                    >
                                        {tab.id === 'all' ? tab.label : `${tab.label}를 위한`}
                                    </Button>
                                ))}
                            </Group>
                        </Box>

                        {/* TOP 3 카드 */}
                        <Paper p="lg" radius="lg" withBorder>
                            <Title order={5} mb="md">
                                {activeDomainTab === 'all'
                                    ? '🔥 전체 인기 응답 규칙 TOP 3'
                                    : `${DOMAIN_TABS.find(t => t.id === activeDomainTab)?.label}를 위한 응답 규칙 TOP 3`
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
                                    <Text c="dimmed" ta="center" py="lg">
                                        이 분야의 응답 규칙이 없습니다
                                    </Text>
                                )}
                            </Stack>
                        </Paper>
                    </AnswerRuleListSection>

                    {/* 분야별 하이라이트 */}
                    <AnswerRuleListSection
                        title="분야별 추천"
                        subtitle="각 분야의 대표 응답 규칙을 한눈에"
                        icon={<IconCategory size={20} color="#6366f1" />}
                        linkHref="/instructions"
                        linkText="전체 보기"
                    >
                        <DomainHighlightSection />
                    </AnswerRuleListSection>

                    {/* 나의 응답 규칙 */}
                    {userInstructions.length > 0 && (
                        <AnswerRuleListSection
                            title="나의 응답 규칙"
                            subtitle="내가 등록한 응답 규칙"
                            icon={<IconStar size={20} color="#f59e0b" />}
                            linkHref="/my-ai"
                            linkText="전체 보기"
                        >
                            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                                {userInstructions.slice(0, 2).map((instruction) => (
                                    <CompactRuleCard
                                        key={instruction.id}
                                        instruction={instruction}
                                        isUserOwned
                                    />
                                ))}
                            </SimpleGrid>
                        </AnswerRuleListSection>
                    )}

                    {/* 오늘의 추천 */}
                    <AnswerRuleListSection
                        title="오늘의 추천 응답 규칙"
                        subtitle="가장 많이 사용되는 검증된 규칙"
                        icon={<IconSparkles size={20} color="#ec4899" />}
                    >
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                            {recommendedRules.slice(0, 4).map((instruction) => (
                                <CompactRuleCard
                                    key={instruction.id}
                                    instruction={instruction}
                                />
                            ))}
                        </SimpleGrid>
                    </AnswerRuleListSection>
                </Box>
            </main>
        </div>
    );
}

// TOP 순위 카드 컴포넌트
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2, delay: rank * 0.05 }}
        >
            <Card
                p="md"
                radius="md"
                withBorder
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderColor: isExpanded ? '#E0B861' : '#e5e5e5',
                    backgroundColor: isExpanded ? '#fffdf8' : '#fff',
                }}
                onClick={onToggle}
            >
                <Group gap="md" align="flex-start">
                    {/* 순위 아이콘 */}
                    <Image
                        src={rankIcon}
                        alt={`Rank ${rank}`}
                        width={32}
                        height={32}
                    />

                    {/* 콘텐츠 */}
                    <div style={{ flex: 1 }}>
                        <Group justify="space-between" mb="xs">
                            <div>
                                <Text fw={600} size="sm">{instruction.name}</Text>
                                <Text size="xs" c="dimmed">{instruction.targetRole}</Text>
                            </div>
                            <Badge
                                variant="light"
                                size="sm"
                                style={{
                                    backgroundColor: `${domainMeta?.color || '#ccc'}15`,
                                    color: domainMeta?.color || '#666',
                                }}
                            >
                                {domainMeta?.label || instruction.domain}
                            </Badge>
                        </Group>

                        <Text size="sm" c="dimmed" lineClamp={isExpanded ? undefined : 2}>
                            {instruction.description}
                        </Text>

                        {/* 확장 내용 */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Box mt="md">
                                        <Text size="xs" fw={600} c="dimmed" mb="xs">
                                            사용자 프로필
                                        </Text>
                                        <Paper
                                            p="sm"
                                            radius="sm"
                                            style={{
                                                backgroundColor: 'var(--gold-light)',
                                                fontSize: 12,
                                                lineHeight: 1.6,
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {instruction.userProfile}
                                        </Paper>

                                        <Group mt="md" gap="xs">
                                            <Link href={`/rule/${instruction.id}`}>
                                                <Button
                                                    size="xs"
                                                    variant="filled"
                                                    color="yellow"
                                                    styles={{ root: { backgroundColor: '#E0B861' } }}
                                                    rightSection={<IconArrowRight size={14} />}
                                                >
                                                    상세보기
                                                </Button>
                                            </Link>
                                            <Link href={`/compare?instruction=${instruction.id}`}>
                                                <Button
                                                    size="xs"
                                                    variant="light"
                                                    color="gray"
                                                >
                                                    비교하기
                                                </Button>
                                            </Link>
                                        </Group>
                                    </Box>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 푸터 */}
                        <Group gap="xs" mt="sm">
                            <IconEye size={14} color="#999" />
                            <Text size="xs" c="dimmed">{instruction.popularity}명 사용</Text>
                        </Group>
                    </div>
                </Group>
            </Card>
        </motion.div>
    );
}

// 컴팩트 규칙 카드
function CompactRuleCard({
    instruction,
    isUserOwned = false,
}: {
    instruction: CustomInstruction;
    isUserOwned?: boolean;
}) {
    const domainMeta = DOMAIN_META[instruction.domain];

    return (
        <Card p="md" radius="lg" withBorder>
            <Group justify="space-between" mb="xs">
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
                        backgroundColor: `${domainMeta?.color || '#ccc'}15`,
                        color: domainMeta?.color || '#666',
                    }}
                >
                    {domainMeta?.label}
                </Badge>
            </Group>
            <Text size="xs" c="dimmed" lineClamp={2} mb="sm">
                {instruction.description}
            </Text>
            <Group justify="space-between">
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
