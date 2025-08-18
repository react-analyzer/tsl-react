import { delimiterCase, replace, toLowerCase } from "string-ts";

import type { AST } from "tsl";
import { SyntaxKind } from "typescript";
import { isJSX } from "./ast-node-is.ts";

/**
 * @internal
 */
export function toStringFormat(node: AST.AnyNode): string {
  switch (node.kind) {
    case SyntaxKind.JsxText:
    case SyntaxKind.Identifier:
    case SyntaxKind.PrivateIdentifier:
      return node.text;
    case SyntaxKind.PropertyAccessExpression:
      return `${toStringFormat(node.expression)}.${toStringFormat(node.name)}`;
    case SyntaxKind.JsxNamespacedName:
      return `${node.namespace.text}:${node.name.text}`;
    default:
      return node.getText();
  }
}
