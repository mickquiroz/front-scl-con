import Link from 'next/link';
import { services } from '@/config/services';

export default function ServicesPage() {
    return (
        <main className="min-h-screen py-20 px-4 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-slate-900">Nuestros Servicios</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-slate-100">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">{service.title}</h2>
                            <p className="text-slate-600 mb-6">{service.shortDescription}</p>

                            <div className="flex gap-4">
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
