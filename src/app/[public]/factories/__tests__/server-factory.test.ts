import { serverFactory } from 'app/[public]/factories/server-factory';

describe('Server factory', () => {
  const server = serverFactory({
    name: 'server-factory-test',
    seed: '00000000',
    configuration: {
      speed: 1,
      mapSize: 100,
    },
    playerConfiguration: {
      name: 'Player name',
      tribe: 'gauls',
    },
  });

  test('Has id', () => {
    expect(Object.hasOwn(server, 'id')).toBe(true);
  });

  test('Has start date', () => {
    expect(Object.hasOwn(server, 'startDate')).toBe(true);
  });
});