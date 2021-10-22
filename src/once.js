/**
 *  确保一个函数只执行一次
 */
export default function once(fn) {
  let cached = false;
  return function () {
    if (!cached) {
      cached = true;
      fn.apply(this, arguments);
    }
  };
}
