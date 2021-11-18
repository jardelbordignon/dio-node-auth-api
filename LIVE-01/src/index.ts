import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Ok!'})
})

app.listen(3000, () => console.log('App running in port 3000'))
