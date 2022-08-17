[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/string-byte-length.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/string-byte-length)
[![Node](https://img.shields.io/node/v/string-byte-length.svg?logo=node.js)](https://www.npmjs.com/package/string-byte-length)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/src/main.d.ts)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Get the UTF-8 byte length of a string.

# Features

- [Fastest](#benchmarks) available library in JavaScript.
- Works on [all platforms](#alternatives) (Node.js, browsers, Deno, etc.)

# Example

```js
import stringByteLength from 'string-byte-length'

stringByteLength('test') // 4
stringByteLength(' ') // 1
stringByteLength('\0') // 1
stringByteLength('±') // 2
stringByteLength('★') // 3
stringByteLength('🦄') // 4
```

# Install

```bash
npm install string-byte-length
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# Alternatives

This library uses a mix of multiple algorithms:

- In Node.js: [`Buffer.byteLength()`](#bufferbytelength)
- Otherwise:
  - On big strings: [`TextEncoder`](#textencoder)
  - On small strings: [`String.charCodeAt()`](#stringcharcodeat)

## String.length

[`string.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
retrieves the number of characters (or
["code units"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#description)).
This is different from computing the number of bytes when the string is
serialized (for example in a file or network request) since UTF-8 characters can
be 1 to 4 bytes long.

## Buffer.byteLength()

[`Buffer.byteLength(string)`](https://nodejs.org/api/buffer.html#static-method-bufferbytelengthstring-encoding)
is [very fast](#benchmarks) since it uses
[V8's C++ implementation](https://v8.github.io/api/head/classv8_1_1String.html#af99433ee51ed45337e5b4536bd28a834).
However, it only works with Node.js.

## Buffer.from()

[`Buffer.from(string).length`](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding)
has similar pros/cons as [`Buffer.byteLength`](#bufferbytelength) but is
[slower](#benchmarks).

## TextEncoder

[`new TextEncoder().encode(string)`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
is fast as it relies on lower-level code. However, it is slower on small
strings.

Also, while widely supported, [a few platforms](https://caniuse.com/textencoder)
(like Opera mini) might still miss it.

## Blob

[`new Blob([string]).size`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/size)
has similar pros/cons as [`TextEncoder`](#textencoder) but is
[slower](#benchmarks).

## String.charCodeAt()

[`String.charCodeAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
can be used on each character to compute its UTF-8 byte length based on the
resulting codepoint.

This works on all platforms and is fast on small strings. However, it is slower
than other methods on big strings.

## String.codePointAt()

[`String.codePointAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
has similar props/cons as [`String.charCodeAt()`](#stringcharcodeat) but is
[slower](#benchmarks).

## encodeURI()

[`encodeURI(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
or
[`encodeURIComponent(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
can be used by counting `%` sequences separately, such as
`encodeURI(string).split(/%..|./u).length - 1`. However, this method is
[very slow](#benchmarks).

# Benchmarks

```
                                                                              String length
                                                 0          1       1e1      1e2      1e3      1e4       1e5       1e6      1e7      1e8
Only ASCII         Buffer.byteLength()     15.39ns    20.12ns    24.9ns   35.4ns    108ns    817ns    9.76μs    85.1μs    833μs   10.1ms
                   String.charCodeAt()      3.32ns     6.20ns    22.3ns  163.0ns   1440ns  14200ns  143.00μs  1440.0μs  23600μs  236.0ms
                   String.codePointAt()     2.72ns     5.20ns    33.5ns  252.0ns   2550ns  23800ns  239.00μs  2380.0μs  23000μs  330.0ms
                   TextEncoder            116.98ns   123.29ns   123.0ns  129.0ns    169ns    475ns   15.60μs   186.0μs   2520μs   32.5ms
                   Buffer.from()           36.89ns   146.34ns   175.0ns  227.2ns    432ns   3944ns   48.10μs   271.5μs   3191μs   53.0ms
                   Blob                  9003.03ns  9503.59ns 12311.6ns 9821.1ns  13836ns  21288ns   78.77μs   299.3μs   3029μs   74.9ms
                   encodeURIComponent()    36.60ns    52.06ns    96.8ns  390.2ns   3257ns  33663ns  323.74μs  3427.8μs  34392μs  358.7ms
                   encodeURI()             35.91ns    78.32ns   341.2ns 2861.3ns  27141ns 278114ns 3538.72μs 34851.7μs 382012μs 3583.3ms

Mostly ASCII       Buffer.byteLength()     15.39ns     22.9ns    28.4ns   79.5ns    453ns   4.34μs    42.9μs     426μs   4.54ms   44.6ms
Very few non-ASCII String.charCodeAt()      3.32ns      8.1ns    27.6ns  190.0ns   1680ns  16.50μs   161.0μs    1640μs  26.90ms  267.0ms
                   String.codePointAt()     2.72ns      6.8ns    34.3ns  258.0ns   3630ns  34.60μs   328.0μs    3390μs  33.10ms  329.0ms
                   TextEncoder            116.98ns    122.0ns   136.0ns  218.0ns    948ns   8.32μs    93.5μs     920μs   9.71ms  103.0ms
                   Buffer.from()           36.89ns    149.0ns   186.2ns  326.9ns   1901ns  20.89μs   195.4μs    1907μs  18.24ms  193.3ms
                   Blob                  9003.03ns  10037.0ns  9659.6ns 9747.9ns  11271ns  32.85μs   190.6μs    1798μs  14.48ms  173.5ms
                   encodeURIComponent()    36.60ns    242.8ns   273.8ns  650.8ns   4351ns  43.17μs   405.3μs    4311μs  43.29ms  467.9ms
                   encodeURI()             35.91ns    256.0ns   492.2ns 3065.5ns  28590ns 288.46μs  3575.2μs   35704μs 365.33ms 3493.0ms

Mostly ASCII       Buffer.byteLength()     15.39ns     22.9ns    28.4ns    101ns    807ns   7.55μs    75.7μs     735μs   7.64ms   77.0ms
Some non-ASCII     String.charCodeAt()      3.32ns      8.1ns    25.9ns    208ns   1910ns  18.40μs   183.0μs    1850μs   29.8ms  294.0ms
                   String.codePointAt()     2.72ns      6.8ns    31.8ns    281ns   2770ns  26.20μs   263.0μs    2620μs   27.0ms  365.0ms
                   TextEncoder            116.98ns    122.0ns   132.0ns    248ns   1400ns  12.80μs   138.0μs    1370μs  14.40ms  152.0ms
                   Buffer.from()           36.89ns    149.0ns   186.2ns    391ns   2758ns  33.08μs   309.9μs    2815μs  29.79ms  308.2ms
                   Blob                  9003.03ns  10037.0ns  9659.6ns  12400ns  16406ns  41.63μs   277.1μs    2293μs  22.84ms  267.5ms
                   encodeURIComponent()    36.60ns    242.8ns   273.8ns   1865ns  17458ns 168.61μs  1886.2μs   24200μs    411ms      n/a
                   encodeURI()             35.91ns    256.0ns   492.2ns   4216ns  41403ns 404.00μs  5227.7μs   52100μs    466ms      n/a

Only non-ASCII     Buffer.byteLength()     15.39ns     22.9ns    53.5ns    373ns   3.59μs   35.2μs     380μs    3.81ms   35.6ms    351ms
                   String.charCodeAt()      3.32ns      8.1ns    45.5ns    404ns   3.69μs   38.2μs     361μs    3.69ms   51.1ms    517ms
                   String.codePointAt()     2.72ns      6.8ns    44.7ns    407ns   3.92μs   38.9μs     389μs    4.18ms   63.9ms    638ms
                   TextEncoder            116.98ns    122.0ns   168.0ns    597ns   4.62μs   44.5μs     470μs    4.79ms   53.9ms    525ms
                   Buffer.from()           36.89ns    149.0ns   243.1ns   1047ns   9.91μs  129.3μs    1328μs   12.97ms  123.5ms   1229ms
                   Blob                  9003.03ns  10037.0ns  9639.7ns  15341ns  25.18μs  114.5μs    1005μs    9.61ms  109.4ms    979ms
                   encodeURIComponent()    36.60ns    242.8ns  1572.9ns  14175ns 132.62μs 1477.7μs   23932μs  448.94ms 3890.0ms      n/a
                   encodeURI()             35.91ns    256.0ns  1451.3ns  14172ns 132.73μs 1619.8μs   18343μs  177.13ms 1670.0ms      n/a
```

# Related projects

- [`string-byte-slice`](https://github.com/ehmicky/string-byte-slice): Like
  `string.slice()` but bytewise
- [`truncate-json`](https://github.com/ehmicky/truncate-json): Truncate a JSON
  string

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/string-byte-length/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/string-byte-length/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
