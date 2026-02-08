[Public APIs](../README.md) / tupled

# Function: tupled()

```ts
function tupled<A, B>(f: (...a: A) => B): (a: A) => B;
```

Creates a version of this function: instead of `n` arguments, it accepts a single tuple argument.

## Type Parameters

| Type Parameter                     |
| ---------------------------------- |
| `A` _extends_ readonly `unknown`[] |
| `B`                                |

## Parameters

| Parameter | Type                 | Description                   |
| --------- | -------------------- | ----------------------------- |
| `f`       | (...`a`: `A`) => `B` | The function to be converted. |

## Returns

```ts
(a: A): B;
```

### Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `A`  |

### Returns

`B`

## Example

```ts
import { tupled } from "effect/Function";
import * as assert from "node:assert";

const sumTupled = tupled((x: number, y: number): number => x + y);

assert.deepStrictEqual(sumTupled([1, 2]), 3);
```

## Since

1.0.0
