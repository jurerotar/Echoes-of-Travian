// TODO: Some units have missing values, fill them in and remove the ts-nocheck comment
// @ts-nocheck
import type { Unit } from 'interfaces/models/game/unit';

export const romanUnits: Unit[] = [
  {
    id: 'LEGIONNAIRE',
    baseRecruitmentCost: [120, 100, 150, 30],
    baseRecruitmentTime: 1600,
    cropConsumption: 1,
    attack: 40,
    infantryDefence: 35,
    cavalryDefence: 50,
    travelSpeed: 6,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'romans',
    researchPrerequisites: [],
  },
  {
    id: 'PRAETORIAN',
    baseRecruitmentCost: [100, 130, 160, 70],
    baseRecruitmentTime: 1760,
    cropConsumption: 1,
    attack: 30,
    infantryDefence: 65,
    cavalryDefence: 35,
    travelSpeed: 5,
    carryCapacity: 20,
    category: 'infantry',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 1 },
      { buildingId: 'SMITHY', level: 1 },
    ],
  },
  {
    id: 'IMPERIAN',
    baseRecruitmentCost: [150, 160, 210, 80],
    baseRecruitmentTime: 1920,
    cropConsumption: 1,
    attack: 70,
    infantryDefence: 40,
    cavalryDefence: 25,
    travelSpeed: 7,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'SMITHY', level: 1 },
    ],
  },
  {
    id: 'EQUITES_LEGATI',
    baseRecruitmentCost: [140, 160, 20, 40],
    baseRecruitmentTime: 1360,
    cropConsumption: 2,
    attack: 0,
    infantryDefence: 20,
    cavalryDefence: 10,
    travelSpeed: 16,
    carryCapacity: 0,
    category: 'cavalry',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 1 },
    ],
  },
  {
    id: 'EQUITES_IMPERATORIS',
    baseRecruitmentCost: [550, 440, 320, 100],
    baseRecruitmentTime: 2640,
    cropConsumption: 3,
    attack: 120,
    infantryDefence: 65,
    cavalryDefence: 50,
    travelSpeed: 14,
    carryCapacity: 100,
    category: 'cavalry',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 5 },
    ],
  },
  {
    id: 'EQUITES_CAESARIS',
    baseRecruitmentCost: [550, 640, 800, 180],
    baseRecruitmentTime: 3520,
    cropConsumption: 4,
    attack: 180,
    infantryDefence: 80,
    cavalryDefence: 105,
    travelSpeed: 10,
    carryCapacity: 70,
    category: 'cavalry',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'STABLE', level: 10 },
    ],
  },
  {
    id: 'ROMAN_RAM',
    baseRecruitmentCost: [900, 360, 500, 70],
    baseRecruitmentTime: 4600,
    cropConsumption: 3,
    attack: 60,
    infantryDefence: 30,
    cavalryDefence: 75,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 10 },
      { buildingId: 'WORKSHOP', level: 1 },
    ],
  },
  {
    id: 'FIRE_CATAPULT',
    baseRecruitmentCost: [950, 1350, 600, 90],
    baseRecruitmentTime: 9000,
    cropConsumption: 6,
    attack: 75,
    infantryDefence: 60,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'WORKSHOP', level: 10 },
    ],
  },
  {
    id: 'SENATOR',
    baseRecruitmentCost: [30750, 27200, 45000, 37500],
    baseRecruitmentTime: 90700,
    cropConsumption: 5,
    attack: 50,
    infantryDefence: 40,
    cavalryDefence: 30,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'special',
    tribe: 'romans',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'ROMAN_SETTLER',
    baseRecruitmentCost: [4600, 4200, 5800, 4400],
    baseRecruitmentTime: 26900,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'special',
    tribe: 'romans',
    researchPrerequisites: [],
  },
];

