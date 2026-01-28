'use client';

import { useState } from 'react';
import { ServiceHighlight } from '@/config/services';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, getStaggerDelay } from '@/lib/motion';

interface FeatureGridProps {
    highlights: ServiceHighlight[];
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function FeatureGrid({ highlights, variant = 'default' }: FeatureGridProps) {
    if (!highlights || highlights.length === 0) return null;

    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.1);
    const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

    return (
        <section className={cn(
            "py-20 px-4 transition-all duration-700 ease-out bg-secondary",
            isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={cn(
                    "text-3xl font-bold mb-12 text-center text-foreground"
                )}>
                    Nuestras Capacidades
                </h2>
                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    {highlights.map((highlight, index) => {
                        const isRevealed = revealedIndex === index;

                        const handleToggle = () => {
                            setRevealedIndex(isRevealed ? null : index);
                        };

                        const handleKeyDown = (e: React.KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleToggle();
                            }
                        };

                        return (
                            <button
                                key={index}
                                onClick={handleToggle}
                                onKeyDown={handleKeyDown}
                                aria-label={`${highlight.title}: ${highlight.description}. Presiona para revelar imagen de fondo.`}
                                aria-pressed={isRevealed}
                                className={cn(
                                    "p-8 rounded-xl transition-all flex flex-col h-full group text-left w-full",
                                    "relative overflow-hidden cursor-pointer", // Enable pseudo-layers and clip rounded corners
                                    motion.transition,
                                    // Base visible state handling for fade-in
                                    isVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                    // Hover Lift
                                    motion.hoverLift,
                                    "bg-card border border-border hover:shadow-card-hover",
                                    // Focus visible for keyboard navigation
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                    // Reduced motion support
                                    "motion-reduce:transition-none"
                                )}
                                style={getStaggerDelay(index)}
                                data-revealed={isRevealed || undefined}
                            >
                                {/* Background Image Layer */}
                                {highlight.bgImageSrc && (
                                    <>
                                        <div
                                            className={cn(
                                                "absolute inset-0 z-0 transition-opacity duration-500",
                                                "opacity-[0.25]",
                                                // Desktop hover reveal
                                                "group-hover:opacity-[0.40]",
                                                // Mobile tap reveal
                                                "group-data-[revealed]:opacity-[0.40]",
                                                // Keyboard focus reveal
                                                "group-focus-visible:opacity-[0.40]",
                                                // Reduced motion
                                                "motion-reduce:transition-none motion-reduce:duration-0"
                                            )}
                                            style={{
                                                backgroundImage: `url(${highlight.bgImageSrc})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        />
                                        {/* Overlay for additional contrast control */}
                                        <div className={cn(
                                            "absolute inset-0 z-[1] transition-opacity duration-500",
                                            "bg-card/20",
                                            // Desktop hover reveal
                                            "group-hover:bg-card/10",
                                            // Mobile tap reveal
                                            "group-data-[revealed]:bg-card/10",
                                            // Keyboard focus reveal
                                            "group-focus-visible:bg-card/10",
                                            // Reduced motion
                                            "motion-reduce:transition-none motion-reduce:duration-0"
                                        )} />
                                    </>
                                )}

                                {/* Content Layer - wrapped in relative container with frosted glass backdrop */}
                                <div className={cn(
                                    "relative z-10 flex flex-col h-full rounded-lg p-6 -m-2 transition-all duration-500",
                                    "bg-white/75 backdrop-blur-[2px]",
                                    // Desktop hover reveal
                                    "group-hover:bg-white/60",
                                    // Mobile tap reveal
                                    "group-data-[revealed]:bg-white/60",
                                    // Keyboard focus reveal
                                    "group-focus-visible:bg-white/60",
                                    // Reduced motion
                                    "motion-reduce:transition-none motion-reduce:duration-0"
                                )}>
                                    <div className={cn(
                                        "h-2 w-12 rounded-full mb-6 transition-all duration-300",
                                        isHyper
                                            ? "bg-accent group-hover:w-20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                            : "bg-primary group-hover:w-20"
                                    )} />
                                    <h3 className={cn(
                                        "text-xl font-bold mb-4 text-card-foreground"
                                    )}>{highlight.title}</h3>
                                    <p className={cn(
                                        "leading-relaxed flex-grow text-muted-foreground"
                                    )}>{highlight.description}</p>

                                    {/* Use Case */}
                                    {highlight.useCase && (
                                        <div className={cn(
                                            "mt-6 pt-4 border-t text-sm border-border text-muted-foreground"
                                        )}>
                                            <span className="font-semibold block text-xs opacity-70 mb-1 uppercase tracking-wider">Uso común:</span>
                                            {highlight.useCase}
                                        </div>
                                    )}
                                </div>

                                {/* Badge - keep outside content wrapper, ensure it's on top */}
                                {highlight.badge && (
                                    <div className={cn(
                                        "absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full border shadow-sm z-20",
                                        isHyper
                                            ? "bg-accent/10 text-accent border-accent/20"
                                            : "bg-primary/10 text-primary border-primary/20"
                                    )}>
                                        {highlight.badge}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
