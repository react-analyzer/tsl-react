import * as Fn from "effect/Function";
import * as Option from "effect/Option";
import { match } from "ts-pattern";
import { type AST, defineRule } from "tsl";
import { SyntaxKind } from "typescript";

export const preferEqEqNullishComparison = defineRule(() => ({
  name: "local/preferEqEqNullishComparison",
  visitor: {
    BinaryExpression(context, node) {
      if (!isNullOrUndefined(node.left) && !isNullOrUndefined(node.right)) return;
      Fn.pipe(
        match(node.operatorToken.kind)
          .with(SyntaxKind.EqualsEqualsEqualsToken, () => Option.some("=="))
          .with(SyntaxKind.ExclamationEqualsEqualsToken, () => Option.some("!="))
          .otherwise(Option.none),
        Option.map((operator) => ({
          message: `Use '${operator}' for nullish comparison.`,
          node,
        })),
        Option.map(context.report),
      );
    },
  },
}));

function isNullOrUndefined(node: AST.AnyNode) {
  switch (node.kind) {
    case SyntaxKind.NullKeyword:
      return true;
    case SyntaxKind.Identifier:
      return node.escapedText === "undefined";
    default:
      return false;
  }
}
