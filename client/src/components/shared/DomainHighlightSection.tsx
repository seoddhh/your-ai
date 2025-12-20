"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Box, Text, Paper, SimpleGrid } from '@mantine/core';
import { Domain, DOMAIN_META } from '@/data/customInstructions';
import { useDomainRepresentatives } from '@/hooks/useAnswerRules';

// 도메인별 아이콘 경로 매핑
const DOMAIN_ICONS: Record<Domain, string> = {
    Tech: '/icons/developericons.png',
    Creative: '/icons/designer.png',
    Business: '/icons/business.png',
    Marketing: '/icons/marketing.png',
    Social: '/icons/social-network.png',
    Academia: '/icons/reserchericons.png',
    Education: '/icons/teacher.png',
    Healthcare: '/icons/doctor.png',
    Finance: '/icons/bank.png',
    Legal: '/icons/law.png',
};

/**
 * 도메인별 대표 규칙 하이라이트 섹션
 * 각 도메인에서 가장 인기 있는 규칙 1개씩 그리드로 표시
 */
export default function DomainHighlightSection() {
    const representatives = useDomainRepresentatives();
    const domains = Object.keys(DOMAIN_META) as Domain[];

    return (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing="md">
            {domains.map((domain) => {
                const meta = DOMAIN_META[domain];
                const representative = representatives.find(r => r?.domain === domain);

                return (
                    <Link
                        key={domain}
                        href={`/instructions?domain=${domain}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Paper
                            p="md"
                            radius="lg"
                            withBorder
                            h="100%"
                            style={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderColor: '#e5e5e5',
                            }}
                            styles={{
                                root: {
                                    '&:hover': {
                                        borderColor: meta.color,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 4px 12px ${meta.color}20`,
                                    }
                                }
                            }}
                        >
                            {/* 도메인 아이콘 */}
                            <Box
                                w={44}
                                h={44}
                                mb="sm"
                                style={{
                                    borderRadius: 10,
                                    backgroundColor: `${meta.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={DOMAIN_ICONS[domain]}
                                    alt={meta.label}
                                    width={24}
                                    height={24}
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>

                            {/* 도메인 라벨 */}
                            <Text fw={600} size="sm" mb={4}>
                                {meta.label}
                            </Text>

                            {/* 대표 규칙 이름 */}
                            {representative && (
                                <Text size="xs" c="dimmed" lineClamp={1}>
                                    {representative.name}
                                </Text>
                            )}

                            {/* 링크 텍스트 */}
                            <Text size="xs" c={meta.color} mt="xs" fw={500}>
                                라이브러리 보기 →
                            </Text>
                        </Paper>
                    </Link>
                );
            })}
        </SimpleGrid>
    );
}

