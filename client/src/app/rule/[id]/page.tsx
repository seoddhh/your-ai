"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Box,
    Container,
    Title,
    Text,
    Paper,
    Group,
    Badge,
    Button,
    Stack,
    Loader,
    Divider,
    CopyButton,
    ActionIcon,
    Tooltip,
} from '@mantine/core';
import {
    IconArrowLeft,
    IconCopy,
    IconCheck,
    IconEye,
    IconUser,
    IconMessage,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import {
    getInstructionById,
    DOMAIN_META,
    CustomInstruction,
} from '@/data/customInstructions';

export default function RuleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [instruction, setInstruction] = useState<CustomInstruction | null>(null);

    useEffect(() => {
        setMounted(true);
        const found = getInstructionById(resolvedParams.id);
        if (found) {
            setInstruction(found);
        }
    }, [resolvedParams.id]);

    if (!mounted) {
        return (
            <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    if (!instruction) {
        return (
            <div className="app-container">
                <Sidebar />
                <main className="main-content" style={{ backgroundColor: '#fff' }}>
                    <Box px={48} py="xl">
                        <Title order={3} c="dimmed">응답 규칙을 찾을 수 없습니다</Title>
                        <Link href="/">
                            <Button mt="lg" variant="light">홈으로 돌아가기</Button>
                        </Link>
                    </Box>
                </main>
            </div>
        );
    }

    const domainMeta = DOMAIN_META[instruction.domain];

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ backgroundColor: '#fff' }}>
                {/* 헤더 */}
                <Box
                    py="lg"
                    px={48}
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group gap="md">
                        <Button
                            variant="subtle"
                            color="gray"
                            leftSection={<IconArrowLeft size={16} />}
                            onClick={() => router.back()}
                        >
                            뒤로 가기
                        </Button>
                    </Group>
                </Box>

                {/* 콘텐츠 */}
                <Box px={48} py="xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* 기본 정보 카드 */}
                        <Paper
                            p="xl"
                            radius="lg"
                            withBorder
                            mb="xl"
                            style={{
                                borderColor: '#E0B861',
                                borderWidth: 2,
                            }}
                        >
                            <Group justify="space-between" align="flex-start" mb="lg">
                                <div>
                                    <Group gap="sm" mb="xs">
                                        <Title order={2}>{instruction.name}</Title>
                                        <Badge
                                            size="lg"
                                            variant="light"
                                            style={{
                                                backgroundColor: `${domainMeta?.color || '#ccc'}15`,
                                                color: domainMeta?.color || '#666',
                                            }}
                                        >
                                            {domainMeta?.label || instruction.domain}
                                        </Badge>
                                    </Group>
                                    <Text c="dimmed" size="sm">{instruction.targetRole}</Text>
                                </div>
                                <Group gap="xs">
                                    <IconEye size={16} color="#999" />
                                    <Text size="sm" c="dimmed">{instruction.popularity}명 사용</Text>
                                </Group>
                            </Group>

                            <Text size="md" mb="lg">
                                {instruction.description}
                            </Text>

                            {/* 태그 */}
                            <Group gap="xs" mb="lg">
                                {instruction.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        color="gray"
                                        radius="sm"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </Group>

                            {instruction.author && (
                                <Text size="sm" c="dimmed">
                                    by {instruction.author}
                                </Text>
                            )}
                        </Paper>

                        {/* 사용자 프로필 섹션 */}
                        <Paper p="xl" radius="lg" withBorder mb="xl">
                            <Group gap="xs" mb="md">
                                <IconUser size={20} color="#E0B861" />
                                <Title order={4}>사용자 프로필</Title>
                            </Group>
                            <Paper
                                p="lg"
                                radius="md"
                                style={{
                                    backgroundColor: 'var(--gold-light)',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.8,
                                }}
                            >
                                <Text size="sm">{instruction.userProfile}</Text>
                            </Paper>
                        </Paper>

                        {/* 응답 스타일 섹션 */}
                        <Paper p="xl" radius="lg" withBorder mb="xl">
                            <Group justify="space-between" mb="md">
                                <Group gap="xs">
                                    <IconMessage size={20} color="#6366f1" />
                                    <Title order={4}>응답 스타일</Title>
                                </Group>
                                <CopyButton value={instruction.responsePreference}>
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? '복사됨!' : '응답 스타일 복사'}>
                                            <ActionIcon
                                                variant="light"
                                                color={copied ? 'green' : 'gray'}
                                                onClick={copy}
                                            >
                                                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>
                            </Group>
                            <Paper
                                p="lg"
                                radius="md"
                                style={{
                                    backgroundColor: '#f8f9ff',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.8,
                                }}
                            >
                                <Text size="sm">{instruction.responsePreference}</Text>
                            </Paper>
                        </Paper>

                        {/* 액션 버튼 */}
                        <Group gap="md">
                            <Link href={`/compare?instruction=${instruction.id}`}>
                                <Button
                                    size="lg"
                                    variant="filled"
                                    color="yellow"
                                    styles={{ root: { backgroundColor: '#E0B861' } }}
                                >
                                    이 규칙으로 비교하기
                                </Button>
                            </Link>
                            <CopyButton
                                value={`[사용자 프로필]\n${instruction.userProfile}\n\n[응답 스타일]\n${instruction.responsePreference}`}
                            >
                                {({ copied, copy }) => (
                                    <Button
                                        size="lg"
                                        variant="light"
                                        color={copied ? 'green' : 'gray'}
                                        leftSection={copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                                        onClick={copy}
                                    >
                                        {copied ? '복사됨!' : '전체 복사하기'}
                                    </Button>
                                )}
                            </CopyButton>
                        </Group>
                    </motion.div>
                </Box>
            </main>
        </div>
    );
}
