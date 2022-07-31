import test from 'ava'
import stringByteLength from 'string-byte-length'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { createTextEncoderFunc } from '../src/encoder.js'
// eslint-disable-next-line no-restricted-imports
import { getStringByteLength } from '../src/string.js'

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
const STRINGS = CHARACTERS.flatMap(({ string, size }) => [
  { string, size },
  { string: `${string} `, size: size + 1 },
  { string: ` ${string}`, size: size + 1 },
])
const ALL_STRINGS = [{ string: '', size: 0 }, ...STRINGS]
const INPUTS = ALL_STRINGS.map(({ string, size }) => ({
  string,
  size,
  // eslint-disable-next-line no-magic-numbers
  title: JSON.stringify(string.toString(16)),
}))
each(
  INPUTS,
  [stringByteLength, getStringByteLength, createTextEncoderFunc()],
  ({ title }, { string, size }, getByteLength) => {
    test(`Should compute the byte length | ${title}`, (t) => {
      t.is(getByteLength(string), size)
    })
  },
)
