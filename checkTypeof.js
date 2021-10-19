 /**
  * 检查数据类型
  * @param {*} target 
  * @returns {string} 
  */
 const checkTypeof = (target) => Object.prototype.toString(target).slice(8, -1).toLowerCase()

 export default checkTypeof