import merge from '../src/merge';

test('use merge', () => {
  const a = { name: 'zz', option: { value: '123', isShow: true } };
  const b = { age: 12, option: { data: '5666', isOpen: false } };
  expect(merge(a, b)).toEqual({
    name: 'zz',
    age: 12,
    option: { value: '123', isShow: true, data: '5666', isOpen: false },
  });
});
