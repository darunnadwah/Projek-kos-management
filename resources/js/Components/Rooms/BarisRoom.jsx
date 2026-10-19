import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import RoomStatus from './RoomStatus'; 
// atau pakai: import RoomStatus from '@/Components/Rooms/RoomStatus';

export default function BarisRoom({ room }) {
    // State untuk konfirmasi hapus
    const [konfirmasi, setKonfirmasi] = useState(false);

    return (
        <tr className="border-b">
            <td className="p-3 text-center">{room.room_number}</td>
            <td className="p-3">Rp {room.base_price}</td>
            <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${room.status === 'tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {room.status}
                </span>
            </td>
            <td className="p-3">
                <Link href={`/rooms/${room.id}`} className="text-green-600 mr-3">Detail</Link>
                <Link href={`/rooms/${room.id}/edit`} className="text-blue-500 mr-3">Ubah</Link>

                {/* Logika Konfirmasi Hapus Menggunakan State */}
                {konfirmasi ? (
                    <span className="inline-flex items-center gap-2 bg-red-50 p-1 rounded">
                        <span className="text-xs text-red-800">Yakin dihapus?</span>
                        <Link href={`/rooms/${room.id}`} method="delete" as="button" className="text-xs bg-red-600 text-white px-2 py-1 rounded">Ya</Link>
                        <button onClick={() => setKonfirmasi(false)} className="text-xs bg-gray-300 px-2 py-1 rounded">Batal</button>
                    </span>
                ) : (
                    <button onClick={() => setKonfirmasi(true)} className="text-red-500">Hapus</button>
                )}
            </td>
        </tr>
    );
}