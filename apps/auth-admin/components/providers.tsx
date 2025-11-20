'use client'

import { AuthAdminProvider } from '@sporton/auth-admin'
import { ToastProvider } from '@/components/toast-provider'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { WebSocketProvider } from '@sporton/apis'
import useLanguageStore from '@/store/useLanguageStore';
import { messages } from '@sporton/messages';

export function Providers({ children }: { children: React.ReactNode }) {
    const { locale } = useLanguageStore();
    
    return (
        <AuthAdminProvider >
            <NextIntlClientProvider messages={messages[locale as "en" | "ar"] as unknown as AbstractIntlMessages} locale={locale}>
                <WebSocketProvider autoConnect={false}>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </WebSocketProvider>
            </NextIntlClientProvider>
        </AuthAdminProvider>
    )
} 