import { identity } from "@react-analyzer/eff";
import { match, P } from "ts-pattern";
import { _require } from "./_require";

export function getReactVersion(fallback: string): string {
  try {
    return match(_require("react"))
      .with({ version: P.select(P.string) }, identity)
      .otherwise(() => fallback);
  } catch {
    return fallback;
  }
}
