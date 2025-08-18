import { toStringFormat } from "@react-analyzer/ast";
import { dual, unit } from "@react-analyzer/eff";
import type { AST, Context } from "tsl";
import { SyntaxKind } from "typescript";

export declare namespace isReactAPI {
  type ReturnType = {
    (context: Context, node: unit | null | AST.AnyNode): node is AST.MemberExpression;
    (
      context: Context,
    ): (node: unit | null | AST.AnyNode) => node is AST.MemberExpression;
  };
}

export function isReactAPI(api: string): isReactAPI.ReturnType {
  const func = (context: Context, node: unit | null | AST.AnyNode): node is AST.MemberExpression => {
    if (node == null) return false;
    const name = toStringFormat(node);
    if (name === api) return true;
    if (name.substring(name.indexOf(".") + 1) === api) return true;
    return false;
  };
  return dual(2, func);
}

export declare namespace isReactAPICall {
  type ReturnType = {
    (context: Context, node: unit | null | AST.AnyNode): node is AST.CallExpression;
    (context: Context): (node: unit | null | AST.AnyNode) => node is AST.CallExpression;
  };
}

export function isReactAPICall(api: string): isReactAPICall.ReturnType {
  const func = (context: Context, node: unit | null | AST.AnyNode): node is AST.CallExpression => {
    if (node == null) return false;
    if (node.kind !== SyntaxKind.CallExpression) return false;
    return isReactAPI(api)(context, node.expression);
  };
  return dual(2, func);
}

export const isCaptureOwnerStack = isReactAPI("captureOwnerStack");
export const isChildrenCount = isReactAPI("Children.count");
export const isChildrenForEach = isReactAPI("Children.forEach");
export const isChildrenMap = isReactAPI("Children.map");
export const isChildrenOnly = isReactAPI("Children.only");
export const isChildrenToArray = isReactAPI("Children.toArray");
export const isCloneElement = isReactAPI("cloneElement");
export const isCreateContext = isReactAPI("createContext");
export const isCreateElement = isReactAPI("createElement");
export const isCreateRef = isReactAPI("createRef");
export const isForwardRef = isReactAPI("forwardRef");
export const isMemo = isReactAPI("memo");
export const isLazy = isReactAPI("lazy");

export const isCaptureOwnerStackCall = isReactAPICall("captureOwnerStack");
export const isChildrenCountCall = isReactAPICall("Children.count");
export const isChildrenForEachCall = isReactAPICall("Children.forEach");
export const isChildrenMapCall = isReactAPICall("Children.map");
export const isChildrenOnlyCall = isReactAPICall("Children.only");
export const isChildrenToArrayCall = isReactAPICall("Children.toArray");
export const isCloneElementCall = isReactAPICall("cloneElement");
export const isCreateContextCall = isReactAPICall("createContext");
export const isCreateElementCall = isReactAPICall("createElement");
export const isCreateRefCall = isReactAPICall("createRef");
export const isForwardRefCall = isReactAPICall("forwardRef");
export const isMemoCall = isReactAPICall("memo");
export const isLazyCall = isReactAPICall("lazy");
