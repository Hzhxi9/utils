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
        /**判断数组之间, 长度相等且每一项都相等 */
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
      } else if (a instanceof Date && b instanceof Date) {
        /**判断Date对象之间 */
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        /**判断普通对象之间 */
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        /**两者的属性列表相同，且每个属性对应的值也相等 */
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
  } else if(!isObjectA && !isObjectB){
    /**如果a和b都不是对象，则转成String来比较字符串 */
    return String(a) === String(b)
  } else {
    return false
  }
}
