import { buildURL, parserParams, getURLParameters, getBaseUrl, urlJoin } from '../src/url';

describe('test buildURL', () => {
  const url = 'https://www.baidu.com/api';

  test('common', () => {
    expect(buildURL(url, { a: 1, b: 2 })).toBe(url + '?a=1&b=2');
  });

  test('array', () => {
    expect(buildURL(url, { foo: ['bar', 'baz'] })).toBe(url + '?foo[]=bar&foo[]=baz');
  });

  test('object', () => {
    expect(buildURL(url, { foo: { bar: 'baz' } })).toBe(url + '?foo=%7B%22bar%22:%22baz%22%7D');
  });

  test('Date', () => {
    const date = new Date();
    expect(buildURL(url, { date: new Date() })).toBe(url + '?date=' + date.toISOString());
  });

  test('null || undefined', () => {
    expect(buildURL(url, { data: undefined })).toBe(url);
  });

  test('hash', () => {
    expect(buildURL(url + '/#/', { data: 'hash' })).toBe(url + '/');
  });

  test('has', () => {
    expect(buildURL(url + '?foo=bar', { foo: 'baz' })).toBe(url + '?foo=bar&foo=baz');
  });
});

describe('parserParams', () => {
  test('parserParams', () => {
    expect(parserParams('https://s.weibo.com/weibo?q=%23%E5%8C%BB%E5%AD%A6%E7%94%9F%E5%90%83%E7%81%AB%E9%94%85%E5%90%8E%E7%BB%99%E8%80%81%E6%9D%BF%E7%95%99%E8%A8%80%E6%A3%80%E6%9F%A5%E8%BA%AB%E4%BD%93%23&Refer=top&Refer=bottom')).toStrictEqual({
      q: '#医学生吃火锅后给老板留言检查身体#',
      Refer: ['top', 'bottom'],
    });
  });
});

describe('getURLParameters', () => {
  test('getURLParameters', () => {
    expect(getURLParameters('http://url.com/page?name=Adam&surname=Smith')).toStrictEqual({ name: 'Adam', surname: 'Smith' });
  });
});

describe('getBaseUrl', () => {
  test('getBaseUrl', () => {
    expect(getBaseUrl('http://url.com/page?name=Adam&surname=Smith')).toBe('http://url.com/page');
  });
});

describe('urlJoin', () => {
  test('urlJoin', () => {
    expect(urlJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo')).toBe('http://www.google.com/a/b/cd?foo=123&bar=foo');
  });
});
