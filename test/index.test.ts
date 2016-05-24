'use strict'

import pm from '../src'
import assert = require('power-assert')
import { defaults } from 'lodash'

const pBase = {
  millenniums:  0,
  centuries:    0,
  decades:      0,
  years:        0,
  months:       0,
  days:         0,
  hours:        0,
  minutes:      0,
  seconds:      0,
  milliseconds: 0
}

const mBase = {
  millenniums:  -0,
  centuries:    -0,
  decades:      -0,
  years:        -0,
  months:       -0,
  days:         -0,
  hours:        -0,
  minutes:      -0,
  seconds:      -0,
  milliseconds: -0
}

const s = (v: number) => v * 1000
const m = (v: number) => s(v * 60)
const h = (v: number) => m(v * 60)
const d = (v: number) => h(v * 24)
const M = (v: number) => d(v * 30)
const Y = (v: number) => d(v * 365)
const D = (v: number) => Y(v * 10)
const C = (v: number) => D(v * 10)
const I = (v: number) => C(v * 10)

describe('base', () => {
  it('0 ms', () => {
    const act = pm(0)
    const exp = defaults(pBase)
    assert.deepEqual(act, exp)
  })

  it('-0 ms', () => {
    const act = pm(-0)
    const exp = defaults(mBase)
    assert.deepEqual(act, exp)
  })

  it('100 ms', () => {
    const act = pm(100)
    const exp = defaults({ milliseconds: 100 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('-100 ms', () => {
    const act = pm(-100)
    const exp = defaults({ milliseconds: -100 }, mBase)
    assert.deepEqual(act, exp)
  })

  it('1 second', () => {
    const act = pm(s(1))
    const exp = defaults({ seconds: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('-1 second', () => {
    const act = pm(s(-1))
    const exp = defaults({ seconds: -1 }, mBase)
    assert.deepEqual(act, exp)
  })

  it('1 second 1 ms', () => {
    const act = pm(s(1) + 1)
    const exp = defaults({ seconds: 1, milliseconds: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('-1 second -1 ms', () => {
    const act = pm(s(-1) - 1)
    const exp = defaults({ seconds: -1, milliseconds: -1 }, mBase)
    assert.deepEqual(act, exp)
  })
})

describe('extreme', () => {
  it('999 milliseconds', () => {
    const act = pm(999)
    const exp = defaults({ milliseconds: 999 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('59 seconds', () => {
    const act = pm(s(59))
    const exp = defaults({ seconds: 59 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('59 minutes', () => {
    const act = pm(m(59))
    const exp = defaults({ minutes: 59 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('23 hours', () => {
    const act = pm(h(23))
    const exp = defaults({ hours: 23 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('29 days', () => {
    const act = pm(d(29))
    const exp = defaults({ days: 29 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('11 months', () => {
    const act = pm(M(11))
    const exp = defaults({ months: 11 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('9 years', () => {
    const act = pm(Y(9))
    const exp = defaults({ years: 9 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('9 decades', () => {
    const act = pm(D(9))
    const exp = defaults({ decades: 9 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('9 centuries', () => {
    const act = pm(C(9))
    const exp = defaults({ centuries: 9 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('9 millenniums', () => {
    const act = pm(I(9))
    const exp = defaults({ millenniums: 9 }, pBase)
    assert.deepEqual(act, exp)
  })
})

describe('overflow', () => {
  it('1000 milliseconds -> 1 seconds', () => {
    const act = pm(1000)
    const exp = defaults({ seconds: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('60 seconds -> 1 minutes', () => {
    const act = pm(s(60))
    const exp = defaults({ minutes: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('60 minutes -> 1 hours', () => {
    const act = pm(m(60))
    const exp = defaults({ hours: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('24 hours -> 1 days', () => {
    const act = pm(h(24))
    const exp = defaults({ days: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('30 days -> 1 months', () => {
    const act = pm(d(30))
    const exp = defaults({ months: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('12 months !== 1 years (12 * 30 !== 365)', () => {
    const act = pm(M(12))
    const exp = defaults({ months: 12 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('13 months !== 1 years + 1 months', () => {
    const act = pm(M(13))
    const exp = defaults({ years: 1, days: 25 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('10 years -> 1 decades', () => {
    const act = pm(Y(10))
    const exp = defaults({ decades: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('10 decades -> 1 centuries', () => {
    const act = pm(D(10))
    const exp = defaults({ centuries: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('10 centuries -> 1 millenniums', () => {
    const act = pm(C(10))
    const exp = defaults({ millenniums: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('10 millenniums', () => {
    const act = pm(I(10))
    const exp = defaults({ millenniums: 10 }, pBase)
    assert.deepEqual(act, exp)
  })
})

describe('mix of positive bits', () => {
  it('3 days 5 minutes 1 ms', () => {
    const act = pm(d(3) + m(5) + 1)
    const exp = defaults({ days: 3, minutes: 5, milliseconds: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('2 decades 12 hours 2 seconds', () => {
    const act = pm(D(2) + h(12) + s(2))
    const exp = defaults({ decades: 2, hours: 12, seconds: 2 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('9 millenniums 9 decades 9 centuries 9 years 29 days 23 hours 59 minutes 59 seconds 999 ms', () => {
    const act = pm(I(9) + D(9) + C(9) + Y(9) + d(29) + h(23) + m(59) + s(59) + 999)
    const exp = defaults({
      millenniums: 9,
      decades: 9,
      centuries: 9,
      years: 9,
      days: 29,
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999
    }, pBase)
    assert.deepEqual(act, exp)
  })
})

describe('mix of negative bits', () => {
  it('-2 decades -12 hours -2 seconds', () => {
    const act = pm(D(-2) + h(-12) + s(-2))
    const exp = defaults({ decades: -2, hours: -12, seconds: -2 }, mBase)
    assert.deepEqual(act, exp)
  })

  it('-3 days -5 minutes -1 ms', () => {
    const act = pm(d(-3) + m(-5) - 1)
    const exp = defaults({ days: -3, minutes: -5, milliseconds: -1 }, mBase)
    assert.deepEqual(act, exp)
  })

  it('-9 millenniums -9 decades -9 centuries -9 years -29 days -23 hours -59 minutes -59 seconds -999 ms', () => {
    const act = pm(I(-9) + D(-9) + C(-9) + Y(-9) + d(-29) + h(-23) + m(-59) + s(-59) - 999)
    const exp = defaults({
      millenniums: -9,
      decades: -9,
      centuries: -9,
      years: -9,
      days: -29,
      hours: -23,
      minutes: -59,
      seconds: -59,
      milliseconds: -999
    }, mBase)
    assert.deepEqual(act, exp)
  })
})

describe('max safely value', () => {
  it('285 millenniums 1 ms -> ok', () => {
    const act = pm(I(285) + 1)
    const exp = defaults({ millenniums: 285, milliseconds: 1 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('286 millenniums 1 ms -> 286 millenniums 0 ms', () => {
    const act = pm(I(286) + 1)
    const exp = defaults({ millenniums: 286 }, pBase)
    assert.deepEqual(act, exp)
  })
})

describe('string arg', () => {
  it('.100e3', () => {
    const act = pm('.100e3')
    const exp = defaults({ milliseconds: 100 }, pBase)
    assert.deepEqual(act, exp)
  })

  it('-1 000', () => {
    const act = pm('-1 000')
    const exp = defaults({ seconds: -1 }, mBase)
    assert.deepEqual(act, exp)
  })
})

describe('throws', () => {
  assert.throws(() => pm(NaN as any), 'NaN')
  assert.throws(() => pm(+Infinity as any), '+Infinity')
  assert.throws(() => pm(-Infinity as any), '-Infinity')

  assert.throws(() => pm([] as any), '[]')
  assert.throws(() => pm({} as any), '{}')
  assert.throws(() => pm(/./ as any), '/./')

  assert.throws(() => pm('123.ee3' as any), '123.ee3')
  assert.throws(() => pm('.e' as any), '.e')
})
