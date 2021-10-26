import { factorial, tailFactorials } from '../src/factorial';

test('斐波那契数列', () => {
  console.time('start');
  //   expect(factorial(10)).toBe(3628800);
  console.log(factorial(10));
  console.timeEnd('start');
});

test('尾调用 斐波那契数列', () => {
  console.time('tail');
  //   expect(fib(10)).toBe(3628800);
  console.log(tailFactorials(10));
  console.timeEnd('tail');
});
