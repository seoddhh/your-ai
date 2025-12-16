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

    useEffect(() => {
        const domain = searchParams.get('domain') as Domain | null;
        if (domain && Object.keys(DOMAIN_META).includes(domain)) {
            setSelectedDomain(domain);
        }
    }, [searchParams]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { instructions: filteredInstructions, domainMeta, domains } = useAnswerRules({
        domain: selectedDomain,
        searchQuery,
        sortBy,
        includeUserRules: true,
    });

    if (!mounted) {
        return (
            <Box style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="lg" />
            </Box>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ backgroundColor: '#fff' }}>
                {/* 헤더 */}
                <Box
                    py="md"
                    px="xl"
                    style={{
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#fff',
                    }}
                >
                    <Box style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto' }}>
                        <Group justify="space-between" align="center">
                            <div>
                                <Title order={3} fw={700}>응답 규칙 라이브러리</Title>
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
                </Box>

                {/* 검색바 영역 - 헤더 바로 아래 */}
                <Box
                    py="md"
                    px="xl"
                    style={{
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: '#fafafa',
                    }}
                >
                    <Box style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto' }}>
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
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
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
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                    }
                                }}
                            />
                        </Group>
                    </Box>
                </Box>

                {/* 메인 콘텐츠 */}
                <Box px="xl" py="xl">
                    <Box style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto', display: 'flex', gap: 32 }}>
                        {/* 왼쪽: 필터 사이드바 (sticky) */}
                        <Box
                            w={200}
                            style={{
                                flexShrink: 0,
                                position: 'sticky',
                                top: 80,
                                alignSelf: 'flex-start',
                                maxHeight: 'calc(100vh - 100px)',
                                overflowY: 'auto',
                            }}
                        >
                            <Paper p="md" radius="md" withBorder style={{ borderColor: '#eee' }}>
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
                                        size="xs"
                                        onClick={() => setSelectedDomain(domain)}
                                        styles={{
                                            root: selectedDomain === domain ? {
                                                backgroundColor: 'rgba(224, 184, 97, 0.15)',
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
                                    <Text component="span" fw={600} c="dark">{filteredInstructions.length}개</Text>의 응답 규칙
                                </Text>
                                <Badge variant="light" color="gray" size="sm">
                                    {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                                </Badge>
                            </Group>

                            {/* 응답 규칙 그리드 */}
                            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
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
                                            isUserOwned={instruction.id.startsWith('user-')}
                                        />
                                    ))}
                                </AnimatePresence>
                            </SimpleGrid>

                            {filteredInstructions.length === 0 && (
                                <Box ta="center" py={60}>
                                    <Text size="md" c="dimmed">
                                        검색 결과가 없습니다
                                    </Text>
                                    <Text size="sm" c="dimmed" mt="xs">
                                        다른 검색어나 필터를 시도해보세요
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </main>
        </div>
    );
}

function LibraryLoadingFallback() {
    return (
        <Box style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
