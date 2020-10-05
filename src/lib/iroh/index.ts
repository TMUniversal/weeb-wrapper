'use strict'

import RequestHandler from '../RequestHandler'
import * as CommonTypes from '../CommonTypes'

class Iroh implements CommonTypes.IApiHandler {
  req: RequestHandler
  constructor (baseUrl: CommonTypes.APIUrl, token: CommonTypes.APIKey) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Validates a token and returns it's details
   * @param {String} token The token to validate
   * @returns {Promise<Object>} account details of the token's owner
   */
  public validate (
    token: CommonTypes.APIKey
  ): Promise<ValidatedKey | CommonTypes.APIResponse> {
    return this.req.get(
      `/validate/${token}${!this.req.isJWT(token) ? '?wolkeToken=true' : ''}`
    )
  }

  /**
   * Create a token for the given userId.
   * @param {String} userId The userId to create a token for
   * @returns {Promise<Object>} The user account and token details.
   */
  public async createToken (userId: string): Promise<CreateTokenResponse> {
    try {
      const res = await this.req.post('/tokens/', {
        userId
      })
      return res.data
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Delete an api key by it's id
   * @param {String} tokenId The token to delete
   * @returns {Promise<Object>} The new account details.
   */
  public async deleteToken (tokenId: string): Promise<IrohResponse> {
    try {
      const res = await this.req.delete(`/tokens/${tokenId}`)
      return res.data
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Get all users
   */
  public getUsers (): Promise<ListAllUsersResponse> {
    return this.req.get('/users') as Promise<ListAllUsersResponse>
  }

  /**
   * Get a user by their id
   * @param {String} userId The user to retrieve
   * @returns {Promise<Object>} The user
   */
  public getUser (userId: string): Promise<IrohResponse> {
    return this.req.get(`/users/${userId}`) as Promise<IrohResponse>
  }

  /**
   * Create a new user account
   * @param {String} name The name of the account
   * @param {String} discordUserId Discord UID for the account-holder
   * @param {Boolean} active Wether the account should be active (default: true)
   * @param {Array<String>} scopes The new account's scopes
   * @returns {Object} The new user
   */
  public async createUser (
    name: string,
    discordUserId: string,
    active: boolean = true,
    scopes: Array<string> = []
  ): Promise<IrohResponse> {
    if (active === undefined || active === null) active = true
    if (!scopes) scopes = []

    try {
      const res = await this.req.post('/users/', {
        name,
        discordUserId,
        active,
        scopes
      })
      return res.data
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Delete a user by their id
   * @param {String} userId The user to delete
   * @returns {Object} The user that was deleted or an error message
   */
  public async deleteUser (userId: string): Promise<CommonTypes.APIResponse> {
    try {
      const res = await this.req.delete(`/users/${userId}`)
      return res.data
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Update a user
   * @param {String} userId the user to update
   * @param {{name, discordUserId, active, scopes}} options the details to change. provide at least one.
   * @returns {Object} The updated user
   */
  public async updateUser (
    userId: string,
    options: UpdateUserOptions = {}
  ): Promise<IrohResponse> {
    const { name, discordUserId, active, scopes } = options
    const data: UpdateUserOptions = {}
    if (name) data.name = name
    if (discordUserId) data.discordUserId = discordUserId
    if (active !== undefined && active !== null) data.active = active
    if (scopes) data.scopes = scopes

    if (Object.keys(data).length < 1) {
      return Promise.reject(new Error('No details to update provided.'))
    }

    try {
      const res = await this.req.put(`/users/${userId}`, data)
      return res.data
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }
}

export default Iroh

interface IrohAccount {
  tokens: Array<string>
  scopes: Array<string>
  id: string
  name: string
  discordUserId: string
  active: boolean
  _id: string
  __v: number
}

interface IrohResponse extends CommonTypes.APIResponse {
  account: IrohAccount
}

interface ListAllUsersResponse extends CommonTypes.APIResponse {
  accounts: Array<IrohAccount>
}

interface ValidatedKey extends IrohResponse {
  iat: CommonTypes.EpochTimestamp
  wolkeToken: boolean
}

interface CreateTokenResponse extends IrohResponse {
  tokenId: string
  token: CommonTypes.BearerToken
  wolkeToken: CommonTypes.WolkeToken
}

interface UpdateUserOptions {
  name?: string
  discordUserId?: string
  active?: boolean
  scopes?: Array<string>
}
