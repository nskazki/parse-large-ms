# parse-large-ms

[![Build Status](https://travis-ci.org/nskazki/parse-large-ms.svg)](https://travis-ci.org/nskazki/parse-large-ms)
[![Coverage Status](https://coveralls.io/repos/github/nskazki/parse-large-ms/badge.svg?branch=master)](https://coveralls.io/github/nskazki/parse-large-ms)

>This module is written on `typescript`, and contains the `.d.ts` file.
><br>If you write on `typescript`: just use it in your project and definitions will be automatically uploaded.

```
npm i -S parse-large-ms
```

## About

This module parses the time interval into the components up to the millenniums.
Like [parse-ms](https://github.com/sindresorhus/parse-ms) but with support for large values.

## Interface

```typescript
function parseLargeMs(ms: number|string): {
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
```

## Examples

```js
const parse = require('parse-large-ms')
const assert = require('assert')

const s = v => v * 1000
const m = v => s(v * 60)
const h = v => m(v * 60)
const d = v => h(v * 24)
const M = v => d(v * 30)
const Y = v => d(v * 365)
const D = v => Y(v * 10)
const C = v => D(v * 10)
const I = v => C(v * 10)

// -3 days -5 minutes -1 ms
assert.deepEqual(parse(d(-3) + m(-5) - 1), {
  millenniums:  -0,
  decades:      -0,
  centuries:    -0,
  years:        -0,
  months:       -0,
  days:         -3,
  hours:        -0,
  minutes:      -5,
  seconds:      -0,
  milliseconds: -1
})

// 285 millenniums 1 ms (max safely value)
assert.deepEqual(parse(I(285) + 1), {
  millenniums:  285,
  decades:      0,
  centuries:    0,
  years:        0,
  months:       0,
  days:         0,
  hours:        0,
  minutes:      0,
  seconds:      0,
  milliseconds: 1
})

// throws
assert.throws(() => parse(NaN)))
assert.throws(() => parse(Infinity)))
assert.throws(() => parse([])))
assert.throws(() => parse({})))
assert.throws(() => parse(/./)))
assert.throws(() => parse('.e')))
```
