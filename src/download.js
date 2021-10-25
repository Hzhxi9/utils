/**
 * 图片下载
 * @param {*} imageUrl 图片地址
 * @param {*} name 图片名
 * @param {*} callback
 */
export function downloadImage(imageUrl, name, callback) {
  const image = new Image();
  /**解决跨域 Canvas 污染问题 */
  image.setAttribute('crossOrigin', 'anonymous');

  image.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    /**得到图片的base64编码数据 */
    const url = canvas.toDataURL('image/png');

    /**生成一个a元素 */
    const a = document.createElement('a');
    /**创建一个单击事件 */
    const event = new MouseEvent('click');
    /**设置图片名称 */
    a.download = name || 'photo';
    /**将生成的URL设置a.href属性 */
    a.href = url;
    /**触发a的单击事件 */
    a.dispatchEvent(event);
    callback && callback();
  };

  image.src = imageUrl;
}

/**
 * 文件下载(支持任何文件类型)
 * @param {*} url
 * @param {*} name
 * @param {*} callback
 */
export function downloadFile(url, name, callback) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
        /**将链接地址字符内容转变为blob地址 */
        const link = document.createElement('a');
        const event = new MouseEvent('click');

        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.dispatchEvent(event);
        
        callback && callback();
    });
}
