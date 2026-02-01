import { Paper, Text, Stack, Group, RingProgress, Progress, Card, Badge, Box } from '@mantine/core';
import { IconBrain, IconCpu, IconActivity } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentTrait } from '@/data/agentQuestions';

interface IdentityMatrixProps {
    traits: AgentTrait;
    insights: string[];
}

export function IdentityMatrix({ traits, insights }: IdentityMatrixProps) {

    const TraitBar = ({ label, leftLabel, rightLabel, value, color }: any) => (
        <Box mb="md">
            <Group justify="space-between" mb={4}>
                <Text size="xs" fw={700} c="dimmed">{label}</Text>
                <Text size="xs" fw={700} c="var(--accent-color)">{value}%</Text>
            </Group>
            <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">{leftLabel}</Text>
                <Text size="xs" c="dimmed">{rightLabel}</Text>
            </Group>
            <Progress
                value={value}
                color={color}
                size="sm"
                radius="sm"
                styles={{
                    root: { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
            />
        </Box>
    );

    return (
        <Stack gap="xl">
            {/* Core Identity Section */}
            <Paper
                p="xl"
                radius="lg"
                style={{
                    background: 'rgba(26, 26, 26, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff'
                }}
            >
                <Group mb="xl">
                    <IconBrain size={20} color="var(--accent-color)" />
                    <Text fw={700} tt="uppercase" size="sm" style={{ letterSpacing: '1px' }}>
                        Identity Matrix
                    </Text>
                </Group>

                <TraitBar
                    label="DECISION LOGIC"
                    leftLabel="Empathy"
                    rightLabel="Rationality"
                    value={traits.rationality}
                    color="blue"
                />
                <TraitBar
                    label="COMMUNICATION STYLE"
                    leftLabel="Flow"
                    rightLabel="Structure"
                    value={traits.structure}
                    color="grape"
                />
                <TraitBar
                    label="INFORMATION DENSITY"
                    leftLabel="Concise"
                    rightLabel="Verbose"
                    value={traits.verbosity}
                    color="orange"
                />
                <TraitBar
                    label="KNOWLEDGE BASE"
                    leftLabel="Practice"
                    rightLabel="Theory"
                    value={traits.theory}
                    color="teal"
                />
            </Paper>

            {/* System Logs / Insights */}
            <Paper
                p="xl"
                radius="lg"
                style={{
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    minHeight: '200px',
                    fontFamily: 'monospace'
                }}
            >
                <Group mb="md">
                    <IconCpu size={16} color="var(--text-secondary)" />
                    <Text size="xs" c="dimmed">RLM ENGINE LOGS</Text>
                </Group>

                <Stack gap="xs">
                    <AnimatePresence mode='popLayout'>
                        {insights.slice(-5).reverse().map((insight, idx) => (
                            <motion.div
                                key={`${insight}-${idx}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                layout
                            >
                                <Group align="flex-start" gap="xs">
                                    <Text size="xs" c="var(--accent-color)">{'>'}</Text>
                                    <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
                                        {insight}
                                    </Text>
                                </Group>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {insights.length === 0 && (
                        <Text size="xs" c="dimmed" style={{ opacity: 0.5 }}>
                            Waiting for input stream...
                        </Text>
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}
