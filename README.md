# Plural Rules

[![Latest version](https://img.shields.io/npm/v/plural-rules)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/plural-rules)
](https://www.npmjs.com/package/plural-rules)
[![Coverage](https://codecov.io/gh/prantlf/plural-rules/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/plural-rules)

Evaluates locale-specific plural rules to identify the right plural form for a cardinal number, which represents an item count. Internationalization libraries can utilize it to choose the right localized string.

* Tiny code base - 2.52 kB, 1.57 KB minified, 0.67 KB gzipped. Do not pack unnecessary weight in your application. (Bundled code for the web browser is 11 kB, 4.77 kB minified, 1.79 kB gzipped.)
* Packed data - 18.2 kB, 16 kB minified, 3 kB gzipped. A quarter of the size of the original CLDR data. (This size adds to the code size.)
* Generated from the official [CLDR plural rules] version 35.1. Cardinals for [almost 200 languages](./docs/languages.md#supported-languages) are supported.
* Minimal interface for finding out the right [plural form](./docs/design.md#plural-forms) by evaluating [plural rules](./docs/design.md#plural-rules) for a specific [locale](./docs/design.md#locales). Looking up and formatting localizable strings is a task for internationalization libraries.

If you are looking for a smaller and [faster](https://github.com/prantlf/fast-plural-rules/blob/master/docs/speed.md#plural-form-lookup-speed) library using [Mozilla plural rules], see [fast-plural-rules].

### Table of Contents

- [Synopsis](#synopsis)
- [Installation and Getting Started](#installation-and-getting-started)
- [Usage Scenarios](./docs/usage.md#usage-scenarios)
- [Design Concepts](./docs/design.md#design-concepts)
- [Supported Languages](./docs/languages.md#supported-languages)
- [API Reference](./docs/API.md#api-reference)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Synopsis

```js
const { getPluralFormForCardinal } = require('plural-rules')

// Returns index of the plural form for the specified locale and cardinal.
getPluralFormForCardinal('en', 1) // Returns "one";   "1 file"
getPluralFormForCardinal('en', 2) // Returns "other"; "2 files"
getPluralFormForCardinal('en', 5) // Returns "other"; "5 files"
getPluralFormForCardinal('cs', 1) // Returns "one";   "1 soubor"
getPluralFormForCardinal('cs', 2) // Returns "few";   "2 soubory"
getPluralFormForCardinal('cs', 5) // Returns "other"; "5 souborů"

// Returns a localized message for the specified locale and cardinal.
localizeMessage('en', 'fileCount', 3) // Returns "3 files"
localizeMessage('cs', 'fileCount', 3) // Returns "3 soubory"

// Returns a localized message for the specified locale and cardinal.
function localizeMessage (locale, messageKey, cardinal) {
  const pluralForm = getPluralFormForCardinal(locale, cardinal)
  const messageFormat = messages[locale][messageKey][pluralForm]
  return messageFormat.replace('{0}', cardinal)
}
// Localized messages organized by locales and message keys.
const messages = {
  en: {
    fileCount: {
      one:   '{0} file', // singular
      other: '{0} files' // plural
    }
  },
  cs: {
    fileCount: {
      one:   '{0} soubor',  // singular
      few:   '{0} soubory', // plural for 2-4 items
      other: '{0} souborů'  // plural for 5 and more items
    }
  }
}
```

## Installation and Getting Started

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
$ npm i plural-rules --save
```

```sh
$ yarn add plural-rules
```

Functions are exposed as named exports, for example:

```js
const { getPluralFormForCardinal } = require('plural-rules')
```

You can read more about the [module loading](./docs/API.md#loading) in other environments, like with ES6 or in web browsers. [Usage scenarios](./docs/usage.md#usage-scenarios) demonstrate applications of this library in typical real-world situations. [Design concepts](./docs/design.md#design-concepts) explain the approach to the correct internationalization of messages with cardinals taken by this library. Translators will read about [plural rules for supported languages](./docs/languages.md#supported-languages) to be able to write the right plural forms to language packs. [Data genrator](#./API.md#data-generator) enables customizing the the amount of recognized languages and thus shrink the library size. Finally, the [API reference](./docs/API.md#api-reference) lists all functions with a description of their functionality.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Copyright (c) 2018-2022 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[CLDR plural rules]: http://cldr.unicode.org/index/cldr-spec/plural-rules
[Mozilla plural rules]: https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of_Plural_Rules
[fast-plural-rules]: https://github.com/prantlf/fast-plural-rules
