import type { Options } from "tsup";

export default {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["tsl", "typescript"],
  format: ["esm"],
  minify: false,
  outDir: "dist",
  platform: "node",
  sourcemap: false,

  target: "node20",
  treeshake: true,
} satisfies Options;