export const gaulUnits: Unit[] = [
  {
    id: 'PHALANX',
    baseRecruitmentCost: [100, 130, 55, 30],
    baseRecruitmentTime: 1040,
    cropConsumption: 1,
    attack: 15,
    infantryDefence: 40,
    cavalryDefence: 50,
    travelSpeed: 7,
    carryCapacity: 35,
    category: 'infantry',
    tribe: 'gauls',
    researchPrerequisites: [],
  },
  {
    id: 'SWORDSMAN',
    baseRecruitmentCost: [140, 150, 185, 60],
    baseRecruitmentTime: 1440,
    cropConsumption: 1,
    attack: 65,
    infantryDefence: 35,
    cavalryDefence: 20,
    travelSpeed: 6,
    carryCapacity: 45,
    category: 'infantry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 3 },
      { buildingId: 'SMITHY', level: 1 },
    ],
  },
  {
    id: 'PATHFINDER',
    baseRecruitmentCost: [170, 150, 20, 40],
    baseRecruitmentTime: 1360,
    cropConsumption: 2,
    attack: 0,
    infantryDefence: 20,
    cavalryDefence: 10,
    travelSpeed: 17,
    carryCapacity: 0,
    category: 'cavalry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 1 },
    ],
  },
  {
    id: 'THEUTATES_THUNDER',
    baseRecruitmentCost: [350, 450, 230, 60],
    baseRecruitmentTime: 2480,
    cropConsumption: 2,
    attack: 90,
    infantryDefence: 25,
    cavalryDefence: 40,
    travelSpeed: 19,
    carryCapacity: 75,
    category: 'cavalry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 3 },
    ],
  },
  {
    id: 'DRUIDRIDER',
    baseRecruitmentCost: [360, 330, 280, 120],
    baseRecruitmentTime: 2560,
    cropConsumption: 2,
    attack: 45,
    infantryDefence: 115,
    cavalryDefence: 55,
    travelSpeed: 16,
    carryCapacity: 35,
    category: 'cavalry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 5 },
    ],
  },
  {
    id: 'HAEDUAN',
    baseRecruitmentCost: [500, 620, 675, 170],
    baseRecruitmentTime: 3120,
    cropConsumption: 3,
    attack: 140,
    infantryDefence: 60,
    cavalryDefence: 165,
    travelSpeed: 13,
    carryCapacity: 65,
    category: 'cavalry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'STABLE', level: 10 },
    ],
  },
  {
    id: 'GAUL_RAM',
    baseRecruitmentCost: [950, 555, 330, 75],
    baseRecruitmentTime: 5000,
    cropConsumption: 3,
    attack: 50,
    infantryDefence: 30,
    cavalryDefence: 105,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 10 },
      { buildingId: 'WORKSHOP', level: 1 },
    ],
  },
  {
    id: 'TREBUCHET',
    baseRecruitmentCost: [960, 1450, 630, 90],
    baseRecruitmentTime: 9000,
    cropConsumption: 6,
    attack: 70,
    infantryDefence: 45,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'WORKSHOP', level: 10 },
    ],
  },
  {
    id: 'CHIEFTAIN',
    baseRecruitmentCost: [30750, 45400, 31000, 37500],
    baseRecruitmentTime: 90700,
    cropConsumption: 4,
    attack: 40,
    infantryDefence: 50,
    cavalryDefence: 50,
    travelSpeed: 5,
    carryCapacity: 0,
    category: 'special',
    tribe: 'gauls',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'GAUL_SETTLER',
    baseRecruitmentCost: [4400, 5600, 4200, 3900],
    baseRecruitmentTime: 22700,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'special',
    tribe: 'gauls',
    researchPrerequisites: [],
  },
];

