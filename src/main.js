import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'

export default function setErrorMessage(error, newMessage, currentMessage) {
  const errorA = normalizeException(error)
  const currentMessageA = normalizeArgs(errorA, newMessage, currentMessage)
  setNonEnumProp(error, 'message', newMessage)
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
