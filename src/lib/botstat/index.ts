'use strict'

import RequestHandler from '../RequestHandler'
import { IApiHandler } from '../CommonTypes'

class BotStat implements IApiHandler {
  req: RequestHandler
  constructor (baseUrl: string, token: string) {
    this.req = new RequestHandler(baseUrl, token)
  }
}

export default BotStat
