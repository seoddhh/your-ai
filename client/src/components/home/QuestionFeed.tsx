"use client";

import { useEffect, useState } from 'react';
import QuestionCard from "@/components/questions/QuestionCard";
import { getAllQuestions } from "@/data/questions";
import Sidebar from "@/components/layout/Sidebar";
import FilterChips from "@/components/ui/FilterChips";
import { Box, Loader } from '@mantine/core';

export default function QuestionFeed() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Box style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader color="yellow" size="xl" />
            </Box>
        );
    }

    const questions = getAllQuestions() || [];

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <FilterChips />
                <header className="header">
                    <div className="breadcrumb">홈 / 질문 목록</div>
                    <div style={{ marginLeft: 'auto' }}>
                        <button className="btn-action">질문 제출하기</button>
                    </div>
                </header>

                <div className="content-body">
                    <div className="grid-container" style={{ gridTemplateColumns: '1fr' }}>
                        {questions.map(q => (
                            <QuestionCard
                                key={q.id}
                                id={q.id}
                                content={q.content}
                                category={q.category}
                                stats={q.stats}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
