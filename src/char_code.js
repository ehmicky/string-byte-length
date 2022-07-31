// Uses imperative code for performance.
// Uses `string.charCodeAt()` over `String.codePointAt()` because it is faster.
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers, unicorn/prefer-code-point */
export const getCharCodeByteLength = function (string) {
  const charLength = string.length
  let byteLength = charLength
  let hasSurrogate = false

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.charCodeAt(charIndex)

    // ASCII characters -> 1 byte
    if (codepoint < 0x80) {
      hasSurrogate = false
      // U+0080 to U+07ff -> 2 bytes
    } else if (codepoint < 0x8_00) {
      byteLength += 1
      hasSurrogate = false
      // Astral character
    } else if (hasSurrogate && codepoint >= 0xdc_00 && codepoint <= 0xdf_ff) {
      hasSurrogate = false
      // U+0800 to U+ffff -> 3 bytes
      // However, U+d800 to U+dbff:
      //  - Followed by U+dc00 to U+dfff -> 4 bytes together (astral character)
      //  - Otherwise -> 3 bytes (like above)
    } else {
      byteLength += 2
      hasSurrogate = codepoint >= 0xd8_00 && codepoint <= 0xdb_ff
    }
  }

  return byteLength
}
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers, unicorn/prefer-code-point */
