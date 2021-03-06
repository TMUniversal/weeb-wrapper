export enum HttpStatusCode {
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
