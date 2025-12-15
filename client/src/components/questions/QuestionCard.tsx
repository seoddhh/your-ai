"use client";

import { useRouter } from 'next/navigation';
import { Card, Text, Badge, Group, Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { CATEGORY_INFO, QuestionCategory } from '@/data/questions';

interface QuestionCardProps {
    id: string;
    question: string;
    category: QuestionCategory;
    hint: string;
}

export default function QuestionCard({ id, question, category, hint }: QuestionCardProps) {
    const router = useRouter();
    const categoryInfo = CATEGORY_INFO[category];

    const handleClick = () => {
        const encodedQuestion = encodeURIComponent(question);
        router.push(`/compare?q=${encodedQuestion}`);
    };

    return (
        <Card
            padding="lg"
            radius="md"
            withBorder
            styles={(theme) => ({
                root: {
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows.md,
                    }
                }
            })}
        >
            <Group justify="space-between" mb="xs">
                <Badge
                    variant="light"
                    style={{
                        backgroundColor: `${categoryInfo.color}15`,
                        color: categoryInfo.color,
                    }}
                >
                    {categoryInfo.label}
                </Badge>
            </Group>

            <Text fw={700} size="lg" mb="xs" lineClamp={2}>
                "{question}"
            </Text>

            <Text size="sm" c="dimmed" mb="md">
                💡 {hint}
            </Text>

            <Button
                variant="light"
                color="yellow"
                fullWidth
                rightSection={<IconArrowRight size={16} />}
                onClick={handleClick}
                styles={{
                    root: {
                        backgroundColor: '#E0B86115',
                        color: '#B8963A',
                        '&:hover': {
                            backgroundColor: '#E0B86130',
                        }
                    }
                }}
            >
                이 질문으로 응답 규칙 비교하기
            </Button>
        </Card>
    );
}
