import {when} from "./when";

export function tick(duration, value) {
  return when(Math.ceil((Date.now() + 1) / duration) * duration, value);
}
