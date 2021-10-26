/**
 * 1. 尾调用定义
 *
 *  @description 某个函数的最后一步是调用另一个函数
 *  @example function f(x) { return g(x) }
 *
 *  函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。
 *  @example function f(x) { if(x > 0) return m(x); return n(x); }
 *
 *  - 以下两种情况都不属于尾调用
 *
 *  调用函数g之后, 还有别的操作, 不属于尾调用
 *  @example function f(x) { let y = g(x); return y }
 *
 *  调用后还有操作，即使写在一行内。
 *  @example function f(x) { return g(x) + 1 }
 *
 *
 *
 */

/**
 * 正常阶乘
 * @param {*} n
 * @returns
 */
export function factorial(n) {
  if (n === 1) return 1;
  return n * fib(n - 1);
}

/**
 * 尾递归 阶乘处理
 * @param {*} n
 * @param {*} total
 * @returns
 */
function tail(n, total) {
  if (n === 1) return total;
  return tail(n - 1, n * total);
}
export function tailFactorials(n) {
  return tail(n, 1);
}

/**
 * 尾递归, 柯里化
 * @param {*} fn
 * @param {*} n
 * @returns
 */
function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function curryFactorials(n, total) {
  if (n === 1) return total;
  return curryFactorials(n - 1, n * total);
}

const cf = currying(curryFactorials, 1);

