'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@sporton/apis';

export const useHealth = () => {
  const healthQuery = useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: () => dashboardApi.getDashboardHealth(),
    staleTime: 1 * 60 * 1000, // 1 minute for health
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  return {
    health: healthQuery.data?.data,
    isLoading: healthQuery.isLoading,
    error: healthQuery.error,
    refetch: () => healthQuery.refetch(),
  };
};
