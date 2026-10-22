import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout
            title="Atur ulang kata sandi"
            description="Kami akan mengirim tautan pengaturan ulang ke alamat email akunmu."
        >
            <Head title="Atur Ulang Kata Sandi" />

            {status && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {status}
                </div>
            )}

            <form className="space-y-5" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Alamat email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full px-4 py-3 text-sm"
                        isFocused={true}
                        placeholder="nama@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div className="pt-1">
                    <PrimaryButton
                        className="w-full justify-center py-3"
                        disabled={processing}
                    >
                        {processing ? 'Mengirim...' : 'Kirim tautan'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
