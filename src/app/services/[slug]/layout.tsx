import { Header, Footer, Contact } from '@/components/sections';
import { Suspense } from 'react';

export default function ServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
