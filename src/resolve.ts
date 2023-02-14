export function resolve(name: string, base: string) {
  if (/^(\w+:)|\/\//i.test(name)) return name;
  if (/^[.]{0,2}\//i.test(name))
    return new URL(
      name,
      // @ts-ignore
      base == null ? location : base,
    ).href;
  if (!name.length || /^[\s._]/.test(name) || /\s$/.test(name))
    throw new Error("illegal name");
  return "https://unpkg.com/" + name;
}
