import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="text-lg font-bold text-gray-800 tracking-wide">
                Sistem Manajemen Kost
            </div>
            <div className="flex items-center gap-4">
                <div className="text-sm text-right">
                    <p className="font-semibold text-gray-800">{user?.name || 'Pengguna'}</p>
                    <p className="text-xs text-indigo-600 capitalize font-medium">{user?.role || '-'}</p>
                </div>
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-2 rounded-lg transition border border-red-200"
                >
                    Logout
                </Link>
            </div>
        </header>
    );
}