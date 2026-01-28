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
            "py-20 px-4 transition-colors duration-500 bg-background"
        )}>
            <div className="max-w-7xl mx-auto">
                <h2 className={cn(
                    "text-3xl font-bold mb-16 text-center text-foreground"
                )}>
                    Nuestro Proceso
                </h2>

                <div className="relative" ref={ref}>
                    {/* Connector Line (Desktop) */}
                    <div className={cn(
                        "hidden md:block absolute top-[24px] left-0 right-0 h-0.5 z-0 mx-12 transition-all duration-1000 ease-out origin-left",
                        isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                        isHyper ? "bg-border" : "bg-border"
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
                                            ? "bg-card text-primary ring-4 ring-background border border-primary/20 group-hover:border-primary group-hover:shadow-lg"
                                            : "bg-primary text-primary-foreground ring-4 ring-white"
                                    )}>
                                        {index + 1}
                                    </div>
                                    {/* Connector Line (Mobile) - only between items */}
                                    {index < process.length - 1 && (
                                        <div className={cn(
                                            "md:hidden h-0.5 flex-grow w-12 ml-4 bg-border"
                                        )}></div>
                                    )}
                                </div>

                                <div className="md:text-center">
                                    <h3 className={cn(
                                        "text-lg font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors"
                                    )}>{step.title}</h3>
                                    <p className={cn(
                                        "text-sm leading-relaxed text-muted-foreground"
                                    )}>{step.description}</p>

                                    {/* Deliverables & Duration (Hyperautomation) */}
                                    {(step.deliverables || step.duration) && isHyper && (
                                        <div className="mt-4 pt-4 border-t border-border text-xs">
                                            {step.deliverables && (
                                                <div className="mb-2">
                                                    <span className="text-accent font-semibold block uppercase text-[10px] tracking-wider mb-0.5">Entregable:</span>
                                                    <span className="text-muted-foreground">{step.deliverables}</span>
                                                </div>
                                            )}
                                            {step.duration && (
                                                <div>
                                                    <span className="text-accent font-semibold block uppercase text-[10px] tracking-wider mb-0.5">Duración:</span>
                                                    <span className="text-muted-foreground">{step.duration}</span>
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
