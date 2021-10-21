import { isObject } from '../src/typeof';

/**
 * 检查两个对象或者数组是否相同
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export default function looseEqual(a, b) {
  if (a === b) return true;

  const isObjectA = isObject(a);
  const isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every((key) => looseEqual(a[key], b[key]))
        );
      } else {
        return false;
      }
    } catch (error) {
        return false;
    }
  }
}
