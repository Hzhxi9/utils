/**
 * old a b c d e f g
 * new a b e d c h f g
 * @param {*} c1
 * @param {*} c2
 * @param {*} param2 {mountElement: 挂在新元素, patch: 复用老元素, unmount: 卸载老元素, move: 移动元素}
 */

function diffArray(c1, c2, { mountElement, patch, unmount, move }) {
  function isSameVNodeType(n1, n2) {
    return n1.key === n2.key;
  }

  let i = 0;
  const l2 = c2.length,
    l1 = c1.length;
  /**
   * e1: 最后一个老节点的下标
   * e2: 最后一个新节点的下标
   */
  let e1 = l1 - 1,
    e2 = l2 - 1;

  /**右边 */

  /**老节点没有了 */
  if (i > e1) {
    if (i <= e2) {
      while (i <= e2) {
        const n2 = c2[i];
        mountElement(n2.key);
        i++;
      }
    }
  } 
  /**新节点没有了 */
  else if (i > e2) {
    /**老节点还有 */
    
  }
  /**新老节点都还有, 新增、删除、移动 */
  else {

  }
}

export default diffArray;
