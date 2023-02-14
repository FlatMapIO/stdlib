import {that} from "../that";

export function observe<T = unknown>(
  initialize: (change: (x: T) => T) => (() => void) | Promise<void>,
) {
  let stale = false;
  let value;
  let resolve;
  const dispose = initialize(change);

  if (dispose != null && typeof dispose !== "function") {
    throw new Error(
      typeof dispose.then === "function"
        ? "async initializers are not supported"
        : "initializer returned something, but not a dispose function",
    );
  }

  function change(x: T): T {
    if (resolve) resolve(x), (resolve = null);
    else stale = true;
    return (value = x);
  }

  function next(): {done: boolean; value: T | Promise<T>} {
    return {
      done: false,
      value: stale
        ? ((stale = false), Promise.resolve(value))
        : new Promise((_) => (resolve = _)),
    };
  }

  return {
    [Symbol.iterator]: that,
    throw: () => ({done: true}),
    return: () => (
      dispose != null &&
        // @ts-ignore
        dispose(),
      {done: true}
    ),
    next,
  };
}
