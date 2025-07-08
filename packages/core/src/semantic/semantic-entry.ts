import type { AST } from "tsl";

export interface SemanticEntry {
  // kind: string;
  node: AST.AnyNode;
  // phase: ComponentPhaseKind;
}
