# API Reference

This library contains pure functions to get [plural forms](./design.md#plural-forms) by evaluating [plural rules](./design.md#plural-rules) for supported [locales](./design.md#locales).

### Table of Contents

- [Loading](#loading)
- [Modules](#modules)
  - [index](#index)
  - [code](#code)
- [Functions](#functions)
  - [getPluralFormForCardinal](#getpluralformforcardinal)
  - [getPluralRulesForCardinals](#getpluralrulesforcardinals)
  - [populatePluralData](#populatepluraldata)
  - [setPluralFormsForCardinals](#setpluralformsforcardinals)
- [Data Generator](#data-generator)

## Loading

Load the main module in an application using CommonJS modules:

```js
const { getPluralFormForCardinal } = require('plural-rules')
```

Load the main module in an application using ES6 modules:

```js
import {
  getPluralFormForCardinal
} from './node_modules/plural-rules/src/index.js'
```

Load the main module in the browser with plain JavaScript:

```html
<script src="./node_modules/plural-rules/dist/index.umd.min.js"></script>
<script>
  (() => {
    const { getPluralFormForCardinal } = window.pluralRules
  })()
</script>
```

You can also load a specific version from CDN, for example: https://unpkg.com/plural-rules@0.1.0/dist/index.umd.min.js.

## Modules

Modules in the `src` directory require ES6 including the new module syntax, as available in Node.js 8 and newer. Modules in the `dist` directory require ES5 and follow the CommonJS standard for older Node.js releases. Files `dist/*.umd.js` require ES5, are minified and follow the UMD standard to work well in web browsers.

### index

Main package module. The most usually chosen module with the complete functionality. Includes the plural data for all available languages. Contains all functions from the module `code` except for [populatePluralData](#populatepluraldata).

```
const { ... } = require('plural-rules')
import { ... } from './node_modules/plural-rules/src/index.js'
<script src="./node_modules/plural-rules/dist/index.umd.min.js"></script>
```

### code

Offers the plural form lookup functionality, like the `index` module, but does not include the plural data. You have to initialize the library with your own the time zone data by calling [populatePluralData](#populatepluraldata) before the first usage.

```
const { ... } = require('plural-rules/dist/code')
import { ... } from './node_modules/plural-rules/src/code.js'
<script src="./node_modules/plural-rules/dist/code.umd.min.js"></script>
```

## Functions

Functions return either a [plural form](./design.md#plural-forms) or [plural rules](./design.md#plural-rules) and they accept a supported [locale](./design.md#locales).

The [locale](./design.md#locales) will be normalized for the plural rule lookup. It is always converted to lower-case and if it consists of two parts - language and country - separated by an underscore, the separator is replaced by a hyphen. For example: `pt_BR ==> pt-br`.

### getPluralFormForCardinal

```
getPluralFormForCardinal(localeOrRules: string|object, count: number): string
```

Returns an identifier of the plural form using the specified locale (or plural rules) and the specified cardinal number (`count`). If you call `getPluralFormForCardinal` many times for the same locale, consider obtaining a rule function for the specific locale by `getPluralRulesForCardinals` and call this function using the rules repeatedly.

* `localeOrRules` - one of [supported language locales](./languages.md#supported-languages) or an object with [plural rules](./design.md#plural-rules) returned by [getPluralRulesForCardinals](#getpluralrulesforcardinals)
* `count` - a cardinal representing an item count; an integer >= 0

```js
const { getPluralFormForCardinal } = require('plural-rules')

getPluralFormForCardinal('en', 5)
// Returns 1, which is a second plural form (plural) in Germanic languages.
```

The [locale](./design.md#locales) will be normalized for the plural rules lookup by converting it to lower-case and using a hyphen as a separator, if the country is present and separated by an underscore.

### getPluralRulesForCardinals

```
getPluralRulesForCardinals(locale: string): object
```

Returns an object with plural rules function for the specified `locale`. The plural rules can be used later together with a cardinal number (item count) to return the right plural form identifier for the cardinal.

* `locale` - one of [supported language locales](./languages.md#supported-languages)

```js
const {
  getPluralRulesForCardinals, getPluralFormForCardinal
} = require('plural-rules')

const pluralRules = getPluralRulesForCardinals('en')
// Returns plural rules for English.

getPluralFormForCardinal(pluralRules, 5)
// Returns 1, which is a second plural form (plural) in Germanic languages.
```

The [locale](./design.md#locales) will be normalized for the plural rules lookup by converting it to lower-case and using a hyphen as a separator, if the country is present and separated by an underscore.

### populatePluralData

```
populatePluralData(data: object): void
```

Initializes the plural data and should be called just once, when the application starts. Needed only if you load the `code` module instead of the `index` module.

The `data` object is supposed to contain packed plural data consisting of plural rules and plural forms pointing to the plura rules, origanized by locales:

```js
const data = {
  rules: [
    'i = 1 and v = 0 @integer 1',
    ...
  ],
  cardinals: [
    en: {
      one: 11,
      other: 12
    },
    ...
  ]
}
```

See the [list the supported languages](./languages.md#supported-languages) as an example of the full data, which you can take a smaller part of to your application. See also the command-line [data generator](#data-generator) to produce such smaller part, as described in the article about [limiting the supported languages](./usage.md#limit-supported-languages).

This function is not exported from the `index` module, because this module includes the complete plural data already.

```js
const { populatePluralData, getPluralFormForCardinal } = require('plural-rules/dist/code')
const data = require('./plural-data')

populatePluralData(data) // Initialize the library

const pluralForm = getPluralFormForCardinal('cs', 2) // Returns "few"
```

### setPluralFormsForCardinals

```
setPluralFormsForCardinals(locale: string, forms: object): void
```

Adds or replaces plural form rules for the specified locale.

* `locale` - an existing or a new [locale](./design.md#locales)
* `forms` - an object with plural form identifiers as keys and plural rules to select the particular plural forms as values

```js
const { setPluralFormsForCardinals } = require('plural-rules')

setPluralFormsForCardinals('cs', {
  one:   'i = 1 and v = 0 @integer 1',
  few:   'i = 2..4 and v = 0 @integer 2~4',
  other: '@integer 0, 5~19, 100, 1000, 10000, 100000, 1000000, …'
})
```

The [locale](./design.md#locales) will be normalized for the plural rules lookup by converting it to lower-case and using a hyphen as a separator, if the country is present and separated by an underscore.

## Data Generator

If you want to [limit the supported languages](./usage.md#limit-supported-languages) to improve performance of your application by reducing the size of the JavaScript code, you can use the command-line tool included in this package:

```txt
Usage: create-plural-data [options] <locale> [<locale> ...]

Options:

  -V, --version             output the version number
  -a, --all-locales         incudes all available locales
  -c, --as-cjs-module       format the plural data as a CommonJS module
  -d, --as-amd-module       format the plural data as an AMD module
  -m, --as-module           format the plural data as an ES6 module
  -n, --umd-name            UMD global export name, if not "pluralData"
  -o, --output-file <file>  write the plural data to a file
  -p, --packed              pack the plural rules in plural forms
  -u, --as-umd-module       format the plural data as an UMD module
  -v, --include-version     include version of the CLDR source
  -h, --help                output usage information


Plural data are printed on the standard output as JSON by default.
Packed plural data must be used as a single module; not for merging.

Examples:

  $ create-pural-data cs
  $ create-plural-data -mpv -o custom-data.js en de cs pl hu ru
```

The module generated by this tool exposes a data object as a default export, which is expected bu the function[populatePluralData](#populatepluraldata).