"use client";

import { Group, Button, Text, Box } from '@mantine/core';
import { Platform, PLATFORM_CONFIGS, PLATFORMS } from '@/utils/platformTransformers';

interface PlatformSelectorProps {
    selectedPlatform: Platform;
    onPlatformChange: (platform: Platform) => void;
}

/**
 * 플랫폼별 보기 전환 버튼
 * - 한 번에 하나의 플랫폼만 활성화
 * - 편집용이 아닌 보기/복사용 전환 UI
 */
export function PlatformSelector({
    selectedPlatform,
    onPlatformChange
}: PlatformSelectorProps) {
    return (
        <Box>
            <Group gap="xs">
                {PLATFORMS.map((platform) => {
                    const config = PLATFORM_CONFIGS[platform];
                    const isActive = selectedPlatform === platform;

                    return (
                        <Button
                            key={platform}
                            size="xs"
                            variant={isActive ? 'filled' : 'light'}
                            onClick={() => onPlatformChange(platform)}
                            styles={{
                                root: {
                                    backgroundColor: isActive
                                        ? config.color
                                        : config.bgColor,
                                    color: isActive ? 'white' : config.color,
                                    border: `1px solid ${isActive ? config.color : 'transparent'}`,
                                    fontWeight: isActive ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: isActive
                                            ? config.color
                                            : `${config.color}25`,
                                        transform: 'translateY(-1px)',
                                    },
                                },
                            }}
                        >
                            {config.label}
                        </Button>
                    );
                })}
            </Group>
        </Box>
    );
}
