import { Router } from 'express'

import { statusRoutes } from './status.routes'
import { userRoutes } from './user.routes'
import { authorizationRoutes } from './authorization.routes'

const routes = Router()

routes.use('/status', statusRoutes)
routes.use('/users', userRoutes)
routes.use('/auth', authorizationRoutes)

export { routes }
