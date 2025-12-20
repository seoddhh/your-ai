"use client";

import { useEffect, useState } from 'react';
import {
    Box,
    Loader,
    Title,
    Text,
    Stack,
    Paper,
    Group,
    TextInput,
    SimpleGrid,
    Select,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { DOMAIN_META, Domain } from '@/data/customInstructions';
import { getAllUseCases, UseCase } from '@/data/useCases';
import UseCaseCard from '@/components/use-cases/UseCaseCard';

export default function QuestionsPage() {
    const [mounted, setMounted] = useState(false);
    const [domain, setDomain] = useState<Domain | 'all'>('all');
    const [query, setQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    const allUseCases = getAllUseCases();
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = allUseCases.filter((u) => {
        if (domain !== 'all' && u.domain !== domain) return false;
        if (!normalizedQuery) return true;
        return (
            u.title.toLowerCase().includes(normalizedQuery) ||
            u.goal.toLowerCase().includes(normalizedQuery) ||
            u.desiredTags.some((t) => t.toLowerCase().includes(normalizedQuery))
        );
    });

    const groupByDomain = (items: UseCase[]) => {
        const result: Record<string, UseCase[]> = {};
        items.forEach((u) => {
            if (!result[u.domain]) result[u.domain] = [];
            result[u.domain].push(u);
        });
        return result as Record<Domain, UseCase[]>;
    };

    const grouped = groupByDomain(filtered);
    const domainOrder = (Object.keys(DOMAIN_META) as Domain[]).filter((d) =>
        domain === 'all' ? true : d === domain
    );

    return (
        <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
            {/* 헤더 */}
            <Box mb="xl">
                <Title order={2} fw={700} mb={4}>작업 예시</Title>
                <Text size="sm" c="dimmed">
                    도메인별로 “어떤 응답 규칙을 쓰면 좋은지” 바로 연결되는 상황별 예시 모음
                </Text>
            </Box>

            <Box>
                <Paper
                    p="md"
                    radius="lg"
                    withBorder
                    mb="xl"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--border-color)',
                    }}
                >
                    <Group gap="sm" grow>
                        <Select
                            label="도메인"
                            value={domain}
                            onChange={(value) => setDomain((value as Domain | 'all') ?? 'all')}
                            data={[
                                { value: 'all', label: '전체' },
                                ...(Object.keys(DOMAIN_META) as Domain[]).map((d) => ({
                                    value: d,
                                    label: DOMAIN_META[d].label,
                                })),
                            ]}
                        />
                        <TextInput
                            label="검색"
                            placeholder="예: PRD, 퍼널, 리스크, 간결함…"
                            leftSection={<IconSearch size={16} />}
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                    </Group>
                </Paper>

                <Stack gap="xl">
                    {domainOrder.map((d) => {
                        const list = grouped[d] || [];
                        if (list.length === 0) return null;

                        const meta = DOMAIN_META[d];
                        return (
                            <Paper
                                key={d}
                                p="lg"
                                radius="lg"
                                withBorder
                                style={{ backgroundColor: '#fff' }}
                            >
                                <Box mb="md">
                                    <Title order={4} mb={4} style={{ color: meta.color }}>
                                        {meta.label}
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        이 도메인에서 자주 쓰는 작업 템플릿
                                    </Text>
                                </Box>

                                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                                    {list.map((useCase) => (
                                        <UseCaseCard key={useCase.id} useCase={useCase} />
                                    ))}
                                </SimpleGrid>
                            </Paper>
                        );
                    })}
                </Stack>

                {filtered.length === 0 && (
                    <Box ta="center" py={60}>
                        <Text size="lg" c="dimmed">
                            조건에 맞는 작업 예시가 없습니다
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
