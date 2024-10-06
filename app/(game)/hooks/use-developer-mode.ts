import { useQuery, useQueryClient } from '@tanstack/react-query';

const developerModeCacheKey = 'developer-mode';

export const useDeveloperMode = () => {
  const queryClient = useQueryClient();

  const { data: isDeveloperModeActive } = useQuery<boolean>({
    queryKey: [developerModeCacheKey],
    initialData: false,
  });

  const toggleDeveloperMode = () => {
    queryClient.setQueryData<boolean>([developerModeCacheKey], !isDeveloperModeActive);
  };

  return {
    isDeveloperModeActive,
    toggleDeveloperMode,
  };
};