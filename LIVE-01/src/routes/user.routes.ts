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

const users: IUser[] = [{"id":"99c00c61-5ca1-4e97-b431-61c137a630c7","name":"Jardel","email":"jardel@email.com","password":"123"}]

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

// put /users/:uuid
userRoutes.put('/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  const user = users.find(user => user.id === uuid)
  
  if (!user) {
    throw new Error('User not found')
  }
  
  const { name, email, password } = req.body as IUser
  console.log(name, email, password);
  
  user.name = name || user.name
  user.email = email || user.email 
  user.password = password || user.password

  const index = users.findIndex(user => user.id === uuid)
  users[index] = user

  res.status(OK).send(user)
})

export { userRoutes }
