"use client";

import { useEffect, useState } from 'react';
import QuestionCard from "@/components/questions/QuestionCard";
import { getQuestionsByCategory, CATEGORY_INFO, QuestionCategory } from "@/data/questions";

import { Box, Loader, Title, Text, Stack, Paper } from '@mantine/core';

export default function QuestionsPage() {
    const [mounted, setMounted] = useState(false);

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

    const questionsByCategory = getQuestionsByCategory();
    const categoryOrder: QuestionCategory[] = ['response_divergent', 'output_different', 'thinking_divergent'];

    return (
        <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
            {/* 헤더 */}
            <Box mb="xl">
                <Title order={2} fw={700} mb={4}>비교 실험용 질문</Title>
                <Text size="sm" c="dimmed">
                    규칙에 따라 결과가 달라지는 질문들을 탐색하세요
                </Text>
            </Box>

            <Box>
                <Stack gap="xl">
                    {categoryOrder.map((category) => {
                        const questions = questionsByCategory[category];
                        const info = CATEGORY_INFO[category];

                        return (
                            <Paper
                                key={category}
                                p="lg"
                                radius="md"
                                withBorder
                                style={{ backgroundColor: '#fff' }}
                            >
                                {/* 카테고리 헤더 */}
                                <Box mb="md">
                                    <Title
                                        order={4}
                                        mb={4}
                                        style={{ color: info.color }}
                                    >
                                        {info.label}
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        {info.description}
                                    </Text>
                                </Box>

                                {/* 질문 그리드 */}
                                <div
                                    className="grid-container"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                        gap: '16px'
                                    }}
                                >
                                    {questions.map(q => (
                                        <QuestionCard
                                            key={q.id}
                                            id={q.id}
                                            question={q.question}
                                            category={q.category}
                                            hint={q.hint}
                                        />
                                    ))}
                                </div>
                            </Paper>
                        );
                    })}
                </Stack>

                {categoryOrder.every(cat => questionsByCategory[cat].length === 0) && (
                    <Box ta="center" py={60}>
                        <Text size="lg" c="dimmed">
                            등록된 질문이 없습니다
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
