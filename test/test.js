import test from 'ava';
import c from '../src';

test('Can load coachmarks', t => {
  t.truthy(c);
});

test('Can add coachmark', t => {
  c.add('frooby', {});
  const cache = c.cache();
  t.truthy(cache.frooby);
});
