
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Page from './page';
import * as navigation from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    notFound: vi.fn(),
}));

// Mock components to avoid complex rendering issues in unit test
vi.mock('@/components/sections', () => ({
    Header: () => <div>Header</div>,
    Footer: () => <div>Footer</div>,
}));

vi.mock('@/components/services/ServiceHero', () => ({ ServiceHero: () => <div>ServiceHero</div> }));
vi.mock('@/components/services/StatsStrip', () => ({ StatsStrip: () => <div>StatsStrip</div> }));
vi.mock('@/components/services/FeatureGrid', () => ({ FeatureGrid: () => <div>FeatureGrid</div> }));
vi.mock('@/components/services/ProcessTimeline', () => ({ ProcessTimeline: () => <div>ProcessTimeline</div> }));
vi.mock('@/components/services/SocialProofSection', () => ({ SocialProofSection: () => <div>SocialProofSection</div> }));
vi.mock('@/components/services/ProcessVideoTabs', () => ({ ProcessVideoTabs: () => <div>ProcessVideoTabs</div> }));
vi.mock('@/components/services/CTASection', () => ({ CTASection: () => <div>CTASection</div> }));
vi.mock('@/components/services/ROICalculatorModal', () => ({ ROICalculatorModal: () => <div>ROICalculatorModal</div> }));

describe('Service Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders successfully for "hyperautomation"', async () => {
        const result = await Page({ params: Promise.resolve({ slug: 'hyperautomation' }) });
        expect(result).toBeDefined();
    });

    it('renders successfully for "sap-consulting"', async () => {
        const result = await Page({ params: Promise.resolve({ slug: 'sap-consulting' }) });
        expect(result).toBeDefined();
    });

    it('calls notFound for non-existent slug', async () => {
        await Page({ params: Promise.resolve({ slug: 'does-not-exist-123' }) });
        expect(navigation.notFound).toHaveBeenCalled();
    });
});
