// This is the fastest method. However, it is only available in Node.js.
export const getNodeByteLength = (string) =>
  // eslint-disable-next-line n/prefer-global/buffer
  globalThis.Buffer.byteLength(string)
