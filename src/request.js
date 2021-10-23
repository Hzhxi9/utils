/**
 * 多次请求定序执行
 * @param {*} queue
 * @param {number} maxRequest 控制同时进行的请求数量
 * @param {*} callback 请求在callback中发起，无论成功与否都返回 Promise.resolve()
 */
export function requestQueue(queue, maxRequest = 3, callback) {
  return new Promise((resolve) => {
    let currentRequest = 0,
      allRequestTimes = 0,
      requestLen = queue.length;

    queue.forEach((item, idx) => {
      const timer = async () => {
        if (currentRequest < maxRequest) {
          /**当前请求数此时递增 */
          currentRequest++;
          /**触发回调函数 */
          callback(item, idx).finally(() => {
            currentRequest--;
            allRequestTimes++;
            if (allRequestTimes >= requestLen) resolve();
          });
        } else {
          await new Promise((resolve) => setTimeout(() => resolve(), 80));
          timer();
        }
        timer();
      };
    });
  });
}
