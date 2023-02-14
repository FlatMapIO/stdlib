import {vega, vegalite, vegaliteApi} from "./dependencies.js";
import {require} from "d3-require";
export async function vl(require: require): Promise<unknown> {
  const [v, vl, api] = await Promise.all(
    [vega, vegalite, vegaliteApi].map((d) => require(d.resolve())),
  );
  return api.register(v, vl);
}
