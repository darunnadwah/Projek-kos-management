import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout
            title="Verifikasi email"
            description="Satu langkah lagi untuk mengaktifkan akun Kosmate."
        >
            <Head title="Verifikasi Email" />

            <div className="mb-5 text-sm leading-6 text-slate-600">
                Buka tautan verifikasi yang kami kirim ke emailmu. Jika belum
                menerima email, kamu bisa meminta tautan baru.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    Tautan verifikasi baru telah dikirim ke alamat emailmu.
                </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={submit}>
                <div>
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        {processing ? 'Mengirim...' : 'Kirim ulang tautan'}
                    </PrimaryButton>
                </div>

                <div className="text-center">
                    <Link
                        className="text-xs font-semibold text-slate-500 transition hover:text-slate-800"
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Keluar
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
