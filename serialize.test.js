import { serialize, deserialize, } from './history'

const check = (history) => {
  expect(deserialize(serialize(history))).toEqual(history)
}

test('defaultValue', () => {
  check({
    defaultValue: 0,
    steps: [],
  })

  check({
    defaultValue: 7,
    steps: [],
  })
})

test('one step', () => {
  check({
    defaultValue: 7,
    steps: [
      { date: '2010-01-01', value: 10, },
    ],
  })
})

test('multiple steps', () => {
  check({
    defaultValue: 7,
    steps: [
      { date: '2010-01-01', value: 10, },
      { date: '2020-01-01', value: 20, },
    ],
  })
})
