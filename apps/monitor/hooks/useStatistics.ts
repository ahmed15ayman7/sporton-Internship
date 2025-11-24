'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@sporton/apis';
import { useAuth } from './useAuth';

export const useStatistics = (filters?: {
  sport?: string;
  role?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}) => {
  const { admin } = useAuth();

  const statisticsQuery = useQuery({
    queryKey: ['dashboard', 'statistics', admin?.id, filters],
    queryFn: () => dashboardApi.getDashboardStatistics({ 
      userId: admin?.id,
      ...filters 
    }),
    enabled: !!admin?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    statistics: statisticsQuery.data?.data,
    isLoading: statisticsQuery.isLoading,
    error: statisticsQuery.error,
    refetch: () => statisticsQuery.refetch(),
  };
};
