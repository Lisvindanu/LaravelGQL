import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { UMRProvinsiItem } from '@/types/indonesiaql';

interface Props {
    list: UMRProvinsiItem[];
    tahun: number;
}

const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(n);

export default function UMRIndex({ list, tahun }: Props) {
    const sorted = [...list].sort((a, b) => b.upah - a.upah);

    return (
        <Layout>
            <Head title="UMR / UMP 2025" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Kemnaker · Data
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    UMR / UMP {tahun}
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Upah Minimum Provinsi seluruh Indonesia tahun {tahun}
                </p>
            </div>

            <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                {sorted.map((item, i) => (
                    <div
                        key={item.kode}
                        className="flex items-center justify-between py-3"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-6 text-right text-xs text-neutral-300 dark:text-zinc-600">
                                {i + 1}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-neutral-800 dark:text-zinc-200">
                                    {item.provinsi}
                                </p>
                                <p className="text-[10px] text-neutral-400 dark:text-zinc-500">
                                    Kode {item.kode}
                                </p>
                            </div>
                        </div>
                        <p className="font-mono text-sm font-black text-neutral-900 dark:text-white">
                            {fmt(item.upah)}
                        </p>
                    </div>
                ))}
            </div>

            {list.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Data tidak tersedia.
                </p>
            )}
        </Layout>
    );
}
