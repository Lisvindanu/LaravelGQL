import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { HargaBBMItem } from '@/types/indonesiaql';

interface Props {
    list: HargaBBMItem[];
}

const fmt = (n: number) => new Intl.NumberFormat('id-ID').format(n);

export default function HargaBBMIndex({ list }: Props) {
    const nonSubsidi = list.filter((i) => i.jenis === 'Non-Subsidi');
    const subsidi = list.filter((i) => i.jenis === 'Subsidi');

    const Section = ({
        title,
        items,
    }: {
        title: string;
        items: HargaBBMItem[];
    }) =>
        items.length === 0 ? null : (
            <div className="mb-8">
                <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                    {title}
                </p>
                <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                    {items.map((item) => (
                        <div
                            key={item.nama}
                            className="flex items-baseline justify-between py-3"
                        >
                            <p className="text-sm font-medium text-neutral-700 dark:text-zinc-300">
                                {item.nama}
                            </p>
                            <div className="text-right">
                                <p className="font-mono text-sm font-black text-neutral-900 dark:text-white">
                                    Rp {fmt(item.harga)}
                                </p>
                                <p className="text-[10px] text-neutral-400 dark:text-zinc-500">
                                    /{item.satuan}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

    return (
        <Layout>
            <Head title="Harga BBM" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Pertamina · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Harga BBM
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Harga bahan bakar minyak Pertamina
                </p>
            </div>

            <div className="max-w-sm">
                <Section title="Non-Subsidi" items={nonSubsidi} />
                <Section title="Subsidi" items={subsidi} />
            </div>
        </Layout>
    );
}
