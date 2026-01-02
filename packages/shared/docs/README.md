# @react-analyzer/shared

## Classes

| Class | Description |
| ------ | ------ |
| [IdGenerator](classes/IdGenerator.md) | A generator for unique ids. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AnalyzerOptions](interfaces/AnalyzerOptions.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_ANALYZER\_OPTIONS](variables/DEFAULT_ANALYZER_OPTIONS.md) | - |
| [GITHUB\_URL](variables/GITHUB_URL.md) | The GitHub repository for this project. |
| [NPM\_SCOPE](variables/NPM_SCOPE.md) | The NPM scope for this project. |
| [RE\_ANNOTATION\_JSX](variables/RE_ANNOTATION_JSX.md) | Regular expression for matching a `@jsx` annotation comment. |
| [RE\_ANNOTATION\_JSX\_FRAG](variables/RE_ANNOTATION_JSX_FRAG.md) | Regular expression for matching a `@jsxFrag` annotation comment. |
| [RE\_ANNOTATION\_JSX\_IMPORT\_SOURCE](variables/RE_ANNOTATION_JSX_IMPORT_SOURCE.md) | Regular expression for matching a `@jsxImportSource` annotation comment. |
| [RE\_ANNOTATION\_JSX\_RUNTIME](variables/RE_ANNOTATION_JSX_RUNTIME.md) | Regular expression for matching a `@jsxRuntime` annotation comment. |
| [RE\_CAMEL\_CASE](variables/RE_CAMEL_CASE.md) | Regular expression for matching a camelCase string. |
| [RE\_COMPONENT\_NAME](variables/RE_COMPONENT_NAME.md) | Regular expression for matching a React component name. |
| [RE\_COMPONENT\_NAME\_LOOSE](variables/RE_COMPONENT_NAME_LOOSE.md) | Regular expression for matching a React component name (loose). |
| [RE\_CONSTANT\_CASE](variables/RE_CONSTANT_CASE.md) | Regular expression for matching a CONSTANT_CASE string. |
| [RE\_HOOK\_NAME](variables/RE_HOOK_NAME.md) | Regular expression for matching a React Hook name. |
| [RE\_HTML\_TAG](variables/RE_HTML_TAG.md) | Regular expressions for matching a HTML tag name |
| [RE\_JAVASCRIPT\_PROTOCOL](variables/RE_JAVASCRIPT_PROTOCOL.md) | - |
| [RE\_JS\_EXT](variables/RE_JS_EXT.md) | Regular expression for matching a JavaScript file extension. |
| [RE\_JS\_IDENTIFIER](variables/RE_JS_IDENTIFIER.md) | Regular expression for matching a valid JavaScript identifier. |
| [RE\_KEBAB\_CASE](variables/RE_KEBAB_CASE.md) | Regular expression for matching a kebab-case string. |
| [RE\_PASCAL\_CASE](variables/RE_PASCAL_CASE.md) | Regular expression for matching a PascalCase string. |
| [RE\_REGEXP\_STR](variables/RE_REGEXP_STR.md) | Regular expression for matching a RegExp string. |
| [RE\_SNAKE\_CASE](variables/RE_SNAKE_CASE.md) | Regular expression for matching a snake_case string. |
| [RE\_TS\_EXT](variables/RE_TS_EXT.md) | Regular expression for matching a TypeScript file extension. |
| [WEBSITE\_URL](variables/WEBSITE_URL.md) | The URL to the project's website. |

## Functions

| Function | Description |
| ------ | ------ |
| [getAnalyzerOptions](functions/getAnalyzerOptions.md) | - |
| [getCommandLineOptions](functions/getCommandLineOptions.md) | - |
| [getReactVersion](functions/getReactVersion.md) | - |
| [isRegExp](functions/isRegExp.md) | Checks whether given string is regexp string |
| [report](functions/report.md) | - |
| [toRegExp](functions/toRegExp.md) | Convert a string to the `RegExp`. Normal strings (e.g. `"foo"`) is converted to `/^foo$/` of `RegExp`. Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`. |
