import { consistentNullishComparison } from "@local/tsl-local";
import { core, defineConfig } from "tsl";
import { noDuplicateExports, noDuplicateImports } from "tsl-module";

export default defineConfig({
  rules: [
    ...core.all(),
    core.strictBooleanExpressions({
      allowAny: false,
      allowNullableBoolean: false,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: true,
      allowString: false,
    }),
    core.switchExhaustivenessCheck({
      considerDefaultExhaustiveForUnions: true,
    }),
    core.noConfusingVoidExpression("off"),
    noDuplicateImports(),
    noDuplicateExports(),
    consistentNullishComparison(),
  ],
});
