import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const { OK } = StatusCodes
const userRoutes = Router()

const users = [{}]

// /users
userRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).json({users})
})

// /users/:uuid
userRoutes.get('/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  res.status(OK).send({uuid})
})

export { userRoutes }
