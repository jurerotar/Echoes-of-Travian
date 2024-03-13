import { QueryClient } from '@tanstack/react-query';
import { achievementsCacheKey } from 'app/[game]/hooks/use-achievements';
import { effectsCacheKey } from 'app/[game]/hooks/use-effects';
import { eventsCacheKey } from 'app/[game]/hooks/use-events';
import { heroCacheKey } from 'app/[game]/hooks/use-hero';
import { mapCacheKey } from 'app/[game]/hooks/use-map';
import { questsCacheKey } from 'app/[game]/hooks/use-quests';
import { reportsCacheKey } from 'app/[game]/hooks/use-reports';
import { researchLevelsCacheKey } from 'app/[game]/hooks/use-research-levels';
import { villagesCacheKey } from 'app/[game]/hooks/use-villages';
import { currentServerCacheKey } from 'app/[game]/hooks/use-current-server';
import { Achievement } from 'interfaces/models/game/achievement';
import { Village } from 'interfaces/models/game/village';
import { Effect } from 'interfaces/models/game/effect';
import { Hero } from 'interfaces/models/game/hero';
import { Tile } from 'interfaces/models/game/tile';
import { Quest } from 'interfaces/models/game/quest';
import { ResearchLevel } from 'interfaces/models/game/research-level';
import { Server } from 'interfaces/models/game/server';
import { GameEvent } from 'interfaces/models/events/game-event';
import { Report } from 'interfaces/models/game/report';
import { serverMock } from 'mocks/models/game/server-mock';
import { Player } from 'interfaces/models/game/player';
import { playersCacheKey } from 'app/[game]/hooks/use-players';
import { Reputation } from 'interfaces/models/game/reputation';
import { reputationsCacheKey } from 'app/[game]/hooks/use-reputations';
import { mapFiltersCacheKey } from 'app/[game]/[map]/hooks/use-map-filters';
import { MapFilters } from 'interfaces/models/game/map-filters';
import { mapFiltersMock } from 'mocks/game/map-filters-mock';
import { heroMock } from 'mocks/game/hero-mock';
import { reputationsMock } from 'mocks/game/reputations-mock';
import { playersMock } from 'mocks/game/players-mock';
import { villagesMock } from 'mocks/game/villages-mock';

const { id: serverId, slug } = serverMock;

export const createGameEnvironment = () => {
  const queryClient = new QueryClient();
  queryClient.setQueryData<Server>([currentServerCacheKey, slug], serverMock);
  queryClient.setQueryData<Achievement[]>([achievementsCacheKey, serverId], []);
  queryClient.setQueryData<Report[]>([reportsCacheKey, serverId], []);
  queryClient.setQueryData<Effect[]>([effectsCacheKey, serverId], []);
  queryClient.setQueryData<Quest[]>([questsCacheKey, serverId], []);
  queryClient.setQueryData<ResearchLevel[]>([researchLevelsCacheKey, serverId], []);
  queryClient.setQueryData<Hero>([heroCacheKey, serverId], heroMock);
  queryClient.setQueryData<Tile[]>([mapCacheKey, serverId], []);
  queryClient.setQueryData<GameEvent[]>([eventsCacheKey, serverId], []);
  queryClient.setQueryData<Village[]>([villagesCacheKey, serverId], villagesMock);
  queryClient.setQueryData<Player[]>([playersCacheKey, serverId], playersMock);
  queryClient.setQueryData<Reputation[]>([reputationsCacheKey, serverId], reputationsMock);
  queryClient.setQueryData<MapFilters>([mapFiltersCacheKey, serverId], mapFiltersMock);

  return queryClient;
}


