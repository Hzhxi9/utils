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

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

const bind = Function.prototype.bind ? nativeBind : polyfillBind;

export default bind;
