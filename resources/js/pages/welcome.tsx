import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/Layout';

const features = [
    {
        href: '/wilayah',
        title: 'Wilayah',
        description: 'Jelajahi 34 provinsi, 514 kota, dan ribuan kecamatan Indonesia. Dilengkapi pencarian cepat.',
        icon: '🗺️',
        badge: '514 kota',
    },
    {
        href: '/cuaca',
        title: 'Cuaca',
        description: 'Prakiraan cuaca real-time 50+ kota Indonesia — suhu, kelembapan, kecepatan & arah angin.',
        icon: '🌤️',
        badge: 'Real-time',
    },
    {
        href: '/kurs',
        title: 'Kurs Valuta',
        description: 'Kurs beli, jual, dan tengah untuk 14 mata uang asing terhadap Rupiah. Diperbarui setiap jam.',
        icon: '💱',
        badge: '14 mata uang',
    },
    {
        href: '/hari-libur',
        title: 'Hari Libur',
        description: 'Daftar hari libur nasional dan cuti bersama Indonesia tahun 2024–2026.',
        icon: '📅',
        badge: '2024–2026',
    },
    {
        href: '/nik',
        title: 'Validasi NIK',
        description: 'Validasi NIK 16 digit — cek provinsi, kota, kecamatan, tanggal lahir, dan jenis kelamin.',
        icon: '🪪',
        badge: '16 digit',
    },
    {
        href: '/kalender-jawa',
        title: 'Kalender Jawa',
        description: 'Konversi tanggal Masehi ke penanggalan Jawa — hari, pasaran, wuku, dan tahun Jawa.',
        icon: '🗓️',
        badge: 'Konversi',
    },
    {
        href: '/terbilang',
        title: 'Terbilang',
        description: 'Konversi angka ke bentuk terbilang Bahasa Indonesia — berguna untuk dokumen keuangan.',
        icon: '🔢',
        badge: 'Angka → Teks',
    },
] as const;

export default function Welcome() {
    return (
        <Layout>
            <Head title="Beranda" />

            {/* Hero */}
            <section className="relative py-16 text-center">
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-100/60 blur-3xl dark:bg-red-900/20" />
                </div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    API Aktif
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                    Indonesia
                    <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent dark:from-red-400 dark:to-red-300">
                        QL
                    </span>
                </h1>
                <p className="mx-auto max-w-xl text-base text-gray-500 dark:text-gray-400">
                    Data publik Indonesia dalam satu GraphQL API — wilayah, cuaca, kurs,
                    hari libur, NIK, kalender Jawa, dan terbilang.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/wilayah"
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        Mulai Eksplorasi →
                    </Link>
                    <a
                        href="https://gographql.project-n.site/query"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        GraphQL Playground
                    </a>
                </div>
            </section>

            {/* Feature cards */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {features.map((feature) => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                        className="group relative flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-800/60"
                    >
                        <div className="flex items-start justify-between">
                            <span className="text-3xl leading-none">{feature.icon}</span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                {feature.badge}
                            </span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900 group-hover:text-red-600 dark:text-gray-100 dark:group-hover:text-red-400">
                                {feature.title}
                            </h2>
                            <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                        <span className="mt-auto text-xs font-medium text-red-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-red-400">
                            Lihat →
                        </span>
                    </Link>
                ))}
            </section>

            <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">
                Open GraphQL API · Data publik Indonesia
            </footer>
        </Layout>
    );
}
