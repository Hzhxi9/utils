/**
 * forin 遍历效率低, while 遍历最高
 * 用 while 实现 forin 遍历
 * @param {*} array 数组
 * @param {*} iterator 回调函数
 * @returns
 */

module.exports = function forEach(array, iterator) {
  let idx = -1;
  const len = array.length;
  while (++idx < len) {
    iterator(array[idx], idx, array);
  }
  return array;
};
