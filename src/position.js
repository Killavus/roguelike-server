const POSITION_SLUG_SEPARATOR = 'x';

const position = {
  slug() { return `${this.x}${POSITION_SLUG_SEPARATOR}${this.y}`; },
};

const checkPositionInvariants = (x, y) => {
  if (![x, y].every(Number.isSafeInteger)) {
    throw new Error('Position coordinates do not make sense.' +
                    ` Given: ${x}, ${y}.`)
  }

  if (x < 1 || y < 1) {
    throw new Error('Position coordinates must be positive integers.' +
                    ` Given: ${x}, ${y}.`);
  }
};

const spawnPosition = (x, y) => {
  checkPositionInvariants(x, y);
  const pos = Object.create(position);
  return Object.assign(pos, { x, y });
};

export const fromSlug = slug => {
  const [x, y] = slug.split(POSITION_SLUG_SEPARATOR).map(Number); 
  return spawnPosition(x, y);
};

export default spawnPosition;
