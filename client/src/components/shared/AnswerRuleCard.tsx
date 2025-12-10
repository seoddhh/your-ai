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
    Tooltip,
    Paper,
    Text,
    ActionIcon,
} from '@mantine/core';
import {
    IconCopy,
    IconChevronRight,
    IconTrash,
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
 * 재사용 가능한 응답 규칙 카드 컴포넌트
 * Home과 Library 페이지 모두에서 사용
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

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(
            `[사용자 프로필]\n${instruction.userProfile}\n\n[응답 스타일]\n${instruction.responsePreference}`
        );
    };

    const cardContent = (
        <Card
            p={isCompact ? "md" : "lg"}
            radius="lg"
            withBorder
            style={{
                cursor: onToggle ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                borderColor: isExpanded ? '#E0B861' : '#e5e5e5',
                boxShadow: isExpanded ? '0 8px 24px rgba(224, 184, 97, 0.15)' : undefined,
                height: isCompact ? 'auto' : undefined,
            }}
            onClick={onToggle}
        >
            {/* 헤더 */}
            <Group justify="space-between" mb="sm">
                <Group gap="sm">
                    <div>
                        <Group gap="xs">
                            <Text fw={700} size={isCompact ? "sm" : undefined}>
                                {instruction.name}
                            </Text>
                            {isUserOwned && (
                                <Badge color="yellow" variant="light" size="xs">내가 등록</Badge>
                            )}
                        </Group>
                        <Text size="xs" c="dimmed">{instruction.targetRole}</Text>
                    </div>
                </Group>
                <Group gap="xs">
                    <Badge
                        variant="light"
                        size={isCompact ? "xs" : "sm"}
                        style={{
                            backgroundColor: `${domainMeta?.color || '#ccc'}20`,
                            color: domainMeta?.color || '#666'
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
            <Text size="sm" c="dimmed" mb="md" lineClamp={isExpanded ? undefined : 2}>
                {instruction.description}
            </Text>

            {/* 태그 */}
            {!isCompact && (
                <Group gap="xs" mb="md">
                    {(instruction.tags || []).slice(0, 3).map((tag) => (
                        <Badge key={tag} size="sm" variant="outline" color="gray">
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
                        transition={{ duration: 0.3 }}
                    >
                        <Divider my="md" />

                        {/* User Profile */}
                        <Box mb="md">
                            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                사용자 프로필
                            </Text>
                            <Paper
                                p="sm"
                                radius="md"
                                style={{
                                    backgroundColor: 'var(--gold-light)',
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {instruction.userProfile}
                            </Paper>
                        </Box>

                        {/* Response Preference */}
                        <Box mb="md">
                            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                                응답 스타일
                            </Text>
                            <Paper
                                p="sm"
                                radius="md"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {instruction.responsePreference}
                            </Paper>
                        </Box>

                        {/* 액션 버튼 */}
                        <Group mt="lg">
                            <Tooltip label="클립보드에 복사">
                                <Button
                                    variant="light"
                                    color="gray"
                                    leftSection={<IconCopy size={16} />}
                                    onClick={handleCopy}
                                >
                                    복사하기
                                </Button>
                            </Tooltip>
                            <Link href={`/compare?instruction=${instruction.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button
                                    variant="filled"
                                    color="yellow"
                                    rightSection={<IconChevronRight size={16} />}
                                    styles={{ root: { backgroundColor: '#E0B861' } }}
                                >
                                    비교하기
                                </Button>
                            </Link>
                        </Group>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 푸터 */}
            <Group justify="space-between" mt="md">
                <Text size="xs" c="dimmed">
                    {instruction.popularity}명 사용
                </Text>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
            >
                {cardContent}
            </motion.div>
        );
    }

    return cardContent;
}
