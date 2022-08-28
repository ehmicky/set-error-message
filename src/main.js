import normalizeException from 'normalize-exception'

export default function setErrorMessage(error) {
  const errorA = normalizeException(error)
  return errorA
}
