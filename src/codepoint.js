// Uses imperative code for performance.
/* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers, unicorn/prefer-code-point */
export const getCodePointByteLength = function (string) {
  const charLength = string.length
  let byteLength = charLength
  let hasSurrogate = false

  for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
    const codepoint = string.charCodeAt(charIndex)

    if (codepoint < 0x80) {
      hasSurrogate = false
    } else if (codepoint < 0x8_00) {
      byteLength += 1
      hasSurrogate = false
    } else if (hasSurrogate && codepoint >= 0xdc_00 && codepoint <= 0xdf_ff) {
      hasSurrogate = false
    } else {
      byteLength += 2
      hasSurrogate = codepoint >= 0xd8_00 && codepoint <= 0xdb_ff
    }
  }

  return byteLength
}
/* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops, max-depth,
   fp/no-mutation, no-magic-numbers, unicorn/prefer-code-point */
