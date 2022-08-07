// Uses imperative code for performance.
// Uses `string.charCodeAt()` over `String.codePointAt()` because it is faster.
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-continue, unicorn/prefer-code-point */
export const getCharCodeByteLength = function (string) {
  const charLength = string.length
  let byteLength = charLength

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.charCodeAt(charIndex)

    if (codepoint <= LAST_ASCII_CODEPOINT) {
      continue
    }

    if (codepoint <= LAST_TWO_BYTES_CODEPOINT) {
      byteLength += 1
      continue
    }

    byteLength += 2

    if (codepoint < FIRST_HIGH_SURROGATE || codepoint > LAST_HIGH_SURROGATE) {
      continue
    }

    // When out-of-bound, this returns NaN, which is `false` with the
    // next condition
    const nextCodepoint = string.charCodeAt(charIndex + 1)

    // High surrogates should be followed by low surrogates.
    // However, JavaScript strings allow invalid surrogates, which are counted
    // as a normal 3-byte character. This should not happen often in real code
    // though.
    if (
      nextCodepoint < FIRST_LOW_SURROGATE ||
      nextCodepoint > LAST_LOW_SURROGATE
    ) {
      continue
    }

    charIndex += 1
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
const FIRST_HIGH_SURROGATE = 0xd8_00
const LAST_HIGH_SURROGATE = 0xdb_ff
const FIRST_LOW_SURROGATE = 0xdc_00
const LAST_LOW_SURROGATE = 0xdf_ff
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-continue, unicorn/prefer-code-point */
