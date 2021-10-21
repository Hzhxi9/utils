/**
 * 从vue源码中学习
 * 传入一个函数, 并缓存
 * 再次调用直接读取缓存并返回
 * @param {*} fn
 * @returns
 */
 export default function cached(fn) {
  const cache = Object.create(null);
  return function (str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const getData = cached(function (str) {
  return str;
});
getData('str');
getData('str');
