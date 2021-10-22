/**
 * 事件总线(发布订阅模式)
 * 一处更改, 触发多次事件响应
 */
export default class EventEmitter {
  constructor() {
    /**创建缓存对象 */
    this.cache = {};
  }

  /**
   * 注册事件
   * @param {*} name 事件名
   * @param {*} fn 事件函数
   */
  on(name, fn) {
    if (this.cache[name]) {
      /**添加缓存 */
      this.cache[name].push(fn);
    } else {
      /**包装成数组, 存入缓存 */
      this.cache[name] = [fn];
    }
  }

  /**
   * 删除事件
   * @param {*} name 事件名
   * @param {*} fn 函数
   */
  off(name, fn) {
    /**拷贝当前缓存 */
    const tasks = this.cache[name];
    if (tasks) {
      /**获取索引 */
      const idx = tasks.findIndex((f) => f === fn || f.callback === fn);
      /**存在并删除 */
      if (~idx) tasks.splice(idx, 1);
    }
  }

  /**
   * 触发事件
   * @param {*} name 事件名
   * @param {*} once 是否触发一次
   * @param  {...any} args 不定参数
   */
  emit(name, once = false, ...args) {
    /**拷贝当前事件缓存 */
    const tasks = this.cache[name].slice();
    if (tasks) {
      /*循环并触发 */
      for (const fn of tasks) fn(...args);
    }
    /**只调用一次, 就删除该属性 */
    once && delete this.cache[name];
  }
}
