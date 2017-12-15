import test from 'ava';
import cache from '../src/cache';

test('Can add to cache and get back out', t => {
  cache('foo', 'bar');
  const bar = cache('foo');
  t.is(bar, 'bar');
});
