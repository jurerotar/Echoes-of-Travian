import { getBuildingData } from 'app/[game]/utils/building';
import { merchants } from 'assets/merchants';
import type { BuildingEffect } from 'interfaces/models/game/building';
import type {
  Effect,
  GlobalEffect,
  HeroEffect,
  ServerEffect,
  TribalEffect,
  VillageBuildingEffect,
  VillageEffect,
} from 'interfaces/models/game/effect';
import type { Server } from 'interfaces/models/game/server';
import type { BuildingField, Village } from 'interfaces/models/game/village';

type NewBuildingEffectFactoryArgs = {
  villageId: Village['id'];
  id: Effect['id'];
  value: number;
  buildingFieldId: BuildingField['id'];
};

const newBuildingEffectFactory = (args: NewBuildingEffectFactoryArgs): VillageBuildingEffect => {
  return {
    scope: 'village',
    source: 'building',
    ...args,
  };
};

type NewVillageEffectFactoryArgs = {
  village: Village;
};

const newVillageBuildingFieldsEffectsFactory = ({ village }: NewVillageEffectFactoryArgs): VillageBuildingEffect[] => {
  return village.buildingFields.flatMap(({ buildingId, id, level }: BuildingField) => {
    const building = getBuildingData(buildingId);
    return building.effects.map(({ effectId, valuesPerLevel }: BuildingEffect) =>
      newBuildingEffectFactory({
        villageId: village.id,
        id: effectId,
        value: valuesPerLevel[level],
        buildingFieldId: id,
      }),
    );
  });
};

const newVillageEffectsFactory = ({ village }: NewVillageEffectFactoryArgs): VillageEffect[] => {
  const villageDefaultStorageEffectsIds: Effect['id'][] = ['warehouseCapacity', 'granaryCapacity'];
  return [
    ...villageDefaultStorageEffectsIds.map(
      (effectId) =>
        ({
          id: effectId,
          scope: 'village',
          source: 'server',
          value: 800,
          villageId: village.id,
        }) satisfies VillageEffect,
    ),
    ...newVillageBuildingFieldsEffectsFactory({ village }),
  ];
};

type GlobalEffectFactoryProps = {
  server: Server;
};

const globalEffectsFactory = ({ server }: GlobalEffectFactoryProps): GlobalEffect[] => {
  const { tribe } = server.playerConfiguration;

  const tribeMerchant = merchants.find(({ tribe: tribeToFind }) => tribeToFind === tribe)!;

  const merchantEffects: Omit<TribalEffect, 'scope'>[] = [
    {
      id: 'merchantCapacity',
      value: tribeMerchant.merchantCapacity,
      source: 'tribe',
    },
    {
      id: 'merchantSpeed',
      value: tribeMerchant.merchantSpeed,
      source: 'tribe',
    },
  ];

  const heroEffects: Omit<HeroEffect, 'scope'>[] = [
    {
      id: 'attackBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'infantryDefenceBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'cavalryDefenceBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'woodProductionBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'clayProductionBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'ironProductionBonus',
      value: 1,
      source: 'hero',
    },
    {
      id: 'wheatProductionBonus',
      value: 1,
      source: 'hero',
    },
  ];

  return [...merchantEffects, ...heroEffects].map((partialEffect) => ({
    ...partialEffect,
    scope: 'global',
  }));
};

const serverEffectsFactory = ({ server }: GlobalEffectFactoryProps): ServerEffect[] => {
  const {
    configuration: { speed },
  } = server;

  // Building duration is special, if there's no main building, everything takes 5 times as long, so we set server
  // building duration to 5x and then make main building effects only 1/5th of normal.
  const buildingDurationValue = 5 / speed;

  const increasedValueEffectIds: ServerEffect['id'][] = [
    'merchantCapacity',
    'merchantSpeed',
    'woodProduction',
    'clayProduction',
    'ironProduction',
    'wheatProduction',
    'unitSpeed',
  ];

  const decreasedValueEffectIds: ServerEffect['id'][] = [
    'barracksTrainingDuration',
    'greatBarracksTrainingDuration',
    'stableTrainingDuration',
    'greatStableTrainingDuration',
    'workshopTrainingDuration',
    'hospitalTrainingDuration',
    'buildingDuration',
  ];

  const serverEffectIds: ServerEffect['id'][] = [...increasedValueEffectIds, ...decreasedValueEffectIds];

  return serverEffectIds.map((effectId) => {
    const value = increasedValueEffectIds.includes(effectId) ? speed : 1 / speed;
    return {
      id: effectId,
      value: effectId === 'buildingDuration' ? buildingDurationValue : value,
      source: 'server',
      scope: 'server',
    };
  });
};

export const generateEffects = (server: Server, village: Village) => {
  const serverEffects = serverEffectsFactory({ server });
  const villageEffects = newVillageEffectsFactory({ village });
  const globalEffects = globalEffectsFactory({ server });

  return [...serverEffects, ...globalEffects, ...villageEffects];
};
