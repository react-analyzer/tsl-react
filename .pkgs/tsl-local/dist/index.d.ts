import * as tsl0 from "tsl";

//#region src/rules/prefer-eqeq-nullish-comparison.d.ts

/**
 * Prefer using `==` or `!=` for nullish comparison instead of `===` or `!==`.
 *
 * @since 0.0.0
 */
declare const preferEqEqNullishComparison: (options?: "off" | undefined) => tsl0.Rule<unknown>;
//#endregion
export { preferEqEqNullishComparison };