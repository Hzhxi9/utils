/**
 * compose函数的作用就是组合函数，依次组合传入的函数
 *    - 后一个函数作为前一个函数的参数
 *    - 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 * @description 同步执行一系列方法
 * @param  {...Function} args 一系列方法
 * @returns {*} result 执行方法后的结果
 */
export default function compose(...func) {
  /**没有传入函数参数，就返回一个默认函数（直接返回参数） */
  if (func.length === 0) return (args) => args;

  /**单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行 */
  if (func.length === 1) return func[0];

  /**依次拼凑执行函数 */
  return func.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  );
}

