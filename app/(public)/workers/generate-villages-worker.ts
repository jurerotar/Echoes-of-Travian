import { generateVillages } from 'app/factories/village-factory';
import type { Player } from 'app/interfaces/models/game/player';
import type { OccupiedOccupiableTile } from 'app/interfaces/models/game/tile';
import type { Village } from 'app/interfaces/models/game/village';

export type GenerateVillageWorkerPayload = {
  occupiedOccupiableTiles: OccupiedOccupiableTile[];
  players: Player[];
};

export type GenerateVillageWorkerReturn = {
  villages: Village[];
};

self.addEventListener('message', async (event: MessageEvent<GenerateVillageWorkerPayload>) => {
  const villages = generateVillages(event.data);

  self.postMessage({ villages });
  self.close();
});