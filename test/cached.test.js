import cached from '../src/cached';

test('cached', () => {
  
  expect(cached(function () {
    return 'str';
  })()).toBe('str')
});
