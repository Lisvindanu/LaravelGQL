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

const getDayName = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
        weekday: 'short',
    });
};

const getDay = (iso: string) => iso.slice(8, 10);

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

    // Group by month
    const grouped = hariLibur.reduce<Record<string, HariLiburItem[]>>(
        (acc, item) => {
            const key = item.tanggal.slice(0, 7);
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        },
        {},
    );

    const monthLabel = (ym: string) => {
        const [y, m] = ym.split('-').map(Number);
        return BULAN[m - 1] + ' ' + y;
    };

    return (
        <Layout>
            <Head title="Hari Libur Nasional" />

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                    Indonesia · {selectedTahun}
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Hari Libur Nasional
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Hari libur dan cuti bersama Indonesia
                </p>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <select
                    value={selectedTahun}
                    onChange={(e) =>
                        handleFilter(Number(e.target.value), selectedBulan)
                    }
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
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
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-xs font-medium text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-200" />
                            {nasionalCount} libur
                        </span>
                        {cutiCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                {cutiCount} cuti
                            </span>
                        )}
                    </div>
                )}
            </div>

            {hariLibur.length > 0 ? (
                <div className="space-y-6">
                    {Object.entries(grouped).map(([month, items]) => (
                        <div key={month}>
                            <div className="mb-3 flex items-center gap-3">
                                <p className="text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                                    {monthLabel(month)}
                                </p>
                                <div className="h-px flex-1 bg-neutral-100 dark:bg-zinc-800" />
                                <p className="text-xs text-neutral-400 dark:text-zinc-600">
                                    {items.length} hari
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-lg border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                <ul className="divide-y divide-neutral-100 dark:divide-zinc-800/60">
                                    {items.map((item) => (
                                        <li
                                            key={item.tanggal}
                                            className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-neutral-50/60 dark:hover:bg-zinc-800/30"
                                        >
                                            <div className="flex w-10 flex-none flex-col items-center">
                                                <p className="font-display text-2xl leading-none font-bold text-neutral-900 dark:text-white">
                                                    {getDay(item.tanggal)}
                                                </p>
                                                <p className="mt-0.5 text-xs text-neutral-400 dark:text-zinc-500">
                                                    {getDayName(item.tanggal)}
                                                </p>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-neutral-900 dark:text-white">
                                                    {item.nama}
                                                </p>
                                            </div>
                                            <span
                                                className={[
                                                    'ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                                                    item.jenis === 'nasional'
                                                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                                                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-red-400',
                                                ].join(' ')}
                                            >
                                                {item.jenis === 'nasional'
                                                    ? 'Libur'
                                                    : 'Cuti'}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed border-rose-200 bg-rose-50/30 py-20 text-center dark:border-rose-900/30 dark:bg-rose-950/10">
                    <p className="text-4xl">📅</p>
                    <p className="mt-4 font-medium text-neutral-500 dark:text-zinc-400">
                        Tidak ada hari libur untuk periode ini
                    </p>
                </div>
            )}
        </Layout>
    );
}
