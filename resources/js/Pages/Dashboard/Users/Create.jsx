import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import UserForm from '@/Components/Users/UserForm';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        role: 'pengekos',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Tambah Pengguna" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tambah Pengguna Baru</h1>
                <Link href="/users" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                    Batal
                </Link>
            </div>
            <UserForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                handleSubmit={handleSubmit}
                isEdit={false}
            />
        </div>
    );
}