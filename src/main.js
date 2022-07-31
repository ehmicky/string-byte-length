import { getStringByteLength } from './length.js'

// This is the fastest method. However, it is only available in Node.js.
const getNodeByteLength = function (string) {
  // We do not import 'buffer' so it works in browsers
  // eslint-disable-next-line n/prefer-global/buffer
  return globalThis.Buffer.byteLength(string)
}

/* c8 ignore next */
export default 'Buffer' in globalThis ? getNodeByteLength : getStringByteLength
