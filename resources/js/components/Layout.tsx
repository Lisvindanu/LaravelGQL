import { type PropsWithChildren } from 'react';
import NavBar from '@/components/NavBar';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <NavBar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
