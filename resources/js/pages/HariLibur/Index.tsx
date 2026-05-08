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
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Indonesia · {selectedTahun}
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Hari Libur Nasional
                </h1>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-neutral-100 pb-6 dark:border-zinc-800">
                <select
                    value={selectedTahun}
                    onChange={(e) =>
                        handleFilter(Number(e.target.value), selectedBulan)
                    }
                    className="border-b border-neutral-300 bg-transparent py-1.5 pr-6 text-sm text-neutral-900 focus:border-red-600 focus:outline-none dark:border-zinc-700 dark:text-white"
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
                    className="border-b border-neutral-300 bg-transparent py-1.5 pr-6 text-sm text-neutral-900 focus:border-red-600 focus:outline-none dark:border-zinc-700 dark:text-white"
                >
                    <option value="">Semua Bulan</option>
                    {BULAN.map((nama, i) => (
                        <option key={i + 1} value={i + 1}>
                            {nama}
                        </option>
                    ))}
                </select>

                {hariLibur.length > 0 && (
                    <div className="ml-auto flex items-center gap-4 text-sm">
                        <span className="font-mono font-black text-neutral-900 dark:text-white">
                            {nasionalCount}
                        </span>
                        <span className="text-neutral-400 dark:text-zinc-500">
                            libur nasional
                        </span>
                        {cutiCount > 0 && (
                            <>
                                <span className="font-mono font-black text-neutral-900 dark:text-white">
                                    {cutiCount}
                                </span>
                                <span className="text-neutral-400 dark:text-zinc-500">
                                    cuti bersama
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {hariLibur.length > 0 ? (
                <div className="space-y-8">
                    {Object.entries(grouped).map(([month, items]) => (
                        <div key={month}>
                            <div className="mb-3 flex items-center gap-3">
                                <p className="text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                                    {monthLabel(month)}
                                </p>
                                <div className="h-px flex-1 bg-neutral-100 dark:bg-zinc-800" />
                                <p className="text-[11px] text-neutral-300 dark:text-zinc-700">
                                    {items.length} hari
                                </p>
                            </div>
                            <div className="divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                                {items.map((item) => (
                                    <div
                                        key={item.tanggal}
                                        className="flex items-center gap-5 py-3.5"
                                    >
                                        <div className="flex w-10 flex-none flex-col items-center">
                                            <p className="font-mono text-2xl leading-none font-black text-neutral-900 dark:text-white">
                                                {getDay(item.tanggal)}
                                            </p>
                                            <p className="mt-0.5 text-[10px] font-medium text-neutral-400 uppercase dark:text-zinc-500">
                                                {getDayName(item.tanggal)}
                                            </p>
                                        </div>
                                        <p className="min-w-0 flex-1 text-sm font-medium text-neutral-900 dark:text-white">
                                            {item.nama}
                                        </p>
                                        <span
                                            className={[
                                                'shrink-0 text-[10px] font-bold tracking-[0.15em] uppercase',
                                                item.jenis === 'nasional'
                                                    ? 'text-red-600'
                                                    : 'text-neutral-400 dark:text-zinc-500',
                                            ].join(' ')}
                                        >
                                            {item.jenis === 'nasional'
                                                ? 'Libur'
                                                : 'Cuti'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="py-16 text-center text-sm text-neutral-400 dark:text-zinc-600">
                    Tidak ada hari libur untuk periode ini.
                </p>
            )}
        </Layout>
    );
}
