import { Router, Request, Response, NextFunction } from 'express'

import { ForbiddenError } from '@/models/errors'
import { userRepository } from '@/repositories/user.repository'

const authorizationRoutes = Router()

authorizationRoutes.post('/token', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader)
      throw new ForbiddenError('Credentials are required')

    // Basic xxxxxxxxxxx
    const [authType, token] = authorizationHeader.split(' ')

    if (authType !== 'Basic' || !token)
      throw new ForbiddenError('Invalid authentication type')
    
    // base64 to string utf-8
    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

    const [username, password] = tokenContent.split(':')

    if (!username || !password)
      throw new ForbiddenError('Credentials are required')

    const user = await userRepository.findByCredentials(username, password)

    console.log(user)
    

  } catch (error) {
    next(error)
  }
})


export { authorizationRoutes }
