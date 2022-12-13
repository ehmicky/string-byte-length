import { getNodeByteLength } from './buffer.js'
import { getCharCodeByteLength } from './char_code.js'
import { createTextEncoderFunc, TEXT_ENCODER_MIN_LENGTH } from './encoder.js'

// Retrieve the best method based on the platform support
const getMainFunction = () => {
  // eslint-disable-next-line n/prefer-global/buffer
  if ('Buffer' in globalThis && 'byteLength' in globalThis.Buffer) {
    return getNodeByteLength
  }

  if ('TextEncoder' in globalThis) {
    return getByteLength.bind(undefined, createTextEncoderFunc())
  }

  return getCharCodeByteLength
}

const getByteLength = (getTextEncoderByteLength, string) =>
  string.length < TEXT_ENCODER_MIN_LENGTH
    ? getCharCodeByteLength(string)
    : getTextEncoderByteLength(string)

export default getMainFunction()
