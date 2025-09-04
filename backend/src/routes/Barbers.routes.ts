import { Router } from 'express'
import { BarbersController } from '../controllers/Barbers.controller'
import { BarberVerify } from '../middlewares/BarberVerify.middleware'


export const barbersRouter = Router()


const barbersController = new BarbersController()

barbersRouter.get("/barbers/:id_barber", BarberVerify, barbersController.getBarber)
barbersRouter.get("/barbers", barbersController.getAllBarbers)
barbersRouter.post("/barbers", barbersController.createBarber)
barbersRouter.patch("/barbers/:id_barber", barbersController.updateBarber)
barbersRouter.delete("/barbers/:id_barber", barbersController.deleteBarber)
barbersRouter.post("/login", barbersController.getToken)