import { Router } from 'express'
import { BarbersController } from '../controllers/Barbers.controller'
import { BarberVerify } from '../middlewares/BarberVerify.middleware'

const barbersController = new BarbersController()

export const barbersRouter = Router()

barbersRouter.get("/barbers", BarberVerify, barbersController.getBarber)
barbersRouter.get("/barbers/:id", barbersController.getAllBarbers)
barbersRouter.post("/barbers", barbersController.createBarber)
barbersRouter.patch("/barbers:id", barbersController.updateBarber)
barbersRouter.delete("/barbers/:id", barbersController.deleteBarber)