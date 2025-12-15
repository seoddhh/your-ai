"use client";

import { useRouter } from 'next/navigation';
import { Card, Text, Badge, Group, Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { CATEGORY_INFO, QuestionCategory } from '@/data/questions';
import styles from './QuestionCard.module.css';

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
        <Card padding="lg" radius="md" withBorder>
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
                className={styles.questionButton}
            >
                이 질문으로 응답 규칙 비교하기
            </Button>
        </Card>
    );
}
