# tsl-react

[![Version](https://img.shields.io/npm/v/tsl-react?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/tsl-react)

- [Installation](#installation)
- [Enabling rules](#enabling-rules)
- [Specifying project-aware React configuration](#specifying-project-aware-react-configuration-tbd)
- [Roadmap](#roadmap)
  - [Port Local](#port-local)
  - [Port Utility](#port-utility)
  - [Port Core & Shared](#port-core--shared)
  - [Port ESLint Plugins](#port-eslint-plugins)
  - [Port ESLint Rules](#port-eslint-rules)
- [License](#license)
- [Acknowledgements](#acknowledgements)

(WIP) Bring the same linting functionality that [`eslint-react.xyz`](https://eslint-react.xyz) has to the TypeScript LSP.

This package provides the rulesets from [`beta.eslint-react.xyz/docs/rules/overview`](https://beta.eslint-react.xyz/docs/rules/overview) as custom rules for the [ArnaudBarre/tsl](https://github.com/ArnaudBarre/tsl) linting tool.

## Installation

```bash
pnpm add -D tsl tsl-react
```

Then follow the [installation guide](https://github.com/ArnaudBarre/tsl?tab=readme-ov-file#installation) for tsl.

## Enabling rules

```diff
// tsl.config.ts
import { core, defineConfig } from "tsl";
+ import * as react from "tsl-react";

export default defineConfig({
  rules: [
    ...core.all(),
+    react.noLeakedConditionalRendering(),
  ],
});
```

## Specifying project-aware React configuration (TBD)

In your `tsconfig.json` or `jsconfig.json` add the following:

```diff
{
  "compilerOptions": {
+    "jsx": "react-jsx",
    "plugins": [{ "name": "tsl/plugin" }],
  },
+  "react": {
+    "version": "19.1.0" // or "detect" to automatically detect the version
+    // other options can be added here
+  }
}
```

## Roadmap

### Port Local

- [x] `.pkgs/configs` to `.pkgs/configs`
- [x] `.pkgs/eslint-plugin-local` to `.pkgs/tsl-local`

### Port Utility

- [x] `@eslint-react/eff` to `@react-analyzer/eff`
- [ ] `@eslint-react/ast` to `@react-analyzer/ast`
- [ ] `@eslint-react/var` to `@react-analyzer/var`

### Port Core & Shared

- [ ] `@eslint-react/core` to `@react-analyzer/core`
- [ ] `@eslint-react/shared` to `@react-analyzer/shared`

### Port ESLint Plugins

- [x] `@eslint-react/eslint-plugin` to `tsl-react`
- [ ] `eslint-plugin-react-x` to `tsl-react-x`
- [ ] `eslint-plugin-react-dom` to `tsl-react-dom`
- [ ] `eslint-plugin-react-web-api` to `tsl-react-web-api`
- [ ] `eslint-plugin-react-hooks-extra` to `tsl-react-hooks-extra`
- [ ] `eslint-plugin-react-naming-convention` to `tsl-react-naming-convention`

### Port ESLint Rules

- [x] `noLeakedConditionalRendering`: Prevents problematic leaked values from being rendered.
- [ ] ...

## License

This project is licensed under the [MIT License](./LICENSE).

## Acknowledgements

We extend our gratitude to:

- **[ArnaudBarre/tsl](https://github.com/ArnaudBarre/tsl)** for the core and AST type rewrite, which significantly streamlined custom rules development within TypeScript Language Service Plugin.
- **[johnsoncodehk/tsslint](https://github.com/johnsoncodehk/tsslint)** for their early explorations of exposing the TypeScript Language Server diagnostic interface.
- **[typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)** for providing the foundation where these custom rules were initially developed and tested.
- **[Effect-TS/language-service](https://github.com/Effect-TS/language-service)** for inspiring the creation of [`typescriptreact-language-service`](https://github.com/react-analyzer/tsl/commit/01ab1d8d954d555bff65246c61af8c1028be78f1#diff-b335630551682c19a781afebcf4d07bf978fb1f8ac04c6bf87428ed5106870f5) (now [`tsl-react`](https://github.com/react-analyzer/tsl)).
