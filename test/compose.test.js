import { compose } from '../src/compose';

test('use compose', () => {
  const fn1 = (x, y) => x + y;
  const fn2 = (x) => x * x;
  const fn3 = (x) => (!x ? x : 1 / x);
  /**TODO */
  expect(compose(fn3, fn2, fn1)(1, 2)).toBe(1 / 9);
});
