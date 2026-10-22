import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout
            title="Konfirmasi kata sandi"
            description="Konfirmasi kata sandi untuk melanjutkan ke bagian yang aman."
        >
            <Head title="Konfirmasi Kata Sandi" />

            <div className="mb-4 text-sm leading-6 text-slate-600">
                Area ini memerlukan verifikasi tambahan. Masukkan kata sandimu
                sebelum melanjutkan.
            </div>

            <form className="space-y-5" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="password" value="Kata sandi" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full px-4 py-3 text-sm"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="pt-1">
                    <PrimaryButton
                        className="w-full justify-center"
                        disabled={processing}
                    >
                        Konfirmasi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
