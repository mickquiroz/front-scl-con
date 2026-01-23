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
        <section className={cn(
            "py-24 px-4 text-center transition-colors duration-500",
            isHyper ? "bg-slate-950 border-t border-slate-900" : isSap ? "bg-[#0a192f] border-t border-blue-900/30" : "bg-slate-900"
        )}>
            <div
                ref={ref}
                className={cn(
                    "max-w-4xl mx-auto transition-all duration-700 ease-out",
                    isVisible ? motion.fadeUp.visible : motion.fadeUp.initial
                )}
            >
                <h2 className={cn(
                    "text-3xl md:text-4xl font-bold mb-6",
                    isHyper ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white" : "text-white"
                )}>
                    ¿Listo para transformar su negocio?
                </h2>
                <p className={cn(
                    "text-lg mb-10 max-w-2xl mx-auto",
                    isHyper ? "text-cyan-100/70" : "text-slate-300"
                )}>
                    Conversemos sobre cómo nuestras soluciones pueden optimizar sus operaciones y generar valor real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" passHref>
                        <button className={cn(
                            "px-8 py-4 rounded-lg font-bold transition shadow-lg cursor-pointer",
                            isHyper
                                ? "bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                : isSap
                                    ? "bg-white text-[#0a192f] hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5"
                                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/40"
                        )}>
                            Iniciar Conversación
                        </button>
                    </Link>
                    <Link href="/services" passHref>
                        <button className={cn(
                            "px-8 py-4 border rounded-lg font-medium transition cursor-pointer",
                            isHyper
                                ? "bg-slate-900/50 border-cyan-500/30 text-cyan-200 hover:bg-cyan-950/50 hover:border-cyan-400 group"
                                : "bg-transparent border-slate-700 text-white hover:bg-slate-800"
                        )}>
                            Explorar Otros Servicios
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
