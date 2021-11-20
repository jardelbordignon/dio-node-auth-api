import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const { OK } = StatusCodes
const statusRoutes = Router()

// get /status
statusRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).send({ status: 'OK' })
})

export { statusRoutes }
