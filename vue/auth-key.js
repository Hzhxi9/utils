/**
 * 权限自定义指令
 * 1. 首先，可以在入口文件main.js文件中。
 * 2. 在页面中使用: <button v-auth-key="8">btn</button> 
 */

import Vue from 'vue';
import App from './App.vue';

function checkArray(key) {
  const arr = [1, 2, 3, 4];
  const idx = arr.indexOf(key);
  if (~idx) return true;
  else return false;
}

Vue.directive('auth-key', {
  inserted(el, binding) {
    const displayKey = binding.value;
    if (displayKey) {
      const hasPermission = checkArray(displayKey);
      if (hasPermission) el.parentNode && el.parentNode.removeChild(el);
      else throw new Error('needed key');
    }
  },
});

new Vue({ render: h => h(App) }).$mount('#app');
