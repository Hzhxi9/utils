const Typeof = require('./typeof');

/**
 * 解码 url
 * @param {string} url
 * @returns
 */
function encode(url) {
  return encodeURIComponent(url)
    .replace(/%3A/gi, ':')
    .replace(/%24/gi, '$')
    .replace(/%2c/gi, ',')
    .replace(/%20/gi, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

/**
 * 拼接 url
 *  - 参数为普通参数 => /api/handleRequestURL/get?a=1&b=2
 *  - 参数为数组 => /api/handleRequestURL/get?foo[]=bar&foo[]=baz
 *  - 参数为对象 => /api/handleRequestURL/get?foo=%7B%22bar%22:%22baz%22%7D, foo 后面拼接的是{ "bar": "baz" }encode后的结果
 *  - 参数为Date => /api/handleRequestURL/get?get?date=2019-07-24T04:46:41.05190Z
 *  - 参数包含特殊字符 => /api/handleRequestURL/get?foo=@:$+, 空格会被转换为 +
 *  - 参数为null或者undefined => /api/handleRequestURL/get?foo=bar, 对于值为 null 或者 undefined 的属性，会被丢弃
 *  - 参数存在哈希#标记 => /api/handleRequestURL/get, 当原始url存在哈希标记(#)时, 所携带的所有参数params会被忽略, 并且请求的url不包含#之后的东西
 *  - 参数已存在参数 === /api/handleRequestURL/get?foo=bar&bar=baz,会把携带的参数拼接到已存在参数的后面。
 *
 * @param {string} url 请求链接
 * @param {Object} params 请求参数
 * @param {Function} paramsSerializer 规范化函数
 */
export function buildURL(url, params, paramsSerializer) {
  /**不存在params直接返回url */
  if (!params) return url;

  if (url.includes('#')) {
    /**参数存在哈希#标记 */
    const hasHashIndex = url.indexOf('#');
    url = url.slice(0, hasHashIndex);
    return url;
  }

  let serializeParams;

  if (paramsSerializer) {
    /**
     * 传入序列化函数
     * 类似qs.stringify(params, {indices: false})
     */
    serializeParams = paramsSerializer(params);
  } else if (Typeof.isURLSearchParams(params)) {
    /**
     * 符合isURLSearchParams, 直接返回字符串
     */
    serializeParams = params.toString();
  } else {
    /**
     * 定义键值对数组, 用于最后拼接url, 将params中的键值对进行处理最终放入parts中
     * parts最后处理为['key=value', 'a=1', ...]
     */
    const parts = [];

    /**遍历params所有键值对 */
    const keys = Object.keys(params);
    keys.forEach((key) => {
      let value = params[key];
      /**如果有undefined || null, 不进行处理, 直接跳出循环 */
      if (value === null || typeof value === 'undefined') return;

      let values = [];

      if (Array.isArray(value)) {
        /**如果值为数组, 则将该值赋给临时遍历values, 用于下面遍历处理 */
        values = value;
        key += '[]';
      } else {
        /**如果不是数组, 则强行改造为数组处理 */
        values = [value];
      }

      values.forEach((value) => {
        if (Typeof.isDate(value)) value = value.toISOString();
        else if (Typeof.isObject(value)) value = JSON.stringify(value);
        parts.push(`${encode(key)}=${encode(value)}`);
      });
    });

    /**用&分割输出 */
    serializeParams = parts.join('&');
  }

  /**
   * 判断原始url是否有已存在的参数, 即判断是否有?
   * 有则将处理后的键值对用&拼接在url后面
   * 没有则将处理后的键值对用?拼接在url后面
   */
  if (serializeParams) url += (~url.indexOf('?') ? '&' : '?') + serializeParams;

  return url;
}

/**
 * 解析URL参数
 * @param {string} url
 */
export function parserParams(url) {
  /**匹配?之后的字符串 */
  const reg = /.+\?(.+)/;

  /**获取匹配第一个捕获的组 */
  const paramsString = reg.test(url) && reg.exec(url)[1];

  /**分割& */
  const paramsArray = paramsString && paramsString.split('&');

  if (paramsArray && paramsArray.length) {
    const params = {};
    paramsArray.forEach((param) => {
      if (/=/.test(param)) {
        let [key, value] = param.split('=');

        /**解码 */
        value = decodeURIComponent(value);

        /**处理纯数字 */
        value = /\d+/.test(value) ? parseFloat(value) : value;

        if (params.hasOwnProperty(key))
          params[key] = [].concat(params[key], value) /**存在key, 处理成数组 */;
        else params[key] = value /**不存在, 直接赋值 */;
      } else {
        params[param] = true;
      }
    });
    return params;
  }
}
