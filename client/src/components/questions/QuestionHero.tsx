import { Title, Text, Badge, Container, Box } from '@mantine/core';

interface QuestionHeroProps {
    category: string;
    content: string;
    stats: string;
}

export default function QuestionHero({ category, content, stats }: QuestionHeroProps) {
    return (
        <Box
            py={60}
            mb={40}
            style={{
                borderBottom: '1px solid var(--mantine-color-default-border)',
                backgroundColor: 'var(--mantine-color-body)'
            }}
        >
            <Container size="xl">
                <Badge
                    size="lg"
                    variant="dot"
                    color="dark"
                    mb="md"
                    tt="uppercase"
                >
                    {category}
                </Badge>

                <Title
                    order={1}
                    size="h1"
                    fw={900}
                    mb="lg"
                    style={{ lineHeight: 1.2 }}
                >
                    "{content}"
                </Title>

                <Text c="dimmed" size="sm" fw={500}>
                    {stats}
                </Text>
            </Container>
        </Box>
    );
}
