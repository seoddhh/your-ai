"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Card,
    Group,
    Badge,
    Button,
    Box,
    Divider,
    Paper,
    Text,
    ActionIcon,
} from '@mantine/core';
import {
    IconTrash,
    IconEye,
    IconUsers,
} from '@tabler/icons-react';
import { CustomInstruction, DOMAIN_META } from '@/data/customInstructions';
import { useAppStore } from '@/store/useAppStore';

export interface AnswerRuleCardProps {
    instruction: CustomInstruction;
    index?: number;
    isExpanded?: boolean;
    onToggle?: () => void;
    isUserOwned?: boolean;
    isCompact?: boolean;
    showAnimation?: boolean;
}

/**
 * 응답 규칙 카드 - Professional B2B Style
 * 1. 제목 (가장 강조)
 * 2. 한 줄 설명
 * 3. 태그 (pill)
 * 4. 메타 정보 (사용 수, 작성자)
 * 5. 확장 시: 프로필 + 액션
 */
export default function AnswerRuleCard({
    instruction,
    index = 0,
    isExpanded = false,
    onToggle,
    isUserOwned = false,
    isCompact = false,
    showAnimation = true,
}: AnswerRuleCardProps) {
    const domainMeta = DOMAIN_META[instruction.domain];
    const deleteUserInstruction = useAppStore((state) => state.deleteUserInstruction);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('이 응답 규칙을 삭제하시겠습니까?')) {
            deleteUserInstruction(instruction.id);
        }
    };

    const cardContent = (
        <Card
            p="lg"
            radius="lg"
            withBorder
            style={{
                cursor: onToggle ? 'pointer' : 'default',
                transition: 'all var(--motion-base)',
                borderColor: isExpanded ? 'var(--accent-color)' : 'var(--border-color)',
                backgroundColor: 'var(--card-bg)',
                boxShadow: isExpanded
                    ? '0 4px 12px rgba(0,0,0,0.08)'
                    : '0 1px 3px rgba(0,0,0,0.04)',
            }}
            onClick={onToggle}
            styles={{
                root: {
                    '&:hover': {
                        transform: onToggle ? 'translateY(-2px)' : 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        borderColor: 'var(--accent-color)',
                    }
                }
            }}
        >
            {/* 헤더: 제목 + 도메인 배지 */}
            <Group justify="space-between" align="flex-start" mb="sm">
                <Box style={{ flex: 1 }}>
                    <Group gap="xs" mb={4}>
                        <Text fw={700} size="md" lineClamp={1}>
                            {instruction.name}
                        </Text>
                        {isUserOwned && (
                            <Badge color="yellow" variant="light" size="xs">
                                내가 등록
                            </Badge>
                        )}
                    </Group>
                    <Text size="xs" c="dimmed">{instruction.targetRole}</Text>
                </Box>
                <Group gap="xs">
                    <Badge
                        variant="light"
                        size="sm"
                        radius="md"
                        style={{
                            backgroundColor: `${domainMeta?.color || '#ccc'}12`,
                            color: domainMeta?.color || '#666',
                            fontWeight: 500,
                        }}
                    >
                        {domainMeta?.label || instruction.domain}
                    </Badge>
                    {isUserOwned && (
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            size="sm"
                            onClick={handleDelete}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    )}
                </Group>
            </Group>

            {/* 설명 */}
            <Text
                size="sm"
                c="dimmed"
                lineClamp={isExpanded ? undefined : 2}
                mb="sm"
                style={{ lineHeight: 1.6 }}
            >
                {instruction.description}
            </Text>

            {/* 태그 */}
            {!isCompact && (instruction.tags?.length ?? 0) > 0 && (
                <Group gap={6} mb="sm">
                    {(instruction.tags || []).slice(0, 3).map((tag) => (
                        <Badge
                            key={tag}
                            size="sm"
                            variant="outline"
                            color="gray"
                            radius="md"
                            style={{
                                fontWeight: 400,
                                textTransform: 'none',
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </Group>
            )}

            {/* 확장된 내용 */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Divider my="md" color="var(--border-color)" />

                        {/* User Profile */}
                        <Box mb="md">
                            <Text size="xs" fw={600} c="dimmed" mb="xs">
                                사용자 프로필
                            </Text>
                            <Paper
                                p="sm"
                                radius="md"
                                style={{
                                    backgroundColor: 'var(--bg-color)',
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    whiteSpace: 'pre-wrap',
                                    border: '1px solid var(--border-color)',
                                }}
                            >
                                {instruction.userProfile}
                            </Paper>
                        </Box>

                        {/* 액션 버튼 */}
                        <Group mt="md" gap="xs">
                            <Link href={`/rule/${instruction.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button
                                    size="xs"
                                    variant="filled"
                                    styles={{ root: { backgroundColor: 'var(--accent-color)' } }}
                                    rightSection={<IconEye size={14} />}
                                >
                                    상세보기
                                </Button>
                            </Link>
                            <Link href={`/compare?instruction=${instruction.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button
                                    size="xs"
                                    variant="light"
                                    color="gray"
                                >
                                    비교하기
                                </Button>
                            </Link>
                        </Group>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 푸터: 메타 정보 */}
            <Group
                justify="space-between"
                mt="md"
                pt="sm"
                style={{ borderTop: '1px solid var(--border-color)' }}
            >
                <Group gap={6}>
                    <IconUsers size={14} color="var(--text-secondary)" />
                    <Text size="xs" c="dimmed">
                        {instruction.popularity.toLocaleString()}명 사용
                    </Text>
                </Group>
                {instruction.author && (
                    <Text size="xs" c="dimmed">
                        by {instruction.author}
                    </Text>
                )}
            </Group>
        </Card>
    );

    if (showAnimation) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
            >
                {cardContent}
            </motion.div>
        );
    }

    return cardContent;
}
