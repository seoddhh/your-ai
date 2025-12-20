"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
    Pagination,
} from '@mantine/core';
import {
    IconSearch,
    IconScale,
    IconSortDescending,
} from '@tabler/icons-react';
import {
    DOMAIN_META,
    Domain,
} from '@/data/customInstructions';
import { useAnswerRules, SortOption } from '@/hooks/useAnswerRules';
import AnswerRuleCard from '@/components/shared/AnswerRuleCard';

const SORT_OPTIONS = [
    { value: 'popular', label: '인기순' },
    { value: 'recent', label: '최신순' },
    { value: 'usage', label: '사용량순' },
];

const ITEMS_PER_PAGE = 10;

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
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        const domain = searchParams.get('domain') as Domain | null;
        if (domain && Object.keys(DOMAIN_META).includes(domain)) {
            setSelectedDomain(domain);
        }
    }, [searchParams]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 페이지 변경 시 스크롤 최상단으로 이동 (옵션)
    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activePage]);

    // 필터 변경 시 첫 페이지로 리셋
    useEffect(() => {
        setActivePage(1);
    }, [selectedDomain, searchQuery, sortBy]);

    const { instructions: filteredInstructions, domainMeta, domains } = useAnswerRules({
        domain: selectedDomain,
        searchQuery,
        sortBy,
        includeUserRules: true,
    });

    const totalItems = filteredInstructions.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedInstructions = filteredInstructions.slice(
        (activePage - 1) * ITEMS_PER_PAGE,
        activePage * ITEMS_PER_PAGE
    );

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
        <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
            {/* 헤더 */}
            <Box mb="xl">
                <Group justify="space-between" align="flex-start">
                    <div>
                        <Title order={2} fw={700} mb={4}>응답 규칙 라이브러리</Title>
                        <Text size="sm" c="dimmed">
                            도메인별 검증된 Custom Instructions 탐색
                        </Text>
                    </div>
                    <Link href="/compare">
                        <Button
                            variant="light"
                            color="yellow"
                            leftSection={<IconScale size={16} />}
                            size="sm"
                        >
                            응답 규칙 비교하기
                        </Button>
                    </Link>
                </Group>
            </Box>

            {/* 검색바 영역 */}
            <Paper
                p="md"
                radius="lg"
                mb="xl"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                }}
            >
                <Group gap="md">
                    <TextInput
                        placeholder="응답 규칙 검색... (예: 코드, 마케팅, 논문)"
                        size="sm"
                        radius="md"
                        style={{ flex: 1 }}
                        leftSection={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        styles={{
                            input: {
                                backgroundColor: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                                '&:focus': {
                                    borderColor: 'var(--accent-color)',
                                }
                            }
                        }}
                    />
                    <Select
                        placeholder="정렬"
                        data={SORT_OPTIONS}
                        value={sortBy}
                        onChange={(value) => setSortBy(value as SortOption)}
                        leftSection={<IconSortDescending size={14} />}
                        w={130}
                        size="sm"
                        radius="md"
                        styles={{
                            input: {
                                backgroundColor: 'var(--bg-color)',
                                border: '1px solid var(--border-color)',
                            }
                        }}
                    />
                </Group>
            </Paper>

            {/* 메인 콘텐츠 */}
            <Box style={{ display: 'flex', gap: 32 }}>
                {/* 왼쪽: 필터 사이드바 (sticky) */}
                <Box
                    w={200}
                    style={{
                        flexShrink: 0,
                        position: 'sticky',
                        top: 24,
                        alignSelf: 'flex-start',
                        maxHeight: 'calc(100vh - 48px)',
                        overflowY: 'auto',
                    }}
                >
                    <Paper
                        p="md"
                        radius="lg"
                        withBorder
                        style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--card-bg)',
                        }}
                    >
                        <Text size="sm" fw={600} mb="md">도메인 필터</Text>

                        <Button
                            fullWidth
                            variant={selectedDomain === 'all' ? 'filled' : 'subtle'}
                            color={selectedDomain === 'all' ? 'yellow' : 'gray'}
                            justify="flex-start"
                            mb="xs"
                            size="sm"
                            onClick={() => setSelectedDomain('all')}
                            styles={{
                                root: selectedDomain === 'all' ? { backgroundColor: 'var(--accent-color)' } : {}
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
                                size="xs"
                                onClick={() => setSelectedDomain(domain)}
                                styles={{
                                    root: selectedDomain === domain ? {
                                        backgroundColor: 'var(--accent-light)',
                                    } : {}
                                }}
                            >
                                {domainMeta[domain]?.label || domain}
                            </Button>
                        ))}
                    </Paper>
                </Box>

                {/* 오른쪽: 메인 콘텐츠 */}
                <Box style={{ flex: 1 }}>
                    {/* 결과 카운트 */}
                    <Group justify="space-between" mb="lg">
                        <Text size="sm" c="dimmed">
                            {selectedDomain === 'all' ? '전체' : (domainMeta[selectedDomain]?.label || selectedDomain)}에서{' '}
                            <Text component="span" fw={600} c="dark">{totalItems}개</Text>의 응답 규칙
                        </Text>
                        <Badge variant="light" color="gray" size="sm">
                            {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                        </Badge>
                    </Group>

                    {/* 응답 규칙 그리드 */}
                    <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md" mb={totalPages > 1 ? 'xl' : 0}>
                        {paginatedInstructions.map((instruction, index) => (
                            <AnswerRuleCard
                                key={instruction.id}
                                instruction={instruction}
                                index={index}
                                isExpanded={expandedId === instruction.id}
                                onToggle={() => setExpandedId(
                                    expandedId === instruction.id ? null : instruction.id
                                )}
                                isUserOwned={instruction.id.startsWith('user-')}
                            />
                        ))}
                    </SimpleGrid>

                    {filteredInstructions.length === 0 ? (
                        <Box ta="center" py={60}>
                            <Text size="md" c="dimmed">
                                검색 결과가 없습니다
                            </Text>
                            <Text size="sm" c="dimmed" mt="xs">
                                다른 검색어나 필터를 시도해보세요
                            </Text>
                        </Box>
                    ) : (
                        totalPages > 1 && (
                            <Group justify="center" mt="xl">
                                <Pagination
                                    total={totalPages}
                                    value={activePage}
                                    onChange={setActivePage}
                                    color="yellow"
                                    size="md"
                                    radius="md"
                                />
                            </Group>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
}

function LibraryLoadingFallback() {
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

export default function InstructionsLibraryPage() {
    return (
        <Suspense fallback={<LibraryLoadingFallback />}>
            <InstructionsLibraryContent />
        </Suspense>
    );
}
