import { add } from './history'

test('add 1 history', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [],
    },
  ])).toEqual({
    defaultValue: 2,
    steps: [],
  })
})

test('add 1 history with steps', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [
        { date: '2010-01-01', value: 11, },
      ],
    },
  ])).toEqual({
    defaultValue: 2,
    steps: [
      { date: '2010-01-01', value: 11, },
    ],
  })
})

test('add defaultValues', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [],
    },
    {
      defaultValue: 3,
      steps: [],
    },
  ])).toEqual({
    defaultValue: 5,
    steps: [],
  })
})

test('add steps same date', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [
        { date: '2010-01-01', value: 11, },
      ],
    },
    {
      defaultValue: 3,
      steps: [
        { date: '2010-01-01', value: 22, },
      ],
    },
  ])).toEqual({
    defaultValue: 5,
    steps: [
      { date: '2010-01-01', value: 33, },
    ],
  })
})

test('add solo step', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [
        { date: '2010-01-01', value: 11, },
      ],
    },
    {
      defaultValue: 3,
      steps: [],
    },
  ])).toEqual({
    defaultValue: 5,
    steps: [
      { date: '2010-01-01', value: 14, },
    ],
  })
})

test('add multiple steps same date', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [
        { date: '2010-01-01', value: 11, },
      ],
    },
    {
      defaultValue: 3,
      steps: [
        { date: '2020-01-01', value: 22, },
      ],
    },
  ])).toEqual({
    defaultValue: 5,
    steps: [
      { date: '2010-01-01', value: 14, },
      { date: '2020-01-01', value: 33, },
    ],
  })
})

test('add 3 histories', () => {
  expect(add([
    {
      defaultValue: 2,
      steps: [
        { date: '2010-01-01', value: 11, },
      ],
    },
    {
      defaultValue: 3,
      steps: [
        { date: '2020-01-01', value: 22, },
      ],
    },
    {
      defaultValue: 4,
      steps: [
        { date: '2030-01-01', value: 33, },
      ],
    },
  ])).toEqual({
    defaultValue: 9,
    steps: [
      { date: '2010-01-01', value: 18, },
      { date: '2020-01-01', value: 37, },
      { date: '2030-01-01', value: 66, },
    ],
  })
})

