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
 * 응답 규칙 카드 - 고정 정보 위계
 * 1. 제목 (가장 강조)
 * 2. 한 줄 설명
 * 3. 태그 (pill)
 * 4. 메타 정보 (사용 수, 작성자)
 * 5. 액션 (저장/비교/상세보기)
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
            radius="md"
            withBorder
            style={{
                cursor: onToggle ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                borderColor: isExpanded ? 'var(--accent-color)' : '#e8e8e8',
                backgroundColor: isExpanded ? '#fffdf8' : '#fff',
            }}
            onClick={onToggle}
        >
            {/* 1. 제목 + 도메인 배지 */}
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
                        style={{
                            backgroundColor: `${domainMeta?.color || '#ccc'}15`,
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

            {/* 2. 한 줄 설명 */}
            <Text
                size="sm"
                c="dimmed"
                lineClamp={isExpanded ? undefined : 2}
                mb="sm"
                style={{ lineHeight: 1.6 }}
            >
                {instruction.description}
            </Text>

            {/* 3. 태그 */}
            {!isCompact && (instruction.tags?.length ?? 0) > 0 && (
                <Group gap={6} mb="sm">
                    {(instruction.tags || []).slice(0, 3).map((tag) => (
                        <Badge
                            key={tag}
                            size="sm"
                            variant="outline"
                            color="gray"
                            radius="sm"
                            style={{
                                fontWeight: 400,
                                textTransform: 'none',
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
                        <Divider my="md" />

                        {/* User Profile */}
                        <Box mb="md">
                            <Text size="xs" fw={600} c="dimmed" mb="xs">
                                사용자 프로필
                            </Text>
                            <Paper
                                p="sm"
                                radius="sm"
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

                        {/* 5. 액션 버튼 */}
                        <Group mt="md" gap="xs">
                            <Link href={`/rule/${instruction.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button
                                    size="xs"
                                    variant="filled"
                                    color="yellow"
                                    styles={{ root: { backgroundColor: '#E0B861' } }}
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

            {/* 4. 메타 정보 (푸터) */}
            <Group justify="space-between" mt="md" pt="sm" style={{ borderTop: '1px solid #f0f0f0' }}>
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
