import looseEqual from '../src/looseEqual';

test('use looseEqual', () => {
  expect(looseEqual({ a: 1 }, { a: 1 })).toBe(true);
});
