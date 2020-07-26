'use strict'

import RequestHandler from '../RequestHandler'
import { IApiHandler } from '../CommonTypes'
import { isStringTooLong, escapeString, spongetalk } from './util'

class TMGeneral implements IApiHandler {
  req: RequestHandler
  constructor (baseUrl: string) {
    this.req = new RequestHandler(baseUrl, false)
  }

  /**
   * Get your IP address
   * @returns {Promise<String>} your ip address
   */
  public async getIp (): Promise<string> {
    try {
      const res = await this.req.get('/ip')
      let ip: string = res.ip
      if (ip.split(', ').length > 0) ip = ip.split(', ')[0]
      return ip
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Get a catgirl
   * @return {Promise<String>} a url that directly links to an image of a catgirl
   */
  public async getNeko (): Promise<string> {
    try {
      const res = await this.req.get('/neko')
      return res.url
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }

  /**
   * Get any text transformed into mocking SpongeBob's speech style
   * @param input Your text
   * @param useApi Wether to actually use the api or to calculate locally
   * @returns {Promise<String>} Your result.
   */
  public async spongeBobTalk (input: string, useApi = false): Promise<string> {
    try {
      const validatedInput = escapeString(input)
      if (useApi) {
        const res = await this.req.get(`/spongetalk?text=${validatedInput}`)
        return res.message as string
      } else {
        return spongetalk(validatedInput)
      }
    } catch (err) {
      return Promise.reject(err || new Error())
    }
  }
}

export default TMGeneral
