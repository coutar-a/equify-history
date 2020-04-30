import { valueAt } from './history'

test('defaultValue', () => {
  expect(valueAt(
    {
      defaultValue: 0,
      steps: [],
    },
    '1900-01-01'
  )).toEqual(0)

  expect(valueAt(
    {
      defaultValue: 7,
      steps: [],
    },
    '1900-01-01'
  )).toEqual(7)
})

test('at date', () => {
  expect(valueAt(
    {
      defaultValue: 7,
      steps: [
        { date: '2010-01-01', value: 10, },
        { date: '2020-01-01', value: 30, },
      ],
    },
    '2010-01-01'
  )).toEqual(10)

  expect(valueAt(
    {
      defaultValue: 7,
      steps: [
        { date: '2010-01-01', value: 10, },
        { date: '2020-01-01', value: 30, },
      ],
    },
    '2020-01-01'
  )).toEqual(30)
})

test('after last date', () => {
  expect(valueAt(
    {
      defaultValue: 7,
      steps: [
        { date: '2010-01-01', value: 10, },
        { date: '2020-01-01', value: 30, },
      ],
    },
    '2022-01-01'
  )).toEqual(30)
})

test('between dates', () => {
  expect(valueAt(
    {
      defaultValue: 7,
      steps: [
        { date: '2010-01-01', value: 10, },
        { date: '2020-01-01', value: 30, },
      ],
    },
    '2015-01-01'
  )).toEqual(10)
})

test('before first date', () => {
  expect(valueAt(
    {
      defaultValue: 7,
      steps: [
        { date: '2010-01-01', value: 10, },
        { date: '2020-01-01', value: 30, },
      ],
    },
    '2000-01-01'
  )).toEqual(7)
})