export const teutonUnits: Unit[] = [
  {
    id: 'MACEMAN',
    baseRecruitmentCost: [95, 75, 40, 40],
    baseRecruitmentTime: 720,
    cropConsumption: 1,
    attack: 40,
    infantryDefence: 20,
    cavalryDefence: 5,
    travelSpeed: 7,
    carryCapacity: 60,
    category: 'infantry',
    tribe: 'teutons',
    researchPrerequisites: [],
  },
  {
    id: 'SPEARMAN',
    baseRecruitmentCost: [145, 70, 85, 40],
    baseRecruitmentTime: 1120,
    cropConsumption: 1,
    attack: 10,
    infantryDefence: 35,
    cavalryDefence: 60,
    travelSpeed: 7,
    carryCapacity: 40,
    category: 'infantry',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 1 },
      { buildingId: 'BARRACKS', level: 3 },
    ],
  },
  {
    id: 'AXEMAN',
    baseRecruitmentCost: [130, 120, 170, 70],
    baseRecruitmentTime: 1200,
    cropConsumption: 1,
    attack: 60,
    infantryDefence: 30,
    cavalryDefence: 30,
    travelSpeed: 6,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 3 },
      { buildingId: 'SMITHY', level: 1 },
    ],
  },
  {
    id: 'SCOUT',
    baseRecruitmentCost: [160, 100, 50, 50],
    baseRecruitmentTime: 1120,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 10,
    cavalryDefence: 5,
    travelSpeed: 9,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 1 },
      { buildingId: 'MAIN_BUILDING', level: 5 },
    ],
  },
  {
    id: 'PALADIN',
    baseRecruitmentCost: [370, 270, 290, 75],
    baseRecruitmentTime: 2400,
    cropConsumption: 2,
    attack: 55,
    infantryDefence: 100,
    cavalryDefence: 40,
    travelSpeed: 10,
    carryCapacity: 110,
    category: 'cavalry',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 5 },
    ],
  },
  {
    id: 'TEUTONIC_KNIGHT',
    baseRecruitmentCost: [450, 515, 480, 80],
    baseRecruitmentTime: 2960,
    cropConsumption: 3,
    attack: 150,
    infantryDefence: 50,
    cavalryDefence: 75,
    travelSpeed: 9,
    carryCapacity: 80,
    category: 'cavalry',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'STABLE', level: 10 },
    ],
  },
  {
    id: 'TEUTONIC_RAM',
    baseRecruitmentCost: [1000, 300, 350, 70],
    baseRecruitmentTime: 4200,
    cropConsumption: 3,
    attack: 65,
    infantryDefence: 30,
    cavalryDefence: 80,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'WORKSHOP', level: 1 },
    ],
  },
  {
    id: 'ONAGER',
    baseRecruitmentCost: [900, 1200, 600, 60],
    baseRecruitmentTime: 9000,
    cropConsumption: 6,
    attack: 50,
    infantryDefence: 60,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'WORKSHOP', level: 10 },
    ],
  },
  {
    id: 'CHIEF',
    baseRecruitmentCost: [35500, 26600, 25000, 27200],
    baseRecruitmentTime: 70500,
    cropConsumption: 4,
    attack: 40,
    infantryDefence: 60,
    cavalryDefence: 40,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'special',
    tribe: 'teutons',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 20 },
      { buildingId: 'RALLY_POINT', level: 5 },
    ],
  },
  {
    id: 'TEUTONIC_SETTLER',
    baseRecruitmentCost: [5800, 4400, 4600, 5200],
    baseRecruitmentTime: 31000,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'special',
    tribe: 'teutons',
    researchPrerequisites: [],
  },
];

export const egyptianUnits: Unit[] = [
  {
    id: 'SLAVE_MILITIA',
    baseRecruitmentCost: [45, 60, 30, 15],
    baseRecruitmentTime: 530,
    cropConsumption: 1,
    attack: 10,
    infantryDefence: 30,
    cavalryDefence: 20,
    travelSpeed: 7,
    carryCapacity: 15,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [],
  },
  {
    id: 'ASH_WARDEN',
    baseRecruitmentCost: [115, 100, 145, 60],
    baseRecruitmentTime: 1320,
    cropConsumption: 1,
    attack: 30,
    infantryDefence: 55,
    cavalryDefence: 40,
    travelSpeed: 6,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 1 },
      { buildingId: 'ACADEMY', level: 1 },
    ],
  },
  {
    id: 'KHOPESH_WARRIOR',
    baseRecruitmentCost: [170, 180, 220, 80],
    baseRecruitmentTime: 1440,
    cropConsumption: 1,
    attack: 65,
    infantryDefence: 50,
    cavalryDefence: 20,
    travelSpeed: 7,
    carryCapacity: 45,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 1 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'SOPDU_EXPLORER',
    baseRecruitmentCost: [170, 150, 20, 40],
    baseRecruitmentTime: 1360,
    cropConsumption: 2,
    attack: 0,
    infantryDefence: 20,
    cavalryDefence: 10,
    travelSpeed: 16,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 1 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'ANHUR_GUARD',
    baseRecruitmentCost: [360, 330, 280, 120],
    baseRecruitmentTime: 2560,
    cropConsumption: 2,
    attack: 50,
    infantryDefence: 110,
    cavalryDefence: 50,
    travelSpeed: 15,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 5 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'RESHEPH_CHARIOT',
    baseRecruitmentCost: [450, 560, 610, 180],
    baseRecruitmentTime: 3240,
    cropConsumption: 3,
    attack: 110,
    infantryDefence: 120,
    cavalryDefence: 150,
    travelSpeed: 10,
    carryCapacity: 70,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 10 },
      { buildingId: 'ACADEMY', level: 15 },
    ],
  },
  {
    id: 'EGYPTIAN_RAM',
    baseRecruitmentCost: [995, 575, 340, 80],
    baseRecruitmentTime: 4800,
    cropConsumption: 3,
    attack: 55,
    infantryDefence: 30,
    cavalryDefence: 95,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 1 },
      { buildingId: 'ACADEMY', level: 10 },
    ],
  },
  {
    id: 'STONE_CATAPULT',
    baseRecruitmentCost: [980, 1510, 660, 100],
    baseRecruitmentTime: 9000,
    cropConsumption: 6,
    attack: 65,
    infantryDefence: 55,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 10 },
      { buildingId: 'ACADEMY', level: 15 },
    ],
  },
  {
    id: 'NOMARCH',
    baseRecruitmentCost: [34000, 50000, 34000, 42000],
    baseRecruitmentTime: 90700,
    cropConsumption: 4,
    attack: 40,
    infantryDefence: 50,
    cavalryDefence: 50,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'EGYPTIAN_SETTLER',
    baseRecruitmentCost: [5040, 6510, 4830, 4620],
    baseRecruitmentTime: 24800,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,

    carryCapacity: 3000,
    category: 'infantry',
    tribe: 'egyptians',
    researchPrerequisites: [],
  },
];

