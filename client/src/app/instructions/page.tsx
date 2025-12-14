"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Title,
    Text,
    Group,
    Badge,
    Button,
    TextInput,
    Box,
    SimpleGrid,
    Divider,
    Paper,
    Loader,
    Select,
} from '@mantine/core';
import {
    IconSearch,
    IconScale,
    IconHeart,
    IconSortDescending,
} from '@tabler/icons-react';
import {
    DOMAIN_META,
    Domain,
} from '@/data/customInstructions';
import { useAnswerRules, SortOption } from '@/hooks/useAnswerRules';
import AnswerRuleCard from '@/components/shared/AnswerRuleCard';
import Sidebar from '@/components/layout/Sidebar';

const SORT_OPTIONS = [
    { value: 'popular', label: '인기순' },
    { value: 'recent', label: '최신순' },
    { value: 'usage', label: '사용량순' },
];

// 메인 페이지 컴포넌트 (Suspense로 감싸야 함)
function InstructionsLibraryContent() {
    const searchParams = useSearchParams();
    const initialDomain = searchParams.get('domain') as Domain | null;

    const [mounted, setMounted] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>(
        initialDomain && Object.keys(DOMAIN_META).includes(initialDomain) ? initialDomain : 'all'
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('popular');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // URL 파라미터 변경 감지
    useEffect(() => {
        const domain = searchParams.get('domain') as Domain | null;
        if (domain && Object.keys(DOMAIN_META).includes(domain)) {
            setSelectedDomain(domain);
        }
    }, [searchParams]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 훅을 사용하여 필터링된 데이터 가져오기
    const { instructions: filteredInstructions, domainMeta, domains } = useAnswerRules({
        domain: selectedDomain,
        searchQuery,
        sortBy,
        includeUserRules: true,
    });

    // 인기 규칙 (사이드바용)
    const { instructions: popularInstructions } = useAnswerRules({
        sortBy: 'popular',
        limit: 5,
    });

    // 마운트 전 로딩
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
                {/* 헤더 */}
                <Box
                    py="lg"
                    px={48}
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group justify="space-between" align="center">
                        <div>
                            <Title order={2}>응답 규칙 라이브러리</Title>
                            <Text size="sm" c="dimmed">
                                도메인별 검증된 Custom Instructions 탐색
                            </Text>
                        </div>
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
                </Box>

                <Box px={48} py="xl" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
                    {/* 왼쪽: 필터 사이드바 */}
                    <Box w={220} style={{ flexShrink: 0 }}>
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
                                전체 보기
                            </Button>

                            <Divider my="sm" />

                            {domains.map((domain) => (
                                <Button
                                    key={domain}
                                    fullWidth
                                    variant={selectedDomain === domain ? 'light' : 'subtle'}
                                    color={selectedDomain === domain ? 'yellow' : 'gray'}
                                    justify="flex-start"
                                    mb="xs"
                                    onClick={() => setSelectedDomain(domain)}
                                    styles={{
                                        root: selectedDomain === domain ? {
                                            backgroundColor: 'rgba(224, 184, 97, 0.15)',
                                            borderColor: '#E0B861',
                                        } : {}
                                    }}
                                >
                                    {domainMeta[domain]?.label || domain}
                                </Button>
                            ))}
                        </Paper>

                        {/* 인기 응답 규칙 */}
                        <Paper p="lg" radius="lg" withBorder mt="lg">
                            <Group mb="md">
                                <IconHeart size={16} color="#E0B861" />
                                <Text size="sm" fw={700}>내가 찜한 규칙</Text>
                            </Group>

                            {popularInstructions.slice(0, 5).map((instruction) => (
                                <Link
                                    key={instruction.id}
                                    href={`/rule/${instruction.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Box
                                        p="sm"
                                        mb="xs"
                                        style={{
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                    >
                                        <Group gap="xs">
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
                                </Link>
                            ))}
                        </Paper>
                    </Box>

                    {/* 오른쪽: 메인 콘텐츠 */}
                    <Box style={{ flex: 1 }}>
                        {/* 검색 및 정렬 */}
                        <Group gap="md" mb="xl">
                            <TextInput
                                placeholder="응답 규칙 검색... (예: 코드, 마케팅, 논문)"
                                size="md"
                                radius="xl"
                                style={{ flex: 1 }}
                                leftSection={<IconSearch size={18} />}
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
                            <Select
                                placeholder="정렬"
                                data={SORT_OPTIONS}
                                value={sortBy}
                                onChange={(value) => setSortBy(value as SortOption)}
                                leftSection={<IconSortDescending size={16} />}
                                w={140}
                                radius="xl"
                                styles={{
                                    input: {
                                        backgroundColor: '#fff',
                                        border: '2px solid var(--border-color)',
                                    }
                                }}
                            />
                        </Group>

                        {/* 결과 카운트 */}
                        <Group justify="space-between" mb="lg">
                            <Text c="dimmed">
                                {selectedDomain === 'all' ? '전체' : (domainMeta[selectedDomain]?.label || selectedDomain)}에서{' '}
                                <strong>{filteredInstructions.length}개</strong>의 응답 규칙
                            </Text>
                            <Badge variant="light" color="gray">
                                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                            </Badge>
                        </Group>

                        {/* 응답 규칙 그리드 */}
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                            <AnimatePresence mode="popLayout">
                                {filteredInstructions.map((instruction, index) => (
                                    <AnswerRuleCard
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
                                <Text size="sm" c="dimmed" mt="xs">
                                    다른 검색어나 필터를 시도해보세요
                                </Text>
                            </Box>
                        )}
                    </Box>
                </Box>
            </main>
        </div>
    );
}

// 로딩 폴백 컴포넌트
function LibraryLoadingFallback() {
    return (
        <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader color="yellow" size="xl" />
        </Box>
    );
}

// 기본 내보내기 (Suspense 경계 포함)
export default function InstructionsLibraryPage() {
    return (
        <Suspense fallback={<LibraryLoadingFallback />}>
            <InstructionsLibraryContent />
        </Suspense>
    );
}
