import { expectType, expectAssignable, expectError } from 'tsd'

import setErrorMessage from './main.js'

const error = new Error('test')
expectAssignable<Error>(setErrorMessage(error, ''))
setErrorMessage(error, '', '')

expectError(setErrorMessage(error))
expectError(setErrorMessage(error, true))
expectError(setErrorMessage(error, '', true))

expectAssignable<Error>(setErrorMessage(null, ''))
expectType<true>(setErrorMessage(error as Error & { prop: true }, '').prop)
