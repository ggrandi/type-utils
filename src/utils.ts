/**
 * makes a type more readable
 * ```
 * type T = ToReadable<{ a: 1; } & ({ b: 2; } | { c: 3; })> // => { a: 1; b: 2; } | {  a: 1; c: 3; }
 * ```
 */
export type ToReadable<T> = T extends Record<string, unknown> ? { [K in keyof T]: ToReadable<T[K]> } : T;

/** Makes a type optional */
export type Optional<T> = { t?: T }["t"];

/**
 * transforms a union to an intersection
 * ```
 * type T = UnionToIntersection<{ a: number} | { b: string }> // => {a: number, b: string}
 * ```
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/** returns whether a given type is a union */
export type IsUnion<U> = [U] extends [UnionToIntersection<U>] ? false : true;

/** returns whether a given type is never */
export type IsNever<T> = [T] extends [never] ? true : false;

/** returns whether a given type is any */
export type IsAny<T> = 1 extends 0 & T ? true : false;

/**
 * transforms a union type into a tuple
 * ```
 * type T = UnionToTuple<1 | 2 | 3 | 4> // => [1, 2, 3, 4]
 * ```
 */
export type UnionToTuple<T, R extends unknown[] = []> = [T] extends [never]
  ? R
  : UnionToTuple<Exclude<T, LastOfUnion<T>>, [LastOfUnion<T>, ...R]>;

type LastOfUnion<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R ? R : never;
