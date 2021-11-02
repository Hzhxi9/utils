/**
 * 局部引入第三方UI框架优化
 */

/** 每次只需要在这添加组件即可 */
import { Button, Select } from 'element-ui';

const components = { Button, Select };

function install(Vue) {
  Object.keys(components).forEach(key => Vue.use(components[key]));
}

export default { install };

/**
 * main.js
 * import uIcompontents from "./uIcompontents.js";
 * Vue.use(uIcompontents);
 */
