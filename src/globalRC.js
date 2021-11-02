/**
 * 自动注册组件
 * 1. 创建一个名为globalRC.js文件，假设我们这里与组件平级，即存放在组件文件夹中。
 * 2. 在main.js文件中引入。
 * 3. 在模板直接使用
 */
import Vue from 'vue';

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *  1. './' 表示操作对象为当前目录
 *  2. require.context是webpack的一个API，所以，需要基于webpack环境才可以使用。
 */
const requireComponent = require.context('./', false, /\.vue$/);

requireComponent.keys().forEach(element => {
  const config = requireComponent(element);

  const componentName = changeStr(element.replace(/^\.\//, '').replace(/\.\w+$/));

  Vue.component(componentName, config.default || config);
});
