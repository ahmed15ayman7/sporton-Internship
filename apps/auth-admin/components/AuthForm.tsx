'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDeviceInfo } from '../utils/device-info';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input, Alert, Modal } from '@sporton/ui';
import { authAdminApi } from '@sporton/apis';
import { useAuthAdmin } from '@sporton/auth-admin';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { Checkbox } from '@sporton/ui';
import { useTranslations } from 'next-intl';

// Validation schemas
const signinSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const verifyCodeSchema = z.object({
    otp: z.string().length(4, 'Code must be 4 digits'),
});

const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type AuthFormType = 'signin' | 'forgot-password' | 'reset-password'|"verify-code";

interface AuthFormProps {
    type: AuthFormType;
    email?: string;
    token?: string;
    role?: string;
}


// OTP Input component
const OTPInput = ({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) => {
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        const newValue = [...otp.map((d, idx) => (idx === index ? element.value : d))].join('');
        onChange(newValue);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
                {otp.map((data, index) => {
                    return (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            className="w-14 h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-primary-main focus:outline-none focus:ring-2 focus:ring-primary-main/20"
                        />
                    );
                })}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};


export const AuthForm: React.FC<AuthFormProps> = ({ type, email, token, role }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [loginAsGuestModal, setLoginAsGuestModal] = useState(false);
    const [nameGuest, setNameGuest] = useState('');
    const t = useTranslations();
    const router = useRouter();
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info';
        message: string;
    } | null>(null);

    const { login } = useAuthAdmin();

    const getSchema = () => {
        switch (type) {
            case 'signin': return signinSchema;
            case 'forgot-password': return forgotPasswordSchema;
            case 'verify-code': return verifyCodeSchema;
            case 'reset-password': return resetPasswordSchema;
            default: return signinSchema;
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(getSchema() as any),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setAlert(null);
        if (!captchaValue && type === 'forgot-password') {
            setAlert({ type: 'error', message: 'تأكيد أنك لست روبوت مطلوب' });
            setIsLoading(false);
            return;
        }
        try {
            switch (type) {
                case 'signin':
                    const loginResult = await authAdminApi.loginAdmin({
                        email: data.email,
                        password: data.password,
                        rememberMe: data.rememberMe,
                        ...getDeviceInfo(),
                    });

                    if (loginResult.status >= 200 && loginResult.status < 300) {
                        console.log("loginResult",loginResult.data);
                        await login(loginResult.data);
                        setAlert({ type: 'success', message: t('loginSuccessful') });
                    } else {
                        console.log("loginResult error",loginResult.data);
                        setAlert({ type: 'error', message: loginResult.data.message });
                    }
                    break;
                case 'forgot-password':
                    setAlert({ type: 'success', message: 'Password reset successfully!' });
                    router.push('/signin');
                    break;
                case 'verify-code':
                    setAlert({ type: 'success', message: 'Code verified successfully!' });
                    router.push('/reset-password');
                    break;

                case 'reset-password':
                    setAlert({ type: 'success', message: 'Password reset successfully!' });
                    router.push('/signin');
                    break;

                default:
                    break;
            }
        } catch (error: any) {
            setAlert({
                type: 'error',
                message: error.message || 'Something went wrong',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getFormContent = (setLoginAsGuestModal: (value: boolean) => void) => {
        switch (type) {
            case 'signin':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-2">{t('signin.title')}</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <label className="text-gray-600 text-sm">{t('signin.email')}</label>
                            <input
                                type="email"
                                className="border rounded-md px-3 py-2 focus:ring-secondary-main focus:outline-none"
                                {...register('email')}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}

                            <label className="text-gray-600 text-sm flex items-center justify-between">
                                {t('signin.password')}
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="flex items-center gap-1 text-secondary-main cursor-pointer"
                                >
                                    {showPassword ? <EyeOff width="18" /> : <Eye width="18" />}
                                    {/* {showPassword ? 'Hide' : 'Show'} */}
                                </span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border rounded-md px-3 py-2 focus:ring-secondary-main focus:outline-none"
                                {...register('password')}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}

                            <div className="flex justify-between items-center mt-1">
                                <label className="flex items-center gap-2 text-sm">
                                    <Checkbox  checked={watch('rememberMe')} onChange={(checkd) => setValue("rememberMe", checkd)} />
                                    {t('signin.rememberMe')}
                                </label>
                                <Link className="text-xs text-secondary-main" href="/forgot-password">
                                    {t('signin.forgotPassword')}
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="disabled:bg-primary-light bg-primary-main text-white rounded-full py-3 mt-3 text-lg font-semibold transition active:bg-primary-main active:text-white disabled:opacity-50"
                            >
                                {isLoading ? t('signin.loading') : t('signin.submit')}
                            </button>
                        </form>
                    </>
                );

            case 'forgot-password':
                return (
                    <>
                        <h2 className="text-xl font-bold text-center mb-2">{t('forgot.title')}</h2>
                        <p className="text-center text-gray-600 text-sm mb-6">{t('forgot.subtitle')}</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <Input label={t('forgot.email')} type="email" {...register('email')} />
                            <Button type="submit" loading={isLoading} fullWidth>{t('forgot.submit')}</Button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-4">
                            {t('signup.haveAccount')}{' '}
                            <Link href="/signin" className="text-primary-main">{t('signin.title')}</Link>
                        </p>
                    </>
                );

            case 'verify-code':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-2">{t('verify.title')}</h2>
                        <p className="text-center text-gray-400 text-sm mb-8">
                            {t('verify.subtitle')}<br />
                            <strong>{email}</strong>
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <OTPInput
                                value={otpValue}
                                onChange={(value) => {
                                    setOtpValue(value);
                                    setValue('otp', value);
                                }}
                                error={errors.otp?.message as string}
                            />
                            <Button type="submit" loading={isLoading} fullWidth>{t('verify.submit')}</Button>
                        </form>
                    </>
                );

            case 'reset-password':
                return (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-2">{t('reset.title')}</h2>
                        <p className="text-center text-gray-400 text-sm mb-6">
                            {t('reset.subtitle')}
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <Input
                                label={t('reset.create')}
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                icon={showPassword ? <EyeOff onClick={() => setShowPassword(false)} /> : <Eye onClick={() => setShowPassword(true)} />}
                            />
                            <Input
                                label={t('reset.reenter')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                icon={showConfirmPassword ? <EyeOff onClick={() => setShowConfirmPassword(false)} /> : <Eye onClick={() => setShowConfirmPassword(true)} />}
                            />
                            <Button type="submit" loading={isLoading} fullWidth>{t('reset.submit')}</Button>
                        </form>
                    </>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '28rem', margin: '0 auto' }}
        >
            <div className="bg-white max-w-md rounded-xl shadow-md p-8">
                {alert && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                        <Alert variant={alert.type} closable onClose={() => setAlert(null)}>
                            {alert.message}
                        </Alert>
                    </motion.div>
                )}
                {getFormContent(setLoginAsGuestModal)}
                {loginAsGuestModal && (

                    <Modal
                        isOpen={loginAsGuestModal}
                        onClose={() => setLoginAsGuestModal(false)}
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-2">{t('continueAsGuest.title')}</h2>
                            <p className="text-center text-gray-400 text-sm mb-5">
                                {t('continueAsGuest.subtitle')}{' '}
                            </p>
                            <Input label={t('continueAsGuest.name')} className='mb-4' placeholder="e.g. John Doe" onChange={(e) => setNameGuest(e.target.value)} value={nameGuest} defaultValue={localStorage.getItem("NameGuest")||""} />
                            <Button type="submit" loading={isLoading} fullWidth onClick={() => {
                                let guestemail = localStorage.getItem("Guest") || ""
                                window.location.href = `https://api.sporton.club/auth/guest?email=${guestemail}&name=${nameGuest}`;
                                localStorage.setItem("NameGuest",nameGuest);
                            }}
                            >{t('continueAsGuest.button')}</Button>
                        </div>
                    </Modal>
                )}
            </div>
        </motion.div>
    );
};