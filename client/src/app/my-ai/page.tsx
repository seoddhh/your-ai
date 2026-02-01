"use client";

import { useState, useEffect } from 'react';
import { Container, Grid, Box, Title, Text, Button, Group } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import {
    INITIAL_IDENTITY,
    IdentityState,
    SIMULATION_SCENARIOS,
    calculateIdentityUpdate,
    getNextQuestion,
    SimulationScenario
} from '@/data/agentQuestions';
import { InterviewChat } from '@/components/my-ai/InterviewChat';
import { IdentityMatrix } from '@/components/my-ai/IdentityMatrix';

export default function AgentCreationPage() {
    const [mounted, setMounted] = useState(false);

    // Core Agent State
    const [identity, setIdentity] = useState<IdentityState>(INITIAL_IDENTITY);
    const [logs, setLogs] = useState<string[]>([]);

    // Interview State
    const [started, setStarted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentScenario, setCurrentScenario] = useState<SimulationScenario | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const startSession = () => {
        setStarted(true);
        setLogs(prev => [...prev, "System initialized...", "Loading RLM Identity Core..."]);

        // Simulate initial loading
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setCurrentScenario(SIMULATION_SCENARIOS[0]);
        }, 1500);
    };

    const handleOptionSelect = (optionId: string) => {
        if (!currentScenario) return;

        const selectedOption = currentScenario.options.find(opt => opt.id === optionId);
        if (!selectedOption) return;

        // 1. Show Processing State
        setIsProcessing(true);
        setCurrentScenario(null); // Temporarily hide options

        // 2. Simulate RLM Analysis Delay
        setTimeout(() => {
            // 3. Update Identity
            const newTraits = calculateIdentityUpdate(identity.traits, selectedOption.effect);
            setIdentity(prev => ({ ...prev, traits: newTraits }));

            // 4. Update Logs (Insight)
            setLogs(prev => [...prev, `[ANALYSIS] ${selectedOption.insight}`]);

            // 5. Next Question
            const nextQ = getNextQuestion(currentScenario.id);
            setCurrentScenario(nextQ);

            setIsProcessing(false);

            if (!nextQ) {
                setLogs(prev => [...prev, "Identity Synchronization Complete."]);
            }
        }, 1200);
    };

    if (!mounted) return null;

    if (!started) {
        return (
            <Box
                style={{
                    height: 'calc(100vh - var(--header-height))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 100%)'
                }}
            >
                <Container size="sm" style={{ textAlign: 'center', color: '#fff' }}>
                    <IconSparkles size={48} color="var(--accent-color)" style={{ marginBottom: 24 }} />
                    <Title order={1} mb="md" style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px' }}>
                        Agent Identity Sync
                    </Title>
                    <Text size="lg" c="dimmed" mb="xl" style={{ maxWidth: 500, margin: '0 auto 40px' }}>
                        단순한 규칙 설정이 아닙니다.<br />
                        당신의 가치관과 철학을 에이전트에게 이식하는<br />
                        동기화(Synchronization) 과정을 시작합니다.
                    </Text>
                    <Button
                        size="xl"
                        color="yellow"
                        onClick={startSession}
                        styles={{
                            root: {
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' }
                            }
                        }}
                    >
                        Initialize Core
                    </Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            style={{
                minHeight: 'calc(100vh - var(--header-height))',
                background: '#1a1a1a',
                color: '#e0e0e0',
                overflow: 'hidden'
            }}
        >
            <Grid gutter={0} style={{ height: '100%' }}>
                {/* Left Column: Interview Chat */}
                <Grid.Col span={{ base: 12, md: 7 }} style={{ height: 'calc(100vh - var(--header-height))' }}>
                    <Box p="xl" h="100%">
                        <InterviewChat
                            currentScenario={currentScenario}
                            onOptionSelect={handleOptionSelect}
                            isProcessing={isProcessing}
                        />
                    </Box>
                </Grid.Col>

                {/* Right Column: Identity Matrix */}
                <Grid.Col
                    span={{ base: 12, md: 5 }}
                    style={{
                        background: 'linear-gradient(135deg, #151515 0%, #0a0a0a 100%)',
                        borderLeft: '1px solid #333',
                        height: 'calc(100vh - var(--header-height))',
                        overflowY: 'auto'
                    }}
                >
                    <Box p="xl">
                        <IdentityMatrix
                            traits={identity.traits}
                            insights={logs}
                        />
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    );
}
