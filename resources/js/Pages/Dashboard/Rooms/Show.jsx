import { Link } from '@inertiajs/react';

export default function Show({ room }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Detail Kamar {room.room_number}</h3>

                <div className="space-y-3 border-t border-b border-gray-100 py-4 my-4">
                    <p className="text-sm text-gray-700">
                        <strong className="font-semibold text-gray-900">Nomor Kamar:</strong> {room.room_number}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong className="font-semibold text-gray-900">Status:</strong>{' '}
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {room.status}
                        </span>
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong className="font-semibold text-gray-900">Harga Dasar:</strong> Rp {Number(room.base_price).toLocaleString('id-ID')}
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link href="/rooms" className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium">
                        Kembali
                    </Link>
                    <Link href={`/rooms/${room.id}/edit`} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}