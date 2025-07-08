import * as ts from "typescript";

export function getProjectForJsxEmit(jsxEmit: ts.JsxEmit) {
  switch (jsxEmit) {
    case ts.JsxEmit.None:
    case ts.JsxEmit.ReactJSX:
    case ts.JsxEmit.ReactJSXDev:
      return "tsconfig.json";
    case ts.JsxEmit.React:
      return "tsconfig.jsx-react.json";
    case ts.JsxEmit.ReactNative:
      return "tsconfig.jsx-react-native.json";
    case ts.JsxEmit.Preserve:
      return "tsconfig.jsx-preserve.json";
  }
}
