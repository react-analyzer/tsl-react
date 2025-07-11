import * as tsl from 'tsl';

/**
 * Prefer using `==` or `!=` for nullish comparison instead of `===` or `!==`.
 *
 * @since 0.0.0
 */
declare const preferEqEqNullishComparison: (options?: "off" | undefined) => tsl.Rule<unknown>;

export { preferEqEqNullishComparison };
