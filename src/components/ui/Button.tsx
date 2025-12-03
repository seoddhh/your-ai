import { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "bg-transparent border border-[#ddd] px-3 py-1.5 text-xs cursor-pointer transition-colors hover:bg-black hover:text-white",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
