'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { motion } from '@/lib/motion';

interface CTASectionProps {
    variant?: 'default' | 'hyperautomation' | 'sap';
}

export function CTASection({ variant = 'default' }: CTASectionProps) {
    const isHyper = variant === 'hyperautomation';
    const isSap = variant === 'sap';

    const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2);

    return (
        <section id="cta" className={cn(
            "py-24 px-4 text-center transition-colors duration-500 bg-primary"
        )}>
            <div
                ref={ref}
                className={cn(
                    "max-w-4xl mx-auto transition-all duration-700 ease-out",
                    isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                )}
            >
                <h2 className={cn(
                    "text-3xl md:text-4xl font-bold mb-6 text-primary-foreground"
                )}>
                    ¿Listo para transformar su negocio?
                </h2>
                <p className={cn(
                    "text-lg mb-10 max-w-2xl mx-auto text-primary-foreground/90"
                )}>
                    Conversemos sobre cómo nuestras soluciones pueden optimizar sus operaciones y generar valor real.
                </p>

                {/* Risk-free Reassurance (Hyperautomation) */}
                {isHyper && (
                    <div className="mb-8">
                        <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
                            Diagnóstico inicial sin costo
                        </div>
                        <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 text-sm text-primary-foreground/80 mb-2">
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-cta">✓</span> Evaluación → roadmap → quick wins
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-cta">✓</span> Sin interrumpir operación
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-cta">✓</span> Acompañamiento post-producción
                            </li>
                        </ul>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" passHref>
                        <button className={cn(
                            "px-8 py-4 rounded-lg font-bold transition shadow-lg cursor-pointer shadow-button hover:shadow-button-hover bg-cta text-cta-foreground hover:-translate-y-0.5"
                        )}>
                            Iniciar Conversación
                        </button>
                    </Link>
                    <Link href="/services" passHref>
                        <button className={cn(
                            "px-8 py-4 border rounded-lg font-medium transition cursor-pointer bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                        )}>
                            Explorar Otros Servicios
                        </button>
                    </Link>
                </div>
            </div>
        </section >
    );
}
