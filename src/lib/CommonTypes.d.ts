import { HttpStatusCode } from '../constants'
import RequestHandler from './RequestHandler'

export type EpochTimestamp = number

export type BearerToken = string
export type WolkeToken = string

export type APIUrl = string
export type APIKey = BearerToken | WolkeToken | null

export type APIResponse = {
  status: HttpStatusCode
  message?: string
  [x: string]: any
}

export interface IApiHandler {
  req: RequestHandler
}
