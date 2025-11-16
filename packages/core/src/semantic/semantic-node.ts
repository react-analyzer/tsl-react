import type { unit } from "@let/eff";
import type { AST } from "tsl";

export interface SemanticNode {
  id:
    | unit
    | AST.Identifier
    | AST.Identifier[];
  key: string;
  kind: string;
  name:
    | unit
    | string;
  node: AST.AnyNode;
  flag: bigint;
  hint: bigint;
}
