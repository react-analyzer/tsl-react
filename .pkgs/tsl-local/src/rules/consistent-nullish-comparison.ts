import { match } from "ts-pattern";
import { defineRule } from "tsl";
import { SyntaxKind } from "typescript";

import { getStartAndEnd } from "../utils";

/**
 * Rule to enforce the use of `== null` or `!= null` for nullish comparisons.
 *
 * @since 0.0.0
 */
export const consistentNullishComparison = defineRule(() => ({
  name: "local/consistentNullishComparison",
  visitor: {
    BinaryExpression(context, node) {
      const newOperatorText = match(node.operatorToken.kind)
        .with(SyntaxKind.EqualsEqualsEqualsToken, () => "==")
        .with(SyntaxKind.ExclamationEqualsEqualsToken, () => "!=")
        .otherwise(() => null);
      if (newOperatorText == null) return;
      const offendingChild = [node.left, node.right].find((n) => {
        switch (n.kind) {
          case SyntaxKind.NullKeyword:
            return true;
          case SyntaxKind.Identifier:
            return n.escapedText === "undefined";
          default:
            return false;
        }
      });
      if (offendingChild == null) return;
      context.report({
        message: `Use '${newOperatorText}' for nullish comparison.`,
        node,
        suggestions: [
          {
            message: offendingChild === node.left
              ? `Replace with 'null ${newOperatorText} ${node.right.getText()}'.`
              : `Replace with '${node.left.getText()} ${newOperatorText} null'.`,
            changes: [
              {
                ...getStartAndEnd(node.operatorToken),
                newText: newOperatorText,
              },
              {
                ...getStartAndEnd(offendingChild),
                newText: "null",
              },
            ],
          },
        ],
      });
    },
  },
}));
