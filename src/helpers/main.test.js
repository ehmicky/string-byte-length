import test from 'ava'
import isCI from 'is-ci'
import { each } from 'test-each'

import { ALL_STRINGS } from './strings.test.js'

import stringByteLength from 'string-byte-length'

const testFunction = isCI ? test.serial : test

each(ALL_STRINGS, ({ title }, { string, size }) => {
  testFunction(`Should compute the byte length | ${title}`, (t) => {
    t.is(stringByteLength(string), size)
  })
})
