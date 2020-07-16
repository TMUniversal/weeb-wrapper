'use strict'

const Iroh = require('./lib/iroh/')
const Toph = require('./lib/toph')
const Tama = require('./lib/toph')

const apis = {
  PRODUCTION: 'https://api.tmuniversal.eu'
}

class WeebWrapper {
  constructor (token, apiUrl) {
    apiUrl = apiUrl || {}

    let accountsUrl
    let imagesUrl
    let settingsUrl
    if (typeof apiUrl === 'string') {
      accountsUrl = `${apiUrl}/accounts`
      imagesUrl = `${apiUrl}/images`
      settingsUrl = `${apiUrl}/settings`
    } else {
      accountsUrl = apiUrl.accounts || `${apis.PRODUCTION}/accounts`
      imagesUrl = apiUrl.images || `${apis.PRODUCTION}/images`
      settingsUrl = apiUrl.settings || `${apis.PRODUCTION}/settings`
    }

    this.accounts = new Iroh(accountsUrl, token)
    this.images = new Toph(imagesUrl, token)
    this.settings = new Tama(settingsUrl, token)
  }
}

WeebWrapper.APIS = apis

module.exports = WeebWrapper
