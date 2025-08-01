import { identity } from "@react-analyzer/eff";
import { getTsconfig } from "get-tsconfig";
import { match, P } from "ts-pattern";

import { getCommandLineOptions } from "./get-command-line-options.ts";

export interface AnalyzerOptions {
  version: string;
}

export const DEFAULT_ANALYZER_OPTIONS = {
  version: "19.1.0",
} as const satisfies AnalyzerOptions;

// TODO: Port the rest of the options from https://github.com/Rel1cx/eslint-react/blob/2.0.0-beta/packages/shared/src/settings.ts
export function getAnalyzerOptions(): AnalyzerOptions {
  const { project = "tsconfig.json" } = getCommandLineOptions();
  // TODO: Improve the type handling here
  const options = getTsconfig(project)?.config["react" as never] as unknown;
  return {
    ...DEFAULT_ANALYZER_OPTIONS,
    ...match(options)
      .with({ version: P.string }, identity)
      .otherwise(() => ({})),
  };
}
