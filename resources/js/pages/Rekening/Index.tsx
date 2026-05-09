import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { ValidasiRekeningResult } from '@/types/indonesiaql';

interface Props {
    bank: string;
    noRekening: string;
    result: ValidasiRekeningResult | null;
}

const BANKS = [
    'BCA',
    'MANDIRI',
    'BRI',
    'BNI',
    'BTN',
    'CIMB',
    'DANAMON',
    'PERMATA',
    'MAYBANK',
    'OCBC',
    'PANIN',
    'BSI',
    'BCA_SYA',
    'MEGA',
    'BTPN',
];

export default function RekeningIndex({ bank, noRekening, result }: Props) {
    const [selectedBank, setSelectedBank] = useState(bank);
    const [noRek, setNoRek] = useState(noRekening);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedBank && noRek.trim()) {
            router.get('/rekening', {
                bank: selectedBank,
                noRekening: noRek.trim(),
            });
        }
    };

    return (
        <Layout>
            <Head title="Validasi Rekening" />

            <div className="mb-10">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Perbankan · Format
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Validasi Rekening
                </h1>
                <p className="mt-2 text-neutral-400 dark:text-zinc-500">
                    Validasi format nomor rekening bank Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                Bank
                            </label>
                            <select
                                value={selectedBank}
                                onChange={(e) =>
                                    setSelectedBank(e.target.value)
                                }
                                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                            >
                                <option value="">Pilih Bank</option>
                                {BANKS.map((b) => (
                                    <option key={b} value={b}>
                                        {b.replace('_', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                Nomor Rekening
                            </label>
                            <input
                                type="text"
                                value={noRek}
                                onChange={(e) =>
                                    setNoRek(e.target.value.replace(/\D/g, ''))
                                }
                                placeholder="1234567890"
                                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 font-mono text-lg tracking-widest transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-600"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!selectedBank || !noRek.trim()}
                            className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                        >
                            Validasi Rekening
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4">
                        <div
                            className={[
                                'rounded-lg border p-6',
                                result.valid
                                    ? 'border-neutral-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                                    : 'border-red-200/60 bg-white dark:border-red-900/60 dark:bg-zinc-900',
                            ].join(' ')}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className={[
                                            'text-[10px] font-bold tracking-[0.2em] uppercase',
                                            result.valid
                                                ? 'text-green-600'
                                                : 'text-red-600',
                                        ].join(' ')}
                                    >
                                        {result.valid
                                            ? 'Format Valid'
                                            : 'Format Tidak Valid'}
                                    </p>
                                    <p className="mt-1 font-mono text-xl font-bold text-neutral-900 dark:text-white">
                                        {noRekening}
                                    </p>
                                </div>
                                <span className="text-2xl font-black text-neutral-400">
                                    {result.valid ? '✓' : '✗'}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 dark:border-zinc-800">
                                {[
                                    { label: 'Bank', value: result.bank },
                                    {
                                        label: 'Panjang',
                                        value: `${result.panjang} digit`,
                                    },
                                    {
                                        label: 'Keterangan',
                                        value: result.keterangan,
                                    },
                                ].map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-neutral-400 dark:text-zinc-500">
                                            {label}
                                        </span>
                                        <span className="font-semibold text-neutral-900 dark:text-white">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
