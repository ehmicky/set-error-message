type NormalizeError<ErrorArg> = ErrorArg extends Error ? ErrorArg : Error

/**
 *
 * @example
 * ```js
 * ```
 */
export default function setErrorMessage<ErrorArg>(
  error: ErrorArg,
  newMessage: string,
  currentMessage?: string,
): NormalizeError<ErrorArg>
