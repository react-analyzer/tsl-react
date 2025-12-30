[@react-analyzer/core](../README.md) / isBooleanLiteralType

# Function: isBooleanLiteralType()

```ts
function isBooleanLiteralType<TType>(type: TType): type is TType & { intrinsicName: "false" | "true" };
```

## Type Parameters

| Type Parameter |
| ------ |
| `TType` *extends* `Type` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `TType` |

## Returns

type is TType & \{ intrinsicName: "false" \| "true" \}
