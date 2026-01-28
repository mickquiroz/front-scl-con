'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Calculator, ArrowRight, DollarSign, Clock, Users } from 'lucide-react';
// import { Button } from '@/components/ui'; // Removed unused import
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { calculateROI, formatCurrency, generateContactLink, ROIInputs } from '@/lib/roi-utils';

interface ROICalculatorModalProps {
    initialIsOpen?: boolean;
}

export function ROICalculatorModal({ initialIsOpen = false }: ROICalculatorModalProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const [mounted, setMounted] = useState(false);

    // Sync with prop if it changes (e.g. navigation)
    useEffect(() => {
        setIsOpen(initialIsOpen);
    }, [initialIsOpen]);

    // Initial state
    const [inputs, setInputs] = useState<ROIInputs>({
        personnel: 3,
        hoursPerWeek: 15,
        hourlyCost: 20,
        automatablePercentage: 60
    });

    useEffect(() => {
        setMounted(true);

        // Cleanup body scroll if component unmounts while open
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle body scroll locking based on open state
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const close = () => {
        setIsOpen(false);
        // Clean URL by navigating to the base path
        router.replace(pathname, { scroll: false });
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
            <div
                className={cn(
                    "fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300",
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
                {/* Backdrop - lighter for light theme */}
                <div className="absolute inset-0 bg-slate-900/40 transition-opacity backdrop-blur-md" />

                {/* Modal Content - Light Theme */}
                <div
                    className={cn(
                        "relative bg-white border border-slate-200/60 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden transition-all duration-300 transform",
                        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    )}
                >
                    {/* Header */}
                    <div className="bg-slate-50/80 p-6 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 text-primary-600 mb-1">
                                <Calculator className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">Calculadora ROI</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Estima tu potencial de ahorro</h2>
                            <p className="text-slate-500 text-sm mt-1">Descubre cuánto podrías ahorrar automatizando procesos manuales.</p>
                        </div>
                        <button
                            onClick={close}
                            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
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
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-primary-500" /> Personas involucradas
                                    </label>
                                    <input
                                        type="number"
                                        name="personnel"
                                        value={inputs.personnel}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary-500" /> Horas/semana (manuales)
                                    </label>
                                    <input
                                        type="number"
                                        name="hoursPerWeek"
                                        value={inputs.hoursPerWeek}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Por persona</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-primary-500" /> Costo hora promedio ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="hourlyCost"
                                        value={inputs.hourlyCost}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center relative overflow-hidden group hover:border-primary-200 transition-colors">
                            {/* Texture/Gradient bg */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60" />

                            <div className="text-center mb-6 relative z-10">
                                <span className="text-slate-500 text-sm font-medium">Ahorro Anual Estimado</span>
                                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 mt-2">
                                    {formatCurrency(results.annualSavings)}
                                </div>
                                <div className="text-sm text-primary-600 font-medium mt-1">
                                    + {Math.round(results.hoursSavedMonth)}h liberadas al mes
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 relative z-10">
                                <div className="flex justify-between text-sm py-2 border-b border-slate-200">
                                    <span className="text-slate-600">Ahorro Mensual</span>
                                    <span className="text-slate-900 font-bold">{formatCurrency(results.monthlySavings)}</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-slate-200">
                                    <span className="text-slate-600">% Automatizable (Est.)</span>
                                    <span className="text-slate-900 font-bold">{inputs.automatablePercentage}%</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
                                <p className="text-xs text-blue-700 text-center leading-relaxed">
                                    * Estimación referencial basada en automatización del {inputs.automatablePercentage}%. Requiere diagnóstico para confirmar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-end items-center">
                        <button
                            onClick={close}
                            className="text-slate-500 hover:text-slate-800 text-sm font-medium px-4 py-2 transition-colors"
                        >
                            Cancelar
                        </button>
                        <Link
                            href={generateContactLink(inputs, results)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-6 py-3 text-base bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Solicitar diagnóstico con estos datos <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
