/**
 * 获取文字宽度
 * @param {*} text
 * @param {*} fontStyle
 * @returns
 */
function getTextWith(text, fontStyle) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = fontStyle || '16px'; // 设置字体样式，当然，也可以在这里给一个默认值
  var dimension = context.measureText(text);
  return dimension.width;
}

/**
 * 获取文字高度
 * @param {*} text 
 * @param {*} font 
 * @param {*} size 
 * @returns 
 */
function getTextHeight (text ,font, size) {
    var span = document.createElement('span');
    span.style['fontFamily'] = font;
    span.style['fontSize'] = size;
    span.innerHTML = text;
    var block = document.createElement('div');
    block.style.display = 'inline-block';
    block.style.width = '1px';
    block.style.height = '0px';
    var div = document.createElement('div');
    div.appendChild(span);
    div.appendChild(block);
    document.body.appendChild(div);
    var height = 0;
    try {
      block.style.verticalAlign = 'bottom';
      height = block.offsetTop - span.offsetTop;
    } finally {
      div.remove();
    }
    return height;
  };

// let metrics = ctx.measureText(text);
// let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
// // 所有字在这个字体下的高度
// let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
// // 当前文本字符串在这个字体下用的实际高度

// const fix = ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent;
// ctx.fillText(text, width / 2, height / 2  + fix/ 2);
