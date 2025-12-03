import Link from 'next/link';

export function Sidebar() {
    return (
        <aside className="w-[280px] bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] h-screen sticky top-0 flex flex-col p-6 z-[100] hidden md:flex">
            <div className="text-xl font-bold text-white mb-10 tracking-tighter border-b-2 border-[#3e4451] pb-3">
                &gt; AI_SPECTRUM
            </div>

            <div className="mb-8">
                <div className="text-xs uppercase text-[#5c6370] mb-3">Categories</div>
                <nav className="flex flex-col gap-3">
                    {['Social_Issues', 'Philosophy', 'Relationship', 'Career'].map((item) => (
                        <Link
                            key={item}
                            href={`/category/${item.toLowerCase()}`}
                            className="text-sm hover:text-white hover:underline transition-colors"
                        >
                            # {item}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="mb-8">
                <div className="text-xs uppercase text-[#5c6370] mb-3">Filters</div>
                <div className="flex flex-col gap-3">
                    {['Age: 20s - 30s', 'Age: 40s - 50s', 'Background: Tech', 'Background: Art'].map((item) => (
                        <label key={item} className="text-sm flex items-center gap-2 cursor-pointer hover:text-white">
                            <input type="checkbox" className="accent-[var(--accent-color)]" />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-auto text-xs text-[#5c6370]">
                v.1.0.0 (2025-12)
            </div>
        </aside>
    );
}
