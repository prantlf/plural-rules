import benchmark from 'benchmark'

const { Suite } = benchmark

function start () {
  this.run({ async: true })
}

function createSuite (description) {
  const suite = new Suite()
  suite.start = start
  console.log(description)
  return suite
    .on('cycle', ({ target }) => {
      const { error, name } = target
      if (error) {
        console.error(`  ${name} failed`)
      } else {
        console.log(`  ${target}`)
      }
    })
    .on('error', ({ target }) => console.warn(target.error))
}

export default createSuite
