import { useQuery } from '@tanstack/react-query';
import { useCurrentServer } from 'app/[game]/hooks/use-current-server';
import { usePlayers } from 'app/[game]/hooks/use-players';
import type { OccupiedOasisTile } from 'interfaces/models/game/tile';
import type { Village } from 'interfaces/models/game/village';
import { getParsedFileContents } from 'app/utils/opfs';

export const villagesCacheKey = 'villages';

export const getVillageById = (villages: Village[], villageId: Village['id']): Village => {
  return villages.find(({ id }) => id === villageId)!;
};

// const getVillageByCoordinates = (villages: Village[], coordinates: Village['coordinates']): Village | null => {
//   return villages.find(({ coordinates: { x, y } }) => coordinates.x === x && coordinates.y === y) ?? null;
// };
//
// const getVillageByOasis = (villages: Village[], { villageId }: OccupiedOasisTile): Village => {
//   return villages.find(({ id }) => villageId === id)!;
// };

export const useVillages = () => {
  const { serverHandle } = useCurrentServer();
  const { playerId } = usePlayers();

  const { data: villages } = useQuery<Village[]>({
    queryFn: () => getParsedFileContents(serverHandle, 'villages'),
    queryKey: [villagesCacheKey],
    initialData: [],
  });

  const playerVillages: Village[] = villages.filter((village: Village) => village.playerId === playerId);
  const npcVillages: Village[] = villages.filter((village: Village) => village.playerId !== playerId);

  const getVillageByCoordinates = (coordinates: Village['coordinates']): Village | null => {
    return villages.find(({ coordinates: { x, y } }) => coordinates.x === x && coordinates.y === y) ?? null;
  };

  const getVillageByOasis = ({ villageId }: OccupiedOasisTile): Village => {
    return villages.find(({ id }) => villageId === id)!;
  };

  return {
    villages,
    playerVillages,
    npcVillages,
    getVillageByCoordinates,
    getVillageByOasis,
  };
};
