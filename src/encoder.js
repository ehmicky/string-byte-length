export const getTextEncoderByteLength = function (textEncoder, string) {
  return textEncoder.encode(string).length
}

// `TextEncoder()` is faster once the string is large enough
export const TEXT_ENCODER_MIN_LENGTH = 1e2
