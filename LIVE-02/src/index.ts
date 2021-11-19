import express from 'express'

import { statusRoutes, userRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/status', statusRoutes)
app.use('/users', userRoutes)

app.listen(3000, () => console.log('App running on port 3000'))
