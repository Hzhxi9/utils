const { isObject, isUndefined } = require('./typeof');

/**
 * forin 遍历效率低, while 遍历最高
 * 用 while 实现 forin 遍历
 * @param {*} array 数组
 * @param {*} iterator 回调函数
 * @returns
 */

function forEach(array, iterator) {
  let idx = -1;
  const len = array.length;
  while (++idx < len) {
    iterator(array[idx], idx, array);
  }
  return array;
}

function forin(target, fn) {
  if (target === null || isUndefined(target)) return;

  /**如果不为对象, 包装为对象 */
  if (!isObject(target)) target = [target];

  if (Array.isArray(target)) {
    const len = target.length >>> 0;
    let k = 0;
    while (k < len) {
      fn.call(null, target[k], k, target);
      k++;
    }
  } else {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key))
        fn.call(null, target[key], key, target);
    }
  }
}

module.exports = {
  forEach,
  forin
};
