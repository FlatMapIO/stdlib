export function isArqueroTable(value: any): boolean {
  // Arquero tables have a `toArrowBuffer` function
  return value && typeof value.toArrowBuffer === "function";
}
