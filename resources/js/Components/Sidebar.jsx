import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const isActive = (path) => url.startsWith(path);

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-5 flex flex-col justify-between shadow-lg">
            <div>
                <div className="text-2xl font-black tracking-wider text-indigo-400 mb-8 border-b border-slate-800 pb-4">
                    🏡 Kosmate
                </div>
                <nav className="space-y-2">
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                            isActive('/dashboard') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        Dashboard
                    </Link>

                    {(user?.role === 'admin' || user?.role === 'superadmin' ) && (
                        <Link
                            href={route('rooms.index')}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                isActive('/rooms') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            Kelola Kamar
                        </Link>
                    )}

                    <Link
                        href={route('rentals.index')}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                            isActive('/rentals') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        {user?.role === 'user' ? 'Sewa Kamar' : 'Kelola Penyewaan'}
                    </Link>

                    <Link
                        href={route('permits.index')}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                            isActive('/permits') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        {user?.role === 'user' ? 'Ajukan Izin' : 'Kelola Izin'}
                    </Link>

                    {user?.role === 'superadmin' && (
                        <Link
                            href={route('users.index')}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                                isActive('/users') ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            Kelola Pengguna
                        </Link>
                    )}
                </nav>
            </div>
            <div className="text-xs text-slate-500 border-t border-slate-800 pt-4 truncate">
                Email: <span className="text-slate-300 font-medium">{user?.email || '-'}</span>
            </div>
        </aside>
    );
}