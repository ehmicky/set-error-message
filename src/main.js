import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'

export default function setErrorMessage(error, newMessage, currentMessage) {
  const errorA = normalizeException(error)
  const currentMessageA = normalizeArgs(errorA, newMessage, currentMessage)
  setNonEnumProp(errorA, 'message', newMessage)
  updateStack(errorA, newMessage, currentMessageA)
  return errorA
}

const setNonEnumProp = function (error, propName, value) {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, propName, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  })
}

const updateStack = function (error, newMessage, currentMessage) {
  if (!SHOULD_UPDATE_STACK) {
    return
  }

  return error
}

// Only V8 includes `error.message` in `error.stack`
const stackIncludesMessage = function () {
  return new Error(EXAMPLE_MESSAGE).stack.includes(EXAMPLE_MESSAGE)
}

const EXAMPLE_MESSAGE = 'set-error-message test message'
const SHOULD_UPDATE_STACK = stackIncludesMessage()
