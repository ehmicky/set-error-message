import test from 'ava'

test.serial(
  'Only update error stack if engine includes message in it',
  async (t) => {
    // eslint-disable-next-line fp/no-mutation
    Error.prepareStackTrace = () => 'one'
    const { default: setErrorMessage } = await import('set-error-message')

    const error = new Error('one')
    setErrorMessage(error, 'two')
    t.false(error.stack.includes('two'))

    // eslint-disable-next-line fp/no-delete
    delete Error.prepareStackTrace
  },
)
