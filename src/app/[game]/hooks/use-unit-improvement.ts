import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Unit } from 'interfaces/models/game/unit';
import type { UnitImprovement } from 'interfaces/models/game/unit-improvement';

export const unitImprovementCacheKey = 'unit-improvement';

export const useUnitImprovement = () => {
  const queryClient = useQueryClient();

  const { data: unitImprovements } = useQuery<UnitImprovement[]>({
    queryKey: [unitImprovementCacheKey],
    initialData: [],
  });

  const upgradeUnitTier = (tier: Unit['tier']) => {
    queryClient.setQueryData<UnitImprovement[]>([unitImprovementCacheKey], (prevData) => {
      return prevData!.map((unitImprovement) => {
        if (tier !== unitImprovement.tier) {
          return unitImprovement;
        }

        return {
          ...unitImprovement,
          level: unitImprovement.level + 1,
        };
      });
    });
  };

  return {
    unitImprovements,
    upgradeUnitTier,
  };
};
