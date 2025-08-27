import { Router } from 'express'
import { AppointmentController } from '../controllers/Appointment.controller'

export const appointmentRouter = Router()

const appointmentController = new AppointmentController()

appointmentRouter.post("/appointments", appointmentController.createAppointment)
