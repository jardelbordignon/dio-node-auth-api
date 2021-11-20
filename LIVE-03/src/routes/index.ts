import { Router } from 'express'

import { statusRoutes } from './status.routes'
import { userRoutes } from './user.routes'

const routes = Router()

routes.use('/status', statusRoutes)
routes.use('/users', userRoutes)

export { routes }
