"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Button, Group, Text, Card, Stack, Loader, Box } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { getQuestionById, CATEGORY_INFO } from '@/data/questions';

export default function QuestionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const question = getQuestionById(id);

    // 질문이 있으면 비교 페이지로 리다이렉트
    useEffect(() => {
        if (question) {
            const encodedQuestion = encodeURIComponent(question.question);
            router.replace(`/compare?q=${encodedQuestion}`);
        }
    }, [question, router]);

    // 리다이렉트 중 또는 질문이 있는 경우 로딩 표시
    if (question) {
        return (
            <Box style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fdfdf2'
            }}>
                <Stack align="center" gap="md">
                    <Loader color="yellow" size="lg" />
                    <Text c="dimmed">비교 페이지로 이동 중...</Text>
                </Stack>
            </Box>
        );
    }

    // 질문을 찾을 수 없는 경우
    return (
        <Container size="sm" py={100}>
            <Card
                withBorder
                radius="lg"
                padding="xl"
                style={{ textAlign: 'center' }}
            >
                <Text size="xl" fw={600} mb="md">
                    질문을 찾을 수 없습니다
                </Text>
                <Text c="dimmed" mb="xl">
                    요청하신 질문이 존재하지 않거나 삭제되었습니다.
                </Text>
                <Group justify="center" gap="md">
                    <Button
                        variant="subtle"
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={() => router.push('/questions')}
                    >
                        질문 목록으로
                    </Button>
                    <Button
                        variant="filled"
                        rightSection={<IconArrowRight size={16} />}
                        onClick={() => router.push('/compare')}
                    >
                        직접 비교하기
                    </Button>
                </Group>
            </Card>
        </Container>
    );
}
