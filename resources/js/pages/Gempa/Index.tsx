import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { GempaItem } from '@/types/indonesiaql';

interface Props {
    terbaru: GempaItem | null;
    list: GempaItem[];
}

export default function GempaIndex({ terbaru, list }: Props) {
    return (
        <Layout>
            <Head title="Gempa Bumi" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    BMKG · Real-time
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Gempa Bumi
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Data gempa terkini dari BMKG
                </p>
            </div>

            {terbaru && (
                <div className="mb-10 max-w-lg">
                    <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        Gempa Terbaru
                    </p>
                    <div className="border-l-4 border-red-600 pl-6">
                        <p className="font-display text-5xl leading-tight font-black text-neutral-900 dark:text-white">
                            M {terbaru.magnitude}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-neutral-500 dark:text-zinc-400">
                            {terbaru.wilayah}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-400 dark:text-zinc-500">
                            {terbaru.tanggal} · {terbaru.jam}
                        </p>
                    </div>

                    <div className="mt-6 divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {[
                            { label: 'Kedalaman', value: terbaru.kedalaman },
                            { label: 'Koordinat', value: `${terbaru.lintang}, ${terbaru.bujur}` },
                            { label: 'Potensi', value: terbaru.potensi },
                            { label: 'Dirasakan', value: terbaru.dirasakan || '—' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-baseline justify-between py-3">
                                <p className="text-xs text-neutral-400 dark:text-zinc-500">{label}</p>
                                <p className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {list.length > 0 && (
                <div className="max-w-2xl">
                    <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        15 Gempa Terakhir
                    </p>
                    <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {list.map((g, i) => (
                            <div key={i} className="flex items-center gap-4 py-3">
                                <span className="w-10 font-mono text-sm font-black text-neutral-900 dark:text-white">
                                    M {g.magnitude}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-neutral-700 dark:text-zinc-300">
                                        {g.wilayah}
                                    </p>
                                    <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                        {g.tanggal} · {g.jam} · {g.kedalaman}
                                    </p>
                                </div>
                                {g.potensi.toLowerCase().includes('tsunami') && (
                                    <span className="text-[10px] font-bold tracking-wide text-red-600 uppercase">
                                        Tsunami
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
