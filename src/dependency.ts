export function dependency(name: string, version: string, main: string) {
  return {
    resolve(path = main) {
      return `${name}@${version}/${path}`;
    },
  };
}
