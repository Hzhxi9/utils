/**
 * 连字符转驼峰
 */
const camelizeRE = /-(\w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 首字母转大写
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 驼峰转连字符
 */
const hyphenateRE = /\B([A-Z])/g;
export function hyphenate(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase()
}
