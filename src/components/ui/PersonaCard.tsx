import { Button } from './Button';

interface Tag {
    label: string;
    value: string;
}

interface PersonaCardProps {
    tags: Tag[];
    name: string;
    answer: string;
    modelName: string;
}

export function PersonaCard({ tags, name, answer, modelName }: PersonaCardProps) {
    return (
        <article className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:border-[var(--text-primary)] flex flex-col">
            <div className="flex justify-between items-start mb-5 border-b border-[#f0f0f0] pb-3">
                <div>
                    <div className="flex gap-2 flex-wrap mb-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="text-[11px] px-1.5 py-0.5 border border-[#ccc] bg-[#f8f9fa]">
                                {tag.label}: {tag.value}
                            </span>
                        ))}
                    </div>
                    <div className="font-bold text-base mt-2">
                        {name}
                    </div>
                </div>
            </div>
            <div className="text-sm leading-relaxed text-[#444] grow mb-6">
                {answer}
            </div>
            <div className="mt-auto pt-4 border-t border-dashed border-[#eee] flex justify-between items-center text-xs text-[#888]">
                <span>Model: {modelName}</span>
                <Button>Copy Prompt</Button>
            </div>
        </article>
    );
}
