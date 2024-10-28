// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import { each } from 'test-each'

import { ALL_STRINGS } from './strings.test.js'

import stringByteLength from 'string-byte-length'

each(ALL_STRINGS, ({ title }, { string, size }) => {
  test(`Should compute the byte length | ${title}`, (t) => {
    t.is(stringByteLength(string), size)
  })
})
