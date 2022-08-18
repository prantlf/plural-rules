#!/usr/bin/env node

import { createPluralData } from '../util/data-creator.js'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

function usage () {
  console.log(`Generates plural rules and forms for selected locales.

Usage: create-plural-data [options] <locale> [<locale> ...]

Options:
  -a|--all-locales         incudes all available locales
  -c|--as-cjs-module       format the plural data as a CommonJS module
  -d|--as-amd-module       format the plural data as an AMD module
  -m|--as-module           format the plural data as an ES module
  -n|--umd-name <name>     UMD global export name, if not "pluralData"
  -o|--output-file <file>  write the plural data to a file
  -p|--packed              pack the plural rules in plural forms
  -u|--as-umd-module       format the plural data as an UMD module
  -v|--include-version     include version of the CLDR source

Plural data are printed on the standard output as JSON by default.
Packed plural data must be used as a single module; not for merging.

Examples:
  create-pural-data cs
  create-plural-data -m -p -v -o custom-data.js en de cs pl hu ru`)
}

function version() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))
  console.log(version)
}

const { argv } = process
let allLocales, asModule, asCjsModule, asAmdModule, asUmdModule, umdName,
    packed, includeVersion, outputFile
const locales = []

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(?:-|--)([a-zA-Z][-a-z]*)$/.exec(arg)
  if (match) {
    switch (match[1]) {
      case 'a': case 'all-locales':
        allLocales = true
        continue
      case 'c': case 'as-cjs-module':
        asCjsModule = true
        continue
      case 'd': case 'as-amd-module':
        asAmdModule = true
        continue
      case 'm': case 'as-module':
        asModule = true
        continue
      case 'n': case 'umd-name':
        umdName = argv[++i]
        continue
      case 'o': case 'output-file':
        outputFile = argv[++i]
        continue
      case 'p': case 'packed':
        packed = true
        continue
      case 'u': case 'as-umd-module':
        asUmdModule = true
        continue
      case 'v': case 'include-version':
        includeVersion = true
        continue
      case 'V': case 'version':
        version()
        process.exit(0)
        /* falls through */
      case 'h': case 'help':
        usage()
        process.exit(0)
    }
    console.error(`Unknown argument: "${arg}".`)
    process.exit(1)
  }
  locales.push(arg)
}

if (!locales.length && !allLocales) {
  usage()
  process.exit(0)
}

try {
  const pluralData = await createPluralData({
    locales,
    asModule,
    asCjsModule,
    asAmdModule,
    asUmdModule,
    umdName,
    packed,
    includeVersion,
    outputFile
  })
  if (!outputFile) {
    console.log(pluralData)
  }
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
