import express, { Request, Response, NextFunction } from 'express'

import { userRoutes } from './routes'

const app = express()

app.use('/users', userRoutes)

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Ok!'})
})

app.listen(3000, () => console.log('App running on port 3000'))
