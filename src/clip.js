/**
 * 复制到剪贴板
 * @param {*} str 
 */
const clip = str => {
  const element = document.createElement('textarea');
  element.value = str;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';

  document.body.appendChild(element);

  /**
   * document.getSelection(): 获得页面中选中信息
   * document.getSelection().rangeCount: 返回选区(selection)中range对象数量的只读属性
   * getRangeAt(): 获取选择对象的文字内容
   */
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

  element.select();

  document.execCommand('copy');
  document.body.removeChild(element);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addAllRanges(selected);
  }
};
