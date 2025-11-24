'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthAdminProvider } from '@sporton/auth-admin';

// Create a client inside the client component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthAdminProvider>
        {children}
      </AuthAdminProvider>
    </QueryClientProvider>
  );
}
