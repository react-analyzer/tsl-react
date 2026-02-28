import type { AST } from "tsl";

export interface SemanticNode {
  id:
    | null
    | AST.Identifier
    | AST.Identifier[];
  key: string;
  kind: string;
  name:
    | null
    | string;
  node: AST.AnyNode;
  flag: bigint;
  hint: bigint;
}
