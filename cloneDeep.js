/**
 * 实现对象的深拷贝
 */

// import checkTypeof from './checkTypeof';

/**版本一 */
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

/**版本二 */
function cloneDeep2(target) {}

module.exports = {
  cloneDeep1,
};

// export default function cloneDeep(target, map = new WeakMap()) {}
