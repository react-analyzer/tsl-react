import * as tsl0 from "tsl";

//#region src/rules/consistent-nullish-comparison.d.ts
/**
 * Rule to enforce the use of `== null` or `!= null` for nullish comparisons.
 *
 * @since 0.0.0
 */
declare const consistentNullishComparison: (options?: "off" | undefined) => tsl0.Rule<unknown>;
//#endregion
export { consistentNullishComparison };