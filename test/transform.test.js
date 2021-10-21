import { camelize, capitalize, hyphenate } from '../src/transform';

test('use camlize', () => {
  expect(camelize('v-model')).toBe('vModel');
});

test('use capitalize', () => {
  expect(capitalize('abc')).toBe('Abc')
})

test('use hyphenate', () => {
  expect(hyphenate('aBc')).toBe('a-bc')
})