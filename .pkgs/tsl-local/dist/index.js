import { match } from "ts-pattern";
import { defineRule } from "tsl";
import { SyntaxKind } from "typescript";

//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Function.js
/**
* Tests if a value is a `function`.
*
* @example
* ```ts
* import * as assert from "node:assert"
* import { isFunction } from "effect/Predicate"
*
* assert.deepStrictEqual(isFunction(isFunction), true)
* assert.deepStrictEqual(isFunction("function"), false)
* ```
*
* @category guards
* @since 2.0.0
*/
const isFunction = (input) => typeof input === "function";
/**
* Creates a function that can be used in a data-last (aka `pipe`able) or
* data-first style.
*
* The first parameter to `dual` is either the arity of the uncurried function
* or a predicate that determines if the function is being used in a data-first
* or data-last style.
*
* Using the arity is the most common use case, but there are some cases where
* you may want to use a predicate. For example, if you have a function that
* takes an optional argument, you can use a predicate to determine if the
* function is being used in a data-first or data-last style.
*
* You can pass either the arity of the uncurried function or a predicate
* which determines if the function is being used in a data-first or
* data-last style.
*
* **Example** (Using arity to determine data-first or data-last style)
*
* ```ts
* import { dual, pipe } from "effect/Function"
*
* const sum = dual<
*   (that: number) => (self: number) => number,
*   (self: number, that: number) => number
* >(2, (self, that) => self + that)
*
* console.log(sum(2, 3)) // 5
* console.log(pipe(2, sum(3))) // 5
* ```
*
* **Example** (Using call signatures to define the overloads)
*
* ```ts
* import { dual, pipe } from "effect/Function"
*
* const sum: {
*   (that: number): (self: number) => number
*   (self: number, that: number): number
* } = dual(2, (self: number, that: number): number => self + that)
*
* console.log(sum(2, 3)) // 5
* console.log(pipe(2, sum(3))) // 5
* ```
*
* **Example** (Using a predicate to determine data-first or data-last style)
*
* ```ts
* import { dual, pipe } from "effect/Function"
*
* const sum = dual<
*   (that: number) => (self: number) => number,
*   (self: number, that: number) => number
* >(
*   (args) => args.length === 2,
*   (self, that) => self + that
* )
*
* console.log(sum(2, 3)) // 5
* console.log(pipe(2, sum(3))) // 5
* ```
*
* @since 2.0.0
*/
const dual = function(arity, body) {
	if (typeof arity === "function") return function() {
		if (arity(arguments)) return body.apply(this, arguments);
		return (self) => body(self, ...arguments);
	};
	switch (arity) {
		case 0:
		case 1: throw new RangeError(`Invalid arity ${arity}`);
		case 2: return function(a, b) {
			if (arguments.length >= 2) return body(a, b);
			return function(self) {
				return body(self, a);
			};
		};
		case 3: return function(a, b, c) {
			if (arguments.length >= 3) return body(a, b, c);
			return function(self) {
				return body(self, a, b);
			};
		};
		case 4: return function(a, b, c, d) {
			if (arguments.length >= 4) return body(a, b, c, d);
			return function(self) {
				return body(self, a, b, c);
			};
		};
		case 5: return function(a, b, c, d, e) {
			if (arguments.length >= 5) return body(a, b, c, d, e);
			return function(self) {
				return body(self, a, b, c, d);
			};
		};
		default: return function() {
			if (arguments.length >= arity) return body.apply(this, arguments);
			const args = arguments;
			return function(self) {
				return body(self, ...args);
			};
		};
	}
};
/**
* The identity function, i.e. A function that returns its input argument.
*
* @example
* ```ts
* import * as assert from "node:assert"
* import { identity } from "effect/Function"
*
* assert.deepStrictEqual(identity(5), 5)
* ```
*
* @since 2.0.0
*/
const identity = (a) => a;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
	switch (arguments.length) {
		case 1: return a;
		case 2: return ab(a);
		case 3: return bc(ab(a));
		case 4: return cd(bc(ab(a)));
		case 5: return de(cd(bc(ab(a))));
		case 6: return ef(de(cd(bc(ab(a)))));
		case 7: return fg(ef(de(cd(bc(ab(a))))));
		case 8: return gh(fg(ef(de(cd(bc(ab(a)))))));
		case 9: return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
		default: {
			let ret = arguments[0];
			for (let i = 1; i < arguments.length; i++) ret = arguments[i](ret);
			return ret;
		}
	}
}

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/GlobalValue.js
/**
* The `GlobalValue` module ensures that a single instance of a value is created globally,
* even when modules are imported multiple times (e.g., due to mixing CommonJS and ESM builds)
* or during hot-reloading in development environments like Next.js or Remix.
*
* It achieves this by using a versioned global store, identified by a unique `Symbol` tied to
* the current version of the `effect` library. The store holds values that are keyed by an identifier,
* allowing the reuse of previously computed instances across imports or reloads.
*
* This pattern is particularly useful in scenarios where frequent reloading can cause services or
* single-instance objects to be recreated unnecessarily, such as in development environments with hot-reloading.
*
* @since 2.0.0
*/
const globalStoreId = `effect/GlobalValue`;
let globalStore;
/**
* Retrieves or computes a global value associated with the given `id`. If the value for this `id`
* has already been computed, it will be returned from the global store. If it does not exist yet,
* the provided `compute` function will be executed to compute the value, store it, and then return it.
*
* This ensures that even in cases where the module is imported multiple times (e.g., in mixed environments
* like CommonJS and ESM, or during hot-reloading in development), the value is computed only once and reused
* thereafter.
*
* @example
* ```ts
* import { globalValue } from "effect/GlobalValue"
*
* // This cache will persist as long as the module is running,
* // even if reloaded or imported elsewhere
* const myCache = globalValue(
*   Symbol.for("myCache"),
*   () => new WeakMap<object, number>()
* )
* ```
*
* @since 2.0.0
*/
const globalValue = (id, compute) => {
	if (!globalStore) {
		globalThis[globalStoreId] ??= /* @__PURE__ */ new Map();
		globalStore = globalThis[globalStoreId];
	}
	if (!globalStore.has(id)) globalStore.set(id, compute());
	return globalStore.get(id);
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Predicate.js
/**
* A refinement that checks if a value is a `Function`.
*
* @example
* ```ts
* import * as assert from "node:assert"
* import { isFunction } from "effect/Predicate"
*
* assert.strictEqual(isFunction(() => {}), true)
* assert.strictEqual(isFunction(isFunction), true)
*
* assert.strictEqual(isFunction("function"), false)
* ```
*
* @category guards
* @since 2.0.0
*/
const isFunction$1 = isFunction;
/**
* Checks if the input is an object or an array.
* @internal
*/
const isRecordOrArray = (input) => typeof input === "object" && input !== null;
/**
* A refinement that checks if a value is an `object`. Note that in JavaScript,
* arrays and functions are also considered objects.
*
* @example
* ```ts
* import * as assert from "node:assert"
* import { isObject } from "effect/Predicate"
*
* assert.strictEqual(isObject({}), true)
* assert.strictEqual(isObject([]), true)
* assert.strictEqual(isObject(() => {}), true)
*
* assert.strictEqual(isObject(null), false)
* assert.strictEqual(isObject("hello"), false)
* ```
*
* @category guards
* @since 2.0.0
* @see isRecord to check for plain objects (excluding arrays and functions).
*/
const isObject = (input) => isRecordOrArray(input) || isFunction$1(input);
/**
* A refinement that checks if a value is an object-like value and has a specific property key.
*
* @example
* ```ts
* import * as assert from "node:assert"
* import { hasProperty } from "effect/Predicate"
*
* assert.strictEqual(hasProperty({ a: 1 }, "a"), true)
* assert.strictEqual(hasProperty({ a: 1 }, "b"), false)
*
* const value: unknown = { name: "Alice" };
* if (hasProperty(value, "name")) {
*   // The type of `value` is narrowed to `{ name: unknown }`
*   // and we can safely access `value.name`
*   console.log(value.name)
* }
* ```
*
* @category guards
* @since 2.0.0
*/
const hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Utils.js
/**
* @category symbols
* @since 2.0.0
*/
const GenKindTypeId = /* @__PURE__ */ Symbol.for("effect/Gen/GenKind");
/**
* @category constructors
* @since 2.0.0
*/
var GenKindImpl = class {
	value;
	constructor(value) {
		this.value = value;
	}
	/**
	* @since 2.0.0
	*/
	get _F() {
		return identity;
	}
	/**
	* @since 2.0.0
	*/
	get _R() {
		return (_) => _;
	}
	/**
	* @since 2.0.0
	*/
	get _O() {
		return (_) => _;
	}
	/**
	* @since 2.0.0
	*/
	get _E() {
		return (_) => _;
	}
	/**
	* @since 2.0.0
	*/
	[GenKindTypeId] = GenKindTypeId;
	/**
	* @since 2.0.0
	*/
	[Symbol.iterator]() {
		return new SingleShotGen(this);
	}
};
/**
* @category constructors
* @since 2.0.0
*/
var SingleShotGen = class SingleShotGen {
	self;
	called = false;
	constructor(self) {
		this.self = self;
	}
	/**
	* @since 2.0.0
	*/
	next(a) {
		return this.called ? {
			value: a,
			done: true
		} : (this.called = true, {
			value: this.self,
			done: false
		});
	}
	/**
	* @since 2.0.0
	*/
	return(a) {
		return {
			value: a,
			done: true
		};
	}
	/**
	* @since 2.0.0
	*/
	throw(e) {
		throw e;
	}
	/**
	* @since 2.0.0
	*/
	[Symbol.iterator]() {
		return new SingleShotGen(this.self);
	}
};
/**
* @since 3.0.6
*/
const YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
/**
* @since 3.0.6
*/
var YieldWrap = class {
	/**
	* @since 3.0.6
	*/
	#value;
	constructor(value) {
		this.#value = value;
	}
	/**
	* @since 3.0.6
	*/
	[YieldWrapTypeId]() {
		return this.#value;
	}
};
/**
* Note: this is an experimental feature made available to allow custom matchers in tests, not to be directly used yet in user code
*
* @since 3.1.1
* @status experimental
* @category modifiers
*/
const structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
	enabled: false,
	tester: void 0
}));
const standard = { effect_internal_function: (body) => {
	return body();
} };
const forced = { effect_internal_function: (body) => {
	try {
		return body();
	} finally {}
} };
const isNotOptimizedAway = /* @__PURE__ */ standard.effect_internal_function(() => (/* @__PURE__ */ new Error()).stack)?.includes("effect_internal_function") === true;
/**
* @since 3.2.2
* @status experimental
* @category tracing
*/
const internalCall = isNotOptimizedAway ? standard.effect_internal_function : forced.effect_internal_function;
const genConstructor = function* () {}.constructor;

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Hash.js
/** @internal */
const randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
/**
* @since 2.0.0
* @category symbols
*/
const symbol$1 = /* @__PURE__ */ Symbol.for("effect/Hash");
/**
* @since 2.0.0
* @category hashing
*/
const hash = (self) => {
	if (structuralRegionState.enabled === true) return 0;
	switch (typeof self) {
		case "number": return number(self);
		case "bigint": return string(self.toString(10));
		case "boolean": return string(String(self));
		case "symbol": return string(String(self));
		case "string": return string(self);
		case "undefined": return string("undefined");
		case "function":
		case "object": if (self === null) return string("null");
		else if (self instanceof Date) return hash(self.toISOString());
		else if (self instanceof URL) return hash(self.href);
		else if (isHash(self)) return self[symbol$1]();
		else return random(self);
		default: throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
	}
};
/**
* @since 2.0.0
* @category hashing
*/
const random = (self) => {
	if (!randomHashCache.has(self)) randomHashCache.set(self, number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
	return randomHashCache.get(self);
};
/**
* @since 2.0.0
* @category hashing
*/
const combine = (b) => (self) => self * 53 ^ b;
/**
* @since 2.0.0
* @category hashing
*/
const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
/**
* @since 2.0.0
* @category guards
*/
const isHash = (u) => hasProperty(u, symbol$1);
/**
* @since 2.0.0
* @category hashing
*/
const number = (n) => {
	if (n !== n || n === Infinity) return 0;
	let h = n | 0;
	if (h !== n) h ^= n * 4294967295;
	while (n > 4294967295) h ^= n /= 4294967295;
	return optimize(h);
};
/**
* @since 2.0.0
* @category hashing
*/
const string = (str) => {
	let h = 5381, i = str.length;
	while (i) h = h * 33 ^ str.charCodeAt(--i);
	return optimize(h);
};
/**
* @since 2.0.0
* @category hashing
*/
const structureKeys = (o, keys) => {
	let h = 12289;
	for (let i = 0; i < keys.length; i++) h ^= pipe(string(keys[i]), combine(hash(o[keys[i]])));
	return optimize(h);
};
/**
* @since 2.0.0
* @category hashing
*/
const structure = (o) => structureKeys(o, Object.keys(o));
/**
* @since 2.0.0
* @category hashing
*/
const cached = function() {
	if (arguments.length === 1) {
		const self$1 = arguments[0];
		return function(hash$2) {
			Object.defineProperty(self$1, symbol$1, {
				value() {
					return hash$2;
				},
				enumerable: false
			});
			return hash$2;
		};
	}
	const self = arguments[0];
	const hash$1 = arguments[1];
	Object.defineProperty(self, symbol$1, {
		value() {
			return hash$1;
		},
		enumerable: false
	});
	return hash$1;
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Equal.js
/**
* @since 2.0.0
* @category symbols
*/
const symbol = /* @__PURE__ */ Symbol.for("effect/Equal");
function equals() {
	if (arguments.length === 1) return (self) => compareBoth(self, arguments[0]);
	return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
	if (self === that) return true;
	const selfType = typeof self;
	if (selfType !== typeof that) return false;
	if (selfType === "object" || selfType === "function") {
		if (self !== null && that !== null) {
			if (isEqual(self) && isEqual(that)) if (hash(self) === hash(that) && self[symbol](that)) return true;
			else return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
			else if (self instanceof Date && that instanceof Date) return self.toISOString() === that.toISOString();
			else if (self instanceof URL && that instanceof URL) return self.href === that.href;
		}
		if (structuralRegionState.enabled) {
			if (Array.isArray(self) && Array.isArray(that)) return self.length === that.length && self.every((v, i) => compareBoth(v, that[i]));
			if (Object.getPrototypeOf(self) === Object.prototype && Object.getPrototypeOf(self) === Object.prototype) {
				const keysSelf = Object.keys(self);
				const keysThat = Object.keys(that);
				if (keysSelf.length === keysThat.length) {
					for (const key of keysSelf) if (!(key in that && compareBoth(self[key], that[key]))) return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
					return true;
				}
			}
			return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
		}
	}
	return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
}
/**
* @since 2.0.0
* @category guards
*/
const isEqual = (u) => hasProperty(u, symbol);

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Inspectable.js
/**
* @since 2.0.0
* @category symbols
*/
const NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
/**
* @since 2.0.0
*/
const toJSON = (x) => {
	try {
		if (hasProperty(x, "toJSON") && isFunction$1(x["toJSON"]) && x["toJSON"].length === 0) return x.toJSON();
		else if (Array.isArray(x)) return x.map(toJSON);
	} catch {
		return {};
	}
	return redact(x);
};
/**
* @since 2.0.0
*/
const format = (x) => JSON.stringify(x, null, 2);
/**
* @since 2.0.0
*/
const BaseProto = {
	toJSON() {
		return toJSON(this);
	},
	[NodeInspectSymbol]() {
		return this.toJSON();
	},
	toString() {
		return format(this.toJSON());
	}
};
/**
* @since 2.0.0
*/
var Class = class {
	/**
	* @since 2.0.0
	*/
	[NodeInspectSymbol]() {
		return this.toJSON();
	}
	/**
	* @since 2.0.0
	*/
	toString() {
		return format(this.toJSON());
	}
};
/**
* @since 3.10.0
* @category redactable
*/
const symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
/**
* @since 3.10.0
* @category redactable
*/
const isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
const redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({ fiberRefs: void 0 }));
/**
* @since 3.10.0
* @category redactable
*/
const redact = (u) => {
	if (isRedactable(u) && redactableState.fiberRefs !== void 0) return u[symbolRedactable](redactableState.fiberRefs);
	return u;
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Pipeable.js
/**
* @since 2.0.0
*/
/**
* @since 2.0.0
*/
const pipeArguments = (self, args) => {
	switch (args.length) {
		case 0: return self;
		case 1: return args[0](self);
		case 2: return args[1](args[0](self));
		case 3: return args[2](args[1](args[0](self)));
		case 4: return args[3](args[2](args[1](args[0](self))));
		case 5: return args[4](args[3](args[2](args[1](args[0](self)))));
		case 6: return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
		case 7: return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
		case 8: return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
		case 9: return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
		default: {
			let ret = self;
			for (let i = 0, len = args.length; i < len; i++) ret = args[i](ret);
			return ret;
		}
	}
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/internal/opCodes/effect.js
/** @internal */
const OP_COMMIT = "Commit";

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/internal/version.js
let moduleVersion = "3.17.8";
const getCurrentVersion = () => moduleVersion;

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/internal/effectable.js
/** @internal */
const EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
/** @internal */
const StreamTypeId = /* @__PURE__ */ Symbol.for("effect/Stream");
/** @internal */
const SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
/** @internal */
const ChannelTypeId = /* @__PURE__ */ Symbol.for("effect/Channel");
/** @internal */
const effectVariance = {
	_R: (_) => _,
	_E: (_) => _,
	_A: (_) => _,
	_V: /* @__PURE__ */ getCurrentVersion()
};
const sinkVariance = {
	_A: (_) => _,
	_In: (_) => _,
	_L: (_) => _,
	_E: (_) => _,
	_R: (_) => _
};
const channelVariance = {
	_Env: (_) => _,
	_InErr: (_) => _,
	_InElem: (_) => _,
	_InDone: (_) => _,
	_OutErr: (_) => _,
	_OutElem: (_) => _,
	_OutDone: (_) => _
};
/** @internal */
const EffectPrototype = {
	[EffectTypeId]: effectVariance,
	[StreamTypeId]: effectVariance,
	[SinkTypeId]: sinkVariance,
	[ChannelTypeId]: channelVariance,
	[symbol](that) {
		return this === that;
	},
	[symbol$1]() {
		return cached(this, random(this));
	},
	[Symbol.iterator]() {
		return new SingleShotGen(new YieldWrap(this));
	},
	pipe() {
		return pipeArguments(this, arguments);
	}
};
/** @internal */
const StructuralPrototype = {
	[symbol$1]() {
		return cached(this, structure(this));
	},
	[symbol](that) {
		const selfKeys = Object.keys(this);
		const thatKeys = Object.keys(that);
		if (selfKeys.length !== thatKeys.length) return false;
		for (const key of selfKeys) if (!(key in that && equals(this[key], that[key]))) return false;
		return true;
	}
};
/** @internal */
const CommitPrototype = {
	...EffectPrototype,
	_op: OP_COMMIT
};
/** @internal */
const StructuralCommitPrototype = {
	...CommitPrototype,
	...StructuralPrototype
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/internal/option.js
const TypeId$1 = /* @__PURE__ */ Symbol.for("effect/Option");
const CommonProto$1 = {
	...EffectPrototype,
	[TypeId$1]: { _A: (_) => _ },
	[NodeInspectSymbol]() {
		return this.toJSON();
	},
	toString() {
		return format(this.toJSON());
	}
};
const SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
	_tag: "Some",
	_op: "Some",
	[symbol](that) {
		return isOption$1(that) && isSome$1(that) && equals(this.value, that.value);
	},
	[symbol$1]() {
		return cached(this, combine(hash(this._tag))(hash(this.value)));
	},
	toJSON() {
		return {
			_id: "Option",
			_tag: this._tag,
			value: toJSON(this.value)
		};
	}
});
const NoneHash = /* @__PURE__ */ hash("None");
const NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
	_tag: "None",
	_op: "None",
	[symbol](that) {
		return isOption$1(that) && isNone$1(that);
	},
	[symbol$1]() {
		return NoneHash;
	},
	toJSON() {
		return {
			_id: "Option",
			_tag: this._tag
		};
	}
});
/** @internal */
const isOption$1 = (input) => hasProperty(input, TypeId$1);
/** @internal */
const isNone$1 = (fa) => fa._tag === "None";
/** @internal */
const isSome$1 = (fa) => fa._tag === "Some";
/** @internal */
const none$1 = /* @__PURE__ */ Object.create(NoneProto);
/** @internal */
const some$1 = (value) => {
	const a = Object.create(SomeProto);
	a.value = value;
	return a;
};

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/internal/either.js
/**
* @internal
*/
const TypeId = /* @__PURE__ */ Symbol.for("effect/Either");
const CommonProto = {
	...EffectPrototype,
	[TypeId]: { _R: (_) => _ },
	[NodeInspectSymbol]() {
		return this.toJSON();
	},
	toString() {
		return format(this.toJSON());
	}
};
const RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
	_tag: "Right",
	_op: "Right",
	[symbol](that) {
		return isEither(that) && isRight(that) && equals(this.right, that.right);
	},
	[symbol$1]() {
		return combine(hash(this._tag))(hash(this.right));
	},
	toJSON() {
		return {
			_id: "Either",
			_tag: this._tag,
			right: toJSON(this.right)
		};
	}
});
const LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
	_tag: "Left",
	_op: "Left",
	[symbol](that) {
		return isEither(that) && isLeft(that) && equals(this.left, that.left);
	},
	[symbol$1]() {
		return combine(hash(this._tag))(hash(this.left));
	},
	toJSON() {
		return {
			_id: "Either",
			_tag: this._tag,
			left: toJSON(this.left)
		};
	}
});
/** @internal */
const isEither = (input) => hasProperty(input, TypeId);
/** @internal */
const isLeft = (ma) => ma._tag === "Left";
/** @internal */
const isRight = (ma) => ma._tag === "Right";
/** @internal */
const getLeft$1 = (self) => isRight(self) ? none$1 : some$1(self.left);
/** @internal */
const getRight$1 = (self) => isLeft(self) ? none$1 : some$1(self.right);

