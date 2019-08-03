# Plural Rules
[![NPM version](https://badge.fury.io/js/plural-rules.png)](http://badge.fury.io/js/plural-rules)
[![Build Status](https://travis-ci.org/prantlf/plural-rules.png)](https://travis-ci.org/prantlf/plural-rules)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/plural-rules/badge.svg?branch=master)](https://coveralls.io/github/prantlf/plural-rules?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f1034029c0747a980cd49f64f16338b)](https://www.codacy.com/app/prantlf/plural-rules?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/plural-rules&amp;utm_campaign=Badge_Grade)
[![Dependency Status](https://david-dm.org/prantlf/plural-rules.svg)](https://david-dm.org/prantlf/plural-rules)
[![devDependency Status](https://david-dm.org/prantlf/plural-rules/dev-status.svg)](https://david-dm.org/prantlf/plural-rules#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM Downloads](https://nodei.co/npm/plural-rules.png?downloads=true&stars=true)](https://www.npmjs.com/package/plural-rules)

Evaluates locale-specific plural rules to identify the right plural form for a cardinal number, which represents an item count. Internationalization libraries can utilize it to choose the right localized string.

* Tiny code base - 2.11 kB, 1.4 KB minified, 0.61 KB gzipped. Do not pack unnecessary weight in your application.
* Packed data - 23.8 kB, 16 kB minified, 3 kB gzipped. Half of the size of the original CLDR data.
* Generated from the official [CLDR plural rules] version 35.1. Cardinals for [almost 200 languages](./docs/languages.md#supported-languages) are supported.
* Minimal interface for finding out the right [plural form](./docs/design.md#plural-forms) by evaluating [plural rules](./docs/design.md#plural-rules) for a specific [locale](./docs/design.md#locales). Looking up and formatting localizable strings is a task for internationalization libraries.

If you are looking for a more lightweight and [better performing](https://github.com/prantlf/fast-plural-rules/blob/master/docs/speed.md#plural-form-lookup-speed) library using [Mozilla plural rules], see [fast-plural-rules].

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

## Release History

* 2019-08-03   v0.1.0   Upgrade CLDR data to the version 35.1
* 2018-11-05   v0.0.1   Initial release

## License

Copyright (c) 2018-2019 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[CLDR plural rules]: http://cldr.unicode.org/index/cldr-spec/plural-rules
[Mozilla plural rules]: https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of_Plural_Rules
[fast-plural-rules]: https://github.com/prantlf/fast-plural-rules
