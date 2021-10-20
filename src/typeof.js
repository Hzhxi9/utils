/**
 * 检查数据类型
 * @param {*} target
 * @returns {string}
 */
const check = (target) =>
  Object.prototype.toString.call(target).slice(8, -1).toLowerCase();

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

console.log(check(set), '===');

module.exports = check;
