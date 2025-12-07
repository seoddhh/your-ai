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
    Loader
} from '@mantine/core';
import {
    IconSearch,
    IconArrowLeft,
    IconScale,
    IconCopy,
    IconHeart,
    IconChevronRight
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
import { useAppStore } from '@/store/useAppStore';

export default function InstructionsLibraryPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 필터링된 응답 규칙 목록
    const filteredInstructions = useMemo(() => {
        if (!customInstructions || !Array.isArray(customInstructions)) {
            return [];
        }

        let result = customInstructions;

        if (selectedDomain !== 'all') {
            result = getInstructionsByDomain(selectedDomain);
        }

        if (searchQuery) {
            result = searchInstructions(searchQuery).filter(
                i => selectedDomain === 'all' || i.domain === selectedDomain
            );
        }

        return result || [];
    }, [selectedDomain, searchQuery]);

    const popularInstructions = useMemo(() => {
        if (!customInstructions || !Array.isArray(customInstructions)) {
            return [];
        }
        return getPopularInstructions(5);
    }, []);

    // 마운트 전 로딩
    if (!mounted) {
        return (
            <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    const domainKeys = Object.keys(DOMAIN_META) as Domain[];

    return (
        <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
            {/* 헤더 */}
            <Box
                py="lg"
                style={{
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: '#fff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                }}
            >
                <Container size="xl">
                    <Group justify="space-between" align="center">
                        <Group>
                            <Link href="/" onClick={() => setHasSeenLanding(true)}>
                                <ActionIcon variant="subtle" size="lg">
                                    <IconArrowLeft size={20} />
                                </ActionIcon>
                            </Link>
                            <div>
                                <Title order={3} style={{ fontFamily: 'var(--font-en)' }}>
                                    응답 규칙 라이브러리
                                </Title>
                                <Text size="sm" c="dimmed">
                                    도메인별 검증된 Custom Instructions 탐색
                                </Text>
                            </div>
                        </Group>
                        <Link href="/compare">
                            <Button
                                variant="light"
                                color="yellow"
                                leftSection={<IconScale size={16} />}
                            >
                                응답 규칙 비교하기
                            </Button>
                        </Link>
                    </Group>
                </Container>
            </Box>

            <Container size="xl" py="xl">
                <Group align="flex-start" gap={40}>
                    {/* 왼쪽: 필터 사이드바 */}
                    <Box w={260} style={{ flexShrink: 0 }}>
                        <Paper p="lg" radius="lg" withBorder>
                            <Text size="sm" fw={700} mb="md">도메인 필터</Text>

                            <Button
                                fullWidth
                                variant={selectedDomain === 'all' ? 'filled' : 'subtle'}
                                color={selectedDomain === 'all' ? 'yellow' : 'gray'}
                                justify="flex-start"
                                mb="xs"
                                onClick={() => setSelectedDomain('all')}
                                styles={{
                                    root: selectedDomain === 'all' ? { backgroundColor: '#E0B861' } : {}
                                }}
                            >
                                🌐 전체 보기
                            </Button>

                            <Divider my="sm" />

                            {domainKeys.map((domain) => (
                                <Button
                                    key={domain}
                                    fullWidth
                                    variant={selectedDomain === domain ? 'light' : 'subtle'}
                                    color={selectedDomain === domain ? 'yellow' : 'gray'}
                                    justify="flex-start"
                                    mb="xs"
                                    onClick={() => setSelectedDomain(domain)}
                                    leftSection={<span>{DOMAIN_META[domain]?.emoji || '📌'}</span>}
                                >
                                    {DOMAIN_META[domain]?.label || domain}
                                </Button>
                            ))}
                        </Paper>

                        {/* 인기 응답 규칙 */}
                        <Paper p="lg" radius="lg" withBorder mt="lg">
                            <Group mb="md">
                                <IconHeart size={16} color="#E0B861" />
                                <Text size="sm" fw={700}>인기 응답 규칙</Text>
                            </Group>

                            {popularInstructions.slice(0, 3).map((instruction) => (
                                <Box
                                    key={instruction.id}
                                    p="sm"
                                    mb="xs"
                                    style={{
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                    }}
                                    onClick={() => setExpandedId(instruction.id)}
                                >
                                    <Group gap="xs">
                                        <Text size="lg">{instruction.emoji}</Text>
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500} lineClamp={1}>
                                                {instruction.name}
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                {instruction.popularity} 사용
                                            </Text>
                                        </div>
                                    </Group>
                                </Box>
                            ))}
                        </Paper>
                    </Box>

                    {/* 오른쪽: 메인 콘텐츠 */}
                    <Box style={{ flex: 1 }}>
                        {/* 검색 */}
                        <TextInput
                            placeholder="응답 규칙 검색... (예: 코드, 마케팅, 논문)"
                            size="lg"
                            radius="xl"
                            mb="xl"
                            leftSection={<IconSearch size={20} />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            styles={{
                                input: {
                                    backgroundColor: '#fff',
                                    border: '2px solid var(--border-color)',
                                    '&:focus': {
                                        borderColor: '#E0B861',
                                    }
                                }
                            }}
                        />

                        {/* 결과 카운트 */}
                        <Group justify="space-between" mb="lg">
                            <Text c="dimmed">
                                {selectedDomain === 'all' ? '전체' : (DOMAIN_META[selectedDomain]?.label || selectedDomain)}에서{' '}
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
                </Group>
            </Container>
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
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Card
                p="lg"
                radius="lg"
                withBorder
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderColor: isExpanded ? '#E0B861' : 'var(--border-color)',
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
                    {(instruction.tags || []).map((tag) => (
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
