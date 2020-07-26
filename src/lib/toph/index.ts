'use strict'

import RequestHandler from '../RequestHandler'
import { IApiHandler, APIUrl, APIKey } from '../CommonTypes'

class Toph implements IApiHandler {
  req: RequestHandler
  constructor (baseUrl: APIUrl, token: APIKey) {
    this.req = new RequestHandler(baseUrl, token)
  }
}

export default Toph
