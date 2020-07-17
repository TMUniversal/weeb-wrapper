/// <reference path="typings/index.d.ts" />
'use strict'

const Iroh = require('./lib/iroh/')
const Toph = require('./lib/toph')
const Tama = require('./lib/tama')

const apis = {
  PRODUCTION: 'https://api.weeb.sh',
  STAGING: 'https://staging.weeb.sh'
}

/**
 * A simple API wrapper for the weeb api
 */
class WeebWrapper {
  /**
   * @param {string} token Your API key
   * @param {string} apiUrl optional custom api url
   */
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
