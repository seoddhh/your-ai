"use client";

import { useState, useMemo, useEffect } from 'react';
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
    TextInput,
    Box,
    SimpleGrid,
    Divider,
    ActionIcon,
    Tooltip,
    Paper,
    Loader,
    Stack
} from '@mantine/core';
import {
    IconSearch,
    IconCopy,
    IconHeart,
    IconChevronRight,
    IconEye,
    IconTrendingUp
} from '@tabler/icons-react';
import {
    customInstructions,
    DOMAIN_META,
    Domain,
    getInstructionsByDomain,
    getPopularInstructions,
    searchInstructions,
    CustomInstruction
} from '@/data/customInstructions';
import Image from 'next/image';
import Sidebar from '@/components/layout/Sidebar';

// 카테고리 아이콘 데이터 (이미지 아이콘 사용)
const CATEGORY_ICONS = [
    { id: 'all', label: '전체', icon: '/icons/001-icon-5110754.png', color: '#6366f1' },
    { id: 'Tech', label: '개발', icon: '/icons/developericons.png', color: '#3b82f6' },
    { id: 'Creative', label: '디자인', icon: '/icons/designer.png', color: '#ec4899' },
    { id: 'Business', label: '비즈니스', icon: '/icons/business.png', color: '#f59e0b' },
    { id: 'Academia', label: '연구', icon: '/icons/reserchericons.png', color: '#8b5cf6' },
    { id: 'Education', label: '교육', icon: '/icons/teacher.png', color: '#06b6d4' },
    { id: 'Healthcare', label: '의료', icon: '/icons/doctor.png', color: '#10b981' },
    { id: 'Finance', label: '금융', icon: '/icons/bank.png', color: '#22c55e' },
    { id: 'Legal', label: '법률', icon: '/icons/law.png', color: '#6b7280' },
];

