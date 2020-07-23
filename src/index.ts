/// <reference path="../typings/index.d.ts" />
'use strict'

import Iroh from './lib/iroh/index'
import Toph from './lib/toph/index'
import Tama from './lib/tama/index'
import * as CommonTypes from './lib/CommonTypes'

const apis = {
  PRODUCTION: 'https://api.tmuniversal.eu'
  // PRODUCTION: 'https://api.weeb.sh',
  // STAGING: 'https://staging.weeb.sh'
}

/**
 * A simple API wrapper for the weeb api
 */
class WeebWrapper {
  public accounts: Iroh
  public images: Toph
  public settings: Tama
  public static APIS: IAPIS
  /**
   * @param {string} token Your API key
   * @param {string} apiUrl optional custom api url
   */
  constructor (token: CommonTypes.APIKey, apiUrl: CommonTypes.APIUrl | APIUrlOptions) {
    apiUrl = apiUrl || {}

    let accountsUrl: CommonTypes.APIUrl
    let imagesUrl: CommonTypes.APIUrl
    let settingsUrl: CommonTypes.APIUrl
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

interface APIUrlOptions {
  accounts?: CommonTypes.APIUrl,
  images?: CommonTypes.APIUrl,
  settings?: CommonTypes.APIUrl
}

interface IAPIS {
  [NAME: string]: CommonTypes.APIUrl
}
