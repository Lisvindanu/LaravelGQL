import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { KursItem } from '@/types/indonesiaql';

interface Props {
    kurs: KursItem[];
}

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

const NAMA: Record<string, string> = {
    USD: 'Dolar Amerika Serikat',
    EUR: 'Euro',
    GBP: 'Poundsterling Inggris',
    JPY: 'Yen Jepang',
    AUD: 'Dolar Australia',
    SGD: 'Dolar Singapura',
    CNY: 'Yuan Tiongkok',
    SAR: 'Riyal Arab Saudi',
    MYR: 'Ringgit Malaysia',
    HKD: 'Dolar Hong Kong',
    KRW: 'Won Korea Selatan',
    INR: 'Rupee India',
    CHF: 'Franc Swiss',
    AED: 'Dirham UEA',
};

export default function KursIndex({ kurs }: Props) {
    const tanggal = kurs[0]?.tanggal ?? '-';

    return (
        <Layout>
            <Head title="Kurs Valuta Asing" />

            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        Bank Indonesia · Diperbarui setiap jam
                    </p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Kurs Valuta Asing
                    </h1>
                </div>
                <div className="flex shrink-0 items-center gap-2 pt-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    <span className="font-mono text-xs font-medium text-neutral-500 dark:text-zinc-400">
                        {tanggal}
                    </span>
                </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-zinc-800">
                <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 border-b border-neutral-100 py-2 dark:border-zinc-800">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Mata Uang
                    </p>
                    <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Beli
                    </p>
                    <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Tengah
                    </p>
                    <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Jual
                    </p>
                </div>
                {kurs.map((item) => (
                    <div
                        key={item.mataUang}
                        className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 border-b border-neutral-100 py-4 transition-colors hover:bg-neutral-50/60 dark:border-zinc-800 dark:hover:bg-zinc-800/20"
                    >
                        <div>
                            <span className="font-mono text-sm font-black text-neutral-900 dark:text-white">
                                {item.mataUang}
                            </span>
                            <span className="ml-3 text-xs text-neutral-400 dark:text-zinc-500">
                                {NAMA[item.mataUang] ?? item.mataUang}
                            </span>
                        </div>
                        <p className="text-right font-mono text-sm text-neutral-500 tabular-nums dark:text-zinc-400">
                            {formatRupiah(item.kursBeli)}
                        </p>
                        <p className="text-right font-mono text-sm font-bold text-neutral-900 tabular-nums dark:text-white">
                            {formatRupiah(item.kursTengah)}
                        </p>
                        <p className="text-right font-mono text-sm text-neutral-500 tabular-nums dark:text-zinc-400">
                            {formatRupiah(item.kursJual)}
                        </p>
                    </div>
                ))}
            </div>

            <p className="mt-5 text-xs text-neutral-300 dark:text-zinc-700">
                Semua nilai dalam Rupiah (IDR).
            </p>
        </Layout>
    );
}
