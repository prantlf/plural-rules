'use strict'

const { join } = require('path')
const { createPluralData } = require('./data-creator')

createPluralData({
  asModule: true,
  includeVersion: true,
  packed: true,
  outputFile: join(__dirname, '../src/data.js')
})
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
