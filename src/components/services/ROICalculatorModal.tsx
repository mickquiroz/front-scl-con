'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { X, Calculator, ArrowRight, DollarSign, Clock, Users } from 'lucide-react';
// import { Button } from '@/components/ui'; // Removed unused import
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { calculateROI, formatCurrency, generateContactLink, ROIInputs } from '@/lib/roi-utils';

export function ROICalculatorModal() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initial state
    const [inputs, setInputs] = useState<ROIInputs>({
        personnel: 3,
        hoursPerWeek: 15,
        hourlyCost: 20,
        automatablePercentage: 60
    });

    const checkHash = useCallback(() => {
        setIsOpen(window.location.hash === '#roi-calculator');
    }, []);

    useEffect(() => {
        setMounted(true);
        // Check initial hash
        checkHash();

        // Listen for hash changes
        window.addEventListener('hashchange', checkHash);

        // Also listen for popstate (back button)
        window.addEventListener('popstate', checkHash);

        // Custom event for deterministic triggering from other components
        window.addEventListener('roi-modal-trigger', checkHash);

        return () => {
            window.removeEventListener('hashchange', checkHash);
            window.removeEventListener('popstate', checkHash);
            window.removeEventListener('roi-modal-trigger', checkHash);
            document.body.style.overflow = 'auto';
        };
    }, [checkHash]);

    // Handle body scroll locking based on open state
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const close = () => {
        // Optimistic close
        setIsOpen(false);
        // Remove hash using Next.js router
        const params = new URLSearchParams(searchParams.toString());
        const query = params.toString();
        // Construct URL without hash
        const url = query ? `${pathname}?${query}` : pathname;

        // Using replace to cleanly remove hash without adding to history stack
        // This is safer than history.replaceState and keeps Next.js sync
        router.replace(url, { scroll: false });
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: Math.max(0, Number(value))
        }));
    };

    // Calculations
    const results = useMemo(() => calculateROI(inputs), [inputs]);

    if (!mounted) return null;

    return (
        <>
            {/* Virtual anchor to prevent browser scroll jump issues */}
            <div id="roi-calculator" className="sr-only" aria-hidden="true" />

            <div
                className={cn(
                    "fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 backdrop-blur-sm",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
                onClick={handleBackdropClick}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') close();
                }}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-slate-950/80 transition-opacity" />

                {/* Modal Content */}
                <div
                    className={cn(
                        "relative bg-slate-900 border border-cyan-500/20 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden transition-all duration-300 transform",
                        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    )}
                >
                    {/* Header */}
                    <div className="bg-slate-800/50 p-6 border-b border-slate-700/50 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 text-cyan-400 mb-1">
                                <Calculator className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">Calculadora ROI</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Estima tu potencial de ahorro</h2>
                            <p className="text-slate-400 text-sm mt-1">Descubre cuánto podrías ahorrar automatizando procesos manuales.</p>
                        </div>
                        <button
                            onClick={close}
                            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                            aria-label="Cerrar"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-cyan-500" /> Personas involucradas
                                    </label>
                                    <input
                                        type="number"
                                        name="personnel"
                                        value={inputs.personnel}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-cyan-500" /> Horas/semana (manuales)
                                    </label>
                                    <input
                                        type="number"
                                        name="hoursPerWeek"
                                        value={inputs.hoursPerWeek}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Por persona</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-cyan-500" /> Costo hora promedio ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="hourlyCost"
                                        value={inputs.hourlyCost}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="text-center mb-6 relative z-10">
                                <span className="text-slate-400 text-sm">Ahorro Anual Estimado</span>
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mt-2">
                                    {formatCurrency(results.annualSavings)}
                                </div>
                                <div className="text-sm text-cyan-300/80 mt-1">
                                    + {Math.round(results.hoursSavedMonth)}h liberadas al mes
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 relative z-10">
                                <div className="flex justify-between text-sm py-2 border-b border-slate-800">
                                    <span className="text-slate-400">Ahorro Mensual</span>
                                    <span className="text-white font-medium">{formatCurrency(results.monthlySavings)}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-slate-800">
                                    <span className="text-slate-400">% Automatizable (Est.)</span>
                                    <span className="text-white font-medium">{inputs.automatablePercentage}%</span>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/20 mb-2">
                                <p className="text-xs text-blue-200 text-center">
                                    * Estimación referencial basada en automatización del {inputs.automatablePercentage}%. Requiere diagnóstico para confirmar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-4 justify-end items-center">
                        <button
                            onClick={close}
                            className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2 transition-colors"
                        >
                            Cancelar
                        </button>
                        <Link
                            href={generateContactLink(inputs, results)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-6 py-3 text-base bg-cyan-600 hover:bg-cyan-500 text-white border-0 shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:bg-cyan-700 active:translate-y-0"
                        >
                            Solicitar diagnóstico con estos datos <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
