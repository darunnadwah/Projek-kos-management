import { useForm, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const logoutForm = useForm({});

    const handleLogout = () => {
        logoutForm.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <p className="font-semibold text-gray-900">Kos Management</p>
                        <p className="text-sm text-gray-600">
                            {auth.user.name} · {auth.user.role}
                        </p>
                    </div>
                    <button
                        type="button"
                        disabled={logoutForm.processing}
                        onClick={handleLogout}
                        className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
                    >
                        {logoutForm.processing ? 'Keluar...' : 'Keluar'}
                    </button>
                </div>
            </header>
            {children}
        </div>
    );
}
