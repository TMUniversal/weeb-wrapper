// Type definitions for @tmuniversal/weeb-wrapper 0.3.4
// Project: https://github.com/TMUniversal/weeb-wrapper

declare module '@tmuniversal/weeb-wrapper' {
  //#region Classes

  /**
   * A simple API wrapper for the weeb api
   */
  class WeebWrapper {
    /**
     * Handler for the account API (requires key)
     */
    public readonly accounts: Iroh
    /**
     * Handler for the image API (unimplemented)
     */
    public readonly images: Toph
    /**
     * Handler for the settings API
     */
    public readonly settings: Tama
    /**
     * Handler for the statistics API
     */
    public readonly statistics: BotStat
    /**
     * Handler for the tm general API
     */
    public readonly general: TMGeneral
    /**
     * Object that includes api names and urls
     */
    public static APIS: IAPIS

    /**
     * @param {string} token Your API key
     * @param {string} apiUrl optional custom api url
     */
    constructor(token: APIKey, apiUrl?: APIUrl | APIUrlOptions)
  }

  /**
   * HTTP Request Handler
   */
  class RequestHandler {
    constructor(baseUrl: APIUrl, token: APIKey)
    public baseUrl: APIUrl
    private token: APIKey

    private headers(): RequestHeaders
    public get(path: string): Promise<APIResponse>
    public post(path: string, data: Object): Promise<APIResponse>
    public put(path: string, data: Object): Promise<APIResponse>
    public delete(path: string): Promise<APIResponse>
    public isJWT(token: APIKey): Boolean
  }

  /**
   * Account API handler
   */
  class Iroh implements IApiHandler {
    req: RequestHandler
    constructor(baseUrl: APIUrl, token: APIKey)
    /**
     * Validates a token and returns it's details
     * @param {String} token The token to validate
     * @returns {Promise<Object>} account details of the token's owner
     */
    validate(token: APIKey): Promise<ValidatedKey | APIResponse>
    /**
     * Create a token for the given userId.
     * @param {String} userId The userId to create a token for
     * @returns {Promise<Object>} The user account and token details.
     */
    createToken(userId: string): Promise<CreateTokenResponse>
    /**
     * Delete an api key by it's id
     * @param {String} tokenId The token to delete
     * @returns {Promise<Object>} The new account details.
     */
    deleteToken(tokenId: string): Promise<IrohResponse>
    /**
     * Get all users
     */
    getUsers(): Promise<ListAllUsersResponse>
    /**
     * Get a user by their id
     * @param {String} userId The user to retrieve
     * @returns {Promise<Object>} The user
     */
    getUser(userId: string): Promise<IrohResponse>
    /**
     * Create a new user account
     * @param {String} name The name of the account
     * @param {String} discordUserId Discord UID for the account-holder
     * @param {Boolean} active Wether the account should be active (default: true)
     * @param {Array<String>} scopes The new account's scopes
     * @returns {Object} The new user
     */
    createUser(
      name: string,
      discordUserId: string,
      active?: boolean,
      scopes?: Array<string>
    ): Promise<IrohResponse>
    /**
     * Delete a user by their id
     * @param {String} userId The user to delete
     * @returns {Object} The user that was deleted or an error message
     */
    deleteUser(userId: string): Promise<APIResponse>
    /**
     * Update a user
     * @param {String} userId the user to update
     * @param {{name, discordUserId, active, scopes}} options the details to change. provide at least one.
     * @returns {Object} The updated user
     */
    updateUser(
      userId: string,
      options?: UpdateUserOptions
    ): Promise<IrohResponse>
  }

  /**
   * Settings API handler
   */
  class Tama implements IApiHandler {
    req: RequestHandler
    constructor(baseUrl: APIUrl, token: APIKey)
    /**
     * Get an existing setting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @returns {Promise<Object>} the setting.
     */
    getSetting(type: string, id: string): Promise<SettingData | APIResponse>
    /**
     * Create or update a setting.
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {Object} data The data that is to be saved.
     * @returns {Promise<Object>} the setting.
     */
    createSetting: (
      type: string,
      id: string,
      data: Object
    ) => Promise<SettingData | APIResponse>
    /**
     * Create or update a setting.
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {Object} data The data that is to be saved.
     * @returns {Promise<Object>} the setting.
     */
    updateSetting(
      type: string,
      id: string,
      data: Object
    ): Promise<SettingData | APIResponse>
    /**
     * Delete an existing setting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @returns {Promise<Object>} The setting
     */
    deleteSetting(type: string, id: string): Promise<SettingData | APIResponse>
    /**
     * Get all existing subsettings
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {String} subtype The name of the subtype
     * @returns {Promise<Object>} Array of all existing settings.
     */
    getSubsettings(
      type: string,
      id: string,
      subtype: string
    ): Promise<SubSettingsData | APIResponse>
    /**
     * Get one existing subsetting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {String} subtype The name of the subtype
     * @param {String} subid The subid of the setting
     * @returns {Promise<Object>} the setting.
     */
    getSubsetting(
      type: string,
      id: string,
      subtype: string,
      subid: string
    ): Promise<SubSettingData | APIResponse>
    /**
     * Create or update a subsetting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {String} subtype The name of the subtype
     * @param {String} subid The subid of the setting
     * @param {Object} data The data that is to be saved.
     * @returns {Promise<Object>} the setting.
     */
    createSubsetting: (
      type: string,
      id: string,
      subtype: string,
      subid: string,
      data: object
    ) => Promise<SubSettingData | APIResponse>
    /**
     * Create or update a subsetting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {String} subtype The name of the subtype
     * @param {String} subid The subid of the setting
     * @param {Object} data The data that is to be saved.
     * @returns {Promise<Object>} the setting.
     */
    updateSubsetting(
      type: string,
      id: string,
      subtype: string,
      subid: string,
      data: object
    ): Promise<SubSettingData | APIResponse>
    /**
     * Delete an existing subsetting
     * @param {String} type The type the settings were saved under
     * @param {String} id Their specific id
     * @param {String} subtype The name of the subtype
     * @param {String} subid The subid of the setting
     * @returns {Promise<Object>} The setting
     */
    deleteSubsetting(
      type: string,
      id: string,
      subtype: string,
      subid: string
    ): Promise<SubSettingData | APIResponse>
  }

