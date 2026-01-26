'use client';

import { ServiceProcessStep } from '@/config/services';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, getStaggerDelay } from '@/lib/motion';

interface ProcessTimelineProps {
    process?: ServiceProcessStep[];
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function ProcessTimeline({ process, variant = 'default' }: ProcessTimelineProps) {
    if (!process || process.length === 0) return null;

    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2);

    return (
        <section className={cn(
            "py-20 px-4 transition-colors duration-500",
            isHyper ? "bg-slate-900 border-t border-slate-800" : isSap ? "bg-slate-50 border-t border-slate-200" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={cn(
                    "text-3xl font-bold mb-16 text-center",
                    isHyper ? "text-white" : isSap ? "text-[#0a192f] tracking-tight" : "text-slate-900"
                )}>
                    Nuestro Proceso
                </h2>

                <div className="relative" ref={ref}>
                    {/* Connector Line (Desktop) */}
                    <div className={cn(
                        "hidden md:block absolute top-[24px] left-0 right-0 h-0.5 z-0 mx-12 transition-all duration-1000 ease-out origin-left",
                        isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                        isHyper ? "bg-slate-800" : isSap ? "bg-blue-100" : "bg-slate-100"
                    )}></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {process.map((step, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex flex-col md:items-center relative group transition-all duration-700 ease-out",
                                    isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                                )}
                                style={getStaggerDelay(index, 150)}
                            >
                                {/* Number Indicator */}
                                <div className="flex items-center mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 transition-all duration-300",
                                        isHyper
                                            ? "bg-slate-900 text-cyan-400 ring-4 ring-slate-800 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                            : isSap
                                                ? "bg-[#0a192f] text-white ring-4 ring-white group-hover:scale-110"
                                                : "bg-blue-600 text-white ring-4 ring-white"
                                    )}>
                                        {index + 1}
                                    </div>
                                    {/* Connector Line (Mobile) - only between items */}
                                    {index < process.length - 1 && (
                                        <div className={cn(
                                            "md:hidden h-0.5 flex-grow w-12 ml-4",
                                            isHyper ? "bg-slate-800" : "bg-slate-100"
                                        )}></div>
                                    )}
                                </div>

                                <div className="md:text-center">
                                    <h3 className={cn(
                                        "text-lg font-bold mb-3",
                                        isHyper ? "text-white group-hover:text-cyan-300 transition-colors" : isSap ? "text-[#0a192f]" : "text-slate-900"
                                    )}>{step.title}</h3>
                                    <p className={cn(
                                        "text-sm leading-relaxed",
                                        isHyper ? "text-slate-400" : isSap ? "text-slate-700" : "text-slate-600"
                                    )}>{step.description}</p>

                                    {/* Deliverables & Duration (Hyperautomation) */}
                                    {(step.deliverables || step.duration) && isHyper && (
                                        <div className="mt-4 pt-4 border-t border-slate-800 text-xs">
                                            {step.deliverables && (
                                                <div className="mb-2">
                                                    <span className="text-cyan-500 font-semibold block uppercase text-[10px] tracking-wider mb-0.5">Entregable:</span>
                                                    <span className="text-slate-300">{step.deliverables}</span>
                                                </div>
                                            )}
                                            {step.duration && (
                                                <div>
                                                    <span className="text-cyan-500 font-semibold block uppercase text-[10px] tracking-wider mb-0.5">Duración:</span>
                                                    <span className="text-slate-300">{step.duration}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
