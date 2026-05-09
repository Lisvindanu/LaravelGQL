import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { JadwalKRLItem, StasiunKRLItem } from '@/types/indonesiaql';

interface Props {
    stasiun: StasiunKRLItem[];
    stasiunId: string;
    jadwal: JadwalKRLItem[];
}

type Period = 'semua' | 'subuh' | 'pagi' | 'siang' | 'sore' | 'malam';

const PERIODS: { key: Period; label: string; range: string }[] = [
    { key: 'semua', label: 'Semua', range: '' },
    { key: 'subuh', label: 'Subuh', range: '04–06' },
    { key: 'pagi', label: 'Pagi', range: '06–12' },
    { key: 'siang', label: 'Siang', range: '12–15' },
    { key: 'sore', label: 'Sore', range: '15–18' },
    { key: 'malam', label: 'Malam', range: '18–24' },
];

function filterByPeriod(jadwal: JadwalKRLItem[], period: Period): JadwalKRLItem[] {
    if (period === 'semua') return jadwal;
    return jadwal.filter((j) => {
        const t = j.destTime;
        if (period === 'subuh') return t >= '04:00' && t < '06:00';
        if (period === 'pagi') return t >= '06:00' && t < '12:00';
        if (period === 'siang') return t >= '12:00' && t < '15:00';
        if (period === 'sore') return t >= '15:00' && t < '18:00';
        if (period === 'malam') return t >= '18:00' || t < '04:00';
        return true;
    });
}

export default function KrlIndex({ stasiun, stasiunId, jadwal }: Props) {
    const [selectedId, setSelectedId] = useState(stasiunId);
    const [period, setPeriod] = useState<Period>('semua');

    const selectedStasiun = stasiun.find((s) => s.stasiunId === stasiunId);
    const filtered = filterByPeriod(jadwal, period);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedId) return;
        router.get('/krl', { stasiunId: selectedId });
    };

    return (
        <Layout>
            <Head title="Jadwal KRL" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    KRL Commuter Line · Comuline
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Jadwal KRL
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Jadwal KRL Commuter Line Jabodetabek &amp; Yogyakarta
                </p>
            </div>

            <div className="mb-6 max-w-xl">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                Stasiun
                            </label>
                            <select
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                            >
                                <option value="">Pilih Stasiun...</option>
                                {stasiun.map((s) => (
                                    <option key={s.stasiunId} value={s.stasiunId}>
                                        {s.stasiunNama} ({s.stasiunKode})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={!selectedId}
                            className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                        >
                            Lihat Jadwal
                        </button>
                    </div>
                </form>
            </div>

            {stasiunId && (
                <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                            {selectedStasiun?.stasiunNama ?? stasiunId} &mdash;{' '}
                            {filtered.length} kereta
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {PERIODS.map((p) => (
                                <button
                                    key={p.key}
                                    onClick={() => setPeriod(p.key)}
                                    className={[
                                        'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                                        period === p.key
                                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700',
                                    ].join(' ')}
                                >
                                    {p.label}
                                    {p.range && (
                                        <span className="ml-1 opacity-50">{p.range}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <p className="text-sm text-neutral-400">
                            Tidak ada jadwal untuk periode ini.
                        </p>
                    ) : (
                        <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                            {filtered.map((j, i) => (
                                <div key={i} className="flex items-center gap-4 py-3">
                                    {j.colorCode && (
                                        <div
                                            className="h-8 w-1 shrink-0 rounded-full"
                                            style={{ backgroundColor: j.colorCode }}
                                        />
                                    )}
                                    <div className="min-w-[52px]">
                                        <p className="font-mono text-lg font-black text-neutral-900 tabular-nums dark:text-white">
                                            {j.destTime}
                                        </p>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                                            {j.kaName}
                                        </p>
                                        <p className="truncate text-xs text-neutral-400 dark:text-zinc-500">
                                            {j.routeName}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-xs text-neutral-500 dark:text-zinc-400">
                                            → {j.destStasiun}
                                        </p>
                                        <p className="font-mono text-[10px] text-neutral-300 dark:text-zinc-600">
                                            {j.trainId}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
