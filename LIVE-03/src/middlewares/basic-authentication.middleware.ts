import { Request, Response, NextFunction } from 'express'

import { ForbiddenError } from '@/models/errors'
import { userRepository } from '@/repositories/user.repository'
import { IUser } from '@/models'

export const basicAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization']

    if (!authorizationHeader)
      throw new ForbiddenError('Credentials are required')

    // Basic xxxxxxxxxxx
    const [authType, token] = authorizationHeader.split(' ')

    if (authType !== 'Basic' || !token)
      throw new ForbiddenError('Invalid authentication')
    
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
   
    req.user = user

    // segue propagando entre os middlewares e rotas mas agora com o user dentro da request 
    next()
  } catch (error) {
    // se der erro vai cair no errorHandlerMiddleware
    next(error)
  }
}
