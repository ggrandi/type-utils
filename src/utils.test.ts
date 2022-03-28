import type { Alike, Equal, Expect, ExpNot } from "./testing.ts";
import type {
  IsAny,
  IsNever,
  IsUnion,
  Optional,
  ToReadable,
  UnionToIntersection,
  UnionToTuple,
  RecursiveRecord,
} from "./utils.ts";

export declare const cases: {
  IsAny: [
    ExpNot<IsAny<number>>,
    ExpNot<IsAny<string>>,
    ExpNot<IsAny<boolean>>,
    ExpNot<IsAny<Record<string, unknown>>>,
    ExpNot<IsAny<unknown>>,
    // deno-lint-ignore no-explicit-any
    Expect<IsAny<any>>
  ];

  IsNever: [
    Expect<IsNever<never>>,
    Expect<IsNever<never & 1>>,
    ExpNot<IsNever<number>>,
    ExpNot<IsNever<string>>,
    ExpNot<IsNever<boolean>>,
    ExpNot<IsNever<Record<string, unknown>>>,
    ExpNot<IsNever<unknown>>
  ];

  IsUnion: [
    Expect<IsUnion<1 | 2 | 3 | 4>>,
    Expect<IsUnion<boolean>>,
    ExpNot<IsUnion<number>>,
    ExpNot<IsUnion<string>>,
    ExpNot<IsUnion<Record<string, unknown>>>,
    ExpNot<IsUnion<unknown | true>>,
    // deno-lint-ignore no-explicit-any
    ExpNot<IsUnion<any | true>>
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
    Expect<Equal<UnionToIntersection<1 | 2 | 3 | 4>, never>>,
    Expect<Equal<UnionToIntersection<boolean>, never>>,
    Expect<Equal<UnionToIntersection<number>, number>>,
    Expect<Equal<UnionToIntersection<string>, string>>,
    Expect<
      Alike<UnionToIntersection<Record<string, unknown> | Record<number, unknown>>, Record<string | number, unknown>>
    >,
    Expect<Equal<UnionToIntersection<unknown>, unknown>>,
    Expect<Alike<UnionToIntersection<{ a: 1 } | { b: 2 } | { c: 3 }>, { a: 1; b: 2; c: 3 }>>
  ];

  UnionToTuple: [
    Expect<Equal<UnionToTuple<boolean>, [false, true]>>,
    Expect<Equal<UnionToTuple<number>, [number]>>,
    Expect<Equal<UnionToTuple<string>, [string]>>,
    Expect<Equal<UnionToTuple<Record<string, unknown>>, [Record<string, unknown>]>>,
    Expect<Equal<UnionToTuple<unknown>, [unknown]>>,
    Expect<Equal<UnionToTuple<{ a: 1 } | { b: 2 } | { c: 3 }>, [{ a: 1 }, { b: 2 }, { c: 3 }]>>
  ];

  RecursiveRecord: [
    Expect<Equal<RecursiveRecord<string, number>[string], number | RecursiveRecord<string, number>>>,
    Expect<IsUnion<RecursiveRecord<symbol, boolean>[symbol]>>
  ];
};
