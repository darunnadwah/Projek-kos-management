import React from 'react';
import { Link } from "@inertiajs/react";

export default function Kosong({ pesan, aksi, urlTambah }) {
    return (
        <div className="p-8 text-center bg-white border rounded shadow-sm">
            <p className="text-gray-500 mb-4">{pesan}</p>
            <Link href={urlTambah} className="bg-blue-600 text-white px-4 py-2 rounded">
                {aksi}
            </Link>
        </div>
    );
}