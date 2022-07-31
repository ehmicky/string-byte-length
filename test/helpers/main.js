// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import stringByteLength from 'string-byte-length'
import { each } from 'test-each'

import { ALL_STRINGS } from './strings.js'

// Add a human-friendly test `title`
const INPUTS = ALL_STRINGS.map(({ string, size }) => ({
  string,
  size,
  // eslint-disable-next-line no-magic-numbers
  title: JSON.stringify(string.replace(/_+/u, '_').toString(16)),
}))

each(INPUTS, ({ title }, { string, size }) => {
  test(`Should compute the byte length | ${title}`, (t) => {
    t.is(stringByteLength(string), size)
  })
})