export default function InstructionsHome() {
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Domain | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 필터링된 응답 규칙 목록
    const filteredInstructions = useMemo(() => {
        if (!customInstructions || !Array.isArray(customInstructions)) {
            return [];
        }

        let result = customInstructions;

        if (selectedCategory !== 'all') {
            result = getInstructionsByDomain(selectedCategory);
        }

        if (searchQuery) {
            result = searchInstructions(searchQuery).filter(
                i => selectedCategory === 'all' || i.domain === selectedCategory
            );
        }

        return result || [];
    }, [selectedCategory, searchQuery]);

    // 인기 응답 규칙 (주간/월간)
    const weeklyPopular = useMemo(() => {
        if (!customInstructions || !Array.isArray(customInstructions)) return [];
        return getPopularInstructions(3);
    }, []);

    const monthlyPopular = useMemo(() => {
        if (!customInstructions || !Array.isArray(customInstructions)) return [];
        return getPopularInstructions(6).slice(3, 6);
    }, []);

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
                    px="xl"
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group justify="space-between" align="center">
                        <div>
                            <Title order={2} style={{ fontFamily: 'var(--font-en)' }}>
                                나만의 AI 찾기
                            </Title>
                            <Text size="sm" c="dimmed">
                                나만의 AI 응답 스타일을 찾아보세요
                            </Text>
                        </div>
                        <Link href="/compare">
                            <Button
                                variant="filled"
                                color="yellow"
                                styles={{ root: { backgroundColor: '#E0B861' } }}
                            >
                                + 응답 규칙 등록
                            </Button>
                        </Link>
                    </Group>
                </Box>

                {/* 검색바 */}
                <Box px="xl" py="lg" style={{ backgroundColor: '#fefcf8' }}>
                    <TextInput
                        placeholder="나에게 맞는 AI 응답 스타일을 검색해보세요"
                        size="lg"
                        radius="xl"
                        leftSection={<IconSearch size={20} color="#999" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        styles={{
                            input: {
                                backgroundColor: '#fff',
                                border: '1px solid #e5e5e5',
                                '&:focus': {
                                    borderColor: '#E0B861',
                                }
                            }
                        }}
                    />

                    {/* 카테고리 아이콘 */}
                    <Group gap="md" mt="lg" justify="center">
                        {CATEGORY_ICONS.map((cat) => (
                            <Box
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id as Domain | 'all')}
                                style={{
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                <Box
                                    w={56}
                                    h={56}
                                    mx="auto"
                                    mb={4}
                                    style={{
                                        borderRadius: 12,
                                        backgroundColor: selectedCategory === cat.id ? cat.color : '#f5f5f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        border: selectedCategory === cat.id ? 'none' : '1px solid #e5e5e5',
                                        padding: 8,
                                    }}
                                >
                                    <Image
                                        src={cat.icon}
                                        alt={cat.label}
                                        width={36}
                                        height={36}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Text
                                    size="xs"
                                    fw={selectedCategory === cat.id ? 600 : 400}
                                    c={selectedCategory === cat.id ? cat.color : 'dimmed'}
                                >
                                    {cat.label}
                                </Text>
                            </Box>
                        ))}
                    </Group>
                </Box>

                {/* 메인 콘텐츠 영역 */}
                <Box px="xl" py="lg">
                    {/* 인기 응답 규칙 섹션 */}
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="xl">
                        {/* 이번 주 인기 */}
                        <Paper p="lg" radius="lg" withBorder>
                            <Group mb="md" gap="xs">
                                <IconTrendingUp size={20} color="#E0B861" />
                                <Title order={5}>가장 핫한 응답 규칙 TOP 3</Title>
                            </Group>
                            <Stack gap="sm">
                                {weeklyPopular.map((instruction, idx) => (
                                    <PopularCard
                                        key={instruction.id}
                                        instruction={instruction}
                                        rank={idx + 1}
                                        onClick={() => setExpandedId(instruction.id)}
                                    />
                                ))}
                            </Stack>
                        </Paper>

                        {/* 이번 달 인기 */}
                        <Paper p="lg" radius="lg" withBorder>
                            <Group mb="md" gap="xs">
                                <IconHeart size={20} color="#ec4899" />
                                <Title order={5}>이번 달 인기 응답 규칙 TOP 3</Title>
                            </Group>
                            <Stack gap="sm">
                                {monthlyPopular.map((instruction, idx) => (
                                    <PopularCard
                                        key={instruction.id}
                                        instruction={instruction}
                                        rank={idx + 1}
                                        onClick={() => setExpandedId(instruction.id)}
                                    />
                                ))}
                            </Stack>
                        </Paper>
                    </SimpleGrid>

                    {/* 결과 카운트 */}
                    <Group justify="space-between" mb="lg">
                        <Text c="dimmed">
                            {selectedCategory === 'all' ? '전체' : (DOMAIN_META[selectedCategory]?.label || selectedCategory)}에서{' '}
                            <strong>{filteredInstructions.length}개</strong>의 응답 규칙
                        </Text>
                    </Group>

                    {/* 응답 규칙 그리드 */}
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                        <AnimatePresence mode="popLayout">
                            {filteredInstructions.map((instruction, index) => (
                                <InstructionCard
                                    key={instruction.id}
                                    instruction={instruction}
                                    index={index}
                                    isExpanded={expandedId === instruction.id}
                                    onToggle={() => setExpandedId(
                                        expandedId === instruction.id ? null : instruction.id
                                    )}
                                />
                            ))}
                        </AnimatePresence>
                    </SimpleGrid>

                    {filteredInstructions.length === 0 && (
                        <Box ta="center" py={60}>
                            <Text size="lg" c="dimmed">
                                검색 결과가 없습니다
                            </Text>
                        </Box>
                    )}
                </Box>
            </main>
        </div>
    );
}

// 인기 응답 규칙 카드 (컴팩트)
function PopularCard({
    instruction,
    rank,
    onClick
}: {
    instruction: CustomInstruction;
    rank: number;
    onClick: () => void;
}) {
    return (
        <Box
            p="sm"
            style={{
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background 0.2s',
                '&:hover': { backgroundColor: '#f9f9f9' }
            }}
            onClick={onClick}
        >
            <Group gap="sm">
                <Image
                    src={rank === 1 ? '/icons/011-1.png' : rank === 2 ? '/icons/010-2.png' : '/icons/012-3.png'}
                    alt={`Rank ${rank}`}
                    width={28}
                    height={28}
                />
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={600} lineClamp={1}>
                        {instruction.emoji} {instruction.name}
                    </Text>
                    <Text size="xs" c="dimmed" lineClamp={1}>
                        {instruction.description}
                    </Text>
                </div>
                <Group gap={4}>
                    <IconEye size={14} color="#999" />
                    <Text size="xs" c="dimmed">{instruction.popularity}</Text>
                </Group>
            </Group>
        </Box>
    );
}

