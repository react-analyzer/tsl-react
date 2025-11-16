import { unit } from "@let/eff";
import type { ReportDescriptor } from "tsl";

interface Context {
  report(descriptor: ReportDescriptor): void;
}

export function report(ctx: Context, descriptor: unit | null | ReportDescriptor) {
  if (descriptor == null) return;
  return ctx.report(descriptor);
}
