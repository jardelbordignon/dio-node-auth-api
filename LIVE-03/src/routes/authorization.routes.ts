import { Router, Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

import { ForbiddenError } from '@/models/errors'
import { userRepository } from '@/repositories/user.repository'

const { OK } = StatusCodes

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

    if (!user)
      throw new ForbiddenError('Invalid credentials')

    /* informações disponívies no jwt
    iss - O domínio da aplicação geradora do token
    sub - O assunto do token, mas é muito utilizado para guardar o ID do usuário
    aud - Define a audição, quem pode utilizar esse token
    exp - Data de expiração
    nbf - Data em que o token pode ser aceito, um delay para que ele entre em vigor
    iat - Data da criação do token
    jti - Id do token
    */

    const payload = { username: user.username }
    const options = { subject: user.uuid }
    const secretKey = 'xxxxxxxxxx'

    const jwt = sign(payload, secretKey, options)

    res.status(OK).json({ jwt })

  } catch (error) {
    next(error)
  }
})


export { authorizationRoutes }
