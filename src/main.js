import normalizeException from 'normalize-exception'

import { normalizeArgs } from './args.js'

export default function setErrorMessage(error, newMessage, currentMessage) {
  const errorA = normalizeException(error)
  const currentMessageA = normalizeArgs(errorA, newMessage, currentMessage)
  return errorA
}
