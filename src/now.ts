export function* now(): Generator<number,number> {
  while (true) {
    yield Date.now();
  }
}