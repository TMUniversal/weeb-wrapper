'use strict'

const RequestHandler = require('../RequestHandler')

class Iroh {
  constructor (baseUrl, token) {
    this.req = new RequestHandler(baseUrl, token)
  }

  validate (token) {
    return this.req.get(`/validate/${token}${!this.req.isJWT(token) ? '?wolkeToken=true' : ''}`)
  }

  createToken (userId) {
    return this.req.post('/tokens/', {
      userId
    })
  }

  deleteToken (tokenId) {
    return this.req.delete(`/tokens/${tokenId}`)
  }

  createUser (name, discordUserId, active, scopes) {
    if (active === undefined || active === null) active = true
    if (!scopes) scopes = []

    return this.req.post('/users/', {
      name,
      discordUserId,
      active,
      scopes
    })
  }

  deleteUser (userId) {
    return this.req.delete(`/users/${userId}`)
  }

  updateUser (userId, { name, discordUserId, active, scopes }) {
    const data = {}
    if (name) data.name = name
    if (discordUserId) data.discordUserId = discordUserId
    if (active !== undefined && active !== null) data.active = active
    if (scopes) data.scopes = scopes

    return this.req.put(`/users/${userId}`, data)
  }
}

module.exports = Iroh
