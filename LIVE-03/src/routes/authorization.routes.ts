import { Router, Request, Response, NextFunction } from 'express'

import { ForbiddenError } from '@/models/errors'

const authorizationRoutes = Router()

authorizationRoutes.post('/token', (req: Request, res: Response, next: NextFunction) => {

  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader)
      throw new ForbiddenError('Invalid credentials')

    // Basic xxxxxxxxxxx
    const [authType, token] = authorizationHeader.split(' ')

    if (authType !== 'Basic' || !token)
      throw new ForbiddenError('Invalid authentication type')
    
  } catch (error) {
    next(error)
  }
})


export { authorizationRoutes }
