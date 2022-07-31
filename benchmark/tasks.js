import { Buffer, Blob } from 'buffer'

import { getStringByteLength } from '../src/string.js'

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
    getStringByteLength(string)
  },
}

export const bufferByteLength = {
  beforeAll,
  main() {
    Buffer.byteLength(string)
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

const encoder = new TextEncoder()
export const textEncoder = {
  beforeAll,
  main() {
    encoder.encode(string).length
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
