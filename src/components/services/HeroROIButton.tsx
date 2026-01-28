'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';

interface HeroROIButtonProps {
    children: React.ReactNode;
    className?: string;
}

function HeroROIButtonContent({ children, className }: HeroROIButtonProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        params.set('roi', '1');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "px-8 py-4 rounded-lg font-medium transition-all cursor-pointer hover:bg-slate-100 flex items-center gap-2",
                className
            )}
        >
            <Calculator className="w-5 h-5 opacity-70" />
            {children}
        </button>
    );
}

export function HeroROIButton(props: HeroROIButtonProps) {
    return (
        <Suspense fallback={
            <div className={cn("px-8 py-4 rounded-lg font-medium bg-white/50 border border-slate-200 text-slate-400 cursor-wait", props.className)}>
                {props.children}
            </div>
        }>
            <HeroROIButtonContent {...props} />
        </Suspense>
    );
}
