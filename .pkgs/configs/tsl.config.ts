import { core, defineConfig } from "tsl";
import {
  noDuplicateExports,
  noDuplicateImports,
  noMultilineTemplateExpressionsWithoutAutoDedent,
  nullish,
} from "tsl-dx";

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
    nullish(),
    noDuplicateImports(),
    noDuplicateExports(),
    noMultilineTemplateExpressionsWithoutAutoDedent(),
  ],
});
