"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { Box, Group, Title, Text, Button } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

export interface AnswerRuleListSectionProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    linkHref?: string;
    linkText?: string;
    children: ReactNode;
    noPadding?: boolean;
}

/**
 * 응답 규칙 섹션 래퍼 컴포넌트
 * 제목, 부제목, "더 보기" 링크를 포함하는 섹션 레이아웃
 */
export default function AnswerRuleListSection({
    title,
    subtitle,
    icon,
    linkHref,
    linkText = '더 보기',
    children,
    noPadding = false,
}: AnswerRuleListSectionProps) {
    return (
        <Box mb="xl" px={noPadding ? 0 : undefined}>
            {/* 헤더 */}
            <Group justify="space-between" align="center" mb="md">
                <Group gap="sm">
                    {icon}
                    <div>
                        <Title order={5}>{title}</Title>
                        {subtitle && (
                            <Text size="xs" c="dimmed">{subtitle}</Text>
                        )}
                    </div>
                </Group>

                {linkHref && (
                    <Link href={linkHref}>
                        <Button
                            variant="subtle"
                            color="gray"
                            size="xs"
                            rightSection={<IconChevronRight size={14} />}
                        >
                            {linkText}
                        </Button>
                    </Link>
                )}
            </Group>

            {/* 콘텐츠 */}
            {children}
        </Box>
    );
}
