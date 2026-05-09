import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { JadwalKRLItem, StasiunKRLItem } from '@/types/indonesiaql';

interface Props {
    stasiun: StasiunKRLItem[];
    stasiunId: string;
    jadwal: JadwalKRLItem[];
}

export default function KrlIndex({ stasiun, stasiunId, jadwal }: Props) {
    const [selectedId, setSelectedId] = useState(stasiunId);
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');

    const selectedStasiun = stasiun.find((s) => s.stasiunId === stasiunId);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedId) return;
        const params: Record<string, string> = { stasiunId: selectedId };
        if (timeFrom) params.timeFrom = timeFrom;
        if (timeTo) params.timeTo = timeTo;
        router.get('/krl', params);
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
                                    <option
                                        key={s.stasiunId}
                                        value={s.stasiunId}
                                    >
                                        {s.stasiunNama} ({s.stasiunKode})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                    Dari Jam
                                </label>
                                <input
                                    type="time"
                                    value={timeFrom}
                                    onChange={(e) =>
                                        setTimeFrom(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                    Sampai Jam
                                </label>
                                <input
                                    type="time"
                                    value={timeTo}
                                    onChange={(e) => setTimeTo(e.target.value)}
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                                />
                            </div>
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
                    <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        Jadwal — {selectedStasiun?.stasiunNama ?? stasiunId}
                    </p>
                    {jadwal.length === 0 ? (
                        <p className="text-sm text-neutral-400">
                            Tidak ada jadwal ditemukan.
                        </p>
                    ) : (
                        <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                            {jadwal.map((j, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 py-3"
                                >
                                    {j.colorCode && (
                                        <div
                                            className="h-8 w-1 shrink-0 rounded-full"
                                            style={{
                                                backgroundColor: j.colorCode,
                                            }}
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
