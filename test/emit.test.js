import EventEmitter from '../src/emit';

test.skip('use EventEmitter', () => {
  const bus = new EventEmitter();
  const fn1 = function (name, age) {
    console.log(`${name} ${age}`)
  };
  const fn2 = function (name, age) {
    console.log(`hello ${name} ${age}`)
  };
  bus.on('func', fn1);
  bus.on('func', fn2);

  bus.emit('func', false, 'world', 12);

  
});
