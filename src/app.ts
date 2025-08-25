import express from 'express'
import { userRouter } from './routes/Users.routes'
import { barbersRouter } from './routes/Barbers.routes'

const server = express()


server.use(express.json())
server.use(userRouter)
server.use(barbersRouter)


