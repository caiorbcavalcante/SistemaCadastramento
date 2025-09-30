import express from 'express'
import cors from 'cors';
import { userRouter } from './routes/Users.routes'
import { barbersRouter } from './routes/Barbers.routes'
import { AppDataSource } from './app-data-source'
import { appointmentRouter } from './routes/Appointments.routes'
import { serviceRouter } from './routes/Services.routes'

const server = express()


server.use(express.json())
server.use(cors());
server.use(userRouter)
server.use(barbersRouter)
server.use(serviceRouter)
server.use(appointmentRouter)


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

