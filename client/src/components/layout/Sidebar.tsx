"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import {
    Box,
    Tooltip,
    ActionIcon,
    Stack,
} from '@mantine/core';
import {
    IconHome,
    IconGitCompare,
    IconSparkles,
    IconBooks,
    IconMessageQuestion,
    IconPencil,
    IconSettingsAutomation,
} from '@tabler/icons-react';

interface NavItemProps {
    href: string;
    icon: React.ComponentType<{ size: number; stroke?: number }>;
    label: string;
    isActive: boolean;
}

// NavItem - 투명 배경, 글래스 효과 아이콘
function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
    const router = useRouter();

    return (
        <Tooltip
            label={label}
            position="right"
            withArrow
            offset={16}
            transitionProps={{ transition: 'fade-right', duration: 200 }}
            styles={{
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '10px 14px',
                    borderRadius: 10,
                    backdropFilter: 'blur(8px)',
                }
            }}
        >
            <ActionIcon
                variant="subtle"
                size={48}
                radius="xl"
                onClick={() => router.push(href)}
                style={{
                    color: isActive ? 'var(--accent-color)' : 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: isActive
                        ? 'rgba(224, 184, 97, 0.15)'
                        : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: isActive
                        ? '1px solid rgba(224, 184, 97, 0.3)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.8)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.5)';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                    }
                }}
            >
                <Icon size={22} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const hasHydrated = useAppStore((state) => state._hasHydrated);

    const isActive = (path: string) => pathname === path;

    // Hydration 전 로딩 상태 - 아무것도 렌더링하지 않음
    if (!hasHydrated) {
        return null;
    }

    return (
        <Box
            component="aside"
            style={{
                position: 'fixed',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                zIndex: 1000,
                // 배경 완전 투명
                backgroundColor: 'transparent',
            }}
        >
            {/* 로고/홈 */}
            <Tooltip
                label="YourAI란?"
                position="right"
                withArrow
                offset={16}
                transitionProps={{ transition: 'fade-right', duration: 200 }}
            >
                <ActionIcon
                    variant="filled"
                    size={48}
                    radius="xl"
                    onClick={() => router.push('/introduce')}
                    style={{
                        backgroundColor: 'var(--accent-color)',
                        boxShadow: '0 4px 16px rgba(224, 184, 97, 0.4)',
                        border: 'none',
                        marginBottom: 8,
                    }}
                >
                    <IconSparkles size={22} color="white" />
                </ActionIcon>
            </Tooltip>

            {/* 메인 네비게이션 */}
            <Stack gap={8} align="center">
                <NavItem
                    href="/"
                    icon={IconHome}
                    label="홈"
                    isActive={isActive('/')}
                />
                <NavItem
                    href="/instructions"
                    icon={IconBooks}
                    label="응답 규칙 라이브러리"
                    isActive={isActive('/instructions')}
                />
                <NavItem
                    href="/questions"
                    icon={IconMessageQuestion}
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
                    icon={IconSettingsAutomation}
                    label="나의 AI 만들기"
                    isActive={isActive('/my-ai')}
                />
            </Stack>

            {/* 하단 FAB - 응답 규칙 등록 */}
            <Tooltip
                label="응답 규칙 등록"
                position="right"
                withArrow
                offset={16}
                transitionProps={{ transition: 'fade-right', duration: 200 }}
            >
                <ActionIcon
                    variant="filled"
                    size={48}
                    radius="xl"
                    onClick={() => router.push('/register')}
                    style={{
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        marginTop: 8,
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                    }}
                >
                    <IconPencil size={20} color="white" />
                </ActionIcon>
            </Tooltip>
        </Box>
    );
}
