/**
 *
 * @example
 * ```js
 * ```
 */
export default function stringByteLength<T extends string>(
  string: T,
): T extends '' ? 0 : number
