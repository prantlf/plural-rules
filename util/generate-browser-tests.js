import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import glob from 'fast-glob'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const tests = join(__dirname, '../test')
const browserTests = join(tests, 'browser')
const nonBrowserTests = [
  'browser.test.js', 'cardinals.test.js', 'rules.test.js', 'typings.test.js',
  'version.test.js'
]
const importModuleExpression = /import ({[^}]+}) from '..\/src\/([^']+)\.js'/

function readTemplate () {
  console.log('Reading browser test template...')
  return readFile(join(tests, 'browser.html'), 'utf8')
    .then(template => template.split('\n'))
}

function readTest (file) {
  return readFile(join(tests, file), 'utf8')
    .then(content => {
      content = content.split('\n')
      return content.slice(2, content.length - 1)
    })
}

let counter = 0

function formatModuleImport (input) {
  const match = importModuleExpression.exec(input)
  if (!match) {
    throw new Error('Statement requiring the code module not found.')
  }
  const scriptName = match[2]
  const functionCodeLine = input.replace(importModuleExpression,
    'const $1 = window[\'pluralRules\']')
  const scriptPath = counter++ % 2 === 0
    ? '../../dist/' + scriptName + '.umd.min.js'
    : '../../dist/' + scriptName + '.umd.js'
  const functionScriptElement = [
    '<script src="' + scriptPath + '"></script>'
  ]
  return { functionCodeLine, functionScriptElement }
}

function formatPage (template, contentIndex, content) {
  const { functionCodeLine, functionScriptElement } = formatModuleImport(content[0])
  content[0] = functionCodeLine
  return template.slice(0, contentIndex)
    .concat('')
    .concat(functionScriptElement)
    .concat('')
    .concat('<script>', '(function () {', content, '})()', '</script>')
    .concat(template.slice(contentIndex))
}

console.log('Deleting existing browser tests...')
await rm(browserTests, { recursive: true, force: true })
await mkdir(browserTests, { recursive: true })
const template = await readTemplate()
const files = await glob('*.test.js', { cwd: tests })
const scriptIndex = template.indexOf('</head>')
await Promise.all(files
  .filter(file => !nonBrowserTests.includes(file))
  .map(async file => {
    console.log(`Processing test ${file}...`)
    let content = await readTest(file)
    content = formatPage(template, scriptIndex, content)
    file = join(browserTests, `${file.substring(0, file.length - 2)}html`)
    await writeFile(file, content.join('\n'))
  }))
