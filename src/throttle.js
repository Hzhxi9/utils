/**
 * 节流
 * 触发高频事件, 且n秒内只执行一次
 *
 * 应用场景
 *  - 拖拽事件: 固定时间内执行一次, 防止超高频次触发位置变动
 *  - 缩放事件: 监控浏览器resize
 *  - 动画场景: 避免短时间内多次触发动画引起性能问题
 *  - 滚动事件: 通过事件节流来降低事件调用频率
 * @param {*} fn
 * @param {number} delay
 */
export default function throttle(fn, delay) {
  /**时间戳版本 */
  let pre = Date.now();
  return function () {
    const ctx = this,
      now = Date.now();

    /**如果两次时间间隔超过指定时间, 则执行函数 */
    if (now - pre > delay) {
      pre = Date.now();
      return fn.call(ctx, ...arguments);
    }
  };
}

export function throttle(fn, delay) {
  /**定时器版本 */
  let timer = null;
  return function () {
    const ctx = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(ctx, ...arguments);
        timer = null;
      }, delay);
    }
  };
}
