[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/string-byte-length.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/string-byte-length)
[![Node](https://img.shields.io/node/v/string-byte-length.svg?logo=node.js)](https://www.npmjs.com/package/string-byte-length)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray)](/src/main.d.ts)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Get the UTF-8 byte length of a string.

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

# Difference with alternatives

## String.length

[`string.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)
retrieves the number of characters (or
["code units"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length#description)).

This library computes the number of bytes when the string is serialized to
UTF-8, for example in a file or network request. Those are different since UTF-8
characters can be 1 to 4 bytes long.

## Blob, TextEncoder, encodeURI()

The same can be achieved with:

- [`new Blob([string]).size`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/size)
- [`new TextEncoder().encode(string)`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
- [`encodeURI(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
  or
  [`encodeURIComponent(string)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
  by counting `%` sequences separately
- [`Buffer.from(string)`.length](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding)

However, those are much slower. Also, while `Blob()` and `TextEncoder()` are
widely supported, [a few platforms](https://caniuse.com/textencoder) (like Opera
mini) might still miss them.

## Buffer.byteLength

[`Buffer.byteLength(string)`](https://nodejs.org/api/buffer.html#static-method-bufferbytelengthstring-encoding)
only works in Node.js. This library on the hand simply iterates over the string
using
[`String.codePointAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt),
which is
[standard JavaScript](https://caniuse.com/mdn-javascript_builtins_string_codepointat).

`Buffer.byteLength()` uses
[V8's C++ implementation](https://v8.github.io/api/head/classv8_1_1String.html#af99433ee51ed45337e5b4536bd28a834)
which is much faster. Therefore, this library simply forwards to
`Buffer.byteLength()` when run in Node.js.

# Install

```bash
npm install string-byte-length
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

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
