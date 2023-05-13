import stringByteLength from 'string-byte-length'
import { expectType, expectNotType } from 'tsd'

expectType<0>(stringByteLength(''))
expectNotType<0>(stringByteLength('a'))
expectType<number>(stringByteLength('a'))
// @ts-expect-error
stringByteLength(true)
