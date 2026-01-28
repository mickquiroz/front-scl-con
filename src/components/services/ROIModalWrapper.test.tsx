import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ROIModalWrapper } from './ROIModalWrapper';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
    })),
    usePathname: vi.fn(() => '/services/hyperautomation'),
}));

// Mock ROICalculatorModal
vi.mock('./ROICalculatorModal', () => ({
    ROICalculatorModal: ({ initialIsOpen }: { initialIsOpen: boolean }) => (
        <div data-testid="roi-modal" data-open={initialIsOpen}>
            ROI Modal
        </div>
    ),
}));

describe('ROIModalWrapper', () => {
    it('should pass initialIsOpen=true when roi=1 query param is present', async () => {
        const { useSearchParams } = await import('next/navigation');
        vi.mocked(useSearchParams).mockReturnValue({
            get: (key: string) => (key === 'roi' ? '1' : null),
        } as any);

        render(<ROIModalWrapper />);

        const modal = await screen.findByTestId('roi-modal');
        expect(modal).toHaveAttribute('data-open', 'true');
    });

    it('should pass initialIsOpen=false when roi query param is not present', async () => {
        const { useSearchParams } = await import('next/navigation');
        vi.mocked(useSearchParams).mockReturnValue({
            get: () => null,
        } as any);

        render(<ROIModalWrapper />);

        const modal = await screen.findByTestId('roi-modal');
        expect(modal).toHaveAttribute('data-open', 'false');
    });

    it('should pass initialIsOpen=false when roi query param has different value', async () => {
        const { useSearchParams } = await import('next/navigation');
        vi.mocked(useSearchParams).mockReturnValue({
            get: (key: string) => (key === 'roi' ? '0' : null),
        } as any);

        render(<ROIModalWrapper />);

        const modal = await screen.findByTestId('roi-modal');
        expect(modal).toHaveAttribute('data-open', 'false');
    });
});
