// Type definitions for @tmuniversal/weeb-wrapper 0.0.3
// Project: https://github.com/TMUniversal/weeb-wrapper

declare module '@tmuniversal/weeb-wrapper' {
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

    public getSetting(type: string, id: string): Data
    public createSetting(type: string, id: string, data: Data): Data
    public updateSetting(type: string, id: string, data: Data): Data
    public deleteSetting(type: string, id: string): any
    public getSubsettings(type: string, id: string, subtype: string): Array<Data>
    public getSubsetting(type: string, id: string, subtype: string, subid: string): Data
    public createSubsetting(type: string, id: string, subtype: string, subid: string, data: Data): Data
    public updateSubsetting(type: string, id: string, subtype: string, subid: string, data: Data): Data
    public deleteSubsetting(type: string, id: string, subtype: string, subid: string): any
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

  type APIResponse = {
    status: HttpStatusCode,
    message?: string,
    [x: string]: any
  }
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

  enum HttpStatusCode {
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

  //#endregion

  export = WeebWrapper
}
