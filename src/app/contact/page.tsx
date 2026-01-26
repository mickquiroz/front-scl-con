import { Contact } from '@/components/sections/Contact';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Contacto | SCL Consultores',
    description: 'Conversemos sobre cómo nuestras soluciones pueden optimizar sus operaciones y generar valor real.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={<div className="min-h-screen" />}>
                <Contact />
            </Suspense>
        </main>
    );
}
