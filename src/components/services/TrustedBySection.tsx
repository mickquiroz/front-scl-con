'use client';

import { TrustedByCarousel } from './TrustedByCarousel';
import { TrustedCompany } from '@/config/services';
import { cn } from '@/lib/utils';

interface TrustedBySectionProps {
    companies: TrustedCompany[];
    title?: string;
    className?: string;
}

export function TrustedBySection({
    companies,
    title = "Empresas que confían en nosotros",
    className
}: TrustedBySectionProps) {
    if (!companies || companies.length === 0) return null;

    return (
        <section className={cn("py-12 border-b border-border/50 bg-slate-50/50 w-full overflow-hidden", className)}>
            <div className="max-w-7xl mx-auto px-4">
                <h4 className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">
                    {title}
                </h4>
            </div>

            <div className="w-full">
                <TrustedByCarousel companies={companies} />
            </div>
        </section>
    );
}
