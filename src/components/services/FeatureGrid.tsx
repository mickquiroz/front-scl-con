'use client';

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

    return (
        <section className={cn(
            "py-20 px-4 transition-colors duration-500",
            isHyper ? "bg-slate-950" : "bg-slate-50"
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={cn(
                    "text-3xl font-bold mb-12 text-center",
                    isHyper ? "text-white" : isSap ? "text-[#0a192f] tracking-tight" : "text-slate-900"
                )}>
                    Nuestras Capacidades
                </h2>
                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    {highlights.map((highlight, index) => (
                        <div
                            key={index}
                            className={cn(
                                "p-8 rounded-xl transition-all flex flex-col h-full group",
                                motion.transition,
                                // Base visible state handling for fade-in
                                isVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                // Hover Lift
                                motion.hoverLift,
                                isHyper
                                    ? "bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-sm"
                                    : isSap
                                        ? "bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                                        : "bg-white shadow-sm hover:shadow-md border border-slate-100"
                            )}
                            style={getStaggerDelay(index)}
                        >
                            <div className={cn(
                                "h-2 w-12 rounded-full mb-6 transition-all duration-300",
                                isHyper
                                    ? "bg-cyan-500 group-hover:w-20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    : isSap
                                        ? "bg-[#0a192f] group-hover:w-20"
                                        : "bg-blue-600"
                            )} />
                            <h3 className={cn(
                                "text-xl font-bold mb-4",
                                isHyper ? "text-white group-hover:text-cyan-200" : isSap ? "text-[#0a192f]" : "text-slate-900"
                            )}>{highlight.title}</h3>
                            <p className={cn(
                                "leading-relaxed flex-grow",
                                isHyper ? "text-slate-400 group-hover:text-slate-300" : isSap ? "text-slate-700" : "text-slate-600"
                            )}>{highlight.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
