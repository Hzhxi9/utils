const debug = (target) => {
  throw new TypeError(target + ' is no array');
};

const isArray = (target) => Array.isArray(target);

/**
 * 数组 forEach
 * @param {*} array
 * @param {*} callback
 */
function forEach(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    /**
     * x >>> 0本质上就是保证x有意义（为数字类型），且为正整数
     * 在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0。
     **/
    len = target.length >>> 0;

  let k = 0;

  while (len > k) {
    callback(target[k], k, target);
    k++;
  }
}

/**
 * 数组 map
 * @param {*} array
 * @param {*} callback
 * @returns {any[]}
 */
function map(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0,
    result = [];

  let k = 0;

  while (len > k) {
    result[k] = callback(array[k], k, array);
    k++;
  }
  return result;
}

/**
 * 数组 some
 * @param {*} array
 * @param {*} callback
 * @returns {boolean}
 */
function some(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0;

  let k = 0,
    result = false;

  while (len > k) {
    if (callback(target[k], k, target)) result = true;
    k++;
  }
  return result;
}

/**
 * 数组 array
 * @param {*} array
 * @param {*} callback
 * @returns {boolean}
 */
function every(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0;

  let k = 0;

  while (len > k) {
    const result = callback(target[k], k, target);
    if (!result) return false;
    k++
  }
  return true;
}
