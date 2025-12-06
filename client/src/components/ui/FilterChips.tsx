"use client";

import { useFilterStore, FilterCategory } from '@/store/useFilterStore';
import { Badge, Button, Group, Paper, Text, CloseButton } from '@mantine/core';

export default function FilterChips() {
    const { filters, removeFilter, clearFilters } = useFilterStore();

    const hasFilters = Object.values(filters).some((list) => list.length > 0);

    if (!hasFilters) return null;

    return (
        <Paper p="md" mb="md" withBorder shadow="sm">
            <Group align="center" gap="xs">
                <Text size="sm" fw={700}>Active Filters:</Text>

                {Object.entries(filters).map(([category, values]) =>
                    values.map((value) => (
                        <Badge
                            key={`${category}-${value}`}
                            variant="filled"
                            color="blue"
                            size="lg"
                            radius="xl"
                            rightSection={
                                <CloseButton
                                    size="xs"
                                    variant="transparent"
                                    c="white"
                                    onClick={() => removeFilter(category as FilterCategory, value)}
                                    aria-label="Remove filter"
                                />
                            }
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
                    Clear All
                </Button>
            </Group>
        </Paper>
    );
}
