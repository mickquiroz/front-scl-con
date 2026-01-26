'use client';

import { ServiceSocialProof } from '@/config/services';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion, getStaggerDelay } from '@/lib/motion';

interface SocialProofSectionProps {
    data: ServiceSocialProof;
}

export function SocialProofSection({ data }: SocialProofSectionProps) {
    if (!data) return null;

    const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2);

    return (
        <section className="py-24 px-4 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div
                    ref={ref}
                    className={cn(
                        "text-center mb-16 transition-all duration-700 ease-out",
                        isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                    )}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {data.headline}
                    </h2>
                    <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
                </div>

                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {data.cases.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "bg-slate-900/40 border border-slate-800 rounded-xl p-8 hover:bg-slate-900/60 hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-1",
                                isVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                motion.transition
                            )}
                            style={getStaggerDelay(index, 100)}
                        >
                            <div className="text-cyan-500 text-sm font-bold uppercase tracking-wider mb-3">
                                {item.industry}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                                {item.title}
                            </h3>
                            <div className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                                {item.result}
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Testimonial & Logos split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Testimonial */}
                    {data.testimonial && (
                        <div className={cn(
                            "bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 rounded-2xl border border-slate-800 relative transition-all duration-700 ease-out delay-300",
                            isVisible ? motion.fadeIn.visible : motion.fadeIn.initial
                        )}>
                            <div className="text-cyan-500/20 absolute top-4 left-6 text-6xl font-serif">"</div>
                            <blockquote className="relative z-10 text-slate-300 text-lg italic mb-6 leading-relaxed">
                                {data.testimonial.quote}
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-500 border border-slate-700">
                                    {data.testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">{data.testimonial.author}</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-wide">{data.testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Trust/Logos (Placeholder for now as requested) */}
                    <div className={cn(
                        "text-center lg:text-left transition-all duration-700 ease-out delay-500",
                        isVisible ? motion.fadeIn.visible : motion.fadeIn.initial
                    )}>
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Empresas que confían en nosotros</h4>
                        <div className="grid grid-cols-3 gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for logos */}
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-12 bg-white/5 rounded flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
                                    <span className="text-xs text-slate-600 font-mono">LOGO {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
