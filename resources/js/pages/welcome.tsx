import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/Layout';

const features = [
    {
        href: '/wilayah',
        title: 'Wilayah',
        description:
            'Jelajahi data provinsi, kota, dan kecamatan seluruh Indonesia. Dilengkapi fitur pencarian wilayah.',
        icon: '🗺️',
    },
    {
        href: '/cuaca',
        title: 'Cuaca',
        description:
            'Prakiraan cuaca real-time per kota dari BMKG — suhu, kelembapan, kecepatan angin, dan arah angin.',
        icon: '🌤️',
    },
    {
        href: '/kurs',
        title: 'Kurs Valuta',
        description:
            'Kurs transaksi Bank Indonesia — kurs beli, jual, dan tengah untuk berbagai mata uang asing.',
        icon: '💱',
    },
    {
        href: '/hari-libur',
        title: 'Hari Libur',
        description:
            'Daftar hari libur nasional dan cuti bersama Indonesia berdasarkan tahun dan bulan.',
        icon: '📅',
    },
    {
        href: '/nik',
        title: 'Validasi NIK',
        description:
            'Validasi Nomor Induk Kependudukan — cek provinsi, kota, tanggal lahir, dan jenis kelamin.',
        icon: '🪪',
    },
    {
        href: '/kalender-jawa',
        title: 'Kalender Jawa',
        description:
            'Konversi tanggal Masehi ke kalender Jawa — hari, pasaran, wuku, dan tahun Jawa.',
        icon: '🗓️',
    },
    {
        href: '/terbilang',
        title: 'Terbilang',
        description:
            'Konversi angka ke bentuk terbilang dalam bahasa Indonesia — berguna untuk dokumen keuangan.',
        icon: '🔢',
    },
] as const;

export default function Welcome() {
    return (
        <Layout>
            <Head title="Beranda" />

            <section className="py-16 text-center">
                <div className="mb-4 text-6xl">🇮🇩</div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
                    Indonesia
                    <span className="text-red-600 dark:text-red-400">QL</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    Akses data Indonesia secara real-time — wilayah, cuaca,
                    kurs, hari libur, validasi NIK, kalender Jawa, dan konversi
                    terbilang dalam satu platform.
                </p>
            </section>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {features.map((feature) => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                        className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-red-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-800"
                    >
                        <div className="text-4xl">{feature.icon}</div>
                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 dark:text-gray-100 dark:group-hover:text-red-400">
                            {feature.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {feature.description}
                        </p>
                    </Link>
                ))}
            </section>

            <footer className="mt-16 text-center text-sm text-gray-400 dark:text-gray-600">
                Data bersumber dari GraphQL API publik Indonesia
            </footer>
        </Layout>
    );
}
