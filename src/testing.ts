// import { ToReadable } from "./utils.ts";

/**
 * Expect a condition to be true
 * ```
 * type T = Expect<true>; // passes
 * type U = Expect<false>; // typescript error
 * ```
 */
export type Expect<T extends true> = T;

/**
 * Expect a condition to be false
 * ```
 * type U = Expect<false>; // passes
 * type T = Expect<true>; // typescript error
 * ```
 */
export type ExpNot<T extends false> = Expect<Not<T>>;

/**
 * Checks that `X` and `Y` are equal
 * ```
 * type T = Equal<1, 1>; -> true
 * type U = Equal<1, 2>; -> false
 * ```
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/**
 * Checks that `X` and `Y` are not equal
 * ```
 * type T = NotEq<1, 2>; -> true
 * type U = NotEq<1, 1>; -> false
 * ```
 */
export type NotEq<X, Y> = Not<Equal<X, Y>>;

/** 
 * Checks that `X` and `Y` are similar 
 * ```
 * type T = Alike<1, 1>; -> true
 * type U = Alike<1, 2>; -> // typescript error
 * type V = Alike<1, number>; -> false
 * ```
 */
export type Alike<X extends Y, Y> = X extends Y ? (Y extends X ? true : false) : false;

/**
 * Returns the opposite of `T`
 * ```
 * type T = Not<true>; -> false
 * type U = Not<false>; -> true
 * ```
 */
export type Not<T extends boolean> = T extends true ? false : true;
