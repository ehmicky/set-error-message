import test from 'ava'
import setErrorMessage from 'set-error-message'
import { each } from 'test-each'

test('Updates stack', (t) => {
  const error = new Error('one')
  error.stack = 'Error: one\nstackLines'
  setErrorMessage(error, 'two')
  t.is(error.stack, 'Error: two\nstackLines')
})

each(
  ['Error: one', 'TypeError: one', 'Error: three\none', 'Error: three one'],
  ({ title }, from) => {
    test(`Prevent injecting in stack header | ${title}`, (t) => {
      const error = new Error('one')
      error.stack = `one\n${from}\nstackLines`
      setErrorMessage(error, 'two')
      t.is(error.stack, `one\n${from.replace('one', 'two')}\nstackLines`)
    })
  },
)

each(['', 'three'], ({ title }, message) => {
  test(`Insert if current message cannot be found | ${title}`, (t) => {
    const error = new Error('one')
    error.message = message
    error.stack = 'one\nstackLines'
    setErrorMessage(error, 'two\n\n')
    t.is(error.stack, 'Error: two\none\nstackLines')
  })
})

test('Insertion tries to find error name', (t) => {
  const error = new Error('one')
  error.message = ''
  error.stack = 'Error: one\nstackLines'
  setErrorMessage(error, 'two\n\n')
  t.is(error.stack, 'Error: two\none\nstackLines')
})
