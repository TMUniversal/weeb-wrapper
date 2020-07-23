'use strict'

import RequestHandler from '../RequestHandler'

class Toph {
  private req: RequestHandler
  constructor (baseUrl: string, token: string) {
    this.req = new RequestHandler(baseUrl, token)
  }
}

export default Toph
