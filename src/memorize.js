/**
 * 高阶函数实现缓存(备忘录模式)
 * @param {*} fn
 * @returns
 */
const memorize = function (fn) {
  /**
   * 创建一个对象存储输入的参数
   * 再次调用是相同的参数, 那就比较一下对象的属性, 把值从这个对象里面取出来
   */
  const cache = Object.create(null);
  return function (...args) {
    /**
     * 用JSON.stringify把传给 adder 函数的参数变成了字符串
     */
    const _args = JSON.stringify(args);
    /**
     * 它当做 cache 的 key，将 add 函数运行的结果当做 value 传到了 cache 里面，
     * 这样 memorize 的匿名函数运行的时候会返回cache[_args]，
     * 如果cache[_args]不存在的话就返回fn.apply(fn,args)，把fn.apply(fn, arguments)赋值给cache[_args]并返回。
     */
    return cache[_args] || (cache[_args] = fn.apply(fn, args));
  };
};

/**
 * 记忆对象
 */
const memoization = (fn) =>
  new Proxy(fn, {
    cache: new Map(),
    apply(target, thisArgs, argsList) {
      const cacheKey = argsList.toString();
      if (!this.cache.has(cacheKey)) {
        this.cache.set(cacheKey, target.apply(thisArgs, argsList));
      }
      return this.cache.get(cacheKey);
    },
  });


/**
 * example
 */
const fibonacci = (n) => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoization(fibonacci);

for (let i = 0; i < 100; i++) fibonacci(30); // ~5000ms
for (let i = 0; i < 100; i++) memoizedFibonacci(30);
