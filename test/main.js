import test from 'ava'
import stringByteLength from 'string-byte-length'

test('Dummy test', (t) => {
  t.true(stringByteLength(true))
})
