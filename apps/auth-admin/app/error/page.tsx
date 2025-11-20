'use client';

import { Button, LoadingAnimation } from '@sporton/ui';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AlertCircleIcon } from 'lucide-react';

 const AuthError = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <Image src="/images/logo.png" alt="logo" width={100} height={100} />
          <AlertCircleIcon className="w-10 h-10 text-red-500" />
          <h2 className="text-2xl font-bold mb-4">حدث خطأ </h2>
            <p className="text-muted-foreground mb-8">{message}</p>
            <div className="flex gap-4">
                <Button onClick={() => router.refresh()}>إعادة المحاولة</Button>
                <Button variant="outline" onClick={() => router.push('/signin')}>
                    العودة لتسجيل الدخول
                </Button>
            </div>
        </div>
    )
} 

export default function AuthErrorPage() {
  return <Suspense fallback={<LoadingAnimation />}>
    <AuthError />
  </Suspense>
}