export const hunUnits: Unit[] = [
  {
    id: 'MERCENARY',
    baseRecruitmentCost: [130, 80, 40, 40],
    baseRecruitmentTime: 810,
    cropConsumption: 1,
    attack: 35,
    infantryDefence: 40,
    cavalryDefence: 30,
    travelSpeed: 6,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [],
  },
  {
    id: 'BOWMAN',
    baseRecruitmentCost: [140, 110, 60, 60],
    baseRecruitmentTime: 1120,
    cropConsumption: 1,
    attack: 50,
    infantryDefence: 30,
    cavalryDefence: 10,
    travelSpeed: 6,
    carryCapacity: 30,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 1 },
      { buildingId: 'ACADEMY', level: 3 },
    ],
  },
  {
    id: 'SPOTTER',
    baseRecruitmentCost: [170, 150, 20, 40],
    baseRecruitmentTime: 1360,
    cropConsumption: 2,
    attack: 0,
    infantryDefence: 20,
    cavalryDefence: 10,
    travelSpeed: 19,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 1 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'STEPPE_RIDER',
    baseRecruitmentCost: [290, 370, 190, 45],
    baseRecruitmentTime: 2400,
    cropConsumption: 2,
    attack: 120,
    infantryDefence: 30,
    cavalryDefence: 15,
    travelSpeed: 16,
    carryCapacity: 75,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 3 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'MARKSMAN',
    baseRecruitmentCost: [320, 350, 330, 50],
    baseRecruitmentTime: 2480,
    cropConsumption: 2,
    attack: 115,
    infantryDefence: 80,
    cavalryDefence: 70,
    travelSpeed: 16,
    carryCapacity: 105,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 5 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'MARAUDER',
    baseRecruitmentCost: [450, 560, 610, 140],
    baseRecruitmentTime: 2990,
    cropConsumption: 3,
    attack: 180,
    infantryDefence: 60,
    cavalryDefence: 40,
    travelSpeed: 14,
    carryCapacity: 80,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 10 },
      { buildingId: 'ACADEMY', level: 15 },
    ],
  },
  {
    id: 'HUN_RAM',
    baseRecruitmentCost: [1060, 330, 360, 70],
    baseRecruitmentTime: 4400,
    cropConsumption: 3,
    attack: 65,
    infantryDefence: 30,
    cavalryDefence: 90,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 1 },
      { buildingId: 'ACADEMY', level: 10 },
    ],
  },
  {
    id: 'MANGONEL',
    baseRecruitmentCost: [950, 1280, 620, 60],
    baseRecruitmentTime: 9000,
    cropConsumption: 6,
    attack: 45,
    infantryDefence: 55,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 10 },
      { buildingId: 'ACADEMY', level: 15 },
    ],
  },
  {
    id: 'LOGADES',
    baseRecruitmentCost: [37200, 27600, 25200, 27600],
    baseRecruitmentTime: 90700,
    cropConsumption: 4,
    attack: 50,
    infantryDefence: 40,
    cavalryDefence: 30,
    travelSpeed: 5,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'HUN_SETTLER',
    baseRecruitmentCost: [6100, 4600, 4800, 5400],
    baseRecruitmentTime: 28950,
    cropConsumption: 1,
    attack: 10,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'infantry',
    tribe: 'huns',
    researchPrerequisites: [],
  },
];

