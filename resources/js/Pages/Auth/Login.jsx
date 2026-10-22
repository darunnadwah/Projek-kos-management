import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout
            title="Selamat datang kembali"
            description="Masuk untuk mengelola informasi kos dan aktivitas penghuni."
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
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
                        autoComplete="username"
                        isFocused={true}
                        placeholder="nama@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata sandi" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full px-4 py-3 text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-xs text-slate-600">
                            Ingat saya
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            className="text-xs font-semibold text-[#315e50] transition hover:text-[#183b34] hover:underline"
                            href={route('password.request')}
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                <div className="pt-1">
                    <PrimaryButton
                        className="w-full justify-center py-3"
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
