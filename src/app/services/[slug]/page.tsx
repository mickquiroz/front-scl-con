
import { notFound } from 'next/navigation';
import { services, trustedCompanies } from '@/config/services';
import { ServiceHero } from '@/components/services/ServiceHero';
import { StatsStrip } from '@/components/services/StatsStrip';
import { FeatureGrid } from '@/components/services/FeatureGrid';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import { SocialProofSection } from '@/components/services/SocialProofSection';
import { ProcessVideoTabs } from '@/components/services/ProcessVideoTabs';
import { TrustedBySection } from '@/components/services/TrustedBySection';
import { CTASection } from '@/components/services/CTASection';
import { ROIModalWrapper } from '@/components/services/ROIModalWrapper';

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
        return null;
    }

    const isHyper = service.id === 'hyperautomation';
    const isSap = service.id === 'sap-consulting';
    // Determine variant string for components that accept it
    const variant = isHyper ? 'hyperautomation' : isSap ? 'sap' : 'default';

    return (
        <main className="min-h-screen bg-background">
            <ServiceHero hero={service.hero} variant={variant} />

            <StatsStrip stats={service.stats} variant={variant} />

            <FeatureGrid highlights={service.highlights} variant={variant} />

            {/* Process Showcase - Only if present (e.g. Hyperautomation) */}
            {service.processShowcase && (
                <section className="py-20 bg-black">
                    <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {service.processShowcase.title}
                        </h2>
                        {service.processShowcase.subtitle && (
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                {service.processShowcase.subtitle}
                            </p>
                        )}
                    </div>
                    <ProcessVideoTabs sectors={service.processShowcase.sectors} />
                </section>
            )}

            <ProcessTimeline process={service.process} variant={variant} />

            {service.socialProof && (
                <SocialProofSection data={service.socialProof} />
            )}

            <TrustedBySection companies={trustedCompanies} />

            <CTASection variant={variant} />

            {/* Include ROI Modal globally for the page if it's potentially needed */}
            <ROIModalWrapper />
        </main>
    );
}
