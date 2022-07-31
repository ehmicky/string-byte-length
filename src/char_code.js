// Uses imperative code for performance.
// Uses `string.charCodeAt()` over `String.codePointAt()` because it is faster.
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, unicorn/prefer-code-point */
export const getCharCodeByteLength = function (string) {
  const charLength = string.length
  let byteLength = charLength

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.charCodeAt(charIndex)

    if (codepoint > LAST_ASCII_CODEPOINT) {
      if (codepoint <= LAST_TWO_BYTES_CODEPOINT) {
        byteLength += 1
      } else {
        byteLength += 2

        if (
          codepoint >= FIRST_LOW_SURROGATE &&
          codepoint <= LAST_LOW_SURROGATE
        ) {
          // When out-of-bound, this returns NaN, which is `false` with the
          // next condition
          const nextCodepoint = string.charCodeAt(charIndex + 1)

          if (
            nextCodepoint >= FIRST_HIGH_SURROGATE &&
            nextCodepoint <= LAST_HIGH_SURROGATE
          ) {
            charIndex += 1
          }
        }
      }
    }
  }

  return byteLength
}

// Last ASCII character (1 byte)
const LAST_ASCII_CODEPOINT = 0x7f
// Last 2-bytes character
const LAST_TWO_BYTES_CODEPOINT = 0x7_ff
// Others are 3 bytes characters
// However, U+d800 to U+dbff:
//  - Followed by U+dc00 to U+dfff -> 4 bytes together (astral character)
//  - Otherwise -> 3 bytes (like above)
const FIRST_LOW_SURROGATE = 0xd8_00
const LAST_LOW_SURROGATE = 0xdb_ff
const FIRST_HIGH_SURROGATE = 0xdc_00
const LAST_HIGH_SURROGATE = 0xdf_ff
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, unicorn/prefer-code-point */
