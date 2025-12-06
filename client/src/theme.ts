import { createTheme, MantineColorsTuple, MantineTheme } from '@mantine/core';

const auroraGold: MantineColorsTuple = [
    '#fdfdf2', // 0 - 배경색 (bg-color)
    '#faf7e8', // 1
    '#f5edcf', // 2
    '#efe2b3', // 3
    '#e8d494', // 4
    '#E4C778', // 5
    '#E0B861', // 6 - 주요 포인트 색상 (Aurora Gold)
    '#c9a254', // 7
    '#b08d47', // 8
    '#96783a', // 9
];

const deepCharcoal: MantineColorsTuple = [
    '#f3f3f3',
    '#e7e7e7',
    '#cdcdcd',
    '#b0b0b0',
    '#909090',
    '#747474',
    '#656565',
    '#535353',
    '#4a4a4a',
    '#3d3d3d',
];

export const theme = createTheme({
    primaryColor: 'aurora-gold',
    colors: {
        'aurora-gold': auroraGold,
        'deep-charcoal': deepCharcoal,
    },
    fontFamily: 'var(--font-jetbrains-mono), monospace',
    headings: {
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontWeight: '700',
    },
    components: {
        Button: {
            defaultProps: {
                radius: 'md',
                variant: 'filled',
            },
            styles: (theme: MantineTheme) => ({
                root: {
                    transition: 'all 0.2s',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: theme.shadows.sm,
                    },
                },
            }),
        },
        Card: {
            defaultProps: {
                radius: 'xl',
                withBorder: true,
                padding: 'lg',
            },
            styles: (theme: MantineTheme) => ({
                root: {
                    backgroundColor: 'var(--mantine-color-body)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows.md,
                        borderColor: theme.colors['aurora-gold'][4],
                    },
                },
            }),
        },
        Badge: {
            defaultProps: {
                radius: 'sm',
                variant: 'light',
            }
        }
    },
    other: {
        // Custom variables
    }
});
