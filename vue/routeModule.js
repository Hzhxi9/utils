/**
 * 自动注册路由
 * 1. 在路由文件夹下，这里假设是名为router文件夹下，创建一个routeModule.js文件
 * 2. 我们只需要创建对应的路由文件，如：login.module.js
 * 3. 在路由配置文件index.js中引入routeModule.js文件
 */
const routerList = [];

function importAll(r) {
  r.keys().forEach(element => {
    routerList.push(r(element).default);
  });
}

/**
 * 1. 这里自定义为.module.js 结尾的文件
 * 2. require.context是webpack的一个API，所以，需要基于webpack环境才可以使用。
 */
importAll(require.context('./', true, /\.module\.js/));

export default routerList;
