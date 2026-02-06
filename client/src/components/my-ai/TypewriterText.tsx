import { useState, useEffect } from 'react';
import { Text } from '@mantine/core';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
    className?: string;
}

export function TypewriterText({ text, speed = 30, onComplete, className }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            if (onComplete) onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return (
        <Text className={className} style={{ display: 'inline' }}>
            {displayedText}
            {currentIndex < text.length && (
                <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '14px',
                    backgroundColor: 'var(--accent-color)',
                    marginLeft: '2px',
                    verticalAlign: 'middle',
                    animation: 'blink 1s step-end infinite'
                }} />
            )}
            <style jsx global>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </Text>
    );
}
