import { Village } from 'interfaces/models/game/village';
import { WithServerId } from 'interfaces/models/game/server';

/**
 * Quests can be server-wide (make an n-th village, kill x enemy troops,...), or village-wide (upgrade a building to lvl. 5,...)
 */
export type Quest = WithServerId<{
  id: number;
  scope: 'global' | 'village';
  villageId?: Village['id'];
  isCompleted: boolean;
}>;
