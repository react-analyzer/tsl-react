[@react-analyzer/core](../README.md) / isTrueLiteralType

# Function: isTrueLiteralType()

```ts
function isTrueLiteralType(type: Type): type is TrueLiteralType;
```

Determines whether the given type is a boolean literal type for "true".

## Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `Type` |

## Returns

`type is TrueLiteralType`

## Example

```ts
declare const type: ts.Type;

if (isTrueLiteralType(type)) {
  // ...
}
```
