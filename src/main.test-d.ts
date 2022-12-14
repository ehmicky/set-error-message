import setErrorMessage from 'set-error-message'
import { expectType, expectAssignable } from 'tsd'

const error = new Error('test')
expectAssignable<Error>(setErrorMessage(error, ''))
setErrorMessage(error, '')

// @ts-expect-error
setErrorMessage(error)
// @ts-expect-error
setErrorMessage(error, true)
// @ts-expect-error
setErrorMessage(error, '', true)

expectAssignable<Error>(setErrorMessage(null, ''))
expectType<true>(setErrorMessage(error as Error & { prop: true }, '').prop)
