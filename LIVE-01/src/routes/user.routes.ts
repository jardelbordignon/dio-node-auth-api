import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuid } from 'uuid'

const { OK, CREATED } = StatusCodes
const userRoutes = Router()

interface IUser {
  id?: string
  name: string
  email: string
  password: string
}

const users: IUser[] = []

// get /users
userRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).json(users)
})

// get /users/:uuid
userRoutes.get('/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  const user = users.find(user => user.id === uuid)

  if (!user) {
    throw new Error('User not found')
  }

  res.status(OK).send(user)
})

// post /users
userRoutes.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body as IUser
  const user = { id: uuid(), name, email, password }

  users.push(user)

  res.status(CREATED).send(user)
})

export { userRoutes }
