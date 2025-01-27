import {that} from "../that";

export function disposable<T = unknown>(value: T, dispose: (value: T) => void) {
  let done = false;
  if (typeof dispose !== "function") {
    throw new Error("dispose is not a function");
  }
  return {
    [Symbol.iterator]: that,
    next: () => (done ? {done: true} : ((done = true), {done: false, value})),
    return: () => ((done = true), dispose(value), {done: true}),
    throw: () => ({done: (done = true)}),
  };
}
