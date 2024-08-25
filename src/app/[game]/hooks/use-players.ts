import { useQuery } from '@tanstack/react-query';
import type { Player } from 'interfaces/models/game/player';
import { useCallback } from 'react';

export const playersCacheKey = 'players';

export const usePlayers = () => {
  const { data: players } = useQuery<Player[]>({
    queryKey: [playersCacheKey],
    initialData: [],
  });

  const playerId = players.find((player) => player.faction === 'player')!.id;

  const getPlayerByPlayerId = useCallback(
    (playerIdToSearchFor: Player['id']): Player => {
      return players.find(({ id }) => playerIdToSearchFor === id)!;
    },
    [players],
  );

  return {
    players,
    getPlayerByPlayerId,
    playerId,
  };
};
