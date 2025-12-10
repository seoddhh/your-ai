"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import {
    Box,
    Button,
    Group,
    ScrollArea,
    Text,
    Title,
    Divider,
    ThemeIcon,
    Loader,
    Tooltip,
    ActionIcon
} from '@mantine/core';
import {
    IconHome,
    IconMessageCircle,
    IconGitCompare,
    IconSparkles,
    IconLogout,
    IconPlus,
    IconChevronLeft,
    IconChevronRight,
    IconBooks
} from '@tabler/icons-react';


// NavItem 컴포넌트 - 사이드바 상태에 따라 축소/확장
function NavItem({
    href,
    icon: Icon,
    label,
    isActive,
    isCollapsed,
    onClick
}: {
    href: string;
    icon: React.ComponentType<{ size: number }>;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
    onClick?: () => void;
}) {
    const router = useRouter();

    const button = (
        <Button
            fullWidth={!isCollapsed}
            variant={isActive ? 'filled' : 'subtle'}
            color={isActive ? 'yellow' : 'gray'}
            justify={isCollapsed ? 'center' : 'flex-start'}
            leftSection={!isCollapsed ? <Icon size={18} /> : undefined}
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
                    width: isCollapsed ? 40 : '100%',
                    minWidth: isCollapsed ? 40 : undefined,
                    padding: isCollapsed ? 0 : undefined,
                    '&:hover': {
                        backgroundColor: isActive ? '#c9a254' : 'rgba(255,255,255,0.08)'
                    }
                }
            }}
        >
            {isCollapsed ? <Icon size={18} /> : label}
        </Button>
    );

    if (isCollapsed) {
        return (
            <Tooltip label={label} position="right" withArrow>
                {button}
            </Tooltip>
        );
    }

    return button;
}

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);
    const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
    const toggleSidebar = useAppStore((state) => state.toggleSidebar);
    const hasHydrated = useAppStore((state) => state._hasHydrated);

    const isActive = (path: string) => pathname === path;
    const isCollapsed = !isSidebarOpen;

    // Hydration 전 로딩 상태 - 열려있는 상태로 표시하여 깜빡임 방지
    if (!hasHydrated) {
        return (
            <Box
                component="aside"
                w={276}
                h="100vh"
                style={{
                    borderRight: '1px solid var(--border-color)',
                    backgroundColor: 'var(--sidebar-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Loader color="yellow" size="sm" />
            </Box>
        );
    }


    return (
        <Box
            component="aside"
            w={isCollapsed ? 60 : 276}
            h="100vh"
            style={{
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--sidebar-bg)',
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                flexShrink: 0,
                minWidth: isCollapsed ? 60 : 276,
            }}
        >
            {/* 로고 영역 */}
            <Box p={isCollapsed ? 'sm' : 'lg'} pb="md">
                <Group justify="space-between" align="center">
                    <Box
                        style={{ cursor: 'pointer', display: isCollapsed ? 'none' : 'block' }}
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

                    {/* 토글 버튼 */}
                    <Tooltip label={isCollapsed ? '사이드바 열기' : '사이드바 닫기'} position="right">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={toggleSidebar}
                            size="lg"
                            style={{
                                margin: isCollapsed ? '0 auto' : undefined,
                            }}
                        >
                            {isCollapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
                        </ActionIcon>
                    </Tooltip>
                </Group>

                {!isCollapsed && (
                    <Text size="xs" c="dimmed" mt="xs">
                        Custom Instructions Hub
                    </Text>
                )}
            </Box>

            <Divider color="dark.5" />

            <ScrollArea style={{ flex: 1 }} type="scroll" p={isCollapsed ? 'xs' : 'md'}>
                {/* 메인 네비게이션 */}
                <Box mb="xl">
                    {!isCollapsed && (
                        <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs" px="sm">
                            메뉴
                        </Text>
                    )}

                    <NavItem
                        href="/"
                        icon={IconHome}
                        label="홈"
                        isActive={isActive('/')}
                        isCollapsed={isCollapsed}
                        onClick={() => setHasSeenLanding(true)}
                    />

                    {/* 응답 규칙 등록 버튼 - 홈 아래에 추가 */}
                    <NavItem
                        href="/register"
                        icon={IconPlus}
                        label="응답 규칙 등록"
                        isActive={isActive('/register')}
                        isCollapsed={isCollapsed}
                    />

                    {/* 응답 규칙 라이브러리 */}
                    <NavItem
                        href="/instructions"
                        icon={IconBooks}
                        label="응답 규칙 라이브러리"
                        isActive={isActive('/instructions')}
                        isCollapsed={isCollapsed}
                    />

                    <NavItem
                        href="/questions"
                        icon={IconMessageCircle}
                        label="질문 목록"
                        isActive={isActive('/questions')}
                        isCollapsed={isCollapsed}
                    />

                    <NavItem
                        href="/compare"
                        icon={IconGitCompare}
                        label="응답 규칙 비교"
                        isActive={isActive('/compare')}
                        isCollapsed={isCollapsed}
                    />

                    <NavItem
                        href="/my-ai"
                        icon={IconSparkles}
                        label="나의 AI 만들기"
                        isActive={isActive('/my-ai')}
                        isCollapsed={isCollapsed}
                    />
                </Box>



            </ScrollArea>

            {/* 하단 영역 */}
            <Box p={isCollapsed ? 'xs' : 'md'} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {isCollapsed ? (
                    <Tooltip label="처음으로" position="right">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => setHasSeenLanding(false)}
                            style={{ margin: '0 auto', display: 'block' }}
                        >
                            <IconLogout size={18} />
                        </ActionIcon>
                    </Tooltip>
                ) : (
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
                )}
            </Box>
        </Box>
    );
}

