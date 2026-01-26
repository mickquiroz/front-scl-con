import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ROICalculatorModal } from './ROICalculatorModal';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: vi.fn(),
        push: vi.fn(),
    }),
    usePathname: () => '/test-path',
    useSearchParams: () => new URLSearchParams(),
}));

describe('ROICalculatorModal', () => {
    beforeEach(() => {
        // Reset hash before each test
        window.location.hash = '';
        vi.clearAllMocks();
    });

    it('should be closed by default', () => {
        render(<ROICalculatorModal />);
        const modal = screen.queryByRole('dialog');
        // Initial state is closed (opacity-0 invisible)
        // With current implementation it's in DOM but invisible
        expect(modal).toHaveClass('invisible');
    });

    it('should open directly if hash is #roi-calculator on mount', () => {
        window.location.hash = '#roi-calculator';
        render(<ROICalculatorModal />);

        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass('visible');
    });

    it('should open when hash changes to #roi-calculator', async () => {
        render(<ROICalculatorModal />);

        // Simulate hash change
        await act(async () => {
            window.location.hash = '#roi-calculator';
            window.dispatchEvent(new Event('hashchange'));
        });

        await waitFor(() => {
            const modal = screen.getByRole('dialog');
            expect(modal).toHaveClass('visible');
        });
    });

    it('should open when custom roi-modal-trigger event is fired', async () => {
        render(<ROICalculatorModal />);

        // Simulate custom trigger
        await act(async () => {
            window.location.hash = '#roi-calculator'; // Should be set by triggerer usually
            window.dispatchEvent(new Event('roi-modal-trigger'));
        });

        await waitFor(() => {
            const modal = screen.getByRole('dialog');
            expect(modal).toHaveClass('visible');
        });
    });

    it('should close when Close button is clicked', async () => {
        window.location.hash = '#roi-calculator';
        render(<ROICalculatorModal />);

        const closeBtn = screen.getByLabelText('Cerrar');
        fireEvent.click(closeBtn);

        await waitFor(() => {
            const modal = screen.getByRole('dialog');
            expect(modal).toHaveClass('invisible');
        });
    });
});
