import { Buffer, Blob } from 'buffer'

import { getNodeByteLength } from '../src/buffer.js'
import { getCodePointByteLength } from '../src/codepoint.js'
import { createTextEncoderFunc } from '../src/encoder.js'

import { getString } from './string.js'

const beforeAll = function ({ character, size }) {
  // eslint-disable-next-line fp/no-mutation
  string = getString(character, size)
}

// eslint-disable-next-line fp/no-let
let string = ''

export const charCodeAt = {
  beforeAll,
  main() {
    getCodePointByteLength(string)
  },
}

export const codePointAt = {
  beforeAll,
  // Uses imperative code for performance.
  /* eslint-disable complexity, max-statements, fp/no-let, fp/no-loops,
     max-depth, fp/no-mutation */
  main() {
    const charLength = string.length
    let byteLength = 0

    for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
      const codepoint = string.codePointAt(charIndex)

      if (codepoint < 0x80) {
        byteLength += 1
      } else if (codepoint < 0x8_00) {
        byteLength += 2
      } else if (codepoint < 0x1_00_00) {
        byteLength += 3
      } else {
        byteLength += 4
        charIndex += 1
      }
    }

    return byteLength
  },
  /* eslint-enable complexity, max-statements, fp/no-let, fp/no-loops,
     max-depth, fp/no-mutation */
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
