const debug = target => {
  throw new TypeError(target + ' is no array');
};

const isArray = target => Array.isArray(target);

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
    k++;
  }
  return true;
}

/**
 * 数组 filter
 * @param {*} array
 * @param {*} callback
 */
function filter(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0,
    result = [];

  let k = 0;

  while (len > k) {
    if (callback(target[k], k, target)) result.push(target[k]);
    k++;
  }
  return result;
}

/**
 * 数组 find
 * @param {*} array
 * @param {*} callback
 */
function find(array, callback) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0;

  let k = 0;

  while (len > k) {
    if (callback(target[k], k, target)) return target[k];
    k++;
  }
  return void 0;
}

/**
 * 数组 reduce
 * @param {*} array
 * @param {*} callback
 */
function reduce(array, callback, init) {
  if (!isArray(array)) debug(array);

  const target = Object(array),
    len = target.length >>> 0;

  let k = 0,
    acc = [];

  if (arguments.length > 2) {
    acc = init;
  } else {
    while (k < len && !(k in target)) k++;
    if (k > len) throw new TypeError('reduce is no empty');
    acc = target[k++];
  }

  while (k < len) {
    acc = callback(acc, target[k], k, target);
    k++;
  }
  return acc;
}

/**
 * 随机化数组元素顺序
 * @param {*} array
 * @returns
 */
export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * 数组去重
 */
export function arrayWithoutDuplicate(array) {
  return [...new Set(array)];
}

/**
 * 数组对象去重
 * @param {*} array 要去重的数组
 * @param {*} key  根据对象的 key 去重
 * @returns
 */

export function arrayObjectWithoutDuplicate(array, key) {
  const object = {};
  return array.reduce((acc, cur) => {
    if (!object[cur[key]]) object[cur[key]] = acc.push(cur);
    return acc;
  }, []);
}

/**
 * 取两个数组的并集
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
export function arrayDiff(arr1, arr2) {
  return arr1.concat(arr2).filter((v, i, arr) => arr.indexOf(v) === arr.lastIndexOf(v));
}

/**
 * 取两个数组的交集
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
export function arraySimilarity(arr1, arr2) {
  return arr1.filter(v => arr2.includes(v));
}

/**
 * 数组二相对于数组一不同的元素组成的数组
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
export function getDiffFrom(arr1, arr2) {
  const values = new Set(arr2);
  return arr1.filter(element => !values.has(element));
}

/**
 * 获取数组中指定个数的最大元素
 * @param {*} arr
 * @param {*} n 需要获取最大元素的数量
 * @returns
 */
export function maxArray(arr, n = 1) {
  return [...arr].sort((a, b) => b - a).slice(0, n);
}

/**
 * 指定数量的最小元素组成的数组
 * @param {*} arr
 * @param {*} n
 * @returns
 */
export function minArray(arr, n = 1) {
  return [...arr].sort((a, b) => a - b).slice(0, n);
}

/**
 * 根据对象的键值在数组中查找对象
 * @param {*} arr
 * @param {*} key
 * @param {*} value
 */
export function findObjectInArray(arr, key, value) {
  return arr.find(obj => obj[key] === value);
}

/**
 * 根据元素值移除数组元素
 * @param {*} arr
 * @param {*} ele
 * @returns
 */
export function arrayRemoveEle(arr, ele) {
  return arr.filter(value => value !== ele);
}

/**
 * 根据函数名称移除函数数组的元素
 * @param {*} arr
 * @param {*} name 将要删除的函数名称。
 */
export function arrRemoveFunEle(arr, name) {
  return arr.filter(value => value.name !== name);
}

/**
 * 根据对象数组的属性值移除元素
 * @param {*} arr
 * @param {*} key 将要删除的元素属性。
 * @param {*} value 将要删除的元素属性值。
 * @returns
 */
export function arrayRemoveObjEle(arr, key, value) {
  return arr.filter(value => value[key] !== value);
}

/**
 * 计算对象数组指定健的平均值
 * @param {*} arr
 * @param {*} key 需要计算平均值的 key。
 * @returns
 */
export function averageBy(arr, key) {
  return arr.reduce((acc, cur) => acc + cur[key], 0) / arr.length;
}

/**
 * 计算数组中元素的出现次数
 * @param {*} arr
 * @param {*} value 需要统计出现次数的元素
 */
export function countFrequency(arr, value) {
  return arr.reduce((acc, cur) => (cur === value ? acc + 1 : acc + 0), 0);
}

/**
 * 计算对象数组中某个属性值的出现次数
 * @param {*} arr
 * @param {*} key 需要统计出现次数的 key
 * @param {*} value 需要统计出现次数的 value
 * @returns
 */
export function countObjFrequency(arr, key, value) {
  return arr.reduce((acc, cur) => (cur[key] === value ? acc + 1 : acc + 0), 0);
}

/**
 * 过滤数组中的非唯一值
 * @param {*} arr
 * @returns
 */
export function filterNoUnique(arr) {
  return arr.filter(value => arr.indexOf(value) === arr.lastIndexOf(value));
}

/**
 * 过滤数组中的唯一值
 * @param {*} arr 
 * @returns 
 */
export function filterUnique(arr) {
  return arr.filter(value => arr.indexOf(value) !== arr.lastIndexOf(value));
}
