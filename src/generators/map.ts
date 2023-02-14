export function* map(
  iterator: Iterator<any, any, any>,
  transform: (v: any, i: number) => any,
) {
  var result,
    index = -1;
  while (!(result = iterator.next()).done) {
    yield transform(result.value, ++index);
  }
}
