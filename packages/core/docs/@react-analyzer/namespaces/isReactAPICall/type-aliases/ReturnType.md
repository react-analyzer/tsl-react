[@react-analyzer/core](../../../../README.md) / [isReactAPICall](../README.md) / ReturnType

# Type Alias: ReturnType()

```ts
type ReturnType = {
  (context: Context, node: AnyNode | null | undefined): node is CallExpression;
  (context: Context): (node: AnyNode | null | undefined) => node is CallExpression;
};
```

## Call Signature

```ts
(context: Context, node: AnyNode | null | undefined): node is CallExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `Context` |
| `node` | `AnyNode` \| `null` \| `undefined` |

### Returns

`node is CallExpression`

## Call Signature

```ts
(context: Context): (node: AnyNode | null | undefined) => node is CallExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `Context` |

### Returns

```ts
(node: AnyNode | null | undefined): node is CallExpression;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `AnyNode` \| `null` \| `undefined` |

#### Returns

`node is CallExpression`
