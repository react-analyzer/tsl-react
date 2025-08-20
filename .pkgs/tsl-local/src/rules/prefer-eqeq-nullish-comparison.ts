import * as Arr from "effect/Array";
import * as Fn from "effect/Function";
import * as Option from "effect/Option";
import { match } from "ts-pattern";
import { defineRule } from "tsl";
import { SyntaxKind } from "typescript";

/**
 * Rule to enforce the use of `== null` or `!= null` for nullish comparisons.
 *
 * @since 0.0.0
 */
export const preferEqEqNullishComparison = defineRule(() => ({
  name: "local/preferEqEqNullishComparison",
  visitor: {
    BinaryExpression(context, node) {
      const reportDescriptor = Fn.pipe(
        Option.Do,
        Option.bind("offendingChild", () =>
          Arr.findFirst(
            [node.left, node.right],
            (n) => {
              switch (n.kind) {
                case SyntaxKind.NullKeyword:
                  return true;
                case SyntaxKind.Identifier:
                  return n.escapedText === "undefined";
                default:
                  return false;
              }
            },
          )),
        Option.bind("newOperatorText", () =>
          match(node.operatorToken.kind)
            .with(SyntaxKind.EqualsEqualsEqualsToken, () => Option.some("=="))
            .with(SyntaxKind.ExclamationEqualsEqualsToken, () => Option.some("!="))
            .otherwise(Option.none)),
        Option.map(({ offendingChild, newOperatorText }) => ({
          message: `Use '${newOperatorText}' for nullish comparison.`,
          node,
          suggestions: [
            {
              message: offendingChild === node.left
                ? `Replace with 'null ${newOperatorText} ${node.right.getText()}'.`
                : `Replace with '${node.left.getText()} ${newOperatorText} null'.`,
              changes: [
                {
                  start: node.operatorToken.getStart(),
                  end: node.operatorToken.getEnd(),
                  newText: newOperatorText,
                },
                {
                  start: offendingChild.getStart(),
                  end: offendingChild.getEnd(),
                  newText: "null",
                },
              ],
            },
          ],
        })),
      );
      Option.map(reportDescriptor, context.report);
    },
  },
}));
