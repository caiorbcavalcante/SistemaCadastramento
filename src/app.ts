import express from 'express'
import { userRouter } from './routes/users.routes'
import { barbersRouter } from './routes/barbers.routes'

const server = express()


server.use(express.json())
server.use(userRouter)
server.use(barbersRouter)


