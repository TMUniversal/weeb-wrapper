'use strict'

import axios from 'axios'
import * as util from 'util'
import * as CommonTypes from './CommonTypes'

const uagent = `weeb-wrapper@${require('../../package.json').version} (NodeJS)`

class RequestHandler {
  public baseUrl: CommonTypes.APIUrl
  private token: CommonTypes.APIKey
  constructor (baseUrl: CommonTypes.APIUrl, token: CommonTypes.APIKey) {
    this.baseUrl = baseUrl
    this.token = token
  }

  headers (): RequestHeaders {
    const headers: RequestHeaders = { 'User-Agent': uagent }
    if (this.token) headers.Authorization = `${this.isJWT(this.token) ? 'Bearer' : 'Wolke'} ${this.token}`
    return headers
  }

  get (path: string): Promise<CommonTypes.APIResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: `${this.baseUrl}${path}`,
        method: 'get',
        headers: this.headers()
      })
        .then(res => resolve(res.data as CommonTypes.APIResponse))
        .catch(e => {
          if (e.response && e.response.data) return reject(e.response.data)
          else {
            const err = new Error(e.message)
            err.stack = e.stack
            reject(err)
          }
        })
    })
  }

  post (path: string, data: Object): Promise<CommonTypes.APIResponse> {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'post',
      data,
      headers: this.headers()
    })
  }

  put (path: string, data: Object): Promise<CommonTypes.APIResponse> {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'put',
      data,
      headers: this.headers()
    })
  }

  delete (path: string): Promise<CommonTypes.APIResponse> {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'delete',
      headers: this.headers()
    })
  }

  isJWT (token: CommonTypes.APIKey): Boolean {
    if (!token) return false
    return /^([a-zA-Z0-9\-_]+?)\.([a-zA-Z0-9\-_]+?)\.([a-zA-Z0-9\-_]+)?$/m.test(token)
  }
}

export default RequestHandler

interface RequestHeaders {
  'User-Agent': string,
  Authorization?: string
}
