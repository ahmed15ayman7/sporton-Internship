'use client';

import { useAuthAdmin as useAuthFromPackage } from '@sporton/auth-admin';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { admin, isLoading, logout } = useAuthFromPackage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !admin) {
      // Redirect to login if no user is authenticated
      router.push('/auth-admin/signin');
    }
  }, [admin, isLoading, router]);

  return {
    admin,
    isLoading,
    logout,
    isAuthenticated: !!admin,
  };
};
