import { expectType, expectNotType, expectError } from 'tsd'

import stringByteLength from 'string-byte-length'

expectType<0>(stringByteLength(''))
expectNotType<0>(stringByteLength('a'))
expectType<number>(stringByteLength('a'))
expectError(stringByteLength(true))
