import { createContext, type FCWithChildren, useContext } from 'react';
import { useCalculatedResource } from 'app/[game]/hooks/use-calculated-resource';
import type { Resources } from 'interfaces/models/game/resource';

const CurrentResourceContext = createContext<Resources>({} as never);

export const CurrentResourceProvider: FCWithChildren = ({ children }) => {
  const { calculatedResourceAmount: wood } = useCalculatedResource('wood');
  const { calculatedResourceAmount: clay } = useCalculatedResource('clay');
  const { calculatedResourceAmount: iron } = useCalculatedResource('iron');
  const { calculatedResourceAmount: wheat } = useCalculatedResource('wheat');

  const value = {
    wood,
    clay,
    iron,
    wheat,
  };

  return <CurrentResourceContext.Provider value={value}>{children}</CurrentResourceContext.Provider>;
};

export const useCurrentResources = () => useContext(CurrentResourceContext);
