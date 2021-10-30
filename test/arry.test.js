import * as ArrayMethods from '../src/array';

describe('arrayWithoutDuplicate', () => {
  test('test arrayWithoutDuplicate', () => {
    const fruits = ['apple', 'mango', 'orange', 'apple', 'pineapple', 'pineapple', 'peach', 'mango'];
    expect(ArrayMethods.arrayWithoutDuplicate(fruits)).toEqual(['apple', 'mango', 'orange', 'pineapple', 'peach']);
  });
});

describe('arrayObjectWithoutDuplicate', () => {
  test('', () => {
    const fruits = [
      { name: 'Grapes', quantity: 2 },
      { name: 'Bananas', quantity: 5 },
      { name: 'Apples', quantity: 10 },
      { name: 'Grapes', quantity: 4 },
      { name: 'Grapes', quantity: 6 },
    ];
    // expect(ArrayMethods.arrayObjectWithoutDuplicate(fruits, 'name')).toEqual([
    //   { name: 'Grapes', quantity: 2 },
    //   { name: 'Bananas', quantity: 5 },
    //   { name: 'Apples', quantity: 10 },
    // ]);

    // expect(ArrayMethods.arrayRemoveObjEle(fruits, 'name', 'Apples')).toEqual([
    //   { name: 'Grapes', quantity: 2 },
    //   { name: 'Bananas', quantity: 5 },
    //   { name: 'Grapes', quantity: 4 },
    //   { name: 'Grapes', quantity: 6 },
    // ]);
  });
});

describe('arrayDiff', () => {
  test('arrayDiff', () => {
    const arr1 = [1, 2, 4, 5, 8];
    const arr2 = [2, 3, 5, 8, 9];
    expect(ArrayMethods.arrayDiff(arr1, arr2)).toEqual([1, 4, 3, 9]);
  });
});

describe('arrSimilarity', () => {
  test('arrSimilarity', () => {
    const arr1 = [1, 2, 4, 5, 8];
    const arr2 = [2, 3, 5, 8, 9];
    expect(ArrayMethods.arraySimilarity(arr1, arr2)).toEqual([2, 5, 8]);
  });
});

describe('getDiffFrom', () => {
  test('getDiffFrom', () => {
    const arr1 = [1, 2, 4, 5, 8];
    const arr2 = [2, 3, 5, 8, 9];
    expect(ArrayMethods.getDiffFrom(arr1, arr2)).toEqual([1, 4]);
  });
});

describe('maxArray', () => {
  test('maxArray', () => {
    const ages = [10, 2, 5, 8, 100, 500, 3, 30, 9];
    expect(ArrayMethods.maxArray(ages, 3)).toEqual([500, 100, 30]);
  });
});

describe('minArray', () => {
  test('minArray', () => {
    const ages = [10, 2, 5, 8, 100, 500, 3, 30, 9];
    expect(ArrayMethods.minArray(ages, 3)).toEqual([2, 3, 5]);
  });
});

describe('findObjectInArray', () => {
  test('findObjectInArray', () => {
    const fruits = [
      { name: 'Bananas', quantity: 5 },
      { name: 'Apples', quantity: 10 },
      { name: 'Grapes', quantity: 2 },
    ];
    expect(ArrayMethods.findObjectInArray(fruits, 'name', 'Apples')).toEqual({ name: 'Apples', quantity: 10 });
  });
});

describe('arrRemoveEle', () => {
  test('arrRemoveEle', () => {
    const ages = [1, 2, 3, 4, 5, 6, 7, 8];
    const names = ['张三', '李四', '王二麻子', '一尾流莺'];
    expect(ArrayMethods.arrayRemoveEle(ages, 3)).toEqual([1, 2, 4, 5, 6, 7, 8]);
    expect(ArrayMethods.arrayRemoveEle(names, '一尾流莺')).toEqual(['张三', '李四', '王二麻子']);
  });
});

describe('arrRemoveEle', () => {
  test('arrRemoveEle', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;
    const fn4 = () => 4;
    const funs = [fn1, fn2, fn3, fn4];
    expect(ArrayMethods.arrRemoveFunEle(funs, 'fn1')).toEqual([fn2, fn3, fn4]);
  });
});
