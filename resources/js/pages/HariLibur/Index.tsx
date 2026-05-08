import { Head, router } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { HariLiburItem } from '@/types/indonesiaql';

interface Props {
    hariLibur: HariLiburItem[];
    selectedTahun: number;
    selectedBulan: number | null;
}

const BULAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const tahunOptions = Array.from({ length: 5 }, (_, i) => 2024 + i);

export default function HariLiburIndex({
    hariLibur,
    selectedTahun,
    selectedBulan,
}: Props) {
    const handleFilter = (tahun: number, bulan: number | null) => {
        const params: Record<string, string | number> = { tahun };
        if (bulan !== null) params.bulan = bulan;
        router.get('/hari-libur', params);
    };

    return (
        <Layout>
            <Head title="Hari Libur Nasional" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Hari Libur Nasional
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Hari libur dan cuti bersama Indonesia
                </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <select
                    value={selectedTahun}
                    onChange={(e) =>
                        handleFilter(Number(e.target.value), selectedBulan)
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                    {tahunOptions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedBulan ?? ''}
                    onChange={(e) =>
                        handleFilter(
                            selectedTahun,
                            e.target.value ? Number(e.target.value) : null,
                        )
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                    <option value="">Semua Bulan</option>
                    {BULAN.map((nama, i) => (
                        <option key={i + 1} value={i + 1}>
                            {nama}
                        </option>
                    ))}
                </select>
            </div>

            {hariLibur.length > 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {hariLibur.length} hari libur
                            {selectedBulan
                                ? ` — ${BULAN[selectedBulan - 1]}`
                                : ''}{' '}
                            {selectedTahun}
                        </span>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {hariLibur.map((item) => (
                            <li
                                key={item.tanggal}
                                className="flex items-center justify-between px-6 py-4"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {item.nama}
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                        {item.tanggal}
                                    </p>
                                </div>
                                <span
                                    className={[
                                        'rounded-full px-3 py-1 text-xs font-medium',
                                        item.jenis === 'nasional'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
                                    ].join(' ')}
                                >
                                    {item.jenis}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-sm text-gray-400">
                    Tidak ada hari libur untuk periode ini.
                </p>
            )}
        </Layout>
    );
}
