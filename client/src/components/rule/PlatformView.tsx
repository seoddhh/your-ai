"use client";

import {
    Paper,
    Text,
    Group,
    Box,
    CopyButton,
    Button,
    Tooltip,
    Divider,
} from '@mantine/core';
import { IconCopy, IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Platform,
    PLATFORM_CONFIGS,
    transformForPlatform
} from '@/utils/platformTransformers';

interface PlatformViewProps {
    responsePreference: string;
    platform: Platform;
}

/**
 * 플랫폼별 변환된 응답 스타일 뷰
 * - 선택된 플랫폼에 맞게 변환된 내용 표시
 * - 복사 버튼 및 붙여넣기 안내 포함
 */
export function PlatformView({ responsePreference, platform }: PlatformViewProps) {
    const config = PLATFORM_CONFIGS[platform];
    const transformedContent = transformForPlatform(responsePreference, platform);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={platform}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {/* 변환된 응답 스타일 내용 */}
                <Paper
                    p="lg"
                    radius="md"
                    style={{
                        backgroundColor: config.bgColor,
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.8,
                        borderLeft: `3px solid ${config.color}`,
                    }}
                >
                    <Text size="sm">{transformedContent}</Text>
                </Paper>

                {/* 하단 안내 및 복사 영역 */}
                <Box mt="md">
                    <Divider mb="md" />

                    {/* 변환 설명 */}
                    <Group gap="xs" mb="md">
                        <IconInfoCircle size={14} color={config.color} />
                        <Text size="xs" c="dimmed">
                            {config.description}
                        </Text>
                    </Group>

                    {/* 복사 버튼 및 붙여넣기 안내 */}
                    <Paper
                        p="md"
                        radius="md"
                        withBorder
                        style={{
                            borderColor: '#e5e5e5',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <Group justify="space-between" align="center">
                            <Box>
                                <Text size="sm" fw={500} mb={4}>
                                    📋 {config.name}용 응답 스타일
                                </Text>
                                <Text size="xs" c="dimmed">
                                    💡 {config.pasteGuide}
                                </Text>
                            </Box>
                            <CopyButton value={transformedContent}>
                                {({ copied, copy }) => (
                                    <Tooltip
                                        label={copied ? '복사됨!' : '클립보드에 복사'}
                                        position="left"
                                    >
                                        <Button
                                            variant={copied ? 'filled' : 'light'}
                                            color={copied ? 'green' : 'gray'}
                                            size="sm"
                                            leftSection={
                                                copied
                                                    ? <IconCheck size={16} />
                                                    : <IconCopy size={16} />
                                            }
                                            onClick={copy}
                                            styles={{
                                                root: {
                                                    transition: 'all 0.2s ease',
                                                }
                                            }}
                                        >
                                            {copied ? '복사됨!' : '복사하기'}
                                        </Button>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>
                    </Paper>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
}
