'use client';

import { ServiceStat } from '@/config/services';
import { cn } from '@/lib/utils';
import { Counter } from '@/components/ui/Counter';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, getStaggerDelay } from '@/lib/motion';

interface StatsStripProps {
    stats: ServiceStat[];
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function StatsStrip({ stats, variant = 'default' }: StatsStripProps) {
    if (!stats || stats.length === 0) return null;

    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2);

    return (
        <section ref={ref} className={cn(
            "py-12 border-b transition-colors duration-300",
            isHyper ? "bg-slate-950 border-slate-800" : isSap ? "bg-white border-slate-200" : "bg-white border-slate-100"
        )}>
            <div className="max-w-7xl mx-auto px-4">
                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x",
                    stats.length === 3 ? "lg:grid-cols-3" : "",
                    isHyper ? "divide-slate-800" : isSap ? "divide-slate-200" : "divide-slate-100"
                )}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-center px-4 py-4 md:py-0 transition-opacity duration-700 ease-out",
                                isVisible ? motion.fadeIn.visible : motion.fadeIn.initial
                            )}
                            style={getStaggerDelay(index)}
                        >
                            <div className={cn(
                                "text-4xl md:text-5xl font-bold mb-2 tracking-tight flex justify-center",
                                isHyper
                                    ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                                    : isSap
                                        ? "text-[#0a192f]"
                                        : "text-blue-600"
                            )}>
                                <Counter value={stat.value} />
                            </div>
                            <div className={cn(
                                "font-medium text-sm md:text-base uppercase tracking-wide",
                                isHyper ? "text-slate-400" : isSap ? "text-slate-500 font-semibold" : "text-slate-600"
                            )}>
                                {stat.label}
                            </div>
                            {stat.sublabel && (
                                <div className={cn(
                                    "text-xs mt-1",
                                    isHyper ? "text-slate-500" : "text-slate-400"
                                )}>
                                    {stat.sublabel}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
