/* eslint-disable no-dupe-class-members */
'use strict'

import RequestHandler from '../RequestHandler'
import { IApiHandler, APIUrl, APIKey } from '../CommonTypes'

class BotStat implements IApiHandler {
  req: RequestHandler
  constructor (baseUrl: APIUrl, token: APIKey) {
    this.req = new RequestHandler(baseUrl, token)
  }

  /**
   * Get details of a bot.
   * @param botId Discord ID of the bot
   * @returns {Promise<Object>} details of the bot
   */
  public async getBot (botId: string): Promise<Bot> {
    try {
      const res = await this.req.get(`/bot/${botId}`)
      return res.bot
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Update the numbers on your bot.
   * @param {String} botId Discord ID of the bot
   * @param {{guilds: Number, channels: Number, users: Number}} data Amounts of guilds, channels, users in form of an object
   * @returns {Promise<Object>} The updated command details
   */
  public async updateBot<botId = string, data = BotPatch>(
    botId: string,
    data: BotPatch
  ): Promise<Bot>

  /**
   * Update the numbers on your bot.
   * @param {String} botId Discord ID of the bot
   * @param {Array<Number>} data Amounts of guilds, channels, users in this specific order in form of an array.
   * @returns {Promise<Object>} The updated command details
   */
  public async updateBot<botId = string, data = Array<Number>>(
    botId: string,
    data: Array<number>
  ): Promise<Bot>

  /**
   * Update the numbers on your bot.
   * @param {String} botId Discord ID of the bot
   * @param {Number} guilds amounts of guilds
   * @param {Number} channels amounts of channels
   * @param {Number} users amounts of users
   * @returns {Promise<Object>} The updated command details
   */
  public async updateBot<
    botId = string,
    guilds = number,
    channels = number,
    users = number
  >(
    botId: string,
    guilds: number,
    channels: number,
    users: number
  ): Promise<Bot>

  public async updateBot (
    botId: string,
    p1: BotPatch | Array<number> | number,
    p2?: number,
    p3?: number
  ): Promise<Bot> {
    try {
      let data: BotPatch
      // Validate and transform input data.
      if (!p1) throw new Error('Too few arguments passed, requires at least 2.')
      if (typeof p1 === 'number') {
        if (typeof p2 !== 'number' || typeof p3 !== 'number') {
          throw new Error('Missing correct parameters.')
        }
        data = { guilds: p1, channels: p2, users: p3 }
      } else if (Array.isArray(p1)) {
        if (p1.length !== 3) throw new Error('Incorrect amount of array elements.')
        data = { guilds: p1[0], channels: p1[1], users: p1[2] }
      } else if (
        p1.guilds &&
        p1.channels &&
        p1.users &&
        typeof p1.guilds === 'number' &&
        typeof p1.channels === 'number' &&
        typeof p1.users === 'number'
      ) {
        data = p1
      } else throw new Error('No correct data received.')

      // Post request
      const res = await this.req.post(`/bot/${botId}`, data)
      return res.data.bot
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Get information on all commands of a bot
   * @param {String} botId Discord ID of the bot
   * @returns {Promise<Array<Object>>}
   */
  public async getCommands (botId: string): Promise<Array<Command>> {
    try {
      const res = await this.req.get(`/cmd/${botId}`)
      return res.commands
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Get information on a command of a bot
   * @param {String} botId Discord ID of the bot
   * @param {String} command command to get stats for
   * @returns {Promise<Object>}
   */
  public async getCommand (botId: string, command: string): Promise<Command> {
    try {
      const res = await this.req.get(`/cmd/${botId}/${command}`)
      return res.command
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Increase the uses of a command
   * @param {String} botId Discord ID of the bot
   * @param {String} command command to update
   * @returns {Promise<Object>}
   */
  public async increaseCommandUsage (
    botId: string,
    command: string
  ): Promise<Command> {
    try {
      const res = await this.req.post(`/cmd/${botId}/${command}`, {})
      return res.data.command
    } catch (err) {
      return Promise.reject(err.response?.data || err || new Error())
    }
  }

  /**
   * Increase the uses of a command (synonymous with *increaseCommandUsage*)
   * @param {String} botId Discord ID of the bot
   * @param {String} command command to update
   * @returns {Promise<Object>}
   */
  public async updateCommand (botId: string, command: string): Promise<Command> {
    return this.increaseCommandUsage(botId, command)
  }
}

export default BotStat

interface Command {
  botID: string
  command: string
  uses: number
  lastUpdated: Date
}

interface Bot {
  owner: {
    id: string
    username: string
    discriminator: string
  }
  userId: string
  guilds: number
  channels: number
  users: number
  lastUpdated: Date
}

interface BotPatch {
  guilds: number
  channels: number
  users: number
}
