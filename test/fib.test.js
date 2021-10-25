import { fib, fibs } from '../src/fib';

test('斐波那契数列', () => {
  console.time('start');
  //   expect(fib(10)).toBe(3628800);
  console.log(fib(10));
  console.timeEnd('start');
});

test('尾调用 斐波那契数列', () => {
  console.time('tail');
  //   expect(fib(10)).toBe(3628800);
  console.log(fibs(10));
  console.timeEnd('tail');
});
