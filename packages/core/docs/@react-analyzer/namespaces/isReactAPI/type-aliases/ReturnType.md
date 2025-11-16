[@react-analyzer/core](../../../../README.md) / [isReactAPI](../README.md) / ReturnType

# Type Alias: ReturnType()

```ts
type ReturnType = {
  (context: Context, node: AnyNode | null | undefined): node is MemberExpression;
  (context: Context): (node: AnyNode | null | undefined) => node is MemberExpression;
};
```

## Call Signature

```ts
(context: Context, node: AnyNode | null | undefined): node is MemberExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `Context` |
| `node` | `AnyNode` \| `null` \| `undefined` |

### Returns

`node is MemberExpression`

## Call Signature

```ts
(context: Context): (node: AnyNode | null | undefined) => node is MemberExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `Context` |

### Returns

```ts
(node: AnyNode | null | undefined): node is MemberExpression;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `AnyNode` \| `null` \| `undefined` |

#### Returns

`node is MemberExpression`
