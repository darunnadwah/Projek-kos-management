import { Link, usePage } from '@inertiajs/react';

export default function Index({ rooms }) {
    const { flash } = usePage().props;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {flash?.success && (
                <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {flash.success}
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Daftar Kamar</h2>
                <Link
                    href="/rooms/create"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
                >
                    + Tambah Kamar
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3 text-sm font-semibold">Nomor Kamar</th>
                            <th className="p-3 text-sm font-semibold">Status</th>
                            <th className="p-3 text-sm font-semibold">Harga Dasar</th>
                            <th className="p-3 text-sm font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {rooms.data && rooms.data.length > 0 ? (
                            rooms.data.map((room) => (
                                <tr key={room.id} className="hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-700">{room.room_number}</td>
                                    <td className="p-3 text-sm">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                            {room.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-700">
                                        Rp {Number(room.base_price).toLocaleString('id-ID')}
                                    </td>
                                    <td className="p-3 text-sm space-x-2">
                                        <Link
                                            href={`/rooms/${room.id}`}
                                            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-xs"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            href={`/rooms/${room.id}/edit`}
                                            className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/rooms/${room.id}`}
                                            method="delete"
                                            as="button"
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-sm text-gray-500">
                                    Belum ada data kamar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}