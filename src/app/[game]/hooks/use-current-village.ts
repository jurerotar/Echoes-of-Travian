import { useRouteSegments } from 'app/[game]/hooks/routes/use-route-segments';
import { useVillages } from 'app/[game]/hooks/use-villages';
import { calculateDistanceBetweenPoints, roundTo2DecimalPoints } from 'app/utils/common';
import type { Point } from 'interfaces/models/common';
import type { Village } from 'interfaces/models/game/village';

export const useCurrentVillage = () => {
  const { playerVillages } = useVillages();
  const { villageSlug } = useRouteSegments();

  const currentVillage: Village = playerVillages.find(({ slug }) => slug === villageSlug)!;

  const currentVillageId = currentVillage!.id;
  // TODO: Move this to specific component once you have it
  // const canRearrangeBuildings = (currentVillage.buildingFields.find(({ buildingId }) => buildingId === 'MAIN_BUILDING')?.level ?? 0) >= 15;

  const distanceFromCurrentVillage = (tileCoordinates: Point): number => {
    return roundTo2DecimalPoints(calculateDistanceBetweenPoints(currentVillage.coordinates, tileCoordinates));
  };

  return {
    currentVillage: currentVillage!,
    currentVillageId,
    distanceFromCurrentVillage,
    // canRearrangeBuildings,
  };
};
