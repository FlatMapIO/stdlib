import {leaflet as ll} from "./dependencies.js";

import type {Require} from "d3-require";
export async function leaflet(require: Require) {
  const L = await require(ll.resolve());
  if (!L._style) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = await require.resolve(ll.resolve("dist/leaflet.css"));
    L._style = document.head.appendChild(link);
  }
  return L;
}
