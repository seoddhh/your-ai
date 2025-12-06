"use client";

import React from 'react';
import Link from 'next/link';
import { useFilterStore, FilterCategory } from '@/store/useFilterStore';
import {
    Accordion,
    ActionIcon,
    Box,
    Button,
    Group,
    ScrollArea,
    Text,
    ThemeIcon,
    Title,
    rem,
    MantineProvider,
    Badge
} from '@mantine/core';
import { theme } from '@/theme';
import { IconChevronRight } from '@tabler/icons-react';

const FACET_GROUPS = [
    {
        id: 'domain',
        label: '관심 분야',
        subLabel: '어떤 분야에 관심이 있으신가요?',
        options: [
            '개발/코딩',
            '데이터 분석',
            '디자인/예술',
            '비즈니스/사업',
            '인문/철학',
            '학습/교육',
            '연구/리서치',
            '콘텐츠 제작'
        ]
    },
    {
        id: 'usageStyle',
        label: 'AI 활용 패턴',
        subLabel: '주로 어떻게 AI를 쓰시나요?',
        options: [
            '단순 질문해결',
            '티키타카 대화',
            '체계적인 지시',
            '템플릿 활용',
            '단계별 문제해결',
            '자유로운 실험'
        ]
    },
    {
        id: 'experience',
        label: 'AI 숙련도',
        subLabel: 'AI 사용 경험은 어느 정도인가요?',
        options: [
            '입문자 (3개월 미만)',
            '초보자 (6개월)',
            '경험자 (1년 이상)',
            '숙련자 (2년 이상)',
            '전문가 (심화 활용)'
        ]
    },
    {
        id: 'cognitiveStyle',
        label: '선호하는 사고 방식',
        subLabel: '어떤 설명 방식을 좋아하시나요?',
        options: [
            '핵심 요약형',
            '스토리텔링형',
            '논리 분석형',
            '팩트/데이터형',
            '개념 정의형',
            '예시 중심형',
            '직관적 이해형'
        ]
    },
    {
        id: 'toolStack',
        label: '사용 중인 AI 모델',
        subLabel: '주로 쓰는 도구',
        options: [
            'ChatGPT',
            'Gemini',
            'Claude',
            'Perplexity',
            'Local LLM'
        ]
    },
    {
        id: 'outputPreference',
        label: '선호 답변 스타일',
        subLabel: '어떤 형태의 답변을 원하시나요?',
        options: [
            '간결한 핵심만',
            '친절하고 상세하게',
            '코드/예제 위주',
            '깔끔한 문서 형식',
            '표/비교 분석',
            '프레임워크/구조'
        ]
    }
];



export default function Sidebar() {
    const { filters, toggleFilter } = useFilterStore();

    return (
        <MantineProvider theme={theme} forceColorScheme="dark">
            <Box
                component="aside"
                w={280}
                h="100vh"
                style={{
                    borderRight: '1px solid var(--mantine-color-default-border)',
                    backgroundColor: 'var(--mantine-color-body)',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box p="md">
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Title order={3}>YourAI</Title>
                    </Link>
                </Box>

                <ScrollArea style={{ flex: 1 }} type="scroll">
                    <Box px="md" mb="xl">
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                            Categories
                        </Text>
                        <Group gap="xs">
                            {['Social_Issues', 'Philosophy', 'Relationship', 'Career'].map((item) => (
                                <Button
                                    key={item}
                                    variant="subtle"
                                    size="sm"
                                    fullWidth
                                    justify="flex-start"
                                    styles={{ root: { height: 'auto', padding: '8px 12px' } }}
                                >
                                    # {item}
                                </Button>
                            ))}
                        </Group>
                    </Box>

                    <Box px="md">
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                            Filters
                        </Text>
                        <Accordion
                            multiple
                            defaultValue={FACET_GROUPS.map(g => g.id)}
                            variant="default"
                            chevronPosition="right"
                            styles={{
                                item: { border: 'none' },
                                control: { padding: '8px 0', '&:hover': { backgroundColor: 'transparent' } },
                                content: { padding: '0 0 16px 0' }
                            }}
                        >
                            {FACET_GROUPS.map((group) => {
                                const selectedCount = filters[group.id as FilterCategory].length;

                                return (
                                    <Accordion.Item key={group.id} value={group.id}>
                                        <Accordion.Control>
                                            <Group justify="space-between">
                                                <Text size="sm" fw={500}>{group.label}</Text>
                                                {selectedCount > 0 && (
                                                    <Badge size="xs" circle color="gray">
                                                        {selectedCount}
                                                    </Badge>
                                                )}
                                            </Group>
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Group gap={8}>
                                                {group.options.map((option) => {
                                                    const isSelected = filters[group.id as FilterCategory].includes(option);
                                                    return (
                                                        <Button
                                                            key={option}
                                                            onClick={() => toggleFilter(group.id as FilterCategory, option)}
                                                            variant={isSelected ? 'filled' : 'default'}
                                                            size="xs"
                                                            radius="xl"
                                                            color={isSelected ? 'black' : 'gray'}
                                                            styles={{ root: { height: 'auto', padding: '4px 10px' } }}
                                                        >
                                                            {option}
                                                        </Button>
                                                    );
                                                })}
                                            </Group>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                );
                            })}
                        </Accordion>
                    </Box>
                </ScrollArea>
                <Box p="md" mt="auto">
                    <Text size="xs" c="dimmed">v.1.0.0 (2025-12)</Text>
                </Box>
            </Box>
        </MantineProvider>
    );
}
