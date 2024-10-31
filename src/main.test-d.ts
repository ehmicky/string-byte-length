import { expectNotType, expectType } from 'tsd'

import stringByteLength from 'string-byte-length'

expectType<0>(stringByteLength(''))
expectNotType<0>(stringByteLength('a'))
expectType<number>(stringByteLength('a'))
// @ts-expect-error
stringByteLength(true)
