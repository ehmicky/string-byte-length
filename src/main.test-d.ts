import { expectType, expectAssignable } from 'tsd'

import stringByteLength, { Options } from './main.js'

expectType<object>(stringByteLength(true))

stringByteLength(true, {})
expectAssignable<Options>({})
