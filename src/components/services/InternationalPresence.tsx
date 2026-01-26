import { countriesPresence } from '@/config/services';
import { cn } from '@/lib/utils'; // Assuming cn utility exists from previous context

interface InternationalPresenceProps {
    variant?: 'default' | 'hyperautomation';
}

export function InternationalPresence({ variant = 'default' }: InternationalPresenceProps) {
    const isHyper = variant === 'hyperautomation';

    return (
        <section className={cn(
            "py-16 px-4 text-center border-t",
            isHyper ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
        )}>
            <div className="max-w-4xl mx-auto">
                <h3 className={cn(
                    "text-lg font-semibold mb-8",
                    isHyper ? "text-slate-400 uppercase tracking-widest" : "text-slate-500"
                )}>
                    Presencia Internacional
                </h3>

                <div className="flex flex-col gap-6 items-center">
                    {/* Hubs Row */}
                    <div className="flex items-center gap-4">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", isHyper ? "text-slate-600" : "text-slate-400")}>Hubs:</span>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Chile', 'Peru'].map((country) => (
                                <span key={country} className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium border cursor-default",
                                    isHyper
                                        ? "bg-slate-800 text-cyan-400 border-cyan-500/30"
                                        : "bg-white text-slate-800 border-slate-300"
                                )}>
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Rest Coverage */}
                    <div className="flex items-center gap-4">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", isHyper ? "text-slate-600" : "text-slate-400")}>Cobertura:</span>
                        <div className="flex flex-wrap justify-center gap-3">
                            {countriesPresence.filter(c => c !== 'Chile' && c !== 'Peru').map((country) => (
                                <span
                                    key={country}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-default",
                                        isHyper
                                            ? "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                                            : "bg-white text-slate-600 border border-slate-200"
                                    )}
                                >
                                    {country}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
