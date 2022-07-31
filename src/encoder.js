// Initialize the function
export const createTextEncoderFunc = function () {
  return getTextEncoderByteLength.bind(undefined, new TextEncoder())
}

// Compute the byte length using `TextEncoder`
const getTextEncoderByteLength = function (textEncoder, string) {
  return textEncoder.encode(string).length
}

// `TextEncoder()` is faster once the string is large enough
export const TEXT_ENCODER_MIN_LENGTH = 3e2
