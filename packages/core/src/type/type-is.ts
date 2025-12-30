import { P, isMatching } from "ts-pattern";
import ts from "typescript";

function isFlagSet(allFlags: number, flag: number): boolean {
  return (allFlags & flag) !== 0;
}

function isFlagSetOnObject(obj: { flags: number }, flag: number): boolean {
  return isFlagSet(obj.flags, flag);
}

const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean = isFlagSetOnObject;

export function isBooleanLiteralType<TType extends ts.Type>(type: TType): type is TType & {
  intrinsicName: "false" | "true";
} {
  return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

export const isFalseLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "false";
export const isTrueLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "true";
export const isAnyType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.TypeParameter | ts.TypeFlags.Any);
export const isBigIntType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BigIntLike);
export const isBooleanType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BooleanLike);
export const isEnumType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.EnumLike);
export const isFalsyBigIntType = (type: ts.Type) =>
  type.isLiteral() && isMatching({ value: { base10Value: "0" } }, type);
export const isFalsyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value === 0;
export const isFalsyStringType = (type: ts.Type) => type.isStringLiteral() && type.value === "";
export const isNeverType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Never);
export const isNullishType = (type: ts.Type) =>
  isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike);
export const isNumberType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.NumberLike);
export const isObjectType = (type: ts.Type) =>
  !isTypeFlagSet(
    type,
    ts.TypeFlags.Null
      | ts.TypeFlags.Undefined
      | ts.TypeFlags.VoidLike
      | ts.TypeFlags.BooleanLike
      | ts.TypeFlags.StringLike
      | ts.TypeFlags.NumberLike
      | ts.TypeFlags.BigIntLike
      | ts.TypeFlags.TypeParameter
      | ts.TypeFlags.Any
      | ts.TypeFlags.Unknown
      | ts.TypeFlags.Never,
  );
export const isStringType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.StringLike);
export const isTruthyBigIntType = (type: ts.Type) =>
  type.isLiteral() && isMatching({ value: { base10Value: P.not("0") } }, type);
export const isTruthyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value !== 0;
export const isTruthyStringType = (type: ts.Type) => type.isStringLiteral() && type.value !== "";
export const isUnknownType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Unknown);
