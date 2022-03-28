import type { Equal, Expect, ExpNot, NotEq, Alike, Not } from "./testing.ts";

export declare const cases: {
  Expect: [
    Expect<true>,
    //@ts-expect-error fails: expected true, got false
    Not<Expect<false>>
  ];

  Not: [
    Expect<Not<false>>,
    Expect<Not<Not<true>>>,

    //@ts-expect-error fails: expected true, got false
    Not<Expect<Not<true>>>,
    //@ts-expect-error fails: expected true, got false
    Not<Expect<Not<Not<false>>>>
  ];

  ExpNot: [
    ExpNot<false>,
    //@ts-expect-error fails: expected false, got true
    Not<ExpNot<true>>
  ];

  Equal: [
    Expect<Equal<1, 1>>,
    Expect<Equal<"a", "a">>,
    Expect<Equal<{ a: number }, { a: number }>>,
    ExpNot<Equal<1, 2>>,
    ExpNot<Equal<"a", "b">>,
    ExpNot<Equal<{ a: number }, { a: string }>>
  ];

  NotEq: [
    Expect<NotEq<1, 2>>,
    Expect<NotEq<"a", "b">>,
    Expect<NotEq<{ a: number }, { a: string }>>,
    ExpNot<NotEq<1, 1>>,
    ExpNot<NotEq<"a", "a">>,
    ExpNot<NotEq<{ a: number }, { a: number }>>
  ];

  Alike: [
    Expect<Alike<{ a: 1 }, { a: 1 }>>,
    Expect<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>,
    //@ts-expect-error fails: X doesn't extend Y
    ExpNot<Alike<{ a: 1 }, { a: 2 }>>,
    //@ts-expect-error fails: X doesn't extend Y
    ExpNot<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 3 }>>,
    ExpNot<Alike<{ a: 1 } & { b: 2 }, { a: 1 }>>
  ];
};
