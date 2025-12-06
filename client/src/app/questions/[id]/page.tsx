"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Grid, Container, Button, Group, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import AnswerCard from '@/components/answers/AnswerCard';
import QuestionHero from '@/components/questions/QuestionHero';
import { getQuestionById } from '@/data/questions';

export default function QuestionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const question = getQuestionById(id);

    if (!question) {
        return (
            <Container size="xl" py={100}>
                <Text size="xl" ta="center" c="dimmed">
                    질문을 찾을 수 없습니다.
                </Text>
                <Group justify="center" mt="xl">
                    <Button
                        variant="subtle"
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={() => router.push('/')}
                    >
                        질문 목록으로 돌아가기
                    </Button>
                </Group>
            </Container>
        );
    }

    return (
        <>
            {/* Back Navigation Header */}
            <Container size="xl" pt="md">
                <Button
                    variant="subtle"
                    color="gray"
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={() => router.push('/')}
                    styles={{
                        root: {
                            '&:hover': {
                                backgroundColor: 'var(--mantine-color-gray-1)',
                            }
                        }
                    }}
                >
                    질문 목록으로 돌아가기
                </Button>
            </Container>

            <QuestionHero
                category={question.category}
                content={question.content}
                stats={question.stats}
            />

            <Container size="xl" pb={100}>
                <Grid gutter="xl">
                    {(question.answers || []).map((answer) => (
                        <Grid.Col key={answer.id} span={{ base: 12, md: 6, lg: 4 }}>
                            <AnswerCard
                                modelName={answer.modelName}
                                content={answer.content}
                                persona={answer.persona}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
