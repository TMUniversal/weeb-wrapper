import WeebWrapper from './index.js'
import Iroh from './lib/iroh/index.js'
import Toph from './lib/toph/index.js'
import Tama from './lib/tama/index.js'
import { APIS } from './index.js'
import RequestHandler from './lib/RequestHandler.js'

declare enum HttpStatusCode {
  Accepted = 202,
  AlreadyReported = 208,
  BadGateway = 502,
  BadRequest = 400,
  Conflict = 409,
  Continue = 100,
  Created = 201,
  ExpectationFailed = 417,
  FailedDependency = 424,
  Forbidden = 403,
  Found = 302,
  GatewayTimeout = 504,
  Gone = 410,
  HttpVersionNotSupported = 505,
  IMUsed = 226,
  InsufficientStorage = 507,
  InternalServerError = 500,
  LengthRequired = 411,
  Locked = 423,
  LoopDetected = 508,
  MethodNotAllowed = 405,
  MovedPermanently = 301,
  MultipleChoices = 300,
  MultiStatus = 207,
  NetworkAuthenticationRequired = 511,
  NoContent = 204,
  NonAuthoritativeInformation = 203,
  None = 0,
  NotAcceptable = 406,
  NotExtended = 510,
  NotFound = 404,
  NotImplemented = 501,
  Ok = 200,
  PartialContent = 206,
  PaymentRequired = 402,
  PermanentRedirect = 308,
  PreconditionFailed = 412,
  PreconditionRequired = 428,
  Processing = 102,
  ProxyAuthenticationRequired = 407,
  RequestedRangeNotSatisfiable = 416,
  RequestEntityTooLarge = 431,
  RequestHeadersFieldsTooLarge = 431,
  RequestTimeout = 408,
  RequestUriTooLong = 414,
  ResetContent = 205,
  SeeOther = 303,
  ServiceUnavailable = 503,
  SwitchingProtocol = 101,
  TemporaryRedirect = 307,
  TooManyRequests = 429,
  Unauthorized = 401,
  UnprocessableEntity = 422,
  UnsupportedMediaType = 415,
  UpgradeRequired = 426,
  UseProxy = 305,
  VariantAlsoNegotiates = 506
}

declare module '@tmuniversal/weeb-wrapper' {

  export type APIUrl = string

  export type APIKey = BearerToken | WolkeToken

  export type BearerToken = string
  export type WolkeToken = string

  export type APIResponse = {
    status: HttpStatusCode,
    message?: string,
    [x: string]: any
  }
  export type Data = any

  export type EpochTimestamp = number

  export interface APIUrlOptions {
    accounts?: APIUrl,
    images?: APIUrl,
    settings?: APIUrl
  }

  export class WeebWrapper {
    constructor(token: APIKey, apiUrl?: APIUrl | APIUrlOptions)

    readonly accounts: Iroh
    readonly images: Toph
    readonly settings: Tama
  }

  export const APIS: {
    [NAME: string]: APIUrl
  }

  export interface RequestHeaders {
    'User-Agent': string,
    Authorization?: string
  }

  export class RequestHandler {
    constructor(baseUrl: APIUrl, token: APIKey)
    public baseUrl: APIUrl
    public token: APIKey


    private headers(): RequestHeaders
    public get(path: string): APIResponse
    public post(path: string, data: Object<Data>): APIResponse
    public delete(path: string): APIResponse
    public isJWT(token: APIKey): Boolean
  }

  export interface IrohAccount {
    tokens: Array<string>
    scopes: Array<string>
    id: string
    name: string
    discordUserId: string
    active: boolean,
    _id: string
    __v: number
  }

  export interface IrohResponse extends APIResponse {
    account: IrohAccount
  }

  export interface ValidatedKey extends IrohResponse {
    iat: EpochTimestamp
    wolkeToken: boolean
  }

  export interface CreateTokenResponse extends IrohResponse {
    tokenId: string
    token: BearerToken
    wolkeToken: WolkeToken
  }

  export class Iroh {
    constructor(baseUrl: APIUrl, token: APIKey)
    private req: RequestHandler

    public validate (token: APIKey): ValidatedKey | APIResponse
    public createToken (userId: string): CreateTokenResponse
    public deleteToken (tokenId: string): IrohResponse
    public createUser (name: string, discordUserId: string, active: boolean, scopes: Array<string>): IrohResponse
    public deleteUser (userId: string): APIResponse
    public updateUser (userId: string, { name, discordUserId, active, scopes }: { name: string, discordUserId: string, active: boolean, scopes: Array<string> }): IrohResponse
  }

  export class Tama {
    constructor (baseUrl: APIUrl, token: APIKey)
    private req: RequestHandler

    public getSetting (type: string, id: string): Data
    public createSetting (type: string, id: string, data: Data): Data
    public updateSetting (type: string, id: string, data: Data): Data
    public deleteSetting (type: string, id: string): any
    public getSubsettings (type: string, id: string, subtype: string): Array<Data>
    public getSubsetting (type: string, id: string, subtype: string, subid: string): Data
    public createSubsetting (type: string, id: string, subtype: string, subid: string, data: Data): Data
    public updateSubsetting (type: string, id: string, subtype: string, subid: string, data: Data): Data
    public deleteSubsetting (type: string, id: string, subtype: string, subid: string): any
  }

}
