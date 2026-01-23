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
                <div className="flex flex-wrap justify-center gap-3">
                    {countriesPresence.map((country) => (
                        <span
                            key={country}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-default",
                                isHyper
                                    ? "bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                    : "bg-white text-slate-700 border border-slate-200 shadow-sm"
                            )}
                        >
                            {country}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
