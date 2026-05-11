import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { PenginapanItem } from '@/types/indonesiaql';

interface Props {
    list: PenginapanItem[];
    kotaInput: string;
}

const tipeLabel: Record<string, string> = {
    hotel: 'Hotel',
    guest_house: 'Guest House',
    hostel: 'Hostel',
    motel: 'Motel',
    inn: 'Inn',
};

export default function PenginapanIndex({ list, kotaInput }: Props) {
    const [kota, setKota] = useState(kotaInput);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (kota.trim()) {
            router.get('/penginapan', { kota: kota.trim() });
        }
    };

    return (
        <Layout>
            <Head title="Penginapan & Hotel" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    OpenStreetMap · Data
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Penginapan & Hotel
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Cari hotel, guest house, dan hostel berdasarkan nama kota
                </p>
            </div>

            <form onSubmit={handleSearch} className="mb-8 flex gap-2 max-w-md">
                <input
                    type="text"
                    placeholder="Contoh: Yogyakarta"
                    value={kota}
                    onChange={(e) => setKota(e.target.value)}
                    className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
                <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none"
                >
                    Cari
                </button>
            </form>

            {kotaInput && list.length > 0 && (
                <p className="mb-4 text-xs text-neutral-400 dark:text-zinc-500">
                    {list.length} tempat ditemukan di{' '}
                    <span className="font-semibold text-neutral-700 dark:text-zinc-300">
                        {kotaInput}
                    </span>
                </p>
            )}

            {list.length > 0 && (
                <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                    {list.map((item) => (
                        <div key={item.id} className="py-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                            {item.nama}
                                        </p>
                                        {item.bintang && (
                                            <span className="shrink-0 text-xs text-yellow-500">
                                                {'★'.repeat(
                                                    Math.min(
                                                        parseInt(item.bintang) || 0,
                                                        5,
                                                    ),
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <span className="mt-0.5 inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-zinc-800 dark:text-zinc-400">
                                        {tipeLabel[item.tipe] ?? item.tipe}
                                    </span>
                                    {item.alamat && (
                                        <p className="mt-1 text-xs text-neutral-400 dark:text-zinc-500">
                                            {item.alamat}
                                        </p>
                                    )}
                                    <div className="mt-1.5 flex flex-wrap gap-3">
                                        {item.telepon && (
                                            <a
                                                href={`tel:${item.telepon}`}
                                                className="text-xs text-red-600 hover:underline dark:text-red-400"
                                            >
                                                {item.telepon}
                                            </a>
                                        )}
                                        {item.website && (
                                            <a
                                                href={item.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-red-600 hover:underline dark:text-red-400"
                                            >
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <a
                                    href={`https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lon}&zoom=17`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 text-[10px] text-neutral-300 hover:text-red-600 dark:text-zinc-600 dark:hover:text-red-400"
                                >
                                    Peta
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {kotaInput && list.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada penginapan ditemukan di "{kotaInput}".
                </p>
            )}

            {!kotaInput && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Masukkan nama kota untuk mencari penginapan.
                </p>
            )}
        </Layout>
    );
}
