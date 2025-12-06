"use client";

import { useEffect, useState } from 'react';
import QuestionCard from "@/components/questions/QuestionCard";
import { getAllQuestions } from "@/data/questions";
import Sidebar from "@/components/layout/Sidebar";
import FilterChips from "@/components/ui/FilterChips";
import { Box, Loader, Title, Text, Group, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

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

    const questions = getAllQuestions() || [];

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                {/* 헤더 */}
                <Box
                    py="lg"
                    px="xl"
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group justify="space-between" align="center">
                        <div>
                            <Title order={2}>질문 목록</Title>
                            <Text size="sm" c="dimmed">
                                같은 질문에 대해 지침마다 어떻게 다르게 답변하는지 확인해보세요
                            </Text>
                        </div>
                        <Button
                            variant="filled"
                            color="yellow"
                            leftSection={<IconPlus size={16} />}
                            styles={{ root: { backgroundColor: '#E0B861' } }}
                        >
                            질문 제출하기
                        </Button>
                    </Group>
                </Box>

                <FilterChips />

                <div className="content-body">
                    <div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
                        {questions.map(q => (
                            <QuestionCard
                                key={q.id}
                                id={q.id}
                                content={q.content}
                                category={q.category}
                                stats={q.stats}
                            />
                        ))}
                    </div>

                    {questions.length === 0 && (
                        <Box ta="center" py={60}>
                            <Text size="lg" c="dimmed">
                                등록된 질문이 없습니다
                            </Text>
                        </Box>
                    )}
                </div>
            </main>
        </div>
    );
}
