/**
 * 扩展对象
 * 将form里面的属性和方法 继承到 to中
 * 并且将form里面的方法的执行上下文都绑定到thisArg
 * @param {*} to 
 * @param {*} form 
 * @returns 
 */
export default function extend(to, form) {
  for (const key in form) to[key] = form[key];
  return to;
}
