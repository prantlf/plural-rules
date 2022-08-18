/* global beforeAll, afterAll, it, expect */

import { join } from 'path'
import { readdirSync } from 'fs'
import connect from 'connect'
import serve from 'serve-static'
import puppeteer from 'puppeteer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const port = 8073

let server
let browser
let page

const customMatchers = {
  toPass: function (pass, message) {
    return { pass, message }
  }
}

beforeAll(done => {
  expect.extend(customMatchers)
  server = connect()
    .use(serve(join(__dirname, '..'), { etag: false }))
    .listen(port, () => {
      puppeteer
        .launch({
          headless: true,
          args: process.env.TRAVIS === 'true' ? ['--no-sandbox'] : []
        })
        .then(result => {
          browser = result
          return browser.newPage()
        })
        .then(result => {
          page = result
          done()
        })
    })
})

afterAll(done => {
  browser
    .close()
    .then(() => server.close(done))
})

const tests = readdirSync(join(__dirname, 'browser'))
for (const test of tests) {
  it(`Execute ${test}`, done => {
    let result
    page
      .goto(`http://localhost:${port}/test/browser/${test}`)
      .then(() => page.waitForSelector('.jasmine-overall-result'))
      .then(() => page.evaluate(() => {
        const result = document.querySelector('.jasmine-overall-result')
        return result.classList.contains('jasmine-passed')
      }))
      .then(output => {
        result = output
        return page.evaluate(() => {
          const summary = document.querySelector('.jasmine-overall-result').innerText
          const duration = document.querySelector('.jasmine-duration').innerText
          const results = document.querySelector('.jasmine-results').innerText
          return { summary, duration, results }
        })
      })
      .then(({ summary, duration, results }) => {
        expect(result).toPass(`${summary}; ${duration}\n${results}`)
        done()
      })
  })
}
