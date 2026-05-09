import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { IuranBpjsItem } from '@/types/indonesiaql';

interface Props {
    list: IuranBpjsItem[];
}

const fmt = (n: number) => new Intl.NumberFormat('id-ID').format(n);

export default function BpjsIndex({ list }: Props) {
    return (
        <Layout>
            <Head title="Iuran BPJS" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    BPJS Kesehatan · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Iuran BPJS
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Besaran iuran BPJS Kesehatan per segmen peserta
                </p>
            </div>

            <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 py-2">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Kelas / Segmen
                    </p>
                    <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Iuran / Bulan
                    </p>
                    <p className="text-right text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                        Keterangan
                    </p>
                </div>
                {list.map((item, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 py-4 transition-colors hover:bg-neutral-50/60 dark:hover:bg-zinc-800/20"
                    >
                        <div>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                {item.kelas}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                {item.segmen}
                            </p>
                        </div>
                        <p className="text-right font-mono text-sm font-black text-neutral-900 dark:text-white">
                            {item.nominal === 0
                                ? 'Gratis'
                                : `Rp ${fmt(item.nominal)}`}
                        </p>
                        <p className="text-right text-xs text-neutral-400 dark:text-zinc-500">
                            {item.keterangan}
                        </p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
