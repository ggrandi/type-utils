// import { ToReadable } from "./utils.ts";

export type Expect<T extends true> = T;
export type ExpectFalse<T extends false> = T extends false ? true : false;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
export type Alike<X, Y> = X extends Y ? (Y extends X ? true : false) : false;
