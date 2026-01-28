import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ROICalculatorModal } from './ROICalculatorModal';

// Mock values
const mockReplace = vi.fn();

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace,
        push: vi.fn(),
    }),
    usePathname: () => '/test-path',
}));

describe('ROICalculatorModal', () => {
    beforeEach(() => {
        mockReplace.mockClear();
        vi.clearAllMocks();
    });

    it('should be closed by default', () => {
        render(<ROICalculatorModal />);
        const modal = screen.queryByRole('dialog');
        expect(modal).toHaveClass('invisible');
    });

    it('should open directly if param roi=1 is present', () => {
        render(<ROICalculatorModal initialIsOpen={true} />);
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass('visible');
    });

    it('should close when Close button is clicked by removing params', async () => {
        render(<ROICalculatorModal initialIsOpen={true} />);

        const closeBtn = screen.getByLabelText('Cerrar');
        fireEvent.click(closeBtn);

        // Expect router.replace to be called with clean URL
        expect(mockReplace).toHaveBeenCalled();
        // The implementation gets current params, deletes 'roi', and replaces.
        // We can check if it was called with '/test-path' (since params are empty after delete)
        const callArgs = mockReplace.mock.calls[0];
        expect(callArgs[0]).toBe('/test-path');
    });
});
