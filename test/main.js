import test from 'ava'
import setErrorMessage from 'set-error-message'
import { each } from 'test-each'

// eslint-disable-next-line unicorn/no-null
each([undefined, null, '', {}], ({ title }, notAnError) => {
  test(`Normalizes the error | ${title}`, (t) => {
    t.true(setErrorMessage(notAnError, '') instanceof Error)
  })
})

test('Returns the error', (t) => {
  const error = new Error('one')
  t.is(setErrorMessage(error, ''), error)
})

test('Sets error message', (t) => {
  const error = new Error('one')
  setErrorMessage(error, 'two')
  t.is(error.message, 'two')
  t.false(Object.getOwnPropertyDescriptor(error, 'message').enumerable)
})

test('Sets error stack', (t) => {
  const error = new Error('one')
  setErrorMessage(error, 'two')
  t.true(error.stack.includes('two'))
  t.false(Object.getOwnPropertyDescriptor(error, 'stack').enumerable)
})
