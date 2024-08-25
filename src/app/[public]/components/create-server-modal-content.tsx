import { QueryClient, dehydrate, useMutation } from '@tanstack/react-query';
import { mapFiltersCacheKey } from 'app/[game]/[map]/hooks/use-map-filters';
import { achievementsCacheKey } from 'app/[game]/hooks/use-achievements';
import { currentServerCacheKey } from 'app/[game]/hooks/use-current-server';
import { effectsCacheKey } from 'app/[game]/hooks/use-effects';
import { heroCacheKey } from 'app/[game]/hooks/use-hero';
import { mapCacheKey } from 'app/[game]/hooks/use-map';
import { playersCacheKey } from 'app/[game]/hooks/use-players';
import { reputationsCacheKey } from 'app/[game]/hooks/use-reputations';
import { troopsCacheKey } from 'app/[game]/hooks/use-troops';
import { villagesCacheKey } from 'app/[game]/hooks/use-villages';
import type { CreateServerWorkerPayload } from 'app/[public]/workers/create-server-worker';
import CreateServerWorker from 'app/[public]/workers/create-server-worker?worker&url';
import type { GenerateMapWorkerPayload, GenerateMapWorkerReturn } from 'app/[public]/workers/generate-map-worker';
import GenerateMapWorker from 'app/[public]/workers/generate-map-worker?worker&url';
import type { GenerateTroopsWorkerPayload, GenerateTroopsWorkerReturn } from 'app/[public]/workers/generate-troops-worker';
import GenerateTroopsWorker from 'app/[public]/workers/generate-troops-worker?worker&url';
import type { GenerateVillageWorkerPayload, GenerateVillageWorkerReturn } from 'app/[public]/workers/generate-villages-worker';
import GenerateVillagesWorker from 'app/[public]/workers/generate-villages-worker?worker&url';
import { Button } from 'app/components/buttons/button';
import { generateEffects } from 'app/factories/effect-factory';
import { heroFactory } from 'app/factories/hero-factory';
import { mapFiltersFactory } from 'app/factories/map-filters-factory';
import { generatePlayers } from 'app/factories/player-factory';
import { generateReputations } from 'app/factories/reputation-factory';
import { serverFactory } from 'app/factories/server-factory';
import { useAvailableServers } from 'app/hooks/use-available-servers';
import { workerFactory } from 'app/utils/workers';
import type { Achievement } from 'interfaces/models/game/achievement';
import type { Effect } from 'interfaces/models/game/effect';
import type { Hero } from 'interfaces/models/game/hero';
import type { MapFilters } from 'interfaces/models/game/map-filters';
import type { Player } from 'interfaces/models/game/player';
import type { Reputation } from 'interfaces/models/game/reputation';
import type { Server } from 'interfaces/models/game/server';
import type { Tile } from 'interfaces/models/game/tile';
import type { Troop } from 'interfaces/models/game/troop';
import type { Village } from 'interfaces/models/game/village';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const PLAYER_COUNT = 50;

type CreateServerFormValues = Pick<Server, 'seed' | 'name' | 'configuration' | 'playerConfiguration'>;

type OnSubmitArgs = {
  server: Server;
};

type CreateServerConfigurationViewProps = {
  onSubmit: (params: OnSubmitArgs) => void;
};

const generateSeed = (length = 10): string => {
  return crypto.randomUUID().replaceAll('-', '').substring(0, length);
};

