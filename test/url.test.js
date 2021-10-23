import { buildURL } from '../src/url';

describe('test buildURL', () => {
  const url = 'https://www.baidu.com/api';
  
  test('common', () => {
    expect(buildURL(url, { a: 1, b: 2 })).toBe(url + '?a=1&b=2');
  });

  test('array', () => {
    expect(buildURL(url, { foo: ['bar', 'baz'] })).toBe(
      url + '?foo[]=bar&foo[]=baz'
    );
  });

  test('object', () => {
    expect(buildURL(url, { foo: { bar: 'baz' } })).toBe(
      url + '?foo=%7B%22bar%22:%22baz%22%7D'
    );
  });

  test('Date', () => {
    expect(buildURL(url, { date: new Date() })).toBe(
      url + '?date=' + (new Date()).toISOString()
    );
  });

  test('null || undefined', () => {
    expect(buildURL(url, { data: undefined })).toBe(url);
  });

  test('hash', () => {
    expect(buildURL(url + '/#/', { data: 'hash' })).toBe(url + '/');
  });

  test('has', () => {
      expect(buildURL(url+'?foo=bar', {foo: 'baz'})).toBe(url + '?foo=bar&foo=baz')
  })
});
