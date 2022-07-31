[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/string-byte-length.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/string-byte-length)
[![Node](https://img.shields.io/node/v/string-byte-length.svg?logo=node.js)](https://www.npmjs.com/package/string-byte-length)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray)](/src/main.d.ts)
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
  - On small strings: [`String.codePointAt()`](#stringcodepointat)

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
Only ASCII
                              0          1       1e1      1e2      1e3      1e4       1e5       1e6      1e7      1e8
Buffer.byteLength()      5.50ns    20.12ns    24.9ns   35.4ns    108ns    817ns    9.76μs    85.1μs    833μs   10.1ms
String.charCodeAt()      6.25ns    11.20ns    28.7ns  175.0ns   1590ns  15600ns  153.00μs  1550.0μs  15700μs  270.0ms
String.codePointAt()     6.93ns    10.80ns    33.5ns  252.0ns   2550ns  23800ns  239.00μs  2380.0μs  23000μs  330.0ms
TextEncoder            326.38ns   394.68ns   423.8ns  436.1ns    683ns   2120ns   35.97μs   145.0μs   1513μs   41.6ms
Buffer.from()           38.86ns   146.47ns   175.0ns  227.2ns    432ns   3944ns   48.10μs   271.5μs   3191μs   53.0ms
Blob                 12770.13ns 13572.84ns 12311.6ns 9821.1ns  13836ns  21288ns   78.77μs   299.3μs   3029μs   74.9ms
encodeURIComponent()    36.60ns    51.57ns    96.8ns  390.2ns   3257ns  33663ns  323.74μs  3427.8μs  34392μs  358.7ms
encodeURI()             35.91ns    76.79ns   341.2ns 2861.3ns  27141ns 278114ns 3538.72μs 34851.7μs 382012μs 3583.3ms

------------------

Mostly ASCII
Very few non-ASCII
                              0          1       1e1      1e2      1e3      1e4       1e5       1e6      1e7      1e8
Buffer.byteLength()      5.50ns     22.9ns    28.4ns   79.5ns    453ns   4.34μs    42.9μs     426μs   4.54ms   44.6ms
String.charCodeAt()      6.25ns     9.26ns    28.1ns  178.0ns   1580ns  15.20μs   155.0μs    1540μs  27.90ms  274.0ms
String.codePointAt()     6.93ns     6.95ns    34.3ns  258.0ns   3630ns  34.60μs   328.0μs    3390μs  33.10ms  329.0ms
TextEncoder            326.38ns    398.2ns   418.5ns  534.2ns   2036ns  16.09μs   146.7μs    1469μs  13.17ms  149.0ms
Buffer.from()           38.86ns    162.3ns   186.2ns  326.9ns   1901ns  20.89μs   195.4μs    1907μs  18.24ms  193.3ms
Blob                 12770.13ns  14351.9ns  9659.6ns 9747.9ns  11271ns  32.85μs   190.6μs    1798μs  14.48ms  173.5ms
encodeURIComponent()    36.60ns    270.2ns   273.8ns  650.8ns   4351ns  43.17μs   405.3μs    4311μs  43.29ms  467.9ms
encodeURI()             35.91ns    277.9ns   492.2ns 3065.5ns  28590ns 288.46μs  3575.2μs   35704μs 365.33ms 3493.0ms

------------------

Mostly ASCII
Some non-ASCII
                              0          1       1e1      1e2      1e3      1e4       1e5       1e6      1e7      1e8
Buffer.byteLength()      5.50ns     22.9ns    28.4ns    101ns    807ns   7.55μs    75.7μs     735μs   7.64ms   77.0ms
String.charCodeAt()      6.25ns     9.26ns    26.7ns    209ns   2000ns  19.70μs   190.0μs    1890μs   19.1ms  399.0ms
String.codePointAt()     6.93ns     6.95ns    31.8ns    281ns   2770ns  26.20μs   263.0μs    2620μs   27.0ms  365.0ms
TextEncoder            326.38ns    398.2ns   418.5ns    636ns   2836ns  24.81μs   209.5μs    2041μs  21.13ms  228.4ms
Buffer.from()           38.86ns    162.3ns   186.2ns    391ns   2758ns  33.08μs   309.9μs    2815μs  29.79ms  308.2ms
Blob                 12770.13ns  14351.9ns  9659.6ns  12400ns  16406ns  41.63μs   277.1μs    2293μs  22.84ms  267.5ms
encodeURIComponent()    36.60ns    270.2ns   273.8ns   1865ns  17458ns 168.61μs  1886.2μs   24200μs    411ms      n/a
encodeURI()             35.91ns    277.9ns   492.2ns   4216ns  41403ns 404.00μs  5227.7μs   52100μs    466ms      n/a

------------------

Only non-ASCII
                              0          1       1e1      1e2      1e3      1e4       1e5       1e6      1e7      1e8
Buffer.byteLength()      5.50ns    22.70ns    53.5ns    373ns   3.59μs   35.2μs     380μs    3.81ms   35.6ms    351ms
String.charCodeAt()      6.25ns     9.26ns    63.6ns    554ns   4.62μs   45.5μs     459μs    4.68ms   70.5ms    698ms
String.codePointAt()     6.93ns     6.95ns    44.7ns    407ns   3.92μs   38.9μs     389μs    4.18ms   63.9ms    638ms
TextEncoder            326.38ns   411.59ns   487.9ns   1239ns   9.62μs   89.3μs     900μs    9.12ms   88.8ms    880ms
Buffer.from()           38.86ns   155.95ns   243.1ns   1047ns   9.91μs  129.3μs    1328μs   12.97ms  123.5ms   1229ms
Blob                 12770.13ns 12133.83ns  9639.7ns  15341ns  25.18μs  114.5μs    1005μs    9.61ms  109.4ms    979ms
encodeURIComponent()    36.60ns   254.29ns  1572.9ns  14175ns 132.62μs 1477.7μs   23932μs  448.94ms 3890.0ms      n/a
encodeURI()             35.91ns   238.33ns  1451.3ns  14172ns 132.73μs 1619.8μs   18343μs  177.13ms 1670.0ms      n/a

```

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
