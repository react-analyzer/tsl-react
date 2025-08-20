import * as tsl0 from "tsl";

//#region src/rules/prefer-eqeq-nullish-comparison.d.ts

/**
 * Rule to enforce the use of `== null` or `!= null` for nullish comparisons.
 *
 * @since 0.0.0
 */
declare const preferEqEqNullishComparison: (options?: "off" | undefined) => tsl0.Rule<unknown>;
//#endregion
export { preferEqEqNullishComparison };