const WeebWrapper = require('../dist/index.js')

const token = 'UFRyZVBBc05UOjU2ZTljZjU0ZWQ4MjJhZWRiNmYyMWZiMWU3YzY0NzM1ZTk3NDFlNjhiNTcxODhlOWYxOWU2ZDc4'

function test () {
  const wrapper = new WeebWrapper(null, 'https://api.tmuniversal.eu')

  wrapper.accounts.validate(token).catch(res => {
    if (res.status === 401) {
      console.log('Test successful.')
      return process.exit(0)
    } else {
      console.error(res)
      return process.exit(1)
    }
  })

  console.log('Complete.')
}

test()
