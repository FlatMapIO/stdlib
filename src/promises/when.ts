const timeouts = new Map<number, any>();

function timeout<T>(now: number, time: number) {
  var t = new Promise(function (resolve) {
    timeouts.delete(time);
    var delay = time - now;
    if (!(delay > 0)) throw new Error("invalid time");
    if (delay > 0x7fffffff) throw new Error("too long to wait");
    setTimeout(resolve, delay);
  });
  timeouts.set(time, t);
  return t;
}

export function when<T>(time: number, value: T) {
  let now;
  return (now = timeouts.get((time = +time)))
    ? now.then(() => value)
    : (now = Date.now()) >= time
    ? Promise.resolve(value)
    : timeout(now, time).then(() => value);
}
