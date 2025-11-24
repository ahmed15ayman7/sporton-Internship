'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@sporton/apis';
import { useAuth } from './useAuth';

export const useActivity = (filters?: {
  limit?: number;
  offset?: number;
}) => {
  const { admin } = useAuth();

  const activityQuery = useQuery({
    queryKey: ['dashboard', 'activity', admin?.id, filters],
    queryFn: () => dashboardApi.getDashboardActivity({ 
      userId: admin?.id,
      ...filters 
    }),
    enabled: !!admin?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes for activity
  });

  return {
    activity: activityQuery.data?.data,
    isLoading: activityQuery.isLoading,
    error: activityQuery.error,
    refetch: () => activityQuery.refetch(),
  };
};
