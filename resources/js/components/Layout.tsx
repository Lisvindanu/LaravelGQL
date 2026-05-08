import { type PropsWithChildren } from 'react';
import NavBar from '@/components/NavBar';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <div className="h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-400" />
            <NavBar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
