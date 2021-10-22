/**
 * @description 同步执行一系列方法
 * @param  {...Function} args 一系列方法
 * @returns {*} result 执行方法后的结果
 */
export default function compose(...func) {
  if (func.length === 0) return (args) => args;
  if (func.length === 1) return func[0];
  return func.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  );
}

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
