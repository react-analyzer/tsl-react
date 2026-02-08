import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  exports: true,
  fixedExtension: false,
  format: ["esm"],
  minify: false,
  outDir: "dist",
  platform: "neutral",
  target: "es2021",
});
