/**
 * converts a given string into a character array
 * ```
 * type T = StrToChars<"hello">;
 * -> ["h", "e", "l", "l", "o"]
 * ```
 * @see CharsToStr
 */
export type StrToChars<Str extends string, Chars extends string[] = []> = Str extends `${infer Char}${infer Rest}`
  ? StrToChars<Rest, [...Chars, Char]>
  : Chars;

/**
 * converts an array of characters into a string
 * ```
 * type T = CharsToStr<["h", "e", "l", "l", "o"]>;
 * -> "hello"
 * ```
 * @see StrToChars
 */
export type CharsToStr<Chars extends string[], Str extends string = ""> = Chars extends [infer Next, ...infer Rest]
  ? Rest extends string[]
    ? Next extends string
      ? CharsToStr<Rest, `${Str}${Next}`>
      : never
    : never
  : Str;

/**
 * Gets the last value from an array
 * ```
 * type T = Last<[1, 2, 3, 4]>;
 * -> 4
 * ```
 */
export type Last<T extends unknown[]> = T extends [...infer _Rest, infer L] ? L : T[0];

/**
 * gets a map entry
 * ```
 * type M = Map<string, number>
 * type T = MapEntry<M>;
 * -> [string, number]
 * ```
 */
export type MapEntry<T extends Map<unknown, unknown>> = T extends Map<infer K, infer V> ? [K, V] : never;
