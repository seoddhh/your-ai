import { createTheme, MantineColorsTuple, MantineTheme } from '@mantine/core';

const luxuriousGold: MantineColorsTuple = [
    '#fbf9f2', // 0
    '#f5f1e3', // 1
    '#ece1c2', // 2
    '#e2d09e', // 3
    '#dabf80', // 4
    '#d5b46d', // 5
    '#d2ae62', // 6
    '#b9954f', // 7
    '#a58443', // 8
    '#907234', // 9
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
    primaryColor: 'luxurious-gold',
    colors: {
        'luxurious-gold': luxuriousGold,
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
                        borderColor: theme.colors['luxurious-gold'][4],
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
        // Add custom variables here if needed
    }
});
