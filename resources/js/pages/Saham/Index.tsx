import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { IHSGResult } from '@/types/indonesiaql';

interface Props {
    ihsg: IHSGResult | null;
}

const fmt = (n: number) => new Intl.NumberFormat('id-ID').format(n);
const fmtDec = (n: number) =>
    new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n);

export default function SahamIndex({ ihsg }: Props) {
    const isNaik = ihsg && ihsg.perubahan >= 0;

    return (
        <Layout>
            <Head title="IHSG / Saham" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    BEI · Yahoo Finance · 5 menit
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    IHSG
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Indeks Harga Saham Gabungan — Bursa Efek Indonesia
                </p>
            </div>

            {!ihsg ? (
                <p className="text-sm text-neutral-400">
                    Data tidak tersedia saat ini.
                </p>
            ) : (
                <div className="max-w-sm">
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <p className="font-mono text-xs font-bold text-neutral-400 dark:text-zinc-500">
                                    {ihsg.symbol}
                                </p>
                                <p className="mt-1 font-display text-3xl font-black text-neutral-900 tabular-nums dark:text-white">
                                    {fmtDec(ihsg.harga)}
                                </p>
                            </div>
                            <span
                                className={[
                                    'rounded-full px-3 py-1 text-sm font-bold',
                                    isNaik
                                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                                        : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
                                ].join(' ')}
                            >
                                {isNaik ? '+' : ''}
                                {fmtDec(ihsg.perubahan)} (
                                {fmtDec(ihsg.persentasePerubahan)}%)
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4 dark:border-zinc-800">
                            {[
                                { label: 'Open', value: fmtDec(ihsg.open) },
                                { label: 'High', value: fmtDec(ihsg.high) },
                                { label: 'Low', value: fmtDec(ihsg.low) },
                            ].map(({ label, value }) => (
                                <div key={label} className="text-center">
                                    <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                        {label}
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-semibold text-neutral-700 dark:text-zinc-300">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 space-y-1 border-t border-neutral-100 pt-3 dark:border-zinc-800">
                            <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-zinc-500">
                                <span>Volume</span>
                                <span className="font-mono font-semibold">
                                    {fmt(ihsg.volume)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-zinc-500">
                                <span>Diperbarui</span>
                                <span className="font-mono">{ihsg.waktu}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
