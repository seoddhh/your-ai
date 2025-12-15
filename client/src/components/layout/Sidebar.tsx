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
    IconBooks,
    IconMessageQuestion
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

    const content = (
        <Box
            component="button"
            onClick={() => {
                if (onClick) onClick();
                router.push(href);
            }}
            mb="xs"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                height: 48,
                padding: '0 12px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                color: isActive ? '#fff' : 'var(--sidebar-text)',
                transition: 'background-color var(--motion-fast)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-lighter)';
                    e.currentTarget.style.color = '#fff';
                }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--sidebar-text)';
                }
            }}
        >
            <Box style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18 }}>
                <Icon size={18} />
            </Box>
            <Text
                size="sm"
                fw={500}
                style={{
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'opacity var(--motion-fast)',
                    overflow: 'hidden',
                }}
            >
                {label}
            </Text>
        </Box>
    );

    if (isCollapsed) {
        return (
            <Tooltip label={label} position="right" withArrow>
                {content}
            </Tooltip>
        );
    }

    return content;
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
            h="100vh"
            style={{
                width: isCollapsed ? 60 : 276,
                minWidth: isCollapsed ? 60 : 276,
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--sidebar-bg)',
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'width var(--motion-base), min-width var(--motion-base)',
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
                                style={{ backgroundColor: 'var(--accent-color)' }}
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
                        icon={IconMessageQuestion}
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

