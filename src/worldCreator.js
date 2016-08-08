const handleSpecialType = (world, position, type) => {
  switch (type) {
    case 'SPAWN_POINT':
      const spawnPoints = world.meta.spawnPoints || [];
      Object.assign(world.meta, 
                    { spawnPoints: [...spawnPoints, position.slug()] });
      break;
    case 'EXIT_POINT':
      Object.assign(world.meta,
                    { exitPoint: position.slug() });
      break;
  }
};

const creator = {
  spawn({ width, height }) {
    return {
      meta: {
        width,
        height,
      },
      objects: {},
      creatures: {},
      terrain: {},
    };
  },
  paintTerrain(world, positions, terrainType) {
    const slugs = positions.map(p => p.slug());

    slugs.forEach(slug => {
      world.terrain[slug] = terrainType; 
    });
  },
  placeObject(world, position, objectSpec) {
    const { type } = objectSpec;
    const slug = position.slug();
    handleSpecialType(world, position, type);
    world.objects[slug] = objectSpec;
  },
};

function worldCreator() {
  return Object.create(creator);
}

export default worldCreator;
