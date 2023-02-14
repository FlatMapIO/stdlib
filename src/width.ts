import {observe} from "./generators/observe.js";

export function width() {
  return observe<number>(function (change) {
    let width = change(document.body.clientWidth);
    function resized() {
      let w = document.body.clientWidth;
      if (w !== width) change((width = w));
    }
    window.addEventListener("resize", resized);
    return function () {
      window.removeEventListener("resize", resized);
    };
  });
}
