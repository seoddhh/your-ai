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
    Modal,
    TextInput,
    Textarea,
    Select,
} from '@mantine/core';
import {
    IconArrowLeft,
    IconCopy,
    IconCheck,
    IconEye,
    IconUser,
    IconMessage,
    IconEdit,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import {
    getInstructionById,
    DOMAIN_META,
    CustomInstruction,
    Domain,
} from '@/data/customInstructions';
import { useAppStore } from '@/store/useAppStore';

export default function RuleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [instruction, setInstruction] = useState<CustomInstruction | null>(null);
    const [isUserOwned, setIsUserOwned] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    // 사용자 규칙 관련 상태
    const userInstructions = useAppStore((state) => state.userInstructions);
    const updateUserInstruction = useAppStore((state) => state.updateUserInstruction);

    // 수정 폼 상태
    const [editForm, setEditForm] = useState({
        userProfile: '',
        responsePreference: '',
    });

    useEffect(() => {
        setMounted(true);
        // 기본 규칙에서 먼저 검색
        let found = getInstructionById(resolvedParams.id);
        let userOwned = false;

        // 없으면 사용자 규칙에서 검색
        if (!found) {
            found = userInstructions.find(i => i.id === resolvedParams.id);
            if (found) {
                userOwned = true;
            }
        }

        if (found) {
            setInstruction(found);
            setIsUserOwned(userOwned);
            setEditForm({
                userProfile: found.userProfile,
                responsePreference: found.responsePreference,
            });
        }
    }, [resolvedParams.id, userInstructions]);

    const handleSaveEdit = () => {
        if (!instruction || !isUserOwned) return;

        updateUserInstruction(instruction.id, {
            userProfile: editForm.userProfile,
            responsePreference: editForm.responsePreference,
        });

        setEditModalOpen(false);
    };

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
                        <Group gap="md" justify="flex-end">
                            {isUserOwned && (
                                <Button
                                    variant="light"
                                    color="yellow"
                                    leftSection={<IconEdit size={16} />}
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    수정하기
                                </Button>
                            )}
                            <Link href={`/compare?instruction=${instruction.id}`}>
                                <Button
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
                                        variant="light"
                                        color={copied ? 'green' : 'gray'}
                                        leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                        onClick={copy}
                                    >
                                        {copied ? '복사됨!' : '전체 복사하기'}
                                    </Button>
                                )}
                            </CopyButton>
                        </Group>
                    </motion.div>
                </Box>

                {/* 수정 모달 */}
                <Modal
                    opened={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    title={<span style={{ fontWeight: 700 }}>응답 규칙 수정</span>}
                    size="lg"
                >
                    <Stack gap="lg">
                        <div>
                            <Text size="sm" fw={600} mb="xs">사용자 프로필</Text>
                            <Textarea
                                placeholder="사용자 프로필을 입력하세요"
                                minRows={5}
                                autosize
                                value={editForm.userProfile}
                                onChange={(e) => setEditForm({ ...editForm, userProfile: e.target.value })}
                                styles={{
                                    input: {
                                        backgroundColor: '#fefcf8',
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <Text size="sm" fw={600} mb="xs">응답 스타일</Text>
                            <Textarea
                                placeholder="응답 스타일을 입력하세요"
                                minRows={5}
                                autosize
                                value={editForm.responsePreference}
                                onChange={(e) => setEditForm({ ...editForm, responsePreference: e.target.value })}
                                styles={{
                                    input: {
                                        backgroundColor: '#f8f9fa',
                                    }
                                }}
                            />
                        </div>
                        <Group justify="flex-end" mt="md">
                            <Button variant="light" color="gray" onClick={() => setEditModalOpen(false)}>
                                취소
                            </Button>
                            <Button
                                variant="filled"
                                color="yellow"
                                styles={{ root: { backgroundColor: '#E0B861' } }}
                                onClick={handleSaveEdit}
                            >
                                저장하기
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </main>
        </div>
    );
}
