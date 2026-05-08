import { Link, usePage } from '@inertiajs/react';

const navGroups = [
    {
        items: [
            { label: 'Beranda', href: '/' },
            { label: 'Playground', href: '/playground' },
        ],
    },
    {
        label: 'Data',
        items: [
            { label: 'Wilayah', href: '/wilayah' },
            { label: 'Cuaca', href: '/cuaca' },
            { label: 'Kurs', href: '/kurs' },
            { label: 'Hari Libur', href: '/hari-libur' },
        ],
    },
    {
        label: 'Utilitas',
        items: [
            { label: 'Validasi NIK', href: '/nik' },
            { label: 'Kalender Jawa', href: '/kalender-jawa' },
            { label: 'Terbilang', href: '/terbilang' },
        ],
    },
    {
        label: 'Referensi',
        items: [
            { label: 'Kode Bank', href: '/kode-bank' },
            { label: 'Plat Nomor', href: '/plat-nomor' },
            { label: 'Waktu Sholat', href: '/waktu-sholat' },
        ],
    },
];

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function NavBar({ open, onClose }: Props) {
    const { url } = usePage();

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <aside
            className={[
                'fixed top-0 left-0 z-30 flex h-full w-52 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-950',
                open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            ].join(' ')}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-5">
                <Link href="/" onClick={onClose} className="group flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        🇮🇩 Indonesia
                    </span>
                    <span className="font-display text-xl font-black leading-none tracking-tight text-neutral-900 dark:text-white">
                        QL
                    </span>
                </Link>
                <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center text-neutral-400 hover:text-neutral-900 md:hidden dark:hover:text-white"
                    aria-label="Close"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="h-px bg-neutral-100 dark:bg-zinc-800" />

            {/* Nav groups */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
                {navGroups.map((group, gi) => (
                    <div key={gi} className={gi > 0 ? 'mt-5' : ''}>
                        {group.label && (
                            <p className="mb-2 px-1 text-[10px] font-bold tracking-[0.15em] text-neutral-300 uppercase dark:text-zinc-600">
                                {group.label}
                            </p>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={[
                                            'flex items-center rounded-md px-3 py-2 text-sm transition-all duration-100',
                                            active
                                                ? 'border-l-2 border-red-600 bg-neutral-50 pl-[10px] font-semibold text-neutral-900 dark:bg-zinc-900 dark:text-white'
                                                : 'border-l-2 border-transparent font-medium text-neutral-400 hover:text-neutral-700 dark:text-zinc-500 dark:hover:text-zinc-200',
                                        ].join(' ')}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-neutral-100 px-5 py-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    <span className="text-xs font-medium tracking-wide text-neutral-400 dark:text-zinc-500">
                        API Live
                    </span>
                </div>
            </div>
        </aside>
    );
}
