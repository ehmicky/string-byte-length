/**
 * Get the UTF-8 byte length of a string.
 *
 * @example
 * ```js
 * stringByteLength('test') // 4
 * stringByteLength(' ') // 1
 * stringByteLength('\0') // 1
 * stringByteLength('±') // 2
 * stringByteLength('★') // 3
 * stringByteLength('🦄') // 4
 * ```
 */
export default function stringByteLength<T extends string>(
  string: T,
): T extends '' ? 0 : number
