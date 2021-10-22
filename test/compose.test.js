import compose from '../src/compose';

test('use compose', () => {
  const fn1 = function () {
    return '111';
  };
  const fn2 = function () {
    return '222';
  };
  const fn3 = function () {
    return '333';
  };
  /**TODO */
  console.log(compose(fn1, fn2, fn3));
  //   expect(compose(fn1, fn2, fn3)()).toEqual('111222333');
});
