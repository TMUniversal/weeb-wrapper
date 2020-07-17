'use strict'

const RequestHandler = require('../RequestHandler')

class Iroh {
  constructor (baseUrl, token) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Validates a token and returns it's details
   * @param {String} token The token to validate
   * @returns {Object} account details of the token's owner
   */
  validate (token) {
    return this.req.get(`/validate/${token}${!this.req.isJWT(token) ? '?wolkeToken=true' : ''}`)
  }

  /**
   * Create a token for the given userId.
   * @param {String} userId The userId to create a token for
   * @returns {Object} The user account and token details.
   */
  createToken (userId) {
    return this.req.post('/tokens/', {
      userId
    })
      .then(res => res.data).catch(err => err.response.data)
  }

  /**
   * Delete an api key by it's id
   * @param {String} tokenId The token to delete
   * @returns {Object} The new account details.
   */
  deleteToken (tokenId) {
    return this.req.delete(`/tokens/${tokenId}`)
      .then(res => res.data).catch(err => err.response.data)
  }

  /**
   * Get all users
   */
  getUsers () {
    return this.req.get('/users')
  }

  /**
   * Get a user by their id
   * @param {String} userId The user to retrieve
   * @returns {Object} The user
   */
  getUser (userId) {
    return this.req.get(`/users/${userId}`)
  }

  /**
   * Create a new user account
   * @param {String} name The name of the account
   * @param {String} discordUserId Discord UID for the account-holder
   * @param {Boolean} active Wether the account should be active (default: true)
   * @param {Array<String>} scopes The new account's scopes
   * @returns {Object} The new user
   */
  createUser (name, discordUserId, active = true, scopes = []) {
    if (active === undefined || active === null) active = true
    if (!scopes) scopes = []

    return this.req.post('/users/', {
      name,
      discordUserId,
      active,
      scopes
    }).then(res => res.data).catch(err => err.response.data)
  }

  /**
   * Delete a user by their id
   * @param {String} userId The user to delete
   * @returns {Object | {status: Number, message: String}} The user that was deleted or an error message
   */
  deleteUser (userId) {
    return this.req.delete(`/users/${userId}`)
      .then(res => res.data).catch(err => err.response.data)
  }

  /**
   * Update a user
   * @param {String} userId the user to update
   * @param {{name, discordUserId, active, scopes}} options the details to change. provide at least one.
   * @returns {Object} The updated user
   */
  updateUser (userId, options = {}) {
    const { name, discordUserId, active, scopes } = options
    const data = {}
    if (name) data.name = name
    if (discordUserId) data.discordUserId = discordUserId
    if (active !== undefined && active !== null) data.active = active
    if (scopes) data.scopes = scopes

    if (Object.keys(data).length < 1) return Promise.reject(new Error('No details to update provided.'))

    return this.req.put(`/users/${userId}`, data)
      .then(res => res.data).catch(err => err.response.data)
  }
}

module.exports = Iroh
