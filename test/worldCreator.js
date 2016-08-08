import worldCreator from '../dist/worldCreator';
import test from 'tape';
import position from '../dist/position';

test('worldCreator - spawn an empty world', t => {
  t.plan(1);
  const creator = worldCreator();

  const expectedWorld = {
    meta: {
      width: 200, 
      height: 400,
    },
    objects: {},
    terrain: {},
    creatures: {},
  };

  t.deepEquals(  
    creator.spawn({ width: 200, height: 400, }),
    expectedWorld,
    'an empty world is created'
  );
});

test('worldCreator - fill the world with content', t => {
  t.plan(1);
  const creator = worldCreator();

  const expectedWorld = {
    meta: {
      width: 4,
      height: 4,
      spawnPoints: ['2x1'],
      exitPoint: '3x3',
    },
    objects: {
      '1x3': {
        type: 'TORCH',
        direction: 'EAST',
      },
      '2x1': {
        type: 'SPAWN_POINT',
        player: 1,
      },
      '3x2': {
        type: 'WOODEN_CHEST',
        lootList: []
      },
      '3x3': {
        type: 'EXIT_POINT',
        as: 'DUNGEON_STAIRCASE',
      },
    },
    terrain: {
      '1x1': 'DUNGEON_WALL',
      '1x2': 'DUNGEON_WALL',
      '1x3': 'DUNGEON_WALL',
      '1x4': 'DUNGEON_WALL',
      '2x1': 'DUNGEON_TILE',
      '2x2': 'DUNGEON_TILE',
      '2x3': 'DUNGEON_TILE',
      '2x4': 'DUNGEON_WALL',
      '3x1': 'DUNGEON_WALL',
      '3x2': 'DUNGEON_TILE',
      '3x3': 'DUNGEON_TILE',
      '3x4': 'DUNGEON_WALL',
      '4x1': 'DUNGEON_WALL',
      '4x2': 'DUNGEON_WALL',
      '4x3': 'DUNGEON_WALL',
      '4x4': 'DUNGEON_WALL',
    },
    creatures: {},
  };

  const world = creator.spawn({ width: 4, height: 4 }); 

  creator.paintTerrain(
    world, 
    [ position(1, 1),
      position(1, 2),
      position(1, 3),
      position(1, 4),
      position(2, 4),
      position(3, 1),
      position(4, 1),
      position(4, 2),
      position(4, 3),
      position(4, 4),
      position(3, 4),
    ],
    'DUNGEON_WALL');

  creator.paintTerrain(
    world,
    [ position(2, 1),
      position(2, 2),
      position(3, 2),
      position(3, 3),
      position(2, 3),
    ],
    'DUNGEON_TILE');

  creator.placeObject(
    world,
    position(3, 2),
    { type: 'WOODEN_CHEST',
      lootList: [], });

  creator.placeObject(
    world,
    position(2, 1),
    { type: 'SPAWN_POINT',
      player: 1, });

  creator.placeObject(
    world,
    position(1, 3),
    { type: 'TORCH',
      direction: 'EAST', });

  creator.placeObject(
    world,
    position(3, 3),
    { type: 'EXIT_POINT',
      as: 'DUNGEON_STAIRCASE', });

  t.deepEquals(world, 
               expectedWorld, 
               'world filled in a correct way');
}); 
