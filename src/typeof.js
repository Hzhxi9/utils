const toStringProp = Object.prototype.toString;

/**
 * 检查数据类型
 * @param {*} target
 * @returns {string}
 */
const check = (target) => toStringProp.call(target).slice(8, -1).toLowerCase();

/**
 * 判断不为undefined以及null
 * @param {*} target
 * @returns {boolean}
 */
const isDef = (target) => target !== undefined && target !== null;

/**
 *
 * @param {*} target
 * @returns
 */
const isUndefined = (target) => typeof target === 'undefined';

/**
 * 判断是否为对象
 * @param {*} target
 * @returns
 */
const isObject = (target) => target !== null && typeof target === 'object';

/**
 * 判断是否为普通对象
 * @param {*} target
 * @returns
 */
const isPlainObject = (target) => {
  if (toStringProp.call(target) !== '[object Object]') return false;
  const prototype = Object.getPrototypeOf(target);
  return prototype === null || prototype === Object.prototype;
};

/**
 * 判断是否为promise对象
 * @param {*} target
 * @returns {boolean}
 */
const isPromise = (target) =>
  isDef(target) &&
  typeof target.then === 'function' &&
  typeof target.catch === 'function';

module.exports = {
  check,
  isDef,
  isUndefined,
  isObject,
  isPromise,
  isPlainObject,
};
