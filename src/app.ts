import express from 'express'
import { userRouter } from './routes/Users.routes'
import { barbersRouter } from './routes/Barbers.routes'
import { AppDataSource } from './app-data-source'

const server = express()


server.use(express.json())
server.use(userRouter)
server.use(barbersRouter)

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source iniciado!')

    server.listen(3000, () => {
      console.log('Server rodando na porta 3000')
    })
  })
  .catch((err: any) => {
    console.error('Error durante a inicialização', err)
  })