const CreateServerConfigurationView: React.FC<CreateServerConfigurationViewProps> = (props) => {
  const { onSubmit } = props;

  const { handleSubmit, register } = useForm<CreateServerFormValues>({
    defaultValues: {
      seed: generateSeed(),
      name: 'Server name',
      configuration: {
        mapSize: 100,
        speed: 1,
      },
      playerConfiguration: {
        name: 'Player name',
        tribe: 'gauls',
      },
    },
  });

  const submitForm = (data: CreateServerFormValues) => {
    const server = serverFactory({ ...data });
    onSubmit({ server });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-4">
          <h3>Server configuration</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="server-configuration-seed">Server seed</label>
            <input
              id="server-configuration-seed"
              {...register('seed')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="server-configuration-name">Server name</label>
            <input
              id="server-configuration-name"
              {...register('name')}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3>Game configuration</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="server-configuration-world-size">World size</label>
            <input
              id="server-configuration-world-size"
              {...register('configuration.mapSize')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="server-configuration-tribe">Tribe</label>
            <input
              id="server-configuration-tribe"
              {...register('playerConfiguration.tribe')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="server-configuration-speed">Game speed</label>
            <input
              id="server-configuration-speed"
              {...register('configuration.speed')}
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        onClick={handleSubmit(submitForm)}
      >
        Create server
      </Button>
    </form>
  );
};

// All of these factories have to be executed in a worker env due to them using OPFS
export const initializeServer = async ({ server }: OnSubmitArgs) => {
  const reputations = generateReputations();
  const npcFactions = reputations.filter(({ faction }) => faction !== 'player').map(({ faction }) => faction);

  const players = generatePlayers(server, npcFactions, PLAYER_COUNT);

  // Map data
  const { tiles, occupiedOccupiableTiles, occupiableOasisTiles } = await workerFactory<GenerateMapWorkerPayload, GenerateMapWorkerReturn>(
    GenerateMapWorker,
    { server, players },
  );

  // Villages
  const { villages } = await workerFactory<GenerateVillageWorkerPayload, GenerateVillageWorkerReturn>(GenerateVillagesWorker, {
    server,
    occupiedOccupiableTiles,
    players,
  });

  const playerStartingVillage = villages[0];

  // Non-dependant factories can run in sync
  const [{ troops }, effects, hero, mapFilters] = await Promise.all([
    workerFactory<GenerateTroopsWorkerPayload, GenerateTroopsWorkerReturn>(GenerateTroopsWorker, {
      server,
      occupiedOccupiableTiles,
      occupiableOasisTiles,
      players,
    }),
    generateEffects(server, playerStartingVillage),
    heroFactory(server),
    mapFiltersFactory(),
  ]);

  const queryClient = new QueryClient();

  queryClient.setQueryData<Server>([currentServerCacheKey], server);
  queryClient.setQueryData<Player[]>([playersCacheKey], players);
  queryClient.setQueryData<Reputation[]>([reputationsCacheKey], reputations);
  queryClient.setQueryData<Achievement[]>([achievementsCacheKey], []);
  queryClient.setQueryData<Effect[]>([effectsCacheKey], effects);
  queryClient.setQueryData<Hero>([heroCacheKey], hero);
  queryClient.setQueryData<Tile[]>([mapCacheKey], tiles);
  queryClient.setQueryData<Village[]>([villagesCacheKey], villages);
  queryClient.setQueryData<MapFilters>([mapFiltersCacheKey], mapFilters);
  queryClient.setQueryData<Troop[]>([troopsCacheKey], troops);

  await workerFactory<CreateServerWorkerPayload>(CreateServerWorker, { dehydratedState: dehydrate(queryClient), server });
};

export const CreateServerModalContent = () => {
  const { deleteServer, availableServers, addServer } = useAvailableServers();

  const latestServer = availableServers.at(-1);

  const {
    mutate: onSubmit,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<void, Error, OnSubmitArgs>({
    mutationFn: ({ server }) => initializeServer({ server }),
    onSuccess: (_, { server }) => addServer({ server }),
    onError: (_, { server }) => deleteServer({ server }),
  });

  if (error !== null) {
    return (
      <div className="flex flex-col gap-4">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {!isPending && !isSuccess && !isError && <CreateServerConfigurationView onSubmit={onSubmit} />}
      {isPending && <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[50%]">Loading</div>}
      {isSuccess && (
        <Link to={`/game/${latestServer?.slug}/v-1/resources`}>
          <Button variant="confirm">Enter server</Button>
        </Link>
      )}
    </div>
  );
};
