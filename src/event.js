/**
 * 添加绑定事件, 每一次都要对浏览器进行判断
 * 可以在第一次判断后就保留判断，下一次就不需要判断, 优化性能
 *
 * 使用惰性函数优化添加绑定事件
 *
 * @param {*} dom
 * @param {*} type
 * @param {*} handler
 */
function addEvent(dom, type, handler) {
  if (dom.addEventListener) {
    dom.addEventListener(type, handler, false);

    /**第一次判断后, 之后就不需要再进行判断 */
    addEvent = function (dom, type, handler) {
      dom.addEventListener(type, handler, false);
    };
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, handler);

    addEvent = function (dom, type, handler) {
      dom.attachEvent('on' + type, handler);
    };
  }

  return addEvent;
}