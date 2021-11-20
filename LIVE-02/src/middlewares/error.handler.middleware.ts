import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes'

import { RepositoryError } from '@/models/errors'

const {BAD_REQUEST, INTERNAL_SERVER_ERROR} = StatusCodes

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const errorType = (error instanceof RepositoryError) ? BAD_REQUEST : INTERNAL_SERVER_ERROR
  res.sendStatus(errorType)
}
