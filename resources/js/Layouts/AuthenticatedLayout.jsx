import { useState } from 'react';
import Header from '@/Components/Header';
import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';

export default function AuthenticatedLayout({
    headerTitle,
    headerDescription,
    headerAction,
    children,
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f3f6fa] text-slate-900 lg:flex">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="mx-auto w-full max-w-[1600px] flex-1 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
                    {headerTitle && (
                        <Header
                            title={headerTitle}
                            description={headerDescription}
                            action={headerAction}
                        />
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
