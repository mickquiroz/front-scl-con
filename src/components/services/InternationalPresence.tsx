import { internationalPresence } from '@/config/services';
import { cn } from '@/lib/utils';

interface InternationalPresenceProps {
    variant?: 'default' | 'hyperautomation';
}

export function InternationalPresence({ variant = 'default' }: InternationalPresenceProps) {
    const isHyper = variant === 'hyperautomation';

    // Emoji font stack to ensure flags render correctly across Windows/Linux/older browsers
    const flagFontInfo = {
        fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif'
    };

    return (
        <section className={cn(
            "py-16 px-4 text-center border-t",
            isHyper ? "bg-background border-border" : "bg-slate-50 border-slate-200"
        )}>
            <div className="max-w-4xl mx-auto">
                <h3 className={cn(
                    "text-lg font-semibold mb-8",
                    isHyper ? "text-muted-foreground uppercase tracking-widest" : "text-slate-500"
                )}>
                    Presencia Internacional
                </h3>

                <div className="flex flex-col gap-6 items-center">
                    {/* Hubs Row */}
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", isHyper ? "text-muted-foreground" : "text-slate-400")}>
                            Hubs:
                        </span>
                        <div className="flex flex-wrap justify-center gap-3">
                            {internationalPresence.hubs.map((hub) => (
                                <span key={hub.code} className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium border cursor-default flex items-center gap-2",
                                    isHyper
                                        ? "bg-accent/10 text-accent border-accent/20"
                                        : "bg-white text-slate-800 border-slate-300"
                                )}>
                                    <span style={flagFontInfo} className="text-base leading-none" role="img" aria-label={`Bandera de ${hub.label}`}>
                                        {hub.flagEmoji}
                                    </span>
                                    {hub.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Coverage Row */}
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span className={cn("text-xs font-bold uppercase tracking-wider", isHyper ? "text-muted-foreground" : "text-slate-400")}>
                            Cobertura:
                        </span>
                        <div className="flex flex-wrap justify-center gap-3">
                            {internationalPresence.coverage.map((country) => (
                                <span
                                    key={country.code}
                                    className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-default flex items-center gap-2",
                                        isHyper
                                            ? "bg-card text-muted-foreground border border-border hover:border-accent/50 hover:text-foreground"
                                            : "bg-white text-slate-600 border border-slate-200"
                                    )}
                                >
                                    <span style={flagFontInfo} className="text-sm leading-none opacity-80" role="img" aria-label={`Bandera de ${country.label}`}>
                                        {country.flagEmoji}
                                    </span>
                                    {country.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
