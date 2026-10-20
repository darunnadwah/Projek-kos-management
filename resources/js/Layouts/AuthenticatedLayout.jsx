import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';

export default function AuthenticatedLayout({ headerTitle, headerAction, children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Modular */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar Modular */}
                <Navbar />

                {/* Main Content & Header */}
                <main className="p-6 flex-1 overflow-y-auto">
                    {headerTitle && <Header title={headerTitle} action={headerAction} />}
                    {children}
                </main>
            </div>
        </div>
    );
}