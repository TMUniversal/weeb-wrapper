'use strict'

const axios = require('axios')
const uagent = `weeb-wrapper@${require('../package.json').version} (NodeJS)`

class RequestHandler {
  constructor (baseUrl, token) {
    this.baseUrl = baseUrl
    this.token = token
  }

  headers () {
    const headers = { 'User-Agent': uagent }
    if (this.token) headers.Authorization = `${this.isJWT(this.token) ? 'Bearer' : 'Wolke'} ${this.token}`
    return headers
  }

  get (path) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${this.baseUrl}${path}`,
        method: 'get',
        headers: this.headers()
      })
        .then(res => resolve(res.data))
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

  post (path, data) {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'post',
      data,
      headers: this.headers()
    })
  }

  put (path, data) {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'put',
      data,
      headers: this.headers()
    })
  }

  delete (path) {
    return axios({
      url: `${this.baseUrl}${path}`,
      method: 'delete',
      headers: this.headers()
    })
  }

  isJWT (token) {
    return /^([a-zA-Z0-9\-_]+?)\.([a-zA-Z0-9\-_]+?)\.([a-zA-Z0-9\-_]+)?$/m.test(token)
  }
}

module.exports = RequestHandler
