import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { services } from '@/config/services';
import { ServiceHero } from '@/components/services/ServiceHero';
import { StatsStrip } from '@/components/services/StatsStrip';
import { FeatureGrid } from '@/components/services/FeatureGrid';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import { CTASection } from '@/components/services/CTASection';
import { InternationalPresence } from '@/components/services/InternationalPresence';
import { SocialProofSection } from '@/components/services/SocialProofSection';

import { ROICalculatorModal } from '@/components/services/ROICalculatorModal';

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: PageProps) {
    const resolvedParams = await params;
    const service = services.find((s) => s.slug === resolvedParams.slug);

    if (!service) {
        notFound();
    }

    const variant = service.id === 'hyperautomation' ? 'hyperautomation' : 'default';

    return (
        <main className={variant === 'hyperautomation' ? "bg-slate-950" : "min-h-screen"}>
            <ServiceHero hero={service.hero} variant={variant} />
            <StatsStrip stats={service.stats} variant={variant} />
            <FeatureGrid highlights={service.highlights} variant={variant} />
            {/* Insert International Presence for Hyperautomation or globally if desired. 
          The brief asks for it in the context of Hyperautomation. 
          We place it after features for good flow. */}
            {variant === 'hyperautomation' && <InternationalPresence variant={variant} />}

            {/* Social Proof for Hyperautomation */}
            {variant === 'hyperautomation' && service.socialProof && (
                <SocialProofSection data={service.socialProof} />
            )}

            <ProcessTimeline process={service.process} variant={variant} />
            <CTASection variant={variant} />

            {/* Lead Magnet: ROI Calculator Modal */}
            {variant === 'hyperautomation' && (
                <Suspense fallback={null}>
                    <ROICalculatorModal />
                </Suspense>
            )}
        </main>
    );
}
