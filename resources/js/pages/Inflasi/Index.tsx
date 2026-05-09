import { Head, router } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { InflasiItem } from '@/types/indonesiaql';

interface Props {
    list: InflasiItem[];
    tahun: number;
}

const fmtPct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

const YEARS = [2024, 2025, 2026];

export default function InflasiIndex({ list, tahun }: Props) {
    return (
        <Layout>
            <Head title="Inflasi" />

            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        BPS · Data Ekonomi
                    </p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Inflasi
                    </h1>
                    <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                        Data inflasi bulanan Indonesia — Badan Pusat Statistik
                    </p>
                </div>
                <div className="flex shrink-0 gap-1 pt-1">
                    {YEARS.map((y) => (
                        <button
                            key={y}
                            onClick={() => router.get('/inflasi', { tahun: y })}
                            className={[
                                'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
                                tahun === y
                                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                    : 'text-neutral-400 hover:text-neutral-700 dark:text-zinc-500 dark:hover:text-zinc-200',
                            ].join(' ')}
                        >
                            {y}
                        </button>
                    ))}
                </div>
            </div>

            {list.length === 0 ? (
                <p className="text-sm text-neutral-400">
                    Tidak ada data untuk tahun {tahun}.
                </p>
            ) : (
                <>
                    <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 py-2">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                Bulan
                            </p>
                            <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                IHK
                            </p>
                            <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                Bulanan
                            </p>
                            <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                Tahunan
                            </p>
                        </div>
                        {list.map((item) => (
                            <div
                                key={item.periode}
                                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 py-3 transition-colors hover:bg-neutral-50/60 dark:hover:bg-zinc-800/20"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                        {item.bulan}
                                    </p>
                                    <p className="font-mono text-[10px] text-neutral-300 dark:text-zinc-600">
                                        {item.periode}
                                    </p>
                                </div>
                                <p className="text-right font-mono text-sm text-neutral-500 tabular-nums dark:text-zinc-400">
                                    {item.ihk.toFixed(2)}
                                </p>
                                <p
                                    className={[
                                        'text-right font-mono text-sm font-semibold tabular-nums',
                                        item.inflasiBulanan >= 0
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400',
                                    ].join(' ')}
                                >
                                    {fmtPct(item.inflasiBulanan)}
                                </p>
                                <p
                                    className={[
                                        'text-right font-mono text-sm font-semibold tabular-nums',
                                        item.inflasiTahunan >= 0
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400',
                                    ].join(' ')}
                                >
                                    {fmtPct(item.inflasiTahunan)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-5 text-xs text-neutral-300 dark:text-zinc-700">
                        Sumber: Badan Pusat Statistik (BPS). IHK = Indeks Harga
                        Konsumen.
                    </p>
                </>
            )}
        </Layout>
    );
}
