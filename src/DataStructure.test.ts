import type { Equal, Expect, NotEq } from "./testing.ts";
import type { CharsToStr, Last, MapEntry, StrToChars } from "./DataStructure.ts";

export declare const cases: {
  CharsToStr: [
    Expect<Equal<CharsToStr<["h", "e", "l", "l", "o"]>, "hello">>,
    //@ts-expect-error fail: only accepts strings
    Expect<NotEq<CharsToStr<[1, boolean, null, { a: 1 }]>, "1234">>
  ];

  StrToChars: [
    Expect<Equal<StrToChars<"hello">, ["h", "e", "l", "l", "o"]>>,
    Expect<Equal<StrToChars<"1234">, ["1", "2", "3", "4"]>>,
    //@ts-expect-error fail: only accepts strings
    Expect<NotEq<StrToChars<1234>, ["1", "2", "3", "4"]>>
  ];

  "StrToChars <-> CharsToStr": [
    Expect<Equal<StrToChars<CharsToStr<["h", "e", "l", "l", "o"]>>, ["h", "e", "l", "l", "o"]>>,
    Expect<Equal<CharsToStr<StrToChars<"hello">>, "hello">>,
    Expect<Equal<CharsToStr<StrToChars<"1234">>, "1234">>,
    Expect<Equal<CharsToStr<StrToChars<CharsToStr<StrToChars<CharsToStr<StrToChars<"1234">>>>>>, "1234">>,
    //@ts-expect-error fail: only accepts strings
    Expect<NotEq<StrToChars<CharsToStr<[1, boolean, null, { a: 1 }]>>, "1234">>
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
};
