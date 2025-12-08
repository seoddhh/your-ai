"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Container,
    Title,
    Text,
    TextInput,
    Textarea,
    Select,
    Button,
    Group,
    Paper,
    Stack,
    Divider,
    Badge
} from '@mantine/core';
import { IconArrowLeft, IconPlus } from '@tabler/icons-react';
import { useAppStore } from '@/store/useAppStore';
import { Domain, DOMAIN_META } from '@/data/customInstructions';
import Sidebar from '@/components/layout/Sidebar';

// 도메인 옵션 생성
const DOMAIN_OPTIONS = Object.entries(DOMAIN_META).map(([key, value]) => ({
    value: key,
    label: `${value.emoji} ${value.label}`
}));

// 이모지 옵션
const EMOJI_OPTIONS = [
    { value: '👨‍💻', label: '👨‍💻 개발자' },
    { value: '🎨', label: '🎨 디자이너' },
    { value: '📊', label: '📊 분석가' },
    { value: '📚', label: '📚 연구원' },
    { value: '👨‍🏫', label: '👨‍🏫 교육자' },
    { value: '🏥', label: '🏥 의료인' },
    { value: '⚖️', label: '⚖️ 법률가' },
    { value: '💰', label: '💰 금융인' },
    { value: '🚀', label: '🚀 스타트업' },
    { value: '🎬', label: '🎬 크리에이터' },
    { value: '🔬', label: '🔬 과학자' },
    { value: '🗺️', label: '🗺️ PM' },
];

