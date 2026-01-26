export interface ROIInputs {
    personnel: number;
    hoursPerWeek: number;
    hourlyCost: number;
    automatablePercentage: number;
}

export interface ROIResults {
    monthlySavings: number;
    annualSavings: number;
    hoursSavedMonth: number;
}

export const calculateROI = (inputs: ROIInputs): ROIResults => {
    const { personnel, hoursPerWeek, hourlyCost, automatablePercentage } = inputs;
    const totalHoursPerWeek = personnel * hoursPerWeek;
    const totalHoursPerMonth = totalHoursPerWeek * 4;
    const monthlyCost = totalHoursPerMonth * hourlyCost;

    const monthlySavings = monthlyCost * (automatablePercentage / 100);
    const annualSavings = monthlySavings * 12;
    const hoursSavedMonth = totalHoursPerMonth * (automatablePercentage / 100);

    return {
        monthlySavings,
        annualSavings,
        hoursSavedMonth
    };
};

export const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

export const generateContactLink = (inputs: ROIInputs, results: ROIResults) => {
    const message = `Hola, realicé el cálculo de ROI en su sitio web y me gustaría validar estos resultados para un diagnóstico:\n\n` +
        `- Equipo: ${inputs.personnel} personas\n` +
        `- Tiempo manual: ${inputs.hoursPerWeek} hrs/semana c/u\n` +
        `- Ahorro estimado: ${formatCurrency(results.annualSavings)}/año\n` +
        `- Horas liberadas: ${Math.round(results.hoursSavedMonth)} hrs/mes`;

    // Ensure proper encoding of parameters
    const params = new URLSearchParams();
    params.append('service', 'Automatización RPA');
    params.append('message', message);

    return `/contact?${params.toString()}`;
};
