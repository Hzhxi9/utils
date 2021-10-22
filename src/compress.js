/**
 * 图片压缩方法
 * @param {HTMLImageElement} image 图片对象
 * @param {string} fileType 文件类型
 * @param {number} ratio 图片质量
 * @returns
 */
export function compress(image, fileType, ratio = 0.25) {
  let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    width = image.width,
    height = image.height;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  /**绘制图片 */
  ctx.drawImage(image, 0, 0, width.height);

  /**
   * toDataURL
   * 可以将canvas画布上的信息转换为base64(DataURL)格式的图像信息(纯字符的图片表示形式)
   * @param {string} mimeType 需要转换图像的mimeType类型, 默认值: image/png
   * @param {string} quality 转换的图片质量, 质量 0～1 
   */
  const base64data = canvas.toDataURL(fileType, ratio);
  canvas = ctx = null;

  return base64data;
}
