import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItems = [
    { label: 'Beranda', href: '/', icon: '🏠' },
    { label: 'Wilayah', href: '/wilayah', icon: '🗺️' },
    { label: 'Cuaca', href: '/cuaca', icon: '🌤️' },
    { label: 'Kurs', href: '/kurs', icon: '💱' },
    { label: 'Hari Libur', href: '/hari-libur', icon: '📅' },
    { label: 'NIK', href: '/nik', icon: '🪪' },
    { label: 'Kalender Jawa', href: '/kalender-jawa', icon: '🗓️' },
    { label: 'Terbilang', href: '/terbilang', icon: '🔢' },
] as const;

export default function NavBar() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/90">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold"
                        onClick={() => setOpen(false)}
                    >
                        <span className="text-xl leading-none">🇮🇩</span>
                        <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent dark:from-red-400 dark:to-red-300">
                            Indonesia
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                            QL
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-0.5 md:flex">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                                    isActive(item.href)
                                        ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                                ].join(' ')}
                            >
                                <span className="text-sm leading-none">
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-800"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile slide-down menu */}
            {open && (
                <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden dark:border-gray-800 dark:bg-gray-900">
                    <div className="grid grid-cols-2 gap-1 pt-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={[
                                    'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive(item.href)
                                        ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
                                ].join(' ')}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
