import { render, screen } from '@testing-library/react';
import { InternationalPresence } from './InternationalPresence';
import { describe, it, expect } from 'vitest';

describe('InternationalPresence', () => {
    it('renders correctly in hyperautomation variant', () => {
        render(<InternationalPresence variant="hyperautomation" />);

        // Check headings
        expect(screen.getByText('Presencia Internacional')).toBeInTheDocument();

        // Check Hubs (spanish)
        expect(screen.getByText('Hubs:')).toBeInTheDocument();
        expect(screen.getByText('Chile')).toBeInTheDocument();
        expect(screen.getByText('Perú')).toBeInTheDocument();
        expect(screen.getByText('Estados Unidos')).toBeInTheDocument();

        // Check Coverage
        expect(screen.getByText('Cobertura:')).toBeInTheDocument();
        expect(screen.getByText('Colombia')).toBeInTheDocument();
        expect(screen.getByText('México')).toBeInTheDocument(); // Spanish
        expect(screen.getByText('España')).toBeInTheDocument(); // Spanish
    });
});
