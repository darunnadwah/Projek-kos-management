import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import RoomForm from '@/Components/Rooms/RoomForm';

export default function Edit({ room }) {
    const { data, setData, put, errors, processing } = useForm({
        room_number: room.room_number || '',
        base_price: room.base_price || '',
        status: room.status || 'available',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/rooms/${room.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title={`Edit Kamar ${room.room_number}`} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Data Kamar</h1>
                <Link href="/rooms" className="bg-gray-300 px-4 py-2 rounded">
                    Batal
                </Link>
            </div>

            <RoomForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                handleSubmit={handleSubmit}
                isEdit={true}
            />
        </div>
    );
}