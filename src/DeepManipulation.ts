import { IsNever, ToReadable, UnionToIntersection } from "./mod.ts";

/**
 * Allows you to deeply pick values
 * ```
 * type Obj = { a: { b: { c: 1 }; d?: { e: 2; f: 3 } } }
 * type R1 = DeepPick<Obj, "a.b"> // => { a: { b: { c: 1 }}}
 * type R2 = DeepPick<Obj, "a.b" | "a.d.e">
 * // => { a: { b: { c: 1 }; d?: { e: 2 } | undefined } }
 * ```
 * @see Pick
 */
export type DeepPick<T, K extends DeepKey<T>> = ToReadable<UnionToIntersection<DeepPickOne<T, K>>>;

type DeepKey<T, Prepend extends string = ""> = T extends Record<string, unknown>
  ? {
      [K in Extract<keyof T, string>]: `${Prepend}${K}` | `${Prepend}${K}${DeepKey<T[K], ".">}`;
    }[Extract<keyof T, string>]
  : "";

type DeepPickOne<T, K extends string> =
  // checks to see if there is a nested key
  K extends `${infer Key}.${infer Rest}`
    ? // check if the key is actually a key in the object
      Key extends keyof T
      ? // check if the key is optional
        T[Key] extends Required<T>[Key]
        ? { [TKey in Key]: DeepPickOne<T[TKey], Rest> }
        : { [TKey in Key]?: DeepPickOne<Required<T>[TKey], Rest> }
      : { [TKey in Key]: unknown }
    : // if there is no nested key, check if the key is a key in the object
    K extends keyof T
    ? // check if the key is optional
      T[K] extends Required<T>[K]
      ? { [TKey in K]: T[K] }
      : { [TKey in K]?: T[K] }
    : unknown;

type DeepKeyToObj<K extends DeepKey<Record<string, unknown>>> = UnionToIntersection<
  K extends `${infer Key}.${infer Rest}` ? { [TKey in Key]: DeepKeyToObj<Rest> } : { [TKey in K]: never }
>;

/**
 * Deeply omits values from an object
 * ```
 * type Obj = { a: { b: { c: 1 }; d?: { e: 2; f: 3 } } }
 * type R1 = DeepOmit<Obj, "a.b"> // => { a: { d?: { e: 2; f: 3 } } }
 * type R2 = DeepOmit<Obj, "a.b" | "a.d.e">
 * // => { a: { d?: { f: 3 } | undefined } }
 * ```
 * @see Omit
 */
export type DeepOmit<T, K extends DeepKey<T>> = ToReadable<DeepOmitHelper<T, DeepKeyToObj<K>>>;

type DeepOmitHelper<T, KeyObj> = {
  // omits all the required attributes from the object
  [Key in Extract<keyof T, string> as T[Key] extends Required<T>[Key]
    ? // checks if it is in the key object of keys to omit
      Key extends keyof KeyObj
      ? // if it is in the key object as never, omit it
        IsNever<KeyObj[Key]> extends true
        ? never
        : // if it needs to be omitted, leave it
          Key
      : Key
    : never]: Key extends keyof KeyObj // if it is in the key object, pass it to be handled later
    ? DeepOmitHelper<T[Key], KeyObj[Key]>
    : // if it doesnt need to be omitted leave it as is
      T[Key];
} & {
  // omits all the partial attributes from the object
  //                                  checks if it is a partial attribute
  [Key in Extract<keyof T, string> as T[Key] extends Required<T>[Key]
    ? never
    : // omit if needed to be omitted
    Key extends keyof KeyObj
    ? IsNever<KeyObj[Key]> extends true
      ? never
      : Key
    : Key]?: Key extends keyof KeyObj ? DeepOmitHelper<Required<T>[Key], KeyObj[Key]> : Required<T>[Key];
};
