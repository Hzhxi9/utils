/**
 * 手写bind函数
 *
 * bind 函数的核心作用: 绑定this、初始化参数
 * @see https://blog.csdn.net/yexudengzhidao/article/details/98594866
 * @param {*} ctx 当使用new 操作符调用绑定函数时，该参数无效。 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 */
export function bindFunc(ctx) {
  const that = this;

  /**调用bind时传入的初始化参数（剔除了第一个参数ctx） */
  const args = Array.prototype.slice.call(arguments, 1);

  /**
   * 定义一个空的function Func
   * 通过Func来传递原型对象给f(通过实例化的方式)
   *
   * 这时修改f的prototype对象, 就不会影响到that的prototype对象
   * 而且Func是空对象, 所以几乎不占内存
   */
  function Func() {}

  function f() {
    const thisArgs = Array.prototype.slice.call(arguments);

    return that.apply(
      /**
       * 1. 绑定this指向, 通过将调用bind时的this(that)指向ctx来完成
       * 2. 检测是否是否使用new创建
       */
      this instanceof Func ? this : ctx,
      /**
       * 将args与绑定函数执行时的实参arguments通过concat连起来作为参数传入实现bind函数初始化参数的效果
       **/
      args.concat(thisArgs)
    );
  }

  /**维护原型关系 */
  Func.prototype = this.prototype;
  f.prototype = new Func();

  return f;
}

/**
 * 兼容bind
 * @param {*} fn
 * @param {*} ctx
 * @returns
 */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    const len = arguments.length;
    return len
      ? len > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

/**
 * 原生自带bind函数
 * @param {*} fn
 * @param {*} ctx
 * @returns
 */
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

const bind = Function.prototype.bind ? nativeBind : polyfillBind;

export default bind;
