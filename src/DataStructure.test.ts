import type { Equal, Expect, ExpectFalse } from "./testing.ts";
import type { CharsToStr, Last, MapEntry, StrToChars } from "./DataStructure.ts";

export declare const cases: {
  CharsToStr: [
    Expect<Equal<CharsToStr<["h", "e", "l", "l", "o"]>, "hello">>,
    //@ts-expect-error fail: only accepts strings
    ExpectFalse<Equal<CharsToStr<[1, boolean, null, { a: 1 }]>, "1234">>
  ];

  Last: [
    Expect<Equal<Last<["h", "e", "l", "l", "o"]>, "o">>,
    Expect<Equal<Last<[1, 2, 3, 4]>, 4>>,
    Expect<Equal<Last<[true, false]>, false>>,
    Expect<Equal<Last<[{ a: 1 }, { b: 2 }]>, { b: 2 }>>,
    Expect<Equal<Last<[undefined, null]>, null>>
  ];

  MapEntry: [
    Expect<Equal<MapEntry<Map<string, number>>, [string, number]>>,
    Expect<Equal<MapEntry<Map<string, boolean>>, [string, boolean]>>,
    Expect<Equal<MapEntry<Map<string, Record<string, unknown>>>, [string, Record<string, unknown>]>>,
    Expect<Equal<MapEntry<Map<string, unknown>>, [string, unknown]>>,
    Expect<Equal<MapEntry<Map<number, string>>, [number, string]>>
  ];

  StrToChars: [
    Expect<Equal<StrToChars<"hello">, ["h", "e", "l", "l", "o"]>>,
    //@ts-expect-error fail: only accepts strings
    ExpectFalse<Equal<StrToChars<1234>, ["1", "2", "3", "4"]>>,
    Expect<Equal<StrToChars<"1234">, ["1", "2", "3", "4"]>>
  ];
};
