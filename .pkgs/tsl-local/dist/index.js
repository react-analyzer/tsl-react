import { isMatching, P } from 'ts-pattern';
import { defineRule } from 'tsl';
import { SyntaxKind } from 'typescript';

// src/rules/prefer-eqeq-nullish-comparison.ts
var isNullOrUndefine = isMatching(P.union(
  SyntaxKind.NullKeyword,
  SyntaxKind.UndefinedKeyword
));
var isEqEqEqOrExEqEq = isMatching(P.union(
  SyntaxKind.EqualsEqualsEqualsToken,
  SyntaxKind.ExclamationEqualsEqualsToken
));
var preferEqEqNullishComparison = defineRule(() => ({
  name: "local/preferEqEqNullishComparison",
  visitor: {
    BinaryExpression(context, node) {
      if (!isEqEqEqOrExEqEq(node.operatorToken.kind)) return;
      if (!isNullOrUndefine(node.left.kind) && !isNullOrUndefine(node.right.kind)) return;
      const newOperatorText = node.operatorToken.kind === SyntaxKind.EqualsEqualsEqualsToken ? "==" : "!=";
      context.report({
        message: "Use '==' or '!=' for nullish comparison.",
        node,
        suggestions: [
          {
            message: `Replace with '${newOperatorText}'`,
            changes: [
              {
                start: node.operatorToken.getStart(),
                end: node.operatorToken.getEnd(),
                newText: newOperatorText
              }
            ]
          }
        ]
      });
    }
  }
}));

export { preferEqEqNullishComparison };