//#endregion
//#region ../../node_modules/.pnpm/effect@3.17.8/node_modules/effect/dist/esm/Option.js
/**
* Represents the absence of a value by creating an empty `Option`.
*
* `Option.none` returns an `Option<never>`, which is a subtype of `Option<A>`.
* This means you can use it in place of any `Option<A>` regardless of the type
* `A`.
*
* **Example** (Creating an Option with No Value)
*
* ```ts
* import { Option } from "effect"
*
* // An Option holding no value
* //
* //      ┌─── Option<never>
* //      ▼
* const noValue = Option.none()
*
* console.log(noValue)
* // Output: { _id: 'Option', _tag: 'None' }
* ```
*
* @see {@link some} for the opposite operation.
*
* @category Constructors
* @since 2.0.0
*/
const none = () => none$1;
/**
* Wraps the given value into an `Option` to represent its presence.
*
* **Example** (Creating an Option with a Value)
*
* ```ts
* import { Option } from "effect"
*
* // An Option holding the number 1
* //
* //      ┌─── Option<number>
* //      ▼
* const value = Option.some(1)
*
* console.log(value)
* // Output: { _id: 'Option', _tag: 'Some', value: 1 }
* ```
*
* @see {@link none} for the opposite operation.
*
* @category Constructors
* @since 2.0.0
*/
const some = some$1;
/**
* Determines whether the given value is an `Option`.
*
* **Details**
*
* This function checks if a value is an instance of `Option`. It returns `true`
* if the value is either `Option.some` or `Option.none`, and `false` otherwise.
* This is particularly useful when working with unknown values or when you need
* to ensure type safety in your code.
*
* @example
* ```ts
* import { Option } from "effect"
*
* console.log(Option.isOption(Option.some(1)))
* // Output: true
*
* console.log(Option.isOption(Option.none()))
* // Output: true
*
* console.log(Option.isOption({}))
* // Output: false
* ```
*
* @category Guards
* @since 2.0.0
*/
const isOption = isOption$1;
/**
* Checks whether an `Option` represents the absence of a value (`None`).
*
* @example
* ```ts
* import { Option } from "effect"
*
* console.log(Option.isNone(Option.some(1)))
* // Output: false
*
* console.log(Option.isNone(Option.none()))
* // Output: true
* ```
*
* @see {@link isSome} for the opposite check.
*
* @category Guards
* @since 2.0.0
*/
const isNone = isNone$1;
/**
* Checks whether an `Option` contains a value (`Some`).
*
* @example
* ```ts
* import { Option } from "effect"
*
* console.log(Option.isSome(Option.some(1)))
* // Output: true
*
* console.log(Option.isSome(Option.none()))
* // Output: false
* ```
*
* @see {@link isNone} for the opposite check.
*
* @category Guards
* @since 2.0.0
*/
const isSome = isSome$1;
/**
* Converts an `Either` into an `Option` by discarding the error and extracting
* the right value.
*
* **Details**
*
* This function takes an `Either` and returns an `Option` based on its value:
*
* - If the `Either` is a `Right`, its value is wrapped in a `Some` and
*   returned.
* - If the `Either` is a `Left`, the error is discarded, and `None` is
*   returned.
*
* This is particularly useful when you only care about the success case
* (`Right`) of an `Either` and want to handle the result using `Option`. By
* using this function, you can convert `Either` into a simpler structure for
* cases where error handling is not required.
*
* @example
* ```ts
* import { Either, Option } from "effect"
*
* console.log(Option.getRight(Either.right("ok")))
* // Output: { _id: 'Option', _tag: 'Some', value: 'ok' }
*
* console.log(Option.getRight(Either.left("err")))
* // Output: { _id: 'Option', _tag: 'None' }
* ```
*
* @see {@link getLeft} for the opposite operation.
*
* @category Conversions
* @since 2.0.0
*/
const getRight = getRight$1;
/**
* Converts an `Either` into an `Option` by discarding the right value and
* extracting the left value.
*
* **Details**
*
* This function transforms an `Either` into an `Option` as follows:
*
* - If the `Either` is a `Left`, its value is wrapped in a `Some` and returned.
* - If the `Either` is a `Right`, the value is discarded, and `None` is
*   returned.
*
* This utility is useful when you only care about the error case (`Left`) of an
* `Either` and want to handle it as an `Option`. By discarding the right value,
* it simplifies error-focused workflows.
*
* @example
* ```ts
* import { Either, Option } from "effect"
*
* console.log(Option.getLeft(Either.right("ok")))
* // Output: { _id: 'Option', _tag: 'None' }
*
* console.log(Option.getLeft(Either.left("err")))
* // Output: { _id: 'Option', _tag: 'Some', value: 'err' }
* ```
*
* @see {@link getRight} for the opposite operation.
*
* @category Conversions
* @since 2.0.0
*/
const getLeft = getLeft$1;
/**
* Transforms the value inside a `Some` to a new value using the provided
* function, while leaving `None` unchanged.
*
* **Details**
*
* This function applies a mapping function `f` to the value inside an `Option`
* if it is a `Some`. If the `Option` is `None`, it remains unchanged. The
* result is a new `Option` with the transformed value (if it was a `Some`) or
* still `None`.
*
* This utility is particularly useful for chaining transformations in a
* functional way without needing to manually handle `None` cases.
*
* @example
* ```ts
* import { Option } from "effect"
*
* // Mapping over a `Some`
* const someValue = Option.some(2)
*
* console.log(Option.map(someValue, (n) => n * 2))
* // Output: { _id: 'Option', _tag: 'Some', value: 4 }
*
* // Mapping over a `None`
* const noneValue = Option.none<number>()
*
* console.log(Option.map(noneValue, (n) => n * 2))
* // Output: { _id: 'Option', _tag: 'None' }
* ```
*
* @category Mapping
* @since 2.0.0
*/
const map = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none() : some(f(self.value)));

//#endregion
//#region src/rules/prefer-eqeq-nullish-comparison.ts
/**
* Prefer using `==` or `!=` for nullish comparison instead of `===` or `!==`.
*
* @since 0.0.0
*/
const preferEqEqNullishComparison = defineRule(() => ({
	name: "local/preferEqEqNullishComparison",
	visitor: { BinaryExpression(context, node) {
		if (!isNullOrUndefined(node.left) && !isNullOrUndefined(node.right)) return;
		pipe(match(node.operatorToken.kind).with(SyntaxKind.EqualsEqualsEqualsToken, () => some("==")).with(SyntaxKind.ExclamationEqualsEqualsToken, () => some("!=")).otherwise(none), map((operator) => ({
			message: `Use '${operator}' for nullish comparison.`,
			node
		})), map(context.report));
	} }
}));
function isNullOrUndefined(node) {
	switch (node.kind) {
		case SyntaxKind.NullKeyword: return true;
		case SyntaxKind.Identifier: return node.escapedText === "undefined";
		default: return false;
	}
}

//#endregion
export { preferEqEqNullishComparison };