let count = 0;

export function uid(name: string | null) {
  return new Id("O-" + (name == null ? "" : name + "-") + ++count);
}

class Id {
  readonly href: string;
  constructor(readonly id: string) {
    // @ts-ignore
    this.href = new URL(`#${id}`, location) + "";
  }
  toString() {
    return "url(" + this.href + ")";
  }
}
