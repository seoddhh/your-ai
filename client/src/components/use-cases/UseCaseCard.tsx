"use client";

import Link from 'next/link';
import {
  Badge,
  Button,
  Card,
  CopyButton,
  Group,
  Text,
} from '@mantine/core';
import { IconCheck, IconCopy, IconChevronRight } from '@tabler/icons-react';
import { UseCase, USE_CASE_TYPE_LABEL } from '@/data/useCases';
import { DOMAIN_META } from '@/data/customInstructions';

export interface UseCaseCardProps {
  useCase: UseCase;
}

export default function UseCaseCard({ useCase }: UseCaseCardProps) {
  const domainMeta = DOMAIN_META[useCase.domain];

  return (
    <Card
      p="lg"
      radius="lg"
      withBorder
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      styles={{
        root: {
          '&:hover': {
            borderColor: 'var(--accent-color)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
      }}
    >
      <Group justify="space-between" align="flex-start" gap="sm">
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text fw={750} size="md" lineClamp={2}>
            {useCase.title}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={2} style={{ lineHeight: 1.6 }}>
            {useCase.goal}
          </Text>
        </div>
        <Badge
          size="sm"
          variant="light"
          style={{
            backgroundColor: `${domainMeta.color}12`,
            color: domainMeta.color,
            fontWeight: 600,
          }}
        >
          {domainMeta.label}
        </Badge>
      </Group>

      <Group gap={6}>
        <Badge variant="outline" color="gray" radius="md" size="sm">
          {USE_CASE_TYPE_LABEL[useCase.type]}
        </Badge>
        {(useCase.desiredTags || []).slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            color="gray"
            radius="md"
            size="sm"
            style={{ textTransform: 'none' }}
          >
            {tag}
          </Badge>
        ))}
      </Group>

      <Group justify="space-between" mt="xs">
        <CopyButton value={useCase.promptTemplate}>
          {({ copied, copy }) => (
            <Button
              size="xs"
              variant={copied ? 'filled' : 'light'}
              color={copied ? 'green' : 'gray'}
              leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              onClick={copy}
            >
              {copied ? '템플릿 복사됨' : '템플릿 복사'}
            </Button>
          )}
        </CopyButton>

        <Link href={`/questions/${useCase.id}`} style={{ textDecoration: 'none' }}>
          <Button
            size="xs"
            variant="filled"
            styles={{ root: { backgroundColor: 'var(--accent-color)' } }}
            rightSection={<IconChevronRight size={14} />}
          >
            추천 규칙 보기
          </Button>
        </Link>
      </Group>
    </Card>
  );
}

