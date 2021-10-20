/**
 * 实现对象的深拷贝
 */

const forEach = require('./forEach');
const check = require('./typeof');

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
      clone[key] = cloneDeep3(target[key], map);
    });

    return clone;
  } else {
    return target;
  }
}

/**
 * 常用类型
 */

/**可以继续遍历的类型 */
const mapTag = 'map';
const setTag = 'set';
const arrayTag = 'array';
const objectTag = 'object';
const argsTag = 'arguments';

const deepTags = [mapTag, setTag, arrayTag, objectTag, argsTag];

/**不可以继续遍历的类型 */
const boolTag = 'boolean';
const dateTag = 'date';
const errorTag = 'error';
const numberTag = 'number';
const regexpTag = 'regexp';
const stringTag = 'string';
const symbolTag = 'symbol';
const funcTag = 'function';

/**
 * 版本四, 处理不用类型的引用类型
 * 处理可以继续遍历的类型
 * @param {*} target
 * @param {*} map
 */
function cloneDeep4(target, map = new WeakMap()) {
  /**判断目标是否为对象或者函数 */
  if (!isObject(target)) return target;

  /**获取目标的类型 */
  const type = check(target);

  /**设置初始化对象 */
  let clone;
  if (deepTags.includes(type)) clone = getInit(target);

  /**防止循环引用 */
  if (map.get(target)) return target;
  map.set(target, clone);

  /**处理set */
  if (type === setTag) {
    target.forEach((value) => {
      clone.add(cloneDeep4(value));
    });
    return clone;
  }

  /**处理map */
  if (type === mapTag) {
    target.forEach((value, key) => {
      clone.set(key, cloneDeep4(value));
    });
    return clone;
  }

  /**克隆数据和对象 */
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) key = value;
    clone[key] = cloneDeep4(target[key], map);
  });
  return clone;
}

/**
 * 判断是否为对象or函数
 * @param {*} target
 * @returns
 */
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

/**
 * 获取类型的初始化数据, 可以保留对象的原型上的数据
 * 如果直接使用{}, 原型必然丢失
 * @param {*} target
 * @returns
 */
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

/**
 * 处理symbol类型
 * @param {*} target
 */
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

/**
 * 处理RegExp类型
 * @param {*} target
 */
function cloneRegExp(target) {
  const regFlags = /\w*$/;
  const result = new target.constructor(target.source, regFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

/**
 * 克隆函数
 * @param {*} target
 */
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

/**
 * 克隆其他类型
 * 处理不可遍历类型
 * @param {*} target
 */
function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);

    case regexpTag:
      return cloneRegExp(target);

    case symbolTag:
      return cloneSymbol(target);

    case funcTag:
      return cloneFunction(target);

    default:
      return null;
  }
}

/**
 * 最终版本, 处理不用类型的引用类型
 * @param {*} target
 * @param {*} map
 */
function cloneDeep(target, map = new WeakMap()) {
  /**判断是否为对象 */
  if (!isObject(target)) return target;

  /**获取目标对象类型 */
  const type = check(target);

  /**初始化 */
  let clone;
  if (deepTags.includes(type)) {
    clone = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  /**防止循环引用 */
  if (map.has(target)) return map.get(target);
  map.set(target, clone);

  /**处理set */
  if (type === setTag) {
    target.forEach((value) => {
      clone.add(cloneDeep(value, map));
    });
    return clone;
  }

  /**处理map */
  if (type === mapTag) {
    target.forEach((value, key) => {
      clone.set(key, cloneDeep(value, map));
    });
    return clone;
  }

  /**处理对象和数组 */
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) key = value;
    clone[key] = cloneDeep(target[key], map);
  });

  return clone;
}

module.exports = {
  cloneDeep1,
  cloneDeep2,
  cloneDeep3,
  cloneDeep4,
  cloneDeep,
};
