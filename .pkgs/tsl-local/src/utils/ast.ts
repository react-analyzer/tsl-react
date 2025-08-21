export function getStartAndEnd(node: { getStart: () => number; getEnd: () => number }) {
  return { start: node.getStart(), end: node.getEnd() } as const;
}
