const { forin } = require('./forEach');
const { isPlainObject } = require('./typeof');

/**
 * 合并对象属性, 相同属性后面替换前面
 * @param  {...any} args
 */
export default function merge(...args) {
  const result = Object.create(null);

  function assignValue(value, key) {
    if (isPlainObject(result[key]) && isPlainObject(value)) {
      /**
       *  当result[key] 为对象, value 也为对象, 深拷贝
       */
      result[key] = merge(result[key], value);
    } else if (isPlainObject(value)) {
      /**
       *  属性是对象时, 深拷贝该属性值
       */
      result[key] = merge({}, value);
    } else if (Array.isArray(value)) {
      /**
       *  属性是数组时, 复制数组给result[key]
       */
      result[key] = value.slice();
    } else {
      /**
       *  属性是原始值时
       */
      result[key] = value;
    }
  }

  for (let i = 0, len = args.length; i < len; i++) {
    forin(args[i], assignValue);
  }

  return result;
}
