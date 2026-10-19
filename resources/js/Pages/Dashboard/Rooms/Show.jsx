import React from 'react';
import { Head, Link } from '@inertiajs/react';
import RoomStatus from "@/Components/Rooms/RoomStatus";

export default function Show({ room }) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title={`Detail Kamar ${room.room_number}`} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Detail Kamar {room.room_number}</h1>
                <Link href="/rooms" className="bg-gray-300 px-4 py-2 rounded">
                    Kembali
                </Link>
            </div>

            <div className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <span className="font-bold block text-gray-700">ID Kamar:</span>
                    <span className="text-gray-900">{room.id}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Nomor Kamar:</span>
                    <span className="text-gray-900">{room.room_number}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700">Harga Dasar:</span>
                    <span className="text-gray-900">Rp {room.base_price}</span>
                </div>

                <div className="mb-4">
                    <span className="font-bold block text-gray-700 mb-1">Status Kamar:</span>
                    {/* Menggunakan Komponen RoomStatus */}
                    <RoomStatus status={room.status} />
                </div>
            </div>
        </div>
    );
}