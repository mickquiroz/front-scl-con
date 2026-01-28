import { render, screen } from '@testing-library/react';
import { TrustedByCarousel } from './TrustedByCarousel';
import { describe, it, expect } from 'vitest';

const mockCompanies = [
    { name: 'Company A', logo: '/a.svg' },
    { name: 'Company B', logo: '/b.svg' }
];

describe('TrustedByCarousel', () => {
    it('renders company logos', () => {
        render(<TrustedByCarousel companies={mockCompanies} />);

        // Since we duplicate the list 4 times, we expect multiple instances
        const logosA = screen.getAllByAltText('Company A');
        expect(logosA.length).toBeGreaterThanOrEqual(4);

        const logosB = screen.getAllByAltText('Company B');
        expect(logosB.length).toBeGreaterThanOrEqual(4);
    });

    it('has the marquee animation class', () => {
        const { container } = render(<TrustedByCarousel companies={mockCompanies} />);
        const track = container.querySelector('.animate-marquee');
        expect(track).toBeInTheDocument();
    });
});
