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

test('深拷贝版本4', () => {
  const map = new Map();
  map.set('key', 'value');
  map.set('ConardLi', 'code秘密花园');

  const set = new Set();
  set.add('ConardLi');
  set.add('code秘密花园');

  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
  };

  expect(deepCopyFun.cloneDeep4(target)).toEqual(target);
});

test('深拷贝最终版本', () => {
  const map = new Map();
  map.set('key', 'value');
  map.set('ConardLi', 'code秘密花园');

  const set = new Set();
  set.add('ConardLi');
  set.add('code秘密花园');

  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
      console.log('code秘密花园');
    },
    func2: function (a, b) {
      return a + b;
    },
  };

  console.log(deepCopyFun.cloneDeep(target))

  // expect(deepCopyFun.cloneDeep(target)).toEqual(target);
});
