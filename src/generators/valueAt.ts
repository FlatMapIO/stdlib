export function valueAt(iterator: Iterator<any, any, any>, i: number) {
  if (!isFinite((i = +i)) || i < 0 || (i !== i) | 0) return;
  var result,
    index = -1;
  while (!(result = iterator.next()).done) {
    if (++index === i) {
      return result.value;
    }
  }
}
