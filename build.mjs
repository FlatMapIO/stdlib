import * as esbuild from "esbuild";

const ctx = await esbuild.context({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "browser",
  format: "esm",
  outdir: "dist",
  // splitting: true,
  minify: process.env.NODE_ENV === "production",
  treeShaking: true,
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
});

if (process.env.NODE_ENV === "development") {
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  const result = await ctx.rebuild();
  if (result.errors.length > 0) {
    console.error(result.errors);
  } else {
    await ctx.dispose();
  }
}
