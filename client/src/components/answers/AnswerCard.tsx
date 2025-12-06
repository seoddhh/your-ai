"use client";

import React from 'react';
import { Card, Text, Badge, Group, Avatar, Button, Stack, Divider } from '@mantine/core';
import { IconCopy, IconRobot } from '@tabler/icons-react';

interface AnswerCardProps {
    modelName: string;
    content: string;
    persona: {
        age?: string;
        job?: string;
        mbti?: string;
        trait?: string;
        edu?: string;
        major?: string;
        name: string;
        avatarColor?: string;
    };
}

export default function AnswerCard({ modelName, content, persona }: AnswerCardProps) {
    return (
        <Card withBorder padding="lg" radius="md">
            <Card.Section withBorder inheritPadding py="xs" bg="gray.0">
                <Group justify="space-between">
                    <Group gap="sm">
                        <Avatar color={persona.avatarColor || 'blue'} radius="xl">
                            {persona.name.slice(0, 1)}
                        </Avatar>
                        <div>
                            <Text fw={700} size="sm">{persona.name}</Text>
                            <Text size="xs" c="dimmed">{persona.job || 'AI Persona'}</Text>
                        </div>
                    </Group>
                    <Badge variant="light" color="gray" size="sm">
                        {modelName}
                    </Badge>
                </Group>
            </Card.Section>

            <Card.Section inheritPadding py="md">
                <Group gap={6} mb="md">
                    {persona.age && <Badge variant="outline" size="xs" color="gray">{persona.age}세</Badge>}
                    {persona.mbti && <Badge variant="outline" size="xs" color="blue">{persona.mbti}</Badge>}
                    {persona.trait && <Badge variant="outline" size="xs" color="violet">{persona.trait}</Badge>}
                    {persona.major && <Badge variant="outline" size="xs" color="cyan">{persona.major}</Badge>}
                </Group>

                <Text size="sm" style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {content}
                </Text>
            </Card.Section>

            <Card.Section inheritPadding py="xs" withBorder mt="auto">
                <Group justify="flex-end">
                    <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        leftSection={<IconCopy size={14} />}
                        styles={{ root: { paddingLeft: 8, paddingRight: 8 } }}
                    >
                        Copy Answer
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}
