// Type definitions for @tmuniversal/weeb-wrapper 0.0.3
// Project: https://github.com/TMUniversal/weeb-wrapper

declare module '@tmuniversal/weeb-wrapper' {
  import { HttpStatusCode } from './enums'
  //#region Classes

  class WeebWrapper {
    constructor(token: APIKey, apiUrl?: APIUrl | APIUrlOptions)

    public readonly accounts: Iroh
    public readonly images: Toph
    public readonly settings: Tama
  }

  class RequestHandler {
    constructor(baseUrl: APIUrl, token: APIKey)
    public baseUrl: APIUrl
    public token: APIKey


    private headers(): RequestHeaders
    public get(path: string): APIResponse
    public post(path: string, data: Data): APIResponse
    public delete(path: string): APIResponse
    public isJWT(token: APIKey): Boolean
  }

  class Iroh {
    constructor(baseUrl: APIUrl, token: APIKey)
    private req: RequestHandler

    public validate(token: APIKey): ValidatedKey | APIResponse
    public createToken(userId: string): CreateTokenResponse
    public deleteToken(tokenId: string): IrohResponse
    public createUser(name: string, discordUserId: string, active: boolean, scopes: Array<string>): IrohResponse
    public deleteUser(userId: string): APIResponse
    public updateUser(userId: string, { name, discordUserId, active, scopes }: { name: string, discordUserId: string, active: boolean, scopes: Array<string> }): IrohResponse
  }

  class Tama {
    constructor(baseUrl: APIUrl, token: APIKey)
    private req: RequestHandler

    public async getSetting(type: string, id: string): Promise<SettingResponse>
    public async createSetting(type: string, id: string, data: Data): Promise<SettingResponse>
    public async updateSetting(type: string, id: string, data: Data): Promise<SettingResponse>
    public async deleteSetting(type: string, id: string): Promise<SettingResponse>
    public async getSubsettings(type: string, id: string, subtype: string): Promise<SubsettingsResponse>
    public async getSubsetting(type: string, id: string, subtype: string, subid: string): Promise<SubsettingResponse>
    public async createSubsetting(type: string, id: string, subtype: string, subid: string, data: Data): Promise<SubsettingResponse>
    public async updateSubsetting(type: string, id: string, subtype: string, subid: string, data: Data): Promise<SubsettingResponse>
    public async deleteSubsetting(type: string, id: string, subtype: string, subid: string): Promise<SubsettingResponse>
  }

  class Toph {
    constructor(baseUrl: APIUrl, token: APIKey)
    private req: RequestHandler
  }

  //#endregion

  //#region Typedefs

  type APIUrl = string
  type APIKey = BearerToken | WolkeToken

  type BearerToken = string
  type WolkeToken = string

  type APIResponseData = {
    status: HttpStatusCode,
    message?: string,
    [x: string]: any
  }
  type APIResponse = Promise<APIResponseData>
  type Data = Object

  type EpochTimestamp = number

  interface APIUrlOptions {
    accounts?: APIUrl,
    images?: APIUrl,
    settings?: APIUrl
  }

  interface APIS {
    [NAME: string]: APIUrl
  }

  interface RequestHeaders {
    'User-Agent': string,
    Authorization?: string
  }

  interface IrohAccount {
    tokens: Array<string>
    scopes: Array<string>
    id: string
    name: string
    discordUserId: string
    active: boolean,
    _id: string
    __v: number
  }

  interface IrohResponse extends APIResponse {
    account: IrohAccount
  }

  interface ValidatedKey extends IrohResponse {
    iat: EpochTimestamp
    wolkeToken: boolean
  }

  interface CreateTokenResponse extends IrohResponse {
    tokenId: string
    token: BearerToken
    wolkeToken: WolkeToken
  }

  interface Setting {
    id: string
    type: string
    accountId: string
    data?: Data
  }

  interface SubSetting extends Setting {
    subType: string
    subId: string
  }

  interface SettingResponse {
    [key: string]: string
  }

  interface SubsettingResponse extends SettingResponse { }

  interface SubsettingsResponse {
    [subId: string]: SubsettingResponse
  }

  

  //#endregion

  export = WeebWrapper
}
