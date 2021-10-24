import { requestQueue } from '../src/request';

describe('requestQueue', () => {
  function fn1() {
    setTimeout(() => {
      console.log('request 1');
    }, 3000);
  }

  function fn2() {
    setTimeout(() => {
      console.log('request 2');
    }, 1000);
  }
  function fn3() {
    setTimeout(() => {
      console.log('request 3');
    }, 2000);
  }
  test('use requestQueue', () => {
    
    requestQueue([fn3, fn1 ,fn1], 3, (value, idx) => {
        console(value, idx)
    })
  })
});