export const spartanUnits: Unit[] = [
  {
    id: 'HOPLITE',
    baseRecruitmentCost: [110, 185, 110, 40],
    baseRecruitmentTime: 1700,
    cropConsumption: 1,
    attack: 50,
    infantryDefence: 35,
    cavalryDefence: 30,
    travelSpeed: 6,
    carryCapacity: 60,
    category: 'infantry',
    tribe: 'spartans',
    researchPrerequisites: [],
  },
  {
    id: 'SENTINEL',
    baseRecruitmentCost: [185, 150, 35, 75],
    baseRecruitmentTime: 1232,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 40,
    cavalryDefence: 22,
    travelSpeed: 9,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 1 },
      { buildingId: 'ACADEMY', level: 1 },
    ],
  },
  {
    id: 'SHIELDSMAN',
    baseRecruitmentCost: [145, 95, 245, 45],
    baseRecruitmentTime: 1936,
    cropConsumption: 1,
    attack: 40,
    infantryDefence: 85,
    cavalryDefence: 45,
    travelSpeed: 8,
    carryCapacity: 40,
    category: 'infantry',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 1 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'TWINSTEEL_THERION',
    baseRecruitmentCost: [130, 200, 400, 65],
    baseRecruitmentTime: 2112,
    cropConsumption: 1,
    attack: 90,
    infantryDefence: 55,
    cavalryDefence: 40,
    travelSpeed: 6,
    carryCapacity: 50,
    category: 'infantry',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'SMITHY', level: 5 },
      { buildingId: 'ACADEMY', level: 10 },
    ],
  },
  {
    id: 'ELPIDA_RIDER',
    baseRecruitmentCost: [555, 445, 330, 110],
    baseRecruitmentTime: 2816,
    cropConsumption: 2,
    attack: 55,
    infantryDefence: 120,
    cavalryDefence: 90,
    travelSpeed: 16,
    carryCapacity: 110,
    category: 'cavalry',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 1 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'CORINTHIAN_CRUSHER',
    baseRecruitmentCost: [660, 495, 995, 165],
    baseRecruitmentTime: 3432,
    cropConsumption: 3,
    attack: 195,
    infantryDefence: 80,
    cavalryDefence: 75,
    travelSpeed: 9,
    carryCapacity: 80,
    category: 'cavalry',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'STABLE', level: 10 },
      { buildingId: 'ACADEMY', level: 5 },
    ],
  },
  {
    id: 'SPARTAN_RAM',
    baseRecruitmentCost: [525, 260, 790, 130],
    baseRecruitmentTime: 4620,
    cropConsumption: 3,
    attack: 65,
    infantryDefence: 30,
    cavalryDefence: 80,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 1 },
      { buildingId: 'ACADEMY', level: 10 },
    ],
  },
  {
    id: 'BALLISTA',
    baseRecruitmentCost: [550, 1240, 825, 125],
    baseRecruitmentTime: 0,
    cropConsumption: 6,
    attack: 50,
    infantryDefence: 60,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'WORKSHOP', level: 10 },
      { buildingId: 'ACADEMY', level: 15 },
    ],
  },
  {
    id: 'EPHOR',
    baseRecruitmentCost: [33450, 30665, 36240, 13935],
    baseRecruitmentTime: 77550,
    cropConsumption: 1,
    attack: 40,
    infantryDefence: 60,
    cavalryDefence: 40,
    travelSpeed: 4,
    carryCapacity: 0,
    category: 'special',
    tribe: 'spartans',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'SPARTAN_SETTLER',
    baseRecruitmentCost: [5115, 5580, 6045, 3255],
    baseRecruitmentTime: 34100,
    cropConsumption: 1,
    attack: 10,
    infantryDefence: 80,
    cavalryDefence: 80,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'special',
    tribe: 'spartans',
    researchPrerequisites: [],
  },
];

