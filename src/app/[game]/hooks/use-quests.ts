import { useQuery } from '@tanstack/react-query';
import { useCurrentVillage } from 'app/[game]/hooks/use-current-village';
import type { Quest } from 'interfaces/models/game/quest';

export const questsCacheKey = 'quests';

export const useQuests = () => {
  const { currentVillageId } = useCurrentVillage();

  const { data: quests } = useQuery<Quest[]>({
    queryKey: [questsCacheKey],
    initialData: [],
  });

  const globalQuests = quests.filter(({ scope }) => scope === 'global');
  const currentVillageQuests = quests.filter(({ villageId }) => villageId === currentVillageId);

  return {
    quests,
    globalQuests,
    currentVillageQuests,
  };
};
