import { name, version } from "../package.json";

import { createRulesSet } from "tsl";
import { preferEqEqNullishComparison } from "./rules/prefer-eqeq-nullish-comparison";

export { name, version };

export const rules = createRulesSet({
  preferEqEqNullishComparison,
});
