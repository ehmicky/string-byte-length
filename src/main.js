import { getStringByteLength } from './length.js'

// This is the fastest method since it uses C++ (v8::String::Utf8Length())
// However, it is only available in Node.js.
// Faster than `Buffer.from(string).length`.
const getNodeByteLength = function (string) {
  // We do not import 'buffer' so it works in browsers
  // eslint-disable-next-line n/prefer-global/buffer
  return globalThis.Buffer.byteLength(string)
}

export default 'Buffer' in globalThis ? getNodeByteLength : getStringByteLength
