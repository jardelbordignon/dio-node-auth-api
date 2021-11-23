import { Router, Request, Response, NextFunction } from 'express'
import { sign, SignOptions } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { basicAuthenticationMiddleware, jwtAuthenticationMiddleware } from '@/middlewares'
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
    const options: SignOptions = { subject: user.uuid, expiresIn: '15min' }
    const secretKey = `${process.env.ELEPHANTSQL_HASH_PWD}`

    const jwt = sign(payload, secretKey, options)

    res.status(OK).json({ jwt })

  } catch (error) {
    next(error)
  }
})

authorizationRoutes.use(jwtAuthenticationMiddleware)

// essa rota só é acessível após passar pela validação do JWT, então basta retornar um OK
authorizationRoutes.post('/token/validate', (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).send()
})


export { authorizationRoutes }
