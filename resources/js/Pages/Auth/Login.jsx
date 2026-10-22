import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 sm:px-6 lg:px-8">
            <Head title="Login - Kosmate" />

            {/* Logo / Brand Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl shadow-lg mb-2">
                    
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Kosmate
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                    Sistem Manajemen Kost & Pengelolaan Penghuni
                </p>
            </div>

            {/* Login Card Container */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-100">
                    
                    {status && (
                        <div className="mb-4 text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-slate-700 font-medium" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between">
                                <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-medium" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-indigo-600 hover:text-indigo-900 font-medium"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <PrimaryButton
                                className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500 py-2.5 rounded-lg text-base font-semibold shadow-md transition-all duration-150"
                                disabled={processing}
                            >
                                {processing ? 'Memproses Masuk...' : 'Masuk ke Dashboard'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Footer copyright atau info kecil di bawah card */}
                <div className="text-center mt-6">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Kosmate Management. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}