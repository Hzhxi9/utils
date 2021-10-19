const deepCopyFun = require('../src/cloneDeep');

test('深拷贝版本1', () => {
  const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
      child: 'child',
      child2: {
        child2: 'child2',
      },
    },
    field5: [1, 2],
  };
  expect(deepCopyFun.cloneDeep1(target)).toEqual(target);
});

test.skip('深拷贝版本2', () => {
  const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
      child: 'child',
      child2: {
        child2: 'child2',
      },
    },
    field5: [1, 2],
  };
  target.target = target;
  expect(deepCopyFun.cloneDeep2(target)).toEqual(target);
});

test('深拷贝版本3', () => {
  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    f: {
      f: {
        f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } },
      },
    },
  };

  // target.target =  target
  expect(deepCopyFun.cloneDeep3(target)).toEqual(target);
});
