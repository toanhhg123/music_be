import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: StatusCodes
  public readonly isOperational: boolean

  constructor(name: string, httpCode: StatusCodes, description: string, isOperational: boolean) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export class APIError extends BaseError {
  constructor(
    name = '',
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
    description = 'internal server error',
    isOperational = true
  ) {
    super(name, httpCode, description, isOperational)
  }
}

export class HTTP400Error extends BaseError {
  constructor(description = 'bad request') {
    super('Bad Request', StatusCodes.BAD_REQUEST, description, true)
  }
}

export class HTTP401Error extends BaseError {
  constructor(description = 'UnAuthenticated') {
    super('UnAuthenticated', StatusCodes.UNAUTHORIZED, description, true)
  }
}

export class HTTP403Error extends BaseError {
  constructor(description = 'forbidden') {
    super('forbidden', StatusCodes.FORBIDDEN, description, true)
  }
}

export class HTTP404Error extends BaseError {
  constructor(description = 'bad request') {
    super('NOT FOUND', StatusCodes.NOT_FOUND, description, true)
  }
}

export class HTTP409Error extends BaseError {
  constructor(description = 'CONFLICT') {
    super('CONFLICT DATA', StatusCodes.CONFLICT, description, true)
  }
}

export const HandleNotFound = (_req: Request, _res: Response, next: NextFunction) => {
  const err = new HTTP404Error('not found')
  next(err)
}

export function handleError(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  const errorRes = handleErrorResponse(error)
  return response.status(errorRes.httpCode).json({
    ...errorRes,
    message: errorRes.message
  })
}

export const handleErrorResponse = (error: any): BaseError => {
  let baseError = error

  if (!(error instanceof BaseError)) {
    baseError = new BaseError('', StatusCodes.NOT_FOUND, error?.message || 'error exception', false)
  }
  return baseError
}
