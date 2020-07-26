'use strict'

import RequestHandler from '../RequestHandler'
import { IApiHandler, APIUrl, APIKey } from '../CommonTypes'

class BotStat implements IApiHandler {
  req: RequestHandler
  constructor (baseUrl: APIUrl, token: APIKey) {
    this.req = new RequestHandler(baseUrl, token)
  }

  public async getBot (botId: string) {

  }

  public async updateBot (botId: string, data: { guilds: number, channels: number, users: number }) {
    const { guilds, channels, users } = data
  }

  public async getCommand (botId: string, command: string) {

  }

  public async increaseCommandUsage (botId: string, command: string) {

  }

  public updateCommand = this.increaseCommandUsage
}

export default BotStat
