import { Router, Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { basicAuthenticationMiddleware, errorHandlerMiddleware } from '@/middlewares'
import { ForbiddenError } from '@/models/errors'

const { OK } = StatusCodes

const authorizationRoutes = Router()

authorizationRoutes.post(
  '/token',
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {

  try {
    const user = req.user

    if (!user)
      throw new ForbiddenError('Authentication is required')

    const payload = { username: user.username }
    const options = { subject: user.uuid }
    const secretKey = `${process.env.ELEPHANTSQL_HASH_PWD}`

    const jwt = sign(payload, secretKey, options)

    res.status(OK).json({ jwt })

  } catch (error) {
    next(error)
  }
})


export { authorizationRoutes }
