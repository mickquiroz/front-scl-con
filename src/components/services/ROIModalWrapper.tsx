'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ROICalculatorModal } from './ROICalculatorModal';

/**
 * Client wrapper that reads ?roi=1 query param and opens the ROI calculator modal
 */
function ROIModalWrapperContent() {
    const searchParams = useSearchParams();
    const shouldOpenROI = searchParams.get('roi') === '1';

    return <ROICalculatorModal initialIsOpen={shouldOpenROI} />;
}

/**
 * Suspense boundary for the ROI modal wrapper
 */
export function ROIModalWrapper() {
    return (
        <Suspense fallback={null}>
            <ROIModalWrapperContent />
        </Suspense>
    );
}
