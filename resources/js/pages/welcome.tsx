import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/Layout';

const features = [
    {
        href: '/wilayah',
        title: 'Wilayah',
        description:
            'Jelajahi 34 provinsi, 514 kota, dan ribuan kecamatan Indonesia. Dilengkapi pencarian cepat.',
        icon: '🗺️',
        badge: '514 kota',
    },
    {
        href: '/cuaca',
        title: 'Cuaca',
        description:
            'Prakiraan cuaca real-time 50+ kota Indonesia — suhu, kelembapan, kecepatan & arah angin.',
        icon: '🌤️',
        badge: 'Real-time',
    },
    {
        href: '/kurs',
        title: 'Kurs Valuta',
        description:
            'Kurs beli, jual, dan tengah untuk 14 mata uang asing terhadap Rupiah. Diperbarui setiap jam.',
        icon: '💱',
        badge: '14 mata uang',
    },
    {
        href: '/hari-libur',
        title: 'Hari Libur',
        description:
            'Daftar hari libur nasional dan cuti bersama Indonesia tahun 2024–2026.',
        icon: '📅',
        badge: '2024–2026',
    },
    {
        href: '/nik',
        title: 'Validasi NIK',
        description:
            'Validasi NIK 16 digit — cek provinsi, kota, kecamatan, tanggal lahir, dan jenis kelamin.',
        icon: '🪪',
        badge: '16 digit',
    },
    {
        href: '/kalender-jawa',
        title: 'Kalender Jawa',
        description:
            'Konversi tanggal Masehi ke penanggalan Jawa — hari, pasaran, wuku, dan tahun Jawa.',
        icon: '🗓️',
        badge: 'Konversi',
    },
    {
        href: '/terbilang',
        title: 'Terbilang',
        description:
            'Konversi angka ke bentuk terbilang Bahasa Indonesia — berguna untuk dokumen keuangan.',
        icon: '🔢',
        badge: 'Angka → Teks',
    },
] as const;

export default function Welcome() {
    return (
        <Layout>
            <Head title="Beranda" />

            {/* Hero */}
            <section className="pt-4 pb-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    API Aktif · Open Source
                </div>

                <h1 className="mb-3 font-display text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
                    Indonesia
                    <span className="text-red-600">QL</span>
                </h1>
                <p className="max-w-lg text-base text-neutral-500 dark:text-zinc-400">
                    Data publik Indonesia dalam satu GraphQL API — wilayah,
                    cuaca, kurs, hari libur, NIK, kalender Jawa, dan terbilang.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/wilayah"
                        className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        Mulai Eksplorasi →
                    </Link>
                    <a
                        href="https://gographql.project-n.site/query"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        GraphQL Playground
                    </a>
                </div>
            </section>

            {/* Stats row */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { label: 'Provinsi', value: '34' },
                    { label: 'Kota / Kab', value: '514' },
                    { label: 'Kecamatan', value: '7.2k+' },
                    { label: 'Kelurahan / Desa', value: '83k+' },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="rounded-2xl border border-neutral-200/60 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <p className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            {s.value}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-400">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Feature cards */}
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {features.map((feature) => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                        className="group flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex items-start justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-xl dark:bg-zinc-800">
                                {feature.icon}
                            </span>
                            <span className="rounded-full border border-neutral-100 px-2 py-0.5 text-xs text-neutral-400 dark:border-zinc-700 dark:text-zinc-500">
                                {feature.badge}
                            </span>
                        </div>
                        <div>
                            <h2 className="font-display font-semibold text-neutral-900 dark:text-white">
                                {feature.title}
                            </h2>
                            <p className="mt-1 text-sm leading-relaxed text-neutral-400 dark:text-zinc-500">
                                {feature.description}
                            </p>
                        </div>
                        <span className="mt-auto text-xs font-medium text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                            Lihat →
                        </span>
                    </Link>
                ))}
            </section>

            <footer className="mt-12 text-xs text-neutral-400 dark:text-zinc-600">
                Open GraphQL API · Data publik Indonesia
            </footer>
        </Layout>
    );
}