export default function RegisterPage() {
    const router = useRouter();
    const addUserInstruction = useAppStore((state) => state.addUserInstruction);
    const setHasSeenLanding = useAppStore((state) => state.setHasSeenLanding);

    // 폼 상태
    const [name, setName] = useState('');
    const [domain, setDomain] = useState<string | null>(null);
    const [targetRole, setTargetRole] = useState('');
    const [description, setDescription] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [responsePreference, setResponsePreference] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [emoji, setEmoji] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!name || !domain || !targetRole || !description || !userProfile || !responsePreference || !emoji) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        setIsSubmitting(true);

        // 새 응답 규칙 생성
        const newInstruction = {
            id: `user-${Date.now()}`,
            name,
            domain: domain as Domain,
            targetRole,
            description,
            userProfile,
            responsePreference,
            tags: tagsInput.split(',').map(t => t.trim()).filter(t => t),
            popularity: 0,
            author: '나',
            emoji,
        };

        // Zustand store에 추가
        addUserInstruction(newInstruction);

        // 홈 화면으로 리다이렉트
        setHasSeenLanding(true);
        router.push('/');
    };

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content" style={{ backgroundColor: '#fff' }}>
                {/* 헤더 */}
                <Box
                    py="lg"
                    px="xl"
                    style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Group justify="space-between" align="center">
                        <Group gap="md">
                            <Button
                                variant="subtle"
                                color="gray"
                                leftSection={<IconArrowLeft size={18} />}
                                onClick={() => router.back()}
                            >
                                뒤로
                            </Button>
                            <div>
                                <Title order={2}>응답 규칙 등록</Title>
                                <Text size="sm" c="dimmed">
                                    나만의 AI 응답 규칙을 등록하고 공유하세요
                                </Text>
                            </div>
                        </Group>
                    </Group>
                </Box>

                {/* 폼 영역 */}
                <Container size="md" py="xl">
                    <Paper p="xl" radius="lg" withBorder>
                        <Stack gap="lg">
                            {/* 기본 정보 */}
                            <div>
                                <Text fw={600} mb="md">기본 정보</Text>
                                <Stack gap="md">
                                    <Group grow>
                                        <TextInput
                                            label="응답 규칙 이름"
                                            placeholder="예: 풀스택 개발자"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Select
                                            label="이모지"
                                            placeholder="선택"
                                            required
                                            data={EMOJI_OPTIONS}
                                            value={emoji}
                                            onChange={setEmoji}
                                        />
                                    </Group>

                                    <Group grow>
                                        <Select
                                            label="도메인"
                                            placeholder="분야를 선택하세요"
                                            required
                                            data={DOMAIN_OPTIONS}
                                            value={domain}
                                            onChange={setDomain}
                                        />
                                        <TextInput
                                            label="대상 역할"
                                            placeholder="예: 3년차 백엔드 개발자"
                                            required
                                            value={targetRole}
                                            onChange={(e) => setTargetRole(e.target.value)}
                                        />
                                    </Group>

                                    <Textarea
                                        label="설명"
                                        placeholder="이 응답 규칙이 어떤 상황에 유용한지 간단히 설명해주세요"
                                        required
                                        minRows={2}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Stack>
                            </div>

                            <Divider />

                            {/* 사용자 프로필 */}
                            <div>
                                <Text fw={600} mb="xs">사용자 프로필</Text>
                                <Text size="sm" c="dimmed" mb="md">
                                    ChatGPT의 &quot;What would you like ChatGPT to know about you?&quot; 영역에 해당합니다.
                                </Text>
                                <Textarea
                                    placeholder={`예시:
저는 3년차 풀스택 개발자입니다. 주로 React, Next.js, Node.js, TypeScript를 사용합니다.
클린 코드와 최적화된 솔루션을 선호하며, 실전에서 바로 적용 가능한 코드를 원합니다.`}
                                    required
                                    minRows={5}
                                    value={userProfile}
                                    onChange={(e) => setUserProfile(e.target.value)}
                                    styles={{
                                        input: {
                                            backgroundColor: '#fefcf8',
                                        }
                                    }}
                                />
                            </div>

                            <Divider />

                            {/* 응답 방식 선호 */}
                            <div>
                                <Text fw={600} mb="xs">응답 방식 선호</Text>
                                <Text size="sm" c="dimmed" mb="md">
                                    ChatGPT의 &quot;How would you like ChatGPT to respond?&quot; 영역에 해당합니다.
                                </Text>
                                <Textarea
                                    placeholder={`예시:
1. 코드 예제를 먼저 보여주세요
2. TypeScript를 사용하고 타입 정의를 포함해주세요
3. 에러 핸들링과 엣지 케이스를 고려해주세요
4. 불필요한 설명은 생략하고 핵심만 전달해주세요
5. 성능 최적화 팁이 있다면 함께 알려주세요`}
                                    required
                                    minRows={5}
                                    value={responsePreference}
                                    onChange={(e) => setResponsePreference(e.target.value)}
                                    styles={{
                                        input: {
                                            backgroundColor: '#f8f9fa',
                                        }
                                    }}
                                />
                            </div>

                            <Divider />

                            {/* 태그 */}
                            <div>
                                <Text fw={600} mb="xs">태그</Text>
                                <Text size="sm" c="dimmed" mb="md">
                                    쉼표(,)로 구분하여 입력하세요
                                </Text>
                                <TextInput
                                    placeholder="예: 코드 위주, 간결함, TypeScript, 실용적"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                />
                                {tagsInput && (
                                    <Group gap="xs" mt="sm">
                                        {tagsInput.split(',').map((tag, idx) => (
                                            tag.trim() && (
                                                <Badge key={idx} variant="outline" color="gray">
                                                    {tag.trim()}
                                                </Badge>
                                            )
                                        ))}
                                    </Group>
                                )}
                            </div>

                            <Divider />

                            {/* 제출 버튼 */}
                            <Group justify="flex-end">
                                <Button
                                    variant="light"
                                    color="gray"
                                    onClick={() => router.back()}
                                >
                                    취소
                                </Button>
                                <Button
                                    variant="filled"
                                    color="yellow"
                                    leftSection={<IconPlus size={18} />}
                                    onClick={handleSubmit}
                                    loading={isSubmitting}
                                    styles={{ root: { backgroundColor: '#E0B861' } }}
                                >
                                    등록하기
                                </Button>
                            </Group>
                        </Stack>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
