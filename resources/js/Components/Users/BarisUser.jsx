import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function BarisUser({ user }) {
    const [konfirmasi, setKonfirmasi] = useState(false);

    const getRoleBadge = (role) => {
        switch (role) {
            case 'superadmin':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'admin':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3 text-sm font-medium text-gray-900">{user.name}</td>
            <td className="p-3 text-sm text-gray-700">{user.email}</td>
            <td className="p-3 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadge(user.role)}`}>
                    {user.role ? user.role.toUpperCase() : 'PENGEKOS'}
                </span>
            </td>
            <td className="p-3 text-sm">
                <div className="flex items-center gap-3">
                    <Link href={`/users/${user.id}`} className="text-green-600 hover:underline">
                        Detail
                    </Link>
                    <Link href={`/users/${user.id}/edit`} className="text-blue-600 hover:underline">
                        Ubah
                    </Link>

                    {/* State Konfirmasi Hapus Bawaan React */}
                    {konfirmasi ? (
                        <span className="inline-flex items-center gap-2 bg-red-50 p-1 rounded border border-red-200">
                            <span className="text-xs text-red-700">Hapus?</span>
                            <Link
                                href={`/users/${user.id}`}
                                method="delete"
                                as="button"
                                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                            >
                                Ya
                            </Link>
                            <button
                                onClick={() => setKonfirmasi(false)}
                                className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400"
                            >
                                Batal
                            </button>
                        </span>
                    ) : (
                        <button
                            onClick={() => setKonfirmasi(true)}
                            className="text-red-500 hover:underline"
                        >
                            Hapus
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}