// This is:
//  - Available on any platform unlike:
//     - `new Blob([string]).size`
//     - `new TextEncoder().encode(string).length`
//  - Faster than any of the above, and also than any methods relying on
//    `encodeURI()` or `encodeURIComponent()`
// Uses imperative code for performance.
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers */
export const getStringByteLength = function (string) {
  const charLength = string.length
  let byteLength = 0

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.codePointAt(charIndex)

    if (codepoint < 0x80) {
      byteLength += 1
    } else if (codepoint < 0x8_00) {
      byteLength += 2
    } else if (codepoint < 0x1_00_00) {
      byteLength += 3
    } else {
      byteLength += 4
      charIndex += 1
    }
  }

  return byteLength
}
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers */
