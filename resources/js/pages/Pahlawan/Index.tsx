import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { PahlawanNasionalItem } from '@/types/indonesiaql';

interface Props {
    list: PahlawanNasionalItem[];
}

const AVATAR_COLORS = [
    '#c0392b', '#e74c3c', '#8e44ad', '#2980b9',
    '#16a085', '#27ae60', '#d35400', '#2c3e50',
    '#7f8c8d', '#1abc9c', '#e67e22', '#2ecc71',
];

function avatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}

export default function PahlawanIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter(
              (p) =>
                  p.nama.toLowerCase().includes(search.toLowerCase()) ||
                  p.deskripsi.toLowerCase().includes(search.toLowerCase()),
          )
        : list;

    return (
        <Layout>
            <Head title="Pahlawan Nasional Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Sejarah · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Pahlawan Nasional
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} pahlawan nasional Indonesia
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nama atau deskripsi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item) => (
                    <div
                        key={item.nama}
                        className="flex gap-3 rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: avatarColor(item.nama) }}
                        >
                            {initials(item.nama)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                                <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.nama}
                                </p>
                                <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    {item.tahunDiangkat}
                                </span>
                            </div>
                            <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 dark:text-zinc-400 line-clamp-2">
                                {item.deskripsi}
                            </p>
                            <p className="mt-1.5 text-[10px] text-neutral-400 dark:text-zinc-600">
                                {item.tahunLahir > 0 ? item.tahunLahir : '?'} – {item.tahunWafat}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada pahlawan yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
