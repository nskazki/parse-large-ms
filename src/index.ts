'use strict'

import { inspect } from 'util'
import str2num from 'str2num'
import isNegativeZero = require('is-negative-zero')

export interface IMsInfo {
  millenniums:  number,
  centuries:    number,
  decades:      number,
  years:        number,
  months:       number,
  days:         number,
  hours:        number,
  minutes:      number,
  seconds:      number,
  milliseconds: number
}

export interface IInfoBit {
    name: string,
    msPerBit: number
}

const msPerSecond = 1000
const secondsPerMinute = 60
const minutesPerHour = 60
const hoursPerDay = 24
const yearsPerDecade = 10
const decadesPerCentury = 10
const centuriesPerMillennium = 10

const msPerMinute     = msPerSecond  * secondsPerMinute
const msPerHour       = msPerMinute  * minutesPerHour
const msPerDay        = msPerHour    * hoursPerDay
const msPerMonth      = msPerDay     * 30
const msPerYear       = msPerDay     * 365
const msPerDecade     = msPerYear    * yearsPerDecade
const msPerCentury    = msPerDecade  * decadesPerCentury
const msPerMillennium = msPerCentury * centuriesPerMillennium

export const bits: Array<IInfoBit> = [
  { name: 'millenniums',  msPerBit: msPerMillennium },
  { name: 'centuries',    msPerBit: msPerCentury    },
  { name: 'decades',      msPerBit: msPerDecade     },
  { name: 'years',        msPerBit: msPerYear       },
  { name: 'months',       msPerBit: msPerMonth      },
  { name: 'days',         msPerBit: msPerDay        },
  { name: 'hours',        msPerBit: msPerHour       },
  { name: 'minutes',      msPerBit: msPerMinute     },
  { name: 'seconds',      msPerBit: msPerSecond     },
  { name: 'milliseconds', msPerBit: 1               }
]

export default function parseLargeMs(rawMs: number | string): IMsInfo {
  const ms = typeof rawMs === 'string'
    ? str2num(rawMs)
    : rawMs

  if (typeof ms !== 'number')
    throw new Error(`parseLargeMs: ms must be a number!\
      \n\t ms type: ${typeof ms}\
      \n\t ms value: ${inspect(ms)}`)

  if (!isFinite(ms))
    throw new Error(`parseLargeMs: ms must be a finite number!\
      \n\t ms: ${inspect(ms)}`)

  const sign = getNumberSign(ms)
  let infoAcc: any = {}
  let msRemainder = Math.abs(ms)

  for (let index = 0; index !== bits.length; index++) {
    const bit = bits[index]
    const val = Math.floor(msRemainder / bit.msPerBit)
    msRemainder -= val * bit.msPerBit
    infoAcc[bit.name] = val * sign
  }

  return infoAcc as IMsInfo
}

// helpers
function getNumberSign(num: number): number {
  if (isNegativeZero(num)) return -1
  if (num >= 0) return 1
  if (num < 0) return -1
}

// ES6 Modules default exports interop with CommonJS
module.exports = parseLargeMs
module.exports.default = parseLargeMs
module.exports.bits = bits
