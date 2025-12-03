export function Header() {
    return (
        <header className="h-[var(--header-height)] bg-white/90 backdrop-blur-md border-b border-[var(--border-color)] flex items-center px-8 sticky top-0 z-50 shadow-sm">
            <div className="text-sm text-[#666]">
                Home / Social_Issues / Q_29103
            </div>
            <div className="ml-auto">
                <button className="bg-transparent border border-[#ddd] px-3 py-1.5 text-xs cursor-pointer transition-colors hover:bg-black hover:text-white">
                    Submit Question
                </button>
            </div>
        </header>
    );
}
