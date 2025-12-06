"use client";

import Link from 'next/link';
import { Card, Text, Badge, Group } from '@mantine/core';

interface QuestionCardProps {
    id: string;
    content: string;
    category: string;
    stats: string;
}

export default function QuestionCard({ id, content, category, stats }: QuestionCardProps) {
    return (
        <Card
            component={Link}
            href={`/questions/${id}`}
            padding="lg"
            radius="md"
            withBorder
            styles={(theme) => ({
                root: {
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows.md,
                    }
                }
            })}
        >
            <Group justify="space-between" mb="xs">
                <Badge color="blue" variant="light">
                    {category}
                </Badge>
            </Group>

            <Text fw={700} size="lg" mb="sm" lineClamp={2}>
                "{content}"
            </Text>

            <Text size="sm" c="dimmed">
                {stats}
            </Text>
        </Card>
    );
}
