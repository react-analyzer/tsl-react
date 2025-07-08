import * as tsl from 'tsl';

var name = "@local/tsl-local";
var version = "0.0.0";

declare const rules: tsl.RulesSet<{
    preferEqEqNullishComparison: (options?: "off" | undefined) => tsl.Rule<unknown>;
}>;

export { name, rules, version };
