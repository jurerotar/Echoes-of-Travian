import type { Resolver } from 'app/interfaces/models/common';
import type { GameEventType } from 'app/interfaces/models/events/game-event';

export const troopTrainingEventResolver: Resolver<GameEventType.TROOP_TRAINING> = async (_args, _queryClient) => {};