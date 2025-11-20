"use client"
import './globals.css'
import '@sporton/ui'
import { Providers } from '@/components/providers'
import useLanguageStore from '@/store/useLanguageStore';
import { useEffect } from 'react';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { locale, isClient } = useLanguageStore();
    useEffect(() => {
        document.documentElement.dir = locale === 'en' ? 'ltr' : 'rtl';
        document.documentElement.lang = locale;
    }, [locale]);
    const content = isClient ? (<Providers>
        {children}
    </Providers>) : null
    return (
        <html suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/auth-admin/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/auth-admin/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/auth-admin/favicon-32x32.png" />
                <link rel="manifest" href="/auth-admin/site.webmanifest" />
                <meta name="theme-color" content="#000000" />
                <title>Sporton - سبورتون</title>
                <meta name="description" content="اول منصه رياضيه متكامله لتسويق اللاعبين والفرق والمدربين والملاعب والمنتجات الرياضية وتحليل الاداء والمجتمع الرياضي" />
                <meta name="author" content="Sporton" />
                <meta name="keywords" content="منصه رياضيه ، تسويق اللاعبين ، فيديوهات رياضيه ،تحليل اداء، مجتمع رياضي ،فرص عمل ، cv للاعبين ، منصه تسويق للاعبين ، منصه تسويق للفرق ، منصه تسويق للمدربين ، منصه تسويق للملاعب ، منصه تسويق للمنتجات الرياضية" />
                <meta name="robots" content="index, follow" />

            </head>
            <body >
                {content}
            </body>
        </html>
    )
} 