export function delay<T = any>(duration: number, value: T): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, duration);
  });
}
