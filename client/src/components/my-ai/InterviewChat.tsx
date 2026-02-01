import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Text, Button, Stack, Group, Avatar, Loader } from '@mantine/core';
import { IconRobot, IconUser } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationScenario } from '@/data/agentQuestions';
import { TypewriterText } from './TypewriterText';

interface Message {
    id: string;
    role: 'ai' | 'user';
    content: string;
    isTyping?: boolean;
}

interface InterviewChatProps {
    currentScenario: SimulationScenario | null;
    onOptionSelect: (optionId: string) => void;
    isProcessing: boolean;
}

export function InterviewChat({ currentScenario, onOptionSelect, isProcessing }: InterviewChatProps) {
    const [history, setHistory] = useState<Message[]>([
        {
            id: 'init',
            role: 'ai',
            content: 'RLM 엔진이 초기화되었습니다. 당신의 에이전트 자아(Self)를 구축하기 위한 동기화 프로세스를 시작합니다.',
            isTyping: true
        }
    ]);

    // Auto-scroll to bottom
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentScenario) {
            // Add new question from AI
            setHistory(prev => [
                ...prev,
                {
                    id: currentScenario.id,
                    role: 'ai',
                    content: currentScenario.question,
                    isTyping: true
                }
            ]);
        }
    }, [currentScenario]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isProcessing]);

    const handleOptionClick = (option: { id: string, label: string }) => {
        // Add user response to history
        setHistory(prev => [
            ...prev,
            { id: `user-${Date.now()}`, role: 'user', content: option.label }
        ]);
        onOptionSelect(option.id);
    };

    return (
        <Stack h="100%" gap="xl" style={{ position: 'relative' }}>
            {/* Chat Feed */}
            <Box style={{ flex: 1, overflowY: 'auto', paddingBottom: '200px' }} className="hide-scrollbar">
                <Stack gap="lg">
                    {history.map((msg) => (
                        <Group
                            key={msg.id}
                            align="flex-start"
                            justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                        >
                            {msg.role === 'ai' && (
                                <Avatar color="dark" radius="xl" size="sm">
                                    <IconRobot size={14} />
                                </Avatar>
                            )}

                            <Paper
                                p="md"
                                radius="md"
                                style={{
                                    maxWidth: '80%',
                                    backgroundColor: msg.role === 'ai' ? '#fff' : 'var(--accent-color)',
                                    color: msg.role === 'ai' ? '#000' : '#fff',
                                    border: msg.role === 'ai' ? '1px solid #eee' : 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                }}
                            >
                                {msg.role === 'ai' && msg.isTyping ? (
                                    <TypewriterText text={msg.content} />
                                ) : (
                                    <Text size="sm">{msg.content}</Text>
                                )}
                            </Paper>

                            {msg.role === 'user' && (
                                <Avatar color="yellow" radius="xl" size="sm" style={{ opacity: 0.8 }}>
                                    <IconUser size={14} />
                                </Avatar>
                            )}
                        </Group>
                    ))}

                    {/* Processing Indicator */}
                    {isProcessing && (
                        <Group align="center" gap="xs" ml="lg">
                            <Loader size="xs" color="gray" type="dots" />
                            <Text size="xs" c="dimmed">RLM Engine analyzing patterns...</Text>
                        </Group>
                    )}

                    <div ref={bottomRef} />
                </Stack>
            </Box>

            {/* Input Area (Sticky Bottom) */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, var(--bg-color) 80%, transparent)',
                    paddingTop: '40px',
                    paddingBottom: '20px'
                }}
            >
                <AnimatePresence>
                    {!isProcessing && currentScenario && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                        >
                            <Stack>
                                {currentScenario.options.map((opt) => (
                                    <Button
                                        key={opt.id}
                                        variant="default"
                                        size="lg"
                                        fullWidth
                                        onClick={() => handleOptionClick(opt)}
                                        styles={{
                                            root: {
                                                height: 'auto',
                                                padding: '16px',
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                '&:hover': {
                                                    borderColor: 'var(--accent-color)',
                                                    backgroundColor: 'var(--gold-light)'
                                                }
                                            },
                                            label: {
                                                whiteSpace: 'normal',
                                                fontWeight: 500
                                            }
                                        }}
                                    >
                                        <Group>
                                            <Text size="xs" c="dimmed" style={{ minWidth: '20px' }}>
                                                {'>'}
                                            </Text>
                                            <Text>{opt.label}</Text>
                                        </Group>
                                    </Button>
                                ))}
                            </Stack>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </Stack>
    );
}
