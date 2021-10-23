/**
 * compose函数的作用就是组合函数，依次组合传入的函数
 *    - 后一个函数作为前一个函数的参数
 *    - 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 * @description 同步执行一系列方法
 * @param  {...Function} args 一系列方法
 * @returns {*} result 执行方法后的结果
 */
export function compose(...func) {
  /**没有传入函数参数，就返回一个默认函数（直接返回参数） */
  if (func.length === 0) return (args) => args;

  /**单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行 */
  if (func.length === 1) return func[0];

  /**
   * 依次拼凑执行函数
   * @example compose(f4, f3, f2, f1)(c, d, e)
   *    - reduce回调函数第一次执行时, 返回值为函数 (...args) => f4(f3(...args)), 作为下一次执行的a参数
   *    - 回调函数第二次执行时, 返回值为函数 (...args) => f4(f3(f2(...args))), 作为下一次执行的b参数
   *    - 回调函数第三次执行时, 返回值为函数 (...args) => f4(f3(f2(f1(...args))))
   *
   *    最右边的参数 f1 可以接受多个参数, 然后返回结果传给下一个函数f2, 返回结果再传入f3
   *    f3最先被调用, 会等待f2的结果, 再等待f1的结果
   */
  return func.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  );
}

/**
 * 使用迭代实现(从右到左)
 * 通过 idx 来标记应该执行哪个函数
 * 这里是从最右边(length - 1)开始执行的, 每执行一个 idx 就减1, 直到 idx 为 0(最左边)为止
 * 用 result 来记录每次函数执行的返回值, 每次都会更新, 直到所有函数都执行, 才会返回最终结果
 * 
 * 如果传递的函数列表为空, 则返回传入参数
 */
export function composeOnIterator(...funcs) {
  const len = funcs.length;
  return function (...args) {
    let idx = len - 1,
      result = len > 0 ? funcs[idx].apply(this, args) : args;

    while (--idx >= 0) {
      result = funcs[idx].call(this, result);
    }
    return result;
  };
}
