type CommonTableName = 'servers';

type ServerSpecificTableName =
  | 'maps'
  | 'heroes'
  | 'villages'
  | 'reports'
  | 'quests'
  | 'achievements'
  | 'events'
  | 'effects'
  | 'banks'
  | 'players'
  | 'reputations'
  | 'researchLevels'
  | 'auctions'
  | 'mapMarkers'
  | 'adventures'
  | 'mapFilters';

export type TableName = CommonTableName | ServerSpecificTableName;
