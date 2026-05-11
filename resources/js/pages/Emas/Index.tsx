import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { HargaEmasItem } from '@/types/indonesiaql';

interface Props {
    list: HargaEmasItem[];
}

const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export default function EmasIndex({ list }: Props) {
    return (
        <Layout>
            <Head title="Harga Emas Antam" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Logam Mulia · Data
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Harga Emas Antam
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Harga emas Antam hari ini dari Logam Mulia
                </p>
            </div>

            {list.length > 0 ? (
                <div className="max-w-md">
                    <div className="mb-2 grid grid-cols-3 px-3 text-[10px] font-bold tracking-[0.12em] text-neutral-400 uppercase dark:text-zinc-500">
                        <span>Berat</span>
                        <span className="text-right">Harga Jual</span>
                        <span className="text-right">Buyback</span>
                    </div>
                    <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {list.map((item) => (
                            <div key={item.gram} className="grid grid-cols-3 items-center px-3 py-3">
                                <p className="text-sm font-semibold text-neutral-700 dark:text-zinc-300">
                                    {item.gram} gr
                                </p>
                                <p className="text-right font-mono text-sm font-black text-neutral-900 dark:text-white">
                                    {fmt(item.hargaJual)}
                                </p>
                                <p className="text-right font-mono text-sm font-medium text-neutral-500 dark:text-zinc-400">
                                    {fmt(item.hargaBuyback)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Data harga emas tidak tersedia saat ini.
                </p>
            )}
        </Layout>
    );
}
