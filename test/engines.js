import test from 'ava'
import { each } from 'test-each'

each(['one', undefined], ({ title }, stack) => {
  test.serial(
    `Only update error stack if engine includes message in it | ${title}`,
    async (t) => {
      // eslint-disable-next-line fp/no-mutation
      Error.prepareStackTrace = () => stack
      // eslint-disable-next-line import/no-dynamic-require
      const { default: setErrorMessage } = await import(
        `../src/main.js#${stack}`
      )

      const error = new Error('one')
      setErrorMessage(error, 'two')
      t.false(error.stack.includes('two'))

      // eslint-disable-next-line fp/no-delete
      delete Error.prepareStackTrace
    },
  )
})
