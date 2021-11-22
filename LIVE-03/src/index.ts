import express from 'express'
import 'dotenv/config'

import { routes } from '@/routes'
import { errorHandlerMiddleware } from '@/middlewares'

const app = express()

// app configs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes configs
app.use(routes)

// error handler config
app.use(errorHandlerMiddleware)

app.listen(3000, () => console.log('App running on port 3000'))
