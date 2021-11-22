import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { ForbiddenError } from '@/models/errors'

export const bearerAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader)
      throw new ForbiddenError('Credentials are required')

    // Bearer xxxxxxxxxxx
    const [authType, token] = authorizationHeader.split(' ')

    if (authType !== 'Bearer' || !token)
      throw new ForbiddenError('Invalid authentication')

    const tokenPayload = verify(token, `${process.env.ELEPHANTSQL_HASH_PWD}`)

    if (typeof tokenPayload !== 'object')
      throw new ForbiddenError('Invalid token')

    const { sub: uuid, username } = tokenPayload

    const user = { uuid, username }

    req.user = user
    
    next()
  } catch (error) {
    next(error)
  }
}