// TODO: Think of cost and recruitment time for nature & natar units
export const natureUnits: Unit[] = [
  {
    id: 'RAT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 10,
    infantryDefence: 25,
    cavalryDefence: 20,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'SPIDER',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 20,
    infantryDefence: 35,
    cavalryDefence: 40,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'SERPENT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 60,
    infantryDefence: 40,
    cavalryDefence: 60,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'BAT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 80,
    infantryDefence: 66,
    cavalryDefence: 50,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'WILD_BOAR',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 2,
    attack: 50,
    infantryDefence: 70,
    cavalryDefence: 33,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'WOLF',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 2,
    attack: 100,
    infantryDefence: 80,
    cavalryDefence: 70,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'BEAR',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 3,
    attack: 250,
    infantryDefence: 140,
    cavalryDefence: 200,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'CROCODILE',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 3,
    attack: 450,
    infantryDefence: 380,
    cavalryDefence: 240,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'TIGER',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 3,
    attack: 200,
    infantryDefence: 170,
    cavalryDefence: 250,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
  {
    id: 'ELEPHANT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 5,
    attack: 600,
    infantryDefence: 440,
    cavalryDefence: 520,
    travelSpeed: 20,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'nature',
    researchPrerequisites: [],
  },
];

export const natarianUnits: Unit[] = [
  {
    id: 'PIKEMAN',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 20,
    infantryDefence: 35,
    cavalryDefence: 50,
    travelSpeed: 6,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'natars',
    researchPrerequisites: [],
  },
  {
    id: 'THORNED_WARRIOR',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 65,
    infantryDefence: 30,
    cavalryDefence: 10,
    travelSpeed: 7,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 3 },
      { buildingId: 'SMITHY', level: 1 },
    ],
  },
  {
    id: 'GUARDSMAN',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 100,
    infantryDefence: 90,
    cavalryDefence: 75,
    travelSpeed: 6,
    carryCapacity: 0,
    category: 'infantry',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'SMITHY', level: 5 },
    ],
  },
  {
    id: 'BIRDS_OF_PREY',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 0,
    infantryDefence: 10,
    cavalryDefence: 10,
    travelSpeed: 25,
    carryCapacity: 0,
    category: 'cavalry',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 1 },
    ],
  },
  {
    id: 'AXERIDER',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 2,
    attack: 155,
    infantryDefence: 80,
    cavalryDefence: 50,
    travelSpeed: 14,
    carryCapacity: 0,
    category: 'cavalry',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 5 },
      { buildingId: 'STABLE', level: 1 },
    ],
  },
  {
    id: 'NATARIAN_KNIGHT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 3,
    attack: 170,
    infantryDefence: 140,
    cavalryDefence: 80,
    travelSpeed: 12,
    carryCapacity: 0,
    category: 'cavalry',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'STABLE', level: 10 },
    ],
  },
  {
    id: 'WARELEPHANT',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 4,
    attack: 250,
    infantryDefence: 120,
    cavalryDefence: 150,
    travelSpeed: 5,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 10 },
      { buildingId: 'WORKSHOP', level: 1 },
    ],
  },
  {
    id: 'NATARIAN_BALLISTA',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 5,
    attack: 60,
    infantryDefence: 45,
    cavalryDefence: 10,
    travelSpeed: 3,
    carryCapacity: 0,
    category: 'siege',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'ACADEMY', level: 15 },
      { buildingId: 'WORKSHOP', level: 10 },
    ],
  },
  {
    id: 'NATARIAN_EMPEROR',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 80,
    infantryDefence: 50,
    cavalryDefence: 50,
    travelSpeed: 5,
    carryCapacity: 0,
    category: 'special',
    tribe: 'natars',
    researchPrerequisites: [
      { buildingId: 'RALLY_POINT', level: 10 },
      { buildingId: 'ACADEMY', level: 20 },
    ],
  },
  {
    id: 'NATARIAN_SETTLER',
    baseRecruitmentCost: [null, null, null, null],
    baseRecruitmentTime: null,
    cropConsumption: 1,
    attack: 30,
    infantryDefence: 40,
    cavalryDefence: 40,
    travelSpeed: 5,
    carryCapacity: 3000,
    category: 'special',
    tribe: 'natars',
    researchPrerequisites: [],
  },
];

export const units: Unit[] = [
  ...romanUnits,
  ...gaulUnits,
  ...teutonUnits,
  ...egyptianUnits,
  ...hunUnits,
  ...spartanUnits,
  ...natureUnits,
  ...natarianUnits,
];
