'use client';

import { useState, useEffect, useCallback } from 'react';
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
    const [revealedCardIndex, setRevealedCardIndex] = useState<number | null>(null);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const testimonials = data.testimonials || [];
    const hasTestimonials = testimonials.length > 0;

    // Auto-advance carousel
    useEffect(() => {
        if (!hasTestimonials || isPaused || testimonials.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 7000); // 7 seconds

        return () => clearInterval(interval);
    }, [hasTestimonials, isPaused, testimonials.length]);

    const goToTestimonial = useCallback((index: number) => {
        setCurrentTestimonialIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentTestimonialIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    }, [testimonials.length]);

    const goToNext = useCallback(() => {
        setCurrentTestimonialIndex((prev) =>
            (prev + 1) % testimonials.length
        );
    }, [testimonials.length]);

    // Swipe handlers
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrevious();
        }
    };

    // Keyboard navigation for carousel
    const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNext();
        }
    };

    // Card reveal handlers
    const handleCardToggle = (index: number) => {
        setRevealedCardIndex(revealedCardIndex === index ? null : index);
    };

    const handleCardKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardToggle(index);
        }
    };

    return (
        <section className={cn(
            "py-24 px-4 bg-background border-t border-border overflow-hidden relative transition-all duration-700 ease-out",
            isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
        )}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div
                    ref={ref}
                    className={cn(
                        "text-center mb-16 transition-all duration-700 ease-out",
                        isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                    )}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {data.headline}
                    </h2>
                    <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
                </div>

                {/* Case Studies Grid with Background Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {data.cases.map((item, index) => {
                        const isRevealed = revealedCardIndex === index;

                        return (
                            <button
                                key={index}
                                onClick={() => handleCardToggle(index)}
                                onKeyDown={(e) => handleCardKeyDown(e, index)}
                                aria-label={`${item.industry}: ${item.title}. ${item.result}. Presiona para revelar imagen de fondo.`}
                                aria-pressed={isRevealed}
                                className={cn(
                                    "p-8 rounded-xl transition-all flex flex-col h-full group text-left w-full",
                                    "relative overflow-hidden cursor-pointer",
                                    motion.transition,
                                    isVisible ? motion.fadeUp.visible : motion.fadeUp.initial,
                                    motion.hoverLift,
                                    "bg-card border border-border hover:shadow-card-hover",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                    "motion-reduce:transition-none"
                                )}
                                style={getStaggerDelay(index, 100)}
                                data-revealed={isRevealed || undefined}
                            >
                                {/* Background Image Layer */}
                                {item.bgImageSrc && (
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
                                                backgroundImage: `url(${item.bgImageSrc})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        />
                                        {/* Overlay for contrast control */}
                                        <div className={cn(
                                            "absolute inset-0 z-[1] transition-opacity duration-500",
                                            "bg-card/20",
                                            "group-hover:bg-card/10",
                                            "group-data-[revealed]:bg-card/10",
                                            "group-focus-visible:bg-card/10",
                                            "motion-reduce:transition-none motion-reduce:duration-0"
                                        )} />
                                    </>
                                )}

                                {/* Content Layer with frosted glass backdrop */}
                                <div className={cn(
                                    "relative z-10 flex flex-col h-full rounded-lg p-6 -m-2 transition-all duration-500",
                                    "bg-white/75 backdrop-blur-[2px]",
                                    "group-hover:bg-white/60",
                                    "group-data-[revealed]:bg-white/60",
                                    "group-focus-visible:bg-white/60",
                                    "motion-reduce:transition-none motion-reduce:duration-0"
                                )}>
                                    {/* Decorative accent bar */}
                                    <div className={cn(
                                        "h-2 w-12 rounded-full mb-6 transition-all duration-300",
                                        "bg-accent group-hover:w-20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    )} />

                                    <div className="text-accent text-sm font-bold uppercase tracking-wider mb-3">
                                        {item.industry}
                                    </div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                                        {item.title}
                                    </h3>
                                    <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                        {item.result}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                                        {item.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Testimonials Carousel */}
                {hasTestimonials && (
                    <div
                        className={cn(
                            "max-w-4xl mx-auto transition-all duration-700 ease-out delay-300",
                            isVisible ? motion.fadeIn.visible : motion.fadeIn.initial
                        )}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onKeyDown={handleCarouselKeyDown}
                        role="region"
                        aria-label="Testimonios de clientes"
                        aria-live="polite"
                        tabIndex={0}
                    >
                        <div className="bg-card p-8 md:p-12 rounded-2xl border border-border relative shadow-sm">
                            {/* Quote Icon */}
                            <div className="text-accent/20 absolute top-6 left-8 text-6xl font-serif leading-none">"</div>

                            {/* Testimonial Content */}
                            <div className="relative z-10 min-h-[180px] flex flex-col justify-between">
                                <blockquote
                                    className="text-muted-foreground text-lg md:text-xl italic mb-8 leading-relaxed"
                                    key={currentTestimonialIndex}
                                >
                                    <span className={cn(
                                        "block transition-opacity duration-500",
                                        "motion-reduce:transition-none"
                                    )}>
                                        {testimonials[currentTestimonialIndex].quote}
                                    </span>
                                </blockquote>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-accent border border-border text-lg">
                                            {testimonials[currentTestimonialIndex].author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-foreground font-bold text-base">
                                                {testimonials[currentTestimonialIndex].author}
                                            </div>
                                            <div className="text-muted-foreground text-sm">
                                                {testimonials[currentTestimonialIndex].role}
                                            </div>
                                            {testimonials[currentTestimonialIndex].company && (
                                                <div className="text-accent text-xs font-semibold uppercase tracking-wider mt-1">
                                                    {testimonials[currentTestimonialIndex].company}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Navigation Arrows (Desktop) */}
                                    {testimonials.length > 1 && (
                                        <div className="hidden md:flex items-center gap-2">
                                            <button
                                                onClick={goToPrevious}
                                                aria-label="Testimonio anterior"
                                                className={cn(
                                                    "w-10 h-10 rounded-full border border-border bg-background",
                                                    "hover:bg-accent hover:text-white hover:border-accent",
                                                    "transition-all duration-200 flex items-center justify-center",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                )}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={goToNext}
                                                aria-label="Siguiente testimonio"
                                                className={cn(
                                                    "w-10 h-10 rounded-full border border-border bg-background",
                                                    "hover:bg-accent hover:text-white hover:border-accent",
                                                    "transition-all duration-200 flex items-center justify-center",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                                )}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dot Indicators */}
                            {testimonials.length > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-8">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToTestimonial(index)}
                                            aria-label={`Ir al testimonio ${index + 1}`}
                                            aria-current={index === currentTestimonialIndex}
                                            className={cn(
                                                "h-2 rounded-full transition-all duration-300",
                                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                                index === currentTestimonialIndex
                                                    ? "w-8 bg-accent"
                                                    : "w-2 bg-border hover:bg-accent/50"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Swipe Hint */}
                        {testimonials.length > 1 && (
                            <div className="md:hidden text-center mt-4 text-xs text-muted-foreground">
                                Desliza para ver más testimonios
                            </div>
                        )}
                    </div>
                )}

                {/* Trust/Logos (Optional legacy support) */}
                {data.logos && data.logos.length > 0 && (
                    <div className={cn(
                        "text-center mt-16 transition-all duration-700 ease-out delay-500",
                        isVisible ? motion.fadeIn.visible : motion.fadeIn.initial
                    )}>
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Empresas que confían en nosotros</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {data.logos.map((logo, i) => (
                                <div key={i} className="flex items-center justify-center p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                    <img
                                        src={logo}
                                        alt="Client logo"
                                        className="max-h-8 w-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
