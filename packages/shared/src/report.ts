import type { ReportDescriptor } from "tsl";

interface Context {
  report(descriptor: ReportDescriptor): void;
}

export function report(ctx: Context, descriptor: null | ReportDescriptor) {
  if (descriptor == null) return;
  return ctx.report(descriptor);
}
