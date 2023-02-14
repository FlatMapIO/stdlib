export function context2d(width: number, height: number, dpi: number | null) {
  if (dpi == null) dpi = devicePixelRatio;
  let canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  let context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}
