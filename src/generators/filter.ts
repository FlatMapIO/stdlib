export function* filter<T>(
  iterator: Iterator<T, any, T>,
  test: (v: T, i: number) => boolean,
) {
  let result: IteratorResult<T, T>,
    index = -1;
  while (!(result = iterator.next()).done) {
    if (test(result.value, ++index)) {
      yield result.value;
    }
  }
}
