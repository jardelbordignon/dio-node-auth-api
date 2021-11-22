import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { userRepository } from '@/repositories/user.repository'
import { IUser } from '@/models'

const { OK, CREATED, INTERNAL_SERVER_ERROR } = StatusCodes
const userRoutes = Router()

// get /users
userRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAll()
  res.status(OK).json(users)
})

// get /users/:uuid
userRoutes.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  try {
    const { uuid } = req.params
    const user = await userRepository.findById(uuid)
        
    res.status(OK).send(user)
  } catch (error) {
    next(error)
  }
})

// post /users
userRoutes.post('/', async (req: Request<{}, IUser>, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const data = { username, password }

  const user = await userRepository.create(data)  

  res.status(CREATED).send(user)
})

// put /users/:uuid
userRoutes.put('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  const user = await userRepository.findById(uuid)
  
  if (!user) {
    throw new Error('User not found')
  }
  
  const { username, password } = req.body
  const data = {uuid, username, password}
  
  const updatedUser = await userRepository.update(data)

  res.status(OK).send(updatedUser)
})

// delete /users/:uuid
userRoutes.delete('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  const user = await userRepository.findById(uuid)

  if (!user) {
    throw new Error('User not found')
  }

  await userRepository.destroy(uuid)

  res.status(OK).send()
})

export { userRoutes }
