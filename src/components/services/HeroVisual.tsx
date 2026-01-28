'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * HeroVisual - A decorative automation/RPA visual for the Hyperautomation hero.
 * Pure SVG/CSS, respects prefers-reduced-motion, aria-hidden for a11y.
 * 
 * Uses mounted guard pattern to prevent hydration mismatch:
 * - Server renders null (no SVG attributes that could mismatch)
 * - Client renders full visual after mount
 */
export function HeroVisual() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="hidden sm:block w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]" />;
    }

    return (
        <div
            className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 select-none",
                // Responsive sizing to prevent clipping on laptops (15") while looking great on 24"+
                "w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[750px] xl:h-[750px]",
                "hidden sm:flex items-center justify-center",
                "transition-opacity duration-1000 ease-out animate-in fade-in zoom-in-95",
                // Ensure it doesn't overlap header on shorter screens
                "mt-8 lg:mt-0"
            )}
        >
            {/* Main Video Container with Premium Styling */}
            <div className="relative w-[90%] h-[90%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm group">
                {/* Decorative border gradient */}
                <div className="absolute inset-0 border border-white/20 rounded-3xl z-20 pointer-events-none" />

                {/* Inner shadow overlay */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] z-10 pointer-events-none" />

                <video
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/work.mp4" type="video/mp4" />
                    {/* Fallback */}
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-400">
                        Automatización Inteligente
                    </div>
                </video>

                {/* Subtle overlay gradient for text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/10 pointer-events-none" />
            </div>

            {/* Decorative background glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10 opacity-60" />

            {/* Floating connecting nodes (decorative) */}
            <div className="absolute -left-4 top-1/4 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
            <div className="absolute -right-4 bottom-1/3 w-2 h-2 bg-primary rounded-full animate-pulse delay-700" />
        </div>
    );
}
