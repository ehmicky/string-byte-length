import { Buffer, Blob } from 'buffer'

import { getNodeByteLength } from '../src/buffer.js'
import { createTextEncoderFunc } from '../src/encoder.js'
import { getCodePointByteLength } from '../src/string.js'

import { getString } from './string.js'

const beforeAll = function ({ character, size }) {
  // eslint-disable-next-line fp/no-mutation
  string = getString(character, size)
}

// eslint-disable-next-line fp/no-let
let string = ''

export const stringByteLength = {
  beforeAll,
  main() {
    getCodePointByteLength(string)
  },
}

export const bufferByteLength = {
  beforeAll,
  main() {
    getNodeByteLength(string)
  },
}

const textEncode = createTextEncoderFunc()
export const textEncoder = {
  beforeAll,
  main() {
    textEncode(string)
  },
}

export const bufferFrom = {
  beforeAll,
  main() {
    Buffer.from(string).length
  },
}

export const blob = {
  beforeAll,
  main() {
    new Blob([string]).size
  },
}

export const encodePatternOne = {
  beforeAll,
  main() {
    const matches = encodeURIComponent(string).match(ENCODE_REGEXP_ONE)
    string.length + (matches ? matches.length : 0)
  },
}

const ENCODE_REGEXP_ONE = /%[89ABab]/gu

export const encodePatternTwo = {
  beforeAll,
  main() {
    encodeURI(string).split(ENCODE_REGEXP_TWO).length - 1
  },
}

const ENCODE_REGEXP_TWO = /%..|./u
