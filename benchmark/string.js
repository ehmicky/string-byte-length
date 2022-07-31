// Retrieve string used as input for benchmarks
export const getString = function (character, size) {
  if (character === 'complex') {
    return COMPLEX_CHARACTER.repeat(size)
  }

  if (character === 'medium') {
    return getMediumString(size)
  }

  const firstChar = character === 'simple' ? '' : COMPLEX_CHARACTER
  return `${firstChar}${SIMPLE_CHARACTER.repeat(size)}`
}

const getMediumString = function (size) {
  if (size === 1) {
    return SIMPLE_CHARACTER
  }

  const chunksCount = size / CHUNK_SIZE
  const chunk = `${COMPLEX_CHARACTER}${SIMPLE_CHARACTER.repeat(CHUNK_SIZE - 1)}`
  return chunk.repeat(chunksCount)
}

const SIMPLE_CHARACTER = 'a'
const COMPLEX_CHARACTER = '\u{10000}'
const CHUNK_SIZE = 10
