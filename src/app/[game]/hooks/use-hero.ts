import { useQuery } from '@tanstack/react-query';
import type { Hero } from 'interfaces/models/game/hero';

export const heroCacheKey = 'hero';

export const useHero = () => {
  const { data } = useQuery<Hero>({
    queryKey: [heroCacheKey],
  });

  // Due to us working with only local data, which is prefetched in loader, we can do this assertion to save us from having to spam "!" everywhere
  const hero = data as Hero;

  return {
    hero,
  };
};
