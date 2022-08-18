import { createPluralData } from './data-creator.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

await createPluralData({
  asModule: true,
  includeVersion: true,
  packed: true,
  outputFile: join(__dirname, '../src/data.js')
})
