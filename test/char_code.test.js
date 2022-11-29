// Test using `string.charCode()`

// Simulate platforms where neither `Buffer` nor `TextEncoder` is available
// eslint-disable-next-line fp/no-delete, n/prefer-global/buffer, import/unambiguous
delete globalThis.Buffer.byteLength
// eslint-disable-next-line fp/no-delete
delete globalThis.TextEncoder

await import('./helpers/main.js')