  /**
   * Image API handler
   */
  class Toph implements IApiHandler {
    req: RequestHandler
    constructor(baseUrl: APIUrl, token: APIKey)
  }

  /**
   * Statistics API handler
   */
  class BotStat implements IApiHandler {
    req: RequestHandler
    constructor(baseUrl: APIUrl, token: APIKey)
    /**
     * Get details of a bot.
     * @param botId Discord ID of the bot
     * @returns {Promise<Object>} details of the bot
     */
    public getBot(botId: string): Promise<Bot>

    /**
     * Update the numbers on your bot.
     * @param {String} botId Discord ID of the bot
     * @param {{guilds: Number, channels: Number, users: Number}} data Amounts of guilds, channels, users in form of an object
     * @returns {Promise<Object>} The updated command details
     */
    public updateBot<botId = string, data = BotPatch>(
      botId: string,
      data: BotPatch
    ): Promise<Bot>

    /**
     * Update the numbers on your bot.
     * @param {String} botId Discord ID of the bot
     * @param {Array<Number>} data Amounts of guilds, channels, users in this specific order in form of an array.
     * @returns {Promise<Object>} The updated command details
     */
    public updateBot<botId = string, data = Array<Number>>(
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
    public updateBot<
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

    // public updateBot (botId: string, p1: BotPatch | Array<number> | number, p2?: number, p3?: number): Promise<Bot>;

    /**
     * Get information on all commands of a bot
     * @param {String} botId Discord ID of the bot
     * @returns {Promise<Array<Object>>}
     */
    public getCommands(botId: string): Promise<Array<Command>>

    /**
     * Get information on a command of a bot
     * @param {String} botId Discord ID of the bot
     * @param {String} command command to get stats for
     * @returns {Promise<Object>}
     */
    public getCommand(botId: string, command: string): Promise<Command>

    /**
     * Increase the uses of a command
     * @param {String} botId Discord ID of the bot
     * @param {String} command command to get stats for
     * @returns {Promise<Object>}
     */
    public increaseCommandUsage(
      botId: string,
      command: string
    ): Promise<Command>

    /**
     * Increase the uses of a command (synonymous with *increaseCommandUsage*)
     * @param {String} botId Discord ID of the bot
     * @param {String} command command to get stats for
     * @returns {Promise<Object>}
     */
    public updateCommand(botId: string, command: string): Promise<Command>
  }

  /**
   * TM General API handler
   */
  class TMGeneral implements IApiHandler {
    req: RequestHandler
    constructor(baseUrl: APIUrl)
    /**
     * Get your IP address
     * @returns {Promise<String>} your ip address
     */
    public getIp(): Promise<string>
    /**
     * Get a catgirl
     * @return {Promise<String>} a url that directly links to an image of a catgirl
     */
    public getNeko(): Promise<string>
    /**
     * Get any text transformed into mocking SpongeBob's speech style
     * @param input Your text
     * @param useApi Wether to actually use the api or to calculate locally
     * @returns {Promise<String>} The result
     */
    public spongeBobTalk(input: string, useApi?: boolean): Promise<string>
  }

  //#endregion

  //#region Typedefs

  type EpochTimestamp = number

  type BearerToken = string
  type WolkeToken = string

  type APIUrl = string
  type APIKey = BearerToken | WolkeToken | null

  type APIResponse = {
    status: HttpStatusCode
    message?: string
    [x: string]: any
  }

  interface IApiHandler {
    req: RequestHandler
  }

  interface RequestHeaders {
    'User-Agent': string
    Authorization?: string
  }

  interface IrohAccount {
    tokens: Array<string>
    scopes: Array<string>
    id: string
    name: string
    discordUserId: string
    active: boolean
    _id: string
    __v: number
  }
  interface IrohResponse extends APIResponse {
    account: IrohAccount
  }
  interface ListAllUsersResponse extends APIResponse {
    accounts: Array<IrohAccount>
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
  interface UpdateUserOptions {
    name?: string
    discordUserId?: string
    active?: boolean
    scopes?: Array<string>
  }

  interface SettingData extends Object {
    [key: string]: string | number | Array<any> | Object | undefined
  }
  interface SubSettingData extends SettingData {}
  interface SubSettingsData {
    [subId: string]: SubSettingData
  }

  interface APIUrlOptions {
    accounts?: APIUrl
    images?: APIUrl
    settings?: APIUrl
  }
  interface IAPIS {
    [NAME: string]: APIUrl
  }

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

  //#endregion
  export = WeebWrapper

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
}
