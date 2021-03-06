import get, { lookup } from '../src/get';

test('use get', () => {
  const obj = {
    selector: { to: { val: 'val to select' } },
    target: [1, 2, { a: 'test' }],
  };
  expect(get(obj, 'selector.to.val', 'target[0]', 'target[2].a')).toStrictEqual(['val to select', 1, 'test']);
});

test('use lookup', () => {
  const o = { a: { b: { c: 100 } } };
  expect(lookup(o, 'a.b.c')).toStrictEqual(100);
});
