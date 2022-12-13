// Initialize the function
export const createTextEncoderFunc = () =>
  getTextEncoderByteLength.bind(undefined, new TextEncoder())

// Compute the byte length using `TextEncoder`
const getTextEncoderByteLength = (textEncoder, string) => {
  const encoderBuffer = getBuffer(string)
  return textEncoder.encodeInto(string, encoderBuffer).written
}

// The buffer is cached for performance reason
const getBuffer = (string) => {
  const size = string.length * 3

  if (size > CACHE_MAX_MEMORY) {
    return new Uint8Array(size)
  }

  if (cachedEncoderBuffer === undefined || cachedEncoderBuffer.length < size) {
    // eslint-disable-next-line fp/no-mutation
    cachedEncoderBuffer = new Uint8Array(size)
  }

  return cachedEncoderBuffer
}

// Maximum amount of memory (in bytes) taken by cached buffer
export const CACHE_MAX_MEMORY = 1e5
// eslint-disable-next-line fp/no-let, init-declarations
let cachedEncoderBuffer

// `TextEncoder()` is faster once the string is large enough
export const TEXT_ENCODER_MIN_LENGTH = 1e2
