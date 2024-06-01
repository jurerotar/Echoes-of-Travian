import { dehydrate, type QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { calculateComputedEffect } from 'app/[game]/hooks/use-computed-effect';
import { calculateCurrentAmount } from 'app/[game]/hooks/use-calculated-resource';
import { useCurrentServer } from 'app/[game]/hooks/use-current-server';
import { useCurrentVillage } from 'app/[game]/hooks/use-current-village';
import { effectsCacheKey } from 'app/[game]/hooks/use-effects';
import { getVillageById, villagesCacheKey } from 'app/[game]/hooks/use-villages';
import {
  buildingConstructionResolver,
  buildingDestructionResolver,
  buildingLevelChangeResolver,
} from 'app/[game]/resolvers/building-resolvers';
import { doesEventRequireResourceCheck } from 'app/[game]/utils/guards/event-guards';
import { eventFactory } from 'app/factories/event-factory';
import { type GameEvent, GameEventType } from 'interfaces/models/events/game-event';
import type { Effect } from 'interfaces/models/game/effect';
import type { Village } from 'interfaces/models/game/village';
import { getParsedFileContents } from 'app/utils/opfs';
import { useGameEngine } from 'app/[game]/providers/game-engine-provider';
import type { SyncWorkerType } from 'app/[public]/workers/sync-worker';

export const eventsCacheKey = 'events';

// To prevent constant resorting, events must be added to correct indexes, determined by their timestamp.
export const insertEvent = (previousEvents: GameEvent[], event: GameEvent): GameEvent[] => {
  const events: GameEvent[] = [...previousEvents];
  const lastIndex = events.findLastIndex(({ resolvesAt }) => event.resolvesAt >= resolvesAt);
  events.splice(lastIndex === -1 ? events.length : lastIndex + 1, 0, event);
  return events;
};

const gameEventTypeToResolverFunctionMapper = (gameEventType: GameEventType) => {
  switch (gameEventType) {
    case GameEventType.BUILDING_LEVEL_CHANGE: {
      return buildingLevelChangeResolver;
    }
    case GameEventType.BUILDING_CONSTRUCTION: {
      return buildingConstructionResolver;
    }
    case GameEventType.BUILDING_DESTRUCTION: {
      return buildingDestructionResolver;
    }
  }
};

const isBuildingEvent = (event: GameEvent): event is GameEvent<GameEventType.BUILDING_CONSTRUCTION> => {
  return [GameEventType.BUILDING_CONSTRUCTION, GameEventType.BUILDING_DESTRUCTION, GameEventType.BUILDING_LEVEL_CHANGE].includes(
    event.type
  );
};

export const useEvents = () => {
  const queryClient = useQueryClient();
  const { serverHandle } = useCurrentServer();
  const { currentVillageId } = useCurrentVillage();
  const { syncWorker } = useGameEngine();

  const { data: events } = useQuery<GameEvent[]>({
    queryFn: () => getParsedFileContents(serverHandle, 'events'),
    queryKey: [eventsCacheKey],
    initialData: [],
  });

  const { mutate: resolveEvent } = useMutation<void, Error, GameEvent['id']>({
    mutationFn: async (id) => {
      const event = events!.find(({ id: eventIdToFind }) => eventIdToFind === id)!;
      const resolver = gameEventTypeToResolverFunctionMapper(event.type);
      // @ts-expect-error - Each event has all required properties to resolve the event, we check this on event creation
      await resolver(event, queryClient);
      queryClient.setQueryData<GameEvent[]>([], (prevEvents) => {
        return prevEvents!.filter(({ id: eventId }) => eventId !== id);
      });
    },
    onSuccess: async () => {
      syncWorker.postMessage({ type: 'full-sync', dehydratedState: dehydrate(queryClient) });
      await queryClient.invalidateQueries({ queryKey: [eventsCacheKey] });
    },
  });

  const currentVillageBuildingEvents = events.filter((event) => {
    if (!isBuildingEvent(event)) {
      return false;
    }

    return event.villageId === currentVillageId;
  }) as GameEvent<GameEventType.BUILDING_CONSTRUCTION>[];

  return {
    events,
    resolveEvent,
    currentVillageBuildingEvents,
  };
};

type CreateEventFnArgs<T extends GameEventType> = Omit<GameEvent<T>, 'id'> & {
  queryClient: QueryClient;
  syncWorker: SyncWorkerType;
};

type CreateEventArgs<T extends GameEventType> = Omit<CreateEventFnArgs<T>, 'type' | 'queryClient' | 'villageId' | 'syncWorker'>;

export const createEventFn = async <T extends GameEventType>(args: CreateEventFnArgs<T>): Promise<void> => {
  const { queryClient, syncWorker, ...rest } = args;
  const { villageId } = rest;
  const event: GameEvent<T> = eventFactory<T>(args);

  if (doesEventRequireResourceCheck(event)) {
    const { resourceCost } = event;
    const villages = queryClient.getQueryData<Village[]>([villagesCacheKey])!;
    const effects = queryClient.getQueryData<Effect[]>([effectsCacheKey])!;
    const { lastUpdatedAt, resources, id } = getVillageById(villages, villageId);
    const { total: warehouseCapacity } = calculateComputedEffect('warehouseCapacity', effects, id);
    const { total: granaryCapacity } = calculateComputedEffect('granaryCapacity', effects, id);
    const { total: woodProduction } = calculateComputedEffect('woodProduction', effects, id);
    const { total: clayProduction } = calculateComputedEffect('clayProduction', effects, id);
    const { total: ironProduction } = calculateComputedEffect('ironProduction', effects, id);
    const { total: wheatProduction } = calculateComputedEffect('wheatProduction', effects, id);

    const { currentAmount: currentWood } = calculateCurrentAmount({
      lastUpdatedAt,
      resourceAmount: resources.wood,
      hourlyProduction: woodProduction,
      storageCapacity: warehouseCapacity,
    });
    const { currentAmount: currentClay } = calculateCurrentAmount({
      lastUpdatedAt,
      resourceAmount: resources.clay,
      hourlyProduction: clayProduction,
      storageCapacity: warehouseCapacity,
    });
    const { currentAmount: currentIron } = calculateCurrentAmount({
      lastUpdatedAt,
      resourceAmount: resources.iron,
      hourlyProduction: ironProduction,
      storageCapacity: warehouseCapacity,
    });
    const { currentAmount: currentWheat } = calculateCurrentAmount({
      lastUpdatedAt,
      resourceAmount: resources.wheat,
      hourlyProduction: wheatProduction,
      storageCapacity: granaryCapacity,
    });

    const [woodCost, clayCost, ironCost, wheatCost] = resourceCost;
    if (woodCost > currentWood || clayCost > currentClay || ironCost > currentIron || wheatCost > currentWheat) {
      return;
    }

    const newLastUpdatedAt = Date.now();

    queryClient.setQueryData<Village[]>([villagesCacheKey], (prevVillages) => {
      const villageToUpdate = getVillageById(prevVillages!, id);
      const {
        resources: { wood, clay, iron, wheat },
      } = villageToUpdate;

      villageToUpdate.resources = {
        wood: wood - woodCost,
        clay: clay - clayCost,
        iron: iron - ironCost,
        wheat: wheat - wheatCost,
      };
      villageToUpdate.lastUpdatedAt = newLastUpdatedAt;
      return prevVillages;
    });
  }

  queryClient.setQueryData<GameEvent[]>([eventsCacheKey], (previousEvents) => {
    return insertEvent(previousEvents!, event);
  });

  syncWorker.postMessage({ type: 'full-sync', queryClient: dehydrate(queryClient) });
};

export const useCreateEvent = <T extends GameEventType>(eventType: T) => {
  const queryClient = useQueryClient();
  const { currentVillageId } = useCurrentVillage();
  const { syncWorker } = useGameEngine();

  const { mutate: createEvent } = useMutation<void, Error, CreateEventArgs<T>>({
    mutationFn: async (args: CreateEventArgs<T>) => {
      // @ts-expect-error - TODO: Event definition is kinda garbage, but I've no clue how to fix it
      return createEventFn<T>({
        syncWorker,
        queryClient,
        type: eventType,
        villageId: currentVillageId,
        ...args,
      });
    },
  });

  return createEvent;
};
