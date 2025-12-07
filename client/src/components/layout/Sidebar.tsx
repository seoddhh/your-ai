"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import {
    Accordion,
    Box,
    Button,
    Group,
    ScrollArea,
    Text,
    Title,
    Divider,
    ThemeIcon,
    Loader
} from '@mantine/core';
import {
    IconHome,
    IconMessageCircle,
    IconGitCompare,
    IconSparkles,
    IconLogout
} from '@tabler/icons-react';

// 도메인별 응답 규칙 카테고리
const DOMAIN_CATEGORIES = [
    { id: 'Tech', label: '개발/기술', emoji: '💻' },
    { id: 'Creative', label: '디자인/예술', emoji: '🎨' },
    { id: 'Business', label: '비즈니스', emoji: '📊' },
    { id: 'Academia', label: '학술/연구', emoji: '📚' },
    { id: 'Healthcare', label: '의료/상담', emoji: '🏥' },
    { id: 'Education', label: '교육/학습', emoji: '🎓' },
    { id: 'Legal', label: '법률', emoji: '⚖️' },
    { id: 'Finance', label: '금융', emoji: '💰' },
];

// NavItem 컴포넌트 - Link 중첩 문제 해결
function NavItem({
    href,
    icon: Icon,
    label,
    isActive,
    onClick
}: {
    href: string;
    icon: React.ComponentType<{ size: number }>;
    label: string;
    isActive: boolean;
    onClick?: () => void;
}) {
    const router = useRouter();

    return (
        <Button
            fullWidth
            variant={isActive ? 'filled' : 'subtle'}
            color={isActive ? 'yellow' : 'gray'}
            justify="flex-start"
            leftSection={<Icon size={18} />}
            mb="xs"
            onClick={() => {
                if (onClick) onClick();
                router.push(href);
            }}
            styles={{
                root: {
                    borderRadius: 8,
                    backgroundColor: isActive ? '#E0B861' : 'transparent',
                    color: isActive ? '#fff' : 'var(--sidebar-text)',
                    '&:hover': {
                        backgroundColor: isActive ? '#c9a254' : 'rgba(255,255,255,0.08)'
                    }
                }
            }}
        >
            {label}
        </Button>
    );
}

export default function Sidebar() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isActive = (path: string) => pathname === path;

    // 마운트 전 로딩 상태
    if (!mounted) {
        return (
            <Box
                component="aside"
                w={280}
                h="100vh"
                style={{
                    borderRight: '1px solid var(--border-color)',
                    backgroundColor: 'var(--sidebar-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Loader color="yellow" size="md" />
            </Box>
        );
    }

    return (
        <Box
            component="aside"
            w={280}
            h="100vh"
            style={{
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--sidebar-bg)',
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* 로고 영역 */}
            <Box p="lg" pb="md">
                <Box
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setHasSeenLanding(true);
                        router.push('/');
                    }}
                >
                    <Group gap="xs" align="center">
                        <ThemeIcon
                            size={32}
                            radius="md"
                            style={{ backgroundColor: '#E0B861' }}
                        >
                            <IconSparkles size={18} color="white" />
                        </ThemeIcon>
                        <Title order={4} c="white" style={{ fontFamily: 'var(--font-en)' }}>
                            Your AI
                        </Title>
                    </Group>
                </Box>
                <Text size="xs" c="dimmed" mt="xs">
                    Custom Instructions Hub
                </Text>
            </Box>

            <Divider color="dark.5" />

            <ScrollArea style={{ flex: 1 }} type="scroll" p="md">
                {/* 메인 네비게이션 */}
                <Box mb="xl">
                    <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs" px="sm">
                        메뉴
                    </Text>

                    <NavItem
                        href="/"
                        icon={IconHome}
                        label="홈"
                        isActive={isActive('/')}
                        onClick={() => setHasSeenLanding(true)}
                    />

                    <NavItem
                        href="/questions"
                        icon={IconMessageCircle}
                        label="질문 목록"
                        isActive={isActive('/questions')}
                    />

                    <NavItem
                        href="/compare"
                        icon={IconGitCompare}
                        label="응답 규칙 비교"
                        isActive={isActive('/compare')}
                    />

                    <NavItem
                        href="/my-ai"
                        icon={IconSparkles}
                        label="나의 AI 만들기"
                        isActive={isActive('/my-ai')}
                    />
                </Box>

                {/* 도메인 필터 */}
                <Box mb="xl">
                    <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs" px="sm">
                        도메인별 탐색
                    </Text>

                    <Accordion
                        multiple
                        defaultValue={['domains']}
                        variant="default"
                        chevronPosition="right"
                        styles={{
                            item: {
                                border: 'none',
                                backgroundColor: 'transparent'
                            },
                            control: {
                                padding: '8px 12px',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                                borderRadius: 8
                            },
                            content: { padding: '4px 0 16px 8px' }
                        }}
                    >
                        <Accordion.Item value="domains">
                            <Accordion.Control>
                                <Text size="sm" fw={500} c="white">분야 선택</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Group gap={6}>
                                    {DOMAIN_CATEGORIES.map((domain) => (
                                        <Button
                                            key={domain.id}
                                            variant="default"
                                            size="xs"
                                            radius="xl"
                                            onClick={() => router.push(`/instructions?domain=${domain.id}`)}
                                            styles={{
                                                root: {
                                                    height: 'auto',
                                                    padding: '6px 12px',
                                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                                    borderColor: 'transparent',
                                                    color: 'var(--sidebar-text)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(224, 184, 97, 0.2)',
                                                        borderColor: '#E0B861'
                                                    }
                                                }
                                            }}
                                        >
                                            {domain.emoji} {domain.label}
                                        </Button>
                                    ))}
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Box>

                {/* 빠른 액션 */}
                <Box mb="xl">
                    <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="sm" px="sm">
                        빠른 시작
                    </Text>

                    <Button
                        fullWidth
                        variant="light"
                        color="yellow"
                        leftSection={<IconSparkles size={16} />}
                        onClick={() => router.push('/compare')}
                        styles={{
                            root: {
                                justifyContent: 'flex-start',
                                backgroundColor: 'rgba(224, 184, 97, 0.15)',
                                '&:hover': {
                                    backgroundColor: 'rgba(224, 184, 97, 0.25)'
                                }
                            }
                        }}
                    >
                        응답 규칙 비교 시작
                    </Button>
                </Box>
            </ScrollArea>

            {/* 하단 영역 */}
            <Box p="md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Group justify="space-between" align="center">
                    <Text size="xs" c="dimmed">v1.0.0</Text>
                    <Button
                        variant="subtle"
                        size="xs"
                        color="gray"
                        leftSection={<IconLogout size={14} />}
                        onClick={() => setHasSeenLanding(false)}
                    >
                        처음으로
                    </Button>
                </Group>
            </Box>
        </Box>
    );
}
