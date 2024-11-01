import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'
import { getStack } from './stack.js'

// Properly update an error's message
const setErrorMessage = (error, newMessage, currentMessage) => {
  const errorA = normalizeException(error)
  const currentMessageA = normalizeArgs(errorA, newMessage, currentMessage)
  setNonEnumProp(errorA, 'message', newMessage)
  updateStack(errorA, newMessage, currentMessageA)
  return errorA
}

export default setErrorMessage

// In some JavaScript engines, `error.stack` includes `error.message`, but is
// not updated when `error.message` is modified. This fixes this.
const updateStack = (error, newMessage, currentMessage) => {
  if (newMessage === currentMessage || !stackIncludesMessage()) {
    return
  }

  const stack = getStack(error, newMessage, currentMessage)
  setNonEnumProp(error, 'stack', stack)
}

// Only V8 includes `error.message` in `error.stack`
const stackIncludesMessage = () => {
  const { stack } = new Error(EXAMPLE_MESSAGE)
  return typeof stack === 'string' && stack.includes(EXAMPLE_MESSAGE)
}

const EXAMPLE_MESSAGE = 'set-error-message test message'

const setNonEnumProp = (error, propName, value) => {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, propName, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}
