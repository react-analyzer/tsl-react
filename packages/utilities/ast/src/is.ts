import { or } from "@let/eff";
import type { AST } from "tsl";
import { SyntaxKind } from "typescript";

export function is<T extends AST.AnyNode>(kind: T["kind"]): (node: AST.AnyNode) => node is T {
  return (node: AST.AnyNode): node is T => node.kind === kind;
}

export function isOneOf<T extends AST.AnyNode>(kinds: T["kind"][]): (node: AST.AnyNode) => node is T {
  return (node: AST.AnyNode): node is T => kinds.includes(node.kind);
}

export const isFunction = isOneOf([
  SyntaxKind.ArrowFunction,
  SyntaxKind.FunctionDeclaration,
  SyntaxKind.FunctionExpression,
]);

export const isClass = isOneOf([SyntaxKind.ClassDeclaration, SyntaxKind.ClassExpression]);

export const isMethodOrProperty = isOneOf([
  SyntaxKind.PropertyDeclaration,
  SyntaxKind.MethodDeclaration,
]);

export const isLoop = isOneOf([
  SyntaxKind.DoStatement,
  SyntaxKind.ForInStatement,
  SyntaxKind.ForOfStatement,
  SyntaxKind.ForStatement,
  SyntaxKind.WhileStatement,
]);

export const isControlFlow = or(
  isLoop,
  isOneOf([
    SyntaxKind.IfStatement,
    SyntaxKind.SwitchStatement,
  ]),
);

export const isMemberExpressionStrict = isOneOf([
  SyntaxKind.PropertyAccessExpression,
  SyntaxKind.ElementAccessExpression,
]);

export function isLogicalExpression(
  node: AST.AnyNode,
): node is AST.BinaryExpression & { operatorToken: { kind: SyntaxKind.AmpersandAmpersandToken } } {
  return node.kind === SyntaxKind.BinaryExpression && node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken;
}

export function isLogicalNegationExpression(node: AST.AnyNode): node is AST.PrefixUnaryExpression {
  return node.kind === SyntaxKind.PrefixUnaryExpression && node.operator === SyntaxKind.ExclamationToken;
}

export const isProperty = isOneOf([
  SyntaxKind.PropertyDeclaration,
  SyntaxKind.IndexSignature,
  SyntaxKind.Parameter,
  SyntaxKind.PropertySignature,
]);

export const isJSXElement = is(SyntaxKind.JsxElement);

export const isJSXFragment = is(SyntaxKind.JsxFragment);

export const isJSX = isOneOf([
  //   SyntaxKind.JsxIdentifier,
  //   SyntaxKind.JsxMemberExpression,
  SyntaxKind.JsxAttribute,
  SyntaxKind.JsxAttributes,
  SyntaxKind.JsxClosingElement,
  SyntaxKind.JsxClosingFragment,
  SyntaxKind.JsxElement,
  SyntaxKind.JsxExpression,
  SyntaxKind.JsxFragment,
  SyntaxKind.JsxNamespacedName,
  SyntaxKind.JsxOpeningElement,
  SyntaxKind.JsxOpeningFragment,
  SyntaxKind.JsxSelfClosingElement,
  SyntaxKind.JsxSpreadAttribute,
  SyntaxKind.JsxText,
]);

export const isTypeExpression = isOneOf([
  SyntaxKind.AsExpression,
  SyntaxKind.TypeAssertionExpression,
  SyntaxKind.NonNullExpression,
  SyntaxKind.SatisfiesExpression,
  SyntaxKind.ExpressionWithTypeArguments,
]);

export const isTypeAssertionExpressionLoose = isOneOf([
  SyntaxKind.AsExpression,
  SyntaxKind.TypeAssertionExpression,
  SyntaxKind.NonNullExpression,
  SyntaxKind.SatisfiesExpression,
]);
