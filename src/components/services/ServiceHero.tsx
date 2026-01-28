'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { ServiceHero as ServiceHeroType } from '@/config/services';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion } from '@/lib/motion';
import { HeroROIButton } from './HeroROIButton';
import { HeroVisual } from './HeroVisual';

interface ServiceHeroProps {
    hero: ServiceHeroType;
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function ServiceHero({ hero, variant = 'default' }: ServiceHeroProps) {
    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    // Staggered reveal for Hero elements
    const [titleRef, isTitleVisible] = useScrollReveal<HTMLHeadingElement>();
    const [textRef, isTextVisible] = useScrollReveal<HTMLParagraphElement>(0.1, '0px', true);
    const [btnRef, isBtnVisible] = useScrollReveal<HTMLDivElement>(0.1, '0px', true);
    // Media reveal (longer duration)
    const [mediaRef, isMediaVisible] = useScrollReveal<HTMLDivElement>(0.1, '0px', true);

    return (
        <section className={cn(
            "relative overflow-hidden pt-28 pb-20 px-4 transition-colors duration-500 bg-background lg:pt-40 lg:pb-32",
            isHyper ? "bg-slate-50/50" : ""
        )}>
            {/* Background elements */}
            {isHyper ? (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                </>
            ) : isSap ? (
                // SAP Variant
                <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-50 to-slate-100" />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                <div className={cn(
                    "grid gap-12 lg:gap-8 items-center",
                    isHyper ? "lg:grid-cols-2" : "max-w-3xl mx-auto text-center" // Keep original centered layout for others, split for Hyper
                )}>
                    {/* Left Content (or Centered for others) */}
                    <div className={cn(isHyper ? "text-left" : "text-center")}>
                        <h1
                            ref={titleRef}
                            className={cn(
                                "text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight transition-all duration-700 ease-out",
                                isTitleVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                isHyper
                                    ? "text-slate-900 drop-shadow-sm"
                                    : "text-foreground"
                            )}
                        >
                            {isHyper ? (
                                <>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500">
                                        {hero.headline.split(' ').slice(0, 2).join(' ')}
                                    </span>
                                    <br />
                                    <span>
                                        {hero.headline.split(' ').slice(2).join(' ')}
                                    </span>
                                </>
                            ) : hero.headline}
                        </h1>
                        <p
                            ref={textRef}
                            className={cn(
                                "text-lg md:text-xl mb-6 leading-relaxed transition-all duration-700 ease-out delay-100",
                                isTitleVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                isHyper ? "text-slate-600 font-normal max-w-xl" : "text-muted-foreground max-w-2xl mx-auto"
                            )}
                        >
                            {hero.subheadline}
                        </p>

                        {hero.targetAudience && (
                            <div
                                className={cn(
                                    "mb-10 text-sm font-medium tracking-wide uppercase transition-all duration-700 ease-out delay-150",
                                    isTextVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                    isHyper ? "text-orange-600" : "text-muted-foreground"
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
                                isBtnVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                isHyper ? "" : "justify-center"
                            )}
                        >
                            <Link
                                href={hero.ctaPrimaryHref || '#cta'}
                                scroll={true}
                                className={cn(
                                    "px-8 py-4 rounded-lg font-bold transition-all cursor-pointer relative overflow-hidden group flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                                    isHyper
                                        ? "bg-orange-500 text-white hover:bg-orange-600"
                                        : "bg-primary text-primary-foreground hover:bg-primary-600"
                                )}
                            >
                                <span className="relative z-10">{hero.ctaPrimary}</span>
                                {/* Subtle hover gradient */}
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>

                            {hero.ctaSecondary && (
                                hero.ctaSecondaryHref === '#roi-calculator' ? (
                                    <HeroROIButton
                                        className={cn(
                                            isHyper
                                                ? "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm"
                                                : "bg-transparent text-primary-700 border border-primary/30"
                                        )}
                                    >
                                        {hero.ctaSecondary}
                                    </HeroROIButton>
                                ) : (
                                    <Link
                                        href={hero.ctaSecondaryHref || '/contact'}
                                        scroll={true}
                                        className={cn(
                                            "px-8 py-4 rounded-lg font-medium transition-all cursor-pointer flex items-center justify-center hover:bg-slate-100",
                                            isHyper
                                                ? "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm"
                                                : "bg-transparent text-primary-700 border border-primary/30"
                                        )}
                                    >
                                        {hero.ctaSecondary}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Right Media (Video) - Only for Hyperautomation */}
                    {isHyper && (
                        <div
                            ref={mediaRef}
                            className={cn(
                                "relative w-full max-w-lg mx-auto lg:max-w-none transition-all duration-[800ms] ease-out delay-300 lg:h-[500px] flex items-center justify-center",
                                isMediaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-1">
                                <video
                                    src="/videos/work.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover rounded-xl"
                                    poster="/images/hero-poster.jpg"
                                    width={600}
                                    height={400}
                                />
                                {/* Optional: Decorative elements behind/around */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-3xl rounded-full" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
