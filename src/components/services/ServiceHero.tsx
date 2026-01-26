'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ServiceHero as ServiceHeroType } from '@/config/services';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion } from '@/lib/motion';
import { HeroVisual } from './HeroVisual';

interface ServiceHeroProps {
    hero: ServiceHeroType;
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function ServiceHero({ hero, variant = 'default' }: ServiceHeroProps) {
    const router = useRouter();
    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    // Staggered reveal for Hero elements
    const [titleRef, isTitleVisible] = useScrollReveal<HTMLHeadingElement>();
    const [textRef, isTextVisible] = useScrollReveal<HTMLParagraphElement>(0.1, '0px', true);
    const [btnRef, isBtnVisible] = useScrollReveal<HTMLDivElement>(0.1, '0px', true);

    return (
        <section className={cn(
            "relative overflow-hidden py-24 px-4 transition-colors duration-500",
            isHyper ? "bg-slate-950" : isSap ? "bg-[#0f172a]" : "bg-slate-900"
        )}>
            {/* Background elements */}
            {isHyper ? (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <HeroVisual />
                </>
            ) : isSap ? (
                // SAP Variant
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="max-w-3xl">
                    <h1
                        ref={titleRef}
                        className={cn(
                            "text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight transition-all duration-700 ease-out",
                            isTitleVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                            isHyper
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                : "text-white"
                        )}
                    >
                        {hero.headline}
                    </h1>
                    <p
                        ref={textRef}
                        className={cn(
                            "text-lg md:text-xl mb-6 max-w-2xl leading-relaxed transition-all duration-700 ease-out delay-100",
                            isTextVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                            isHyper ? "text-cyan-100/80 font-light" : "text-slate-300"
                        )}
                    >
                        {hero.subheadline}
                    </p>

                    {hero.targetAudience && (
                        <div
                            className={cn(
                                "mb-10 text-sm font-medium tracking-wide uppercase transition-all duration-700 ease-out delay-150",
                                isTextVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                isHyper ? "text-cyan-400" : "text-slate-400"
                            )}
                        >
                            <span className="opacity-70 mr-2">Para:</span>
                            {hero.targetAudience}
                        </div>
                    )}
                    <div
                        ref={btnRef}
                        className={cn(
                            "flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-200",
                            isBtnVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                        )}
                    >
                        <Link
                            href={hero.ctaPrimaryHref || '#cta'}
                            scroll={true}
                            className={cn(
                                "px-8 py-4 rounded-lg font-bold transition-all cursor-pointer relative overflow-hidden group flex items-center justify-center",
                                isHyper
                                    ? "bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(8,145,178,0.5)] border border-cyan-400/20"
                                    : isSap
                                        ? "bg-white text-slate-900 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5"
                                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20"
                            )}
                        >
                            <span className="relative z-10">{hero.ctaPrimary}</span>
                            {isHyper && <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />}
                        </Link>

                        {hero.ctaSecondary && (
                            hero.ctaSecondaryHref === '#roi-calculator' ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // 1. Update URL (visual + history)
                                        router.replace('#roi-calculator', { scroll: false });

                                        // 2. Dispatch custom event for immediate reaction
                                        // This bypasses Next.js sometimes swallowing hash changes on same-page
                                        window.dispatchEvent(new Event('roi-modal-trigger'));

                                        // 3. Fallback: also dispatch standard hashchange for good measure
                                        window.dispatchEvent(new Event('hashchange'));
                                    }}
                                    className={cn(
                                        "px-8 py-4 rounded-lg font-medium transition-all cursor-pointer",
                                        isHyper
                                            ? "bg-slate-900/50 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/80 hover:bg-cyan-950/50 hover:text-white backdrop-blur-sm"
                                            : "bg-transparent text-white border border-white/30 hover:bg-white/10"
                                    )}
                                >
                                    {hero.ctaSecondary}
                                </button>
                            ) : (
                                <Link
                                    href={hero.ctaSecondaryHref || '/contact'}
                                    scroll={true}
                                    className={cn(
                                        "px-8 py-4 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center",
                                        isHyper
                                            ? "bg-slate-900/50 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/80 hover:bg-cyan-950/50 hover:text-white backdrop-blur-sm"
                                            : "bg-transparent text-white border border-white/30 hover:bg-white/10"
                                    )}
                                >
                                    {hero.ctaSecondary}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
