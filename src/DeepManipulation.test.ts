import type { Equal, Expect, NotEq } from "./testing.ts";
import type { DeepPick, DeepOmit } from "./DeepManipulation.ts";

type TestObj = {
  a: 1;
  b?: 2;
  c: {
    d: 3;
    e?: 4;
  };
  f?: {
    g: 5;
    h?: 6;
    i: {
      j: 7;
      k?: 8;
      l: 9;
    };
  };
};

export declare const cases: {
  DeepPick: [
    Expect<Equal<DeepPick<TestObj, "c.d">, { c: { d: 3 } }>>,
    Expect<Equal<DeepPick<TestObj, "c.e" | "f.i.k">, { c: { e?: 4 }; f?: { i: { k?: 8 } } }>>,
    Expect<Equal<DeepPick<TestObj, "f.i.k" | "f.i.l">, { f?: { i: { k?: 8; l: 9 } } }>>,
    Expect<Equal<DeepPick<TestObj, "f.i.k" | "f.i.l" | "f.i.j">, DeepPick<TestObj, "f.i">>>,
    Expect<Equal<DeepPick<TestObj, "a">, { a: 1 }>>,

    Expect<NotEq<DeepPick<TestObj, "b">, { b: 2 }>>,
    Expect<NotEq<DeepPick<TestObj, "c.e">, { c: { e: 4 } }>>
  ];

  DeepOmit: [
    Expect<Equal<DeepOmit<TestObj, "f" | "f.i.j">, DeepOmit<TestObj, "f">>>,
    Expect<Equal<DeepOmit<TestObj, "f">, Omit<TestObj, "f">>>,

    Expect<NotEq<DeepOmit<TestObj, "c.d" | "c.e">, DeepOmit<TestObj, "c">>>
  ];
};
