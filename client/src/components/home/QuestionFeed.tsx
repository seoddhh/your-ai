"use client";

import QuestionCard from "@/components/questions/QuestionCard";
import { getAllQuestions } from "@/data/questions";

export default function QuestionFeed() {
    const questions = getAllQuestions();

    return (
        <>
            <header className="header">
                <div className="breadcrumb">Home / All Questions</div>
                <div style={{ marginLeft: 'auto' }}>
                    <button className="btn-action">Submit Question</button>
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
        </>
    );
}
