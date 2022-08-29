import { expectType, expectAssignable } from 'tsd'

import setErrorMessage, { Options } from './main.js'

expectType<object>(setErrorMessage(true))

setErrorMessage(true, {})
expectAssignable<Options>({})
