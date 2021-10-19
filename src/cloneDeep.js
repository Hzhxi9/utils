/**
 * 实现对象的深拷贝
 */

const forEach = require('./forEach');

/**
 * 版本一, 拷贝数组以及对象
 * @param {*} target
 * @returns
 */
function cloneDeep1(target) {
  if (typeof target === 'object') {
    const o = Array.isArray(target) ? [] : {};
    for (const key in target) {
      o[key] =
        typeof target[key] === 'object' ? cloneDeep1(target[key]) : target[key];
    }
    return o;
  } else {
    return target;
  }
}

/**
 * 版本二, 解决循环引用
 * 额外开辟一个内存空, 存储当前对象和拷贝对象的对应关系
 * @param {*} target
 */
function cloneDeep2(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const o = Array.isArray(target) ? [] : {};
    /**检查map中有无克隆过的对象 */

    /**有 - 直接返回 */
    if (map.get(target)) return target;

    /**没有 - 将当前对象作为key，克隆对象作为value进行存储 */
    map.set(target, o);

    /**继续克隆 */
    for (const key in target) {
      o[key] =
        typeof target[key] === 'object' ? cloneDeep2(target, map) : target[key];
    }
    return o;
  } else {
    return target;
  }
}

/**
 * 版本三, 使用自定义forEach优化性能
 * @param {*} target 
 * @param {*} map 
 * @returns 
 */
function cloneDeep3(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    const clone = isArray ? [] : {};

    if (map.get(target)) return target;

    map.set(target, clone);

    /**
     * 当遍历数组时，直接使用 forEach进行遍历
     * 
     * 当遍历对象时，使用 Object.keys取出所有的 key进行遍历，
     * 然后在遍历时把 forEach会调函数的 value当作 key使用
     */
    const keys = isArray ? undefined : Object.keys(target);

    forEach(keys || target, (value, key, arr) => {
      if (keys) key = value;
      clone[key] =  cloneDeep3(target[key], map);
    });

    return clone
  } else {
    return target;
  }
}

module.exports = {
  cloneDeep1,
  cloneDeep2,
  cloneDeep3,
};

// export default function cloneDeep(target, map = new WeakMap()) {}
