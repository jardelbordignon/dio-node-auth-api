import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes'

import { RepositoryError, ForbiddenError } from '@/models/errors'

const {BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR} = StatusCodes

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = INTERNAL_SERVER_ERROR
  
  if (error instanceof RepositoryError)
    statusCode = BAD_REQUEST

  if (error instanceof ForbiddenError)
    statusCode = FORBIDDEN

  res.sendStatus(statusCode)
}
