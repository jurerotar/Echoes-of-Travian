import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { GameContext } from 'providers/game/game-context';
import { Hero } from 'interfaces/models/game/hero';
import localforage from 'localforage';
import { Outlet } from 'react-router-dom';

type HeroProviderValues = {
  heroData: Hero | null;
  setHeroData: React.Dispatch<React.SetStateAction<Hero | null>>;
};

const HeroContext = createContext<HeroProviderValues>({} as HeroProviderValues);

const HeroProvider: React.FC = (): ReactElement => {
  const server = useContextSelector(GameContext, (v) => v.server);
  const setIsContextReady = useContextSelector(GameContext, (v) => v.setIsContextReady);
  const [heroData, setHeroData] = useState<Hero | null>(null);

  useEffect(() => {
    if (!server) {
      return;
    }
    (async () => {
      try {
        const storageHeroData = await localforage.getItem<Hero>(`${server.id}-heroData`);
        setHeroData(storageHeroData);
      } catch (e) {
        console.error('Error fetching hero data from IndexedDB', e);
      }
    })();
  }, [server]);

  useEffect(() => {
    if (!heroData) {
      return;
    }
    setIsContextReady('hero');
  }, [heroData]);

  const value = useMemo<HeroProviderValues>(() => {
    return {
      heroData,
      setHeroData
    };
  }, [heroData]);

  return (
    <HeroContext.Provider value={value}>
      <Outlet />
    </HeroContext.Provider>
  );
};

export {
  HeroContext,
  HeroProvider
};
