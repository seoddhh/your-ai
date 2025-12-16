"use client";

import React, { useState } from 'react';
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
} from '@mantine/core';
import {
    IconHome,
    IconGitCompare,
    IconSparkles,
    IconLogout,
    IconPlus,
    IconBooks,
    IconMessageQuestion
} from '@tabler/icons-react';


// NavItem - hover 시 라벨 표시
function NavItem({
    href,
    icon: Icon,
    label,
    isActive,
    isHovered,
    onClick
}: {
    href: string;
    icon: React.ComponentType<{ size: number }>;
    label: string;
    isActive: boolean;
    isHovered: boolean;
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
                height: 44,
                padding: '0 12px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#fff';
                }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }
            }}
        >
            <Box style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20 }}>
                <Icon size={20} />
            </Box>
            <Text
                size="sm"
                fw={500}
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    overflow: 'hidden',
                }}
            >
                {label}
            </Text>
        </Box>
    );

    // 축소 상태에서만 툴팁 표시
    if (!isHovered) {
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
    const hasHydrated = useAppStore((state) => state._hasHydrated);

    // Hover 상태 관리
    const [isHovered, setIsHovered] = useState(false);

    const isActive = (path: string) => pathname === path;

    // 사이드바 너비 계산
    const sidebarWidth = isHovered ? 220 : 60;

    // Hydration 전 로딩 상태
    if (!hasHydrated) {
        return (
            <Box
                component="aside"
                w={60}
                h="100vh"
                style={{
                    backgroundColor: 'rgba(42, 42, 40, 0.95)',
                    backdropFilter: 'blur(16px)',
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: sidebarWidth,
                minWidth: sidebarWidth,
                // Glassmorphism 효과
                backgroundColor: 'rgba(42, 42, 40, 0.92)',
                backdropFilter: 'blur(16px)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'width 0.25s ease, min-width 0.25s ease',
                zIndex: 100,
            }}
        >
            {/* 로고 영역 */}
            <Box p="md" pb="sm">
                <Box
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        overflow: 'hidden',
                    }}
                    onClick={() => {
                        setHasSeenLanding(true);
                        router.push('/');
                    }}
                >
                    <ThemeIcon
                        size={32}
                        radius="md"
                        style={{ backgroundColor: 'var(--accent-color)', flexShrink: 0 }}
                    >
                        <IconSparkles size={18} color="white" />
                    </ThemeIcon>
                    <Title
                        order={5}
                        c="white"
                        style={{
                            fontFamily: 'var(--font-en)',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                            transition: 'opacity 0.2s ease, transform 0.2s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Your AI
                    </Title>
                </Box>
            </Box>

            <Divider color="rgba(255,255,255,0.08)" />

            <ScrollArea style={{ flex: 1 }} type="scroll" p="sm">
                {/* 메인 네비게이션 */}
                <Box mb="xl">
                    {isHovered && (
                        <Text
                            size="xs"
                            fw={600}
                            c="dimmed"
                            tt="uppercase"
                            mb="xs"
                            px="xs"
                            style={{
                                opacity: 0.6,
                                letterSpacing: '0.5px',
                            }}
                        >
                            메뉴
                        </Text>
                    )}

                    <NavItem
                        href="/"
                        icon={IconHome}
                        label="홈"
                        isActive={isActive('/')}
                        isHovered={isHovered}
                        onClick={() => setHasSeenLanding(true)}
                    />

                    <NavItem
                        href="/register"
                        icon={IconPlus}
                        label="응답 규칙 등록"
                        isActive={isActive('/register')}
                        isHovered={isHovered}
                    />

                    <NavItem
                        href="/instructions"
                        icon={IconBooks}
                        label="응답 규칙 라이브러리"
                        isActive={isActive('/instructions')}
                        isHovered={isHovered}
                    />

                    <NavItem
                        href="/questions"
                        icon={IconMessageQuestion}
                        label="질문 목록"
                        isActive={isActive('/questions')}
                        isHovered={isHovered}
                    />

                    <NavItem
                        href="/compare"
                        icon={IconGitCompare}
                        label="응답 규칙 비교"
                        isActive={isActive('/compare')}
                        isHovered={isHovered}
                    />

                    <NavItem
                        href="/my-ai"
                        icon={IconSparkles}
                        label="나의 AI 만들기"
                        isActive={isActive('/my-ai')}
                        isHovered={isHovered}
                    />
                </Box>
            </ScrollArea>

            {/* 하단 영역 */}
            <Box p="sm" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {isHovered ? (
                    <Group justify="space-between" align="center">
                        <Text size="xs" c="dimmed" style={{ opacity: 0.6 }}>v1.0.0</Text>
                        <Button
                            variant="subtle"
                            size="xs"
                            color="gray"
                            leftSection={<IconLogout size={14} />}
                            onClick={() => setHasSeenLanding(false)}
                            styles={{
                                root: { color: 'rgba(255,255,255,0.6)' }
                            }}
                        >
                            처음으로
                        </Button>
                    </Group>
                ) : (
                    <Tooltip label="처음으로" position="right">
                        <Box
                            component="button"
                            onClick={() => setHasSeenLanding(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: 36,
                                border: 'none',
                                borderRadius: 8,
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                color: 'rgba(255,255,255,0.5)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <IconLogout size={18} />
                        </Box>
                    </Tooltip>
                )}
            </Box>
        </Box>
    );
}
