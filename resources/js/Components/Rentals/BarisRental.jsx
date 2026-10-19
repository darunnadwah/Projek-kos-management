import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import RentalStatus from './RentalStatus';

export default function BarisRental({ rental }) {
    const [konfirmasi, setKonfirmasi] = useState(false);

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-3 text-sm font-medium text-gray-900">
                {rental.user ? rental.user.name : 'User Tidak Ditemukan'}
            </td>
            <td className="p-3 text-sm text-gray-700">
                {rental.room ? `Kamar No. ${rental.room.room_number}` : '-'}
            </td>
            <td className="p-3 text-sm text-gray-700">
                {rental.start_date} s/d {rental.end_date}
            </td>
            <td className="p-3 text-sm font-semibold text-gray-800">
                Rp {Number(rental.total_price || 0).toLocaleString('id-ID')}
            </td>
            <td className="p-3">
                <RentalStatus status={rental.status} />
            </td>
            <td className="p-3 text-sm">
                <div className="flex items-center gap-3">
                    <Link href={`/rentals/${rental.id}`} className="text-green-600 hover:underline">
                        Detail
                    </Link>
                    <Link href={`/rentals/${rental.id}/edit`} className="text-blue-600 hover:underline">
                        Ubah
                    </Link>

                    {/* Konfirmasi Hapus Menggunakan State React */}
                    {konfirmasi ? (
                        <span className="inline-flex items-center gap-2 bg-red-50 p-1 rounded border border-red-200">
                            <span className="text-xs text-red-700">Hapus?</span>
                            <Link
                                href={`/rentals/${rental.id}`}
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