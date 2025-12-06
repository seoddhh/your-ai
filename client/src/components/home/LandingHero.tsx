"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Container, Text, Title, Group, Box } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

interface LandingHeroProps {
    onEnter: () => void;
}

export default function LandingHero({ onEnter }: LandingHeroProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1b1e] text-white"
        >
            <Container size="md" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Text
                        size="sm"
                        tt="uppercase"
                        fw={700}
                        c="dimmed"
                        mb="md"
                        style={{ letterSpacing: '4px' }}
                    >
                        AI Persona Archive
                    </Text>

                    <Title
                        order={1}
                        size="3.5rem"
                        fw={900}
                        mb="xl"
                        style={{ lineHeight: 1.1, fontFamily: 'var(--font-en)' }}
                    >
                        Different Contexts,<br />
                        <span style={{ color: '#d2ae62' }}>Unique Answers.</span>
                    </Title>

                    <Text
                        size="xl"
                        c="dimmed"
                        mb={50}
                        maw={600}
                        mx="auto"
                        style={{ fontFamily: 'var(--font-kr)', fontWeight: 300 }}
                    >
                        모두가 같은 AI를 쓰지만, 결과는 다릅니다.<br />
                        개발자의 GPT와 디자이너의 GPT가 어떻게 다른지 확인해보세요.
                    </Text>

                    <Group justify="center">
                        <Button
                            size="xl"
                            variant="outline"
                            color="gray"
                            rightSection={<IconArrowRight size={20} />}
                            onClick={onEnter}
                            styles={{
                                root: {
                                    borderColor: '#555',
                                    color: '#fff',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        backgroundColor: 'rgba(255,255,255,0.05)'
                                    }
                                }
                            }}
                        >
                            Explore Perspectives
                        </Button>
                    </Group>
                </motion.div>
            </Container>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                style={{ position: 'absolute', bottom: '40px' }}
            >
                <Text size="xs" c="dimmed" style={{ letterSpacing: '2px' }}>
                    SCROLL TO DISCOVER
                </Text>
            </motion.div>
        </motion.div>
    );
}
