import type { Equal, Expect, ExpectFalse, NotEqual, Alike } from "./testing.ts";

export declare const cases: {
  Expect: [
    Expect<true>,
    //@ts-expect-error failing test case
    Expect<false>
  ];

  ExpectFalse: [
    ExpectFalse<false>,
    //@ts-expect-error failing test case
    ExpectFalse<true>
  ];

  Equal: [
    Expect<Equal<1, 1>>,
    Expect<Equal<"a", "a">>,
    Expect<Equal<{ a: number }, { a: number }>>,
    ExpectFalse<Equal<1, 2>>,
    ExpectFalse<Equal<"a", "b">>,
    ExpectFalse<Equal<{ a: number }, { a: string }>>
  ];

  NotEqual: [
    Expect<NotEqual<1, 2>>,
    Expect<NotEqual<"a", "b">>,
    Expect<NotEqual<{ a: number }, { a: string }>>,
    ExpectFalse<NotEqual<1, 1>>,
    ExpectFalse<NotEqual<"a", "a">>,
    ExpectFalse<NotEqual<{ a: number }, { a: number }>>
  ];

  Alike: [
    Expect<Alike<{ a: 1 }, { a: 1 }>>,
    Expect<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>>,
    ExpectFalse<Alike<{ a: 1 }, { a: 2 }>>,
    ExpectFalse<Alike<{ a: 1 } & { b: 2 }, { a: 1; b: 3 }>>
  ];
};
