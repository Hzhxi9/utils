const { isDef, isPromise } = require('../src/typeof');

test('use isDef', () => {
  expect(isDef(null)).toBe(false);
});

test('use isPromise', () => {
  const p = function () {
    return new Promise((resolve, reject) => {
      resolve('success');
      reject('error')
    });
  };
  expect(isPromise(p())).toBe(true);
});
