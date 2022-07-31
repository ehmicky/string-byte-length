import { Buffer } from 'buffer'

import test from 'ava'
import stringByteLength from 'string-byte-length'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { createTextEncoderFunc } from '../src/encoder.js'
// eslint-disable-next-line no-restricted-imports
import { getStringByteLength } from '../src/string.js'

const CHARACTERS = [
  // ASCII (1 byte)
  '\0',
  '\u0001',
  '\b',
  '\t',
  '\n',
  'a',
  ' ',
  '\u007F',
  // Non-ASCII nor astral before U+0800 (2 bytes)
  '\u0080',
  '\u07FF',
  // Non-ASCII nor astral since U+0800 (3 bytes)
  '\u0800',
  '\uFFFF',
  // Astral characters (4 bytes)
  '\uD800\uDC00',
  '\uDBFF\uDFFF',
  '\u{10000}',
  '\u{1FFFF}',
  '\u{FFFFF}',
  // Invalid surrogate pairs (3 bytes)
  '\uD800',
  '\uDBFF',
  '\uDC00',
  '\uDFFF',
  '\uDC00\uD800',
]
const STRINGS = CHARACTERS.flatMap((string) => [
  string,
  `${string} `,
  ` ${string}`,
])
const INPUTS = ['', ...STRINGS].map((string) => ({
  string,
  // eslint-disable-next-line no-magic-numbers
  title: JSON.stringify(string.toString(16)),
}))
each(
  INPUTS,
  [stringByteLength, getStringByteLength, createTextEncoderFunc()],
  ({ title }, { string }, getByteLength) => {
    test(`Should compute same length as Buffer.byteLength() | ${title}`, (t) => {
      t.is(Buffer.byteLength(string), getByteLength(string))
    })
  },
)
