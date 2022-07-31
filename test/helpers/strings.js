// eslint-disable-next-line no-restricted-imports
import { TEXT_ENCODER_MIN_LENGTH, CACHE_MAX_MEMORY } from '../../src/encoder.js'

// All characters being tested
const CHARACTERS = [
  // ASCII
  { string: '\0', size: 1 },
  { string: '\u0001', size: 1 },
  { string: '\b', size: 1 },
  { string: '\t', size: 1 },
  { string: '\n', size: 1 },
  { string: 'a', size: 1 },
  { string: ' ', size: 1 },
  { string: '\u007F', size: 1 },
  // Non-ASCII nor astral before U+0800
  { string: '\u0080', size: 2 },
  { string: '\u07FF', size: 2 },
  // Non-ASCII nor astral since U+0800
  { string: '\u0800', size: 3 },
  { string: '\uFFFF', size: 3 },
  // Astral characters
  { string: '\uD800\uDC00', size: 4 },
  { string: '\uDBFF\uDFFF', size: 4 },
  { string: '\u{10000}', size: 4 },
  { string: '\u{1FFFF}', size: 4 },
  { string: '\u{FFFFF}', size: 4 },
  // Invalid surrogate pairs
  { string: '\uD800', size: 3 },
  { string: '\uDBFF', size: 3 },
  { string: '\uDC00', size: 3 },
  { string: '\uDFFF', size: 3 },
  { string: '\uDC00\uD800', size: 6 },
]

// Try each character with prepended|appended characters
const LONG_SPACE = '_'.repeat(TEXT_ENCODER_MIN_LENGTH)
const VERY_LONG_SPACE = '_'.repeat(Math.ceil(CACHE_MAX_MEMORY / 3))
const STRINGS = CHARACTERS.flatMap(({ string, size }) => [
  { string, size },
  { string: `${string} `, size: size + 1 },
  { string: ` ${string}`, size: size + 1 },
  { string: `${string}${LONG_SPACE}`, size: size + LONG_SPACE.length },
  { string: `${LONG_SPACE}${string}`, size: size + LONG_SPACE.length },
  {
    string: `${string}${VERY_LONG_SPACE}`,
    size: size + VERY_LONG_SPACE.length,
  },
  {
    string: `${VERY_LONG_SPACE}${string}`,
    size: size + VERY_LONG_SPACE.length,
  },
])

// Also test empty strings
export const ALL_STRINGS = [{ string: '', size: 0 }, ...STRINGS]
