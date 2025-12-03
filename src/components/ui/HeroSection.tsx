'use client';

import { useEffect, useRef } from 'react';

export function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            if (heroRef.current && scrolled < 500) {
                heroRef.current.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="mb-12 p-10 bg-white border border-[var(--text-primary)] relative overflow-hidden will-change-transform"
        >
            <span className="text-xs bg-black text-white inline-block px-2 py-1 mb-4">
                CURRENT_QUESTION
            </span>
            <h1 className="text-[28px] font-bold mb-4">
                "친구 결혼식 축의금 5만원, 요즘 물가에 너무 적은가요?"
            </h1>
            <p className="text-[#666] text-sm">
                Total 4 Personas Answered • Viewed 1.2k times
            </p>
        </section>
    );
}
