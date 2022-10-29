import { expectType, expectNotType, expectError } from 'tsd'

import stringByteLength from './main.js'

expectType<0>(stringByteLength(''))
expectNotType<0>(stringByteLength('a'))
expectType<number>(stringByteLength('a'))
expectError(stringByteLength(true))
