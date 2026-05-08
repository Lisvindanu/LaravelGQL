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

const formatTanggal = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

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

    const nasionalCount = hariLibur.filter(
        (h) => h.jenis === 'nasional',
    ).length;
    const cutiCount = hariLibur.filter((h) => h.jenis !== 'nasional').length;

    return (
        <Layout>
            <Head title="Hari Libur Nasional" />

            <div className="mb-6">
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Hari Libur Nasional
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
                    Hari libur dan cuti bersama Indonesia
                </p>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <select
                    value={selectedTahun}
                    onChange={(e) =>
                        handleFilter(Number(e.target.value), selectedBulan)
                    }
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                >
                    <option value="">Semua Bulan</option>
                    {BULAN.map((nama, i) => (
                        <option key={i + 1} value={i + 1}>
                            {nama}
                        </option>
                    ))}
                </select>

                {hariLibur.length > 0 && (
                    <div className="ml-auto flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            {nasionalCount} nasional
                        </span>
                        {cutiCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                {cutiCount} cuti bersama
                            </span>
                        )}
                    </div>
                )}
            </div>

            {hariLibur.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <ul className="divide-y divide-neutral-100 dark:divide-zinc-800/60">
                        {hariLibur.map((item) => (
                            <li
                                key={item.tanggal}
                                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-neutral-50/60 dark:hover:bg-zinc-800/30"
                            >
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">
                                        {item.nama}
                                    </p>
                                    <p className="mt-0.5 text-sm text-neutral-500 dark:text-zinc-400">
                                        {formatTanggal(item.tanggal)}
                                    </p>
                                </div>
                                <span
                                    className={[
                                        'ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                                        item.jenis === 'nasional'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
                                    ].join(' ')}
                                >
                                    {item.jenis === 'nasional'
                                        ? 'Hari Libur'
                                        : 'Cuti Bersama'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="rounded-2xl border border-neutral-200/60 bg-white py-16 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-3xl">📅</p>
                    <p className="mt-3 font-medium text-neutral-500 dark:text-zinc-400">
                        Tidak ada hari libur untuk periode ini
                    </p>
                </div>
            )}
        </Layout>
    );
}
