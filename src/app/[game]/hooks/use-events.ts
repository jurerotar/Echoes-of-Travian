import { database } from 'database/database';
import { useCurrentServer } from 'app/[game]/hooks/use-current-server';
import { GameEvent, GameEventType } from 'interfaces/models/events/game-event';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Server } from 'interfaces/models/game/server';
import { eventFactory } from 'app/[game]/factories/event-factory';
import {
  buildingConstructionResolver,
  buildingDestructionResolver,
  buildingLevelChangeResolver,
} from 'app/[game]/resolvers/building-resolvers';
import { useCurrentVillage } from 'app/[game]/hooks/use-current-village';
import { findLastIndex } from 'lodash-es';

export const eventsCacheKey = 'events';

export const getEvents = (serverId: Server['id']) => database.events.where({ serverId }).toArray();

// To prevent constant resorting, events must be added to correct indexes, determined by their timestamp.
export const insertEvent = (previousEvents: GameEvent[], event: GameEvent): GameEvent[] => {
  const events: GameEvent[] = [...previousEvents];
  const lastIndex = findLastIndex<GameEvent>(events, ({ resolvesAt }) => event.resolvesAt >= resolvesAt);
  events.splice(lastIndex === -1 ? events.length : lastIndex + 1, 0, event);
  return events;
};

const gameEventTypeToResolverFunctionMapper = (gameEventType: GameEventType) => {
  // eslint-disable-next-line default-case
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
  const { serverId } = useCurrentServer();
  const { currentVillageId } = useCurrentVillage();

  const { data: events } = useQuery<GameEvent[]>({
    queryFn: () => getEvents(serverId),
    queryKey: [eventsCacheKey, serverId],
    initialData: [],
  });

  const { mutate: resolveEvent } = useMutation<void, Error, GameEvent['id']>({
    mutationFn: async (id) => {
      const event = events!.find(({ id: eventIdToFind }) => eventIdToFind === id)!;
      const resolver = gameEventTypeToResolverFunctionMapper(event.type);
      // @ts-expect-error - Each event has all required properties to resolve the event, we check this on event creation
      resolver(event, queryClient);
      database.events.where({ serverId, id }).delete();
      queryClient.invalidateQueries({ queryKey: [eventsCacheKey, serverId] });
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
};

type CreateEventArgs<T extends GameEventType> = Omit<CreateEventFnArgs<T>, 'serverId' | 'type' | 'queryClient'>;

export const createEventFn = async <T extends GameEventType>(args: CreateEventFnArgs<T>): Promise<void> => {
  const { queryClient, ...rest } = args;
  const { serverId } = rest;
  const event: GameEvent<T> = eventFactory<T>(args);
  queryClient.setQueryData<GameEvent[]>([eventsCacheKey, serverId], (previousEvents) => {
    return insertEvent(previousEvents!, event);
  });
  const events = queryClient.getQueryData<GameEvent[]>([eventsCacheKey, serverId]);
  database.events.bulkPut(events!);
};

export const useCreateEvent = <T extends GameEventType>(eventType: T) => {
  const queryClient = useQueryClient();
  const { serverId } = useCurrentServer();

  const { mutate: createEvent } = useMutation<void, Error, CreateEventArgs<T>>({
    mutationFn: async (args: CreateEventArgs<T>) =>
      // @ts-expect-error - TODO: Event definition is kinda garbage, but I've no clue how to fix it
      createEventFn<T>({
        queryClient,
        serverId,
        type: eventType,
        ...args,
      }),
  });

  return createEvent;
};
