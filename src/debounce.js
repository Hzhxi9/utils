/**
 * 防抖
 * 触发高频繁事件N秒后之后执行一次, 如果N秒内时间再次触发,则会重新计时
 *
 * 应用场景
 *  - 按钮提交: 防止多次提交按钮, 只执行最后提交的一次
 *  - 服务端验证场景: 表单验证需要服务端配合, 只执行一段连续的输入事件的最后一次
 *  - 搜索联想词
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export default function debounce(fn, delay) {
  let timer = null;
  return function () {
    const ctx = this;
    /**
     * 此时存在定时器, 则取消之前的定时器重新计时
     */
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    /**
     * 设置定时器, 使事件间隔指定事件后执行
     */
    timer = setTimeout(function () {
      fn.call(ctx, ...arguments);
    }, delay);
  };
}