// 응답 규칙 카드 컴포넌트
function InstructionCard({
    instruction,
    index,
    isExpanded,
    onToggle
}: {
    instruction: CustomInstruction;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const domainMeta = DOMAIN_META[instruction.domain];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
        >
            <Card
                p="lg"
                radius="lg"
                withBorder
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderColor: isExpanded ? '#E0B861' : '#e5e5e5',
                    boxShadow: isExpanded ? '0 8px 24px rgba(224, 184, 97, 0.15)' : undefined,
                }}
                onClick={onToggle}
            >
                {/* 헤더 */}
                <Group justify="space-between" mb="sm">
                    <Group gap="sm">
                        <Text size="2rem">{instruction.emoji}</Text>
                        <div>
                            <Text fw={700}>{instruction.name}</Text>
                            <Text size="xs" c="dimmed">{instruction.targetRole}</Text>
                        </div>
                    </Group>
                    <Badge
                        variant="light"
                        style={{ backgroundColor: `${domainMeta?.color || '#ccc'}20`, color: domainMeta?.color || '#666' }}
                    >
                        {domainMeta?.emoji || '📌'} {domainMeta?.label || instruction.domain}
                    </Badge>
                </Group>

                {/* 설명 */}
                <Text size="sm" c="dimmed" mb="md" lineClamp={isExpanded ? undefined : 2}>
                    {instruction.description}
                </Text>

                {/* 태그 */}
                <Group gap="xs" mb="md">
                    {(instruction.tags || []).slice(0, 3).map((tag) => (
                        <Badge key={tag} size="sm" variant="outline" color="gray">
                            {tag}
                        </Badge>
                    ))}
                </Group>

                {/* 확장된 내용 */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Divider my="md" />

                            {/* User Profile */}
                            <Box mb="md">
                                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                    사용자 프로필
                                </Text>
                                <Paper
                                    p="sm"
                                    radius="md"
                                    style={{
                                        backgroundColor: 'var(--gold-light)',
                                        fontSize: 13,
                                        lineHeight: 1.7,
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {instruction.userProfile}
                                </Paper>
                            </Box>

                            {/* Response Preference */}
                            <Box mb="md">
                                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                    응답 스타일
                                </Text>
                                <Paper
                                    p="sm"
                                    radius="md"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        fontSize: 13,
                                        lineHeight: 1.7,
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {instruction.responsePreference}
                                </Paper>
                            </Box>

                            {/* 액션 버튼 */}
                            <Group mt="lg">
                                <Tooltip label="클립보드에 복사">
                                    <Button
                                        variant="light"
                                        color="gray"
                                        leftSection={<IconCopy size={16} />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(
                                                `[사용자 프로필]\n${instruction.userProfile}\n\n[응답 스타일]\n${instruction.responsePreference}`
                                            );
                                        }}
                                    >
                                        복사하기
                                    </Button>
                                </Tooltip>
                                <Link href={`/compare?instruction=${instruction.id}`} onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        variant="filled"
                                        color="yellow"
                                        rightSection={<IconChevronRight size={16} />}
                                        styles={{ root: { backgroundColor: '#E0B861' } }}
                                    >
                                        비교하기
                                    </Button>
                                </Link>
                            </Group>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 푸터 */}
                <Group justify="space-between" mt="md">
                    <Text size="xs" c="dimmed">
                        ❤️ {instruction.popularity}명 사용
                    </Text>
                    {instruction.author && (
                        <Text size="xs" c="dimmed">
                            by {instruction.author}
                        </Text>
                    )}
                </Group>
            </Card>
        </motion.div>
    );
}
