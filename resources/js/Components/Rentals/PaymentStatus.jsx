import React from 'react';

export default function PaymentStatus({ status }) {
    const isVerified = status?.toLowerCase() === 'verified';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            isVerified 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border-amber-300'
        }`}>
            {isVerified ? 'LUNAS' : 'PENDING'}
        </span>
    );
}