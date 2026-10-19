import React from 'react';
import { usePage } from "@inertiajs/react";

export default function PesanFlash() {
    const { flash } = usePage().props;
    
    if (!flash.sukses) return null;

    return (
        <div role="status" className="bg-green-100 text-green-800 p-4 mb-4 rounded shadow-sm">
            {flash.sukses}
        </div>
    );
}