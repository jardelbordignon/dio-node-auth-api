import { Router } from 'express'

import { statusRoutes } from './status.routes'
import { userRoutes } from './user.routes'
import { authorizationRoutes } from './authorization.routes'
import { jwtAuthenticationMiddleware } from '@/middlewares'

const routes = Router()

routes.use('/status', statusRoutes)
routes.use('/auth', authorizationRoutes)

routes.use(jwtAuthenticationMiddleware)

routes.use('/users', userRoutes)

export { routes }
