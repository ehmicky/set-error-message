import test from 'ava'
import setErrorMessage from 'set-error-message'
import { each } from 'test-each'

const NOT_A_MESSAGE = [null, true]

each([...NOT_A_MESSAGE, undefined], ({ title }, notAMessage) => {
  test(`Validate second argument | ${title}`, (t) => {
    t.throws(setErrorMessage.bind(undefined, new Error('one'), notAMessage))
  })
})

each(NOT_A_MESSAGE, ({ title }, notAMessage) => {
  test(`Validate third argument | ${title}`, (t) => {
    t.throws(setErrorMessage.bind(undefined, new Error('one'), '', notAMessage))
  })
})

test('Third argument can be specified', (t) => {
  const error = new Error('one two')
  setErrorMessage(error, 'three', 'two')
  t.true(error.stack.includes('one three'))
})

test('Third argument has a default value', (t) => {
  const error = new Error('one two')
  t.true(error.stack.includes('one two'))
  error.message = 'two'
  setErrorMessage(error, 'three')
  t.true(error.stack.includes('one three'))
})
