import { OccupiableOasisIcon } from 'app/(game)/(map)/components/occupiable-oasis-icon';
import { TreasureIcon } from 'app/(game)/(map)/components/treasure-icon';
import { WheatFieldIcon } from 'app/(game)/(map)/components/wheat-field-icon';
import {
  isOccupiableOasisTile,
  isOccupiableTile,
  isOccupiedOasisTile,
  isOccupiedOccupiableTile,
  isTreasuryTile,
  isUnoccupiedOccupiableTile,
} from 'app/(game)/utils/guards/map-guards';
import type { MapFilters } from 'app/interfaces/models/game/map-filters';
import type { PlayerFaction } from 'app/interfaces/models/game/player';
import type { ReputationLevel } from 'app/interfaces/models/game/reputation';
import type {
  OasisTile,
  OccupiableOasisTile,
  OccupiableTile,
  OccupiedOccupiableTile as OccupiedOccupiableTileType,
  Tile as TileType,
} from 'app/interfaces/models/game/tile';
import type { Tribe } from 'app/interfaces/models/game/tribe';
import clsx from 'clsx';
import type React from 'react';
import { memo } from 'react';
import { type GridChildComponentProps, areEqual } from 'react-window';
import cellStyles from './cell.module.scss';

export const reputationColorMap = new Map<ReputationLevel, string>([
  ['player', 'after:border-reputation-player'],
  ['ecstatic', 'after:border-reputation-ecstatic'],
  ['respected', 'after:border-reputation-respected'],
  ['friendly', 'after:border-reputation-friendly'],
  ['neutral', 'after:border-reputation-neutral'],
  ['unfriendly', 'after:border-reputation-unfriendly'],
  ['hostile', 'after:border-reputation-hostile'],
]);

type OccupiedTileWithFactionAndTribe = OccupiedOccupiableTileType & {
  faction: PlayerFaction;
  reputationLevel: ReputationLevel;
  tribe: Tribe;
};

type TroopMovementsProps = {
  tile: TileType | OccupiedTileWithFactionAndTribe;
};

const TroopMovements: React.FC<TroopMovementsProps> = ({ tile }) => {
  const _isOccupiableCell = isOccupiableTile(tile);
  const _isOccupiableOasisCell = isOccupiableOasisTile(tile);
  const _isOccupiedOccupiableCell = isOccupiedOccupiableTile(tile);

  return null;
};

type CellBaseProps = {
  tilesWithFactions: (TileType | OccupiedTileWithFactionAndTribe)[];
  mapFilters: MapFilters;
  magnification: number;
  onClick: (data: TileType | OccupiedTileWithFactionAndTribe) => void;
};

const wheatFields = ['00018', '11115', '3339'];

type CellIconsProps = Omit<CellBaseProps, 'tilesWithFactions' | 'onClick'> & { tile: TileType | OccupiedTileWithFactionAndTribe };

const CellIcons: React.FC<CellIconsProps> = ({ tile, mapFilters }) => {
  const { shouldShowFactionReputation, shouldShowTreasureIcons, shouldShowOasisIcons, shouldShowWheatFields, shouldShowTroopMovements } =
    mapFilters;

  const isOccupiableCell = isOccupiableTile(tile);
  const isOccupiableOasisCell = isOccupiableOasisTile(tile);
  const isOccupiedOccupiableCell = isOccupiedOccupiableTile(tile);

  return (
    <div
      className={clsx(
        'size-full relative',
        shouldShowFactionReputation &&
          isOccupiedOccupiableCell &&
          `after:absolute after:top-0 after:left-0 after:size-full after:rounded-[1px] after:border-[3px] after:border-dashed ${reputationColorMap.get(
            (tile as OccupiedTileWithFactionAndTribe).reputationLevel,
          )!}`,
      )}
    >
      {isOccupiedOccupiableCell && shouldShowTreasureIcons && isTreasuryTile(tile) && <TreasureIcon treasureType={tile.treasureType} />}

      {isOccupiableCell && shouldShowWheatFields && wheatFields.includes((tile as OccupiableTile).resourceFieldComposition) && (
        <WheatFieldIcon resourceFieldComposition={(tile as OccupiableTile).resourceFieldComposition} />
      )}

      {isOccupiableOasisCell && shouldShowOasisIcons && (
        <OccupiableOasisIcon
          oasisResourceBonus={(tile as OccupiableOasisTile).oasisResourceBonus}
          borderVariant={isOccupiedOasisTile(tile) ? 'red' : 'green'}
        />
      )}

      {shouldShowTroopMovements && <TroopMovements tile={tile} />}
    </div>
  );
};

type CellProps = GridChildComponentProps<CellBaseProps>;

const dynamicCellClasses = (tile: TileType | OccupiedTileWithFactionAndTribe): string => {
  const isOccupiedOccupiableCell = isOccupiedOccupiableTile(tile);
  const isUnoccupiedOccupiableCell = isUnoccupiedOccupiableTile(tile);

  if (isUnoccupiedOccupiableCell) {
    const { resourceFieldComposition } = tile as OccupiableTile;
    return clsx(cellStyles['unoccupied-tile'], cellStyles[`unoccupied-tile-${resourceFieldComposition}`]);
  }

  if (isOccupiedOccupiableCell) {
    const { tribe, villageSize } = tile as OccupiedTileWithFactionAndTribe;
    return clsx(cellStyles['occupied-tile'], cellStyles[`occupied-tile-${tribe}`], cellStyles[`occupied-tile-${tribe}-${villageSize}`]);
  }

  const cell = tile as OasisTile;

  const { oasisGroupPosition, oasisGroup, oasisResource, oasisVariant } = cell.graphics;
  const groupPositions = oasisGroupPosition.join('-');

  return clsx(
    cellStyles.oasis,
    cellStyles[`oasis-${oasisResource}`],
    cellStyles[`oasis-${oasisResource}-group-${oasisGroup}`],
    cellStyles[`oasis-${oasisResource}-group-${oasisGroup}-position-${groupPositions}`],
    cellStyles[`oasis-${oasisResource}-group-${oasisGroup}-position-${groupPositions}-variant-${oasisVariant}`],
  );
};

export const Cell = memo<CellProps>(({ data, style, rowIndex, columnIndex }) => {
  const { tilesWithFactions, mapFilters, magnification, onClick } = data;

  const gridSize = Math.sqrt(data.tilesWithFactions.length);

  const tile: TileType | OccupiedTileWithFactionAndTribe = tilesWithFactions[gridSize * rowIndex + columnIndex];

  return (
    <div
      className={clsx(dynamicCellClasses(tile), 'flex size-full rounded-[1px] border border-gray-500/50 bg-contain relative')}
      style={style}
      data-tile-id={tile.id}
    >
      <button
        onClick={() => onClick(tile)}
        type="button"
        className="size-full absolute inset-0 z-[5]"
      />

      <CellIcons
        mapFilters={mapFilters}
        magnification={magnification}
        tile={tile}
      />
    </div>
  );
}, areEqual);