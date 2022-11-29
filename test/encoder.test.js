// Test using `TextEncoder`, if supported

// Simulate browsers where `Buffer` is not available
// eslint-disable-next-line fp/no-delete, n/prefer-global/buffer, import/unambiguous
delete globalThis.Buffer.byteLength

await import('./helpers/main.js')
