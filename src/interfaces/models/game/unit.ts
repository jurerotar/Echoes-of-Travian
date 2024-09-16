import type { Building } from 'interfaces/models/game/building';
import type { Tribe } from 'interfaces/models/game/tribe';

type RomanUnitId =
  | 'LEGIONNAIRE'
  | 'PRAETORIAN'
  | 'IMPERIAN'
  | 'EQUITES_LEGATI'
  | 'EQUITES_IMPERATORIS'
  | 'EQUITES_CAESARIS'
  | 'ROMAN_RAM'
  | 'FIRE_CATAPULT'
  | 'SENATOR'
  | 'ROMAN_SETTLER';

type GaulUnitId =
  | 'PHALANX'
  | 'SWORDSMAN'
  | 'PATHFINDER'
  | 'THEUTATES_THUNDER'
  | 'DRUIDRIDER'
  | 'HAEDUAN'
  | 'GAUL_RAM'
  | 'TREBUCHET'
  | 'CHIEFTAIN'
  | 'GAUL_SETTLER';

type TeutonUnitId =
  | 'MACEMAN'
  | 'SPEARMAN'
  | 'AXEMAN'
  | 'SCOUT'
  | 'PALADIN'
  | 'TEUTONIC_KNIGHT'
  | 'TEUTONIC_RAM'
  | 'ONAGER'
  | 'CHIEF'
  | 'TEUTONIC_SETTLER';

type HunUnitId =
  | 'MERCENARY'
  | 'BOWMAN'
  | 'SPOTTER'
  | 'STEPPE_RIDER'
  | 'MARKSMAN'
  | 'MARAUDER'
  | 'HUN_RAM'
  | 'MANGONEL'
  | 'LOGADES'
  | 'HUN_SETTLER';

type EgyptianUnitId =
  | 'SLAVE_MILITIA'
  | 'ASH_WARDEN'
  | 'KHOPESH_WARRIOR'
  | 'SOPDU_EXPLORER'
  | 'ANHUR_GUARD'
  | 'RESHEPH_CHARIOT'
  | 'EGYPTIAN_RAM'
  | 'STONE_CATAPULT'
  | 'NOMARCH'
  | 'EGYPTIAN_SETTLER';

type SpartanUnitId =
  | 'HOPLITE'
  | 'SENTINEL'
  | 'SHIELDSMAN'
  | 'TWINSTEEL_THERION'
  | 'ELPIDA_RIDER'
  | 'CORINTHIAN_CRUSHER'
  | 'SPARTAN_RAM'
  | 'BALLISTA'
  | 'EPHOR'
  | 'SPARTAN_SETTLER';

type NatarUnitId =
  | 'PIKEMAN'
  | 'THORNED_WARRIOR'
  | 'GUARDSMAN'
  | 'BIRDS_OF_PREY'
  | 'AXERIDER'
  | 'NATARIAN_KNIGHT'
  | 'WARELEPHANT'
  | 'NATARIAN_BALLISTA'
  | 'NATARIAN_EMPEROR'
  | 'NATARIAN_SETTLER';

export type NatureUnitId = 'RAT' | 'SPIDER' | 'SERPENT' | 'BAT' | 'WILD_BOAR' | 'WOLF' | 'BEAR' | 'CROCODILE' | 'TIGER' | 'ELEPHANT';

export type UnitId = RomanUnitId | GaulUnitId | TeutonUnitId | EgyptianUnitId | HunUnitId | SpartanUnitId | NatarUnitId | NatureUnitId;

export type UnitResearchRequirement = {
  buildingId: Building['id'];
  level: number;
};

export type UnitTier = 'tier-1' | 'tier-2' | 'tier-3' | 'scout' | 'tier-4' | 'tier-5' | 'siege-ram' | 'siege-catapult' | 'special';

export type Unit = {
  id: UnitId;
  baseRecruitmentCost: [number, number, number, number];
  baseRecruitmentTime: number;
  cropConsumption: number;
  attack: number;
  infantryDefence: number;
  cavalryDefence: number;
  travelSpeed: number;
  carryCapacity: number;
  category: 'infantry' | 'cavalry' | 'siege' | 'special';
  tribe: Tribe;
  tier: UnitTier;
  researchRequirements: UnitResearchRequirement[];
  upgradeCostPerLevel: number[][] | null;
  researchCost: number[];
  /**
   * @deprecated - research is instantly completed, delete when you can
   */
  researchDuration: number | null;
  /**
   * @deprecated - upgrade is instantly completed, delete when you can
   */
  upgradeDurationPerLevel: number[] | null;
};
