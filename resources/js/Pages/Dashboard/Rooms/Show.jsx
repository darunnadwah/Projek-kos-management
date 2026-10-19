import { Head, Link } from '@inertiajs/react';
import RoomStatus from './RoomStatus';

export default function Show({ room }) {
    return (
        <div className="mx-auto max-w-2xl p-4 sm:p-6">
            <Head title={`Detail kamar ${room.room_number}`} />
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow sm:p-6">
                <h1 className="mb-4 text-xl font-bold text-gray-800">Detail kamar {room.room_number}</h1>

                <dl className="my-4 space-y-4 border-y border-gray-100 py-4">
                    <div>
                        <dt className="text-sm font-semibold text-gray-900">Nomor kamar</dt>
                        <dd className="mt-1 text-sm text-gray-700">{room.room_number}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-semibold text-gray-900">Status</dt>
                        <dd className="mt-1"><RoomStatus status={room.status} /></dd>
                    </div>
                    <div>
                        <dt className="text-sm font-semibold text-gray-900">Harga dasar per bulan</dt>
                        <dd className="mt-1 text-sm text-gray-700">
                            Rp {Number(room.base_price).toLocaleString('id-ID')}
                        </dd>
                    </div>
                </dl>

                <div className="flex gap-2">
                    <Link href="/rooms" className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
                        Kembali
                    </Link>
                    <Link href={`/rooms/${room.id}/edit`} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700">
                        Ubah
                    </Link>
                </div>
            </div>
        </div>
    );
}