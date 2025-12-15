"use client";

import { useEffect, useState } from 'react';
import { useFilterStore, FilterCategory } from '@/store/useFilterStore';
import { Badge, Button, Group, Paper, Text, CloseButton } from '@mantine/core';

export default function FilterChips() {
    const [mounted, setMounted] = useState(false);
    const { filters, removeFilter, clearFilters } = useFilterStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // 마운트 전에는 렌더링하지 않음
    if (!mounted) return null;

    // filters가 없거나 필터가 비어있으면 렌더링하지 않음
    if (!filters || typeof filters !== 'object') return null;

    const filterEntries = Object.entries(filters);
    const hasFilters = filterEntries.some(([, list]) => Array.isArray(list) && list.length > 0);

    if (!hasFilters) return null;

    return (
        <Paper
            p="md"
            mb="md"
            withBorder
            shadow="sm"
            style={{
                backgroundColor: 'var(--gold-light)',
                borderColor: 'var(--border-color)'
            }}
        >
            <Group align="center" gap="xs">
                <Text size="sm" fw={700} c="var(--text-primary)">활성 필터:</Text>

                {filterEntries.map(([category, values]) =>
                    (Array.isArray(values) ? values : []).map((value) => (
                        <Badge
                            key={`${category}-${value}`}
                            variant="filled"
                            color="yellow"
                            size="lg"
                            radius="xl"
                            rightSection={
                                <CloseButton
                                    size="xs"
                                    variant="transparent"
                                    c="white"
                                    onClick={() => removeFilter(category as FilterCategory, value)}
                                    aria-label="필터 제거"
                                />
                            }
                            styles={{
                                root: {
                                    backgroundColor: '#E0B861',
                                    color: '#fff'
                                }
                            }}
                        >
                            {value}
                        </Badge>
                    ))
                )}

                <Button
                    variant="subtle"
                    size="xs"
                    color="gray"
                    onClick={clearFilters}
                    styles={{ root: { marginLeft: 'auto' } }}
                >
                    모두 지우기
                </Button>
            </Group>
        </Paper>
    );
}
