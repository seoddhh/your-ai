"use client";

import { useEffect, useMemo, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Divider,
  Group,
  List,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconSparkles,
} from '@tabler/icons-react';

import { DOMAIN_META } from '@/data/customInstructions';
import { getUseCaseById } from '@/data/useCases';
import { useAnswerRules } from '@/hooks/useAnswerRules';
import { recommendInstructions } from '@/utils/recommendInstructions';
import AnswerRuleCard from '@/components/shared/AnswerRuleCard';

export default function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const useCase = useMemo(() => getUseCaseById(resolvedParams.id), [resolvedParams.id]);
  const { allInstructions } = useAnswerRules();

  const recommendations = useMemo(() => {
    if (!useCase) return [];
    return recommendInstructions(allInstructions, {
      domain: useCase.domain,
      desiredTags: useCase.desiredTags,
      limit: 6,
    });
  }, [allInstructions, useCase]);

  if (!mounted) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader color="yellow" size="xl" />
      </Box>
    );
  }

  if (!useCase) {
    return (
      <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
        <Title order={3} c="dimmed">
          작업 예시를 찾을 수 없습니다
        </Title>
        <Link href="/questions">
          <Button mt="lg" variant="light">
            작업 예시로 돌아가기
          </Button>
        </Link>
      </Box>
    );
  }

  const domainMeta = DOMAIN_META[useCase.domain];

  return (
    <Box py="xl" style={{ paddingLeft: 180, paddingRight: 180 }}>
      <Group mb="xl" justify="space-between">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => router.back()}
        >
          뒤로 가기
        </Button>
        <Link href="/instructions" style={{ textDecoration: 'none' }}>
          <Button variant="light" color="gray" leftSection={<IconSparkles size={16} />}>
            라이브러리 보기
          </Button>
        </Link>
      </Group>

      <Paper
        p="xl"
        radius="lg"
        withBorder
        mb="xl"
        style={{ borderColor: domainMeta.color, borderWidth: 2, backgroundColor: '#fff' }}
      >
        <Group justify="space-between" align="flex-start" mb="sm">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title order={2} mb={6}>
              {useCase.title}
            </Title>
            <Text c="dimmed" size="sm">
              {useCase.goal}
            </Text>
          </div>
          <Badge
            size="lg"
            variant="light"
            style={{ backgroundColor: `${domainMeta.color}12`, color: domainMeta.color }}
          >
            {domainMeta.label}
          </Badge>
        </Group>

        <Group gap={8} mt="md">
          {(useCase.desiredTags || []).map((t) => (
            <Badge key={t} variant="outline" color="gray" radius="md">
              {t}
            </Badge>
          ))}
        </Group>
      </Paper>

      <Stack gap="xl">
        <Paper p="xl" radius="lg" withBorder style={{ backgroundColor: '#fff' }}>
          <Title order={4} mb="md">
            입력하면 좋은 정보
          </Title>
          <List spacing="xs">
            {useCase.inputs.map((i) => (
              <List.Item key={i}>
                <Text size="sm">{i}</Text>
              </List.Item>
            ))}
          </List>
          {useCase.notes && (
            <Text mt="md" size="sm" c="dimmed">
              {useCase.notes}
            </Text>
          )}
        </Paper>

        <Paper p="xl" radius="lg" withBorder style={{ backgroundColor: '#fff' }}>
          <Group justify="space-between" align="center" mb="md">
            <Title order={4}>프롬프트 템플릿</Title>
            <CopyButton value={useCase.promptTemplate}>
              {({ copied, copy }) => (
                <Button
                  size="sm"
                  variant={copied ? 'filled' : 'light'}
                  color={copied ? 'green' : 'gray'}
                  leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                  onClick={copy}
                >
                  {copied ? '복사됨' : '복사'}
                </Button>
              )}
            </CopyButton>
          </Group>

          <Paper
            p="lg"
            radius="md"
            style={{
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
            }}
          >
            <Text size="sm">{useCase.promptTemplate}</Text>
          </Paper>

          <Divider my="lg" />

          <Text size="sm" c="dimmed">
            아래 추천 규칙 중 하나를 선택해 `ChatGPT/Claude/Gemini`의 Custom Instructions(또는 시스템 프롬프트)에
            붙여넣은 뒤, 위 템플릿으로 질문하면 일관된 품질이 나와요.
          </Text>
        </Paper>

        <Paper p="xl" radius="lg" withBorder style={{ backgroundColor: '#fff' }}>
          <Group justify="space-between" align="flex-end" mb="md">
            <div>
              <Title order={4}>추천 응답 규칙</Title>
              <Text size="sm" c="dimmed">
                도메인 + 태그 기반으로 자동 추천
              </Text>
            </div>
          </Group>

          <Stack gap="md">
            {recommendations.map((rec) => (
              <div key={rec.instruction.id}>
                <AnswerRuleCard
                  instruction={rec.instruction}
                  isCompact
                  showAnimation={false}
                />
                {(rec.matchedTags.length > 0 || rec.reasons.length > 0) && (
                  <Text size="xs" c="dimmed" mt={6}>
                    추천 이유: {rec.reasons.join(' · ')}
                  </Text>
                )}
              </div>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

