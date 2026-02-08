import type { UserConfig } from "tsdown";

export default {
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["tsl", "typescript"],
  inlineOnly: ["@local/eff"],
  format: ["esm"],
  minify: false,
  outDir: "dist",
  platform: "node",
  sourcemap: false,
  target: "node24",
  treeshake: true,
  fixedExtension: false,
} satisfies UserConfig;
