'use client';

import { useQuery } from '@tanstack/react-query';
import { monitorApi } from '@sporton/apis';
import { useAuth } from './useAuth';

export const useDashboard = () => {
    const { admin } = useAuth();

  const overviewQuery = useQuery({
    queryKey: ['dashboard', 'overview', admin?.id],
    queryFn: () => monitorApi.getDashboardOverview(admin?.id!),
    enabled: !!admin?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const metricsQuery = useQuery({
    queryKey: ['dashboard', 'metrics', admin?.id],
    queryFn: () => monitorApi.getDashboardMetrics(admin?.id!),
    enabled: !!admin?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    overview: overviewQuery.data?.data,
    metrics: metricsQuery.data?.data,
    isLoading: overviewQuery.isLoading || metricsQuery.isLoading,
    error: overviewQuery.error || metricsQuery.error,
    refetch: () => {
      overviewQuery.refetch();
      metricsQuery.refetch();
    },
  };
};
