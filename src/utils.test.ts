import type { Alike, Equal, Expect, ExpectFalse } from "./testing.ts";
import type { IsAny, IsNever, IsUnion, Optional, ToReadable, UnionToIntersection, UnionToTuple } from "./utils.ts";

export declare const cases: {
  IsAny: [
    ExpectFalse<IsAny<number>>,
    ExpectFalse<IsAny<string>>,
    ExpectFalse<IsAny<boolean>>,
    ExpectFalse<IsAny<Record<string, unknown>>>,
    ExpectFalse<IsAny<unknown>>,
    // deno-lint-ignore no-explicit-any
    Expect<IsAny<any>>
  ];

  IsNever: [
    Expect<IsNever<never>>,
    ExpectFalse<IsNever<number>>,
    ExpectFalse<IsNever<string>>,
    ExpectFalse<IsNever<boolean>>,
    ExpectFalse<IsNever<Record<string, unknown>>>,
    ExpectFalse<IsNever<unknown>>
  ];

  IsUnion: [
    Expect<IsUnion<1 | 2 | 3 | 4>>,
    Expect<IsUnion<boolean>>,
    ExpectFalse<IsUnion<number>>,
    ExpectFalse<IsUnion<string>>,
    ExpectFalse<IsUnion<Record<string, unknown>>>,
    ExpectFalse<IsUnion<unknown>>
  ];

  Optional: [
    Expect<Equal<Optional<number>, number | undefined>>,
    Expect<Equal<Optional<string>, string | undefined>>,
    Expect<Equal<Optional<boolean>, boolean | undefined>>,
    Expect<Equal<Optional<Record<string, unknown>>, Record<string, unknown> | undefined>>,
    Expect<Equal<Optional<unknown>, unknown | undefined>>
  ];

  ToReadable: [
    Expect<Equal<ToReadable<{ a: 1 } & ({ b: 2 } | { c: 3 })>, { a: 1; b: 2 } | { a: 1; c: 3 }>>,
    Expect<Equal<ToReadable<number>, number>>,
    Expect<Equal<ToReadable<string>, string>>,
    Expect<Equal<ToReadable<boolean>, boolean>>,
    Expect<Equal<ToReadable<Record<string, unknown>>, Record<string, unknown>>>,
    Expect<Equal<ToReadable<unknown>, unknown>>,
    Expect<Equal<ToReadable<{ a: 1 } & { b: 2 } & { c: 3 }>, { a: 1; b: 2; c: 3 }>>
  ];

  UnionToIntersection: [
    Expect<Equal<UnionToIntersection<1 | 2 | 3 | 4>, 1 & 2 & 3 & 4>>,
    Expect<Equal<UnionToIntersection<boolean>, true & false>>,
    Expect<Equal<UnionToIntersection<number>, number>>,
    Expect<Equal<UnionToIntersection<string>, string>>,
    Expect<Equal<UnionToIntersection<Record<string, unknown>>, Record<string, unknown>>>,
    Expect<Equal<UnionToIntersection<unknown>, unknown>>,
    Expect<Alike<UnionToIntersection<{ a: 1 } & { b: 2 } & { c: 3 }>, { a: 1; b: 2; c: 3 }>>
  ];

  UnionToTuple: [
    Expect<Equal<UnionToTuple<boolean>, [false, true]>>,
    Expect<Alike<UnionToTuple<number>, [number]>>,
    Expect<Alike<UnionToTuple<string>, [string]>>,
    Expect<Alike<UnionToTuple<Record<string, unknown>>, [Record<string, unknown>]>>,
    Expect<Alike<UnionToTuple<unknown>, [unknown]>>,
    Expect<Alike<UnionToTuple<{ a: 1 } | { b: 2 } | { c: 3 }>, [{ a: 1 }, { b: 2 }, { c: 3 }]>>
  ];
};
