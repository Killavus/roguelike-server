import position, { fromSlug } from '../dist/position';
import test from 'tape';

test('position - responds to x, y queries', t => {
  t.plan(2);

  const expectedX = 2;
  const expectedY = 4;

  const testedPosition = position(2, 4);

  t.equals(testedPosition.x, expectedX, 'x coordinate matches');
  t.equals(testedPosition.y, expectedY, 'y coordinate matches');
});

test('position - checking coordinates being integer while creating', t => {
  t.plan(1);

  t.throws(() => position(2.2, 'foo'), 
           'throws an error');
});

test('position - checking coordinates being positive while creating', t => {
  t.plan(1);

  t.throws(() => position(-2, 2), 
           'throws an error');
});

test('position - slug can be generated', t => {
  t.plan(1);
  t.equals(position(1, 1).slug(), 
           '1x1', 
           '1x1 is a slug for position(1, 1)');
});

test('position - can be created from slug', t => {
  const expectedPosition = position(1, 1);
 
  t.plan(1); 
  t.deepEquals(fromSlug('1x1'), 
               expectedPosition, 
               '1x1 slug equals position(1, 1)');
});
