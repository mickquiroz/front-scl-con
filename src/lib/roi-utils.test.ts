import { describe, it, expect } from 'vitest';
import { calculateROI, generateContactLink, ROIInputs } from './roi-utils';

describe('ROI Utilities', () => {
    const mockInputs: ROIInputs = {
        personnel: 3,
        hoursPerWeek: 15,
        hourlyCost: 20,
        automatablePercentage: 60
    };

    it('calculates ROI correctly', () => {
        const results = calculateROI(mockInputs);

        // Manual calc:
        // Total Hours/Week = 3 * 15 = 45
        // Total Hours/Month = 45 * 4 = 180
        // Monthly Cost = 180 * 20 = 3600
        // Monthly Savings = 3600 * 0.6 = 2160
        // Annual Savings = 2160 * 12 = 25920
        // Hours Saved/Month = 180 * 0.6 = 108

        expect(results.monthlySavings).toBe(2160);
        expect(results.annualSavings).toBe(25920);
        expect(results.hoursSavedMonth).toBe(108);
    });

    it('generates correct contact link with encoded params', () => {
        const results = calculateROI(mockInputs);
        const link = generateContactLink(mockInputs, results);

        const url = new URL(link, 'http://localhost');
        const params = url.searchParams;

        expect(url.pathname).toBe('/contact');
        expect(params.get('service')).toBe('Automatización RPA');

        const message = params.get('message');
        expect(message).toContain('Equipo: 3 personas');
        expect(message).toContain('Tiempo manual: 15 hrs/semana');
        expect(message).toContain('Ahorro estimado: $25,920/año');
    });
});
