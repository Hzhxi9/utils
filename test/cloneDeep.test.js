const deepCopyFun = require('../cloneDeep')

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
  expect(deepCopyFun.cloneDeep1(target)).toEqual(target)
});
