[@react-analyzer/core](../README.md) / isFalseLiteralType

# Function: isFalseLiteralType()

```ts
function isFalseLiteralType(type: Type): type is FalseLiteralType;
```

Determines whether the given type is a boolean literal type for "false".

## Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `Type` |

## Returns

`type is FalseLiteralType`

## Example

```ts
declare const type: ts.Type;

if (isFalseLiteralType(type)) {
  // ...
}
```
