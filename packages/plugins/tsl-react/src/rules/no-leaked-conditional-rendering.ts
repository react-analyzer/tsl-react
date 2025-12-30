import { unit } from "@let/eff";
import { isLogicalNegationExpression } from "@react-analyzer/ast";
import { getAnalyzerOptions, report } from "@react-analyzer/shared";
import { compare } from "compare-versions";
import { type AST, type ReportDescriptor, defineRule } from "tsl";
import { SyntaxKind } from "typescript";

import { type TypeVariant, getTypeVariants } from "../utils";

/** @internal */
export const messages = {
  noLeakedConditionalRendering: (p: { value: string }) =>
    `Potential leaked value ${p.value} that might cause unintentionally rendered values or rendering crashes.`,
} as const;

/**
 * Prevents problematic leaked values from being rendered.
 *
 * Using the && operator to render some element conditionally in JSX can cause unexpected values being rendered, or even crashing the rendering.
 *
 * **Examples**
 *
 * ```tsx
 * import React from "react";
 *
 * interface MyComponentProps {
 *   count: number;
 * }
 *
 * function MyComponent({ count }: MyComponentProps) {
 *   return <div>{count && <span>There are {count} results</span>}</div>;
 *   //           ^^^^^
 *   //           - Potential leaked value 'count' that might cause unintentionally rendered values or rendering crashes.
 * }
 * ```
 *
 * ```tsx
 * import React from "react";
 *
 * interface MyComponentProps {
 *   items: string[];
 * }
 *
 * function MyComponent({ items }: MyComponentProps) {
 *   return <div>{items.length && <List items={items} />}</div>;
 *   //           ^^^^^^^^^^^^
 *   //           - Potential leaked value 'items.length' that might cause unintentionally rendered values or rendering crashes.
 * }
 * ```
 *
 * ```tsx
 * import React from "react";
 *
 * interface MyComponentProps {
 *   items: string[];
 * }
 *
 * function MyComponent({ items }: MyComponentProps) {
 *   return <div>{items[0] && <List items={items} />}</div>;
 *   //           ^^^^^^^^
 *   //           - Potential leaked value 'items[0]' that might cause unintentionally rendered values or rendering crashes.
 * }
 * ```
 *
 * @since 0.0.0
 */
export const noLeakedConditionalRendering = defineRule(() => {
  return {
    name: "@react-analyzer/noLeakedConditionalRendering",
    createData(ctx) {
      const { version } = getAnalyzerOptions();
      const state = {
        isWithinJsxExpression: false,
      };

      // Allowed left node type variants
      const allowedVariants = [
        "any",
        "boolean",
        "nullish",
        "object",
        "falsy boolean",
        "truthy bigint",
        "truthy boolean",
        "truthy number",
        "truthy string",
        ...compare(version, "18.0.0", "<")
          ? []
          : ["string", "falsy string"] as const,
      ] as const satisfies TypeVariant[];

      function getReportDescriptor(node: AST.BinaryExpression): ReportDescriptor | unit {
        // If the left node is a logical negation expression, we skip the type check for better performance
        if (isLogicalNegationExpression(node.left)) return unit;
        const leftType = ctx.utils.getConstrainedTypeAtLocation(node.left);
        const leftTypeVariants = getTypeVariants(ctx.utils.unionConstituents(leftType));
        const areAllLeftTypeVariantsAllowed = Array
          .from(leftTypeVariants.values())
          .every((type) => allowedVariants.some((allowed) => allowed === type));
        if (!areAllLeftTypeVariantsAllowed) {
          return {
            node: node.left,
            message: messages.noLeakedConditionalRendering({ value: node.left.getText() }),
          };
        }
        return unit;
      }

      return { state, version, allowedVariants, getReportDescriptor } as const;
    },
    visitor: {
      JsxExpression(ctx) {
        ctx.data.state.isWithinJsxExpression = true;
      },
      JsxExpression_exit(ctx) {
        ctx.data.state.isWithinJsxExpression = false;
      },
      BinaryExpression(ctx, node) {
        const { state, getReportDescriptor } = ctx.data;
        if (!state.isWithinJsxExpression) return;
        if (node.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken) return;
        report(ctx, getReportDescriptor(node));
      },
    },
  };
});
