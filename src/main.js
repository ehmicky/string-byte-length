import { getNodeByteLength } from './buffer.js'
import { createTextEncoderFunc, TEXT_ENCODER_MIN_LENGTH } from './encoder.js'
import { getStringByteLength } from './string.js'

// Retrieve the best method based on the platform support
const getMainFunction = function () {
  // eslint-disable-next-line n/prefer-global/buffer
  if ('Buffer' in globalThis && 'byteLength' in globalThis.Buffer) {
    return getNodeByteLength
  }

  if ('TextEncoder' in globalThis) {
    return getByteLength.bind(undefined, createTextEncoderFunc())
  }

  return getStringByteLength
}

const getByteLength = function (getTextEncoderByteLength, string) {
  return string.length < TEXT_ENCODER_MIN_LENGTH
    ? getStringByteLength(string)
    : getTextEncoderByteLength(string)
}

export default getMainFunction()
