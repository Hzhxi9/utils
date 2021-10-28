/**
 * TODO
 * 在目标对象寻找连续点符号的key属性
 * @param {*} from
 * @param  {...any} selector
 * @returns
 */
export default function get(from, ...selector) {
  return [...selector].map(s => {
    return s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((acc, cur) => acc && acc[cur], from);
  });
}

/**
 * 在目标对象寻找连续点符号的key属性
 * @param {*} target 
 * @param {*} key 
 * @returns 
 */
export function lookup(target, key) {
  if (~key.indexOf('.') && key !== '.') {
    /**存在点符号且不为自身 */
    const keys = key.split('.');
    /**设置临时变量, 用于周转, 一层层寻找下去 */
    let temp = target;
    /**每次找一层, 就把它设置为新的临时变量 */
    for (let i = 0, len = keys.length; i < len; i++) temp = temp[keys[i]];
    return temp;
  } else {
    /**没有符号直接返回 */
    return target[key];
  }
}
