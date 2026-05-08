import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Wilayah', href: '/wilayah' },
    { label: 'Cuaca', href: '/cuaca' },
    { label: 'Kurs', href: '/kurs' },
    { label: 'Hari Libur', href: '/hari-libur' },
    { label: 'NIK', href: '/nik' },
    { label: 'Kalender Jawa', href: '/kalender-jawa' },
    { label: 'Terbilang', href: '/terbilang' },
] as const;

export default function NavBar() {
    const { url } = usePage();

    const isActive = (href: string) =>
        href === '/' ? url === '/' : url.startsWith(href);

    return (
        <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400"
                    >
                        <span className="text-xl">🇮🇩</span>
                        <span>IndonesiaQL</span>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive(item.href)
                                        ? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                                ].join(' ')}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <select
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            value={
                                navItems.find((i) => isActive(i.href))?.href ??
                                '/'
                            }
                            onChange={(e) => {
                                window.location.href = e.target.value;
                            }}
                        >
                            {navItems.map((item) => (
                                <option key={item.href} value={item.href}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </nav>
    );
}
